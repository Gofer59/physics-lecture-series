# QFT-V04 — Feynman Diagrams and Perturbation Theory | Scene Breakdown
**Series:** Quantum Field Theory
**Episode:** 04 — Feynman Diagrams and Perturbation Theory
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

## Scene 01 — The Doodle That Runs the Universe

**Concept.** Every textbook of particle physics is full of little cartoons: straight lines, wavy lines, curly lines, joined at vertices. These are not mnemonics or illustrations. Each diagram is an algorithm: a precise instruction to write down a contribution to a scattering amplitude. Compute enough of them and you can predict the outcome of a collision at the LHC to six decimal places. The story of this episode is how an abstract perturbation series in the interaction picture becomes a set of pictures anyone can draw on a napkin.

**Animation intent.** A napkin sketch of a tree-level QED diagram — electron, positron, photon — zooms in. Each line and vertex gets labelled with a mathematical expression. Below it, a cross section number emerges with many decimal places.

**Humor note.** Dry aside: "Feynman diagrams are how physicists have been getting away with drawing rather than computing since 1949. This is not a bug."

**Runtime.** ~35 s

## Scene 02 — Interacting Theories: Three Examples

**Concept.** Before diagrams we need interacting Lagrangians. The simplest is phi-to-the-fourth theory: a scalar field with a lambda phi^4 interaction. Next is Yukawa theory: a Dirac fermion and a scalar with a coupling g psi-bar psi phi. Finally QED: a Dirac electron coupled to an electromagnetic vector potential through a covariant derivative. Each adds a specific vertex to the rulebook; the rest of the machinery is identical.

**Animation intent.** Three panels showing three Lagrangians. For each, a single "vertex icon": phi-phi-phi-phi meeting at a point, psi-psi-phi meeting at a point, psi-psi-photon meeting at a point.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 03 — The Interaction Picture

**Concept.** To do perturbation theory, we split the Hamiltonian into a free part H_0 and an interaction H_int. Fields are evolved with H_0 (so they behave like the free theory we already understand), while states pick up the effect of H_int. This is the interaction picture — a hybrid between Schrodinger and Heisenberg that is purpose-built for computing transition amplitudes order by order.

**Animation intent.** Three clocks labelled Schrodinger, Heisenberg, and Interaction. In the Interaction clock, the operators tick slowly (free), the states tick in a separate, smaller clock (interaction). Arrows show the different evolution rules.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 04 — Dyson's Time-Ordered Exponential

**Concept.** The amplitude for a state at time t given a state at time t_0 is the time-ordered exponential of minus i times the integral of H_int. Expanding the exponential gives an infinite series: one term with zero insertions of H_int, one with one, one with two, and so on. Each term is a time-ordered product of fields. This is Dyson's series, and every Feynman diagram you will ever draw is a piece of it.

**Animation intent.** Write U = T exp of minus i H_int integral. Expand it as a sum: zeroth order = 1, first order = one vertex, second order = two time-ordered vertices, and so on. Each term becomes a cartoon with the corresponding number of dots.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 05 — Correlation Functions

**Concept.** What we really want to compute is a correlation function: the vacuum expectation value of a time-ordered product of fields in the full interacting theory. A master formula relates this to the free-theory vacuum expectation value of the same product multiplied by Dyson's series. The denominator cancels all the vacuum bubbles. We have reduced the interacting theory to free-theory calculations plus some combinatorics.

**Animation intent.** A Greek Omega (interacting vacuum) morphs into a zero (free vacuum) wrapped in a Dyson series expansion. Vacuum bubbles drift to a denominator where they cancel against identical copies in the numerator.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 06 — Wick's Theorem

**Concept.** The combinatorial key is Wick's theorem. It says: a time-ordered product of free fields equals a normal-ordered version of the same product plus a sum over all possible pairwise contractions. A contraction is just the Feynman propagator between the two points. Because normal-ordered operators annihilate the vacuum, only the fully contracted terms survive in a vacuum expectation value — and those are exactly sums of propagators tied together.

**Animation intent.** Four field operators at four spacetime points. Draw every possible pairing of them — three distinct pairings — and each pairing becomes a product of two propagator lines joining the corresponding points. Normal-ordered leftovers fade to zero.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 07 — From Wick to Diagrams

**Concept.** Every term in the Dyson expansion, after applying Wick's theorem, is a sum of products of propagators connecting external points through interaction vertices. Draw each such product as a graph: dots for external points, dots for vertices, lines for propagators. The graph and the analytic expression are in one-to-one correspondence. The Feynman diagram is literally a picture of the Wick contractions.

