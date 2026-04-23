# QFT-V03 — The Dirac Equation | Scene Breakdown
**Series:** Quantum Field Theory
**Episode:** 03 — The Dirac Equation
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

## Scene 01 — Square Root of Klein-Gordon

**Concept.** Dirac's question in 1928 was almost naive: can we take the square root of the Klein-Gordon equation? A first-order wave equation that squares to second-order would fix the probability-density problem that plagued relativistic QM. The catch: the square root only works if the coefficients anticommute. There are no numbers with that property. So Dirac invented matrices that do — and the particle wavefunction becomes a multi-component object. Spin, antimatter, and the electron's magnetic moment all fall out as bonuses.

**Animation intent.** Write the Klein-Gordon dispersion E^2 = p^2 + m^2 and watch it split into two roots: E = plus something, E = minus something. The "something" refuses to be a number and morphs into a 4x4 matrix. A sign appears: "we need objects that anticommute".

**Humor note.** Dry aside: "Dirac arrived at this equation by essentially factoring a polynomial — and accidentally predicted the positron, which was found four years later. Factoring polynomials is underrated."

**Runtime.** ~35 s

## Scene 02 — Representations of the Lorentz Group

**Concept.** Before constructing the equation we need to know how fields with several components can transform under Lorentz boosts and rotations. A single complex number is a scalar. Four numbers with vector indices is a vector. But there is a whole family of other representations labelled by pairs of half-integers. The smallest non-trivial ones are two-component spinors, which rotate in a funny way: a full 360-degree rotation returns a spinor to minus itself. Only a 720-degree rotation brings it back.

**Animation intent.** A dial labelled "spin". At spin 0, a scalar dot. At spin 1/2, a two-component spinor drawn as an arrow with a coloured tail, rotating by 360 and ending upside down. At spin 1, a standard 3D arrow returning to itself after 360. A caption: "spinors need 720 to come home".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 03 — The Clifford Algebra

**Concept.** The anticommuting objects Dirac needed form a structure called the Clifford algebra. In four dimensions you need at least four 4x4 matrices, called the gamma matrices, satisfying a simple rule: the anticommutator of any two is twice the Minkowski metric times the identity. Everything else about Dirac spinors — the boost and rotation generators, the spin of the electron, parity — is derived from this one relation. Clifford algebras are the true fabric of relativistic spin.

**Animation intent.** Four matrix blocks labelled gamma-0 through gamma-3 appearing. Show the anticommutation relation as a symbolic collision: two gammas collide and produce twice the metric. Highlight that gamma-0 squared is plus one, gamma-i squared is minus one — the signature of Minkowski space itself.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 04 — The Weyl (Chiral) Representation

**Concept.** There is more than one concrete realization of the gamma matrices, but they are all equivalent. The Weyl or chiral representation is the most illuminating: gamma-0 is purely off-diagonal, the gamma-i have Pauli matrices sandwiched in their off-diagonal blocks. In this basis a Dirac spinor splits cleanly into two two-component halves — one labelled left-handed, one right-handed. The Lorentz generators turn out to be block diagonal, which means boosts and rotations do not mix the two halves.

**Animation intent.** A 4x4 spinor box splits horizontally into a top half labelled psi_L and a bottom half labelled psi_R, each two components. Boost arrows push on each block independently without crossing between them.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 05 — Weyl Spinors and the Left/Right Split

**Concept.** The two halves of a Dirac spinor are independent objects called Weyl spinors. Left-handed psi_L transforms one way under boosts; right-handed psi_R transforms the mirror-image way. In the massless case they decouple completely and satisfy separate equations — the Weyl equations. Mass is precisely the thing that couples them: without it, a left-handed particle never mixes with a right-handed one. The electroweak interactions famously treat these two halves completely differently.

**Animation intent.** Two streams, one marked L and one marked R, running in parallel. A mass term "m" appears as a gate that lets them cross-talk; set m = 0 and the gate vanishes, the streams run forever in parallel.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 06 — The Dirac Equation

**Concept.** Assemble the pieces. The Dirac equation says i times gamma-mu times partial-mu acting on psi equals m times psi — first order in space and time, Lorentz invariant, built from the Clifford algebra. Apply it twice and each component of psi satisfies the Klein-Gordon equation on its own. So the Dirac equation does everything Klein-Gordon did, but also correctly describes spin one-half. This is the equation of the electron, the quark, the muon — all the matter in ordinary chemistry.

**Animation intent.** Write out the Dirac equation in plain symbolic form. Square it: each component morphs into a Klein-Gordon wave. A small banner: "first-order, and correctly relativistic".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 07 — The Dirac Lagrangian and Its Conserved Current

**Concept.** The Dirac equation follows from a Lagrangian involving psi-bar (psi-dagger times gamma-0) and gamma-mu d-mu minus m, all sandwiched. The U(1) symmetry psi goes to e to the i-alpha psi gives Noether current j-mu equal to psi-bar gamma-mu psi. That current is conserved, and its time component is a positive probability density — unlike naive attempts with Klein-Gordon. The Dirac Lagrangian is how relativistic quantum mechanics finally gets a sensible probability interpretation.

