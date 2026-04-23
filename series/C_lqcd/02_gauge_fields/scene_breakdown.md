# LQCD-V02 — Gauge Fields and Wilson Loops | Scene Breakdown
**Series:** Lattice QCD
**Episode:** 02 — Gauge Fields and Wilson Loops
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

---

## Scene 01 — Why You Cannot Put A_mu at a Site

**Concept.** The naive move — store the gluon field A_mu(x) on each lattice site — destroys gauge invariance. A local gauge rotation at each site scrambles a site-valued field; there is no way to compare color at neighboring sites without a rule for parallel transport. Gauge theory on a lattice requires a completely different data structure from scalar theory. The right object lives on links, not sites.

**Animation intent.** Two sites with colored "phases" rotating independently under a gauge transformation. A red X over the attempt to connect them directly. Arrow appears on the edge between them, labeled "this is where the gauge field belongs."

**Humor note.** "The continuum got away with storing gauge fields at points. The lattice knows better."

**Runtime.** ~30 s

---

## Scene 02 — Link Variables: SU(3) on Every Edge

**Concept.** On each oriented link from site n to n+mu-hat, place an SU(3) matrix U_mu(n). Think of it as the parallel transporter from one site to the next — the discrete version of the path-ordered exponential of the continuum gauge field. The backward link is the hermitian conjugate. The theory is now a field of group elements, not algebra elements. The data is inherently compact.

**Animation intent.** A lattice with every edge carrying a small rotating SU(3) disk. A green arrow on the link pointing from n to n+mu-hat. Zoom in: U_mu(n) is a 3x3 matrix hovering over the link.

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 03 — Gauge Invariance, Exactly

**Concept.** A gauge transformation is now a site-local rotation Omega(n) in SU(3). A link variable transforms as U_mu(n) -> Omega(n) U_mu(n) Omega(n+mu-hat)^dagger. The product of links along a path picks up only the endpoint rotations; the product around any closed loop transforms by conjugation, so its trace is invariant. This is exact, not approximate — a property of the discretization itself.

**Animation intent.** Chain of links getting multiplied under a gauge rotation. Endpoint rotations cancel along the chain. A closed loop highlighted; trace symbol Tr[...] stays unchanged as the rotations flicker.

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 04 — The Plaquette

**Concept.** The smallest nontrivial closed loop on a hypercubic lattice is the plaquette: four links around a unit square in the (mu,nu)-plane. Its trace is gauge-invariant, and for small lattice spacing it expands to 1 minus a^4/2 times F_{mu nu}^2 plus higher-order corrections. The plaquette is the discrete echo of the field strength squared.

**Animation intent.** A single unit square lights up on the lattice, with four link arrows going around it. Formula box appears: plaquette expands to a^4 F^2 term. A small "O(a^2) errors" tag.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 05 — Wilson's Gauge Action (1974)

**Concept.** Sum the real trace of one minus the plaquette over every plaquette on the lattice, multiply by beta = 2N/g^2, and you have Wilson's gauge action. As a -> 0 it reproduces the continuum Yang–Mills action. It is exactly gauge-invariant at finite a. It has O(a^2) discretization errors. And it is simple enough to program in an afternoon.

**Animation intent.** A sea of plaquettes flickering across the lattice, each contributing a small weight to a running sum. The action S_G emerges as a total. Label: beta = 6/g^2 for SU(3).

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 06 — The Haar Measure: Integrating over a Group

**Concept.** To do the path integral, we must integrate over every link variable. SU(3) is a compact group, so there is a unique invariant measure on it — the Haar measure — normalized to 1. It is left- and right-invariant, which means the measure itself is gauge-invariant. And crucially: no gauge fixing is required. The integral over compact group elements is finite without any Faddeev–Popov machinery.

**Animation intent.** A shaded SU(3) manifold (rendered as a compact blob) with a little integration symbol. Tag: "compact, invariant, finite." No ghosts.

**Humor note.** "Perturbation theory needs ghosts to exorcise its gauge redundancy. The lattice just integrates."

**Runtime.** ~32 s

---

## Scene 07 — Key SU(3) Group Integrals

