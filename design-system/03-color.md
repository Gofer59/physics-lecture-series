# 03 — Color (semantic palette)

**Source anchors.** `01-tokens.md` (raw hex), `preamble.tex` L40–130,
`render_moment_clip.py` L31–44.

---

## 3.1 — The principle

**One hue = one concept class.** Breaking this mapping is a design bug.

The palette intentionally overloads the same four accent families across slides
and animations so that a viewer who saw blue mean "definition" on a slide
recognizes blue meaning "definition / baseline quantity" in the accompanying
animation. The exact hex differs because slide blocks need WCAG AA contrast
(header white on saturated hex, body text on deep muted hex), while animation
accents need to pop on the dark canvas without WCAG constraints.

---

## 3.2 — Semantic map

| Hue | Slide role | Animation role | What it ALWAYS means |
|---|---|---|---|
| **Blue** | `\defbox` — Definition | baseline / secondary physics quantity / down-spin | "Here is the object under discussion" |
| **Gold / yellow** | `\formbox` — Formula | highlight / trace head / vertex / emphasis | "Pay attention to this" |
| **Teal / green** | `\exbox` — Example | convergence / acceptance / best path | "This works / this is the answer" |
| **Purple** | `\notebox` — Note | (no animation equivalent — do not invent one) | "Caveat, caution, or side remark" |
| **Red** | (no slide block) | rejection / error / noise / up-spin | "This did not work / this is what to beware" |
| **Dim gray** | — | grid / axes / unemphasized objects | "Structure, not content" |
| **Text (near-white)** | slide body | animation text labels | "Reading matter" |

**Never:** use red as a block header (too aggressive for definitions / notes).
Never use green for error. Never use yellow for baseline. Never use purple in
an animation — it carries no meaning there and confuses the mapping.

---

## 3.3 — The full palette

### Canvas + neutrals
| Use | Hex | WCAG contrast on `#0d1117` |
|---|---|---|
| Background (`canvas.bg`) | `#0d1117` | — |
| Body text (`canvas.text`) | `#e8e8e8` | 14.5:1 AAA |
| Dim structure (`canvas.dim`) | `#5e6c8c` | 5.9:1 AA |

### Blue family — Definition / baseline
| Token | Hex | Contrast | Context |
|---|---|---|---|
| `block.def.hdr` | `#1e50a0` | 7.75:1 (white-on) | Beamer block title bg |
| `block.def.body` | `#0c1c3c` | — | Beamer block body bg |
| `block.def.inline` | `#64a0ff` | 7.22:1 AAA | `\textcolor{defblue}{...}` on dark |
| `accent.blue` | `#5ba3f5` | 6.4:1 AA | matplotlib baseline, secondary curve, down-spin |

### Gold family — Formula / emphasis
| Token | Hex | Contrast | Context |
|---|---|---|---|
| `block.form.hdr` | `#825000` | 6.78:1 (white-on) | Beamer alert block title |
| `block.form.body` | `#2d1a00` | — | Beamer alert block body |
| `block.form.inline` | `#ffbe32` | 11.41:1 AAA | `\textcolor{formgold}{...}` |
| `accent.yellow` | `#ffd166` | 12.6:1 AAA | matplotlib highlight, trace head, vertex |

### Teal / green family — Example / convergence
| Token | Hex | Contrast | Context |
|---|---|---|---|
| `block.ex.hdr` | `#006464` | 6.98:1 (white-on) | Beamer example block title |
| `block.ex.body` | `#002022` | — | Beamer example block body |
| `block.ex.inline` | `#00d2c8` | 9.96:1 AAA | `\textcolor{exteal}{...}` |
| `accent.green` | `#3df0c0` | 11.2:1 AAA | matplotlib convergence, acceptance, best path |

### Purple family — Note (slide-only)
| Token | Hex | Contrast | Context |
|---|---|---|---|
| `block.note.hdr` | `#502a87` | 10.39:1 (white-on) | Beamer note block title |
| `block.note.body` | `#1a0c32` | — | Beamer note block body |
| `block.note.inline` | `#b98cff` | 7.44:1 AAA | `\textcolor{notepurple}{...}` |

### Red family — Rejection / error (animation-only)
| Token | Hex | Contrast | Context |
|---|---|---|---|
| `accent.red` | `#ff4d6d` | 5.3:1 AA | matplotlib rejection, error, noise, up-spin |

---

## 3.4 — Legacy aliases

Some old slide decks used `formred`, `exgreen`, `noteorange`. The preamble
aliases them:

```latex
\colorlet{formred}    {formgold}    % legacy
\colorlet{exgreen}    {exteal}      % legacy
\colorlet{noteorange} {notepurple}  % legacy
```

Do not use the legacy names in new content. Use `formgold` / `exteal` /
`notepurple` directly.

---

## 3.5 — Series accents

Series accents (see `09-series-identity.md`) are picked from the accent
family, not the block family, because they live on thumbnails and title
cards (no WCAG block constraint):

| Series | Accent hex | Why |
|---|---|---|
| QFT | `accent.blue` = `#5ba3f5` | Quantum fields are waves (blue-shift = wave metaphor) |
| MC | `accent.yellow` = `#ffd166` | Stochastic sampling = the gold of a rolled die |
| LQCD | `accent.green` = `#3df0c0` | The lattice grid itself (teal/green has structural feel) |

---

## 3.6 — Composition rule for multi-color animations

When three or more accents appear in one animation, the priority for visual
weight (linewidth × opacity) is:

1. **Yellow** — the thing being emphasized right now
2. **Green** — the answer / best path / convergence target
3. **Blue** — the baseline / secondary / what we're comparing against
4. **Red** — the counterexample / rejected / error
5. **Dim gray** — grid, tick marks, forgotten objects

If more than four saturated colors appear on-screen simultaneously, simplify
the animation. The viewer cannot track more than four moving color-coded
quantities at 3Blue1Brown pacing.
