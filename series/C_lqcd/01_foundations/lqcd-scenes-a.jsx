// lqcd-scenes-a.jsx — Scenes 1-5

const SCENES = [
  { n: 1,  title: 'Perturbation Theory Breaks',            dur: 32 },
  { n: 2,  title: 'Put Spacetime on a Grid',               dur: 30 },
  { n: 3,  title: 'Wick Rotation',                         dur: 32 },
  { n: 4,  title: 'Boltzmann Weight of Fields',            dur: 28 },
  { n: 5,  title: 'Correlators Encode the Spectrum',       dur: 30 },
  { n: 6,  title: 'Discretizing a Scalar Field',           dur: 30 },
  { n: 7,  title: 'Lattice Propagator & Brillouin Zone',   dur: 30 },
  { n: 8,  title: 'The Transfer Matrix',                   dur: 30 },
  { n: 9,  title: 'Reflection Positivity',                 dur: 30 },
  { n: 10, title: 'Mass Gap from Exponential Decay',       dur: 28 },
  { n: 11, title: 'Continuum Limit = Critical Point',      dur: 30 },
  { n: 12, title: 'Asymptotic Freedom',                    dur: 32 },
  { n: 13, title: 'Renormalization Group on the Lattice',  dur: 30 },
  { n: 14, title: 'Symanzik Improvement',                  dur: 28 },
  { n: 15, title: 'Finite Volume & Boundary Conditions',   dur: 28 },
  { n: 16, title: 'Two Key Equations',                     dur: 30 },
  { n: 17, title: 'Importance Sampling',                   dur: 28 },
  { n: 18, title: 'The Anisotropic Lattice',               dur: 25 },
  { n: 19, title: 'What We Built',                         dur: 32 },
  { n: 20, title: 'Next: Gauge Fields on the Lattice',     dur: 30 },
];

let _t = 6;
const SCENE_BOUNDS = SCENES.map(s => {
  const start = _t, end = _t + s.dur;
  _t = end;
  return { ...s, start, end };
});
const TITLE_END = 6;
const TOTAL_DUR = _t + 2;

