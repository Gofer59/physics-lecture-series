# QFT-V05 — Quantum Electrodynamics | Scene Breakdown
**Series:** Quantum Field Theory
**Episode:** 05 — Quantum Electrodynamics
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

## Scene 01 — The Most Precise Theory Ever Written

**Concept.** Quantum Electrodynamics is the theory of electrons, positrons, and photons. It predicts the anomalous magnetic moment of the electron to twelve significant figures, matching experiment at every one. It is arguably the most precisely tested theory in the history of science. All of that precision comes from a Lagrangian that fits on a single line, built from a Dirac fermion coupled to a vector field through a local U(1) gauge symmetry.

**Animation intent.** The QED Lagrangian appears, one line. Beneath it, two numbers — theory and experiment — for the electron g-factor, agreeing to twelve decimals. The matching digits light up green one by one.

**Humor note.** Dry aside: "If astrology were accurate to three decimals we would call it a science. QED has twelve and physicists still want more."

**Runtime.** ~35 s

## Scene 02 — The QED Lagrangian

**Concept.** QED has three ingredients. First, the Dirac Lagrangian for the electron. Second, the Maxwell Lagrangian for the photon: minus one-quarter times F-mu-nu squared, where F is the field-strength tensor. Third, and crucially, replace every ordinary derivative by a covariant derivative — partial minus i times e times A-mu — which couples the electron to the photon. That substitution is called minimal coupling, and it is how local gauge invariance demands electromagnetism into existence.

**Animation intent.** Three lines assembling: the Dirac part, the Maxwell F-squared part, and the interaction term. An arrow shows the ordinary derivative being replaced by the covariant derivative, with the resulting vertex term boxed in.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 03 — Gauge Invariance

**Concept.** The QED Lagrangian is invariant under a local phase rotation of the electron field combined with a shift of the vector potential. This is the statement of a local U(1) gauge symmetry. It is not a curiosity: demanding gauge invariance uniquely dictates the form of the coupling, forbids a photon mass term, and will later generalize to Yang-Mills and the whole Standard Model. Electromagnetism is the simplest example of a profound principle.

**Animation intent.** A circle of phase rotations acting on psi. Simultaneously A-mu shifts. The Lagrangian box stays unchanged — a large green tick appears. A red X appears next to a hypothetical "m squared A squared" term, indicating it breaks the symmetry.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 04 — QED Feynman Rules

**Concept.** Read them off. The fermion propagator is i over p-slash minus m plus i-epsilon. The photon propagator in Feynman gauge is minus i g-mu-nu over q-squared plus i-epsilon. The interaction vertex is minus i times e times gamma-mu. External fermions and antifermions get u, v, u-bar, v-bar spinors; external photons get polarization vectors epsilon-mu. Closed fermion loops carry an overall minus sign. That is the complete rulebook for all of QED.

**Animation intent.** The rulebook from Lecture 04 gets relabeled for QED: fermion propagator, photon wavy line, vertex dot with a gamma-mu sticker, external leg spinors and polarizations. A stamp reading "QED Feynman Rules" appears on the card.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 05 — Trace Technology

**Concept.** Computing a cross section means squaring an amplitude, summing over spins, and collapsing the result using the spin-sum identities from the Dirac lecture. What remains is a trace of a long string of gamma matrices. A small library of identities — trace of the identity equals 4, trace of two gammas equals 4 times the metric, trace of an odd number is zero, trace with gamma-5 gives an epsilon tensor — reduces any unpolarized QED amplitude to a few lines of arithmetic.

**Animation intent.** Five little stone tablets, each engraved with a trace identity. They are stacked up: the Trace Technology Toolkit. A cartoon professor wheels in a wheelbarrow labelled "unpolarized cross sections" and empties gamma matrix strings onto the tablets; cross-section numbers come out the other side.

**Humor note.** Dry aside: "Trace technology is the kind of thing that sounds terrifying until someone prints you a cheat sheet. Then it is just algebra with extra steps."

**Runtime.** ~35 s

## Scene 06 — e+e- to mu+mu-: The Canonical Process

**Concept.** The simplest nontrivial QED process: an electron and positron annihilate into a photon, which pair-creates a muon and anti-muon. One diagram only, in the s-channel. Writing down the amplitude using the Feynman rules takes one line. Squaring and averaging over spins reduces, via trace technology, to a clean closed form: the differential cross section is alpha squared over four E-cm squared times (1 plus cosine-squared theta), and the total integrates to 4 pi alpha squared over 3s.

**Animation intent.** The canonical s-channel diagram: electron-positron converging into a photon, photon producing muon pairs. Below, the amplitude expression in one line. Below that, the famous 1 plus cos-squared theta angular distribution plotted as a butterfly shape.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 07 — Helicity Structure and Chirality Conservation

