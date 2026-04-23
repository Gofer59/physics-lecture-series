# MC-V01 — Monte Carlo Foundations | Scene Breakdown
**Series:** Monte Carlo Methods
**Episode:** 01 — Monte Carlo Foundations
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

---

## Scene 01 — The Curse That Randomness Breaks

**Concept.** You want to compute an integral in a thousand dimensions. A grid-based method needs N points per axis, so N to the thousandth power evaluations — hopeless before the heat death of the universe. Throw random points at the problem and the cost stops caring about dimension. This is the one-line miracle that makes statistical physics, Bayesian inference, and lattice QCD tractable.

**Animation intent.** Start with a 2D grid filling a square. Extrude to 3D — points now a volume. Keep adding axes; the grid explodes while a counter spins through absurd numbers. Cut to random dots scattering uniformly across an abstract high-d blob, counter staying modest.

**Humor note.** "Deterministic quadrature in a thousand dimensions is a thought experiment. Monte Carlo is the thing you actually run on a Tuesday."

**Runtime.** ~30 s

## Scene 02 — Integrals Are Expectations

**Concept.** Every integral of a function against a density is, by definition, an expected value. If you can sample from the density, the sample average converges to the integral. That is all Monte Carlo is — a disguise for the law of large numbers. The error shrinks as one over square-root of N, independent of dimension, in exchange for a random error bar instead of a deterministic bound.

**Animation intent.** Write the integral, morph the integrand into "h(X) weighted by f(X)", then collapse into an expectation symbol. A cloud of samples rains down; their running average traces a curve that settles onto the true value with a shrinking confidence band.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 03 — Two Worlds, One Tool

**Concept.** The same machinery underlies Bayesian posterior inference and the Boltzmann distribution of statistical mechanics. In both, the target density is known only up to a normalising constant that is itself an intractable integral. The observable you care about is always an expectation. Monte Carlo lets you compute that expectation without ever touching the normaliser.

**Animation intent.** Split screen. Left: a Bayesian posterior labelled "prior times likelihood, divided by impossible integral". Right: a Boltzmann weight labelled "exp(-beta E), divided by the partition function". Both sides dissolve into the same sample-average formula in the middle.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 04 — Six Places It Hurts

**Concept.** Naive Monte Carlo runs into six walls: high dimension, unavailable targets, multi-modal landscapes, rare events, correlated variables, and the question of when to stop. Every technique in the next five videos is a targeted attack on one of these. Before reaching for a hammer, know which of the six nails you are hitting.

**Animation intent.** A hex diagram with six panels lighting up one by one: a tall mountain (dim), a black box (target), twin peaks (modes), a tiny needle (rare event), entangled chains (correlation), a question mark clock (convergence).

**Humor note.** None.

**Runtime.** ~28 s

## Scene 05 — Uniforms Become Anything

**Concept.** Given a uniform random number between 0 and 1, the inverse cumulative distribution function of your target maps it to a sample from that target. Plug uniform into F-inverse, out comes the distribution you wanted. It is exact, one-shot, and asks for nothing but the ability to invert F in closed form — which is almost never the case in practice.

**Animation intent.** A uniform dot slides along the y-axis of a CDF curve. A horizontal line shoots across, hits the curve, drops to the x-axis as a target sample. Repeat with many dots; watch the target histogram emerge below.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 06 — Rejection, and Why It Fails in High Dimension

**Concept.** If you can't invert the CDF, try rejection sampling: draw from a proposal, accept with probability proportional to the density ratio, bounded by a constant M. The accepted points are exactly the target. But in d dimensions, with a product structure, M grows like M-to-the-d. Your acceptance rate collapses exponentially. Rejection dies the instant you leave low dimensions.

**Animation intent.** A cloud under a rescaled Gaussian envelope; accepted points stay, rejected points flash red and vanish. Slider increases dimension; the accept fraction plummets from 80% to 0.001% as a counter ticks up.

**Humor note.** "In one dimension, rejection is efficient. In fifty, it's a ritual."

**Runtime.** ~30 s

## Scene 07 — Classical Monte Carlo and Its Error Bar

**Concept.** Draw N i.i.d. samples from the target, average the observable, done. The estimator is unbiased; its variance is the target variance divided by N. The central limit theorem gives you a Gaussian confidence interval that shrinks like one over square-root of N — dimension-free, but brutally slow. One-hundred-fold more samples buys a ten-fold tighter error bar.

