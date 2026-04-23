# LQCD-V05 — Numerical Gauge Generation and Dynamical Fermions | Scene Breakdown
**Series:** Lattice QCD
**Episode:** 05 — Numerical Gauge Generation and Dynamical Fermions
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

---

## Scene 01 — The Integral We Cannot Possibly Do

**Concept.** A realistic lattice has on the order of 10^7 link variables, each a 3x3 SU(3) matrix. The partition function is an integral over all of them, weighted by e^{-S}. Numerical quadrature is hopeless — the dimensionality is astronomical. The only way forward is stochastic: importance sampling. Generate a chain of configurations distributed according to e^{-S}/Z, then average observables over the chain. Monte Carlo turns an impossible integral into a tractable simulation.

**Animation intent.** A lattice with millions of links pulsing. An "integration cost = inf" label. Arrow to a growing chain of sample configurations, each stamped with its weight. Cost meter drops from infinity to "feasible."

**Humor note.** "Ten million links. Direct integration would finish approximately after the heat death of the universe."

**Runtime.** ~32 s

---

## Scene 02 — Markov Chains and Detailed Balance

**Concept.** A Markov chain proposes a new configuration U' from the current one U with some transition probability. Require detailed balance — the probability of the forward step times the equilibrium weight of U must equal the reverse step times the weight of U'. Require ergodicity — every configuration is eventually reachable. Both conditions together guarantee the chain samples the correct distribution. Every lattice algorithm is some clever way to satisfy these two rules.

**Animation intent.** Two configurations with arrows between them labeled by transition probabilities. Equation of detailed balance. Ergodicity drawn as a connected graph covering configuration space.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 03 — The Metropolis Algorithm

**Concept.** For pure gauge theory: pick a link, propose a multiplicative update U -> X*U with X near the identity. Compute the change in action — only the four staples touching that link contribute, so it is cheap. Accept with probability min(1, e^{-DeltaS}). Reject means leave U unchanged. Sweep through all links, repeat. Simple, exact, and local. This is how lattice simulations started in 1980.

**Animation intent.** A single link highlighted on the lattice. The four staples surrounding it light up. A DeltaS number appears, followed by a dice-roll and accept/reject stamp.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 04 — Heat Bath and Overrelaxation

**Concept.** Heat bath replaces a link with a sample drawn directly from its conditional distribution given the neighbors — no rejection step, full thermalization at each link. For SU(2) there is an exact method (Creutz, Kennedy–Pendleton); for SU(3) we embed three SU(2) subgroups via Cabibbo–Marinari. Overrelaxation makes a deterministic move that preserves the action, exploring the constant-action surface. Mix 3–5 overrelaxations per heat bath to decorrelate faster.

**Animation intent.** Heat bath: link gets resampled from a narrow distribution around the staple sum. Overrelaxation: link reflects across the staple direction, DeltaS = 0. Autocorrelation trace tightens dramatically.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 05 — Thermalization and Autocorrelation

**Concept.** Start from a cold lattice (all links = identity) or hot (random SU(3)). The first thousands of sweeps are thermalization — the chain is not yet at equilibrium, throw them away. Once equilibrated, successive configurations are correlated. The integrated autocorrelation time tau_int tells you how many sweeps it takes to get an effectively independent sample. Good observables have tau_int of order 10. Some — topological charge at fine lattice spacing — have tau_int of thousands.

**Animation intent.** Monte Carlo history of the plaquette drifting from hot/cold toward a stable plateau. Autocorrelation function C(t) decaying exponentially. Red warning on a frozen topological charge.

**Humor note.** "Topological freezing: when your Monte Carlo chain would really just prefer not to."

**Runtime.** ~32 s

---

## Scene 06 — Jackknife, Bootstrap, Error Bars

**Concept.** Naive error bars on correlated samples are wrong — they understate uncertainty by a factor of sqrt(2 tau_int). The standard fix is binning (average over bin size much larger than tau_int until errors stabilize), jackknife (leave-one-out resamples), or bootstrap (random resamples with replacement). Every modern lattice paper reports errors from one of these, with explicit autocorrelation correction. Getting the error bar right matters as much as getting the mean.

**Animation intent.** Raw trace of samples binned into chunks. Jackknife: delete-one pseudo-values. Bootstrap: random subsets with replacement. Error bar converging to a stable value as bin size grows.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 07 — The Fermion Determinant Challenge

**Concept.** Add quarks and the partition function picks up a factor of det[D(U)]^{N_f}. This determinant is a functional of the gauge field: every gauge update changes it. Its direct computation — an O(V^3) operation — is completely impossible for realistic lattices. The quenched approximation (set det[D] to a constant) was the workaround for years; it costs about 10% accuracy. For physics we want the real thing: dynamical fermions.