**Animation intent.** A Wick-contracted expression with lots of propagator subscripts morphs, term by term, into the corresponding diagram: external legs, internal lines, vertex dots.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 08 — Momentum-Space Feynman Rules

**Concept.** Because translation invariance gives us momentum conservation at each vertex, it is usually easier to work in momentum space. The rules distill to: propagator equals i over p-squared minus m-squared plus i-epsilon; vertex equals minus i lambda (or minus i g, or minus i e gamma-mu, depending on the theory); external lines carry their on-shell momentum; impose momentum conservation at each vertex; integrate over every internal (loop) momentum; divide by the symmetry factor. These six rules generate every perturbative QFT prediction.

**Animation intent.** A card deck of six rules appears, each card showing a diagram fragment and the associated mathematical factor. The cards get stamped: "Feynman Rules".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 09 — Symmetry Factors and the Devil in the Combinatorics

**Concept.** Two diagrams that look the same up to relabelling should not be counted twice. Each diagram comes with a symmetry factor in its denominator, equal to the number of ways you can permute its internal lines and vertices without changing the graph. These factors are the single most common source of bookkeeping errors in QFT calculations, which is why experienced physicists develop mild compulsive habits around them.

**Animation intent.** A self-loop diagram with its symmetry factor of 2 explicitly written underneath. Next to it, a "naive" wrong answer with no symmetry factor, crossed out in red. A numerical cross section shifts accordingly.

**Humor note.** Dry aside: "An entire subfield of graduate-student anxiety is dedicated to the question: is that symmetry factor 2, 4, or 8?"

**Runtime.** ~35 s

## Scene 10 — Vacuum Bubbles and Connected Diagrams

**Concept.** Disconnected diagrams with closed vacuum loops and no external legs — vacuum bubbles — exponentiate and cancel exactly between the numerator and the denominator of the correlation-function formula. The remarkable consequence is that only connected diagrams contribute to physical observables. You can throw away the bubbles without a second thought. This is the first major simplification of the perturbative expansion.

**Animation intent.** A messy diagram with external lines plus floating disconnected bubbles. The bubbles exponentiate into a Greek Z in the denominator; the bubbles cancel top and bottom and fade away. A cleaner connected diagram remains.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 11 — The S-Matrix

**Concept.** The physical object of ultimate interest is the S-matrix: the amplitude to go from an asymptotic incoming state to an asymptotic outgoing state. We write S equals 1 plus i times T, where T is the non-trivial piece. Each matrix element of T extracts a 4-momentum-conserving delta function and an invariant amplitude M, which is the sum of connected amputated Feynman diagrams. S-matrix unitarity — S-dagger S equals 1 — imposes the optical theorem, a deep constraint linking the imaginary part of forward scattering to total cross sections.

**Animation intent.** Two clusters of particles on either side of a grey "scattering box". Inside the box, a sum of diagrams. An arrow labelled S connects them. Underneath, S = 1 + iT is written in symbol form.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 12 — LSZ: From Correlators to Amplitudes

**Concept.** Correlation functions are not quite S-matrix elements. There is a procedure — the Lehmann-Symanzik-Zimmermann reduction formula — that connects them. In practice it means: compute the n-point correlation function; strip off (amputate) the external propagators by multiplying by their inverse (which amounts to the Klein-Gordon operator for scalars or the Dirac operator for fermions); evaluate on-shell. The resulting amputated amplitude is what you plug into cross-section formulas.

**Animation intent.** A correlation function with external propagator "blobs" attached to every leg. Each blob gets amputated — snipped off with a pair of scissors — leaving the bare amplitude M.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 13 — From Amplitude to Cross Section

**Concept.** Once we have M, extracting a cross section is bookkeeping. The differential cross section is the squared magnitude of M times the Lorentz-invariant phase-space measure divided by an incident flux. The phase-space measure collects a 4-momentum-conserving delta function with d-cubed-p over 2E factors for every outgoing particle. Summed or averaged over spins as appropriate, this gives a number the experimentalist can measure.

**Animation intent.** A formula box: d-sigma proportional to |M|^2 times d-Pi_LIPS over flux. The phase-space measure visibly assembles from the delta function and the outgoing particle slots. An arrow leads to an experimental histogram.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 14 — Two-to-Two Scattering in the Center-of-Mass

