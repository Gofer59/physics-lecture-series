# MC-V05 — Simulated Annealing, SMC and Variational Inference | Scene Breakdown
**Series:** Monte Carlo Methods
**Episode:** 05 — Simulated Annealing, SMC and Variational Inference
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

---

## Scene 01 — When MCMC Isn't Enough

**Concept.** Sometimes you don't want a distribution — you want its mode. Sometimes your target is so rugged that a single chain can't cross the barriers between modes. Sometimes the data is streaming in one observation at a time. And sometimes you'd rather have a fast approximation than an exact but slow Monte Carlo estimate. This video is a tour of the algorithms for those cases: annealing, tempering, sequential Monte Carlo, and variational inference.

**Animation intent.** Four motivating vignettes flash by: a high-dimensional optimisation landscape, a multimodal target with chain stuck in one well, a streaming data source with a particle cloud following it, and a fitted surrogate distribution deforming to hug a target.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 02 — Simulated Annealing

**Concept.** Treat optimisation as sampling from a temperature-dependent Boltzmann distribution. Raise f to an inverse temperature beta_n. As beta goes to infinity, the distribution concentrates on the minima of V. Run MCMC with a schedule that slowly cools beta upward. No gradients required — works on discrete configurations, combinatorial problems, travelling salesman, everything that's otherwise intractable.

**Animation intent.** A rugged V(x) landscape. At low beta, the chain explores freely across barriers. As beta increases, the sampling distribution sharpens until it lives near the global minimum. Caption: "sampling as optimisation in disguise."

**Humor note.** None.

**Runtime.** ~30 s

## Scene 03 — Temperature Schedules

**Concept.** The schedule is everything. Hajek's theorem guarantees convergence for a logarithmic schedule — provably correct, but so slow that the universe ends first. In practice, everyone uses geometric cooling — beta_{n+1} = alpha * beta_n with alpha slightly above one — which may get stuck in a local minimum but usually converges fast enough. Tune alpha empirically. The theory is beautiful; the practice is black magic.

**Animation intent.** Two cooling curves: logarithmic (convex, excruciatingly slow) versus geometric (rising fast). The chain's progress overlaid; logarithmic finds the global min, geometric finds a good local one much faster.

**Humor note.** "Logarithmic cooling converges to the global optimum. And also heat-death-of-the-universe. Pick your problem."

**Runtime.** ~30 s

## Scene 04 — Simulated Tempering

**Concept.** For sampling rather than optimisation, augment the state with a temperature index. A ladder of temperatures from hot to cold; the chain alternates between updating the state and changing temperature. At high temperatures barriers are low, so the chain crosses multimodal structure; at low temperatures it samples the actual target. Catch: you need the partition function ratios c_k, which must be estimated beforehand.

**Animation intent.** A temperature ladder drawn vertically. The chain moves up and down the ladder, alongside its state updates. At the bottom rung (beta=1), state configurations sampled look like the target. Caption: "free exploration up top, accurate samples down below."

**Humor note.** None.

**Runtime.** ~30 s

## Scene 05 — Parallel Tempering

**Concept.** Run K chains simultaneously at different temperatures. Each chain does ordinary MCMC. Occasionally propose swapping configurations between adjacent-temperature chains; accept with a ratio of Boltzmann weights. No c_k required — it cancels. Geometric temperature spacing often optimal. Trivially parallel across processors. A Monte Carlo practitioner's favourite barrier-crossing tool.

**Animation intent.** Five chains running side by side at five temperatures. Periodically, arrows show swap proposals between neighbours. Accepted swaps redraw; the low-temperature chain inherits a hot configuration and suddenly sees a new mode.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 06 — Entropic Sampling

**Concept.** Weight each state by one over the density of states Omega(E). The resulting probability distribution over energies is flat — you visit all energies equally. Once Omega(E) is known, observables at any temperature follow by trivial reweighting. The catch is that Omega is unknown a priori — you must estimate it iteratively. Wang-Landau solves this elegantly; it's the same idea reborn.

**Animation intent.** Energy histogram becomes flat as the simulation runs. Omega(E) builds up as a parallel curve. With Omega known, any thermodynamic observable can be computed at any T without additional simulation.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 07 — SMC Overview