**Animation intent.** Pure gauge lattice suddenly gets quark loops appearing and disappearing. The word "det[D]" grows very large, intimidating. Quenched approximation shown as the loops being erased, with a red "10% error" tag.

**Humor note.** "Quenched QCD: a perfectly good approximation, if you are willing to delete the sea quarks from reality."

**Runtime.** ~32 s

---

## Scene 08 — Pseudofermions

**Concept.** Write det[D-dagger D] as a bosonic Gaussian integral over an auxiliary complex field phi: integral over phi of exp(- phi-dagger (D-dagger D)^{-1} phi). The fermion determinant becomes part of an effective action. For two degenerate flavors this gives |det[D]|^2 exactly. For one flavor (or the rooted staggered case) we need a rational approximation. The determinant never appears directly — only solver calls do.

**Animation intent.** det[D-dagger D] transformed into a Gaussian integral over phi. Effective action S_eff = S_gauge + phi-dagger (D-dagger D)^{-1} phi.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 09 — Hybrid Monte Carlo: The Algorithm

**Concept.** HMC (Duane, Kennedy, Pendleton, Roweth 1987). Give every link a fictitious momentum, drawn from a Gaussian. Evolve both links and momenta under Hamilton's equations for a trajectory of length tau. At the end, do a Metropolis accept/reject on the total fictitious energy DeltaH. If the molecular-dynamics integrator were perfect, acceptance would be 100%. Because it is discrete, there are small DeltaH fluctuations — Metropolis corrects for them exactly. A global update that changes the whole lattice at once.

**Animation intent.** Trajectory in phase space snaking through configurations, with both U and pi evolving. At the end of the trajectory, a Metropolis dice-roll decides accept or reject.

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 10 — The Leapfrog Integrator

**Concept.** Solve Hamilton's equations numerically by leapfrog: half-step the momenta, full-step the links, half-step the momenta. It is symplectic (preserves the phase-space volume), reversible (essential for detailed balance), and has O(eps^2) errors in the Hamiltonian. Higher-order integrators like Omelyan give O(eps^4) at the cost of more force evaluations. The whole of HMC rides on the integrator being time-reversible and symplectic — drop either and detailed balance fails.

**Animation intent.** Step-by-step unfolding of leapfrog: momentum half-kick, position full-drift, momentum half-kick. Phase-space ellipse rotates without changing area.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 11 — Computing the Fermion Force

**Concept.** The molecular-dynamics force has two pieces. The gauge force is cheap: it is a sum of staples, directly computable. The fermion force involves solving (D-dagger D) chi = phi for the pseudofermion field — this means a Krylov solver call for every force evaluation. At light quark masses the solver becomes expensive: its cost scales like 1/m_q^2. Solver cost dominates the simulation.

**Animation intent.** Force computation split in two. Gauge force: small, quick. Fermion force: big meter filling up, labeled "CG solver." Cost bar at bottom growing as m_q shrinks.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 12 — RHMC: Rational Hybrid Monte Carlo

**Concept.** For an odd number of flavors or for rooted staggered simulations we need det[D-dagger D] to a fractional power. Use a rational approximation: factor the fractional power into a sum of partial fractions, each one a separate pseudofermion with a shifted inverse. Remez algorithm tunes the coefficients to machine precision. RHMC is exact up to the approximation quality. MILC, HPQCD, and several others use it routinely.

**Animation intent.** Formula det[D-dagger D]^{1/4} = product over k of (D-dagger D + alpha_k)^{beta_k}, each term a pseudofermion. Accuracy meter pegged at machine precision.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 13 — Algorithmic Improvements That Actually Matter

**Concept.** Multiple time scales: use a finer integration step for the expensive fermion force and a coarser step for the cheap gauge force (Sexton–Weingarten). Mass preconditioning: split det[D] into products indexed by auxiliary heavier masses (Hasenbusch), smoothing out the spectrum. Even-odd preconditioning: exploit a checkerboard structure to halve the linear system. Together these improvements are the difference between "cannot simulate physical pion mass" and "done routinely."

**Animation intent.** Four icons for the four tricks: two clocks (multi-step), three Russian dolls (mass preconditioning), a checkerboard (even-odd), a spectrum with the lowest eigenvalues highlighted (deflation). Cost meter dropping 10x.

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 14 — Solvers Inside Solvers: CG and Beyond

