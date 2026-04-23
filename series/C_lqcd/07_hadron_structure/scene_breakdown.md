# LQCD-V07 — Hadron Structure and Finite Volume Effects | Scene Breakdown
**Series:** Lattice QCD
**Episode:** 07 — Hadron Structure and Finite Volume Effects
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

---

## Scene 01 — Masses Are Not Enough

**Concept.** Two-point functions give hadron masses. For precision flavor physics — CKM elements, B-mixing, meson decays — we need matrix elements of operators between hadron states. That requires three-point functions. For internal structure — how are a proton's momentum and spin shared between quarks and gluons — we need parton distributions. Lattice QCD goes beyond the spectrum when it starts answering "what is a proton made of?"

**Animation intent.** Two-point function plot fades in. Then a three-point function appears: source, current insertion, sink. Then a zoomed-in proton with quark/gluon distributions glowing inside.

**Humor note.** "Masses were the easy part. Now we ask the proton to open up and talk about its feelings."

**Runtime.** ~32 s

---

## Scene 02 — Three-Point Functions

**Concept.** A three-point function has three insertions: create a hadron at time zero, insert a current J at time t, annihilate the hadron at time t_s. At large t_s - t and t the ground state dominates on both sides, and C_3 factorizes: |Z_0|^2 e^{-m_H t_s} times the matrix element <H|J|H>. Divide by the two-point function and the exponential prefactors cancel, isolating the desired matrix element.

**Animation intent.** Lattice with three insertion points laid out in time: source, current, sink. Ratio C_3 / C_2 computed, exponentials cancelling, matrix element popping out.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 03 — Decay Constants

**Concept.** The pion decay constant f_pi is defined by the matrix element of the axial current between the pion and the vacuum: <0|A_mu|pi(p)> = i f_pi p_mu. On the lattice, extract f_pi from a two-point function of axial currents. Similarly f_K determines |V_us|/|V_ud|; f_B and f_Bs control B-meson mixing and the extraction of |V_ub| and |V_td|. Modern lattice calculations quote these at sub-percent precision.

**Animation intent.** Pion decaying into muon and neutrino; the amplitude is proportional to f_pi. Table of decay constants: f_pi = 130 MeV, f_K, f_B, f_Bs, with sub-percent uncertainties.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 04 — Semileptonic Form Factors and CKM

**Concept.** For decays like B -> pi ell nu, the hadronic matrix element factorizes into vector and scalar form factors f_+(q^2) and f_0(q^2). The decay rate equals |V_ub|^2 times an integral of |f_+|^2. The lattice computes the form factors; experiment measures the rate. Combining the two gives the CKM element. Lattice QCD is the single dominant source of hadronic uncertainty in most CKM extractions. A tension currently exists between inclusive and exclusive |V_cb| — lattice is central to resolving it.

**Animation intent.** Feynman diagram for B -> pi ell nu, with the hadronic blob labeled f_+(q^2). Unitarity triangle with CKM elements, lattice contributions highlighted.

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 05 — Kaon Mixing: B_K

**Concept.** Neutral kaon mixing is governed by a four-quark operator with Delta S = 2. The bag parameter B_K parametrizes its matrix element between K-bar and K. B_K enters the epsilon_K constraint in the unitarity triangle. Computing B_K requires non-perturbative renormalization of a four-quark operator — a demanding technical problem. The FLAG world average, hat{B}_K = 0.7625(97), is a flagship lattice result.

**Animation intent.** Kaon and anti-kaon swapping through a four-quark operator box diagram. B_K number readout. Link to CKM unitarity triangle.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 06 — The Light-Cone Obstruction

**Concept.** Parton distribution functions (PDFs) are defined in terms of matrix elements of field operators separated along the light cone. The light cone is a feature of Minkowski spacetime; on a Euclidean lattice, the light cone collapses to a point (z^2 >= 0). You cannot directly compute a PDF on a Euclidean lattice. This is not a technical inconvenience — it is a structural feature of the formalism. For decades the lattice could only compute the lowest few Mellin moments, and only up to n = 3 before H(4) operator mixing became uncontrollable.

**Animation intent.** Light-cone diagram in Minkowski: two axes meeting at a point, a separation along the null line highlighted. Wick rotation: the null line collapses. Red warning: "PDFs inaccessible."

**Humor note.** "The lattice's oldest unspoken problem: we went Euclidean for the path integral, and the light cone refused to come with us."

**Runtime.** ~34 s

---

## Scene 07 — Quasi-PDFs and Pseudo-Distributions

