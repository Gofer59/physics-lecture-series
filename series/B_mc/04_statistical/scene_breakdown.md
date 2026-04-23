# MC-V04 — Statistical Analysis of MC Data | Scene Breakdown
**Series:** Monte Carlo Methods
**Episode:** 04 — Statistical Analysis of MC Data
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

---

## Scene 01 — Your Error Bar Is Lying

**Concept.** You ran your MCMC chain, averaged your observable, divided sigma by square-root of N. The number you report is wrong — by a factor of square-root of 2 tau-int, which can be ten, or fifty, or a thousand. MCMC samples are correlated, and the naive i.i.d. error formula silently treats them as independent. Nearly every quantitative MC paper lives or dies by how honestly it handles this.

**Animation intent.** A clean running average with a tiny, cocky error bar. Reveal the true confidence band around it — much wider. Caption: "underestimation factor sqrt(2*tau_int)". The cocky error bar shrinks ashamedly.

**Humor note.** "If your error bar looks too good, it is too good. Fix that."

**Runtime.** ~30 s

## Scene 02 — The True Variance Formula

**Concept.** For correlated data, the variance of the sample mean is sigma-squared over N, times (one plus two times the sum of lagged autocorrelations). That sum, packaged as the integrated autocorrelation time tau-int, captures everything about how much your correlations inflate error. Without it, you don't know what you computed. With it, you do.

**Animation intent.** The naive 1/N formula morphs term by term into sigma^2/N * (1 + 2*sum of rho_k). Overlay the autocorrelation function; the shaded area under it is (tau_int - 1/2). Final form: variance = 2*tau_int*sigma^2/N.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 03 — Binning: The Workhorse

**Concept.** Partition your chain into non-overlapping blocks of size b. Compute the average within each block, then take the variance of the block averages. When b exceeds the autocorrelation time, those block averages behave like independent samples, and the variance estimator is honest. Plot estimated sigma_b versus b; the plateau tells you the right error bar.

**Animation intent.** Timeseries partitioned into small, then larger, blocks. Block averages shown above. A plot: estimated variance grows with b and levels off at the plateau. The plateau value is the correct error.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 04 — Reading the Plateau

**Concept.** Too small a block: blocks still correlated, error underestimated. Too large a block: too few blocks, noisy estimate. The plateau, where the curve flattens for b well above tau-int, is the honest answer. No plateau means your simulation is too short — run more. The ratio of the plateau value to the naive value gives you tau-int as a bonus.

**Animation intent.** The variance-vs-b curve rising and flattening. Annotate three regions: too small (biased down), plateau (correct), too large (noisy). Mark the extracted tau_int on a side panel.

**Humor note.** "If you don't see a plateau, you haven't actually finished your simulation. Sorry."

**Runtime.** ~30 s

## Scene 05 — Bootstrap for Nonlinear Estimators

**Concept.** Some observables are not simple means — think ratios, susceptibilities, eigenvalues of a correlator matrix. Bootstrap: resample your chain (or blocks of it) with replacement, recompute the estimator, repeat a thousand times. The scatter of the bootstrap estimates gives you a confidence interval without any distributional assumption. Resample blocks, not individual samples, to respect correlation.

**Animation intent.** A dataset with labelled blocks. Each bootstrap replica pulls blocks uniformly with replacement. A histogram of resulting estimates emerges; its spread is the error.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 06 — Jackknife

**Concept.** Jackknife: leave out one block at a time, compute the estimator on the rest, repeat. A clever prefactor — (N_b minus 1) over N_b — converts the variance across leave-one-out estimates into the correct error bar. Jackknife handles nonlinear estimators, estimates bias, and propagates errors cleanly through covariance-matrix fits. In lattice QCD it is the default analysis tool.

**Animation intent.** Data blocks with one at a time crossed out. Each leave-one-out estimate pops up; their scatter times the (N_b-1)/N_b prefactor gives the error. Flow diagram shows bias correction.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 07 — Estimating Tau-Int Itself

**Concept.** To compute tau-int, you estimate the autocorrelation function and sum it. But at large lag, estimates of rho_k are dominated by noise — you must truncate. Common rules: cut when rho_hat turns negative, or at k_max roughly six times the emerging tau-int (self-consistent). Or fit an exponential at intermediate lags. Either way, truncation is a bias-variance trade, and you don't get tau-int for free.

