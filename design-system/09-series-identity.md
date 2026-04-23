# 09 — Series Identity

**Source anchors.** `01-tokens.md` §1.6, `03-color.md` §3.5.

Three series, each with a dedicated accent color and sigil glyph. Identity
elements appear on thumbnails and title cards; they do **not** appear inside
lectures (no watermark, no ever-present logo).

---

## 9.1 — Series accent assignments

| Series | Name | Videos | Accent | Hex | Sigil |
|---|---|---|---|---|---|
| **QFT** | Quantum Field Theory | 9 | `accent.blue` | `#5ba3f5` | Feynman vertex glyph |
| **MC** | Monte Carlo Methods | 6 | `accent.yellow` | `#ffd166` | Die / histogram glyph |
| **LQCD** | Lattice QCD | 8 | `accent.green` | `#3df0c0` | Plaquette glyph |

**Why these assignments.**
- QFT → blue: fields are waves, the dominant visual in Feynman diagrams is
  blue propagator lines.
- MC → yellow: stochasticity, the roll-of-a-die metaphor, the "highlight" of
  sampling a value.
- LQCD → green/teal: the lattice grid feels structural; green carries a
  computational / scientific connotation.

These assignments lock in the *semantic* map. A thumbnail for a QFT lecture is
predominantly blue-accented. A LQCD thumbnail is green. Cross-contamination
(a green QFT accent) breaks the system.

---

## 9.2 — Sigil glyphs

Small glyphs (about 200 × 200 px in the thumbnail corner) that identify the
series at a glance. Spec:

### QFT sigil — Feynman vertex
- Three lines converging to a central filled circle.
- Two lines (incoming) in `canvas.dim`, one line (outgoing) in `accent.yellow`.
- Central circle: `accent.blue`.
- Roughly 3-fold symmetric but not perfectly — off-axis feels alive.

### MC sigil — Die (preferred) or 3-bin histogram
- Die variant: isometric 6-sided die, `accent.yellow` body, dim outline,
  showing the "5" face (5 because MC has 5 common moves: Metropolis,
  heat-bath, cluster, HMC, Gibbs — but the choice of face is aesthetic).
- Histogram variant: 3 bars of increasing height, all `accent.yellow`,
  baseline `canvas.dim`.

### LQCD sigil — Plaquette
- 2×2 dot grid (4 sites), `canvas.text` dots.
- 4 link lines between adjacent dots, `canvas.dim`.
- Diagonal from site (0,0) to (1,1): `accent.green` — the Wilson loop hint.
- The plaquette square interior tinted 15% `accent.green`.

Sigils should read at ≤ 100 px (YouTube thumbnail preview). Design at 400×400,
then downscale and confirm still readable at 100×100.

---

## 9.3 — Thumbnail spec

| Element | Size | Position | Style |
|---|---|---|---|
| Canvas | 1280 × 720, `canvas.bg` | — | Dark, matches lectures |
| Hero visual | ~60% of width | Left / center-left | Dominant accent = series color |
| Title text | 72 pt, bold sans | Upper-right ~40% of width | `canvas.text` white |
| Subtitle | 36 pt | Below title | `canvas.dim` |
| Series tag | 28 pt, "QFT" / "MC" / "LQCD" | Right column, below subtitle | Series accent, padded badge with thin 2 px border |
| Sigil | 200 × 200 px | Bottom-right corner, 40 px margin | Series accent |
| Video # | 18 pt | Bottom-right, above sigil | `canvas.dim` |

**Hero guidance by series:**

| Series | Hero visual options |
|---|---|
| QFT | Feynman diagram relevant to the lecture (propagator, loop, vertex triangle) |
| MC | Dart scatter in square, trace plot, histogram with fit, dice |
| LQCD | 2D or 3D lattice snippet with one highlighted plaquette or Wilson loop |

Hero should be flat (no photorealism), 3Blue1Brown-level stylization. Use the
existing moment/broll templates as the source — a thumbnail is effectively a
single still frame of an animation.

---

## 9.4 — Title card (optional intro)

Reserve title cards for lectures that warrant a cinematic opener. Most
lectures skip directly to slide 1.

| Row | Content | Style |
|---|---|---|
| 1 | Series name | 36 pt, series accent |
| 2 | Lecture title | 60 pt, bold, `canvas.text` |
| 3 | One-sentence hook | 24 pt, `canvas.dim` |
| 4 | "Video N of Total" | 18 pt, right-aligned, `canvas.dim` |
| Sigil | Bottom-right, 200 × 200 | Series accent |

Duration: 4.0 s (`dwell`). Fade out over 0.5 s into first slide (never
dip-to-black).

---

## 9.5 — Outro card (optional)

Same layout as title card, with content:

| Row | Content |
|---|---|
| 1 | "Next in the <Series> series:" (if there's a next video) |
| 2 | Next lecture title |
| 3 | — |
| 4 | "Video N of Total" |

Outro duration: 6.0 s. Music tail fades over the outro.

Outros are optional. If the lecture ends on a strong summary slide, the
summary slide *is* the outro.

---

## 9.6 — Channel-level identity

If the three series live on one YouTube channel:

| Element | Spec |
|---|---|
| Channel banner | 2560 × 1440 px, three vertical stripes (blue / yellow / green) with sigils and series names; central wordmark "Physics Study Reference" in bold sans |
| Channel avatar | 800 × 800 px, sigil triptych arranged in a triangle with center-aligned "Φ" or similar monogram |
| Playlist thumbnails | Use series sigil + series name large, on dark canvas |

Channel trailer (if made): 60–90 s montage of moment clips and b-roll from all
three series, Emma narration, −16 LUFS mix.

---

## 9.7 — What NOT to do

- **Do not add per-lecture logos or mascots.** The videos have no character
  mascots (not Kurzgesagt).
- **Do not animate the sigil or series tag.** They are static identity marks.
- **Do not use the series accent inside a lecture for non-semantic emphasis.**
  If blue means "definition" on a QFT slide, great — blue is also the QFT
  series accent, which reinforces. But on a MC slide, yellow remains
  "formula", not "everything because it's MC". Semantic > branding.
- **No channel watermark on lecture frames.** Clean slides only.
