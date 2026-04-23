# 06 — Animation Vocabulary

**Source anchors.** `engagement_overhaul/render_moment_clip.py` (CLIP_REGISTRY),
`engagement_overhaul/render_lecture_broll.py` (BROLL_REGISTRY),
`CLAUDE_DESIGN_BRIEF.md` §7.

**How to use this file.** When picking visuals for a new lecture, search this
catalogue first. If a matching template exists, reuse it with per-lecture
parameters. If no match exists and the concept appears in the gap list
(§6.3), propose an extension. Never duplicate an existing template under a
new name.

---

## 6.1 — CLIP_REGISTRY — 22 moment-clip templates

Canvas 280×180, 3–12 s duration, dark bg. One visual idea per clip.

| Template | Visual | Primary colors | Good trigger keywords |
|---|---|---|---|
| `markov_chain` | State graph, transition path lights up step-by-step | green trail, yellow head | "Markov", "state", "transition", "chain" |
| `histogram_buildup` | Histogram bins grow; KL divergence vs target | blue bars, green target | "distribution", "sampling", "KL", "histogram" |
| `convergence_curve` | Estimator approaches target ± error band | green curve, red error | "converges", "estimator", "error band" |
| `random_walk` | 2D Brownian trail, head tracks step | green trail, yellow head | "random walk", "Brownian", "diffusion" |
| `dice_roll` | 6-sided die tumbling, lands on face | yellow die, red outline | "die", "roll", "random", "uniform" |
| `feynman_vertex` | Legs in, vertex blob, legs out | blue in, red out, yellow vertex | "vertex", "interaction", "coupling" |
| `loop_diagram` | Propagator line + loop arc fades in | yellow prop, green loop | "loop", "one-loop", "self-energy" |
| `propagator_line` | Labeled wavy line left-to-right | yellow line, dim bg | "propagator", "Green function" |
| `lattice_link` | Grid with one link glowing | green highlight, dim grid | "link", "lattice", "gauge" |
| `plaquette_glow` | 2×2 square pulses | yellow center, green fade | "plaquette", "Wilson", "action" |
| `wilson_line` | Staple path grows on lattice | green path, step highlights | "Wilson line", "staple", "path" |
| `equation_focus` | Equation appears, highlight box zooms | text, yellow highlight | "equation", "formula", "expression" |
| `ising_spins` | 2D Ising grid, spins flip stochastically | red up, blue down | "Ising", "spins", "magnetization" |
| `leapfrog_step` | Position+momentum leapfrog trajectory | green pos, blue mom | "leapfrog", "HMC", "symplectic" |
| `acceptance_reject` | Accepted/rejected bars grow | green accept, red reject | "accept", "reject", "Metropolis" |
| `trace_plot` | MCMC trace with diagonal envelope | yellow chain, dim envelope | "trace", "chain history" |
| `autocorrelation` | Lag decay curve + exponential fit | blue correlation, green fit | "autocorrelation", "integrated time" |
| `complex_phase` | Arrows in unit circle rotating | yellow arrows, blue circle | "phase", "complex", "rotation" |
| `path_integral` | Fan of paths, weights shown | green best, dim others | "path integral", "sum over histories" |
| `running_coupling` | β-function flow arrows on coupling | yellow coupling, green fixed points | "running coupling", "β-function", "RG" |
| `correlator_decay` | Exponential decay + noise envelope | blue decay, red noise | "correlator", "C(t)", "decay" |
| `hopping_lattice` | Random walk on discrete lattice | green trail, yellow head | "hopping", "lattice walk", "tight-binding" |

### How a moment clip is specified

See `engagement_overhaul/moment_specs/<stem>.json`. Fields:

```json
{
  "stem": "mc_v03",
  "moments": [
    {
      "concept": "metropolis acceptance",
      "template": "acceptance_reject",
      "params": { "acceptance_rate": 0.62 },
      "t_start": 420.0,
      "duration": 3.0,
      "rationale": "Introduces Metropolis at ~7 min, clip anchors the concept"
    }
  ]
}
```

---

## 6.2 — BROLL_REGISTRY — 17 dual-panel b-roll templates

Canvas 1280×720, 22 s duration, dual-panel (mechanism | outcome).