**Concept.** Sequential Monte Carlo approximates a sequence of target distributions — not one target. Three ingredients: a propagation kernel that moves samples forward, an importance reweighting step, and a resampling step that replaces low-weight samples with copies of high-weight ones. Originally Bayesian filtering for hidden Markov models. Also used for rare events and slow tempering sequences.

**Animation intent.** A cloud of weighted particles. At each time step: propagate (particles move), reweight (some grow, others shrink), resample (fat particles split, skinny ones die). The cloud evolves through a sequence of target distributions.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 08 — Bayesian Filtering Setup

**Concept.** You have a hidden state evolving in time — X_{j+1} equals some dynamics plus noise — and noisy observations Y_j of it. The filtering distribution is the conditional on observations up to time j. It evolves by two steps: prediction (propagate through dynamics, distribution broadens) and analysis (multiply by observation likelihood, distribution sharpens). A particle filter implements this as Monte Carlo.

**Animation intent.** A hidden trajectory on a strip chart, with a noisy observation dot at each time. Above: a cloud of predicted particles broadening, then sharpening as each new observation arrives. The particle cloud tracks the hidden state.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 09 — Bootstrap Particle Filter

**Concept.** The simplest SMC for filtering. Propagate each particle through the dynamics (sample from the transition kernel). Weight by the observation likelihood. Normalise weights, resample. Convergence bound: total variation distance between the particle approximation and the true filter is bounded by c over square-root of N — but the constant c can grow exponentially if weight variance is unchecked.

**Animation intent.** A particle cloud propagates through stochastic dynamics. A new observation arrives; each particle's weight is the likelihood of that observation given its state. Resampling shrinks low-weight particles, duplicates high-weight ones. Cloud re-centres around the true state.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 10 — Optimal Particle Filter

**Concept.** A small but powerful variant for linear-Gaussian observation models: Bayes-update first, propagate afterward. Apply the observation likelihood to the predictive distribution, then propagate from the Kalman-updated posterior. Variance of the weights is much smaller — you avoid proposing particles that have no chance of surviving the observation. Limited to tractable observation models but a big win when you can use it.

**Animation intent.** Two side-by-side filters. Bootstrap: propagate blindly, many particles reweighted to near zero. Optimal: Kalman-guided proposal concentrates particles where the observation likes them, weight variance stays small.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 11 — Variational Inference: The Trade

**Concept.** MCMC gives unbiased samples but costs CPU. Variational inference trades bias for speed: find the member of a tractable family D that is closest to your target f in KL divergence. The fit is approximate — the family never contains f exactly — but the optimisation is deterministic, often convex enough, and scales to datasets where MCMC crawls. Pick the tool by your constraint: statistical honesty, or wall-clock time.

**Animation intent.** Two portraits. MCMC: chain of samples slowly converging, honest but expensive. VI: a parametric family of distributions deforming toward the target, stopping at the best-in-family, fast but biased.

**Humor note.** "Statisticians love MCMC. Engineers love VI. Both of them secretly wish the other was wrong."

**Runtime.** ~32 s

## Scene 12 — KL Divergence and the ELBO

**Concept.** The KL divergence from g to f is the expectation under g of log g over f. Minimise it to find the best approximation. Because f is only known up to a constant, rewrite: KL equals the negative of the evidence lower bound (ELBO) plus log Z. The ELBO is computable without Z — so maximising ELBO is equivalent to minimising KL, and neither needs the partition function.

**Animation intent.** KL formula expands into two integrals; log Z peeled off as a constant. ELBO pops out as the remaining term. Caption: "maximising ELBO = minimising KL = best approximation."

**Humor note.** None.

**Runtime.** ~30 s

## Scene 13 — The Mean-Field Family

**Concept.** The simplest variational family: fully factorised. The approximation is the product of independent factors g_i(x_i). This sacrifices all correlations — accuracy for every marginal, none for joint structure. Marginal variances can be wrong even when marginal means are right. Roots in statistical physics, where mean-field theory replaces fluctuating neighbours with their average.

**Animation intent.** A true joint Gaussian with strong correlation, shown as a tilted ellipse. The mean-field approximation is an axis-aligned Gaussian product — correct means, correct marginals, zero correlation. The mismatch is visible.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 14 — CAVI

