# MC-V02 — MCMC and the Metropolis-Hastings Algorithm | Scene Breakdown
**Series:** Monte Carlo Methods
**Episode:** 02 — MCMC and the Metropolis-Hastings Algorithm
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

---

## Scene 01 — The Sampling Problem That Killed Uniform

**Concept.** You can't invert the Boltzmann CDF. You can't bound it for rejection. You can't even evaluate it pointwise in normalised form — the partition function is exactly the integral you gave up on. And yet you need expectations under it. There is one escape: build a Markov chain whose long-run distribution is your target, then average along its trajectory.

**Animation intent.** Pan across an enormous state-space landscape, impossibly high-dimensional and unparameterised. Failed techniques from V1 (inverse CDF, rejection) flash across the screen with red X marks. Cut to a wandering chain that slowly adopts the shape of the target.

**Humor note.** "The partition function is like rent in Paris. You know it exists. You'll never compute it. But somehow life goes on."

**Runtime.** ~30 s

## Scene 02 — Markov Chains in 30 Seconds

**Concept.** A Markov chain is a random walk where the future depends only on the present, not on the past. It's specified by a transition kernel: a rule that takes the current state and hands you a distribution for the next. Iterate the kernel and the distribution of your position evolves in time. The question is where it goes.

**Animation intent.** A point hopping between states on a graph. Arrow weights show transition probabilities. Label "future depends only on present". The distribution over states — not the state itself — evolves as a histogram above.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 03 — Invariant Distributions and Detailed Balance

**Concept.** An invariant distribution is a fixed point of the Markov kernel: start there, stay there. The easiest way to engineer invariance is to enforce detailed balance — probability flowing from x to z exactly balances the flow back. This is strictly stronger than invariance, equivalent to time-reversibility, and is the loophole that Metropolis-Hastings exploits.

**Animation intent.** Two states x and z with arrows both ways. Width of each arrow = pi(x)*p(x,z) vs pi(z)*p(z,x). They match. A clock reverses; the chain looks the same running backwards.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 04 — Ergodicity and the Long Run

**Concept.** Invariance alone is not enough — you also need the chain to forget where it started and reach every region. Two conditions suffice: irreducibility (every state talks to every other, eventually) and aperiodicity (no deterministic cycle). Together they give ergodicity: no matter your initial distribution, you converge to the invariant one. And geometric ergodicity gives it at an exponential rate.

**Animation intent.** Three small graphs. Reducible: two disconnected islands — the chain is stuck. Periodic: a strict cycle, the distribution oscillates forever. Ergodic: irreducible and aperiodic — distribution smoothly converges to stationary.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 05 — The Metropolis-Hastings Algorithm

**Concept.** Here is the algorithm that made the last seventy years of computational physics possible. Propose a move from a proposal kernel q. Compute the ratio of targets times the ratio of proposals. Accept with probability equal to this ratio, capped at one. The normalising constant of the target cancels out of the ratio. You never needed it.

**Animation intent.** A state point, a proposed hop to z*, the acceptance ratio displayed as a fraction with f(z*)q(z*,x) over f(x)q(x,z*). A roll of a die between 0 and 1 decides; if die < ratio, the chain moves. Normaliser Z flashes in both numerator and denominator and cancels.

**Humor note.** None.

**Runtime.** ~32 s

## Scene 06 — Why Metropolis-Hastings Works

**Concept.** Check detailed balance directly. The product f(x) times the Metropolis-Hastings kernel equals a symmetric minimum — symmetric in x and z by construction. So f is invariant. Add ergodicity and you converge to f. The proof is three lines; the consequence is that a ratio of unnormalised densities is all you ever need to sample from a target.

**Animation intent.** The key identity f(x)q(x,z)a(x,z) = min{f(x)q(x,z), f(z)q(z,x)} written out, with the symmetry under x <-> z highlighted by a colour swap. Arrow to "detailed balance holds, f invariant, done."

**Humor note.** None.

**Runtime.** ~28 s

## Scene 07 — Random Walk Metropolis

**Concept.** The simplest practical choice: propose the current state plus a Gaussian bump of width sigma. Symmetric proposal, so the acceptance collapses to min{1, f(z)/f(x)} — always accept downhill in energy. Tuning sigma is everything: too small and the chain crawls, too large and every proposal is rejected. The magic optimum is around 23% acceptance in high dimension.

