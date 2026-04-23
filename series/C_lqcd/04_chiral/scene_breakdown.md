# LQCD-V04 — Chiral Symmetry on the Lattice | Scene Breakdown
**Series:** Lattice QCD
**Episode:** 04 — Chiral Symmetry on the Lattice
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

---

## Scene 01 — Why Chiral Symmetry Is the Soul of QCD

**Concept.** Massless quarks come in two independent chiralities, left and right. The QCD Lagrangian in the massless limit treats them as two decoupled worlds related only by color. This is chiral symmetry. But the physical world has pions that are absurdly light compared to other hadrons, baryons whose masses refuse to line up in mirror multiplets, and a nucleon built almost entirely from binding energy. All of that is chiral symmetry — spontaneously broken by the vacuum.

**Animation intent.** Two colored streams labeled psi_L and psi_R flowing independently through a Dirac operator. A mass term connects them; switch it off, the streams separate. Pion hinted at as a ripple between them.

**Humor note.** "Pions are light because they are the vacuum remembering a broken symmetry. Physics: where a ghost determines the mass spectrum."

**Runtime.** ~34 s

---

## Scene 02 — The Full Symmetry Group

**Concept.** With N_f massless flavors, QCD has a classical symmetry SU(N_f)_L x SU(N_f)_R x U(1)_V x U(1)_A. The vector SU(N_f) and U(1)_V survive: they are flavor rotations and baryon number. The axial SU(N_f)_A is spontaneously broken by the vacuum, giving N_f^2 - 1 Goldstone bosons. The U(1)_A is broken by the quantum anomaly — which is why the eta-prime is unexpectedly heavy rather than being a ninth light pseudoscalar.

**Animation intent.** Full symmetry group written out. Pieces peeling off: U(1)_V stays (baryon number), U(1)_A breaks (anomaly arrow to eta-prime), SU(N_f)_A breaks (spontaneous, N_f^2 - 1 Goldstones).

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 03 — Spontaneous Chiral Symmetry Breaking

**Concept.** The QCD vacuum is a condensate: <psi-bar psi> is nonzero, around -(250 MeV)^3. This order parameter transforms nontrivially under axial rotations, so the vacuum does not respect chiral symmetry even though the Lagrangian does. The consequence: for two flavors, three Goldstone bosons — the three pions. Their masses vanish in the chiral limit, and the Gell-Mann–Oakes–Renner formula gives m_pi^2 ~ m_q for small quark mass.

**Animation intent.** Mexican-hat potential with the vacuum resting in the trough. Tangential modes are massless Goldstones. Label: "pion." Side plot: m_pi^2 vs m_q, straight line from the origin.

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 04 — Nielsen–Ninomiya Strikes Back

**Concept.** We already met this theorem: any doubler-free, local, translation-invariant lattice Dirac operator cannot satisfy {D, gamma_5} = 0. The standard formulation of chiral symmetry is impossible on a lattice. For two decades this seemed to be the final word — every lattice fermion had to either double, delocalize, or break chiral symmetry explicitly. Wilson broke it; staggered kept only a U(1) remnant. Something had to give.

**Animation intent.** The four conditions of Nielsen–Ninomiya stacked on one side, a "no chiral lattice fermions" stamp on the other. Calendar showing 1981 to 1997 passing.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 05 — Ginsparg and Wilson, 1982

**Concept.** In a paper that was immediately forgotten, Ginsparg and Wilson proposed a modified anticommutator: D gamma_5 + gamma_5 D = a D gamma_5 D. The right-hand side is local, but only vanishes as a -> 0. It is "broken" at finite a, but in a precisely controlled way — a contact term that affects only coincident points, not the propagator at separation. The physical chiral Ward identities would still hold. No one knew what to do with it.

**Animation intent.** The GW equation written on a blackboard in 1982 handwriting. A dusty archive label appears. Timeline advances 15 years.

**Humor note.** "Fifteen years is roughly the half-life of a good idea that arrives too early."

**Runtime.** ~32 s

---

## Scene 06 — Luscher's Exact Lattice Chiral Symmetry

**Concept.** In 1998 Luscher showed the Ginsparg–Wilson relation implies an exact symmetry of the massless action: a modified chiral rotation where gamma_5 gets replaced by gamma_5-hat = gamma_5(1 - a D). This is not a trick — it is a genuine continuous symmetry, with a conserved current, Ward identities, and all the structure you expect. Nielsen–Ninomiya assumed the naive rotation; Luscher found a better one.

**Animation intent.** Continuum rotation -> modified lattice rotation, with the (1 - a D/2) factor written in. Badge: "exact lattice chiral symmetry." A crossed-out Nielsen–Ninomiya no-go stamp.

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 07 — The Dirac Spectrum on a Circle