**Animation intent.** A running-average trace for an estimator with its 95% confidence band visibly shrinking as samples accumulate. A tick counter shows N; the band width scales as 1/sqrt(N) in real time.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 08 — Estimating Pi, Honestly

**Concept.** Throw points uniformly into a unit square. The fraction that land inside the inscribed unit circle, times four, estimates pi. With ten thousand samples you get roughly 3.14 plus or minus a percent. It isn't the best way to compute pi — but it's the clearest demonstration of the three-step Monte Carlo recipe: rewrite as expectation, build sample average, attach CLT error bar.

**Animation intent.** Dots rain into a square with inscribed circle; inside-circle dots light blue, outside red. A running estimate 4*(inside/total) converges to pi with a visible confidence band. End frame: "N=10^4, pi-hat = 3.1416, CI ± 0.02".

**Humor note.** None.

**Runtime.** ~28 s

## Scene 09 — Importance Sampling: Reweight What You Can Sample

**Concept.** You often can't sample from the distribution you want. Rewrite the expectation under a distribution you can sample from, g, weighting each sample by the density ratio f over g. The estimator is still unbiased. Choose g wisely and variance plummets; choose g poorly and you're worse off than before. Importance sampling is both variance reduction and a workaround for intractable targets.

**Animation intent.** Target f as a narrow peak, proposal g as a fat cloud. Samples from g pop in, each tagged with a weight that rescales its contribution. Watch the weighted histogram reshape itself into f.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 10 — The Optimal Proposal You Can't Have

**Concept.** The variance-minimising proposal is proportional to the integrand times the target density — a result so clean it's almost a joke. You can't compute it, because computing it requires the answer you're after. The practical move is to use this as a guide: pick a proposal that hugs the regions where the integrand is large. In a Gaussian tail example, a shifted exponential proposal gives ten thousand samples the accuracy of a million.

**Animation intent.** Show optimal g* as the pointwise product |h|f. Overlay a shifted exponential proposal on a Gaussian tail region. Side-by-side counters: naive MC needs 10^6, importance sampling needs 10^4 for same error.

**Humor note.** "The optimal proposal requires knowing the answer. Which is like Google telling you it could save you time if you already knew what you were looking for."

**Runtime.** ~32 s

## Scene 11 — Autonormalised Importance Sampling

**Concept.** When you only know f up to a constant — which is most of the time — use self-normalised weights: divide each weight by the sum of weights. The estimator becomes slightly biased, but the bias vanishes as one over N. The cost of admission is that unless your proposal is close to the target, a few samples end up carrying all the weight while the rest contribute nothing.

**Animation intent.** A bar chart of normalised weights. Sometimes flat and healthy. Sometimes one bar towers over all the others — the dreaded weight collapse — and the sample average becomes essentially the value at that one point.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 12 — Effective Sample Size

**Concept.** Weight collapse isn't subjective — it has a number. The effective sample size, one over the sum of squared normalised weights, tells you how many i.i.d. samples your weighted set is really worth. ESS equal to N means perfectly balanced weights. ESS equal to one means a single sample is doing all the work. It is a diagnostic, not a cure: a small ESS doesn't say your answer is wrong, only that you should not trust it.

**Animation intent.** Two panels side by side. Left: balanced weights, ESS meter full. Right: one enormous weight, ESS meter pinned near zero. Flip between the two to show how quickly the indicator moves.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 13 — Antithetic Sampling

**Concept.** If your observable has odd structure around some symmetry point, pair each sample with its mirror image. The two are perfectly anti-correlated for the odd part, so the odd-component variance cancels exactly. You get the same mean for half the computational cost, assuming the odd part dominated the variance. A free lunch when symmetry is on your side.

**Animation intent.** A function symmetric about a point c. Samples come in pairs, reflections of each other across c. The odd component of the observable cancels visibly on pairing; the even component remains. Variance counter drops by a factor tied to correlation rho.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 14 — Control Variates

**Concept.** Find a function close to your observable whose mean you already know. Subtract it off, estimate only the residual by Monte Carlo, add back the known mean. Your variance is now controlled by how well the auxiliary function approximates yours. In the limit of a perfect approximation, variance is zero. In practice: fit a low-order polynomial and watch the error bar shrink.

