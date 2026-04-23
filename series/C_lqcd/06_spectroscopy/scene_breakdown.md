# LQCD-V06 — Hadron Spectroscopy and the Continuum Limit | Scene Breakdown
**Series:** Lattice QCD
**Episode:** 06 — Hadron Spectroscopy and the Continuum Limit
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

---

## Scene 01 — What the Lattice Actually Measures

**Concept.** You spent millions of core-hours generating gauge configurations. What do you do with them? The flagship output of lattice QCD is the hadron spectrum: masses of pions, kaons, protons, neutrons, Delta baryons, glueballs — all computed from first principles with no free parameters beyond quark masses and the overall scale. In 2008, the BMW collaboration published the light hadron spectrum agreeing with experiment to within a few percent. This is QCD working, as claimed, out of the box.

**Animation intent.** Bar chart of hadron masses: pion, kaon, proton, neutron, Lambda, Sigma, Xi, Omega. Lattice results overlaid on experimental values — near-perfect agreement. BMW 2008 citation.

**Humor note.** "The spectrum of hadrons, from first principles, to percent accuracy. This is what QCD looks like when it works."

**Runtime.** ~32 s

---

## Scene 02 — The Two-Point Correlator

**Concept.** Choose an operator O with the quantum numbers of the hadron you want — say, d-bar gamma_5 u for the pion. Measure the Euclidean correlator C(t) = sum_x <O(x,t) O-dagger(0,0)> on each gauge configuration and average. Its spectral decomposition is a sum over states of |Z_n|^2 e^{-E_n t}. At large t, the lowest state dominates: C(t) -> |Z_0|^2 e^{-m_H t}. The mass is the slope of the log plot.

**Animation intent.** Operator inserted at two separated points on the lattice. Correlator plotted on log scale; dominant exponential emerges. Label: mass = -slope.

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 03 — Interpolating Operators

**Concept.** To extract a hadron with given quantum numbers, build an operator that couples to it. Pion: d-bar gamma_5 u. Rho: d-bar gamma_i u. Proton: epsilon^{abc} (u^a C gamma_5 d^b) u^c. Delta: epsilon^{abc} (u^a C gamma_mu u^b) u^c. The Dirac structure sets the J^{PC} quantum numbers. Using multiple operators with the same quantum numbers lets you separate ground and excited states via the variational method.

**Animation intent.** Quark building blocks arranged into each hadron. Quantum numbers labeled. Pion, rho, proton, Delta structures rendered with their color epsilon and gamma matrices.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 04 — The Effective Mass Plateau

**Concept.** Define m_eff(t) = ln[C(t)/C(t+1)]. For a pure single-exponential, this is just m_H — a constant. In practice, at small t the excited states contaminate; at large t the signal-to-noise ratio collapses. In between lies the plateau. Plot m_eff vs t, find the flat region, fit a constant. Every lattice paper contains some version of this plot. It is the visual core of spectroscopy.

**Animation intent.** Effective mass plot: decaying curve at small t (excited states), flat plateau in the middle, noise explosion at large t. A fit window highlighted over the plateau.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 05 — The Signal-to-Noise Problem

**Concept.** Baryon correlators decay like e^{-m_B t}, but their variance decays only like e^{-3 m_pi t}. The noise wins exponentially at a rate m_B - (3/2) m_pi. For the proton at the physical pion mass, this is catastrophic: useful signal lasts only a handful of time slices. Meson correlators are better but not immune. Dealing with signal-to-noise is a constant design pressure in lattice spectroscopy.

**Animation intent.** Signal (blue) and noise (red) on log axes, diverging. Window of usable data narrows. Formula e^{-(m_B - 1.5 m_pi) t} displayed.

**Humor note.** "The lattice will measure anything. It will just scream louder at you the further out you ask."

**Runtime.** ~30 s

---

## Scene 06 — Smearing: Make the Operator Look Like a Hadron

**Concept.** A point-source operator creates a localized excitation that overlaps with every state — ground, first excited, tower of radial excitations. Replace it with a smeared operator: Gaussian quark sources of spatial extent comparable to a real hadron size, with gauge-covariant smearing for gauge-invariance. Ground-state overlap goes up, excited-state contamination goes down, plateau appears at earlier t. APE and HYP smearing clean up the gauge links similarly.

**Animation intent.** Point source: sharp delta at one point. Smeared source: a Gaussian blob roughly the size of a hadron. Overlap with ground state shown as a wavefunction integral improving dramatically.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 07 — The Variational Method (GEVP)