**Animation intent.** The Dirac Lagrangian in a box. A global phase rotation applied to psi; the current j-mu drips out of Noether's machine. Arrows indicating conserved flow across a spatial slice.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 08 — The u and v Spinors

**Concept.** Plane-wave solutions of the Dirac equation come in two flavours. The u-spinors satisfy p-slash minus m acting on u equals zero — these are the positive-energy solutions, two of them, labelled by spin up or spin down. The v-spinors satisfy p-slash plus m equals zero — these are the negative-energy solutions, and they describe antiparticles. Every Dirac plane wave is a linear combination of four u's and v's tagged by momentum and spin.

**Animation intent.** A big sorting machine. Plane-wave inputs come in from the left; they are sorted into two bins: u with label "particles", v with label "antiparticles". Each bin has two slots for spin up and spin down.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 09 — Spin Sums and Completeness

**Concept.** When we compute cross sections involving unpolarized particles we need to sum over spins. Fortunately, the spin-summed outer products have beautiful closed forms: sum over s of u u-bar equals p-slash plus m, and sum over s of v v-bar equals p-slash minus m. These two 4x4 matrix identities are the workhorse of every QED calculation. They collapse traces of spinor products into traces of gamma matrices — which is the next lecture's favourite computation.

**Animation intent.** Two spinors wrapped with an outer product, summed over spin; they collapse into a single compact matrix expression p-slash plus m (or minus m for v). Display it glowing as "the spin sum identity".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 10 — Helicity vs. Chirality

**Concept.** Two things look alike and are often confused. Helicity is the projection of spin along momentum — whether the particle spins clockwise or anticlockwise around its direction of motion. Chirality is defined algebraically, as the eigenvalue of the gamma-5 matrix, and corresponds to the Weyl decomposition into L and R. For massless particles, the two coincide exactly. For massive particles, helicity is observer-dependent (you can boost past a particle and flip its helicity) while chirality is intrinsic but not conserved by the mass term.

**Animation intent.** Two panels. Left: "helicity" — a spinning particle with momentum vector; observer boosts past it and the helicity flips. Right: "chirality" — the abstract gamma-5 projection operator P_L and P_R carving psi into two halves that do not flip under boosts.

**Humor note.** Dry aside: "Almost every introductory QFT student confuses these two for about a week. The good news is you eventually stop confusing them. The bad news is it takes a week."

**Runtime.** ~35 s

## Scene 11 — The Feynman Propagator for Fermions

**Concept.** Quantizing the free Dirac field and computing the time-ordered vacuum expectation value of psi times psi-bar gives the fermion propagator. In momentum space it is i times (p-slash plus m) divided by (p-squared minus m-squared plus i epsilon). Compared to the scalar propagator, the numerator is now a matrix — it carries spin information — and time ordering for fermions includes a crucial minus sign for each interchange. This minus sign is where Pauli exclusion will come from.

**Animation intent.** Take the Klein-Gordon propagator from Lecture 02 and morph its numerator from "1" to "p-slash + m". A little tag appears noting the minus sign under fermion exchange in time ordering.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 12 — Why Fermions Need Anticommutators

**Concept.** If you tried to quantize the Dirac field with ordinary commutators, like we did for Klein-Gordon, the Hamiltonian would be unbounded below — you could keep making the vacuum more negative forever. The only fix is to impose anticommutation relations: the creation and annihilation operators anticommute instead of commute. Two consequences follow immediately. First: acting twice with the same creation operator gives zero — Pauli exclusion. Second: all particles with half-integer spin are automatically fermions. This is the spin-statistics theorem.

**Animation intent.** Two ways of quantizing side by side. Commutators: Hamiltonian slides down into negative infinity, red. Anticommutators: Hamiltonian is bounded, green. Below, two a-daggers on the same state produce zero, with the label "Pauli exclusion".

**Humor note.** Dry aside: "Fermions fundamentally do not want to share. This is why electrons stack into shells and your chair holds you up."

**Runtime.** ~35 s

## Scene 13 — The Dirac Sea and the Positron

**Concept.** Historically, Dirac's first interpretation of the negative-energy solutions was the "Dirac sea": an infinite ocean of already-filled negative-energy states. A hole in the sea would behave like a positive-energy particle of opposite charge. When the positron was discovered in 1932, this became one of the great predictions of physics. In modern QFT we do not need the sea — antiparticles fall out of anticommutators — but it remains an evocative picture of why antimatter has to exist.

**Animation intent.** Draw a vertical axis of energy. Fill every negative-energy level with a little particle dot. Punch out one hole; the hole moves as if it were a positive-charged particle. Fade the sea away, leaving just a particle and antiparticle pair as the modern interpretation.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 14 — Dirac Bilinears: Scalar, Vector, Tensor, and Friends