**Animation intent.** Plot h(x) as a wavy curve. Draw a polynomial fit on top labelled "known mean mu". Shade the residual. Show the variance bar for h alone, then much smaller for the residual.

**Humor note.** "The better your guess, the less you need Monte Carlo. Philosophically uncomfortable, operationally useful."

**Runtime.** ~30 s

## Scene 15 — Stat Mech Dies Under Simple Sampling

**Concept.** In the Boltzmann distribution, low-energy states carry enormous weight and high-energy states are astronomically suppressed. Sample uniformly from state space and almost every sample lives where the Boltzmann factor is essentially zero. Reweighting is catastrophic — the handful of low-energy samples, if any, dominate the entire estimate. Naive sampling is not just inefficient; it is pathological.

**Animation intent.** A vast state-space grid; uniform samples scatter across it. Boltzmann weights shown as tiny dots everywhere except one corner glowing bright. Running average dominated by a single fluke sample, error bar essentially infinite.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 16 — Boltzmann-Weighted Sampling as the Fix

**Concept.** The cure is obvious in hindsight: sample from the Boltzmann distribution itself. Every sample now carries equal weight; the observable is a simple average. The partition function never has to be computed, because it cancels. The only remaining question is how to actually draw from a distribution you cannot invert, cannot bound, and cannot evaluate pointwise in normalised form. That's the next video.

**Animation intent.** Morph the useless uniform cloud from the previous scene into a cloud concentrated on low-energy states. All samples now equal size. Label "Z never needed, cancels in the ratio".

**Humor note.** None.

**Runtime.** ~28 s

## Scene 17 — Knothe–Rosenblatt and Triangular Transport

**Concept.** In high dimensions, there's a clever generalisation of the inverse CDF: a triangular map that transforms a uniform vector into a target sample, component by component, using conditional CDFs. The Jacobian is lower-triangular — easy determinant. It's a principled way to push randomness through a joint distribution, and it's the seed of modern normalising flows.

**Animation intent.** A uniform d-vector enters a triangular pipeline; each component gets transformed using only the earlier components. The output vector lands as a target sample. Highlight the triangular Jacobian structure.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 18 — Approximate Bayesian Computation

**Concept.** Sometimes you have a simulator but no likelihood — you can generate fake data from parameters, but can't evaluate the probability of observed data. ABC: sample parameters from the prior, simulate, accept when simulated data is within epsilon of observed data. The result is an approximation to the posterior, with epsilon trading off bias against acceptance rate. Likelihood-free inference in one paragraph.

**Animation intent.** A simulator box emits mock datasets. Each is compared to a real dataset icon; close matches are kept, far ones discarded. Accepted parameters form an approximate posterior cloud that sharpens as epsilon shrinks and acceptance collapses.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 19 — Summary: The Foundational Toolkit

**Concept.** We established that Monte Carlo is the law of large numbers applied to expectations, with error one over square-root of N, dimension-free. We saw transformation methods (inverse CDF, Knothe–Rosenblatt), accept-reject schemes (rejection, ABC), and two handles for variance — importance sampling with ESS as diagnostic, and antithetic/control variates as symmetry-exploiting reducers. Naive sampling dies in statistical physics; importance sampling via Boltzmann weighting is the escape hatch.

**Animation intent.** A seven-panel mosaic of the key ideas, each box briefly highlighting its signature visual from earlier scenes. Arrows converge toward the centre where "Boltzmann-weighted sampling" waits as the gateway to Video 2.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 20 — Preview: Metropolis-Hastings

**Concept.** Next video: how do you actually draw from the Boltzmann distribution — or any target known only up to a constant — without being able to invert or bound it? The answer is a Markov chain that stealths its way to the right distribution by construction. We meet Metropolis-Hastings, the single most important algorithm in computational statistical physics, and the foundation of the next five hours of material.

**Animation intent.** A proposed hop in state space, accept/reject dice, a chain of states walking toward a shimmering target distribution. Fade title card: "MC-V2: MCMC and Metropolis-Hastings."

**Humor note.** "One algorithm. Sixty years. A million papers. We'll do it in eight minutes."

**Runtime.** ~25 s