**Concept.** At the QED vertex, psi-bar gamma-mu psi conserves chirality: a left-handed electron couples to a left-handed photon-current piece, right to right. In the high-energy limit where masses are negligible, only four of the sixteen possible spin configurations contribute to e+e- to mu+mu-: RL to RL, RL to LR, LR to RL, LR to LR. The other twelve vanish identically. This is what generates the 1 plus cos-squared angular dependence — it is not numerical, it is a symmetry statement.

**Animation intent.** A 4x4 grid of initial-final helicity combinations. Twelve are greyed out with red Xs; four survive. Arrows labelled "helicity allowed" point at the survivors. A caption: "vector coupling conserves chirality".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 08 — Crossing Symmetry

**Concept.** The amplitudes for e+e- to mu+mu-, for e-mu- to e-mu-, and for e-mu+ to e-mu+ are not three separate calculations. They are related by crossing symmetry: flip the sign of an external momentum and replace particle with antiparticle, and an s-channel process turns into a t-channel or u-channel process. At the level of amplitudes, it is exact. One calculation buys you a family of processes.

**Animation intent.** The s-channel e+e- annihilation diagram rotates in place; two legs swap from initial to final and the arrows flip. The diagram becomes a t-channel e-mu- scattering. A label "crossing" appears.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 09 — Compton Scattering: Photon off an Electron

**Concept.** A photon scatters off an electron. Two tree-level diagrams contribute: the electron absorbs the photon and emits a new one (s-channel), or emits first and absorbs later (u-channel). Both are required; neither on its own is gauge invariant, and the sum satisfies the Ward identity. This is the first place where the consistency of QED demands multiple diagrams — one is simply not enough.

**Animation intent.** Side-by-side Compton diagrams: s-channel with the photon absorbed first, u-channel with emission first. A check mark appears only when both are added together; individually they get red Xs labelled "not gauge invariant".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 10 — The Klein-Nishina Formula

**Concept.** The full Compton differential cross section is the Klein-Nishina formula, from 1929 — the first predictive QFT calculation that matched a real experiment. At low photon energies it reduces to the classical Thomson cross section, 8 pi alpha squared over 3 m squared. At high energies the cross section falls off logarithmically in the photon energy. The formula appears everywhere from X-ray physics to cosmological recombination.

**Animation intent.** A plot of the Klein-Nishina cross section vs photon energy. A low-energy plateau labelled "Thomson limit"; a high-energy tail labelled "QED regime" falling as 1/omega times a log. Experimental data points sit on top of the curve.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 11 — Bhabha Scattering: Electron Meets Positron

**Concept.** Electron-positron elastic scattering. Two diagrams contribute: s-channel annihilation-plus-recreation and t-channel photon exchange. They interfere, and the squared amplitude contains the two moduli plus a genuine interference term. Because fermions are being exchanged, the two diagrams have an explicit relative minus sign, a direct consequence of the anticommutation quantization from the Dirac lecture.

**Animation intent.** Two Bhabha diagrams side by side. The s-channel looks like e+e- to mu+mu- but with electrons on the outgoing side; the t-channel has a photon rung. Add them and the squared amplitude has three pieces — |s|^2, |t|^2, and 2Re(s*t) — displayed underneath.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 12 — The Ward Identity

**Concept.** The Ward identity says: contract any QED amplitude with the momentum of an external photon and you get zero. This is the statement of current conservation at the quantum level, inherited from gauge invariance. Operationally it lets you replace the polarization sum over physical photon states with minus the Minkowski metric — making every calculation manifestly covariant. Any unphysical longitudinal polarization states decouple automatically.

**Animation intent.** A generic QED amplitude M-mu with an external photon leg. The photon's momentum vector k-mu is contracted into it — k-mu M-mu — and the result visibly evaluates to zero. A caption: "gauge invariance at the quantum level".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 13 — Consequences of Ward

**Concept.** The Ward identity has profound consequences. First, the photon is exactly massless to all orders in perturbation theory — no radiative correction can give it a mass without violating gauge invariance. Second, charge renormalization is universal: the renormalized electric charge of every charged particle shifts by the same factor. Third, the identity Z_1 equals Z_2 drastically reduces the number of independent renormalization constants in QED. These facts will make renormalization possible in Lecture 07.

**Animation intent.** Three consequences as three plaques: "photon mass = 0 forever", "charge renormalization is universal", "Z_1 = Z_2". Each plaque gets stamped "guaranteed by Ward".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 14 — Polarization Sums and Gauge Choice

