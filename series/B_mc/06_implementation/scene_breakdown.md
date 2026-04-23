# MC-V06 — Practical Implementation | Scene Breakdown
**Series:** Monte Carlo Methods
**Episode:** 06 — Practical Implementation
**Target runtime:** ~8 minutes (20 scenes × ~25 s each)

---

## Scene 01 — The Gap Between Algorithm and Code

**Concept.** Five videos of theory. None of it matters if your code runs a thousand times slower than it should, generates spin configurations with correlated random numbers, or silently allocates twenty gigabytes for a neighbour table that should fit in kilobytes. This final video is about the craft: lattice representations, data structures, parallelism, multispin coding, and random-number generation. The unglamorous things that determine whether you finish your PhD.

**Animation intent.** A whiteboard algorithm on the left (Metropolis pseudocode) and a slow, cranking computer on the right. Arrows highlight points where implementation choices turn a day into a month or the other way round.

**Humor note.** "Theorists write pseudocode. Experimentalists write loops. The gap between them is the entire second half of your career."

**Runtime.** ~30 s

## Scene 02 — Lattice as 1D Array

**Concept.** Store a d-dimensional cubic lattice of side L as a 1D array of length L to the d. Index mapping: k equals i_1 plus i_2 times L plus i_3 times L squared, and so on. Periodic boundary conditions via modular arithmetic. But mod is slow — pre-compute neighbour-index tables at the start and look them up at runtime. Memory versus speed, decided by cache size and lattice size.

**Animation intent.** A 3D cube of sites unrolls into a long 1D array. Index mapping animated. A neighbour lookup: site k's six neighbours highlighted in the cube, their indices pulled from a pre-computed table.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 03 — Non-Cubic Lattices

**Concept.** Not everything is a square lattice. Triangular (coordination six), honeycomb (three, bipartite), kagome (corner-sharing triangles, three per unit cell), FCC, BCC, diamond. For anything beyond cubic, just give up on index formulas and build an explicit neighbour table nn[i][k]. Memory cost: modest. Simplicity cost: saved.

**Animation intent.** Gallery of lattice types: square, triangular, honeycomb, kagome, FCC. For each, highlight the neighbours of one site and the unit-cell structure. A neighbour table pops up alongside.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 04 — Data Structures by Use Case

**Concept.** Pick the structure to match the access pattern. Arrays for O(1) random access — spins, neighbour tables, Boltzmann factor lookups. Linked lists for O(1) insert and delete without random access — active-site lists in event-driven simulations. Trees and heaps for O(log N) priority operations — continuous-time MC. Circular buffers for streaming autocorrelation. Each is a trade-off; no structure dominates.

**Animation intent.** Four boxes with each structure illustrated: array with index pointer, linked list with next pointers, heap as a binary tree, circular buffer with a wraparound head. Caption each with its signature operation and complexity.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 05 — Trivially Parallel MC

**Concept.** The easiest kind of parallelism: run P independent replicas with different random seeds, average at the end. Error drops by square-root of P. Zero inter-processor communication, perfect scaling. Great for error estimation via many short runs, for averaging over quenched disorder, and as the communication substrate of parallel tempering. When it works, nothing beats it.

**Animation intent.** P identical boxes each running the same MC code with different seeds. At the end, all averages merge into one with a smaller error bar. No arrows between boxes — no communication needed.

**Humor note.** "The first rule of parallel Monte Carlo: if you can run independent copies, do that. Then have lunch."

**Runtime.** ~28 s

## Scene 06 — Checkerboard Decomposition

**Concept.** When sites interact only with nearest neighbours, colour them black and white. All black sites can be updated simultaneously — their neighbours are white, which you don't touch. Then update all white. Two half-sweeps of embarrassingly parallel work per Monte Carlo sweep. In d dimensions you need 2 to the d colours to enforce the independence. Works for Metropolis and heat-bath; fundamental to GPU Ising codes.

**Animation intent.** A 2D lattice coloured in a checkerboard. All black sites flash as they update in parallel, neighbours untouched. Then all white sites update. Parallelism equals N over 2.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 07 — Parallel Cluster Algorithms

**Concept.** Cluster algorithms are intrinsically non-local, which fights parallelism. Bonds can be placed in parallel; the spins within each cluster can be flipped in parallel. The hard part is identifying which sites belong to which cluster — a global connectivity problem. Parallel union-find and label-propagation schemes solve it, with communication cost dominated by cross-boundary labelling. Efficient when the lattice is much bigger than the process grid.

