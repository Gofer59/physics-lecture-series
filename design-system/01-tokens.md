# 01 — Tokens (raw values)

**Source anchors.** `engagement_overhaul/render_moment_clip.py` L31–44,
`engagement_overhaul/render_lecture_broll.py` L26–39,
`../livres/slides/preamble.tex` L40–75.

This file is the authoritative value table. Everything downstream imports from
here. Machine-parseable: each table is `| name | value | notes |` and nothing
else.

---

## 1.1 — Color tokens

### Canvas
| Token | Hex | Usage |
|---|---|---|
| `canvas.bg` | `#0d1117` | Global dark background across slides, clips, b-roll, thumbnails |
| `canvas.text` | `#e8e8e8` | Primary body text (slides) |
| `canvas.text_alt` | `#e4ecff` | Primary body text (matplotlib renderers — historical, may converge) |
| `canvas.dim` | `#5e6c8c` | Grid, spines, axes, subtle outlines |

### Block colors (slides — Beamer `\defbox`, `\formbox`, `\exbox`, `\notebox`)
| Token | Header hex | Body hex | Inline hex | Meaning |
|---|---|---|---|---|
| `block.def` (blue) | `#1e50a0` | `#0c1c3c` | `#64a0ff` | Definition |
| `block.form` (gold) | `#825000` | `#2d1a00` | `#ffbe32` | Formula / alert |
| `block.ex` (teal) | `#006464` | `#002022` | `#00d2c8` | Example |
| `block.note` (purple) | `#502a87` | `#1a0c32` | `#b98cff` | Note / caveat |

All pairs verified WCAG AA (≥ 6.78:1 header white-on-bg; ≥ 7.22:1 inline-on-dark).

### Accent colors (animations — matplotlib)
| Token | Hex | Meaning |
|---|---|---|
| `accent.blue` | `#5ba3f5` | Secondary physics quantity, down-spin, baseline |
| `accent.green` | `#3df0c0` | Convergence, acceptance, best path |
| `accent.yellow` | `#ffd166` | Highlight, trace head, vertex, emphasis |
| `accent.red` | `#ff4d6d` | Rejection, error, noise, up-spin |

### Cross-surface color drift (to reconcile later)
| Surface | Current bg | Canonical |
|---|---|---|
| Beamer slides | `#0d1117` | ✅ matches |
| matplotlib renderers | `#0b1020` | ❌ drift — migrate to `#0d1117` (see `10-pipeline-integration.md`) |

---

## 1.2 — Typography tokens

| Token | Value | Usage |
|---|---|---|
| `font.ui` | Helvetica / DejaVu Sans (system sans) | Slide body, animation labels |
| `font.math` | Computer Modern (LaTeX default) | All math on slides |
| `font.mpl` | matplotlib default sans (DejaVu Sans) | Animation text |
| `size.slide_title` | 20 pt | Beamer frametitle |
| `size.slide_body` | 10 pt | Body text (document class option) |
| `size.slide_math_inline` | 12 pt | Inline `$...$` |
| `size.slide_math_display` | 14 pt | Display `$$...$$` |
| `size.clip_title` | 12 pt | Moment/broll title |
| `size.clip_axis_tick` | 8 pt | Matplotlib ticks |
| `size.clip_label` | 9 pt | Matplotlib axis labels |
| `size.broll_title` | 14 pt | B-roll panel titles |
| `size.thumbnail_title` | 72 pt | Thumbnail large title |

---

## 1.3 — Canvas / geometry tokens

| Token | Value | Notes |
|---|---|---|
| `canvas.slide` | 1920×1080 px, 16:9 | Beamer `aspectratio=169` |
| `canvas.moment` | 280×180 px | Corner overlay |
| `canvas.broll` | 1280×720 px | Renders at 720p, scales to 720w PiP |
| `canvas.thumbnail` | 1280×720 px | Same as broll |
| `safe.slide` | 1800×960 centered | 60 px margin all sides |
| `safe.moment` | 260×160 centered | 10 px margin all sides |
| `safe.broll` | 1200×640 centered | 40 px margin all sides |
| `pip.moment.pos` | bottom-left, 24 px margin | `overlay=x=24:y=H-h-24` |
| `pip.broll.pos` | bottom-right, 24 px margin | `overlay=x=W-w-24:y=H-h-24`, scale=720×-2 |
| `panel.left` (b-roll axes) | `(0.04, 0.10, 0.42, 0.78)` | matplotlib fig-fraction |
| `panel.right` (b-roll axes) | `(0.54, 0.10, 0.42, 0.78)` | matplotlib fig-fraction |