**Concept.** The innermost loop is a Krylov solver for D x = b. Conjugate gradient applies to D-dagger D (gamma_5-hermiticity helps); BiCGStab and GMRES handle non-Hermitian D directly. For near-chiral quark masses, multigrid solvers deliver 10x to 100x speedups by mixing multiple length scales. Domain-decomposition preconditioners (Schwarz methods) further accelerate convergence. The solver determines the wall-clock cost of everything.

**Animation intent.** Pyramid of solver abstractions: outer HMC, inner force, innermost CG iteration loop. Multigrid shown as a V-cycle over lattice resolutions.

**Humor note.** "Lattice QCD is secretly just ten years of solver engineering with some physics layered on top."

**Runtime.** ~32 s

---

## Scene 15 — Physical Pion Mass Is Now Routine

**Concept.** A decade ago, simulating at the physical pion mass m_pi = 135 MeV was a heroic accomplishment. Today it is the baseline. Combination of better algorithms, better solvers, and faster hardware has pushed the chiral extrapolation out of the picture for many observables. You just simulate at the physical point. This is one of the quiet revolutions of the field — almost invisible from outside, transformative inside.

**Animation intent.** Timeline: 2005 (m_pi ~ 500 MeV), 2010 (m_pi ~ 300 MeV), 2015 (physical). Each with a chiral-extrapolation plot next to it, converging to the physical point.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 16 — Topological Freezing at Fine Lattice Spacing

**Concept.** Push toward a -> 0 and the topological charge Q_top gets stuck. Monte Carlo sweeps no longer tunnel between topological sectors — the barrier between them grows with shrinking a. For a < 0.05 fm, topology freezes on simulation timescales. Workarounds include open boundary conditions in time, tempered boundary conditions, and machine-learning-assisted sampling. This is an active research area, not solved.

**Animation intent.** Monte Carlo history of Q_top, jumping freely at coarse a, then flatlining at fine a. Potential landscape with tall barriers between Q sectors.

**Humor note.** "The lattice, having discovered topology, refuses to change its mind."

**Runtime.** ~30 s

---

## Scene 17 — What a Configuration Costs

**Concept.** A typical modern ensemble: a 64^3 x 128 lattice with physical pion mass, domain-wall or clover fermions, several thousand configurations. Cost: roughly ten million core-hours, and terabytes of storage. Ensembles are shared across collaborations — one group generates, many measure. International consortia like CLS and MILC produce libraries that dozens of physics projects use. A single modern ensemble is an infrastructure object.

**Animation intent.** Supercomputer photo blurred in background. Numbers scroll: 64^3 x 128, 10^7 core-hours, 10 TB. Logos of collaborations appear and fade.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 18 — Machine Learning Enters the Chat

**Concept.** Modern efforts apply normalizing flows, score-based models, and neural network proposals to help HMC sample more efficiently — particularly to break through topological freezing and to accelerate near-chiral simulations. Most of these methods are still in proof-of-concept for QCD, but for toy models (Schwinger, phi^4) they already beat traditional sampling. ML for lattice QCD is a rapidly moving frontier.

**Animation intent.** Neural network diagram feeding into an HMC loop. Autocorrelation time dropping. Cartoon Q_top unfreezing.

**Humor note.** "The lattice, meet the neural network. Be nice to each other."

**Runtime.** ~28 s

---

## Scene 19 — Summary

**Concept.** Lattice gauge configurations are generated by Markov chain Monte Carlo. For pure gauge theory: Metropolis, heat bath, overrelaxation. For dynamical fermions: the pseudofermion trick converts the determinant into a bosonic action, which Hybrid Monte Carlo evolves by molecular dynamics plus Metropolis accept-reject. Modern algorithmic tricks — multi-step integration, mass preconditioning, multigrid solvers — make physical pion mass simulations routine. Autocorrelation and topological freezing are the ongoing challenges.

**Animation intent.** Six-bullet summary card with icons (MCMC chain, Metropolis dice, HMC trajectory, pseudofermion arrow, solver pyramid, autocorrelation plot).

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 20 — Next: Spectroscopy and the Continuum Limit

**Concept.** We can generate configurations. Now we ask what to measure. Next time: two-point correlators, effective mass plots, smearing to improve signal, the variational method for excited states, correlated multi-state fits, scale setting via the Sommer parameter or Wilson flow, and the continuum and chiral extrapolations that turn lattice numbers into physical predictions in MeV.

**Animation intent.** Teaser: effective mass plateau emerging from noisy data, variational method eigenvalues separating, Wilson-flow scale-setting plot.

**Humor note.** None.

**Runtime.** ~28 s