**Concept.** The Ginsparg–Wilson relation forces the eigenvalues of D to lie on a circle in the complex plane, centered at 1/a with radius 1/a. Real eigenvalues sit at two points: lambda = 0 (exact zero modes) and lambda = 2/a (doubler modes at the top). Complex eigenvalues come in conjugate pairs. As a -> 0, the circle grows until it becomes the continuum imaginary axis. Chiral structure is literally drawn in the spectrum.

**Animation intent.** Complex plane with a clean circle of Dirac eigenvalues. Zero mode dot at the left, doubler dot at the right. Arrow: as a -> 0, circle straightens into the imaginary axis.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 08 — Zero Modes and Topology

**Concept.** The zero modes of a Ginsparg–Wilson Dirac operator have definite chirality, either +1 or -1. Their net count — n_+ minus n_- — equals the topological charge Q_top of the gauge configuration. This is the Atiyah–Singer index theorem, realized exactly on the lattice. A deep piece of continuum differential geometry is not lost in discretization; it is preserved by the right choice of fermion action.

**Animation intent.** Gauge configuration with an instanton-like lump. Inside it, one zero mode lights up with definite chirality. Equation: ind(D) = n_+ - n_- = Q_top.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 09 — The Axial Anomaly Survives

**Concept.** In the continuum, the axial U(1) symmetry is broken by the quantum anomaly: d_mu j_5^mu = 2m psi-bar i gamma_5 psi + (N_f / 16 pi^2) Tr[F F-tilde]. Ginsparg–Wilson fermions reproduce this anomaly exactly from the Jacobian of the modified chiral transformation. The same modification that gives an exact chiral symmetry on the lattice also gives the correct anomalous breaking of its U(1) subgroup. Nothing is lost.

**Animation intent.** Divergence of axial current on one side; classical zero, quantum F F-tilde term on the other. Jacobian of the Luscher transformation highlighted as the lattice origin.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 10 — The Chiral Condensate as an Order Parameter

**Concept.** The order parameter for spontaneous chiral symmetry breaking is <psi-bar psi>. On the lattice with Ginsparg–Wilson fermions, it equals minus the average of the inverse Dirac operator per unit volume — directly physical, no additive renormalization. With Wilson fermions you instead have to subtract a power divergence of order 1/a^3 before anything physical remains. Ginsparg–Wilson gives you the answer cleanly; Wilson makes you bleed for it.

**Animation intent.** Two side-by-side computations. Wilson: diverging 1/a^3 piece that needs subtraction. GW: clean trace of D^{-1}. Arrow to the same physical number, -(250 MeV)^3.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 11 — Banks–Casher: Condensate from Spectrum

**Concept.** In 1980 Banks and Casher derived a striking identity: <psi-bar psi> = -pi rho(0), where rho(0) is the density of small Dirac eigenvalues in the infinite-volume, massless limit. A nonzero condensate demands an accumulation of near-zero eigenvalues of the Dirac operator. Chiral symmetry breaking, viewed microscopically, is eigenvalues piling up at the spectral origin.

**Animation intent.** Dirac spectrum histogram rho(lambda). Near lambda=0, a clear plateau at rho(0). Arrow: -pi times rho(0) equals the condensate.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 12 — Derivation Sketch of Banks–Casher

**Concept.** The propagator sum over gamma_5-hermitian eigenvalue pairs gives psi-bar psi proportional to a sum of 2m/(m^2 + lambda_k^2). In the infinite-volume limit, replace the sum by an integral over rho(lambda). In the chiral limit m -> 0, the Lorentzian 2m/(m^2 + lambda^2) becomes 2 pi delta(lambda), and the integral collapses to 2 pi rho(0). The order of limits matters: m -> 0 before V -> infinity gives zero; V -> infinity first gives the condensate.

**Animation intent.** Lorentzian curve narrowing as m -> 0, converging to a delta function. Spectral density integrated against it. Order-of-limits diagram with two paths through the V-m plane.

**Humor note.** "Order of limits: where entire physical phenomena hide."

**Runtime.** ~32 s

---

## Scene 13 — Massive Ginsparg–Wilson Fermions

**Concept.** Adding a mass the naive way, m psi-bar psi, breaks the modified lattice chiral symmetry badly. The right construction is D_m = D + m(1 - a D/2) — the mass term comes with its own factor of (1 - a D/2) so that it breaks chirality in exactly the same controlled way the continuum mass does. In the a -> 0 limit it reduces to the continuum Dirac operator plus mass. Even the mass term has to respect the modified symmetry.

