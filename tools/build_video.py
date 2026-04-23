#!/usr/bin/env python3
"""Mux per-video slide PDF + narration MP3 into a lecture MP4.

Stage 4 of the video pipeline.  For each target video this script:

  1. Splits the narration XML at <!-- SLIDE CHANGE --> markers (reusing
     synthesise.py's chunker) — one chunk per slide.
  2. Synthesises each chunk individually via edge-tts to obtain exact
     per-slide audio durations (free, no API key).
  3. Concatenates the per-slide chunks into the final MP3 at
     audio/series_X/<stem>.mp3 (overwriting the existing batched MP3 with
     a functionally identical file).
  4. Exports the slide PDF pages to PNGs via pdftoppm.
  5. Builds an ffmpeg concat-demuxer file pairing each PNG with its slide
     duration.
  6. Muxes PNG sequence + audio into video/series_X/<stem>.mp4 via ffmpeg.

The script fails fast if chunk count != PDF page count so misaligned
videos (e.g. from synthesise.py's hyphen-title chunking bug) are not
silently produced.

Usage:
    python scripts/build_video.py --video mc_v01
    python scripts/build_video.py --video mc_v01 --force
    python scripts/build_video.py --video mc_v01 --dry-run
    python scripts/build_video.py                         # all 23 videos
"""

import argparse
import glob
import os
import subprocess
import sys
import tempfile
from pathlib import Path

# Reuse the chunker + TTS wrappers from the audio-synthesis script
sys.path.insert(0, str(Path(__file__).parent))
from synthesise import (  # noqa: E402
    split_into_chunks,
    synthesise_chunk_edge,
    synthesise_chunk_azure,
    wrap_ssml_azure,
)


# ── Constants ────────────────────────────────────────────────────────────────

DEFAULT_VOICE = "en-US-AvaMultilingualNeural"
DEFAULT_DPI = 150
DEFAULT_AUDIO_DIR = "audio"
DEFAULT_SLIDES_DIR = "slides_per_video"
DEFAULT_OUTPUT_DIR = "video"


# ── File discovery ───────────────────────────────────────────────────────────

def find_narration_files(pattern: str, video_filter: str | None) -> list[Path]:
    paths = sorted(Path(p) for p in glob.glob(pattern, recursive=True))
    if video_filter:
        paths = [p for p in paths if video_filter == p.stem.replace("_narration", "")]
    return paths


def resolve_paths(xml_path: Path, audio_dir: Path, slides_dir: Path, output_dir: Path):
    """Map narration XML → (stem, series_dir, slide_pdf, audio_mp3, video_mp4, sentinel)."""
    series_dir = xml_path.parent.name                    # e.g. series_B_mc
    stem = xml_path.stem.replace("_narration", "")       # e.g. mc_v01
    slide_pdf = slides_dir / series_dir / f"{stem}.pdf"
    audio_mp3 = audio_dir / series_dir / f"{stem}.mp3"
    video_mp4 = output_dir / series_dir / f"{stem}.mp4"
    sentinel = video_mp4.with_suffix(".done")
    return stem, series_dir, slide_pdf, audio_mp3, video_mp4, sentinel


# ── ffmpeg helpers ───────────────────────────────────────────────────────────

def ffprobe_duration(path: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe", "-v", "quiet",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        capture_output=True, text=True, check=True,
    )
    return float(result.stdout.strip() or 0.0)


def pdf_page_count(pdf_path: Path) -> int:
    result = subprocess.run(
        ["pdfinfo", str(pdf_path)],
        capture_output=True, text=True, check=True,
    )
    for line in result.stdout.splitlines():
        if line.startswith("Pages:"):
            return int(line.split(":", 1)[1].strip())
    raise RuntimeError(f"pdfinfo: no Pages field in {pdf_path}")


def export_pdf_to_pngs(pdf_path: Path, out_dir: Path, dpi: int) -> list[Path]:
    """Run pdftoppm to export each PDF page as slide-01.png, slide-02.png, ..."""
    prefix = out_dir / "slide"
    subprocess.run(
        ["pdftoppm", "-png", "-r", str(dpi), str(pdf_path), str(prefix)],
        check=True,
    )
    pngs = sorted(out_dir.glob("slide-*.png"))
    if not pngs:
        raise RuntimeError(f"pdftoppm produced no PNGs in {out_dir}")
    return pngs


