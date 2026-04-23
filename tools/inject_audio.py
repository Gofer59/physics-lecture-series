#!/usr/bin/env python3
"""
inject_audio.py — Bundle JSX inline + embed per-scene audio as base64.

Produces a single self-contained HTML that works from file:// with no server.

Usage:
  python3 inject_audio.py <html_dir> <audio_dir> [n_scenes]

  html_dir   — folder containing the HTML file and JSX files
  audio_dir  — folder containing scene_01.mp3 … scene_NN.mp3
  n_scenes   — number of audio scenes (default: 20)

The HTML file must be the only .html file in html_dir (or named index.html).
Output is written as "<original name> — Audio.html" in html_dir.
"""

import base64, pathlib, sys

def b64(path: pathlib.Path) -> str:
    return "data:audio/mpeg;base64," + base64.b64encode(path.read_bytes()).decode()

def main():
    args = sys.argv[1:]
    if len(args) < 2:
        sys.exit(__doc__)

    html_dir  = pathlib.Path(args[0]).resolve()
    audio_dir = pathlib.Path(args[1]).resolve()
    n_scenes  = int(args[2]) if len(args) > 2 else 20

    # Find source HTML
    htmls = list(html_dir.glob("*.html"))
    htmls = [h for h in htmls if "— Audio" not in h.name]
    if len(htmls) != 1:
        sys.exit(f"Expected exactly one non-Audio .html in {html_dir}, found: {htmls}")
    src_html = htmls[0]
    out_html = html_dir / (src_html.stem + " — Audio.html")

    # Encode audio files
    print(f"Encoding {n_scenes} audio files from {audio_dir} ...")
    entries = []
    for i in range(1, n_scenes + 1):
        p = audio_dir / f"scene_{i:02d}.mp3"
        if not p.exists():
            sys.exit(f"Missing: {p}")
        enc = b64(p)
        entries.append(f'  "{enc}"')
        print(f"  scene_{i:02d}.mp3  {len(enc)//1024} KB b64")
    audio_data_js = "const AUDIO_DATA = [\n" + ",\n".join(entries) + "\n];"

    # AudioPlayer React component (JSX, uses TimelineContext from animations.jsx)
    audio_player_js = r"""
function AudioPlayer() {
  const { time, playing } = useTimeline();
  const audiosRef = React.useRef(null);
  const [unlocked, setUnlocked] = React.useState(false);

  if (!audiosRef.current) {
    audiosRef.current = AUDIO_DATA.map(src => {
      const a = new Audio(src);
      a.preload = 'auto';
      return a;
    });
  }

  React.useEffect(() => {
    return () => audiosRef.current.forEach(a => { a.pause(); a.src = ''; });
  }, []);

  // Satisfy browser autoplay policy via silent AudioContext pulse
  const unlock = React.useCallback(() => {
    if (unlocked) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
      ctx.close();
    } catch(e) {}
    setUnlocked(true);
  }, [unlocked]);

  const prevIdxRef = React.useRef(-1);

  React.useEffect(() => {
    if (!unlocked) return;
    const audios = audiosRef.current;
    // Scene n > n_scenes have no audio (e.g. References card)
    const idx = SCENE_BOUNDS.findIndex(
      s => s.n <= audios.length && time >= s.start && time < s.end
    );
    audios.forEach((a, i) => { if (i !== idx && !a.paused) a.pause(); });
    if (idx < 0) return;

    const audio = audios[idx];
    const localTime = time - SCENE_BOUNDS[idx].start;
    const sceneChanged = idx !== prevIdxRef.current;
    prevIdxRef.current = idx;

    if (sceneChanged || Math.abs(audio.currentTime - localTime) > 0.15) {
      audio.currentTime = Math.max(0, localTime);
    }
    if (playing && audio.paused) {
      audio.play().catch(() => {});
    } else if (!playing && !audio.paused) {
      audio.pause();
    }
  }, [time, playing, unlocked]);

  if (unlocked) return null;

  return (
    <div onClick={unlock} style={{
      position: 'absolute', inset: 0, zIndex: 999, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.55)',
      fontFamily: 'var(--font-ui)', color: '#e6edf3',
    }}>
      <div style={{ textAlign: 'center', userSelect: 'none' }}>
        <div style={{ fontSize: 72, lineHeight: 1 }}>🔊</div>
        <div style={{ fontSize: 22, marginTop: 16, letterSpacing: '0.04em' }}>
          Click to enable audio
        </div>
      </div>
    </div>
  );
}
"""

    html = src_html.read_text(encoding="utf-8")

    # 1. Inline all external JSX <script> tags (avoids file:// CORS block)
    for tag_start in ['<script type="text/babel" src="', "<script type='text/babel' src='"]:
        while tag_start in html:
            i = html.index(tag_start)
            j = html.index('>', i)
            snippet = html[i:j+1]
            # extract src filename
            src_attr = snippet.split('src=')[1].strip('"\'> ')
            fname = src_attr.split('"')[0].split("'")[0]
            content = (html_dir / fname).read_text(encoding="utf-8")
            inline = f'<script type="text/babel">\n{content}\n</script>'
            html = html[:i] + inline + html[j+1:]
            print(f"  inlined {fname}")

    # 2. AUDIO_DATA in a plain <script> before the final babel app block
    babel_anchor = '<script type="text/babel" data-presets="react">'
    if babel_anchor not in html:
        # fallback: last babel block
        babel_anchor = html.rfind('<script type="text/babel">')
        sys.exit("Could not find final babel app script anchor")
    html = html.replace(
        babel_anchor,
        f"\n<script>\n{audio_data_js}\n</script>\n" + babel_anchor,
        1,
    )

    # 3. AudioPlayer definition + <AudioPlayer /> inside Stage
    root_anchor = "ReactDOM.createRoot(document.getElementById('root')).render(<App />);"
    if root_anchor not in html:
        sys.exit("Could not find ReactDOM.createRoot anchor")
    html = html.replace(root_anchor, audio_player_js + "\n" + root_anchor)

    if "<CaptionOverlay" not in html:
        sys.exit("Could not find <CaptionOverlay insertion point")
    html = html.replace(
        "        <CaptionOverlay",
        "        <AudioPlayer />\n        <CaptionOverlay",
        1,
    )

    out_html.write_text(html, encoding="utf-8")
    size_mb = out_html.stat().st_size / 1024 / 1024
    print(f"\nWrote: {out_html.name}  ({size_mb:.1f} MB)")

if __name__ == "__main__":
    main()