**Animation intent.** Three panels. sigma too small: chain barely moves, stuck in local neighbourhood. sigma too large: almost every step rejected, chain stationary. sigma just right: chain explores freely. Acceptance rate meter tracks to 0.234 for the high-d case.

**Humor note.** "The optimal acceptance rate for high-dimensional random walk Metropolis is 23.4%. Not 20, not 25. Derived from a Langevin limit. Someone's PhD."

**Runtime.** ~32 s

## Scene 08 — The Ising Model as Testbed

**Concept.** A 2D grid of spins, each plus or minus one. Energy equals negative coupling times the sum over nearest-neighbour products, minus field times total magnetisation. The Boltzmann distribution over spin configurations is the canonical MCMC playground. Single-spin-flip Metropolis is the starter algorithm: flip one spin, compute the local energy change, accept with exp of minus beta times delta-E.

**Animation intent.** A square lattice of arrows, up and down. One spin flips; highlight just its four neighbours; draw delta-E = 2s_i * (J*sum of neighbours + H) in a call-out. Die roll; accept or reject. A heatmap forms showing magnetic domains.

**Humor note.** None.

**Runtime.** ~32 s

## Scene 09 — Heat Bath and Gibbs Sampling on Ising

**Concept.** Instead of proposing a flip and accepting, compute the exact conditional probability that the spin is up given all its neighbours. Sample it directly. Acceptance is always one, no wasted proposals. It's the same as Gibbs sampling for a single coordinate. For the Ising model with only two states it's nearly identical to Metropolis, but for Potts models with many states it dominates.

**Animation intent.** A spin with its neighbourhood locked in. Compute h_i = J*sum of neighbours plus H. The conditional probability curve (logistic in 2*beta*h_i) pops up; sample directly from it. Every proposal accepted.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 10 — Burn-In and Autocorrelation

**Concept.** Start the chain in a bad place, and the first thousand samples are biased. Throw them out — that's burn-in. Now comes the harder problem: the remaining samples are positively correlated. Two neighbouring samples in a Markov chain are not two independent draws. The autocorrelation function decays exponentially, with timescale tau-exp, and the effective number of independent samples is N divided by roughly two times tau-int, the integrated autocorrelation time.

**Animation intent.** A trace plot of magnetisation through time. First stretch labelled "burn-in", discarded. Then the correlated trace. Overlay the autocorrelation function rho_k versus lag k, decaying exponentially. A dotted line marks tau_int.

**Humor note.** "One thousand MCMC samples might be worth ten independent ones. You decide which number to brag about in the paper."

**Runtime.** ~32 s

## Scene 11 — Critical Slowing Down

**Concept.** Near a phase transition, correlated domains span the whole lattice. Single-spin flips can only change the domain boundary one step at a time. The autocorrelation time blows up as lattice size to a power — the dynamic critical exponent z, which for 2D Ising with Metropolis is about 2.17. Cost per independent sample scales as L to the d plus z. The algorithm is fighting the physics.

**Animation intent.** Zoom on a 2D Ising configuration tuned near T_c. Huge correlated domains. A lone spin flip does essentially nothing. Show tau vs L on a log-log plot; slope ~2. Callout: "this is why we need cluster algorithms."

**Humor note.** None.

**Runtime.** ~30 s

## Scene 12 — Convergence Diagnostics

**Concept.** You cannot prove a chain has converged — you can only detect when it hasn't. Geweke compares the mean from an early window with a late window, expecting a standard normal statistic. Gelman-Rubin runs several chains from dispersed starting points and looks at between-chain versus within-chain variance, expecting R-hat to approach one. Both flag problems; neither certifies success.

**Animation intent.** Multiple chains starting from widely separated initial configurations. Traces slowly converge toward the same band. The R-hat number ticks down from ~1.5 to ~1.0. A Geweke z-statistic settles near zero.

**Humor note.** "Convergence diagnostics can prove your chain has not converged. Proving the opposite requires religion."

**Runtime.** ~30 s

## Scene 13 — Integrated Autocorrelation Time

**Concept.** Variance of the sample mean is not sigma-squared over N; it's sigma-squared times (1 + 2 sum of autocorrelations) over N. Define tau-int as one-half plus that sum. Your effective sample size is N over 2 tau-int. Every MCMC paper should report it. Most don't. The observable matters: different h have different tau-int on the same chain.

**Animation intent.** Variance formula unfolding term by term. The sum of rho_k coloured. The formula collapses to 2*tau_int*sigma^2/N. A bar labelled "effective sample size = N/(2*tau_int)" shrinks as correlation grows.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 14 — Ising Observables

