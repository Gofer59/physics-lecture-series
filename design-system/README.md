# Physics Video Design System

**Purpose.** Single source of truth for the visual, motion, and audio language of
the 23-lecture physics video series (QFT, Monte Carlo, Lattice QCD). A fresh
Claude session — or a human collaborator — should be able to produce on-brand
output after reading these files, without re-deriving the style from code.

**Tone anchor.** 3Blue1Brown-like. Serious, beautiful, mathematically rigorous.
Slow reveals. Motion serves understanding, never decoration. Accuracy over
spectacle. See `00-principles.md`.

---

## How to use this folder

Pick your entry point:

| If you are about to... | Read first |
|---|---|
| Add a new moment clip or b-roll | `00-principles.md` → `01-tokens.md` → `04-motion.md` → `06-animation-vocabulary.md` |
| Write a new slide deck | `00-principles.md` → `03-color.md` → `07-slides.md` → `02-typography.md` |
| Tune audio / narration | `08-audio.md` |
| Build a thumbnail / title card | `09-series-identity.md` → `03-color.md` |
| Wire a new token into render code | `01-tokens.md` → `10-pipeline-integration.md` |
| Check whether a visual decision is on-brand | `00-principles.md` (contains the do / don't list) |

## File index

| File | What's in it |
|---|---|
| `00-principles.md` | Tone anchor, the 12 design laws, rejected patterns and why |
| `01-tokens.md` | RAW machine-readable values — hex, px, fps, LUFS, seconds |
| `02-typography.md` | Font stacks, size scale, math rendering rules |
| `03-color.md` | Semantic palette — what each hue *means* |
| `04-motion.md` | Easing, duration tokens, reveal grammar, forbidden patterns |
| `05-composition.md` | Canvas sizes, dual-panel geometry, safe areas, PiP placement |
| `06-animation-vocabulary.md` | Catalogue of existing 22 moments + 17 brolls + gap list |
| `07-slides.md` | Beamer block semantics, diagram conventions (Feynman / lattice / MCMC) |
| `08-audio.md` | Voice, SSML patterns, music bed, loudness targets |
| `09-series-identity.md` | QFT / MC / LQCD accent assignment, thumbnails, title cards |
| `10-pipeline-integration.md` | Token ↔ code cross-reference map |

## Hierarchy of authority

When two files appear to conflict:

1. `01-tokens.md` wins on *values* (hex, px, seconds).
2. `00-principles.md` wins on *judgment calls* (is this on-brand?).
3. Source code (`render_moment_clip.py`, `preamble.tex`, etc.) is ground truth
   only until `scripts/check_design_tokens.py` is run; any drift is a bug in the
   code, not in the spec.

## Source anchors

The spec was reconciled from these sources (cited inside each file):

- `CLAUDE_DESIGN_BRIEF.md` — project-level constraints
- `engagement_overhaul/ENGAGEMENT_PLAN.md` — why each intervention exists
- `engagement_overhaul/render_moment_clip.py` — CLIP_REGISTRY + palette
- `engagement_overhaul/render_lecture_broll.py` — BROLL_REGISTRY + palette
- `../livres/slides/preamble.tex` — Beamer color system
- `video_pipeline/README.md` — pipeline stage map
- Validated user feedback in memory: `video_project.md`,
  `feedback_engagement_visuals.md`, `feedback_moment_flexibility.md`

## Versioning

- **v1.0 (2026-04-21)** — Initial codification from existing assets.
- Bump minor when semantic meaning of a token changes.
- Bump major when tone anchor or canvas sizes change (requires re-render sweep).