**Animation intent.** A noisy autocorrelation function. Shade the sum up to a truncation window W. Vary W; show the trade-off between bias (too small) and variance (too large).

**Humor note.** None.

**Runtime.** ~28 s

## Scene 08 — The Gamma Method

**Concept.** Wolff's Gamma method is the principled version. Define projected autocorrelation functions for derived observables F = f(A_1, A_2, ...) using a gradient projection; the integrated autocorrelation for F is an honest tau_int,F that depends on the specific observable. Combined with automatic differentiation for the gradients, you get error bars for arbitrarily complex combinations of primary measurements.

**Animation intent.** A vector of primary observables; an arrow labelled with the gradient of F projects onto a single Gamma_F(t). The sum gives tau_int,F. Call out that different F's on the same chain get different tau_int.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 09 — Automatic Windowing

**Concept.** Choose the summation window W automatically. Too small: truncation bias decays as exp(-W/tau). Too large: statistical noise grows as square-root of (2W+1)/N. Wolff's criterion g(W) less than zero finds the crossover. A bias-correction factor completes the recipe. All of this is what pyerrors automates under the hood.

**Animation intent.** Two competing curves: exponentially decaying bias, linearly growing noise. Their crossover defines the optimal W. A slider chooses W; the error bar is shown at its chosen value.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 10 — Gamma Method vs Binning

**Concept.** For fixed chain length N and autocorrelation tau, both methods give the right answer in expectation — but Gamma's systematic error decays exponentially in W while binning's decays only as tau over block size. At realistic N/tau ratios, Gamma is more reliable; it's the standard in lattice QCD precisely for this reason. Binning is simpler, more transparent, and still the right tool for most MCMC work outside lattice gauge theory.

**Animation intent.** Two curves on one plot: exp(-W/tau) for Gamma, tau/B for binning. Gamma drops below binning quickly. Real-world N/tau ratio marked; Gamma wins at that operating point.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 11 — The Error of the Error

**Concept.** Your error bar is itself an estimate, with its own error. Relative uncertainty on sigma scales as square-root of (2W+1)/N, roughly square-root of 4 tau-int over N. Rule of thumb: N at least 100 tau-int for a ten-percent error on the error. A two-and-a-half-sigma discrepancy means nothing if sigma itself is off by a factor of two. Always quote tau-int alongside your main number.

**Animation intent.** An error bar with a second, smaller error bar on its endpoints. The outer error widens as N/(2*tau_int) shrinks. A warning card: "report tau_int AND N/(2*tau_int) in every paper."

**Humor note.** None.

**Runtime.** ~30 s

## Scene 12 — pyerrors: Analysis as a Library

**Concept.** pyerrors wraps these ideas in Python. The Obs class carries not just a number but its full fluctuation history across ensembles. Arithmetic between Obs objects propagates errors exactly via automatic differentiation. The Corr class handles correlator matrices for lattice QCD, including generalised-eigenvalue problems. FFT-based autocorrelations run in N log N. It is what honest error analysis looks like at scale.

**Animation intent.** An Obs object as a labelled box with (value, fluctuation history, ensemble metadata). Two Obs objects combine through a derived function; error propagates via AD. A Corr object matrix lights up as a GEVP is solved.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 13 — Correlated Chi-Squared Fitting

**Concept.** When fitting a model to correlated data — correlator time slices in LQCD, for example — you cannot use the diagonal chi-squared. The covariance matrix from jackknife has off-diagonal entries, and inverting a near-singular covariance needs care: SVD truncation or shrinkage toward the diagonal. Neglecting these correlations makes chi-squared per degree of freedom meaningless and fit parameter errors optimistic.

**Animation intent.** A jackknife-estimated covariance matrix with significant off-diagonal entries. A diagonal-only fit gives a good-looking chi^2/dof = 1 and narrow error bars; the correlated fit shows wider, correct bars. SVD regularisation illustrated as truncating small eigenvalues.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 14 — Single-Histogram Reweighting