---

## 1.4 — Motion / timing tokens

| Token | Value | Usage |
|---|---|---|
| `fps.master` | 25 fps | Final video (build_video.py locks this) |
| `fps.render` | 25 fps | All renderers output 25 fps (canonicalization — renderers currently 30) |
| `codec.video` | H.264 (libx264), yuv420p, preset fast, crf 20 | Canonical |
| `duration.flash` | 0.2 s | Instantaneous feel — use sparingly |
| `duration.quick` | 0.5 s | Label attach, small reveal |
| `duration.base` | 1.0 s | Default reveal / morph |
| `duration.deliberate` | 2.5 s | Slow scan, equation derivation step |
| `duration.dwell` | 5.0 s | Hold on important state before moving on |
| `duration.moment.default` | 3 s | Overlay moment clip |
| `duration.moment.max` | 12 s | Upper bound for moment clips |
| `duration.broll` | 22 s | Canonical b-roll length |
| `moments.per_video` | 3–5 | Soft default (per memory: flexible) |
| `broll.per_video` | 1 | Always one b-roll per lecture |
| `easing.reveal` | ease-out (cubic) | Object appears, decelerates |
| `easing.morph` | ease-in-out (cubic) | Equation step-to-step |
| `easing.linear` | linear | matplotlib default, acceptable fallback |

---

## 1.5 — Audio tokens

| Token | Value | Notes |
|---|---|---|
| `voice.id` | `en-US-EmmaMultilingualNeural` | Edge TTS, free, expressive |
| `voice.rejected` | `Guy`, `Aria`, `Jenny` | Flat prosody, LU range 2.7 |
| `loudness.voice` | −16 LUFS integrated | YouTube-compatible |
| `loudness.music` | −22 LUFS integrated | Sits under voice |
| `loudness.true_peak` | −1.5 dBTP | Headroom |
| `loudness.LRA` | 11 LU | Range target |
| `music.volume_filter` | `volume=0.18` | Applied before mix |
| `music.mix_filter` | `amix + loudnorm=I=-16:LRA=11:TP=-1.5` | Canonical pipeline |
| `pause.inter_sentence.max` | 0.8 s | Prosodic silence |
| `pause.intra_sentence.max` | 0.3 s | Breath |
| `silence_cut` | DISABLED | `auto-editor` produces black frames |

---

## 1.6 — Series-identity tokens

| Token | Value | Notes |
|---|---|---|
| `series.qft.accent` | `#5ba3f5` (accent.blue) | Wave / field = blue |
| `series.mc.accent` | `#ffd166` (accent.yellow) | Stochasticity = gold dice |
| `series.lqcd.accent` | `#3df0c0` (accent.green) | Lattice grid = teal/green |
| `series.qft.sigil` | Feynman vertex glyph | 3-leg vertex + small blob |
| `series.mc.sigil` | Dice or histogram glyph | 6-face die or 3-bin histogram |
| `series.lqcd.sigil` | Lattice plaquette glyph | 4-site square with diagonals |

Sigils appear in thumbnails and title cards only. Not on in-lecture slides.

---

## 1.7 — Machine-readable export

Future `scripts/check_design_tokens.py` should grep for these exact tokens in
source files. Any divergence is a drift bug.

```yaml
canvas:
  bg: "#0d1117"
  text: "#e8e8e8"
  dim: "#5e6c8c"
accent:
  blue:   "#5ba3f5"
  green:  "#3df0c0"
  yellow: "#ffd166"
  red:    "#ff4d6d"
block:
  def:   { hdr: "#1e50a0", body: "#0c1c3c", inline: "#64a0ff" }
  form:  { hdr: "#825000", body: "#2d1a00", inline: "#ffbe32" }
  ex:    { hdr: "#006464", body: "#002022", inline: "#00d2c8" }
  note:  { hdr: "#502a87", body: "#1a0c32", inline: "#b98cff" }
fps: { master: 25, render: 25 }
canvas_size:
  slide:     [1920, 1080]
  moment:    [280,  180]
  broll:     [1280, 720]
  thumbnail: [1280, 720]
audio:
  loudness: { voice: -16, music: -22, tp: -1.5, lra: 11 }
  voice_id: "en-US-EmmaMultilingualNeural"
```
