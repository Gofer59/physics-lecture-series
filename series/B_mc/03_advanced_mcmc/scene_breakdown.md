# MC-V03 — Advanced MCMC Methods | Scene Breakdown
**Series:** Monte Carlo Methods
**Episode:** 03 — Advanced MCMC Methods
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

---

## Scene 01 — The Problem With Random Walks

**Concept.** Random-walk Metropolis knows nothing about the target it's sampling. In high dimensions or near criticality, it crawls. The whole zoo of advanced MCMC exists to inject information — gradients, conditional structure, cluster topology, Hamiltonian dynamics — into the proposal. We'll tour Gibbs, Langevin, HMC, and cluster methods in under eight minutes. Each is an attack on a specific failure mode of the baseline.

**Animation intent.** A dejected random walker inching around a contour plot, acceptance meter half-rejecting. Pan out to reveal four alternative pathways — Gibbs coordinate slides, Langevin gradient arrows, Hamiltonian orbits, cluster flips — each labelled with a headline speedup.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 02 — Gibbs: One Coordinate at a Time

**Concept.** When you can sample from each conditional distribution in closed form — the distribution of one coordinate given all the others — Gibbs sampling is the natural algorithm. Cycle through coordinates, replace each with a draw from its full conditional. Every update is accepted by construction; it's Metropolis-Hastings with acceptance identically one. Powerful for conjugate Bayesian models, essential for hierarchical structures.

**Animation intent.** A 2D target. Start at a point; the first step draws a new x-coordinate from the conditional along a horizontal slice; the next step draws a new y-coordinate along a vertical slice. The trajectory is axis-aligned, staircase-like.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 03 — Full Conditionals and Why They're Easy

**Concept.** The full conditional is just the joint divided by the marginal — and that marginal, being a constant in the conditional direction, drops out. You only need f up to proportionality in each coordinate. For many structured models (Gaussians, exponential families, graphical models via Hammersley-Clifford), the conditional is a textbook distribution you can sample instantly.

**Animation intent.** The joint density as a 2D surface. Slice along one axis. The slice itself is an unnormalised 1D curve. Caption: "constant in the slicing direction cancels." Morph into a Gaussian conditional with closed-form mean and variance.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 04 — When Gibbs Gets Stuck

**Concept.** Gibbs fails when coordinates are strongly correlated. Axis-aligned moves can only crawl along the thin diagonal of a narrow correlation ridge. Convergence is governed by the spectral radius of the Gauss-Seidel companion matrix; when coordinates are nearly collinear, this radius approaches one and the chain mixes glacially. Block together the correlated coordinates and sample them jointly — or use a different algorithm entirely.

**Animation intent.** A tall, thin, rotated Gaussian. Gibbs tries to traverse it by axis-aligned steps and only manages a zig-zag crawl. Compare with a blocked update that samples both coordinates at once and traverses the ridge in one step.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 05 — Slice Sampling

**Concept.** A cute trick: augment the state with a height variable u, so the joint distribution on (x, u) is uniform under the curve of f. The full conditionals are both uniform — uniform over a horizontal slice of the density, and uniform vertically up to f(x). Gibbs on the augmented space gives exact samples from the marginal f without a normalising constant. In theory, no tuning. In practice, identifying the slice can be costly.

**Animation intent.** The 1D density curve. A horizontal slice at height u; uniform x-sample along the level set. Then a vertical draw in [0, f(x)]. The pair bounces around under the curve. Histogram of x-values matches f.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 06 — Langevin Dynamics

**Concept.** Write the target as exp of minus V. Gradient descent on V finds the mode — one point. Langevin dynamics adds Gaussian noise to gradient descent and, instead of collapsing to a point, it samples from exp of minus V. The stochastic differential equation has f as its invariant distribution. Gradient information makes proposals smarter than a blind random walk.

**Animation intent.** Two trajectories on a contour plot. Gradient descent flows deterministically to the minimum and stops. Langevin descent flows the same way but jitters, exploring the basin rather than collapsing into it. Caption: "gradient plus noise = sample."

**Humor note.** "Gradient descent finds one point. Langevin dynamics finds an entire distribution. Same machinery, very different goals."

**Runtime.** ~30 s

## Scene 07 — Unadjusted Langevin Algorithm

**Concept.** Discretise the Langevin SDE with Euler-Maruyama: take a small step down the gradient and add a Gaussian kick. This is ULA. It's biased: the stationary distribution is f_epsilon, not f, with bias of order epsilon. But it converges exponentially fast to f_epsilon. For moderate dimensions and log-concave targets, ULA is cheap, simple, and often good enough.