**Animation intent.** A lattice split across four processes with dashed seams. Bonds placed independently in each tile. Cluster IDs propagate along bonds; at seams, labels must be reconciled across processes. Final flipping: parallel again.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 08 — Multispin Coding

**Concept.** Pack sixty-four Ising spins — one per bit — into a single sixty-four-bit machine word. Bitwise AND, OR, XOR update all sixty-four spins in one instruction. Speed-up of up to sixty-four. The acceptance rule becomes Boolean algebra encoded by truth tables and Karnaugh maps. Generate random bits in bulk, apply them as masks. It's how the fastest Ising simulators in the world actually work.

**Animation intent.** Sixty-four parallel Ising systems stacked vertically as bits in a machine word. A bitwise XOR across the word flips sixty-four spins simultaneously. Speedometer goes from 1x to 64x.

**Humor note.** "Sixty-four-bit machines. Sixty-four spins per word. We've been sleeping on this for decades."

**Runtime.** ~32 s

## Scene 09 — Multispin Coding: The 1D Case

**Concept.** In 1D Ising, the acceptance of a single flip depends only on whether the two neighbours are aligned and whether the centre matches them. Three cases: neighbours differ, always accept; neighbours aligned and centre matches, flip with probability p; neighbours aligned and centre doesn't, always flip. Encode each case as a Boolean of bit-vectors; all sixty-four systems evolve in O(1) wall-clock time per site.

**Animation intent.** Three case-cartoons of 1D neighbourhoods: differing neighbours, aligned/same, aligned/different. Their bitwise encodings appear: "aligned = NOT(left XOR right)", "flip_mask = aligned AND same AND random_bit ...". Sixty-four systems update at once.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 10 — Random Number Generation

**Concept.** Monte Carlo consumes staggering quantities of random numbers — billions per hour. True random from hardware is too slow. Pseudo-random is deterministic, fast, reproducible, with a long period. Three properties matter: period (how long before repetition), quality (do the numbers pass statistical tests), and speed. Always validate your generator against a known-answer problem before trusting it for production.

**Animation intent.** A stream of random numbers pouring into an MC simulation. A quality-meter labelled "passes DIEHARD/TestU01?". A period counter. A speed gauge.

**Humor note.** "Your random number generator is the only thing in your code that can corrupt every result without ever throwing an error. Test it."

**Runtime.** ~30 s

## Scene 11 — Linear Congruential Generators

**Concept.** The simplest RNG: x_{n+1} equals a times x_n plus c, mod m. Cheap, fast, common. Period at most m. The dark secret: d-tuples of consecutive LCG outputs lie on at most m to the 1/d hyperplanes in d-dimensional space — Marsaglia's theorem. For m equal to two to the thirty-one, that's bad in high dimensions. Never use a bare LCG for serious work; shuffle it, or combine with something better.

**Animation intent.** LCG recurrence written out. Plot 3D scatter of consecutive triples: they lie on an obvious set of planes. Caption: "Marsaglia, 1968. Every LCG looks like this."

**Humor note.** None.

**Runtime.** ~30 s

## Scene 12 — Shift Register and Lagged Fibonacci

**Concept.** Better generators. Shift register: b_n equals b_{n-p} XOR b_{n-q}, period two to the p minus one. Lagged Fibonacci: x_n equals x_{n-p} combined with x_{n-q} using plus, minus, or multiply. Much longer periods, less high-dimensional correlation. Newman-Barkema recommends subtract-with-borrow lagged Fibonacci. Combine multiple generators with incommensurate periods for production use.

**Animation intent.** Shift register as a long binary array being rotated, with XOR taps at positions p and q. Lagged Fibonacci as a circular buffer of state with combining arithmetic. Period counters explode past LCG's.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 13 — Non-Uniform Random Numbers

**Concept.** Given a good uniform generator, everything else follows. For distributions with closed-form inverse CDFs, use the transformation method: X equals F-inverse of U. Exponential: minus log U over lambda. Power law: x_min times (1 minus U) to the minus one over (n minus one). For more complex targets, rejection or specialised methods. Every library has these; know what's inside.

**Animation intent.** A uniform U dot enters a pipeline. Exponential branch: minus log operation yields an exponential-distributed dot. Power-law branch: a different formula yields a heavy-tailed dot. Both histogram correctly.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 14 — Box-Muller and Gaussians

**Concept.** Two uniform numbers in, two standard normals out: sqrt(minus two log U_1) times cosine of 2 pi U_2, and the sine counterpart. Elegant and exact. Costs a log and a trig per pair. The polar variant avoids trig via rejection in a disc. For general mean and variance, shift and scale: Y equals mu plus sigma times X. Every Monte Carlo code uses this.