**Concept.** The Haar measure projects onto the trivial representation. The integral of a single link matrix is zero; the integral of a link times its conjugate gives a delta in color indices divided by N; the integral of three links with an epsilon tensor gives another epsilon. These handful of identities power the strong-coupling expansion and let you compute simple lattice observables on paper.

**Animation intent.** Four boxed formulas appearing one at a time, each with an integrating U symbol and a resulting tensor structure on the right. The "projection onto trivial rep" principle shown as a cartoon projection.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 08 — Coupling Fermions to Links

**Concept.** The naive continuum derivative psi(x+mu) - psi(x) is not gauge-invariant on a lattice. Insert the link variable U_mu(n) between the two fermion fields and it becomes gauge-invariant by construction — the link parallel-transports the quark's color from one site to the next. Gauge coupling on the lattice is built into the very definition of a lattice derivative.

**Animation intent.** Quark field arrow at site n, another at site n+mu-hat. A link U_mu(n) slots into the gap. Cartoon: the color arrow at n gets rotated by U to match the frame at n+mu-hat.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 09 — The Wilson Loop

**Concept.** Take a rectangular path of spatial extent R and temporal extent T. Multiply the link variables around it, trace over color. This is the Wilson loop. In physical terms, it measures the work done by the gauge field as a quark–antiquark pair is created, separated by R, held for a time T, and annihilated. Its expectation value encodes the static potential between two color charges.

**Animation intent.** Rectangular closed path on the lattice with R horizontal and T vertical. Quark–antiquark pair drawn at one end being created, worldlines tracing the rectangle, pair annihilating at the other end.

**Humor note.** None.

**Runtime.** ~32 s

---

## Scene 10 — From Wilson Loop to Static Potential

**Concept.** At large temporal extent T, the Wilson loop falls exponentially: W(R,T) goes like e^{-V(R) T}, where V(R) is the energy of a static quark–antiquark pair at separation R. Extract the decay rate, get the potential. This single procedure lets us measure the force between color charges directly from the lattice, with no reference to perturbation theory.

**Animation intent.** Wilson loop expectation plotted on log scale vs T, straight line appears, slope extracted and plotted as V(R). A second axis labeled R on the right.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 11 — Area Law vs Perimeter Law

**Concept.** At strong coupling the Wilson loop decays like e^{-sigma R T} — the exponent scales with the enclosed area. That area law is equivalent to a linearly rising potential V(R) ~ sigma R. This is confinement. A perimeter law (exponent proportional to R + T) would give a finite potential at large R — no confinement. The Wilson criterion: confinement is an area law.

**Animation intent.** Two lattices side by side. Left: shaded rectangle (area law) with linear V(R) plot above. Right: only the perimeter shaded, flat V(R) plot above. Labels: "confined" / "deconfined."

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 12 — The Cornell Potential

**Concept.** Numerical lattice data give a potential of the form V(R) = V_0 - alpha/R + sigma R. The Coulomb-like 1/R piece dominates at short distance (from perturbative one-gluon exchange); the linear piece dominates at long distance (confinement). The string tension sigma is roughly (440 MeV)^2. Above about 1.2 fm, in full QCD with dynamical quarks, the string breaks by creating a quark–antiquark pair from the vacuum.

**Animation intent.** Cornell potential curve: dip at small R, rising linearly at large R. Short distance labeled "Coulomb", long distance labeled "confinement." A dashed extension breaks off at 1.2 fm.

**Humor note.** "The string breaks. Your worldview bends."

**Runtime.** ~32 s

---

## Scene 13 — Strong-Coupling Expansion: Area Law for Free

**Concept.** At very strong coupling (small beta, large g) the Wilson action weights links toward random SU(3) elements. Expanding the exponential in powers of beta and using the SU(3) group integrals, the leading contribution to the Wilson loop is the minimal tiling of its interior by plaquettes — giving an area law automatically. Confinement emerges trivially in this limit. The nontrivial question is whether it survives as beta grows.

**Animation intent.** Wilson loop interior tiled by plaquettes like bathroom tiles. Each plaquette contributes a factor of beta. Area of tiles multiplied by log(beta) gives the exponent.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 14 — The Polyakov Loop

**Concept.** Wrap a Wilson line once around the periodic time direction. That closed line — the Polyakov loop — is gauge-invariant and has a direct physical interpretation: its expectation value is related to the free energy of a single static quark. If it is zero, putting one quark into the vacuum costs infinite energy — that is confinement. If it is nonzero, the quark is free. It is an order parameter.