**Animation intent.** An Euler-Maruyama update rule written out with labelled gradient and noise terms. A trajectory walks down a potential, steps biased by the finite step size. An overlay shows true f vs f_epsilon slightly offset.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 08 — MALA: Metropolis-Adjusted Langevin

**Concept.** Wrap ULA in a Metropolis accept-reject step. The proposal is the biased Langevin move; the acceptance corrects for the bias. Result: exact samples from f, not f_epsilon. Scaling analysis gives optimal step size proportional to d to the minus one-third, convergence in d to the one-third steps, and an optimal acceptance rate of about 0.574. Strictly better than random-walk Metropolis for log-concave targets.

**Animation intent.** ULA proposal arrow, then an accept-reject gate. Side-by-side scaling plot: RWMH needs O(d) steps, MALA needs O(d^{1/3}). Acceptance-rate meter settles near 0.574.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 09 — Hamiltonian Monte Carlo: Momentum as a State

**Concept.** Introduce momentum. Extend the state from position q to (q, p), with Hamiltonian equal to potential V(q) plus kinetic K(p). Sample from the joint Boltzmann of this Hamiltonian; marginalise out p and you recover f. The gain: Hamiltonian dynamics conserves energy, so the trajectory can travel long distances at nearly constant H — distant proposals with high acceptance.

**Animation intent.** Phase space (q, p). A Hamiltonian orbit traces a long, smooth curve through regions of low V. Compare with a random-walk chain, which makes only short hops in q alone. Marginal of p is Gaussian, marginal of q is the target.

**Humor note.** "If the history of MCMC is a history of tricks to propose distant moves, Hamilton's equations are the ultimate trick."

**Runtime.** ~32 s

## Scene 10 — The Leapfrog Integrator

**Concept.** You can't integrate Hamilton's equations exactly except in trivial cases. The leapfrog scheme does a half-step in momentum, a full step in position, and another half-step in momentum. It is exactly symplectic and exactly time-reversible, even though the energy is only approximately conserved — the energy error is second order in step size and bounded over long trajectories. Symplecticity is what makes leapfrog the right tool for HMC.

**Animation intent.** The three-step leapfrog pattern drawn as alternating short vertical and horizontal segments in phase space. An actual closed Hamiltonian orbit lies beside it; leapfrog trace oscillates around it without drifting.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 11 — The HMC Algorithm

**Concept.** Algorithm: refresh momentum from a Gaussian, run L leapfrog steps of size epsilon, propose the final (q, p), accept with Metropolis ratio based on energy difference. The MH correction compensates for leapfrog's energy drift. Scaling: optimal epsilon goes as d to the minus one-quarter; you need O(d^{1/4}) steps for a given error. Optimal acceptance rate is about 0.651. For smooth, high-dimensional targets, HMC dominates.

**Animation intent.** Momentum refresh (redraw p). Leapfrog trajectory visible as a curve through phase space. Energy bar shows drift; MH accept-reject corrects. Final q shown as a distant but high-quality sample.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 12 — Cluster Algorithms: Motivation

**Concept.** Back to the Ising model near T_c. Single-spin flips have z about 2.17; you can't beat that with local updates because the correlation length exceeds any local neighbourhood. The trick: flip entire correlated clusters as a single move. The Fortuin-Kasteleyn representation encodes spin configurations as bond configurations, and the right bond probability makes whole-cluster flips leave the Boltzmann distribution invariant.

**Animation intent.** Near-critical Ising: huge dark and bright domains. Sweeping animation highlights a connected cluster; the entire cluster flips in one move. tau versus L graph: z = 2.17 line for Metropolis alongside z = 0.25 line for Wolff, an order of magnitude apart.

**Humor note.** None.

**Runtime.** ~32 s

## Scene 13 — The Wolff Algorithm

**Concept.** Pick a random seed spin. For each aligned neighbour, add it to the cluster with probability 1 - exp(-2*beta*J). Recurse. Flip every spin in the cluster. The bond probability is precisely what detailed balance requires; acceptance is always one. In 2D Ising z drops from 2.17 to about 0.25 — enormous near T_c. A quiet algorithmic revolution.

**Animation intent.** Seed spin glows. Bond-growth wave expands through aligned neighbours, with each candidate bond flipping a biased coin. Final cluster flips as one. Counter shows bond probability p = 1 - exp(-2*beta*J).

**Humor note.** None.

**Runtime.** ~30 s

## Scene 14 — Swendsen-Wang

