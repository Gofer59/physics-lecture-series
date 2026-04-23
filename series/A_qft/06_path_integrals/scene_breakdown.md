# QFT-V06 — Path Integrals | Scene Breakdown
**Series:** Quantum Field Theory
**Episode:** 06 — Path Integrals
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

## Scene 01 — A Different Way to Do Quantum Mechanics

**Concept.** Canonical quantization turns fields into operators and insists on a preferred time direction. Feynman, frustrated by this, proposed a radically different framework: compute quantum amplitudes by summing over every conceivable history, each weighted by exp of i times the classical action. The path integral is that sum. In quantum field theory, the "paths" are not particle trajectories but entire field configurations over all of spacetime. Every configuration contributes. Only one of them is classical.

**Animation intent.** Start with a particle trajectory from A to B. Zoom out: instead of one trajectory, an infinite bundle of wiggling paths, each labelled with a weight e^{i S}. Then shift up a level: each "path" becomes an entire field configuration phi(x,t), shown as a rippling surface. Many surfaces superimpose.

**Humor note.** Dry aside: "Feynman's idea was: instead of asking what happens, just average over everything that could happen, with a funny oscillatory weight. And somehow it works."

**Runtime.** ~35 s

## Scene 02 — The Generating Functional

**Concept.** The central object in the path-integral formulation is the generating functional Z[J]. It is the integral over all field configurations of the exponential of i times the action, plus an external source term J times phi. Functional derivatives of Z with respect to J, evaluated at zero, pull down fields from the exponential and give us the full correlation functions of the theory. A single object Z[J] contains every Green's function of QFT.

**Animation intent.** A big Z[J] labelled "generating functional". Write it as an integral over D-phi of exp i times action plus J phi. Functional derivative symbols pelt it from above, and each one pulls out a phi into the correlator.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 03 — The Free Field: Gaussian Integration

**Concept.** For a free scalar theory, the action is quadratic in phi, so the path integral is Gaussian. Complete the square and integrate: the result is Z[J] equals Z[0] times the exponential of minus one-half J times the Feynman propagator times J. This is the same Feynman propagator we constructed from canonical quantization. The two methods agree. All the hard work of Dyson, Wick, and normal ordering is reproduced by a single Gaussian integral.

**Animation intent.** The quadratic action in a box. Complete-the-square calligraphy. Out pops a clean expression: Z equals the exponential of minus one-half J D_F J. A small note: "same D_F as before".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 04 — Connected Diagrams from W[J]

**Concept.** Z[J] contains both connected and disconnected diagrams. If instead we take the logarithm, minus i log of Z, we get W[J] — the generator of connected correlation functions only. This is exactly the same simplification that cancelled vacuum bubbles in the canonical picture, now rephrased as: take a log. Connected diagrams are the ones that matter, and they are the functional derivatives of W.

**Animation intent.** A big Z full of disconnected blob clusters. Apply minus-i-log: the clusters dissociate, leaving only single connected diagrams in W. Caption: "connected = log".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 05 — The Effective Action

**Concept.** Take one more Legendre transform — from W[J] to Gamma[phi_c] — and you land on the effective action. It generates one-particle-irreducible correlation functions, which are the true building blocks of physics because every reducible diagram is a product of irreducible ones. At tree level the effective action equals the classical action. Loop corrections, resummed, give Gamma its full quantum content — including the effective potential whose minimum is the actual ground state of the theory.

**Animation intent.** A little stack of transformations: S (classical) at the bottom, W[J] above it, Gamma[phi_c] at the top. Each step labelled with its generating role. Tree-level equality shown between S and Gamma.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 06 — Wick Rotation and Statistical Mechanics

**Concept.** The factor of i in the exponential makes the path integral oscillatory and formally ill-defined. Rotate time to imaginary values — t goes to minus i tau — and the exponential becomes e to the minus S_E, a real and convergent weight. This is exactly the Boltzmann weight of statistical mechanics, with the action playing the role of an energy. QFT at zero temperature and statistical mechanics in d+1 dimensions are the same mathematical beast. This is the foundation of lattice field theory and every Monte Carlo simulation in particle physics.

**Animation intent.** A Minkowski light cone drawn in gray. Rotate the time axis 90 degrees clockwise into imaginary time. The cone becomes a Euclidean sphere; the i S in the exponent becomes minus S_E. A plate slides in from the right labelled "stat mech": Z equals sum of exp(-beta H). The two expressions line up perfectly.

**Humor note.** Dry aside: "Wick rotation is the trick by which physicists pretend quantum field theory is just a very elaborate statistical-mechanics problem. The pretence works well enough to simulate QCD on supercomputers."

**Runtime.** ~35 s

## Scene 07 — Grassmann Variables for Fermions