def concat_audio_chunks(chunk_paths: list[Path], output_mp3: Path, tmpdir: Path) -> None:
    """ffmpeg concat-demuxer to produce the final narration MP3."""
    output_mp3.parent.mkdir(parents=True, exist_ok=True)
    concat_list = tmpdir / "audio_concat.txt"
    concat_list.write_text(
        "".join(f"file '{p}'\n" for p in chunk_paths),
        encoding="utf-8",
    )
    result = subprocess.run(
        [
            "ffmpeg", "-y",
            "-f", "concat", "-safe", "0", "-i", str(concat_list),
            "-c:a", "libmp3lame", "-q:a", "2",
            str(output_mp3),
        ],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(f"ffmpeg concat failed:\n{result.stderr[-800:]}")


def write_image_concat_file(
    pngs: list[Path], durations: list[float], concat_path: Path
) -> None:
    """Write ffmpeg concat demuxer file pairing each PNG with its duration.

    The last file entry is repeated without a duration — this is a known
    ffmpeg quirk: the concat demuxer drops the final `duration` directive
    unless the file appears twice.
    """
    assert len(pngs) == len(durations), "png/duration length mismatch"
    lines = ["ffconcat version 1.0\n"]
    for png, dur in zip(pngs, durations):
        lines.append(f"file '{png}'\n")
        lines.append(f"duration {dur:.6f}\n")
    lines.append(f"file '{pngs[-1]}'\n")  # sentinel to apply final duration
    concat_path.write_text("".join(lines), encoding="utf-8")


def mux_video(images_concat: Path, audio_mp3: Path, video_out: Path) -> None:
    """Final ffmpeg invocation: PNG sequence + MP3 → 1920×1080 MP4."""
    video_out.parent.mkdir(parents=True, exist_ok=True)
    vf = (
        "scale=1920:1080:force_original_aspect_ratio=decrease,"
        "pad=1920:1080:(ow-iw)/2:(oh-ih)/2,"
        "format=yuv420p"
    )
    cmd = [
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0", "-i", str(images_concat),
        "-i", str(audio_mp3),
        "-vf", vf,
        "-c:v", "libx264", "-tune", "stillimage", "-preset", "medium", "-crf", "23",
        "-c:a", "aac", "-b:a", "128k",
        "-movflags", "+faststart",
        "-shortest",
        str(video_out),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"ffmpeg mux failed:\n{result.stderr[-1200:]}")


# ── Per-video pipeline ───────────────────────────────────────────────────────

def build_one_video(
    xml_path: Path,
    audio_dir: Path,
    slides_dir: Path,
    output_dir: Path,
    voice: str,
    dpi: int,
    force: bool,
    backend: str = "edge",
    azure_key: str | None = None,
    azure_region: str | None = None,
) -> bool:
    stem, series, slide_pdf, audio_mp3, video_mp4, sentinel = resolve_paths(
        xml_path, audio_dir, slides_dir, output_dir
    )

    print(f"[{stem}] series={series}")
    # Sentinel encodes voice+backend so a change forces a rebuild
    sentinel_tag = f"{backend}:{voice}"
    if sentinel.exists() and not force:
        if sentinel.read_text(encoding="utf-8").strip() == sentinel_tag:
            print(f"  SKIP (already done): {video_mp4}")
            return True
        print(f"  Sentinel voice/backend mismatch — rebuilding {stem}")

    if not slide_pdf.exists():
        print(f"  ERROR: missing slide PDF {slide_pdf}", file=sys.stderr)
        return False

    # 1. Split narration into slide chunks; filter out any chunk that isn't
    #    attached to a SLIDE CHANGE marker (the title banner comment at the
    #    top of each XML file becomes its own non-slide chunk).
    xml_text = xml_path.read_text(encoding="utf-8")
    all_chunks = split_into_chunks(xml_text)
    slide_chunks = [c for c in all_chunks if "SLIDE CHANGE" in c]
    num_pages = pdf_page_count(slide_pdf)
    print(f"  slide chunks: {len(slide_chunks)}   slide pages: {num_pages}")
    if len(slide_chunks) != num_pages:
        print(
            f"  ERROR: slide chunk count ({len(slide_chunks)}) != page count "
            f"({num_pages}). The narration XML and slide spec are out of sync; "
            "inspect the SLIDE CHANGE markers vs the _slides.md table.",
            file=sys.stderr,
        )
        return False

    with tempfile.TemporaryDirectory(prefix=f"build_video_{stem}_") as td:
        tmpdir = Path(td)
        chunk_dir = tmpdir / "chunks"
        chunk_dir.mkdir()
        png_dir = tmpdir / "pngs"
        png_dir.mkdir()

        # Set up Azure speech config once if needed
        azure_cfg = None
        if backend == "azure":
            try:
                import azure.cognitiveservices.speech as speechsdk  # type: ignore
            except ImportError:
                print("  ERROR: azure-cognitiveservices-speech not installed. "
                      "Run: pip install azure-cognitiveservices-speech", file=sys.stderr)
                return False
            if not azure_key or not azure_region:
                print("  ERROR: --key and --region required for --backend azure", file=sys.stderr)
                return False
            azure_cfg = speechsdk.SpeechConfig(subscription=azure_key, region=azure_region)
            azure_cfg.speech_synthesis_voice_name = voice
            azure_cfg.set_speech_synthesis_output_format(
                speechsdk.SpeechSynthesisOutputFormat.Audio48Khz192KBitRateMonoMp3)

        # 2. Synthesise each slide chunk + measure durations
        chunk_mp3s: list[Path] = []
        durations: list[float] = []
        for i, chunk in enumerate(slide_chunks, start=1):
            chunk_mp3 = chunk_dir / f"chunk_{i:03d}.mp3"
            print(f"  slide {i:02d}/{len(slide_chunks)}: synthesising "
                  f"({len(chunk)} chars)...", end="", flush=True)
            if backend == "azure":
                ssml = wrap_ssml_azure(chunk, voice)
                ok = synthesise_chunk_azure(ssml, azure_cfg, str(chunk_mp3))
            else:
                ok = synthesise_chunk_edge(chunk, voice, str(chunk_mp3))
            if not ok or not chunk_mp3.exists() or chunk_mp3.stat().st_size == 0:
                print(" FAILED (empty output — slide has no speakable text?)")
                return False
            dur = ffprobe_duration(chunk_mp3)
            durations.append(dur)
            chunk_mp3s.append(chunk_mp3)
            print(f" {dur:6.1f} s")

        total = sum(durations)
        mins = total / 60
        print(f"  total narration: {total:.1f} s ({mins:.1f} min)")

        # 3. Concatenate into final MP3
        print(f"  concatenating audio → {audio_mp3}")
        concat_audio_chunks(chunk_mp3s, audio_mp3, tmpdir)

        # 4. Export PDF pages to PNGs
        print(f"  exporting PDF to PNGs at {dpi} DPI")
        pngs = export_pdf_to_pngs(slide_pdf, png_dir, dpi)
        if len(pngs) != len(durations):
            print(
                f"  ERROR: pdftoppm produced {len(pngs)} PNGs but we have "
                f"{len(durations)} durations",
                file=sys.stderr,
            )
            return False

        # 5. Build image concat file
        images_concat = tmpdir / "images.txt"
        write_image_concat_file(pngs, durations, images_concat)

        # 6. Mux to MP4
        print(f"  muxing → {video_mp4}")
        mux_video(images_concat, audio_mp3, video_mp4)

    # Sanity check + sentinel
    final_dur = ffprobe_duration(video_mp4)
    print(f"  video duration: {final_dur:.1f} s")
    sentinel.write_text(sentinel_tag, encoding="utf-8")
    print(f"  DONE: {video_mp4}")
    return True


# ── CLI ──────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--input",
        default="series_*/*_narration.xml",
        help="Glob pattern for input narration XMLs",
    )
    parser.add_argument(
        "--audio-dir", default=DEFAULT_AUDIO_DIR,
        help=f"Audio output directory (default: {DEFAULT_AUDIO_DIR})",
    )
    parser.add_argument(
        "--slides-dir", default=DEFAULT_SLIDES_DIR,
        help=f"Slides PDF directory (default: {DEFAULT_SLIDES_DIR})",
    )
    parser.add_argument(
        "--output-dir", default=DEFAULT_OUTPUT_DIR,
        help=f"Video output directory (default: {DEFAULT_OUTPUT_DIR})",
    )
    parser.add_argument(
        "--backend", choices=["edge", "azure"], default="edge",
        help="TTS backend: edge (free) or azure (needs --key + --region)",
    )
    parser.add_argument(
        "--key", default=None,
        help="Azure Speech subscription key (or set AZURE_SPEECH_KEY env var)",
    )
    parser.add_argument(
        "--region", default=None,
        help="Azure Speech region, e.g. westeurope (or set AZURE_SPEECH_REGION env var)",
    )
    parser.add_argument(
        "--voice", default=DEFAULT_VOICE,
        help=f"TTS voice name (default: {DEFAULT_VOICE})",
    )
    parser.add_argument(
        "--dpi", type=int, default=DEFAULT_DPI,
        help=f"PDF→PNG DPI (default: {DEFAULT_DPI})",
    )
    parser.add_argument(
        "--video", metavar="STEM",
        help="Build only this video (e.g. mc_v01)",
    )
    parser.add_argument(
        "--force", action="store_true",
        help="Rebuild even if the .done sentinel exists",
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Print the resolution plan without running TTS or ffmpeg",
    )
    args = parser.parse_args()

    audio_dir = Path(args.audio_dir)
    slides_dir = Path(args.slides_dir)
    output_dir = Path(args.output_dir)

    xml_paths = find_narration_files(args.input, args.video)
    if not xml_paths:
        print(f"No narration files matched (--video={args.video}, "
              f"--input={args.input})", file=sys.stderr)
        sys.exit(1)

    if args.dry_run:
        print(f"Dry run — {len(xml_paths)} video(s):\n")
        for xml_path in xml_paths:
            resolved = resolve_paths(xml_path, audio_dir, slides_dir, output_dir)
            stem, series, pdf, mp4 = resolved[0], resolved[1], resolved[2], resolved[4]
            pdf_ok = "ok" if pdf.exists() else "MISSING"
            try:
                all_chunks = split_into_chunks(xml_path.read_text(encoding="utf-8"))
                slide_chunks = [c for c in all_chunks if "SLIDE CHANGE" in c]
                pages = pdf_page_count(pdf) if pdf.exists() else -1
                align = "==" if len(slide_chunks) == pages else "!="
                align_note = f"slide_chunks={len(slide_chunks)} {align} pages={pages}"
            except Exception as exc:
                align_note = f"error: {exc}"
            print(f"  {stem:10s} [{series}] pdf={pdf_ok}  {align_note}")
            print(f"             → {mp4}")
        return

    # dependency check
    try:
        __import__("edge_tts")
    except ImportError:
        print("edge-tts not installed. Run: pip install edge-tts", file=sys.stderr)
        sys.exit(1)

    print(f"Voice: {args.voice} | DPI: {args.dpi} | Output: {output_dir}\n")

    failures: list[Path] = []
    for idx, xml_path in enumerate(xml_paths, start=1):
        print(f"[{idx}/{len(xml_paths)}]", end=" ")
        ok = build_one_video(
            xml_path=xml_path,
            audio_dir=audio_dir,
            slides_dir=slides_dir,
            output_dir=output_dir,
            voice=args.voice,
            dpi=args.dpi,
            force=args.force,
            backend=args.backend,
            azure_key=args.key or os.environ.get("AZURE_SPEECH_KEY"),
            azure_region=args.region or os.environ.get("AZURE_SPEECH_REGION"),
        )
        if not ok:
            failures.append(xml_path)
        print()

    print("=" * 60)
    print(f"Completed: {len(xml_paths) - len(failures)}/{len(xml_paths)} succeeded")
    if failures:
        print("Failed:")
        for f in failures:
            print(f"  {f}")
        sys.exit(1)


if __name__ == "__main__":
    main()