function TitleCard() {
  return (
    <Sprite start={0} end={TITLE_END}>
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = t < 0.8 ? t / 0.8 : t > duration - 0.8 ? (duration - t) / 0.8 : 1;
        const growth = Math.min(1, t / 1.5);
        const cx = 960, cy = 480;
        const s = 90;
        return (
          <div style={{ position: 'absolute', inset: 0, background: 'var(--canvas-bg)', opacity: fade }}>
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* plaquette sigil, large */}
              <g transform={`translate(${cx}, ${cy})`}>
                <rect x={-s} y={-s} width={s*2} height={s*2} fill="none"
                  stroke="var(--accent)" strokeWidth="2.4"
                  strokeDasharray={`${growth * s * 8} ${s * 8}`} opacity="0.95" />
                {[[-s,-s],[s,-s],[-s,s],[s,s]].map(([x,y], i) => (
                  <circle key={i} cx={x} cy={y} r={8 * growth} fill="var(--accent)" />
                ))}
                <line x1={-s} y1={-s} x2={s * growth} y2={s * growth}
                  stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="3 4" opacity="0.7" />
                {[0,1,2,3].map(i => {
                  const a = (i / 4) * Math.PI * 2 + t * 0.3;
                  return <circle key={i} cx={Math.cos(a) * (s + 40)} cy={Math.sin(a) * (s + 40)} r="2.5" fill="var(--accent)" opacity="0.4" />;
                })}
              </g>
            </svg>
            <div style={{
              position: 'absolute', top: 640, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 72, color: 'white',
              letterSpacing: '0.005em', opacity: Math.min(1, Math.max(0, (t - 0.8) / 0.8)),
            }}>
              Lattice QCD from the Ground Up
            </div>
            <div style={{
              position: 'absolute', top: 750, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'var(--accent)',
              opacity: Math.min(1, Math.max(0, (t - 1.5) / 0.8)),
            }}>
              Lecture 1 — Lattice Foundations
            </div>
            <div style={{
              position: 'absolute', top: 1010, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--canvas-dim)',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              opacity: Math.min(1, Math.max(0, (t - 2.5) / 1)),
            }}>
              Physics Study Reference
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ════════ SCENE 01 — Perturbation Theory Breaks ════════
function Scene01({ start, end }) {
  return (
    <Scene start={start} end={end} label="01">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // Running coupling alpha_s(Q): small at high Q, explodes at low Q
        // Plot vertical: alpha_s, horizontal: log(Q). Origin top-left of plot.
        const plotX = 260, plotY = 260, plotW = 1100, plotH = 520;
        const alpha = (x) => {
          // x in [0,1], where 0=high energy(~Q=100 GeV), 1=low energy(~Q=0.2 GeV)
          // rough alpha_s(Q) = 1/(b*log(Q/Lambda)); diverges as Q->Lambda
          const q = 100 * Math.pow(0.002, x);
          const lam = 0.2;
          const r = Math.log(q / lam);
          if (r <= 0.15) return 6;
          return Math.min(6, 1 / (1.2 * r));
        };

        let d = '';
        const draw = Math.min(1, (t - 1) / 4);
        const N = 180;
        for (let i = 0; i <= N * draw; i++) {
          const xN = i / N;
          const a = alpha(xN);
          const px = plotX + xN * plotW;
          const py = plotY + plotH - Math.min(plotH - 20, a * 70);
          d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
        }

        // collapsing feynman sum annotation (right side)
        const collapseT = clamp((t - 14) / 6, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={1} title={'Perturbation Theory Breaks'} />
            <SceneRefs refs={["wilson74","gattringer"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* axes */}
              <line x1={plotX} y1={plotY + plotH} x2={plotX + plotW} y2={plotY + plotH} stroke="var(--canvas-dim)" strokeWidth="1" />
              <line x1={plotX} y1={plotY} x2={plotX} y2={plotY + plotH} stroke="var(--canvas-dim)" strokeWidth="1" />
              <text x={plotX + plotW + 20} y={plotY + plotH + 6} fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">log Q</text>
              <text x={plotX - 60} y={plotY - 10} fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">α<tspan baselineShift="sub" fontSize="16">s</tspan></text>

              {/* high / low annotations */}
              <text x={plotX + 80} y={plotY + plotH + 40} fill="var(--accent-green)" fontFamily="var(--font-ui)" fontSize="16">high energy  · α<tspan baselineShift="sub" fontSize="11">s</tspan> ≪ 1</text>
              <text x={plotX + plotW - 360} y={plotY + plotH + 40} fill="var(--accent-red)" fontFamily="var(--font-ui)" fontSize="16">hadronic regime · α<tspan baselineShift="sub" fontSize="11">s</tspan> ≳ 1</text>

              {/* Lambda_QCD vertical asymptote line */}
              {t > 6 && (
                <g opacity={Math.min(1, (t - 6) / 1.2)}>
                  <line x1={plotX + plotW * 0.82} y1={plotY} x2={plotX + plotW * 0.82} y2={plotY + plotH}
                    stroke="var(--accent-red)" strokeWidth="1.2" strokeDasharray="5 6" opacity="0.6" />
                  <text x={plotX + plotW * 0.82 + 12} y={plotY + 30} fill="var(--accent-red)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="20">Λ<tspan baselineShift="sub" fontSize="12">QCD</tspan></text>
                </g>
              )}

              {/* the curve */}
              <path d={d} fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />

              {/* Feynman series collapsing */}
              {t > 10 && (() => {
                const op = Math.min(1, (t - 10) / 1);
                return (
                  <g transform={`translate(${plotX + 80}, ${plotY + 110})`} opacity={op * (1 - collapseT * 0.7)}>
                    {/* Label */}
                    <text x="0" y="-50" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="14" letterSpacing="0.2em">
                      PERTURBATIVE EXPANSION
                    </text>
                    {/* Observable = */}
                    <text x="0" y="0" fill="white" fontFamily="var(--font-math)" fontStyle="italic" fontSize="32">
                      𝒪
                    </text>
                    <text x="40" y="0" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontSize="32">=</text>

                    {/* Three terms: c₀ + c₁ αₛ + c₂ αₛ² + … with a vertex diagram under each */}
                    {[
                      { cx: 110, coef: 'c₀',        power: null  },
                      { cx: 250, coef: '+ c₁',      power: 'αₛ'  },
                      { cx: 400, coef: '+ c₂',      power: 'αₛ²' },
                      { cx: 560, coef: '+ ⋯',       power: null  },
                    ].map((term, i) => {
                      const shrink = 1 - collapseT * (0.3 + i * 0.2);
                      return (
                        <g key={i} transform={`translate(${term.cx}, 0) scale(${shrink})`}>
                          <text x="0" y="0" fill="white" fontFamily="var(--font-math)" fontStyle="italic" fontSize="28">
                            {term.coef}
                          </text>
                          {term.power && (
                            <text x="50" y="0" fill="var(--accent)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="28">
                              {term.power}
                            </text>
                          )}
                          {/* tiny vertex diagram under each, sized to loop order */}
                          {i >= 1 && i <= 2 && (
                            <g transform={`translate(${term.power ? 20 : 0}, 56)`}>
                              {/* simple vertex: 3 legs */}
                              <line x1="-16" y1="-10" x2="0" y2="0" stroke="var(--accent)" strokeWidth="1.4" />
                              <line x1="16"  y1="-10" x2="0" y2="0" stroke="var(--accent)" strokeWidth="1.4" />
                              <line x1="0"   y1="0"   x2="0" y2="14" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="2 2" />
                              <circle cx="0" cy="0" r="2.5" fill="var(--accent)" />
                              {/* extra loop at 2nd order */}
                              {i === 2 && (
                                <circle cx="0" cy="-8" r="6" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
                              )}
                            </g>
                          )}
                        </g>
                      );
                    })}

                    {/* Divergence callout */}
                    {collapseT > 0.5 && (
                      <g opacity={(collapseT - 0.5) * 2} transform="translate(740, 0)">
                        <text x="0" y="0" fill="var(--accent-red)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="34">
                          → ∞
                        </text>
                        <text x="0" y="24" fill="var(--accent-red)" fontFamily="var(--font-ui)" fontSize="13" letterSpacing="0.15em">
                          WHEN αₛ ~ 1
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 10 ? 'At high energy the coupling is small. Drop down…' :
               t < 21 ? <>…and the series you were expanding in <span style={{color:'var(--accent-red)'}}>diverges</span>.</> :
               'We need a definition of QCD that does not assume small coupling.'}
            </div>

            {t > 22 && (
              <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, color: 'var(--canvas-dim)',
                opacity: fadeIO(t - 22, duration - 22, 0.6, 0.6) }}>
                "Perturbation theory: the physicist's favorite tool, right up until it isn't."
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 02 — Put Spacetime on a Grid ════════
function Scene02({ start, end }) {
  return (
    <Scene start={start} end={end} label="02">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const dissolve = clamp((t - 2) / 5, 0, 1);     // continuum → grid
        const momentumT = clamp((t - 12) / 4, 0, 1);   // BZ clipping arrows
        const finiteT  = clamp((t - 20) / 4, 0, 1);    // infinite → finite

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={2} title={'Spacetime → Lattice'} />
            <SceneRefs refs={["wilson74","creutz83"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* continuum (left half), fading */}
              <g opacity={1 - dissolve} transform="translate(480, 560)">
                {Array.from({length: 80}).map((_, i) => {
                  const x = ((i * 97) % 400) - 200;
                  const y = ((i * 133) % 400) - 200;
                  return <circle key={i} cx={x} cy={y} r="1.2" fill="var(--accent)" opacity="0.5" />;
                })}
                <text x="0" y="240" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="18">continuum</text>
              </g>

              {/* lattice (right) */}
              <g opacity={dissolve} transform="translate(1240, 560)">
                {(() => {
                  const cols = 9, rows = 9, sp = 48;
                  const off = -(cols - 1) * sp / 2;
                  return <Lattice2D ox={off} oy={off} cols={cols} rows={rows} spacing={sp}
                    color="var(--accent)" linkOp={0.35} siteR={3.2} />;
                })()}
                <text x="0" y="240" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="18">
                  hypercubic lattice · spacing <tspan fill="var(--accent)" fontStyle="italic">a</tspan>
                </text>
              </g>

              {/* dissolve arrow */}
              {dissolve > 0.15 && (
                <g transform="translate(860, 560)" opacity={Math.min(1, dissolve * 2) * (1 - Math.max(0, dissolve - 0.9) * 4)}>
                  <line x1="-40" y1="0" x2="120" y2="0" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arr2)" />
                  <text x="40" y="-14" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="16">discretize</text>
                </g>
              )}

              {/* Momentum clipping: Brillouin zone box appears around lattice */}
              {momentumT > 0 && (
                <g transform="translate(1240, 560)" opacity={momentumT}>
                  <rect x="-230" y="-230" width="460" height="460" fill="none"
                    stroke="var(--accent-yellow)" strokeWidth="1.4" strokeDasharray="6 6" />
                  <text x="230" y="-240" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="20" textAnchor="end">
                    |p| ≤ π/a
                  </text>
                </g>
              )}

              {/* Bottom equation transform */}
              <g transform="translate(960, 900)" opacity={Math.max(0, Math.min(1, (t - 15) / 2))}>
                <text x={-320} y="0" fill="white" fontFamily="var(--font-math)" fontStyle="italic" fontSize="32" textAnchor="end">
                  ∫ 𝒟φ  (∞-dim)
                </text>
                <text x="-250" y="0" fill="var(--canvas-dim)" fontSize="28">  →  </text>
                <text x={-180} y="0" fill="var(--accent)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="32">
                  Σ over <tspan fontStyle="normal">N</tspan> sites  (finite)
                </text>
              </g>

              {/* finite-ness emphasis */}
              {finiteT > 0 && (
                <text x="960" y="960" textAnchor="middle" fill="var(--accent-green)" fontFamily="var(--font-ui)" fontSize="20"
                  opacity={finiteT}>
                  a computer can handle this.
                </text>
              )}

              <defs>
                <marker id="arr2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" /></marker>
              </defs>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 12 ? "Wilson, 1974: replace spacetime with a hypercubic grid." :
               t < 20 ? <>Momentum is capped at <span style={{color:'var(--accent-yellow)'}}>π/a</span>. The UV is gone.</> :
               'A rigorous, non-perturbative definition of quantum field theory.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 03 — Wick Rotation ════════
function Scene03({ start, end }) {
  return (
    <Scene start={start} end={end} label="03">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        // Complex t-plane, left. Axis rotates.
        const rotT = clamp((t - 3) / 4, 0, 1);
        const angle = rotT * 90; // degrees
        // Wave morph right side
        const morphT = clamp((t - 9) / 5, 0, 1);

        const humorT = clamp((t - 24) / 2, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={3} title={'Wick Rotation'} />
            <SceneRefs refs={["osterwalder","montvay"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* LEFT: complex t-plane */}
              <g transform="translate(520, 560)">
                <line x1="-260" y1="0" x2="260" y2="0" stroke="var(--canvas-dim)" strokeWidth="1" />
                <line x1="0" y1="-260" x2="0" y2="260" stroke="var(--canvas-dim)" strokeWidth="1" />
                <text x="270" y="6" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="20">Re t</text>
                <text x="10" y="-260" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="20">Im t</text>

                {/* original real-axis contour */}
                <line x1="-230" y1="0" x2="230" y2="0" stroke="var(--accent-red)" strokeWidth="3" opacity={1 - rotT * 0.6} />
                {/* rotating line: goes from real → imaginary (up). Rotates clockwise. */}
                <g transform={`rotate(${-angle})`}>
                  <line x1="-230" y1="0" x2="230" y2="0" stroke="var(--accent)" strokeWidth="3" />
                </g>
                {/* arc showing rotation */}
                {rotT > 0.1 && (() => {
                  const r = 90;
                  const a = angle * Math.PI / 180;
                  const x = r * Math.cos(-a);
                  const y = r * Math.sin(-a);
                  return <path d={`M ${r},0 A ${r},${r} 0 0,0 ${x},${y}`} fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="4 4" opacity="0.7" />;
                })()}
                <text x="0" y="300" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">
                  t → −iτ
                </text>
              </g>

              {/* RIGHT: wave → decaying exponential */}
              <g transform="translate(1360, 560)">
                <line x1="-260" y1="0" x2="260" y2="0" stroke="var(--canvas-dim)" strokeWidth="1" />
                <line x1="-230" y1="-180" x2="-230" y2="180" stroke="var(--canvas-dim)" strokeWidth="1" />
                {(() => {
                  // morph between e^{iS}: oscillating cos, and e^{-S_E}: decaying exp
                  let d = '';
                  const N = 140;
                  for (let i = 0; i <= N; i++) {
                    const x = -230 + (i / N) * 460;
                    const xN = i / N;
                    const osc = Math.cos(xN * 8 * Math.PI - t * 1.2) * 100;
                    const dec = -Math.exp(-xN * 4) * 160 + 0;  // pulls upward (negative y is up)
                    const y = -(osc * (1 - morphT) + dec * morphT);
                    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
                  }
                  return <path d={d} fill="none" stroke={morphT < 0.5 ? 'var(--accent-red)' : 'var(--accent-green)'}
                    strokeWidth="3" />;
                })()}
                <text x="0" y="240" textAnchor="middle" fill="white" fontFamily="var(--font-math)" fontStyle="italic" fontSize="28">
                  {morphT < 0.5 ? (
                    <><tspan>e</tspan><tspan baselineShift="super" fontSize="18">iS</tspan></>
                  ) : (
                    <><tspan>e</tspan><tspan baselineShift="super" fontSize="18">−S<tspan baselineShift="sub" fontSize="12">E</tspan></tspan></>
                  )}
                </text>
              </g>

              {/* bounded-below annotation */}
              {t > 16 && (
                <text x="1360" y="920" textAnchor="middle" fill="var(--accent-green)" fontFamily="var(--font-ui)" fontSize="20"
                  opacity={Math.min(1, (t - 16) / 1.2)}>
                  Euclidean action — bounded below. A positive Boltzmann weight.
                </text>
              )}
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 9 ? <>Minkowski: <span style={{color:'var(--accent-red)'}}>e<sup>iS</sup></span> oscillates. No Monte Carlo can sample it.</> :
               t < 16 ? <>Rotate time into the imaginary axis…</> :
               'Osterwalder–Schrader guarantees we can rotate back.'}
            </div>

            {humorT > 0 && (
              <div style={{
                position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26,
                color: 'var(--canvas-dim)', opacity: humorT,
              }}>
                "We Euclideans solved the sign problem by not having one."
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 04 — Boltzmann Weight of Fields ════════
function Scene04({ start, end }) {
  return (
    <Scene start={start} end={end} label="04">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const leftT = clamp((t - 1) / 2, 0, 1);
        const rightT = clamp((t - 4) / 2, 0, 1);
        const linkT = clamp((t - 9) / 3, 0, 1);

        // Ising spins: up/down at each site
        const spins = [];
        for (let j = 0; j < 6; j++) for (let i = 0; i < 6; i++) {
          const seed = (i * 13 + j * 7 + Math.floor(t * 0.5)) % 3;
          spins.push({ i, j, up: seed !== 0 });
        }
        // Scalar field: continuous value at site, pulsing
        const field = [];
        for (let j = 0; j < 6; j++) for (let i = 0; i < 6; i++) {
          const v = Math.sin((i + j * 1.3) - t * 1.1);
          field.push({ i, j, v });
        }

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={4} title={'Boltzmann Weight'} />
            <SceneRefs refs={["kogut79","creutz83"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* LEFT — Ising lattice */}
              <g transform="translate(520, 560)" opacity={leftT}>
                <text x="0" y="-270" textAnchor="middle" fill="var(--accent-red)" fontFamily="var(--font-ui)" fontSize="22" fontWeight="700">STATISTICAL MECHANICS</text>
                {spins.map((s, k) => {
                  const x = -175 + s.i * 70;
                  const y = -175 + s.j * 70;
                  return (
                    <g key={k}>
                      <circle cx={x} cy={y} r="18" fill="none" stroke="var(--canvas-dim)" strokeWidth="1" opacity="0.3" />
                      <line x1={x} y1={y + (s.up ? 14 : -14)} x2={x} y2={y + (s.up ? -14 : 14)}
                        stroke={s.up ? 'var(--accent-red)' : 'var(--accent-blue)'} strokeWidth="3" markerEnd="url(#arrhead-up)" />
                    </g>
                  );
                })}
                <text x="0" y="270" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="18">Ising spins σ(n) ∈ {'{±1}'}</text>
              </g>

              {/* RIGHT — scalar field lattice */}
              <g transform="translate(1400, 560)" opacity={rightT}>
                <text x="0" y="-270" textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-ui)" fontSize="22" fontWeight="700">EUCLIDEAN QFT</text>
                {field.map((s, k) => {
                  const x = -175 + s.i * 70;
                  const y = -175 + s.j * 70;
                  const r = 4 + Math.abs(s.v) * 14;
                  return (
                    <g key={k}>
                      <circle cx={x} cy={y} r="18" fill="none" stroke="var(--canvas-dim)" strokeWidth="1" opacity="0.3" />
                      <circle cx={x} cy={y} r={r} fill="var(--accent)" opacity={0.55 + 0.35 * Math.abs(s.v)} />
                    </g>
                  );
                })}
                <text x="0" y="270" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="18">scalar field φ(n) ∈ ℝ</text>
              </g>

              {/* link arrow + "identical problem" */}
              {linkT > 0 && (
                <g transform="translate(960, 560)" opacity={linkT}>
                  <line x1="-160" y1="0" x2="160" y2="0" stroke="var(--accent-green)" strokeWidth="2.5" markerStart="url(#arrL4)" markerEnd="url(#arrR4)" />
                  <text x="0" y="-30" textAnchor="middle" fill="var(--accent-green)" fontFamily="var(--font-ui)" fontSize="18" letterSpacing="0.1em">IDENTICAL PROBLEM</text>
                </g>
              )}

              {/* common Z underneath */}
              {t > 13 && (
                <g transform="translate(960, 920)" opacity={Math.min(1, (t - 13) / 1.5)}>
                  <text x="0" y="0" textAnchor="middle" fill="white" fontFamily="var(--font-math)" fontStyle="italic" fontSize="38">
                    Z = <tspan>Σ</tspan><tspan baselineShift="sub" fontSize="16">{'{φ}'}</tspan>
                    <tspan fill="var(--accent-green)"> e<tspan baselineShift="super" fontSize="20">−S<tspan baselineShift="sub" fontSize="12">E</tspan>[φ]</tspan></tspan>
                  </text>
                </g>
              )}

              <defs>
                <marker id="arrhead-up" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
                </marker>
                <marker id="arrL4" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-green)" />
                </marker>
                <marker id="arrR4" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-green)" />
                </marker>
              </defs>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 9 ? 'Euclidean QFT looks like 4D classical statistical mechanics.' :
               'Metropolis can now visit the configurations that matter.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 05 — Correlators Encode the Spectrum ════════
function Scene05({ start, end }) {
  return (
    <Scene start={start} end={end} label="05">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const showInsert = clamp((t - 1) / 2, 0, 1);
        const showPlot = clamp((t - 9) / 2, 0, 1);
        const showSlope = clamp((t - 18) / 2, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={5} title={'Euclidean Correlator'} />
            <SceneRefs refs={["montvay","gattringer"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* LEFT: lattice with two insertions */}
              <g transform="translate(520, 560)" opacity={showInsert}>
                <Lattice2D ox={-220} oy={-220} cols={9} rows={9} spacing={55} color="var(--canvas-dim)" linkOp={0.3} siteR={2.5} siteOp={0.5} />
                {/* two insertions: left early, right late */}
                <circle cx={-165} cy="0" r="18" fill="var(--accent-yellow)" />
                <circle cx={165} cy="0" r="18" fill="var(--accent-yellow)" />
                <text x={-165} y="40" textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">φ(0)</text>
                <text x={165} y="40" textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">φ(t)</text>
                {/* time arrow */}
                <line x1={-220} y1={240} x2={220} y2={240} stroke="var(--canvas-dim)" strokeWidth="1" markerEnd="url(#arr5)" />
                <text x="0" y={268} textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="18">Euclidean time τ</text>
                {/* connecting "propagator" */}
                {t > 4 && (
                  <path d={`M ${-165},0 Q 0,${-80 - Math.sin(t*3)*10} 165,0`}
                    fill="none" stroke="var(--accent-yellow)" strokeWidth="2" strokeDasharray="5 5" opacity={Math.min(1,(t-4)/1)} />
                )}
              </g>

              {/* RIGHT: log-linear plot */}
              <g transform="translate(1380, 560)" opacity={showPlot}>
                <line x1="-240" y1="240" x2="240" y2="240" stroke="var(--canvas-dim)" strokeWidth="1" />
                <line x1="-240" y1="-240" x2="-240" y2="240" stroke="var(--canvas-dim)" strokeWidth="1" />
                <text x="250" y="246" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="20">τ</text>
                <text x="-246" y="-250" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="20">log G(τ)</text>
                {/* straight line */}
                {(() => {
                  // line from (-220, -180) to (220, 200); points along it with error bars
                  const pts = [];
                  for (let i = 0; i < 14; i++) {
                    const x = -220 + i * 32;
                    const y = -180 + (i / 13) * 380 + Math.sin(i * 1.7) * 7;
                    pts.push({ x, y });
                  }
                  return (
                    <>
                      <line x1={-220} y1={-180} x2={220} y2={200} stroke="var(--accent-green)" strokeWidth="2.5" />
                      {pts.map((p, i) => (
                        <g key={i}>
                          <line x1={p.x} y1={p.y - 12} x2={p.x} y2={p.y + 12} stroke="var(--accent)" strokeWidth="1.2" opacity="0.8" />
                          <circle cx={p.x} cy={p.y} r="3.5" fill="var(--accent)" />
                        </g>
                      ))}
                    </>
                  );
                })()}
                {showSlope > 0 && (
                  <g opacity={showSlope}>
                    <text x="0" y="-200" textAnchor="middle" fill="var(--accent-green)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="28">
                      slope = −E<tspan baselineShift="sub" fontSize="18">0</tspan>
                    </text>
                  </g>
                )}
              </g>

              <defs>
                <marker id="arr5" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--canvas-dim)" /></marker>
              </defs>
            </svg>

            {/* correlator equation */}
            {t > 13 && (
              <div style={{ position: 'absolute', top: 920, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 34, color: 'white',
                opacity: Math.min(1, (t - 13) / 1.2) }}>
                ⟨φ(0) φ(τ)⟩ <span style={{color:'var(--canvas-dim)'}}>~</span>{' '}
                <span style={{color:'var(--accent-green)'}}>e<sup style={{fontSize:'0.55em', fontStyle:'italic'}}>−E₀τ</sup></span>
                {' '}for large τ
              </div>
            )}

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 9 ? 'Insert a field at two times. Average over configurations.' :
               t < 18 ? 'At large separation the correlator decays exponentially…' :
               'The spectrum is the slope of a log-linear plot.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

Object.assign(window, { SCENES, SCENE_BOUNDS, TITLE_END, TOTAL_DUR, TitleCard, Scene01, Scene02, Scene03, Scene04, Scene05 });
