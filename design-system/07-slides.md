# 07 — Slides

**Source anchors.** `../livres/slides/preamble.tex`, `series_*/STEM_slides.md`.

---

## 7.1 — Beamer setup

```latex
\documentclass[10pt,aspectratio=169]{beamer}
\usetheme{Madrid}
\usecolortheme{default}
```

- Document class `10pt`, aspect ratio 16:9 (`aspectratio=169`).
- Madrid theme (custom palette applied in preamble for dark bg).
- Navigation symbols disabled.
- Footer: author · shorttitle · date · frame number.

All slide decks share `../livres/slides/preamble.tex`. Do not fork the
preamble per-deck — add to the central file so the palette stays unified.

---

## 7.2 — Block semantics

Four custom blocks live in the preamble. Each corresponds to one semantic
slot:

| Block | Macro | Meaning | When to use |
|---|---|---|---|
| Definition | `\defbox{title}{body}` | Formal definition of a concept | Introducing a term the viewer must remember |
| Formula | `\formbox{title}{body}` | Equation / key formula | Stating a result or identity |
| Example | `\exbox{title}{body}` | Worked example | Making an abstraction concrete |
| Note | `\notebox{title}{body}` | Caveat, subtlety, warning | Pointing out a trap or a convention |

Rules:

- **One block per frame** as a default. Mixing `\defbox` + `\formbox` is OK if
  they are directly coupled (definition → its canonical formula). Otherwise
  split across frames.
- **Header title in Title Case**, short (≤ 6 words). The title is already
  prefixed with "Definition:" / "Note:" by the macro — don't repeat.
- **Body is prose or math, not bullets.** If a block has more than 4 bullets,
  reconsider whether it's really a block or just a content frame.
- **Color is semantic** (see `03-color.md`). Do not override block colors
  per-slide. Legacy aliases `formred` / `exgreen` / `noteorange` map to the
  canonical colors — do not use them in new decks.

---

## 7.3 — Slide types (canonical)

| Type | Frame title | Typical body |
|---|---|---|
| Title | "<Series name>" | Lecture title, video N, author, date |
| Content | Section or topic name | Prose + 3–5 bullets; optional side diagram |
| Definition | Noun (the term) | One `\defbox` |
| Formula | Noun (the quantity) | One `\formbox` + 2 bullets of interpretation |
| Example | "Example: <short name>" | One `\exbox` |
| Mixed | Topic | Two columns — e.g. formula left, example right |
| Summary | "Summary" / "Key takeaways" | 3–5 bullets, optional `\notebox` caveat |
| Section-open | "Section N — <Name>" | Big title, no body |

Slides should average ~70 s of narration each (see `series_*/STEM_slides.md`
for timestamps). Longer slides invite attention decay; shorter slides break
narration flow.

---

## 7.4 — Diagram conventions

### Feynman diagrams (TikZ)
- Time flows **left to right**.
- Incoming legs: `accent.blue` (`#64a0ff` inline / `#5ba3f5` tikz).
- Outgoing legs: `accent.red` (`#ff4d6d`) or `accent.yellow` for the
  "measurement" leg.
- Vertex: yellow blob (`#ffd166`), small filled circle.
- Propagator: wavy line (photon), zig-zag (gluon), arrowed line (fermion),
  dashed (scalar). Keep the conventions consistent inside a single deck.
- Loops: closed curves filled at 20% opacity of their accent color.

### Lattice diagrams (TikZ)
- Sites: small filled circles, `canvas.text` color.
- Links: lines between sites, `canvas.dim` by default.
- Highlighted link / plaquette: `accent.green` (`#3df0c0`).
- Background grid: `canvas.dim` at 40% opacity.
- Axes labels (μ, ν, x, t): `accent.blue` inline.
- Lattice spacing `a` annotated with a tiny arrow between two adjacent sites.

### MCMC / Markov chain diagrams (TikZ)
- States: rounded rectangles, `canvas.dim` border, `canvas.text` label.
- Transition arrows: curved, `canvas.dim` by default, `accent.yellow` for the
  "currently firing" transition when animated.
- Stationary distribution: small bar chart below or beside the graph,
  `accent.blue` bars.

---

## 7.5 — Source citations

Every slide that leans on a textbook or paper cites it. Use the `\source{}`
macro (defined in preamble):

```latex
\source{Peskin \& Schroeder, Ch. 4.5}
\source{Schwartz, QFT and the Standard Model, §10.2}
```

Placement: bottom-right, `\scriptsize`, `italic`, `canvas.text` color.
Citations are muted (don't compete with content) but always present.
Never omit a source on a formula frame.

Common short names used across the 23 lectures:

| Short | Full |
|---|---|
| PS | Peskin & Schroeder, *An Introduction to Quantum Field Theory* |
| SW | Schwartz, *Quantum Field Theory and the Standard Model* |
| Ryder | Ryder, *Quantum Field Theory* |
| SA | Sokal & Arnold, *Monte Carlo Methods* (or equivalent) |
| NB | Newman & Barkema, *Monte Carlo Methods in Statistical Physics* |
| MM | Montvay & Münster, *Quantum Fields on a Lattice* |
| G | Gattringer & Lang, *Quantum Chromodynamics on the Lattice* |
| DG | DeGrand & DeTar, *Lattice Methods for QCD* |

---

## 7.6 — Math macros (preamble)

Canonical macros defined in the preamble — use these, don't reinvent:

| Macro | Output | Domain |
|---|---|---|
| `\Lag` | ℒ (Lagrangian density) | QFT |
| `\Ham` | ℋ (Hamiltonian density) | QFT |
| `\Dslash` | `slashed{D}` | QFT (Dirac op) |
| `\pslash`, `\kslash`, `\Aslash` | slashed momenta / field | QFT |
| `\half` | ½ | any |
| `\MSbar` | MS-bar scheme symbol | QFT |
| `\order{x}` | 𝒪(x) | any |
| `\real`, `\imag` | Re, Im | any |
| `\Tr` | trace | any |
| `\SUn{N}`, `\Un{N}` | SU(N), U(N) | QFT/LQCD |
| `\Ulink` | Uμ(x) | LQCD |
| `\Uplaq` | Uμν(x) | LQCD |
| `\Wilsonact` | S_W | LQCD |
| `\betaL` | β_L (lattice beta) | LQCD |
| `\alat` | a (lattice spacing) | LQCD |
| `\expect{...}` | ⟨...⟩ | MC |
| `\Prob`, `\E`, `\Var`, `\Cov` | probability / expectation / variance / covariance | MC |

If a new macro is used on more than one slide, add it to the preamble, not
per-deck.

---

## 7.7 — Rebuilding after preamble change

Per memory: changing the preamble invalidates baked-in frame timings.

After any preamble edit:

```bash
rm -f video/series_*/{*.done.mp4,*.mp4,*._pip.mp4,*._moments.mp4,*._music.mp4}
# reset checkpoint for affected videos
python video_pipeline/build_all.py --series mc --force
```

Then verify dark bg preserved:

```bash
ffmpeg -ss 60 -i video/series_B_mc/mc_v03.mp4 -vframes 1 \
  -vf signalstats -f null - 2>&1 | grep YAVG
# YAVG should be ~30-50
```
