# physics-lecture-series

A reproducible pipeline for producing animated, narrated physics lectures — QFT, Monte Carlo Methods, and Lattice QCD — as single-file HTML artifacts with synchronized voice-over.

## What's in this repo

Three lecture series, 23 videos total, each delivered as a self-contained HTML file (~3.7 MB) that plays in any modern browser with no server.

| Series | Lectures | Accent |
|---|---|---|
| A — Quantum Field Theory | 8 | `#5ba3f5` (blue) |
| B — Monte Carlo Methods | 8 | `#ffd166` (gold) |
| C — Lattice QCD | 7 | `#b589e8` (violet) |

Each lecture is ~20 scenes, 1920×1080, 60 fps canvas, dark background (`#0d1117`), narrated by `en-US-EmmaMultilingualNeural` via Microsoft Edge TTS. Tone is 3Blue1Brown-like: serious, mathematically rigorous, motion that serves understanding.

## Quick start

```bash
# 1. Clone
git clone https://github.com/Gofer59/physics-lecture-series.git
cd physics-lecture-series

# 2. Write lecture content
#    series/A_qft/02_interactions/scene_breakdown.md
#    series/A_qft/02_interactions/narration_transcript.txt

# 3. Synthesize voice (per-scene MP3s)
python tools/split_scenes.py series/A_qft/02_interactions/narration_transcript.txt \
                              series/A_qft/02_interactions/audio/
bash tools/run_edge_tts.sh    series/A_qft/02_interactions/audio/ \
                              series/A_qft/02_interactions/audio/

# 4. Build HTML animation via Claude Design (see METHODOLOGY.md §4)
#    Produces: Lecture 02.html + JSX modules

# 5. Inject audio → final self-contained deliverable
python tools/inject_audio.py series/A_qft/02_interactions/ \
                              series/A_qft/02_interactions/audio/

# Open in browser — click the 🔊 overlay once to unlock autoplay
```

## Repo structure

```
physics-lecture-series/
├── framework/              # Shared JSX engine (Stage, TimelineContext, PlaybackBar)
│   ├── animations.jsx
│   ├── tweaks-panel.jsx
│   └── assets/             # CSS, SVG series sigils
├── design-system/          # 10 canonical design docs
├── tools/                  # split_scenes.py · run_edge_tts.sh · inject_audio.py
├── series/
│   ├── A_qft/              # Lecture 01 complete; 07 remaining
│   │   └── 01_fields/
│   ├── B_mc/               # 8 lectures planned
│   └── C_lqcd/             # 7 lectures planned
└── voice/                  # Emma voice config, pronunciation notes
```

Each `series/*/NN_*/` folder contains:
- `scene_breakdown.md` — per-scene concept + animation intent + runtime
- `narration_transcript.txt` — plain prose, no SSML
- `audio/scene_NN.mp3` — generated (gitignored)
- `*-primitives.jsx`, `*-scenes-[a–d].jsx` — lecture animation modules
- `Lecture NN — Audio.html` — final deliverable (gitignored, regenerate with inject_audio.py)

## Requirements

- Python 3.10+
- [`edge-tts`](https://pypi.org/project/edge-tts/) (`pip install edge-tts`)
- `ffprobe` (part of `ffmpeg`)
- Modern browser (Chrome, Firefox, Safari)
- Claude Design access (claude.ai) for animation authoring

## License

MIT