**Concept.** You simulated at beta_0 and actually want results at beta. If beta is close to beta_0, don't re-run — reweight. The histogram of energies from the beta_0 run, multiplied by exp of minus (beta minus beta_0) times E, gives the histogram at beta. This works as long as the energy distributions at the two temperatures overlap. Beautiful trick for locating T_c precisely with one long run.

**Animation intent.** Energy histogram from a single MC run. Multiply bin by bin by exp(-(beta - beta_0)*E). The reweighted histogram shifts to new mean. Extract observables at the new temperature from the reweighted distribution.

**Humor note.** "Running one simulation and pretending you ran twelve. The honest kind."

**Runtime.** ~30 s

## Scene 15 — Multiple-Histogram Reweighting (WHAM)

**Concept.** Single-histogram fails when you need to span a wide temperature range. Multiple-histogram reweighting combines several simulations, each at its own temperature, into one self-consistent estimate of the density of states. The free energies at each temperature are solved iteratively so the overlapping histograms agree. Result: one smooth estimate of any observable across the whole temperature range.

**Animation intent.** Three energy histograms from three temperatures, overlapping. Iterative scheme updates free-energy shifts f_r until the histograms are consistent under reweighting. Output: Omega(E) and thus any observable at any beta.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 16 — Finite-Size Scaling

**Concept.** Phase transitions live in the thermodynamic limit; your lattice is finite. Singularities are rounded into smooth peaks whose height scales with system size. The finite-size scaling hypothesis relates observable Q on lattice L to a universal function of (reduced temperature) times L to the 1/nu. Collapse curves from different L, and the exponents are in the collapse.

**Animation intent.** Susceptibility versus T for three lattice sizes: peaks grow and shift toward T_c. Rescale x-axis by L^{1/nu} and y-axis by L^{-gamma/nu}; curves collapse onto a single scaling function.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 17 — Extracting Critical Exponents

**Concept.** At the critical temperature, finite-size scaling simplifies to clean power laws in L. Magnetisation scales as L to the negative beta over nu; susceptibility as L to the gamma over nu; specific heat as L to the alpha over nu. Log-log plots give the exponents as slopes. The Binder cumulant, a dimensionless combination of moments, is scale-invariant at T_c — curves for different L cross at T_c, pinning it with no exponent assumption.

**Animation intent.** Three log-log plots with clean straight lines labelled with exponent ratios. A Binder cumulant plot: curves for L=16, 32, 64 cross at a single T_c.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 18 — Data Collapse in Practice

**Concept.** Simulate three to five system sizes spanning a decade. Near T_c, use histogram reweighting to get smooth curves at any temperature. Vary trial values of T_c, nu, and the other exponents until the rescaled curves collapse. The quality of the collapse quantifies the fit. Corrections to scaling, governed by a subleading exponent omega, account for deviations at small L.

**Animation intent.** A slider adjusts T_c and nu; three curves slide on the rescaled axes until they collapse. A quality-of-collapse number ticks down toward minimum. Final state: one clean universal curve.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 19 — Summary: From Chain to Physics Number

**Concept.** Raw MCMC output becomes physics through a disciplined pipeline: binning or Gamma-method for honest error bars, jackknife or bootstrap for nonlinear functionals, pyerrors for book-keeping at scale, correlated chi-squared for fits, histogram reweighting for interpolation, finite-size scaling for critical points and exponents. Skip any step and your paper has a footnote it doesn't know about.

**Animation intent.** A flowchart: raw chain → autocorrelation → binning/Gamma → jackknife/bootstrap → correlated fits → reweighting → FSS → physics number with full error. Each box checks off.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 20 — Preview: Annealing, SMC, and Variational Inference

**Concept.** Next video: what to do when MCMC mixes poorly from the start. Simulated annealing for optimisation. Simulated tempering and parallel tempering to cross barriers. Sequential Monte Carlo for filtering and rare events. Variational inference as a deterministic, biased, often dramatically faster alternative. Plus expectation-maximisation, the optimisation sibling of VI.

**Animation intent.** Montage: a cooling schedule ramp, a ladder of replica chains exchanging, a cloud of particles resampling, and a surrogate g fitting itself to a target f. Fade title: "MC-V5: Simulated Annealing, SMC and Variational Inference."

**Humor note.** "Sometimes the right answer isn't a better chain. It's a different algorithm entirely."

**Runtime.** ~28 s
