# Series C — Lattice QCD

**Accent:** `#b589e8` (violet)  
**Sigil:** `framework/assets/sigil-lqcd.svg`

## Lectures

| # | Folder | Title | Status |
|---|---|---|---|
| 01 | `01_foundations` | Lattice Foundations | 🟡 Scene breakdown |
| 02 | `02_gauge_fields` | Gauge Fields and Wilson Loops | 🟡 Scene breakdown |
| 03 | `03_fermions` | Fermions on the Lattice | 🟡 Scene breakdown |
| 04 | `04_chiral` | Chiral Symmetry on the Lattice | 🟡 Scene breakdown |
| 05 | `05_gauge_generation` | Numerical Gauge Generation and Dynamical Fermions | 🟡 Scene breakdown |
| 06 | `06_spectroscopy` | Hadron Spectroscopy and the Continuum Limit | 🟡 Scene breakdown |
| 07 | `07_hadron_structure` | Hadron Structure and Finite Volume Effects | 🟡 Scene breakdown |
| 08 | `08_thermodynamics` | Thermodynamics and the Higgs-Yukawa Model | 🟡 Scene breakdown |

## Production pipeline per lecture

1. Write `narration_transcript.txt` (plain prose, `## Scene NN` headers)
2. `python tools/split_scenes.py narration_transcript.txt audio/`
3. `bash tools/run_edge_tts.sh audio/ audio/`
4. Build HTML via Claude Design (upload `scene_breakdown.md` + design-system docs)
5. `python tools/inject_audio.py . audio/`
