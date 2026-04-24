// lqcd-scenes-d.jsx — Scenes 16-20

// ════════ SCENE 16 — Two Key Equations ════════
function Scene16({ start, end }) {
  return (
    <Scene start={start} end={end} label="16">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const eq1T = clamp((t - 1) / 2, 0, 1);
        const eq2T = clamp((t - 8) / 2, 0, 1);
        const bondT = clamp((t - 18) / 2, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={16} title={'Two Equations'} />
            <SceneRefs refs={["montvay","gattringer"]} />

            {/* Equation 1 — Path integral */}
            <div style={{ position: 'absolute', top: 320, left: 0, right: 0, textAlign: 'center',
              opacity: eq1T }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent-green)', marginBottom: 16 }}>
                Partition Function
              </div>
              <div style={{ fontFamily: 'var(--font-math)', fontSize: 56, color: 'white', fontStyle: 'italic' }}>
                Z = ∫ 𝒟φ  e<sup style={{fontSize:'0.55em'}}>−S<sub style={{fontSize:'0.7em'}}>E</sub>[φ]</sup>
              </div>
            </div>

            {/* Equation 2 — Expectation */}
            <div style={{ position: 'absolute', top: 580, left: 0, right: 0, textAlign: 'center',
              opacity: eq2T }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'var(--accent-yellow)', marginBottom: 16 }}>
                Observables
              </div>
              <div style={{ fontFamily: 'var(--font-math)', fontSize: 56, color: 'white', fontStyle: 'italic' }}>
                ⟨𝒪⟩ = (1/Z) ∫ 𝒟φ  𝒪[φ]  e<sup style={{fontSize:'0.55em'}}>−S<sub style={{fontSize:'0.7em'}}>E</sub>[φ]</sup>
              </div>
            </div>

            {/* bond: "every lattice calculation" */}
            <div style={{
              position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
              color: 'var(--canvas-dim)', opacity: bondT,
            }}>
              Every lattice calculation is one of these two integrals.
            </div>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              Two equations. The rest is mechanics.
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 17 — Importance Sampling ════════
function Scene17({ start, end }) {
  return (
    <Scene start={start} end={end} label="17">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        // Visualize: a weight landscape (2D contour), with a few walkers sampling it
        const walkers = [];
        const NW = 24;
        for (let k = 0; k < NW; k++) {
          const seed = k * 0.53;
          // walker target: gaussian around (0,0); walk slightly
          const phase = t * 0.4 + seed;
          const rx = Math.cos(phase * (1 + seed)) * (120 + 20 * Math.sin(phase * 0.7)) * Math.exp(-seed * 0.05);
          const ry = Math.sin(phase * (1.1 + seed * 0.3)) * (80 + 15 * Math.cos(phase));
          walkers.push({ x: rx, y: ry });
        }
        const showWalkers = clamp((t - 3) / 2, 0, 1);
        const showFrac = clamp((t - 14) / 3, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={17} title={'Importance Sampling'} />
            <SceneRefs refs={["creutz83","montvay"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              <g transform="translate(960, 560)">
                {/* contour rings */}
                {[220, 180, 140, 100, 60].map((r, i) => (
                  <ellipse key={i} cx="0" cy="0" rx={r * 1.3} ry={r} fill="none"
                    stroke="var(--accent)" strokeWidth="1" opacity={0.15 + i * 0.07} />
                ))}
                {/* "all configurations" wide faint box */}
                <rect x="-500" y="-300" width="1000" height="600" fill="none" stroke="var(--canvas-dim)" strokeWidth="1" strokeDasharray="4 5" opacity="0.5" />
                <text x="-490" y="-310" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="15">configuration space</text>

                {/* walkers */}
                {walkers.map((w, k) => (
                  <circle key={k} cx={w.x} cy={w.y} r="5" fill="var(--accent-green)" opacity={showWalkers * 0.85} />
                ))}
              </g>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 8 ? 'The weight e⁻ˢ peaks sharply. Most configurations contribute nothing.' :
               t < 18 ? 'Don\'t integrate — sample. Markov chains visit the typical set.' :
               'Lecture 2 builds the Metropolis algorithm that does this.'}
            </div>

            {showFrac > 0 && (
              <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 28, color: 'var(--accent-yellow)',
                opacity: showFrac }}>
                ⟨𝒪⟩ ≈ (1/N) Σ<sub style={{fontSize:'0.6em'}}>i=1</sub><sup style={{fontSize:'0.6em'}}>N</sup> 𝒪[φ<sub>i</sub>]
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 18 — Anisotropic Lattice ════════
function Scene18({ start, end }) {
  return (
    <Scene start={start} end={end} label="18">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const stretchT = clamp((t - 3) / 4, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={18} title={'Anisotropic Lattice'} />
            <SceneRefs refs={["rothe","montvay"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              <g transform="translate(960, 540)">
                {/* horizontal = space, vertical = time. Stretch time axis (space between rows shrinks) */}
                {(() => {
                  const cols = 11, rows = 11;
                  const sx = 50;
                  const sy = sx - stretchT * 30; // shrink time spacing
                  const ox = -(cols - 1) * sx / 2;
                  const oy = -(rows - 1) * sy / 2;
                  const sites = [];
                  const links = [];
                  for (let j = 0; j < rows; j++) {
                    for (let i = 0; i < cols; i++) {
                      const x = ox + i * sx;
                      const y = oy + j * sy;
                      sites.push(<circle key={`s-${i}-${j}`} cx={x} cy={y} r={3} fill="var(--accent)" />);
                      if (i < cols - 1) links.push(<line key={`lh-${i}-${j}`} x1={x} y1={y} x2={x + sx} y2={y} stroke="var(--accent)" strokeWidth={1} opacity={0.3} />);
                      if (j < rows - 1) links.push(<line key={`lv-${i}-${j}`} x1={x} y1={y} x2={x} y2={y + sy} stroke="var(--accent)" strokeWidth={1} opacity={0.3} />);
                    }
                  }
                  return <g>{links}{sites}</g>;
                })()}
                {/* overlay finer time axis (arrow showing time-spacing is smaller) */}
                {stretchT > 0 && (
                  <g opacity={stretchT}>
                    <line x1="300" y1="-260" x2="300" y2="260" stroke="var(--accent-yellow)" strokeWidth="1.2" strokeDasharray="3 3" />
                    <text x="320" y="0" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">aₜ ≪ aₛ</text>
                    {/* arrow marking shorter spacing */}
                    <line x1="-360" y1="-180" x2="-360" y2="-120" stroke="var(--accent-yellow)" strokeWidth="1.2" markerStart="url(#barA18)" markerEnd="url(#barA18)" />
                    <text x="-380" y="-146" textAnchor="end" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="18">aₜ</text>
                    <line x1="-360" y1="200" x2="-300" y2="200" stroke="var(--accent)" strokeWidth="1.2" markerStart="url(#barA18s)" markerEnd="url(#barA18s)" />
                    <text x="-330" y="228" textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="18">aₛ</text>
                  </g>
                )}
                <text x="0" y="320" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="18">space →</text>
                <text x="-320" y="-290" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="18">time ↑</text>
              </g>
              <defs>
                <marker id="barA18" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M0,5 L10,0 L10,10 z" fill="var(--accent-yellow)" /></marker>
                <marker id="barA18s" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M0,5 L10,0 L10,10 z" fill="var(--accent)" /></marker>
              </defs>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 12 ? 'Shrink the time spacing. Keep the spatial spacing.' :
               'Finer resolution in τ — essential for glueballs and excited-state fits.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 19 — What We Built ════════
function Scene19({ start, end }) {
  return (
    <Scene start={start} end={end} label="19">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const items = [
          { at: 1,  label: 'Euclidean time',           ref: 'scene 03' },
          { at: 4,  label: 'Hypercubic lattice',       ref: 'scene 02' },
          { at: 7,  label: 'Boltzmann weight e⁻ˢᴱ',    ref: 'scene 04' },
          { at: 10, label: 'Correlators → spectrum',   ref: 'scene 05' },
          { at: 13, label: 'Transfer matrix & positivity', ref: 'scenes 08-09' },
          { at: 16, label: 'Continuum ↔ critical point', ref: 'scene 11' },
          { at: 19, label: 'Asymptotic freedom',       ref: 'scene 12' },
          { at: 22, label: 'Improvement & finite volume', ref: 'scenes 14-15' },
        ];

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={19} title={'What We Built'} />

            <div style={{
              position: 'absolute', top: 240, left: 0, right: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
            }}>
              {items.map((it, k) => {
                const op = clamp((t - it.at) / 0.8, 0, 1);
                return (
                  <div key={k} style={{
                    opacity: op,
                    transform: `translateY(${(1 - op) * 12}px)`,
                    display: 'flex', alignItems: 'baseline', gap: 28,
                    fontFamily: 'var(--font-display)',
                    fontSize: 34, color: 'white',
                    width: 1200,
                  }}>
                    <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 24, width: 42, textAlign: 'right' }}>
                      {String(k + 1).padStart(2, '·')}
                    </span>
                    <span style={{ flex: 1 }}>{it.label}</span>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--canvas-dim)',
                      letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                      {it.ref}
                    </span>
                  </div>
                );
              })}
            </div>

            {t > 26 && (
              <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30,
                color: 'var(--accent-green)', opacity: clamp((t - 26) / 1, 0, 1) }}>
                None of this has used QCD yet.
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 20 — Next: Gauge Fields ════════
function Scene20({ start, end }) {
  return (
    <Scene start={start} end={end} label="20">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const showLinks = clamp((t - 3) / 3, 0, 1);
        const showWilson = clamp((t - 12) / 3, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={20} title={'Next: SU(3) on Links'} />
            <SceneRefs refs={["wilson74","gattringer"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              <g transform="translate(960, 560)">
                {/* lattice */}
                {(() => {
                  const cols = 7, rows = 7, sp = 100;
                  const ox = -(cols - 1) * sp / 2;
                  const oy = -(rows - 1) * sp / 2;
                  return (
                    <>
                      {/* sites */}
                      {Array.from({length: cols}).flatMap((_, i) =>
                        Array.from({length: rows}).map((_, j) => (
                          <circle key={`s-${i}-${j}`} cx={ox + i * sp} cy={oy + j * sp} r="5" fill="var(--accent)" />
                        ))
                      )}
                      {/* links — animated as little arrows (U matrices) */}
                      {Array.from({length: cols}).flatMap((_, i) =>
                        Array.from({length: rows}).flatMap((_, j) => {
                          const g = [];
                          if (i < cols - 1) {
                            const op = Math.min(1, showLinks * (1 - (i + j) / (cols + rows)));
                            const phase = Math.sin(t * 0.8 + i * 0.5 + j * 0.3);
                            const color = phase > 0 ? 'var(--accent-yellow)' : 'var(--accent-green)';
                            g.push(<line key={`lh-${i}-${j}`} x1={ox + i * sp + 10} y1={oy + j * sp} x2={ox + (i + 1) * sp - 10} y2={oy + j * sp}
                              stroke={color} strokeWidth="2.2" opacity={op * 0.8} markerEnd="url(#arrU20)" />);
                          }
                          if (j < rows - 1) {
                            const op = Math.min(1, showLinks * (1 - (i + j) / (cols + rows)));
                            const phase = Math.cos(t * 0.8 + i * 0.2 + j * 0.5);
                            const color = phase > 0 ? 'var(--accent-yellow)' : 'var(--accent-green)';
                            g.push(<line key={`lv-${i}-${j}`} x1={ox + i * sp} y1={oy + j * sp + 10} x2={ox + i * sp} y2={oy + (j + 1) * sp - 10}
                              stroke={color} strokeWidth="2.2" opacity={op * 0.8} markerEnd="url(#arrU20)" />);
                          }
                          return g;
                        })
                      )}
                    </>
                  );
                })()}

                {/* highlighted plaquette (Wilson loop) */}
                {showWilson > 0 && (() => {
                  const sp = 100;
                  const cx = 0, cy = 0;
                  return (
                    <g opacity={showWilson}>
                      <rect x={cx - sp / 2} y={cy - sp / 2} width={sp} height={sp}
                        fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="3" />
                      <text x={cx} y={cy + 6} textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="24">
                        U□
                      </text>
                    </g>
                  );
                })()}
              </g>

              <defs>
                <marker id="arrU20" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
                </marker>
              </defs>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 12 ? 'Next lecture: paint the links with SU(3) matrices.' :
               'Wilson action. Plaquettes. Gauge invariance built in from the start.'}
            </div>

            {t > 20 && (
              <div style={{ position: 'absolute', bottom: 170, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, color: 'var(--accent)',
                opacity: clamp((t - 20) / 1, 0, 1), letterSpacing: '0.05em' }}>
                End · Lecture 1
              </div>
            )}
            {t > 22 && (
              <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--canvas-dim)',
                letterSpacing: '0.3em', textTransform: 'uppercase',
                opacity: clamp((t - 22) / 1, 0, 1) }}>
                Physics Study Reference · LQCD 01
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

Object.assign(window, { Scene16, Scene17, Scene18, Scene19, Scene20 });
