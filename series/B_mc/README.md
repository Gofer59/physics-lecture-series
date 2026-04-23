# Series B — Monte Carlo Methods

**Accent:** `#ffd166` (gold)  
**Sigil:** `framework/assets/sigil-mc.svg`

## Lectures

| # | Folder | Title | Status |
|---|---|---|---|
| 01 | `01_foundations` | Monte Carlo Foundations | 🟡 Scene breakdown |
| 02 | `02_metropolis` | MCMC and the Metropolis-Hastings Algorithm | 🟡 Scene breakdown |
| 03 | `03_advanced_mcmc` | Advanced MCMC Methods | 🟡 Scene breakdown |
| 04 | `04_statistical` | Statistical Analysis of MC Data | 🟡 Scene breakdown |
| 05 | `05_annealing_smc` | Simulated Annealing, SMC and Variational Inference | 🟡 Scene breakdown |
| 06 | `06_implementation` | Practical Implementation | 🟡 Scene breakdown |

## Production pipeline per lecture

1. Write `narration_transcript.txt` (plain prose, `## Scene NN` headers)
2. `python tools/split_scenes.py narration_transcript.txt audio/`
3. `bash tools/run_edge_tts.sh audio/ audio/`
4. Build HTML via Claude Design (upload `scene_breakdown.md` + design-system docs)
5. `python tools/inject_audio.py . audio/`