| Template | Left panel | Right panel | Good trigger keywords |
|---|---|---|---|
| `mcmc_chain_panels` | Trace (steps vs value) | Running posterior histogram | "MCMC", "Metropolis", "posterior" |
| `pi_estimation` | Unit-square dart sampling | π estimate convergence | "Monte Carlo", "π", "rejection" |
| `variance_reduction` | Naive noisy estimator | Variance-reduced smooth | "variance reduction", "control variate" |
| `propagator_perturbation` | Tree-level diagram | Propagator `i/(p²−m²+iε)` | "propagator", "Feynman rule" |
| `vertex_amplitude` | Vertex with loop | Cross-section vs scale | "amplitude", "vertex", "cross-section" |
| `loop_corrections` | Tree / 1-loop / 2-loop stack | Coupling series `α/(4π)^n` | "loop correction", "perturbation" |
| `plaquette_action` | Plaquette on lattice with bond strengths | Action evolves during sampling | "Wilson action", "plaquette", "gauge" |
| `continuum_limit` | Lattice with a → 0 | Quantity converges to continuum | "continuum limit", "a → 0" |
| `wilson_loop` | Rectangular loop on lattice | Area-law decay `exp(−σA)` | "Wilson loop", "confinement", "string tension" |
| `equation_derivation` | Equation steps 1 → 2 → 3 | Running proof commentary | "derivation", "show that", "steps" |
| `ising_mcmc` | 2D Ising spins with cluster flips | Magnetization `m(t)` | "Ising model", "phase transition" |
| `hmc_trajectory` | Phase-space orbit | Energy conservation + acceptance | "HMC", "hybrid Monte Carlo" |
| `path_integral_panels` | Multiple paths with amplitudes | Interference sum | "path integral", "interference" |
| `effective_mass` | Correlator with exponential fit | `m_eff(t)` plateau | "effective mass", "plateau", "ground state" |
| `central_limit` | Exponential samples | Sample-means histogram | "central limit", "CLT", "Gaussian limit" |
| `rg_flow` | RG trajectory in coupling space | β-function + fixed points | "RG flow", "renormalization" |
| `running_alpha` | Vacuum polarization loops | `α_s(Q²)` asymptotic freedom | "asymptotic freedom", "running α" |

### How a b-roll is specified

See `engagement_overhaul/broll_specs/<stem>.json`. Fields:

```json
{
  "stem": "mc_v03",
  "broll_type": "mcmc_chain_panels",
  "params": {},
  "t_start": 640.0,
  "duration": 22.0,
  "rationale": "Anchors the MCMC section; trace + posterior is the canonical MC visual"
}
```

---

## 6.3 — Gap list (proposed future templates)

Concepts that appear in narration but have no matching template. Candidates for
future extensions, proposed during the initial gap-coverage pass.

### QFT gaps
| Name | Layout | What it shows |
|---|---|---|
| `scattering_kinematics` | dual-panel | Mandelstam s/t/u variables rotating; right panel shows cross-section dσ/dΩ |
| `gauge_transformation` | moment | A(x) field rotating under local U(1)/SU(N) transformation |
| `spontaneous_breaking` | dual-panel | Mexican-hat potential on left; vacuum picks a point, Goldstone + Higgs modes on right |
| `dispersion_relation` | moment | ω(k) curve building for massless vs massive fields |
| `anomaly_triangle` | moment | Triangle diagram with three currents |

### MC gaps
| Name | Layout | What it shows |
|---|---|---|
| `gibbs_sampling` | dual-panel | 2D joint density on left; coord-at-a-time updates on right |
| `cluster_algorithm` | moment | Swendsen–Wang cluster forming and flipping |
| `slice_sampling` | moment | Horizontal slice cutting a 1D density, uniform sample on slice |
| `parallel_tempering` | dual-panel | Two chains at T_high/T_low swapping; energy traces on right |
| `importance_sampling` | dual-panel | Target p vs proposal q on left; weighted samples on right |

### LQCD gaps
| Name | Layout | What it shows |
|---|---|---|
| `3d_lattice_gauge` | dual-panel | 3D perspective lattice rotating on left; gauge field magnitude on right |
| `finite_volume` | dual-panel | Box of size L shrinking on left; spectrum bending as L → small on right |
| `critical_slowing` | moment | Autocorrelation time diverging as β → critical |
| `fermion_determinant` | dual-panel | Dirac spectrum on left; det computation cost on right |
| `smearing_stout` | moment | Link smeared over successive iterations, fluctuations damp |

---

## 6.4 — Rules for extensions

1. **Naming.** `snake_case`, domain-suggestive, verb_noun or noun pattern.
2. **One function per template** in the registry file. Import tokens from
   central palette, don't re-declare hex.
3. **Parametric.** Accept the lecture's specific parameters (e.g. temperature,
   coupling, mass) so the same template fits multiple lectures with different
   numbers. See memory: "animation has to be specific to the situation."
4. **Render at canonical size** (280×180 or 1280×720), 25 fps, H.264 yuv420p.
5. **First frame non-blank** for b-roll (avoids PiP flash).
6. **Test overlay** via `ffmpeg -i slide.mp4 -i new_clip.mp4 -filter_complex
   "overlay=..." out.mp4` before committing.
7. **Document in the per-video spec** JSON — no "hidden" clips outside the spec
   files.