**Concept.** Out of psi-bar and psi sandwiched with products of gamma matrices, one can construct exactly sixteen independent combinations. They group by Lorentz transformation: one scalar, one pseudoscalar (which flips sign under parity), four vectors, four axial vectors, and six tensor components. Every interaction term in every Standard Model Lagrangian is built from these bilinears. QED uses the vector current; the weak interaction famously uses a combination of vector and axial vector, which is why it violates parity.

**Animation intent.** A 4x4 grid labelled with the 16 bilinears, sorted by Lorentz type. Each tile lights up as its name is spoken. A highlight on "vector" (for QED) and on "vector minus axial" (for weak interactions).

**Humor note.** None.

**Runtime.** ~30 s

## Scene 15 — Parity and the Handedness of the Weak Force

**Concept.** Parity sends space to its mirror image and exchanges left-handed and right-handed components of a spinor. For the electromagnetic current psi-bar gamma-mu psi, parity is a symmetry. But for the weak current, which involves gamma-mu times (1 - gamma-5), parity exchanges something with nothing — only left-handed fermions participate. The 1956 observation of parity violation in cobalt-60 decay was the experimental confirmation. The weak force literally tells left from right.

**Animation intent.** A mirror. An electromagnetic process is reflected and looks identical. A weak process is reflected and the outgoing neutrinos are missing in the mirror image — a red X drawn on the mirror-world neutrinos.

**Humor note.** Dry aside: "Until 1956, physicists assumed the laws of nature respected mirror symmetry. They did not. Nature has a preferred handedness, and it is, for reasons nobody fully understands, left-handed."

**Runtime.** ~35 s

## Scene 16 — C, T, and CPT

**Concept.** Beyond parity, there are two other discrete symmetries: charge conjugation C, which swaps particles and antiparticles, and time reversal T, which runs the movie backwards. The weak interaction also violates C and CP individually. But every local, Lorentz-invariant quantum field theory must respect the combined operation CPT exactly. CPT is a theorem, not a postulate. Any violation would overturn the entire framework.

**Animation intent.** Three transformations shown one at a time: C swaps colours (particle/antiparticle), P mirrors the spatial axes, T reverses the time arrow. Apply all three together and the process is indistinguishable from the original.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 17 — What the Dirac Equation Achieved

**Concept.** Look at everything the Dirac equation bought. Spin one-half emerges automatically, not as an added postulate. Antiparticles are forced by the structure of solutions. The electron's magnetic moment is predicted with a g-factor of very nearly 2, which is an order of magnitude better than any classical model. Later, the small deviation from 2 will become one of the most precise tests of QED. Not bad for taking the square root of a wave equation.

**Animation intent.** Four trophies on a shelf: "spin 1/2", "antimatter", "g = 2", "Pauli exclusion". Each trophy has a small date stamp showing the experimental confirmation.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 18 — Quantizing the Dirac Field

**Concept.** As with Klein-Gordon, we expand the Dirac field in a sum over momenta. But now each mode has a spin label, and each particle has a distinct antiparticle (unless we are in a Majorana theory). The expansion contains a-dagger for fermions and b-dagger for antifermions, both with spin labels. The Hamiltonian and the charge come out positive definite, the number of particles minus antiparticles is conserved, and causality is restored by the anticommutation of psi(x) and psi(y) at spacelike separation.

**Animation intent.** The Dirac field expansion appears, sorted into four terms: a times u with spin up, a times u with spin down, b-dagger times v with spin up, b-dagger times v with spin down. Each term labelled: fermion-up, fermion-down, antifermion-up, antifermion-down.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 19 — Recap

**Concept.** Starting from the Clifford algebra and demanding Lorentz invariance we built the Dirac equation. Its solutions are four-component spinors that split into left- and right-handed Weyl pieces. Quantization requires anticommutators, which gives us Pauli exclusion and fermionic statistics. The spin sums collapse cleanly; the Feynman propagator generalizes Klein-Gordon with an extra p-slash plus m in the numerator. Parity, charge conjugation, and time reversal are probed individually, but CPT is sacred. Matter has a mathematical reason to look the way it does.

**Animation intent.** Icons in sequence: Clifford algebra, spinor decomposition, u/v sorting, anticommutators, fermion propagator, CPT mirror. A final stamp: "Dirac — done".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 20 — Next: Feynman Diagrams

**Concept.** We now have the two ingredients of free QFT: the Klein-Gordon field for bosons and the Dirac field for fermions, with their respective propagators. To describe nature we need them to interact. Next episode turns on interactions, introduces the interaction picture and Dyson's time-ordered exponential, and — through Wick's theorem — pulls Feynman diagrams out of the formalism. The lines and vertices that adorn every physics textbook are about to become a calculable algorithm.

**Animation intent.** Two propagator lines (a wavy scalar and a straight fermion arrow) drift together and collide at a point. A dot appears — a vertex. Several diagrams assemble themselves. Caption: "next: making them interact".

**Humor note.** None.

**Runtime.** ~25 s