**Animation intent.** Two U-dots on a unit square feed into the Box-Muller formula. Output: two normally distributed points. A histogram bell curve forms below. The polar variant plotted alongside as a disc-rejection alternative.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 15 — Rejection for Tougher Targets

**Concept.** When neither transformation nor Box-Muller applies, rejection returns. Draw x uniformly on the bounded domain, u uniformly on [0, M]. Accept if u is below f(x). Acceptance rate equals the integral of f over M times the domain length. Hybrid schemes decompose f into an easy piece (transform) plus a hard residual (reject). Essential for gamma, beta, and nonstandard custom densities.

**Animation intent.** A target density f(x) under a horizontal ceiling M. Uniform (x, u) dots scatter under the ceiling; those below f accept, those above reject. Histogram of accepted x matches f.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 16 — Random Bits

**Concept.** When you only need a yes-no coin flip, don't burn a whole double-precision float. Extract bits from a 32-bit integer — you get thirty-two coin flips for the price of one. Fixed-probability acceptance like exp(-beta*delta_E) can be pre-tabulated as a bit pattern. Combine with multispin coding and you execute sixty-four Ising updates at the cost of a handful of bitwise operations. Maximum efficiency.

**Animation intent.** A 32-bit integer pulled from the RNG. Individual bits peel off as coin flips for thirty-two independent decisions. Combined with the multispin machinery, sixty-four Ising spins update in constant time per flip.

**Humor note.** None.

**Runtime.** ~28 s

## Scene 17 — Summary: What You Need to Ship

**Concept.** Lattice as 1D array with pre-computed neighbour tables; arrays for random access, linked lists for active sets, heaps for priority, circular buffers for streaming; parallelism from trivially parallel replicas up to checkerboard decomposition and parallel cluster algorithms; multispin coding for sixty-fourfold Ising speed-up; lagged-Fibonacci or combined generators, always validated; non-uniform deviates via transformation, Box-Muller, rejection, and cheap random bits.

**Animation intent.** Six-panel summary with the signature image from each topic. A final collage ties them into a running simulation at full speed, with a clock and CPU meter showing realistic production performance.

**Humor note.** None.

**Runtime.** ~30 s

## Scene 18 — Series Retrospective

**Concept.** Six videos. We started with integrals as expectations and the one-over-square-root-N miracle. Built MCMC from Markov chains and detailed balance, conquered the Ising model with Metropolis and then with Wolff cluster flips. Extracted honest physics numbers with binning, jackknife, pyerrors, and finite-size scaling. Escaped bad mixing with annealing, tempering, SMC, and VI. Finally: the implementation craft that turns algorithm into code.

**Animation intent.** Timeline sweeping from V1 to V6 with each video's headline visual popping up in sequence: pi-estimation dots, Markov chain arrow, Hamiltonian orbit, data-collapse curve, particle-filter cloud, multispin word.

**Humor note.** None.

**Runtime.** ~32 s

## Scene 19 — What MC Actually Is, Now That We Know

**Concept.** Monte Carlo is not one algorithm. It is a discipline: the discipline of replacing intractable deterministic computation with controlled randomness and treating the resulting errors with honesty. Every method in this series — from classical sample averages to Hamiltonian Monte Carlo to variational inference — is a specialisation of that principle. The hard parts are never the random numbers themselves; they're the estimators, the diagnostics, and the implementation that carry them.

**Animation intent.** A pull-back from a single running chain to a cloud of all the techniques orbiting a central idea: "expectation, approximated, with error bars." Each technique labelled and glowing.

**Humor note.** "If you remember one thing: the error bar is not optional."

**Runtime.** ~30 s

## Scene 20 — Preview: Lattice QCD, the Final Testbed

**Concept.** The natural continuation of this series is lattice quantum chromodynamics: the most demanding application of Monte Carlo methods ever attempted. Quark and gluon fields on a spacetime grid, with HMC integrating through gauge symmetry, correlated fits with pyerrors extracting hadron masses, cluster-free critical slowing down battled with multigrid. Everything we've built is about to be stress-tested at the edge of what computation can do.

**Animation intent.** A smooth transition from the Ising lattice of this series into a 4D spacetime lattice of QCD. Gluon links glow on edges, quark fields on sites. Fade title: "Next Series: Lattice Quantum Chromodynamics."

**Humor note.** "Monte Carlo learned on spins. Grew up on QCD. See you there."

**Runtime.** ~28 s