**Animation intent.** Mass term appears on top, naive; it glows red. Reform with the (1 - a D/2) factor; it glows green. Limit a -> 0 shows both converging to D-slash + m.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 14 — Chiral Restoration at High Temperature

**Concept.** Heat QCD and the condensate melts. Above a critical temperature around 155 MeV, <psi-bar psi> drops toward zero — the vacuum forgets its chiral bias. In the spectral picture, the accumulation at lambda = 0 evaporates: rho(0) -> 0. For physical quark masses this is a smooth crossover, not a sharp transition, and it happens near the deconfinement crossover. Both order parameters — chiral condensate and Polyakov loop — shift together.

**Animation intent.** Two curves on the same T axis: condensate dropping, Polyakov loop rising, crossover region shaded. Spectrum panel: rho(0) collapsing as T grows.

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 15 — Why the Pion Is Special on the Lattice

**Concept.** With Wilson fermions, the pion is no longer an exact Goldstone at any finite a — chiral symmetry was broken explicitly, so m_pi does not go cleanly to zero. With staggered fermions one pion remains exactly massless in the chiral limit (the U(1)_epsilon Goldstone), while 15 taste partners get discretization-induced masses. With Ginsparg–Wilson fermions, the full pattern of exact Goldstone bosons survives on the lattice — at much higher cost.

**Animation intent.** Pion spectrum across three formulations. Wilson: one pion, slight gap. Staggered: one exact Goldstone plus a tower of taste partners. GW: clean Goldstone multiplet at zero.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 16 — Index Theorem Numerically Visible

**Concept.** Run a simulation with overlap fermions. Count the zero modes of D on each gauge configuration, weight by chirality, and you get an integer for every configuration: the topological charge. This lattice index theorem is practically useful — it lets you monitor topological charge, check for topological freezing at fine lattice spacing, and probe theta-vacuum physics. An abstract geometric result becomes a diagnostic.

**Animation intent.** Monte Carlo history of Q_top bouncing between integers -2, -1, 0, 1, 2. At very fine lattice spacing the trajectory flattens out — "topological freezing."

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 17 — Practical Cost of Chirality

**Concept.** Ginsparg–Wilson fermions — overlap or domain wall — cost 10 to 100 times Wilson per Dirac inversion. That cost buys you exact chiral symmetry, integer topological charge, direct access to the condensate, and controllable chiral extrapolations. For most precision physics this is worth it; for others, improved Wilson or staggered at cheap cost is good enough. Every collaboration chooses a spot on this trade-off curve.

**Animation intent.** Cost-vs-chirality plot: Wilson at bottom-left (cheap, bad chirality), overlap at top-right (expensive, perfect chirality), staggered and domain wall in between.

**Humor note.** "Chiral symmetry: the fermion feature that costs roughly as much as a new supercomputer."

**Runtime.** ~28 s

---

## Scene 18 — The Epsilon Regime

**Concept.** Push the lattice into a corner of parameter space where the pion Compton wavelength is larger than the box: m_pi L < 1. In this "epsilon regime," zero modes of the Dirac operator dominate the path integral, and the theory reduces to a chiral random matrix model. It sounds exotic, but it is a controlled tool: extracting the chiral condensate and low-energy constants from a regime where the physics is genuinely different.

**Animation intent.** Small box labeled "m_pi L < 1." Inside: the Dirac spectrum dominated by a few zero modes. Arrow to random matrix theory cartoon.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 19 — Summary

**Concept.** Continuum QCD has SU(N_f)_L x SU(N_f)_R chiral symmetry, spontaneously broken, producing pions. Nielsen–Ninomiya forbids the naive realization on a lattice. The Ginsparg–Wilson relation evades it by allowing an exact but modified chiral symmetry, realized by overlap and domain wall fermions. The lattice index theorem ties zero modes to topology. Banks–Casher connects the condensate to spectral density. Chiral symmetry is restored at high temperature.

**Animation intent.** Six-bullet summary card with icons from earlier scenes (condensate, GW equation, modified rotation, Dirac circle with zero mode, Banks–Casher plateau, condensate melting).

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 20 — Next: Generating Configurations

**Concept.** We have the action, the fermion formulation, and the chiral structure. What is missing is how to actually sample gauge configurations on a computer. Next time: Metropolis for pure gauge theory, heat bath, overrelaxation, the fermion determinant as a pseudofermion action, and Hybrid Monte Carlo — the algorithm that made dynamical lattice QCD possible.

**Animation intent.** Teaser of Monte Carlo sweep: links flickering, acceptance ratio counter. A molecular-dynamics trajectory snaking through configuration space. Label: "next lecture."

**Humor note.** "The lattice is well-defined. Good. Now the hard part: getting a computer to explore it without getting stuck forever."

**Runtime.** ~30 s