**Concept.** Bosons are described by ordinary numbers. Fermions need anticommuting numbers — Grassmann variables — to reproduce the correct sign behaviour of path-integral fermions. Two Grassmann variables anticommute; any Grassmann variable squared is zero. Integration over them is defined by two rules: integral of 1 equals zero, integral of theta equals one. These minimalist axioms are enough to build the entire fermionic path integral.

**Animation intent.** Two Greek thetas meet; a red arrow shows theta_1 theta_2 equals minus theta_2 theta_1. Another theta squared; the result is zero. Two integration rules appear as tablets: Berezin's axioms.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 08 — The Fermionic Gaussian Integral

**Concept.** For a quadratic fermion action psi-bar A psi, the Gaussian Grassmann integral gives the determinant of A — not its inverse, as for bosons. This single sign flip — det A in the numerator versus (det A) to the minus one-half in the denominator for bosons — is where fermion loops pick up their factor of minus one. It is how the spin-statistics theorem embeds itself into the path integral.

**Animation intent.** Two integral boxes. Boson: integral of exp(-phi A phi) gives 1/sqrt(det A). Fermion: integral of exp(-psi-bar A psi) gives det A. The two results sit side by side; an arrow highlights the inverted power and tags it as "the sign of fermion loops".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 09 — The Gauge Field Problem

**Concept.** Try to integrate naively over the photon field A-mu and you get infinity. The reason is gauge redundancy: infinitely many A-mu configurations are physically equivalent, differing only by a gauge transformation. The path integral double-counts an entire gauge orbit, and the orbit's volume is infinite. Something must be done before the theory makes sense.

**Animation intent.** A blob representing the "space of gauge fields". Inside, coloured orbits loop back on themselves — each orbit is one physical configuration, every point on it a gauge copy. The integration volume diverges because every orbit is counted infinitely.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 10 — The Faddeev-Popov Trick

**Concept.** Faddeev and Popov's solution is ingenious. Insert a gauge-fixing condition — say, partial-mu A-mu equals zero — multiplied by a Jacobian determinant that compensates for the insertion. The determinant, rewritten as another Grassmann integral, becomes an integral over new anticommuting fields: the ghosts. In QED the ghosts decouple from everything and can be ignored. In non-Abelian theories, they are essential for unitarity, as we will see in Lecture 08.

**Animation intent.** A gauge orbit with a single thin red slice labelled "gauge condition". The Faddeev-Popov determinant slides in as a factor. Rewrite it as an integral over "c-bar, c" ghost fields. In QED, the ghosts float off-screen waving "not needed here!". In the teaser, a "see you in Lecture 08" tag.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 11 — The Photon Propagator in R-xi Gauge

**Concept.** After gauge fixing with a parameter xi, the photon propagator becomes minus i over q squared times g-mu-nu minus (1 minus xi) q-mu q-nu over q squared. The choice xi equals 1 is Feynman gauge — simplest. The choice xi equals 0 is Landau gauge — transverse only. Physical observables must be independent of xi; checking xi-independence is a standard sanity check in any QED or QCD computation.

**Animation intent.** The propagator expression with xi highlighted. A slider moves xi from 0 to 1 to infinity; the propagator shape changes but a physical cross section, plotted beneath, does not move at all.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 12 — Schwinger-Dyson Equations

**Concept.** A path integral is invariant under shifts of the integration variable. Shifting phi by an infinitesimal amount generates an exact equation relating correlators: the Schwinger-Dyson equation. Roughly, the classical equations of motion hold inside correlation functions, up to contact terms that arise when the field coincides with another insertion. This is the non-perturbative quantum generalization of the classical equations of motion.

**Animation intent.** A correlator box with an inserted delta-S-over-delta-phi. The insertion spreads out into a sum of contact terms — delta functions hitting each other field in the correlator. Caption: "quantum equation of motion".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 13 — Ward-Takahashi from Symmetries of the Measure

**Concept.** Apply the same trick with a symmetry transformation instead of a shift. If the path-integral measure is invariant under, say, a global U(1) rotation, a new identity falls out: the Ward-Takahashi identity. It relates the divergence of a current to contact terms. In QED this is exactly the Ward identity we saw from canonical reasoning — now derived in two lines from symmetry of the measure. Every continuous symmetry generates an analogous identity, and these are what tie the whole theory together.

**Animation intent.** A ring labelled U(1) rotates around the path-integral measure. The result: a divergence of the current on one side, a sum of delta-function contact terms on the other. A little badge reading "Ward-Takahashi".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 14 — Anomalies: When the Measure Is Not Invariant

**Concept.** Sometimes a symmetry of the classical action fails to be a symmetry of the quantum path-integral measure. That mismatch is called an anomaly, and it has physical consequences. The axial current in QED acquires a nonzero divergence at one loop — the chiral anomaly — which correctly predicts the rate of neutral pion decay to two photons. In the Standard Model, anomaly cancellation across all fermions is a nontrivial constraint on the particle content. Symmetries can break quantum mechanically, and when they do, nature takes notice.