**Animation intent.** Lattice with its time direction compactified into a cylinder. A single vertical line wraps around the cylinder. Label: e^{-F_quark/T}.

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 15 — Center Symmetry and Deconfinement

**Concept.** Pure SU(N) gauge theory has a global Z_N center symmetry: multiply all temporal links on one time slice by a root of unity z, and the action is unchanged but the Polyakov loop picks up z. An unbroken center = confinement (<P> = 0). Spontaneous breaking = deconfinement (<P> != 0). Deconfinement is a genuine symmetry-breaking phase transition — first-order for SU(3).

**Animation intent.** Free-energy landscape with N symmetric minima at high T (broken symmetry), collapsing to a single minimum at P=0 at low T. Phase transition shown as a jump.

**Humor note.** "Deconfinement is just Z_3 getting tired of behaving."

**Runtime.** ~32 s

---

## Scene 16 — The Full QCD Path Integral

**Concept.** Combine everything: integrate over all link variables with the Haar measure, weight by the Wilson gauge action, and insert the fermion determinant det[D+m] to account for dynamical quarks. This is the full QCD partition function — a finite-dimensional, well-defined, non-perturbative integral. The Grassmann quark fields are gone, having been integrated out. What remains is a problem a computer can attack.

**Animation intent.** Big equation appearing piece by piece: product dU, then det[D+m], then e^{-S_W}. Each piece labeled with its physical origin.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 17 — The Sommer Parameter: Setting the Scale

**Concept.** The lattice only knows dimensionless ratios; to convert to MeV or fm you need a physical reference. The Sommer parameter r_0 is defined by a condition on the force between static quarks — r^2 dV/dr = 1.65 — and evaluates to about 0.5 fm. Compute r_0/a on the lattice, match to the physical value, and you have fixed the lattice spacing in femtometers.

**Animation intent.** Static potential curve with a highlighted point where the force condition is satisfied. Arrow labeled r_0 = 0.5 fm. Number readout: a in lattice units -> a in fm.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 18 — Asymptotic Scaling: Continuum Limit in Action

**Concept.** As we increase beta (decrease bare coupling), the lattice spacing must shrink according to a two-loop renormalization-group formula. This is asymptotic scaling: a prediction, not a convention. Compare r_0/a measured at different beta to the RG formula — if they fall on the predicted curve, the continuum limit is being approached correctly. The lattice has a built-in consistency check.

**Animation intent.** Log-log plot of a vs beta: data points falling on the predicted two-loop curve. Label: b_0, b_1 coefficients. Arrow pointing to beta -> infinity, a -> 0.

**Humor note.** None.

**Runtime.** ~28 s

---

## Scene 19 — Summary

**Concept.** Gauge fields on the lattice live on links as SU(3) elements. The Wilson action — a sum of plaquettes — is exactly gauge-invariant and reproduces Yang–Mills in the continuum limit. The Haar measure makes gauge fixing unnecessary. The Wilson loop measures the static quark potential; an area law equals confinement. The Polyakov loop is the order parameter for deconfinement. The Sommer parameter sets the scale.

**Animation intent.** Six-bullet summary card, each bullet lighting up with the corresponding visual from the scene (link arrow, plaquette, Haar blob, Wilson rectangle, Polyakov circle, r_0 marker).

**Humor note.** None.

**Runtime.** ~30 s

---

## Scene 20 — Next: Fermions on the Lattice

**Concept.** Gauge fields went smoothly onto the lattice. Fermions do not. The naive discretization of the Dirac operator generates 16 species instead of one — the doubling problem. The Nielsen–Ninomiya theorem proves this is unavoidable without sacrificing something: chiral symmetry, locality, or hypercubic symmetry. Next time we survey the zoo of lattice fermions: Wilson, staggered, overlap, domain wall, twisted mass.

**Animation intent.** A single quark arrow on the lattice splits into 16 ghostly copies at the corners of the Brillouin zone. Teaser card: "The doubling problem."

**Humor note.** "You asked for one electron. The lattice gave you sixteen. No refunds."

**Runtime.** ~30 s