**Concept.** The simplest nontrivial process is two particles in, two particles out. In the centre-of-mass frame the differential cross section with respect to solid angle is |M|^2 divided by 64 pi^2 times the centre-of-mass energy squared, with an extra factor of outgoing over incoming momentum if the masses differ. This one formula dominates the undergraduate textbook because almost every canonical experiment — e+e- to mu+mu-, Compton, Bhabha — is a 2-to-2 process.

**Animation intent.** A centre-of-mass diagram: two particles come in head-on, two go out at angle theta. The formula for d-sigma over d-Omega written clearly. A scattering angle indicator slides around, and the cross section curve updates live.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 15 — Decay Rates and Lifetimes

**Concept.** For a particle of mass M decaying into n products, the differential decay rate has the same structure as a cross section — modulus M squared times phase space — but divided by 2M instead of an incoming flux. The total rate Gamma is the inverse of the particle's mean lifetime. Branching ratios are the fraction of decays into a particular channel. This is how the muon's lifetime, the pion's, and the Z boson's are all computed.

**Animation intent.** A single particle at rest; outgoing products. A stopwatch labelled tau = 1 over Gamma; a pie chart of branching ratios splits the total rate among channels.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 16 — Mandelstam Variables

**Concept.** For 2-to-2 processes, the three natural Lorentz-invariant kinematic variables are called s, t, and u — the Mandelstam variables. They are built from sums and differences of the ingoing and outgoing 4-momenta, and they satisfy the constraint that their sum equals the sum of squared masses. Each Feynman diagram "lives" in one of them: s-channel, t-channel, or u-channel, depending on which line in the diagram carries the exchanged momentum.

**Animation intent.** A 2-to-2 diagram drawn three ways: s-channel (exchanged line vertical), t-channel (horizontal), u-channel (crossed). The corresponding Mandelstam variable is highlighted on the internal propagator in each.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 17 — Yukawa Scattering Worked Example

**Concept.** Take two Dirac fermions scattering via the exchange of a scalar — the Yukawa model. At tree level, two diagrams contribute: a t-channel scalar exchange and a u-channel scalar exchange (because the fermions are identical). The amplitude squared and averaged over spins produces the Yukawa potential in the non-relativistic limit — an attractive force that falls off like a screened Coulomb, with range given by one over the scalar mass. This was Yukawa's original model of the nuclear force.

**Animation intent.** Two fermion arrows meeting, exchanging a dashed scalar line (t-channel); a second diagram with the two outgoing lines crossed (u-channel). Fade into a plot of V(r) = -g^2/(4 pi r) times exp(-m_phi r).

**Humor note.** None.

**Runtime.** ~30 s

## Scene 18 — Reading Off Fermion Lines

**Concept.** A useful practical rule: for any amplitude containing a fermion line, write the spinors and vertices from right to left, following the arrow on the diagram backwards. An incoming fermion contributes a u spinor on the right; an outgoing fermion contributes a u-bar on the left. Vertices and propagators get sandwiched in between in the order they appear along the line. The prescription is strange at first and completely mechanical once learned.

**Animation intent.** A fermion line drawn left to right on screen. An arrow pointing to the right along it. The writing order of the mathematical expression runs in the opposite direction, with u on the right, vertices in the middle, u-bar on the left.

**Humor note.** Dry aside: "Many physicists have spent an unreasonable portion of their PhD worrying about which direction to write a fermion line. The answer is: against the arrow. Always."

**Runtime.** ~35 s

## Scene 19 — Recap

**Concept.** We broke the Hamiltonian into free and interacting pieces, expanded the time-evolution operator as a Dyson series, applied Wick's theorem to time-ordered products, and matched each term to a Feynman diagram. Only connected amputated diagrams contribute to the S-matrix. Squaring the amplitude and integrating over phase space gives cross sections and decay rates. Every real-world particle-physics calculation fits into this skeleton.

**Animation intent.** Five icons: the Dyson series, Wick pairings, connected diagrams, amputation with scissors, the final cross section histogram. Final line: "perturbation theory — done".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 20 — Next: QED Done Properly

**Concept.** With the machinery of Feynman diagrams and perturbation theory in hand, we can finally do the crown jewel: Quantum Electrodynamics. Next episode derives the QED Feynman rules from the gauge-invariant Lagrangian, computes e+e- annihilating to muon pairs, tackles Compton scattering, and introduces the Ward identity — the first example of a symmetry principle protecting the theory from otherwise-fatal infinities.

**Animation intent.** Three famous QED diagrams sketched in sequence: e+e- to mu+mu-, Compton, Bhabha. Caption: "next: the most precise theory ever tested".

**Humor note.** None.

**Runtime.** ~25 s
