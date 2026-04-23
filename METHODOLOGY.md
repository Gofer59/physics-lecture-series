# Methodology

End-to-end pipeline for producing one lecture. Stages run sequentially: content → voice → duration match → animation → audio injection → deliverable.

---

## 1. Content authoring

Two source files per lecture, written before any automation runs.

### `scene_breakdown.md`

One section per scene:

```markdown
## Scene 04 — Path integral as a sum over histories  (runtime: 42 s)

**Concept.** Replace the single classical trajectory with a weighted sum over
every path from x_a to x_b. Weight is exp(i S[x] / ℏ).

**Animation intent.** Fade in ~12 faint trajectories between two fixed endpoints.
Classical path appears last, in accent color, slightly thicker. Phase factor
e^{iS/ℏ} writes above the integral.

**Humor note.** None.
```

Target 18–22 scenes per lecture; each typically 25–60 s. Runtime is a target, not binding — audio is ground truth once synthesized.

### `narration_transcript.txt`

Plain prose. No SSML, no markdown, no stage directions. Sections delimited by:

```
## Scene 01
Narration paragraph(s)…

## Scene 02
Narration paragraph(s)…
```

Conventions:
- Write for the ear. Short clauses. Read aloud as you draft.
- Numbers: `1/2` → "one half", `10^-23` → "ten to the minus twenty-three".
- Greek letters: spell phonetically only if Emma mispronounces (usually fine).
- One blank line between paragraphs; two blank lines between scenes.

---

## 2. Voice synthesis

Voice: `en-US-EmmaMultilingualNeural` (Edge TTS). Chosen for: warm mid-register, consistent prosody on technical terms, handles Greek/Latin transliterations, free.

```bash
# Split transcript into per-scene text files
python tools/split_scenes.py narration_transcript.txt audio/

# Synthesize each scene
bash tools/run_edge_tts.sh audio/ audio/
```

Output: `audio/scene_01.mp3` … `audio/scene_20.mp3`. Re-run only changed scenes; do not regenerate the full set for minor edits.

---

## 3. Duration matching

The HTML `SCENES` array defines per-scene duration in seconds. It must be ≥ audio length or narration clips.

### Measure audio durations

```bash
for f in audio/scene_*.mp3; do
  dur=$(ffprobe -v error -show_entries format=duration \
                -of default=noprint_wrappers=1:nokey=1 "$f")
  printf "%s  %.2f s\n" "$(basename $f)" "$dur"
done
```

### Update SCENES array

Rule: `duration = ceil(audio_s) + 0.5` (0.5 s tail buffer absorbs final consonant, prevents clipping on hard cuts).

Edit the `SCENES` array in `*-scenes-a.jsx`:

```jsx
const SCENES = [
  { n: 1,  title: 'The Question…',   dur: 24 }, // audio 23.4 s
  { n: 2,  title: 'What a Field Is', dur: 28 }, // audio 22.7 s
  // …
];
```

`SCENE_BOUNDS` (absolute start/end) is auto-computed — do not hand-edit.

### EXTEND_DURATIONS_BRIEF pattern

After audio is baked: compute delta = `audio_s - current_dur` per scene. Any scene with positive delta needs a duration bump. Document in `EXTEND_DURATIONS_BRIEF.md` and feed back to Claude Design for the next HTML revision.

---

## 4. Animation build (Claude Design)

Animation authoring happens in Claude Design (claude.ai). Not shell-automated.

### What to upload

1. All 10 `design-system/*.md` docs.
2. The lecture's `scene_breakdown.md`.
3. `framework/animations.jsx` + `framework/tweaks-panel.jsx` as reference.
4. A sibling lecture's `*-primitives.jsx` if reusing visual components.

### What Claude Design produces

| File | Role |
|---|---|
| `animations.jsx` | Core engine: RAF loop, `TimelineContext`, `Stage`, `PlaybackBar` |
| `tweaks-panel.jsx` | Dev UI for live timing/color tweaks |
| `*-primitives.jsx` | Lecture-specific components (Feynman diagrams, lattice grids, …) |
| `*-scenes-a.jsx` | Scenes 01–05 + `SCENES` array |
| `*-scenes-b/c/d.jsx` | Scenes 06–20 |
| `Lecture NN.html` | Loads React + Babel + the JSX modules |

The HTML uses in-browser Babel (`type="text/babel"`). Fine for a local artifact.

---

## 5. Audio injection

`tools/inject_audio.py` fuses the Claude Design HTML + 20 MP3s into one deliverable.

```bash
python tools/inject_audio.py <html_dir> <audio_dir> [n_scenes]

# Example
python tools/inject_audio.py \
    series/A_qft/01_fields/ \
    series/A_qft/01_fields/audio/
```

### What it does internally

1. **Inlines all JSX** — replaces every `<script type="text/babel" src="…">` with the file contents. `file://` browsers block cross-origin JSX fetches; inlining is mandatory.

2. **Base64-encodes each MP3** and emits `AUDIO_DATA` in a plain `<script>` (not a Babel block). Babel would choke trying to parse 3+ MB of base64 string literals as JSX.

3. **Injects `AudioPlayer`** — a React component inside `<Stage>` that:
   - Reads `time` and `playing` from `useTimeline()` (TimelineContext)
   - Finds the active scene via `SCENE_BOUNDS`
   - Plays the matching MP3, re-syncs if drift > 150 ms
   - Fires a silent `AudioContext` pulse on first click to satisfy browser autoplay policy

Output: single HTML, ~3.7 MB for 20 scenes, no external dependencies.

---

## 6. Result

Open `Lecture NN — Audio.html` in a browser:

- 1920×1080 stage, dark `#0d1117` background
- `PlaybackBar` at bottom: scrub, play/pause, arrow-key seek
- `🔊 Click to enable audio` overlay on first load

After the unlock click, audio plays in lockstep with the timeline. Scrubbing seeks audio too.

**No server. No build step. No install. The file is the deliverable.**

---

## Adapting for a new lecture

Copy an existing lecture folder. Change these; leave the rest:

| File | Action |
|---|---|
| `scene_breakdown.md` | Rewrite for new topic |
| `narration_transcript.txt` | Rewrite |
| `audio/*.mp3` | Regenerate (stage 2) |
| `*-primitives.jsx` | Rewrite or reuse if visuals overlap |
| `*-scenes-[a–d].jsx` | Rewrite (includes `SCENES` array with updated durations) |
| `Lecture NN.html` | Update `<script src>` filenames + `<title>` |
| `animations.jsx` | Reuse verbatim — it's the framework |
| `tweaks-panel.jsx` | Reuse verbatim |

Then re-run stages 2 → 3 → 5. Stage 4 (animation) goes through Claude Design again.

---

## Design system quick reference

| Token | Value |
|---|---|
| Canvas | 1920 × 1080, 60 fps |
| Background | `#0d1117` |
| QFT accent | `#5ba3f5` (blue) |
| MC accent | `#ffd166` (gold) |
| LQCD accent | `#b589e8` (violet) |
| Voice | `en-US-EmmaMultilingualNeural` |
| Loudness | −16 LUFS integrated |
| Display type | Latin Modern Roman |
| UI type | DejaVu Sans |
| Scene length | 25–60 s; whole lecture 8–15 min |
| Motion | Ease-out cubic for entrances; never linear |

Full tokens, typography, motion curves, and composition rules: `design-system/`.
