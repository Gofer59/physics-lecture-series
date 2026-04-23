# 05 — Composition

**Source anchors.** `01-tokens.md` §1.3, `render_lecture_broll.py` (dual-panel
axes coords), `preamble.tex` (Beamer aspectratio=169).

---

## 5.1 — Canvases

| Canvas | Size (px) | Aspect | Where |
|---|---|---|---|
| Slide | 1920 × 1080 | 16:9 | Beamer output, final frame base |
| Moment clip | 280 × 180 | ~14:9 (≈1.56) | Corner overlay, 3–12 s |
| B-roll | 1280 × 720 | 16:9 | Full-size render; scaled to 720w PiP |
| Thumbnail | 1280 × 720 | 16:9 | YouTube upload card |
| Title card | 1920 × 1080 | 16:9 | Optional intro card (4 s dwell) |

---

## 5.2 — Safe areas

Outer margins that critical content must stay inside. Important labels, axis
ends, and sigils respect safe areas.

| Canvas | Safe box | Margin |
|---|---|---|
| Slide | 1800 × 960 | 60 px all sides |
| Moment clip | 260 × 160 | 10 px all sides |
| B-roll | 1200 × 640 | 40 px all sides |
| Thumbnail | 1200 × 680 | 40 px all sides |

Decorative structure (grid lines, fading edges, faint axes) may cross the safe
line, but titles, legends, labels, and final equation terms must not.

---

## 5.3 — Slide layout

Slides use the Beamer Madrid theme with the dark override in `preamble.tex`.
The canonical slide compositions are:

| Layout | Content | Vertical stack |
|---|---|---|
| **Title frame** | Series title, lecture title, video # | title (30%) · subtitle (20%) · sigil (20%) · attribution (10%) · footer |
| **Content frame** | Running narrative, 3–5 bullets or a small diagram | frametitle · bullets · optional side diagram (right 40%) · footer |
| **Formula frame** | One large equation + 2 bullets of interpretation | frametitle · `\formbox{...}` · bullets · footer |
| **Definition frame** | `\defbox` with a single definition + 1-sentence expansion | frametitle · `\defbox{...}` · body text · footer |
| **Example frame** | `\exbox` worked problem | frametitle · `\exbox{...}` · bullets · footer |
| **Mixed frame** | Formula + example side by side (columns) | frametitle · two columns · footer |
| **Summary frame** | Key takeaways, optional `\notebox` | frametitle · bullets · `\notebox{...}` · footer |

Never put more than one block (`\defbox` / `\formbox` / `\exbox` / `\notebox`)
on the same frame unless you're explicitly relating them.

---

## 5.4 — Dual-panel b-roll

Axes coordinates (matplotlib figure-fraction) are **canonical**. Do not
reinvent per-broll:

| Panel | Axes rect (l, b, w, h) | What lives here |
|---|---|---|
| Left | `(0.04, 0.10, 0.42, 0.78)` | Mechanism / physics object / simulation frame |
| Right | `(0.54, 0.10, 0.42, 0.78)` | Outcome / convergence / extracted quantity |

Gap between panels: 12% of width (0.46–0.54). No divider line; negative space
separates them.

Panel title: `fontsize=14`, `color=canvas.text`, `pad=8 px`, placed in
`axes-relative (0.5, 1.02)` or via `ax.set_title`.

Spines: thickness 0.6, color `canvas.dim`. Ticks outward, length 3.

Legend: inside panel, upper right, `frameon=False`, `fontsize=8`. Prefer
label-on-object over legend.

---

## 5.5 — Moment-clip layout

| Element | Rule |
|---|---|
| Canvas | 280 × 180, dark bg |
| Axes rect | `(0.10, 0.15, 0.85, 0.75)` (single panel) |
| Title | Optional, fontsize 12, top, one line ≤ 30 chars |
| Axis labels | Optional, fontsize 9, only if quantity is not self-evident |
| Ticks | fontsize 8, minimal — 2–4 major ticks per axis |
| Spines | Thin 0.6, `canvas.dim` |
| Legend | Forbidden. Label objects directly. |

Moment clips are corner overlays. Viewers glance at them; they can't absorb
dense detail. Keep one clear visual idea per clip.

---

## 5.6 — PiP placement on base video

Both overlays are applied by ffmpeg during the final mux. Positions are
expressed relative to the 1920×1080 frame, with 24 px margin from the chosen
edge:

| Overlay | Position | ffmpeg expression |
|---|---|---|
| Moment clip (280×180) | Bottom-left | `overlay=x=24:y=H-h-24:enable='between(t,T0,T1)'` |
| B-roll (scaled to 720w) | Bottom-right | `scale=720:-2, overlay=x=W-w-24:y=H-h-24:enable='between(t,T0,T1)'` |

Moments go bottom-LEFT; b-roll goes bottom-RIGHT. They do not overlap. If the
narration window for a moment and the b-roll intersect, stagger them.

---

## 5.7 — Thumbnail layout

| Zone | Content | Position |
|---|---|---|
| Hero | Main visual (Feynman diagram, lattice, or Markov chain sketch) | Left 60% of frame |
| Title stack | Lecture title, 2–4 words, 72 pt bold | Right 40% top half |
| Series tag | Small badge: "QFT" / "MC" / "LQCD", accent-colored | Right 40%, below title |
| Sigil | Small glyph: Feynman vertex / die / plaquette | Bottom-right corner |

Hero visual is dark-bg with a single dominant accent in the series color.

---

## 5.8 — Title-card layout (optional intro)

Used only if a lecture justifies a dedicated 4-second opener. Most lectures do
not need one.

| Row | Element | Style |
|---|---|---|
| 1 | Series title | 36 pt, accent color |
| 2 | Lecture title | 60 pt, bold, white |
| 3 | Subtitle / one-sentence hook | 24 pt, dim |
| 4 | Video N / Total | 18 pt, right-aligned, dim |

Title card fades to first slide over 0.5 s (no black dip).

---

## 5.9 — Z-order / stacking

When layering elements (either in one canvas or across PiP):

1. Background canvas (`#0d1117`)
2. Grid / axes / static structure
3. Primary physics object (yellow/green)
4. Secondary physics object (blue/red)
5. Labels (match object color)
6. Overlays (moment clip + b-roll) — always above slide content

No slide content should ever sit on top of an overlay. If the slide has busy
bottom-left content, move the moment-clip window to a less busy slide.