**Concept.** Wolff grows one cluster; Swendsen-Wang builds all clusters simultaneously. Place bonds on aligned neighbour pairs with the same probability 1 - exp(-2*beta*J). Identify connected components using union-find (Hoshen-Kopelman). Flip each cluster's spins independently with probability 1/2. Simultaneously updates the whole lattice; z is about 0.35 for 2D Ising. The generalisation to q-state Potts is immediate.

**Animation intent.** Lattice with probabilistic bonds highlighted. Cluster identification sweep labels each connected component with a colour. Independent coin flips assign new spins to each cluster. Time-lapse shows faster decorrelation than Wolff.

**Humor note.** "Hoshen-Kopelman is the world's most exciting union-find implementation."

**Runtime.** ~30 s

## Scene 15 — Dynamic Exponents: The Scoreboard

**Concept.** A small table settles the hierarchy. 2D Ising: Metropolis z = 2.17, Swendsen-Wang 0.35, Wolff 0.25. 3D Ising: Metropolis 2.02, Swendsen-Wang 0.54, Wolff 0.33. Cluster algorithms give order-of-magnitude speed-ups at criticality, and are most dramatic for discrete symmetries and second-order transitions. Away from T_c the advantage shrinks but rarely reverses.

**Animation intent.** A minimalist table populated row by row with the exponents. Beside it, a scaling plot where Metropolis, SW, and Wolff curves separate as L increases. Near T_c the separation is enormous.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 16 — Overrelaxation

**Concept.** For continuous spins in O(n) models, overrelaxation reflects the spin about its local field direction. The energy is exactly preserved, so the move is always accepted. It's microcanonical and deterministic, but when mixed with heat-bath updates it dramatically reduces autocorrelation for XY and Heisenberg models. No analogue for discrete spins.

**Animation intent.** A 3D spin vector in a local field. Its component perpendicular to the field is reversed. Energy bar stays flat. Acceptance = 1. Combined with heat-bath bursts, the trajectory decorrelates far faster.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 17 — Constrained Systems: Ice Rule and Loops

**Concept.** Some systems have hard constraints that single-spin flips violate. Ice models enforce the two-in-two-out rule at every vertex; Kawasaki dynamics conserves total magnetisation. Solution: loop algorithms that build a closed path through the lattice and reverse orientations along it, preserving the constraint exactly. Same idea reappears in dimer models and in stochastic-series-expansion QMC.

**Animation intent.** A six-vertex lattice with directed bonds. A single local flip violates the ice rule (red X). Instead, build a loop through the lattice and reverse all arrows along it — the constraint holds globally.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 18 — Conserved Order Parameter: Kawasaki

**Concept.** If your physics conserves total magnetisation — say, a binary alloy with fixed composition — you can't flip single spins. Instead, exchange a pair of unlike neighbouring spins with a Metropolis ratio. This is Kawasaki dynamics. It models phase separation correctly but suffers badly near T_c; non-local exchanges and continuous-time variants are common remedies.

**Animation intent.** A lattice of alloy atoms, red and blue. A pair of unlike neighbours swaps. Total red count stays constant. Time-lapse shows coarsening of phase-separated domains.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 19 — Summary: A Toolbox for Different Failures

**Concept.** Gibbs handles conjugate models; slice sampling handles multimodality without tuning; ULA and MALA exploit gradients for log-concave targets with scaling d to the one-third; HMC uses Hamiltonian flow for d to the one-quarter and handles high dimensions best; Wolff and Swendsen-Wang break critical slowing down on lattice spin systems; overrelaxation accelerates continuous spins; loop and Kawasaki algorithms respect constraints. Choose your algorithm by failure mode.

**Animation intent.** A decision tree: is the target log-concave? Use HMC or MALA. Discrete spins near T_c? Cluster. Constrained? Loops. Conjugate? Gibbs. Continuous O(n)? Overrelaxation. Each branch shows its representative visual.

**Humor note.** None.

**Runtime.** ~32 s

## Scene 20 — Preview: Statistical Analysis of MC Data

**Concept.** You now know how to generate samples. But what do the samples mean? Correlated MCMC data needs honest error bars, autocorrelation estimation, jackknife and bootstrap for nonlinear functionals, histogram reweighting to interpolate across temperatures, and finite-size scaling to extract critical exponents. The next video is about turning raw chains into trustworthy physics numbers.

**Animation intent.** A stack of chain outputs being piped through binning, jackknife, reweighting, and FSS blocks, emerging as a clean estimate with a confidence interval. Fade title card: "MC-V4: Statistical Analysis of MC Data."

**Humor note.** "A Monte Carlo simulation without an error bar is a rumour."

**Runtime.** ~25 s
