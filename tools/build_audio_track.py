#!/usr/bin/env python3
"""
build_audio_track.py — Build a continuous audio track aligned with SCENE_BOUNDS.

Reads SCENES durations from the first scene file (e.g. lqcd-scenes-a.jsx or
qft-scenes-a.jsx) and produces audio.m4a = TITLE_SILENCE + per-scene MP3
padded to its scene duration + TAIL_SILENCE.

Usage:
  python3 build_audio_track.py <lecture_dir> [--title 6] [--tail 2]
"""
import argparse, pathlib, re, subprocess, sys

SR = 48000

def read_scenes(scene_file: pathlib.Path):
    text = scene_file.read_text(encoding="utf-8")
    m = re.search(r"const\s+SCENES\s*=\s*\[(.*?)\];", text, re.DOTALL)
    if not m:
        sys.exit(f"SCENES array not found in {scene_file}")
    items = re.findall(r"\{\s*n:\s*(\d+)[^}]*?dur:\s*(\d+)", m.group(1))
    if not items:
        sys.exit("No SCENES entries parsed")
    return [(int(n), int(d)) for n, d in items]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("lecture_dir")
    ap.add_argument("--title", type=float, default=6.0, help="title silence seconds")
    ap.add_argument("--tail",  type=float, default=2.0, help="tail silence seconds")
    args = ap.parse_args()

    lecture = pathlib.Path(args.lecture_dir).resolve()
    audio_dir = lecture / "audio"
    out_dir = lecture / "render"
    out_dir.mkdir(exist_ok=True)
    out = out_dir / "audio.m4a"

    scene_files = sorted(lecture.glob("*-scenes-a.jsx"))
    if not scene_files:
        sys.exit("No *-scenes-a.jsx found")
    scenes = read_scenes(scene_files[0])

    cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "warning"]
    fc, labels, idx = [], [], 0

    cmd += ["-f", "lavfi", "-t", str(args.title), "-i", f"anullsrc=r={SR}:cl=stereo"]
    fc.append(f"[{idx}:a]asetpts=PTS-STARTPTS[title]")
    labels.append("[title]")
    idx += 1

    for n, dur in scenes:
        mp3 = audio_dir / f"scene_{n:02d}.mp3"
        if not mp3.exists():
            sys.exit(f"missing {mp3}")
        cmd += ["-i", str(mp3)]
        fc.append(
            f"[{idx}:a]aresample={SR},apad=whole_dur={dur},atrim=0:{dur},"
            f"asetpts=PTS-STARTPTS[s{n}]"
        )
        labels.append(f"[s{n}]")
        idx += 1

    cmd += ["-f", "lavfi", "-t", str(args.tail), "-i", f"anullsrc=r={SR}:cl=stereo"]
    fc.append(f"[{idx}:a]asetpts=PTS-STARTPTS[tail]")
    labels.append("[tail]")
    idx += 1

    fc_str = ";".join(fc) + ";" + "".join(labels) + f"concat=n={len(labels)}:v=0:a=1[out]"
    cmd += ["-filter_complex", fc_str, "-map", "[out]",
            "-c:a", "aac", "-b:a", "192k", "-ar", str(SR), str(out)]

    print(f"Scenes: {len(scenes)}. Running ffmpeg...")
    subprocess.run(cmd, check=True)
    dur = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", str(out)]
    ).decode().strip()
    total = args.title + sum(d for _, d in scenes) + args.tail
    print(f"audio.m4a duration: {dur}s  (target {total}s)")

if __name__ == "__main__":
    main()
