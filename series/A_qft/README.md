# Series A — Quantum Field Theory

**Accent:** `#5ba3f5` (blue)  
**Sigil:** `framework/assets/sigil-qft.svg`

## Lectures

| # | Folder | Title | Status |
|---|---|---|---|
| 01 | `01_fields` | The Universe Is Made of Fields | ✅ Scene breakdown · ✅ Narration · ✅ Audio · ✅ HTML |
| 02 | `02_klein_gordon` | The Klein-Gordon Field | 🟡 Scene breakdown |
| 03 | `03_dirac` | The Dirac Equation | 🟡 Scene breakdown |
| 04 | `04_feynman` | Feynman Diagrams and Perturbation Theory | 🟡 Scene breakdown |
| 05 | `05_qed` | Quantum Electrodynamics | 🟡 Scene breakdown |
| 06 | `06_path_integrals` | Path Integrals | 🟡 Scene breakdown |
| 07 | `07_renormalization` | Renormalization | 🟡 Scene breakdown |
| 08 | `08_yang_mills` | Yang-Mills Theory and Spontaneous Symmetry Breaking | 🟡 Scene breakdown |
| 09 | `09_standard_model` | The Standard Model | 🟡 Scene breakdown |

## Production pipeline per lecture

1. Write `narration_transcript.txt` (plain prose, `## Scene NN` headers)
2. `python tools/split_scenes.py narration_transcript.txt audio/`
3. `bash tools/run_edge_tts.sh audio/ audio/`
4. Build HTML via Claude Design (upload `scene_breakdown.md` + design-system docs)
5. `python tools/inject_audio.py . audio/`
