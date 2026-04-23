# 02 — Typography

**Source anchors.** `preamble.tex` L25–35 (Beamer theme), `render_moment_clip.py`
+ `render_lecture_broll.py` (matplotlib rcParams-implicit defaults).

---

## 2.1 — Font stack

| Context | Primary font | Fallback | Rationale |
|---|---|---|---|
| Beamer slide body | Helvetica (Madrid theme default) | DejaVu Sans | Clean, neutral, math-friendly |
| Beamer math | Computer Modern | — | LaTeX default; pairs with `physics`, `slashed`, `amsmath` |
| matplotlib (clips, b-roll) | DejaVu Sans (mpl default) | Helvetica | No custom rc override; keep portable |
| matplotlib math | CM-like (mpl mathtext default) | — | Renders `$...$` through mathtext |
| Thumbnail / title card | Helvetica Bold / DejaVu Sans Bold | — | Match slide sans for coherence |

**Do not introduce decorative or novelty fonts.** No serif except CM in math.
No condensed variants. No italic for emphasis on slides (the block colors and
`\textcolor{accent}{...}` do that job).

---

## 2.2 — Size scale

Scale is deliberate: few steps, big jumps. Mirrors 3Blue1Brown's restraint.

| Token | Points (pt) | Where |
|---|---|---|
| `size.slide_title` | 20 | Beamer frametitle |
| `size.slide_body` | 10 | Beamer body (documentclass `10pt`) |
| `size.slide_math_inline` | 12 | Inline equations in running text |
| `size.slide_math_display` | 14 | Centered display equations |
| `size.slide_block_title` | 11 | Block header (definition / formula / example / note) |
| `size.clip_title` | 12 | Moment clip title bar (if any) |
| `size.clip_label` | 9 | Axis labels, legend entries (moment clip) |
| `size.clip_tick` | 8 | Tick labels (moment clip) |
| `size.broll_title` | 14 | Panel titles in dual-panel b-roll |
| `size.broll_label` | 10 | Axis / quantity labels in b-roll |
| `size.broll_tick` | 8 | Tick labels (b-roll) |
| `size.thumbnail_title` | 72 | Main thumbnail line |
| `size.thumbnail_sub` | 36 | Subtitle / series tag on thumbnail |

No intermediate sizes. If an element doesn't fit, simplify the element — don't
shrink the font.

---

## 2.3 — Math rendering rules

- All slide math uses LaTeX. Common macros live in `preamble.tex` (see
  `07-slides.md` for the canonical list: `\Lag`, `\Ham`, `\Dslash`, `\pslash`,
  `\MSbar`, `\order`, `\expect`, `\Ulink`, `\Uplaq`, etc.).
- Do **not** render equations as images. Always TeX source in `.tex`, always
  matplotlib mathtext in `.py`.
- Display equations use `\begin{align}` or `\[ \]`. Inline uses `$...$`.
- Equation derivations on slides should fit one frame; if they don't, split
  across two slides with an explicit linking phrase in narration.
- In animations, equations morph term-by-term (see `04-motion.md`). Never
  fade-replace a full line.

---

## 2.4 — Labels

Principle: **a label is attached to its object, not placed in a legend.**

- Put a text label next to the line, dot, or region it names. Use
  `matplotlib.text()` not `legend()` when possible.
- Label color inherits the object's accent color.
- Reveal the label 0.3 s after the object appears (see `04-motion.md`).
- On slides, `\textcolor{accentblue}{word}` in running text matches the
  semantics of the block that introduced the concept.

---

## 2.5 — Weight, italic, underline

- **Bold**: titles only. Do not bold inline text for emphasis.
- **Italic**: allowed for a short variable name in narration text on a slide
  (e.g., *S*-matrix), but never for sentence-level emphasis.
- **Underline**: forbidden. Use color instead.

---

## 2.6 — Line length

- Slide body lines ≤ 80 characters before wrap.
- Bullet items ≤ 2 lines each. If longer, split into two bullets or move to
  the narration.
- B-roll panel title ≤ 30 characters. If a concept needs a longer title, it
  lives in the narration, not on the panel.