**Concept.** Ji (2013) proposed the large-momentum effective theory: compute matrix elements with purely spatial operator separations on a moving nucleon (momentum p_z large), then match perturbatively to the light-cone PDF. Radyushkin (2017) refined this into the pseudo-distribution approach, using Ioffe time nu = p * z as the natural variable. Both methods finally give lattice access to x-dependent PDFs. The inverse problem of reconstructing PDFs from discrete moments is replaced by a direct calculation.

**Animation intent.** Nucleon moving at high momentum; operator pair separated along z-axis (spatial). Ioffe time nu = p*z shown as a Lorentz-invariant ratio. Matching kernel K(u, z^2, alpha_s) applied to extract Q(x).

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 08 — Matching to MS-bar

**Concept.** The reduced pseudo-Ioffe-time distribution M(nu, z^2) computed on the lattice is matched to the MS-bar light-cone PDF via a kernel: M(nu, z^2) = integral du K(u, z^2 mu^2, alpha_s) Q(u nu, mu^2) + O(z^2 Lambda_QCD^2). The kernel is computed in perturbation theory and includes the Altarelli–Parisi splitting functions at NLO. Lattice results for the nucleon isovector <x>_{u-d} agree with phenomenology (CT18, NNPDF) within uncertainties.

**Animation intent.** Convolution equation with matching kernel K. Perturbative splitting function arrows. Result overlaid on phenomenological PDF band — agreement within error bars.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 09 — Generalized Parton Distributions

**Concept.** GPDs generalize PDFs to include momentum transfer between initial and final states. They depend on three variables: x (longitudinal momentum fraction), xi (skewness, measuring the momentum transfer along the light cone), and t (total momentum transfer squared). At xi = 0 the Fourier transform in t gives a two-dimensional impact-parameter density — literally the quark distribution projected onto the transverse plane. GPDs are nucleon tomography.

**Animation intent.** PDF 1D plot; lift to GPD 3D surface over x, xi, t. Fourier transform to impact parameter b_perp giving a 2D density map of the proton.

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 10 — The Ji Sum Rule

**Concept.** The total angular momentum carried by quarks of flavor q is given by Ji's sum rule: 2 J^q = integral dx x [H^q(x, 0, 0) + E^q(x, 0, 0)]. Sum over flavors, add gluons, must recover 1/2. This is a direct route to the proton spin puzzle: the first moment of H is the momentum fraction, and the integral involving E gives orbital angular momentum. The lattice can compute all ingredients; the puzzle becomes quantitative.

**Animation intent.** Ji sum rule equation. Pie chart of proton spin: quark helicity, quark orbital, gluon helicity, gluon orbital — each slice labeled with its lattice estimate.

**Humor note.** "The proton spin: 30% quarks, some gluons, a surprising amount of orbital angular momentum, and an ongoing disagreement about the remaining percent."

**Runtime.** ~32 s

---

## Scene 11 — Excited-State Contamination in Matrix Elements

**Concept.** Three-point functions are dominated by excited states much more severely than two-point functions — at physical pion mass, the nucleon's first excited state contaminates down to very late source-sink times. Strategies: compute at several sink times t_s and extrapolate t_s -> infinity; do explicit two-state fits; use the summation method, which sums the ratio over t and extracts the matrix element from the slope. This is typically the dominant systematic in nucleon structure calculations.

**Animation intent.** Ratio plot at multiple t_s values, each converging but at different late-time plateaus. Two-state fit overlaid. Summation method shown as integral over t.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 12 — Why Finite Volume Matters

**Concept.** Your simulation lives in a box L^3 x T. Pions — the lightest hadrons — feel the box most strongly; their Compton wavelength is the largest. The rule of thumb m_pi L > 4 keeps finite-volume corrections below about one percent. Chiral perturbation theory predicts the leading correction falls like e^{-m_pi L} / (m_pi L)^{3/2}. Smaller boxes can be pushed into the chiral regime where finite volume becomes a feature rather than a bug.

**Animation intent.** Lattice box shrinking. Pion wavefunctions wrapping around. Plot of m_pi(L) - m_pi(inf) falling exponentially in m_pi L.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 13 — The Epsilon Regime

**Concept.** Push the box small enough that m_pi L is of order one. Now zero modes of the Dirac operator dominate the path integral; the theory reduces to a chiral random matrix theory in which low-energy constants become measurable directly. The Banks–Casher relation holds volume-by-volume. The epsilon regime is a controlled corner where finite-volume physics is calculable in closed form — a probe, not a problem.

**Animation intent.** Box with m_pi L ~ 1 highlighted. Inside: Dirac spectrum dominated by a few zero modes. Random matrix theory prediction overlaid on lattice data.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 14 — The Luscher Method