**Concept.** Build a matrix of correlators C_{ij}(t) = <O_i(t) O_j-dagger(0)> using several operators with the same quantum numbers. Solve the generalized eigenvalue problem C(t) v_n = lambda_n(t, t_0) C(t_0) v_n. The eigenvalues lambda_n decay like e^{-E_n t}, giving a tower of energy levels in one calculation. The eigenvectors build the optimal operator for each state. This is how modern calculations extract excited hadrons like Roper or exotic hybrids.

**Animation intent.** Matrix C(t) of correlators. GEVP solves for eigenvalues. Multiple effective mass plateaus separate out — E_0, E_1, E_2 — each with its own plot.

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 08 — Correlated and Multi-State Fits

**Concept.** Effective mass points at different t are highly correlated — they come from the same configurations. A naive uncorrelated fit gives meaningless chi^2. Use the jackknife covariance matrix for a correlated chi^2. Multi-state fits include sub-leading exponentials to extend the usable range. Bayesian priors stabilize the fits. Periodic boundary conditions require cosh-shaped fits to handle the wraparound. Rigor in fitting is not optional.

**Animation intent.** Covariance matrix heatmap showing strong off-diagonal correlations. Fit function c_0 e^{-m_0 t} + c_1 e^{-m_1 t} + ... overlaid on data. Priors shown as Gaussian bumps on fit parameters.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 09 — Scale Setting: What Is a in Femtometers?

**Concept.** The lattice only gives you dimensionless ratios. To quote a mass in MeV you need to fix the lattice spacing. Compute a dimensional quantity on the lattice — the Omega baryon mass, the pion decay constant, the Sommer parameter r_0, the Wilson flow scales t_0 and w_0 — and divide the measured lattice value by the known physical value. That gives you a in fm. Different choices give slightly different numbers; tracking these systematic differences is part of the error budget.

**Animation intent.** Table of scale-setting quantities with their physical values. Arrow: measured (am_Omega)^lat divided into m_Omega^phys gives a. Numerical readout: a = 0.09 fm.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 10 — Continuum and Chiral Extrapolations

**Concept.** Lattice results depend on two unphysical parameters: the spacing a (should be zero) and the quark mass m_q (often above physical). Simulate at several a and extrapolate a -> 0 — Wilson has O(a) or O(a^2) leading terms; staggered has O(a^2, alpha_s a^2). Simulate at several m_q and use chiral perturbation theory to extrapolate to the physical pion mass. Modern calculations bypass chiral extrapolation by simulating directly at the physical point, leaving only continuum extrapolation.

**Animation intent.** Two-axis plot: a^2 and m_pi^2. Data points scattered; fit plane extrapolates to origin. Arrow: "physical point."

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 11 — The Symanzik Improvement Program

**Concept.** Every lattice discretization has errors that scale as powers of a. Symanzik's effective theory expresses these errors as a power series in a with coefficients that are continuum operators of the right dimension. Cancel the O(a) term by adding one higher-dimension operator; cancel O(a^2) by adding more; repeat. The practical payoff: the same precision on a coarser lattice. Luscher–Weisz gauge actions and clover fermions are the workhorses.

**Animation intent.** Error bar chart showing a, a^2, a^4 contributions. Add an operator: a term disappears. Stacked bars shrink.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 12 — Clover Term: O(a) Out of Wilson Fermions

**Concept.** Wilson fermions have O(a) errors. Sheikholeslami and Wohlert showed these cancel if you add a single operator: c_SW times sigma_{mu nu} F-hat_{mu nu}, where F-hat is a clover-shaped discretization of the field strength (four plaquettes meeting at a site). At tree level c_SW = 1; non-perturbatively it is tuned to around 1.5–2.0 at typical couplings. With correct c_SW, all on-shell observables are O(a^2).

**Animation intent.** Four plaquettes arranged around a central site, forming a clover. Field strength F-hat emerging. Insertion into the action. Error-order label drops from O(a) to O(a^2).

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 13 — Tadpole Improvement

**Concept.** Perturbation theory on the lattice converges badly because of large "tadpole" contributions from link fluctuations. Parisi's trick, formalized by Lepage and Mackenzie: divide each link by its mean-field value u_0 = <(1/3) Re Tr U_plaq>^{1/4}. This absorbs the dominant tadpoles into a rescaling. Tree-level perturbation theory with tadpole improvement often agrees with data better than unimproved one-loop. At typical beta, u_0 is 0.85 to 0.88.

**Animation intent.** Link variable being divided by u_0. Perturbation series before/after: wild vs well-behaved. u_0 readout of 0.87.

**Humor note.** "Lattice perturbation theory behaves badly. Tadpole improvement: the ibuprofen of the field."