**Animation intent.** Classical action has U(1)-axial symmetry; apply the rotation to the quantum measure, and an explicit non-invariant piece appears — an epsilon-tensor-FF-dual term. This is the chiral anomaly. The pion-to-two-photon decay rate is stamped as "predicted correctly".

**Humor note.** Dry aside: "The word 'anomaly' sounds like a bug. It is a feature. Some of the most important numbers in particle physics come from the measure being quietly non-invariant."

**Runtime.** ~35 s

## Scene 15 — Euclidean Action and Lattice QCD

**Concept.** Wick-rotate to Euclidean signature, discretize spacetime onto a finite lattice, and the path integral becomes a finite-dimensional integral suitable for a computer. Each link of the lattice carries a gauge field element; each site a fermion variable. Monte Carlo sampling draws configurations with weight exp of minus S_E. This is how lattice QCD computes the proton mass, hadron spectra, and nuclear matrix elements from first principles.

**Animation intent.** A four-dimensional lattice rendered as a three-dimensional grid. Links are tagged with matrix-valued gauge fields; sites with fermion variables. A random-number generator sprays samples across the lattice; an average is printed out below: "proton mass from QCD — agrees with experiment".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 16 — Path Integrals Beyond Perturbation Theory

**Concept.** Feynman diagrams are a Taylor series of the path integral around a classical vacuum. But not every interesting physical phenomenon is close to that vacuum. Instantons — finite-action classical solutions in Euclidean time — contribute non-perturbative effects invisible to diagrams. Solitons, vacuum tunneling, theta vacua in QCD: all of these live outside perturbation theory and are naturally described by the path integral. It is the more general framework.

**Animation intent.** A potential landscape with two minima. A diagrammatic power series explores only one minimum. An instanton trajectory arcs between the two wells; it cannot be seen by the series but is a legitimate contribution to Z. Caption: "non-perturbative effects live here".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 17 — The Effective Potential

**Concept.** The effective action Gamma[phi_c] evaluated on a constant field gives the effective potential V_eff. Its minimum — not the minimum of the classical potential — is the actual quantum ground state. Loop corrections can shift or tilt the potential, sometimes drastically. Spontaneous symmetry breaking, the Higgs mechanism, radiative symmetry breaking: all are most cleanly understood as statements about the shape of V_eff.

**Animation intent.** A classical potential in one shape. Apply one loop of corrections: the potential wobbles and its minimum moves. Label: "the real ground state is here".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 18 — Why Path Integrals Won

**Concept.** Path integrals won the modern QFT textbook because they do things canonical quantization does poorly. Gauge theories are natural. Symmetries are manifest. Non-perturbative effects are tractable. Statistical mechanics and lattice simulations are a Wick rotation away. And the formalism extends cleanly to gravity — despite not giving a renormalizable theory there, it has generated every serious attempt at quantum gravity since the 1960s. Canonical still has its place. But the path integral is the lingua franca.

**Animation intent.** Two trophies. Canonical quantization on the left, path integrals on the right. A scoreboard: "gauge theories: path integrals", "symmetries: path integrals", "lattice: path integrals", "intuitive for canonical 2-states: canonical". Path integrals win 3 to 1.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 19 — Recap

**Concept.** The path integral reformulates QFT as a functional integral over field configurations weighted by exp i S. Correlators come from functional derivatives of Z[J]; connected correlators from W[J]; irreducible ones from the effective action. Grassmann variables handle fermions, with a determinant where bosons get its inverse. Gauge fields need Faddeev-Popov ghosts to make sense of the redundancy. Wick rotation connects QFT to statistical mechanics and lattice simulations. Symmetries give Ward identities and, occasionally, anomalies.

**Animation intent.** Six icons in order: giant integral symbol, functional derivative, log, Grassmann theta, ghost, rotated clock face. Final stamp: "path integrals — done".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 20 — Next: Renormalization

**Concept.** Loop integrals diverge at high energy. The path integral and Feynman-diagram approaches both have this problem. Next episode confronts the UV: regularization schemes, dimensional regularization, counterterms, the running of couplings, and Wilson's picture of integrating out high-energy modes. After this lecture, QED predictions will go from three decimal places to twelve, and the concept of a "theory" will quietly shift from an immutable Lagrangian to a family of Lagrangians that live at different energy scales.

**Animation intent.** A loop integral diverging; a red scissors labelled "renormalization" cuts off the top. A slider for energy scale appears. The coupling constant alpha dances as the slider moves. Caption: "next: taming the infinities".

**Humor note.** None.

**Runtime.** ~25 s