**Concept.** Two interacting particles in a finite box do not have free momenta — interaction modifies their allowed energy levels. Luscher (1986) showed exactly how: the finite-volume spectrum determines the infinite-volume scattering phase shift via delta_0(k) + phi(q) = n pi, where q = kL/(2pi) and phi is a known geometric function. The box is no longer a contaminant; it is an interferometer. Extracting scattering phase shifts becomes a lattice calculation.

**Animation intent.** Two particles in a box with standing-wave solutions. Energy levels shifted by interaction. Luscher's formula written out; phase shift extracted vs energy.

**Humor note.** "Finite volume: the bug that became the feature."

**Runtime.** ~32 s

---

## Scene 15 — Resonances from Finite Volume

**Concept.** A resonance like the rho meson is a short-lived unstable state, unavailable as an asymptotic state on a lattice. But via Luscher, you can extract the pi-pi scattering phase shift, identify where it passes through pi/2 (resonance), and extract the rho mass and width. Modern methods extend this to multiple channels (sigma, K*, f_0), moving frames (to access more kinematic points), and coupled channels (pi-pi / K-Kbar). Resonance spectroscopy is now routine lattice physics.

**Animation intent.** Phase shift vs energy with a sharp rise through pi/2 at the rho mass. Below it a Breit–Wigner bump emerges. Lattice data points overlaid.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 16 — Ward Identities and Current Renormalization

**Concept.** On the lattice you have a choice: use a point-split conserved current (exactly conserved but non-local) or a local current (requires a renormalization factor Z_V). Ward identities relate different renormalization constants and provide non-trivial consistency checks. PCAC — partial conservation of the axial current — works on the lattice up to O(a) corrections in the massless limit. These identities constrain the systematic errors in precision matrix elements.

**Animation intent.** Continuum Ward identity written out; lattice version below with O(a) corrections. Conserved vs local current comparison.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 17 — Low-Energy Parameters: What the Lattice Delivers

**Concept.** The precision deliverables of modern lattice QCD: quark masses (m_u, m_d, m_s, m_c, m_b) with sub-percent errors, decay constants (f_pi, f_K, f_B, f_Bs) at sub-percent, form factors f_+(q^2) for K -> pi and B -> pi with a few percent. Bag parameters B_K, B_B at a few percent. These numbers feed into every Standard Model test: CKM unitarity, K and B mixing, rare meson decays, direct CP violation. Lattice QCD is, quietly, a pillar of BSM searches.

**Animation intent.** Dashboard of numbers with tiny error bars. CKM unitarity triangle with lattice contributions to each side labeled.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 18 — What's Hard and Open

**Concept.** Not everything is solved. Isospin-breaking effects and electromagnetic corrections require dynamical QED — now being simulated but expensive. Long-distance contributions to K -> pi pi require handling multi-hadron final states through Luscher. Gluon PDFs are notoriously hard because of operator mixing. The strong CP problem and theta-vacuum physics need better control of topological charge sampling. TMDs (transverse-momentum PDFs) are a frontier. The EIC era will demand more.

**Animation intent.** List of open problems with question-mark badges. Small icons for each. Timeline pointing to EIC (2030+).

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 19 — Summary

**Concept.** Three-point functions give matrix elements, decay constants, form factors, and CKM elements. The light-cone obstruction blocks direct PDFs on Euclidean lattices; quasi-PDFs and pseudo-distributions solve this via matching. GPDs encode nucleon tomography via the Ji sum rule. Excited-state contamination is the dominant systematic in hadron structure. Finite-volume corrections are exponentially small for m_pi L > 4; the Luscher method turns finite volume into a tool for scattering and resonances.

**Animation intent.** Six-bullet summary card with icons (three-point function, decay constant, pseudo-ITD matching, GPD surface, summation method, Luscher phase shift).

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 20 — Next: Thermodynamics and the Finale

**Concept.** Final lecture. Heat up QCD: the deconfinement crossover at 155 MeV, the equation of state for heavy-ion collisions, the Columbia plot of phase structure. Try to add chemical potential: the sign problem, the reason the finite-density QCD phase diagram remains largely unknown. Then a survey of lattice studies beyond QCD — Higgs triviality, Yukawa models, vacuum stability — and a reflection on what the three series together have built.

**Animation intent.** Teaser: QCD phase diagram with T and mu_B axes, crossover line, critical endpoint question mark. Grand-finale title card in background.

**Humor note.** "One lecture left. Everything we have built comes together — including the problem we still cannot solve."

**Runtime.** ~30 s