**Concept.** For the 2D Ising model on the square lattice, the exact critical temperature is 2J divided by k_B log of (one plus root two), roughly 2.269 in coupling units. Measure energy per spin, magnetisation, specific heat from the variance of energy, and susceptibility from the variance of magnetisation. Let them tell you where the phase transition lives.

**Animation intent.** Four curves as function of T: energy, magnetisation, specific heat, susceptibility. The last two spike at T_c. A vertical dashed line labelled "2.269 J/k_B — Onsager, 1944".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 15 — Ergodic Averages

**Concept.** The law of large numbers survives correlation: the time average of h along an ergodic Markov chain converges to the expectation under f. The central limit theorem also survives, but the asymptotic variance is tau-squared — sigma-squared inflated by the autocorrelation sum. Unlike importance sampling, every sample carries equal weight, and there is no weight degeneracy.

**Animation intent.** Time series of h values from an MCMC chain. Running average converges to the true expectation. A CLT-style Gaussian envelope forms, but wider than it would be for i.i.d. samples. Caption: "equal weights — no ESS drama."

**Humor note.** None.

**Runtime.** ~28 s

## Scene 16 — Blocking/Binning for Error Bars

**Concept.** Naive sigma divided by square root of N underestimates the error for correlated chains. Block the data into bins of size b, compute block averages, estimate variance from those. As b grows past tau-int, the block averages become approximately independent and the estimated variance plateaus at the correct value. Simple, robust, and the only thing standing between you and a wrong error bar.

**Animation intent.** A timeseries partitioned into blocks of size b. Bars show block means. A plot of estimated sigma_b versus b rises and plateaus; the plateau is the correct error.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 17 — The Independence Sampler

**Concept.** A special and mostly theoretical proposal: draw from a fixed distribution g regardless of current state. The acceptance ratio becomes the importance weight ratio. When f is bounded by M times g, the chain is uniformly ergodic with rate 1 minus one over M. Lovely theorems, usually poor in practice — essentially importance sampling in disguise with all its dimensional failures.

**Animation intent.** A proposal fires ignoring the current state. Acceptance fluctuates wildly as weights swing. Compare to random-walk Metropolis in an adjacent panel; independence sampler chain looks either frozen or wild, rarely well-mixed.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 18 — Practical Aspects: Tuning, Measuring, Tables

**Concept.** Real MCMC lives on a pile of small tricks: tune proposal width to target roughly 50% acceptance in low dimension, 23% in high dimension; measure observables every couple of tau-int sweeps to avoid redundancy; pre-compute exponential Boltzmann factors into a lookup table so you never call an exponential inside the hot loop; run blocking to get honest error bars. Craft, not just math.

**Animation intent.** A "practitioner's checklist" that writes itself: acceptance ratio target, measurement cadence, lookup table of exp(-beta*delta_E), binning for errors. Each item gets a green check as it appears.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 19 — Summary: Metropolis-Hastings and Its Costs

**Concept.** Metropolis-Hastings samples any target known up to a constant by running a reversible Markov chain. Detailed balance ensures correctness; ergodicity ensures convergence. The price is correlated samples, problem-dependent tuning, and dynamic critical slowing that swallows local algorithms near phase transitions. Gibbs and heat bath handle conjugate and discrete cases cleanly; diagnostics and blocking are non-negotiable.

**Animation intent.** A six-panel summary: detailed balance formula, acceptance ratio, autocorrelation decay, burn-in trace, Gelman-Rubin R-hat, and binning plateau. Arrows converge toward a scaling plot of tau versus L near T_c, labelled "dynamic critical exponent z ~ 2.17".

**Humor note.** None.

**Runtime.** ~30 s

## Scene 20 — Preview: Advanced MCMC

**Concept.** Next video: how do we escape the single-spin-flip prison? Gibbs, the slice sampler, gradient-informed MALA and HMC for continuous targets, and the crown jewels — Wolff and Swendsen-Wang cluster algorithms that drive z down by an order of magnitude near criticality. Each method is a direct response to a specific failure of random-walk Metropolis.

**Animation intent.** Quick montage: Hamiltonian flow tracing a smooth orbit, a cluster flipping as a single move, a Langevin drift arrow. Fade title card: "MC-V3: Advanced MCMC Methods."

**Humor note.** "Random walks are what you do when you have no information. Everything else is what you do when you have a little."

**Runtime.** ~25 s