**Concept.** Coordinate-Ascent Variational Inference optimises each factor in turn, keeping the others fixed. The update for g_i is proportional to the exponential of the expected log joint under the remaining factors. For exponential-family models it has closed form. Each step increases the ELBO monotonically. Analogous to Gibbs sampling, but deterministic and biased.

**Animation intent.** A parameter vector of factor means. Each coordinate optimised in turn. ELBO monotonically increases with every update. Trajectory reaches a local maximum — the ELBO is non-concave in general.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 15 — CAVI and Gibbs: Cousins

**Concept.** Gibbs: stochastic, exact, expensive. CAVI: deterministic, biased, cheap. Both update one coordinate at a time; Gibbs draws from the conditional, CAVI finds the best variational factor under expected log-conditional. They're duals — sampling versus optimisation on the same coordinate structure. In practice, use CAVI to initialise Gibbs, or Gibbs to polish CAVI. Neither dominates the other uniformly.

**Animation intent.** Two tables side by side: Gibbs vs CAVI, with rows like "update rule", "stochastic or deterministic", "biased or exact", "cost". Arrows connecting their shared structure.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 16 — EM: Optimisation With Latent Variables

**Concept.** Expectation-Maximisation: given observed y and latent z, find the parameter theta that maximises the marginal likelihood. E-step: compute the expected log-joint under the current posterior over z. M-step: maximise in theta. Iterate. The likelihood rises monotonically; convergence to a local max. For exponential families, the M-step is closed form. EM is the ELBO-maximisation sibling of VI.

**Animation intent.** A two-step loop: E-step puts a fitted distribution over z (weights on clusters in a Gaussian-mixture cartoon). M-step moves the parameters theta uphill in the complete-data log-likelihood. Likelihood curve rises monotonically.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 17 — When EM Breaks and the Monte Carlo Fix

**Concept.** EM's M-step is closed-form only for nice models. When the E-step integral is intractable — as in messy Bayesian models — approximate it by Monte Carlo. Monte Carlo EM samples z given current theta, averages the log-joint over those samples, and maximises. Trades the clean monotonicity of EM for much broader applicability. Saddle points and local maxima remain a hazard.

**Animation intent.** The E-step box labelled "expectation" fails with a red X when the integral is intractable. Replace it with a Monte Carlo sampler that draws latent z values. The rest of EM proceeds as usual.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 18 — SMC Error Analysis

**Concept.** Bootstrap particle filter error is c over square-root of N, just like classical MC, but with a subtle constant. Proof via Lax equivalence: the exact filtering operator is a contraction (errors in prediction shrink), and the sampling step adds O(1/sqrt(N)) noise at each time step. The constant can grow exponentially with time if weight variance is unchecked — which is why resampling exists.

**Animation intent.** Error bound written out: total variation <= c/sqrt(N). Annotate prediction as contraction (arrows pulling in), sampling as additive noise (error bars at each time step). Without resampling, weight variance grows; with resampling, bounded.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 19 — Summary: Four Algorithms for Four Failures

**Concept.** Simulated annealing turns optimisation into cooling; parallel tempering crosses modes by swapping replicas; SMC handles sequential and high-variance targets via particle clouds and resampling; variational inference trades exactness for scalability via ELBO optimisation; EM handles latent-variable MLE with monotone guarantees. Each is a targeted answer to a specific place where vanilla MCMC hurts.

**Animation intent.** A four-quadrant summary with the four methods, each with its signature image: cooling, ladder swap, particle resample, ELBO optimisation. Arrows label which MCMC failure each addresses.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 20 — Preview: Practical Implementation

**Concept.** Final video of the series: the nuts and bolts. Lattice representations in 1D arrays with neighbour tables. Data structures matched to update patterns. Parallelisation via trivially parallel replicas, checkerboard decomposition, and parallel cluster algorithms. Multispin coding to pack sixty-four simulations into one machine word. Random-number generation — the unglamorous foundation that silently breaks everything when it's wrong.

**Animation intent.** A lattice, a data structure diagram, a checkerboard pattern, a machine word packing bits, and a random-number stream. Fade title: "MC-V6: Practical Implementation."

**Humor note.** "The theory is beautiful. The implementation is where your paper actually lives or dies."

**Runtime.** ~28 s
