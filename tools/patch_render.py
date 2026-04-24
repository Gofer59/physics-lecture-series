#!/usr/bin/env python3
"""
patch_render.py — Patch "<lecture> — Audio.html" into a render-ready HTML.

Removes the AudioPlayer (audio is muxed separately via audio.m4a), hides the
playback bar, disables autoplay, and exposes `window.__stage` so Playwright
can drive the timeline deterministically.

Usage:
  python3 patch_render.py <lecture_dir>

Reads:  <lecture_dir>/<anything> — Audio.html
Writes: <lecture_dir>/render/render.html
"""
import pathlib, sys

def patch(html, old, new, msg):
    if old not in html:
        sys.exit(f"anchor not found: {msg}")
    return html.replace(old, new, 1)

def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    lecture_dir = pathlib.Path(sys.argv[1]).resolve()

    audios = list(lecture_dir.glob("*— Audio.html"))
    if len(audios) != 1:
        sys.exit(f"Expected one *— Audio.html in {lecture_dir}, found: {audios}")
    src = audios[0]
    out_dir = lecture_dir / "render"
    out_dir.mkdir(exist_ok=True)
    out = out_dir / "render.html"

    html = src.read_text(encoding="utf-8")

    html = patch(html,
                 "const barH = 44; // playback bar height",
                 "const barH = 0; // [render-patch] no playback bar",
                 "barH")
    html = patch(html, "  autoplay = true,", "  autoplay = false,", "autoplay default")

    if "        <AudioPlayer />\n        <CaptionOverlay" in html:
        html = patch(html,
                     "        <AudioPlayer />\n        <CaptionOverlay",
                     "        <CaptionOverlay",
                     "AudioPlayer mount (QFT style)")
    elif "  <AudioPlayer />\n    </Stage>" in html:
        html = patch(html,
                     "  <AudioPlayer />\n    </Stage>",
                     "    </Stage>",
                     "AudioPlayer mount (bare Stage)")
    else:
        sys.exit("AudioPlayer mount site not found")

    hook = (
        "\n  // [render-patch] expose time control on window\n"
        "  React.useEffect(() => {\n"
        "    window.__stage = { setTime, setPlaying, duration, ready: true };\n"
        "  }, [setTime, setPlaying, duration]);\n"
    )
    html = patch(html,
                 "  const [scale, setScale] = React.useState(1);",
                 "  const [scale, setScale] = React.useState(1);" + hook,
                 "stage hook insertion point")

    playback = """      {/* Playback bar — stacked below canvas, never overlapping */}
      <PlaybackBar
        time={displayTime}
        actualTime={time}
        duration={duration}
        playing={playing}
        onPlayPause={() => setPlaying(p => !p)}
        onReset={() => { setTime(0); }}
        onSeek={(t) => setTime(t)}
        onHover={(t) => setHoverTime(t)}
      />"""
    if playback in html:
        html = html.replace(playback, "      {/* [render-patch] PlaybackBar removed */}", 1)

    html = patch(html,
                 "</style>",
                 ".twk-panel,.twk-panel *{display:none !important}\n</style>",
                 "style close")

    # CSS file reference → absolute path so file:// render works from render/ subdir
    css_link = f'href="colors_and_type.css"'
    if css_link in html:
        css_path = (lecture_dir / "colors_and_type.css").resolve()
        html = html.replace(css_link, f'href="file://{css_path}"', 1)

    out.write_text(html, encoding="utf-8")
    print(f"wrote {out}  ({out.stat().st_size/1024/1024:.1f} MB)")

if __name__ == "__main__":
    main()
