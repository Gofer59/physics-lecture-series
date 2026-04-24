// lqcd-scenes-c.jsx — Scenes 11-15

// ════════ SCENE 11 — Continuum Limit = Critical Point ════════
function Scene11({ start, end }) {
  return (
    <Scene start={start} end={end} label="11">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const zoomT = clamp((t - 10) / 8, 0, 1);
        const zoom = 1 + zoomT * 4;

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={11} title={'Continuum Limit = Critical Point'} />
            <SceneRefs refs={["wilsonRG","kogut79"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* zooming lattice: more sites appear as we zoom */}
              <g transform={`translate(960, 560) scale(${zoom})`}>
                {(() => {
                  // draw a lattice of 30x20 sites; we only see a portion at each zoom
                  const sp = 16;
                  const cols = 50, rows = 32;
                  const ox = -(cols - 1) * sp / 2;
                  const oy = -(rows - 1) * sp / 2;
                  // correlation-length blob: highlight cluster of linked sites
                  const xiPix = 60 / zoom; // shrinking visual xi (in world units scaling)
                  return (
                    <>
                      <Lattice2D ox={ox} oy={oy} cols={cols} rows={rows} spacing={sp}
                        color="var(--accent)" linkOp={0.25} siteR={1.4 / zoom} siteOp={0.7} linkW={0.6 / zoom} />
                      {/* correlation blob */}
                      <circle cx="0" cy="0" r={xiPix} fill="var(--accent-green)" opacity="0.15" />
                      <circle cx="0" cy="0" r={xiPix} fill="none" stroke="var(--accent-green)" strokeWidth={1.8 / zoom} strokeDasharray={`${4 / zoom} ${4 / zoom}`} />
                    </>
                  );
                })()}
              </g>
              <text x="960" y="890" textAnchor="middle" fill="var(--accent-green)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="26">
                ξ / a → ∞
              </text>
              <text x="960" y="930" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="18">
                correlation length in lattice units diverges
              </text>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 10 ? 'Take a → 0 at fixed physical mass.' :
               t < 20 ? 'Physical correlation length, in lattice units, must diverge.' :
               'Continuum physics lives at a critical point of statistical mechanics.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 12 — Asymptotic Freedom ════════
function Scene12({ start, end }) {
  return (
    <Scene start={start} end={end} label="12">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        // Plot β(g) vs g: a negative curve for g>0, with β<0 meaning coupling runs to 0 at high E
        const showPlot = clamp((t - 2) / 2, 0, 1);
        const showArrow = clamp((t - 8) / 2, 0, 1);
        const showFormula = clamp((t - 16) / 3, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={12} title={'Asymptotic Freedom'} />
            <SceneRefs refs={["wilson74","rothe"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* β-function plot */}
              <g transform="translate(960, 540)">
                <line x1="-420" y1="0" x2="420" y2="0" stroke="var(--canvas-dim)" strokeWidth="1" />
                <line x1="0" y1="-260" x2="0" y2="260" stroke="var(--canvas-dim)" strokeWidth="1" />
                <text x="430" y="6" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">g</text>
                <text x="10" y="-260" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">β(g)</text>

                {showPlot > 0 && (() => {
                  let d = '';
                  const N = 120;
                  for (let i = 0; i <= N * showPlot; i++) {
                    const xN = (i / N) * 2.5; // g from 0..2.5
                    const beta = -xN * xN * xN * 0.18; // negative cubic
                    const px = xN * 160;
                    const py = -beta * 40;
                    d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
                  }
                  return <path d={d} fill="none" stroke="var(--accent)" strokeWidth="3" />;
                })()}

                {/* flow arrows along the axis — toward origin (high E) */}
                {showArrow > 0 && [0.5, 1.2, 1.9].map((g0, k) => {
                  const op = Math.min(1, (t - 8 - k * 0.4) / 0.8);
                  if (op <= 0) return null;
                  const from = g0 * 160;
                  const phase = ((t * 0.4 + k * 0.33) % 1);
                  const cur = from * (1 - phase);
                  return (
                    <g key={k} opacity={op * 0.7}>
                      <circle cx={cur} cy="0" r="5" fill="var(--accent-green)" />
                    </g>
                  );
                })}
                <text x="80" y="-30" fill="var(--accent-green)" fontFamily="var(--font-ui)" fontSize="16" opacity={showArrow}>high E ←</text>
                <text x="380" y="-30" fill="var(--accent-red)" fontFamily="var(--font-ui)" fontSize="16" textAnchor="end" opacity={showArrow}>→ low E</text>
              </g>

              {showFormula > 0 && (
                <g transform="translate(960, 900)" opacity={showFormula}>
                  <text x="0" y="0" textAnchor="middle" fill="white" fontFamily="var(--font-math)" fontStyle="italic" fontSize="32">
                    β(g) = −b₀ g³ + O(g⁵),    b₀ {'>'} 0
                  </text>
                  <text x="0" y="50" textAnchor="middle" fill="var(--accent-green)" fontFamily="var(--font-ui)" fontSize="20">
                    a → 0  means  g → 0
                  </text>
                </g>
              )}
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 8 ? 'The bare coupling has a negative beta function.' :
               t < 16 ? 'Flow toward g = 0 at short distances. Free in the UV.' :
               'Gross, Politzer, Wilczek. 1973. QCD is safe on the lattice.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 13 — RG Block Spin ════════
function Scene13({ start, end }) {
  return (
    <Scene start={start} end={end} label="13">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const stage = t < 9 ? 0 : t < 18 ? 1 : 2;
        const stageT = t < 9 ? clamp((t - 2) / 4, 0, 1)
                     : t < 18 ? clamp((t - 9) / 4, 0, 1)
                     : clamp((t - 18) / 4, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={13} title={'Block-Spin RG'} />
            <SceneRefs refs={["wilsonRG","kogut79"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              <g transform="translate(960, 560)">
                {/* three lattices side-by-side: fine, medium, coarse */}
                {[
                  { ox: -680, label: 'a', sp: 24, cols: 17 },
                  { ox:    0, label: '2a', sp: 48, cols: 9 },
                  { ox:  680, label: '4a', sp: 96, cols: 5 },
                ].map((L, i) => {
                  const op = i <= stage ? 1 : (stage + 1 === i ? stageT : 0);
                  const oy = -(L.cols - 1) * L.sp / 2;
                  return (
                    <g key={i} transform={`translate(${L.ox}, 0)`} opacity={op}>
                      <Lattice2D ox={-(L.cols-1)*L.sp/2} oy={oy} cols={L.cols} rows={L.cols} spacing={L.sp}
                        color="var(--accent)" linkOp={0.35} siteR={3} />
                      <text x="0" y="260" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">
                        spacing {L.label}
                      </text>
                    </g>
                  );
                })}

                {/* arrows between */}
                {[0, 1].map(i => {
                  if (stage < i + 1) return null;
                  const op = stage === i + 1 ? stageT : 1;
                  const cx = -340 + i * 680;
                  return (
                    <g key={i} opacity={op}>
                      <line x1={cx - 60} y1="0" x2={cx + 60} y2="0" stroke="var(--accent-yellow)" strokeWidth="2.5" markerEnd="url(#arr13)" />
                      <text x={cx} y="-20" textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-ui)" fontSize="16" letterSpacing="0.15em">BLOCK</text>
                    </g>
                  );
                })}
              </g>
              <defs>
                <marker id="arr13" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-yellow)" />
                </marker>
              </defs>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 9 ? 'Average neighboring sites into a block spin.' :
               t < 18 ? 'Repeat. The spacing doubles, the physics must not change.' :
               'The couplings flow. The lattice is not just a regulator — it is the theory.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 14 — Symanzik Improvement ════════
function Scene14({ start, end }) {
  return (
    <Scene start={start} end={end} label="14">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const showPlot = clamp((t - 2) / 3, 0, 1);
        const showImproved = clamp((t - 12) / 3, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={14} title={'Symanzik Improvement'} />
            <SceneRefs refs={["symanzik","luscher"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              <g transform="translate(960, 560)">
                <line x1="-420" y1="260" x2="420" y2="260" stroke="var(--canvas-dim)" strokeWidth="1" />
                <line x1="-420" y1="-260" x2="-420" y2="260" stroke="var(--canvas-dim)" strokeWidth="1" />
                <text x="430" y="266" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">a²</text>
                <text x="-430" y="-270" textAnchor="end" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">observable − continuum</text>
                <line x1="-420" y1="-100" x2="420" y2="-100" stroke="var(--accent-green)" strokeWidth="1" strokeDasharray="4 5" opacity="0.5" />
                <text x="420" y="-106" textAnchor="end" fill="var(--accent-green)" fontFamily="var(--font-ui)" fontSize="14">continuum</text>

                {/* Unimproved: linear approach from some way up */}
                {showPlot > 0 && (() => {
                  let d = '';
                  const N = 20;
                  for (let i = 0; i <= N * showPlot; i++) {
                    const xN = i / N;
                    const px = -420 + xN * 840;
                    const err = (1 - xN) * 200 + Math.sin(i * 0.9) * 8; // linear
                    const py = -100 - err;
                    d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
                  }
                  return <path d={d} fill="none" stroke="var(--accent-red)" strokeWidth="3" />;
                })()}
                <text x="-400" y="-340" fill="var(--accent-red)" fontFamily="var(--font-ui)" fontSize="18" opacity={showPlot}>unimproved: O(a)</text>

                {/* Improved: quadratic approach (closer to 0 faster at small a²) */}
                {showImproved > 0 && (() => {
                  let d = '';
                  const N = 20;
                  for (let i = 0; i <= N * showImproved; i++) {
                    const xN = i / N;
                    const px = -420 + xN * 840;
                    const err = Math.pow(1 - xN, 2) * 70 + Math.sin(i * 0.9) * 6;
                    const py = -100 - err;
                    d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
                  }
                  return <path d={d} fill="none" stroke="var(--accent-yellow)" strokeWidth="3" />;
                })()}
                {showImproved > 0 && <text x="-400" y="-300" fill="var(--accent-yellow)" fontFamily="var(--font-ui)" fontSize="18" opacity={showImproved}>improved: O(a²)</text>}
              </g>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 12 ? 'Naive discretization leaves O(a) errors.' :
               'Add tuned higher-derivative terms; reach the continuum faster.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 15 — Finite Volume & PBC ════════
function Scene15({ start, end }) {
  return (
    <Scene start={start} end={end} label="15">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        // Show lattice folding into a torus (pacman-style: wraparound arrows)
        const wrapT = clamp((t - 3) / 4, 0, 1);
        const flashT = clamp((t - 12) / 3, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={15} title={'Finite Volume · Periodic BC'} />
            <SceneRefs refs={["montvay","gattringer"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              <g transform="translate(960, 560)">
                <Lattice2D ox={-240} oy={-240} cols={11} rows={11} spacing={48} color="var(--accent)" linkOp={0.3} siteR={3} />
                {/* box border */}
                <rect x="-260" y="-260" width="520" height="520" fill="none" stroke="var(--canvas-dim)" strokeWidth="1.2" />

                {/* wraparound arrows: right ↔ left, top ↔ bottom */}
                {wrapT > 0 && (
                  <g opacity={wrapT}>
                    <path d={`M 260,0 C 420,-90 420,90 260,0`} fill="none" stroke="var(--accent-yellow)" strokeWidth="2" strokeDasharray="6 6"
                      transform="translate(0,0)" />
                    <text x="420" y="6" textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-ui)" fontSize="16">
                      n+L = n
                    </text>
                    {/* arrow exiting right and entering left */}
                    <line x1="280" y1="-40" x2="350" y2="-40" stroke="var(--accent-yellow)" strokeWidth="2" markerEnd="url(#arr15)" />
                    <line x1="-350" y1="-40" x2="-280" y2="-40" stroke="var(--accent-yellow)" strokeWidth="2" markerEnd="url(#arr15)" />
                    <line x1="-40" y1="280" x2="-40" y2="350" stroke="var(--accent-yellow)" strokeWidth="2" markerEnd="url(#arr15)" />
                    <line x1="-40" y1="-350" x2="-40" y2="-280" stroke="var(--accent-yellow)" strokeWidth="2" markerEnd="url(#arr15)" />
                  </g>
                )}

                {/* wave traveling a particle that wraps around */}
                {flashT > 0 && (() => {
                  const phase = (t * 0.6) % 1;
                  const x = -240 + phase * 480;
                  return (
                    <circle cx={x} cy="0" r="8" fill="var(--accent-green)" opacity={flashT} />
                  );
                })()}
              </g>

              <defs>
                <marker id="arr15" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-yellow)" />
                </marker>
              </defs>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 12 ? 'Finite box. Periodic boundary conditions close spacetime into a torus.' :
               'Finite-size effects shrink as e⁻ᵐᴸ. Take L large — not infinite.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

Object.assign(window, { Scene11, Scene12, Scene13, Scene14, Scene15 });