**Concept.** Photons have four polarization components but only two physical ones. When summing over physical polarizations, one would naively project onto the two transverse modes — which spoils manifest Lorentz covariance. The Ward identity rescues us: in the sum over polarizations, contracted with any amplitude, you can replace the projection by minus g-mu-nu. The unphysical longitudinal and timelike modes cancel against each other. Covariance is preserved for free.

**Animation intent.** Four boxes labelled with polarization vectors: two transverse (green), one longitudinal (red), one timelike (red). The sum of all four, inside an amplitude, collapses into minus g-mu-nu. The red pieces visibly cancel out.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 15 — Tree-Level Wins: What Diagrams Alone Already Predict

**Concept.** Without any loops, tree-level QED already reproduces: the Rutherford formula for Coulomb scattering; the Thomson cross section for low-energy light-off-electrons; the Bhabha angular distribution observed in every e+e- collider; the 1+cos-squared shape of muon pair production. Every one of these is a multi-decimal agreement with experiment. And we have not yet computed a single loop.

**Animation intent.** A gallery of plots: Rutherford, Thomson, Bhabha, e+e- to mu+mu-. For each, a theory curve sits almost exactly on experimental data points. A tally: "tree-level predictions: four for four".

**Humor note.** Dry aside: "Most physics theories do not survive their first meeting with experiment. QED's tree-level just nails it, and that is before we start calculating anything difficult."

**Runtime.** ~35 s

## Scene 16 — The Need for Loops

**Concept.** Tree level gives you three or four decimal places. The real magic — the anomalous magnetic moment, the Lamb shift, the running of the coupling — lives in loop diagrams. But loop diagrams contain integrals over internal momenta that diverge at high energy. This is the UV problem, and it is what will force us to renormalize in Lecture 07. For now, the message is: tree level is shockingly good, and loops will make it better once we know how to handle their infinities.

**Animation intent.** A tree-level e+e- to mu+mu- diagram zooms out and gets surrounded by loop corrections — a photon self-energy bubble, an electron self-energy on a leg, a vertex correction triangle. A big warning sign: "divergent".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 17 — The Electron g-Factor: A Hint of the Future

**Concept.** A preview of what awaits. At tree level the Dirac equation predicts g = 2 exactly for the electron. The one-loop QED correction, computed by Schwinger in 1948, shifts it by alpha over 2 pi — a number around 0.00116. This is the anomalous magnetic moment. It has been computed to five loops and measured in Penning traps. Theory and experiment agree to twelve figures. This is the number that proves QED really is the right theory of electromagnetism at quantum scales.

**Animation intent.** A Dirac tree-level bubble labelled "g = 2 exactly". A single one-loop vertex correction is added, and g shifts to 2 plus alpha/pi. A decimal expansion ticks out twelve matching digits between theory and experiment.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 18 — Where QED Fits in the Bigger Picture

**Concept.** QED is the prototype of a gauge theory. Replace its U(1) symmetry by SU(3) and you get QCD; by SU(2) times U(1) and you get the electroweak theory. Replace its single vector boson by eight gluons or three weak bosons and the rest of the machinery survives. The Feynman rules, the Ward-like identities, the principle that propagators and vertices define the theory — all of it carries through. QED is the gateway to the Standard Model.

**Animation intent.** The QED vertex — electron, electron, photon — sits in the centre. Three copies branch outward: QCD vertex with a gluon, weak vertex with a W boson, photon vertex unchanged. A caption: "QED is the template".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 19 — Recap

**Concept.** QED is the gauge theory of U(1), given by a Dirac Lagrangian with a covariant derivative and a Maxwell term. Its Feynman rules are: fermion propagator, photon propagator, and a single vertex factor minus i e gamma-mu. Trace technology reduces spin-summed amplitudes to algebra. Canonical processes — e+e- to mu+mu-, Compton, Bhabha — agree with experiment at tree level. The Ward identity protects gauge invariance quantum mechanically and foreshadows renormalizability.

**Animation intent.** Five icons in sequence: the covariant derivative, the gamma-mu vertex, a trace tablet, three canonical Feynman diagrams, and a Ward identity tick mark. Final line: "QED — done".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 20 — Next: The Path Integral

**Concept.** We have built QFT by canonical quantization. There is another formulation, due to Feynman himself, that is often more powerful: the path integral. It makes symmetries manifest, handles gauge theories with grace once you add Faddeev-Popov ghosts, and generalizes to the non-perturbative regime where diagrams fail. Next episode reformulates everything we have learned in terms of integrals over field configurations — the language of every modern QFT textbook.

**Animation intent.** A sum over Feynman diagrams fades into a single giant integral symbol labelled "D phi". Many field-configuration snapshots fly into the integrand. Caption: "next: path integrals".

**Humor note.** None.

**Runtime.** ~25 s