**Runtime.** ~28 s

---

## Scene 14 — Non-Perturbative Renormalization

**Concept.** Lattice operators are not normalized the same as continuum MS-bar operators. To compare to experiment you need renormalization constants Z. Non-perturbative schemes like RI-MOM impose renormalization conditions directly on lattice Green's functions at a scale mu, then convert to MS-bar via perturbative matching. The Schrodinger functional approach is an alternative that avoids Gribov copies. Both are standard for bilinear currents and four-quark operators.

**Animation intent.** Lattice Green function with specific kinematics. Z-factor applied to match tree-level value. Arrow: "match to MS-bar at scale mu."

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 15 — The Running Coupling from the Lattice

**Concept.** The Schrodinger functional coupling g-bar(L) is defined non-perturbatively in a box of size L. Step-scaling — computing the coupling at L and at 2L — traces the running of the coupling over many scales, from the hadronic regime to thousands of GeV. This gives a purely non-perturbative determination of Lambda_QCD and alpha_s(M_Z). Current lattice world average: alpha_s(M_Z) = 0.1184(8), competitive with or better than the extraction from deep-inelastic scattering.

**Animation intent.** Running coupling plot, log E axis, step-scaling procedure shown as sequential box doublings. Lambda_QCD emerging from the data. Number readout alpha_s(M_Z).

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 16 — Precision and Systematic Errors

**Concept.** Lattice QCD has become a precision field. Modern flagship calculations — hadron masses, decay constants, form factors, quark masses — quote sub-percent uncertainties. The error budget has many entries: statistical, continuum extrapolation, chiral extrapolation, finite volume, scale setting, renormalization matching. FLAG (Flavor Lattice Averaging Group) compiles and averages results across collaborations, weighting by quality criteria. Disagreements between methods are how progress happens.

**Animation intent.** Table of error contributions for a single observable, bars of different colors. FLAG logo. Quoted final uncertainty under 1%.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 17 — Excited States and the Hadron Zoo

**Concept.** Beyond ground-state hadrons lies a rich spectrum: radial excitations (pi, pi(1300), pi(1800)), exotic states (X, Y, Z tetraquarks), glueballs (predicted but elusive), hybrid mesons with explicit gluonic content. The GEVP + smearing machinery extracts their masses. Lattice predictions for the glueball spectrum drive experimental searches. For exotic candidates like X(3872), the lattice tests molecular vs compact tetraquark interpretations.

**Animation intent.** Spectrum chart of mesons and baryons rising in energy, with exotic states (glueballs, tetraquarks) highlighted in color. Tower of states from GEVP next to it.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 18 — What BMW 2008 Accomplished

**Concept.** The Budapest–Marseille–Wuppertal collaboration, in a 2008 Science paper, computed the light hadron spectrum to within a few percent of experiment — using only three input parameters: the bare gauge coupling and two quark masses, fixed to reproduce m_pi and m_K. Every other mass — the nucleon, the Omega baryon, all of them — came out as predictions. This was the moment QCD stopped being an unsolved theory.

**Animation intent.** BMW spectrum plot as iconic result. Only three inputs (beta, m_ud, m_s) tagged in. All other masses fall into place across the bar chart.

**Humor note.** "QCD: solved, as much as any theory ever gets solved, in 2008. The particle physicists took their time celebrating."

**Runtime.** ~32 s

---

## Scene 19 — Summary

**Concept.** Hadron masses come from the large-time decay of two-point correlators. Smearing improves overlap with the ground state; the variational method extracts excited states. Correlated multi-state fits control systematics. Scale setting converts lattice units to MeV. Symanzik improvement and clover terms reduce discretization errors. Non-perturbative renormalization connects lattice operators to MS-bar. Step-scaling gives alpha_s and Lambda_QCD. The light hadron spectrum agrees with experiment to percent precision.

**Animation intent.** Seven-bullet summary card with icons from the lecture (correlator, smeared source, GEVP matrix, plateau fit, scale setting, clover, running coupling).

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 20 — Next: Hadron Structure

**Concept.** Masses are just numbers. Next we go inside the hadron: three-point functions, form factors, decay constants, CKM matrix elements, parton distributions, generalized parton distributions. And finite volume — a simulation lives in a finite box, and that box both contaminates results and, through the Luscher method, becomes a powerful tool for extracting scattering amplitudes and resonance properties.

**Animation intent.** Proton rotating slowly, with internal structure — quark and gluon distribution — revealed as it turns. Teaser of a Luscher finite-volume plot.

**Humor note.** None.

**Runtime.** ~28 s
