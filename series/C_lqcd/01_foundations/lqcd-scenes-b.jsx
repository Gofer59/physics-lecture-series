// lqcd-scenes-b.jsx — Scenes 6-10

// ════════ SCENE 06 — Discretizing a Scalar Field ════════
function Scene06({ start, end }) {
  return (
    <Scene start={start} end={end} label="06">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const morphT = clamp((t - 4) / 4, 0, 1);
        const highlight = clamp((t - 12) / 2, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={6} title={'Discrete Action'} />
            <SceneRefs refs={["rothe","gattringer"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* Show a 1D slice of field φ at sites, and the finite difference */}
              <g transform="translate(960, 620)">
                {Array.from({length: 11}).map((_, i) => {
                  const x = -500 + i * 100;
                  const v = Math.sin((i - 5) * 0.7 + t * 0.3) * 80;
                  return (
                    <g key={i}>
                      <circle cx={x} cy="0" r="4" fill="var(--accent)" />
                      <text x={x} y="30" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="16">n{i===5?'':(i<5?'−'+(5-i):'+'+(i-5))}</text>
                      <circle cx={x} cy={-v} r="6" fill="var(--accent)" />
                      <line x1={x} y1="0" x2={x} y2={-v} stroke="var(--accent)" strokeWidth="1.2" opacity="0.4" />
                      {i > 0 && (
                        <line x1={-500 + (i-1)*100} y1={-Math.sin((i-6)*0.7 + t*0.3)*80}
                              x2={x} y2={-v}
                              stroke={i >= 5 && i <= 6 && highlight > 0 ? 'var(--accent-yellow)' : 'var(--accent)'}
                              strokeWidth={i >= 5 && i <= 6 && highlight > 0 ? 3 : 1.4}
                              opacity={i >= 5 && i <= 6 && highlight > 0 ? highlight : 0.6} />
                      )}
                    </g>
                  );
                })}
                <line x1="-550" y1="0" x2="550" y2="0" stroke="var(--canvas-dim)" strokeWidth="1" opacity="0.4" />
              </g>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 12 ? 'Replace derivatives with finite differences.' :
               'The nearest-neighbor term is what couples the lattice together.'}
            </div>

            <div style={{ position: 'absolute', top: 860, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 30, color: 'white' }}>
              S<sub style={{fontSize:'0.7em'}}>E</sub> = a<sup>4</sup> Σ<sub style={{fontSize:'0.6em'}}>n</sub> [
              <span style={{color: morphT > 0.5 ? 'var(--accent-yellow)' : 'white'}}>
                ½ Σ<sub style={{fontSize:'0.6em'}}>μ</sub> (∂<sub style={{fontSize:'0.6em'}}>μ</sub><sup>lat</sup>φ)²
              </span>
              {' + ½ m²φ² + V(φ) ]'}
            </div>
            <div style={{ position: 'absolute', top: 920, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 22, color: 'var(--canvas-dim)',
              opacity: morphT }}>
              ∂<sub>μ</sub><sup>lat</sup>φ(n) = [φ(n+μ̂) − φ(n)] / a
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 07 — Lattice Propagator / BZ ════════
function Scene07({ start, end }) {
  return (
    <Scene start={start} end={end} label="07">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const showBZ = clamp((t - 1) / 2, 0, 1);
        const showCurve = clamp((t - 6) / 3, 0, 1);
        const showCmp = clamp((t - 16) / 3, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={7} title={'Brillouin Zone'} />
            <SceneRefs refs={["rothe","gattringer"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* BZ box */}
              <g transform="translate(960, 560)" opacity={showBZ}>
                <rect x="-450" y="-260" width="900" height="520" fill="none" stroke="var(--canvas-dim)" strokeWidth="1" />
                <text x={-450} y={290} fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">−π/a</text>
                <text x={450} y={290} fill="var(--canvas-dim)" textAnchor="end" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">+π/a</text>
                <text x={0} y={290} fill="var(--canvas-dim)" textAnchor="middle" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">momentum p</text>
                <text x={-470} y={-260} fill="var(--canvas-dim)" textAnchor="end" fontFamily="var(--font-math)" fontStyle="italic" fontSize="20">p̂²</text>

                {/* lattice propagator: p̂² = (2/a)² sin²(pa/2). Plot as curve. */}
                {showCurve > 0 && (() => {
                  let d = '';
                  const N = 160;
                  for (let i = 0; i <= N * showCurve; i++) {
                    const xN = -Math.PI + (i / N) * 2 * Math.PI;
                    const val = 4 * Math.sin(xN / 2) ** 2; // 0..4
                    const px = (xN / Math.PI) * 450;
                    const py = 220 - val * 110;
                    d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
                  }
                  return <path d={d} fill="none" stroke="var(--accent)" strokeWidth="3" />;
                })()}

                {/* Comparison with continuum p^2 (parabola) */}
                {showCmp > 0 && (() => {
                  let d = '';
                  const N = 80;
                  for (let i = 0; i <= N; i++) {
                    const xN = -Math.PI + (i / N) * 2 * Math.PI;
                    const val = xN * xN; // 0..π² ≈ 9.87
                    const clip = Math.min(val, 4.3);
                    const px = (xN / Math.PI) * 450;
                    const py = 220 - clip * 110;
                    d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
                  }
                  return <path d={d} fill="none" stroke="var(--accent-green)" strokeWidth="2.5" strokeDasharray="6 5" opacity={showCmp} />;
                })()}
                {showCmp > 0 && (
                  <>
                    <text x="470" y="-230" fill="var(--accent-green)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="20" opacity={showCmp}>continuum p²</text>
                    <text x="470" y="-190" fill="var(--accent)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="20" opacity={showCmp}>lattice p̂²</text>
                  </>
                )}
              </g>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 6 ? 'Momentum lives in a torus — the Brillouin zone.' :
               t < 16 ? <>Propagator: <span style={{fontStyle:'italic', fontFamily:'var(--font-math)'}}>p̂² = (2/a)² sin²(pa/2)</span></> :
               'Agrees with the continuum at small pa. Deviates at the zone edge.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 08 — Transfer Matrix ════════
function Scene08({ start, end }) {
  return (
    <Scene start={start} end={end} label="08">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const slicesT = clamp((t - 1) / 3, 0, 1);
        const ZT = clamp((t - 10) / 3, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={8} title={'Transfer Matrix'} />
            <SceneRefs refs={["osterwalder","montvay"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* 5 time slices, each a row of 5 sites. Highlight 2 adjacent slices. */}
              <g transform="translate(960, 580)">
                {[0,1,2,3,4].map(k => {
                  const x = -480 + k * 240;
                  const op = slicesT > k * 0.15 ? 1 : 0;
                  const ghost = k === 2 || k === 3;
                  return (
                    <g key={k} opacity={op}>
                      {[0,1,2,3,4].map(j => {
                        const y = -180 + j * 90;
                        return <circle key={j} cx={x} cy={y} r="5"
                          fill={ghost && ZT > 0 ? 'var(--accent-yellow)' : 'var(--accent)'} />;
                      })}
                      {/* vertical spine */}
                      <line x1={x} y1="-200" x2={x} y2="200" stroke={ghost && ZT > 0 ? 'var(--accent-yellow)' : 'var(--accent)'} strokeWidth={ghost && ZT > 0 ? 2 : 1} opacity="0.4" />
                      <text x={x} y="250" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="18">t{k}</text>
                    </g>
                  );
                })}

                {/* T arrows between slices */}
                {t > 6 && [0,1,2,3].map(k => {
                  const x1 = -480 + k * 240 + 20;
                  const x2 = -480 + (k + 1) * 240 - 20;
                  const op = Math.min(1, (t - 6 - k * 0.3) / 0.6);
                  if (op <= 0) return null;
                  return (
                    <g key={k} opacity={op}>
                      <line x1={x1} y1="0" x2={x2} y2="0" stroke="var(--accent-blue)" strokeWidth="2" markerEnd="url(#arrT8)" />
                      <text x={(x1+x2)/2} y="-16" textAnchor="middle" fill="var(--accent-blue)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="20">T̂</text>
                    </g>
                  );
                })}
              </g>

              <defs>
                <marker id="arrT8" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-blue)" />
                </marker>
              </defs>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 10 ? 'One time slice to the next — an operator T̂.' :
               'Z = Tr T̂ᴺ. Hamiltonian mechanics hides inside the path integral.'}
            </div>

            <div style={{ position: 'absolute', bottom: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 34, color: 'white' }}>
              T̂ = e<sup style={{fontSize:'0.6em', fontStyle:'italic'}}>−aĤ</sup>
              {t > 15 && <span style={{color:'var(--accent-green)', opacity: Math.min(1,(t-15)/1)}}>   ⇒   Ĥ positive</span>}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 09 — Reflection Positivity ════════
function Scene09({ start, end }) {
  return (
    <Scene start={start} end={end} label="09">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const reflectT = clamp((t - 3) / 4, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={9} title={'Reflection Positivity'} />
            <SceneRefs refs={["osterwalder","montvay"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              <g transform="translate(960, 560)">
                {/* mirror plane */}
                <line x1="0" y1="-240" x2="0" y2="240" stroke="var(--accent-yellow)" strokeWidth="2" strokeDasharray="6 5" />
                <text x="0" y="-260" textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="20">τ = 0</text>

                {/* right side: function F(τ>0) */}
                {(() => {
                  let d = '';
                  const N = 80;
                  for (let i = 0; i <= N; i++) {
                    const xN = i / N;
                    const x = xN * 400;
                    const y = -Math.exp(-xN * 2) * 180 + Math.sin(xN * 6 + t) * 12;
                    d += (i === 0 ? 'M' : 'L') + x + ',' + y + ' ';
                  }
                  return <path d={d} fill="none" stroke="var(--accent)" strokeWidth="3" />;
                })()}
                <text x="200" y="40" fill="var(--accent)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="24">F(τ)</text>

                {/* left side: reflected = ΘF appears */}
                {reflectT > 0 && (() => {
                  let d = '';
                  const N = 80;
                  for (let i = 0; i <= N * reflectT; i++) {
                    const xN = i / N;
                    const x = -xN * 400;
                    const y = -Math.exp(-xN * 2) * 180 + Math.sin(xN * 6 + t) * 12;
                    d += (i === 0 ? 'M' : 'L') + x + ',' + y + ' ';
                  }
                  return <path d={d} fill="none" stroke="var(--accent-green)" strokeWidth="3" />;
                })()}
                {reflectT > 0.3 && <text x="-200" y="40" textAnchor="end" fill="var(--accent-green)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="24" opacity={reflectT}>Θ F(−τ)</text>}
              </g>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 10 ? 'Reflect through τ = 0. Pair F with its reflection.' :
               'If ⟨ΘF · F⟩ ≥ 0 always, a genuine Hilbert space exists.'}
            </div>

            <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 32, color: 'white' }}>
              ⟨(ΘF) F⟩ ≥ 0   <span style={{color:'var(--accent-green)'}}>⇒</span>   ℋ, Ĥ, unitary dynamics
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// ════════ SCENE 10 — Mass Gap ════════
function Scene10({ start, end }) {
  return (
    <Scene start={start} end={end} label="10">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const fitT = clamp((t - 10) / 4, 0, 1);
        const gapT = clamp((t - 18) / 3, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={10} title={'Mass from a Slope'} />
            <SceneRefs refs={["creutz83","gattringer"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              <g transform="translate(960, 540)">
                <line x1="-400" y1="260" x2="400" y2="260" stroke="var(--canvas-dim)" strokeWidth="1" />
                <line x1="-400" y1="-260" x2="-400" y2="260" stroke="var(--canvas-dim)" strokeWidth="1" />
                <text x="420" y="266" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">τ / a</text>
                <text x="-420" y="-270" textAnchor="end" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">log ⟨φ(0)φ(τ)⟩</text>

                {/* scattered data points with error bars */}
                {Array.from({length: 16}).map((_, i) => {
                  const x = -380 + i * 50;
                  const slope = -0.032;
                  const y = -220 + i * 30 + Math.sin(i * 2.3) * 10;
                  return (
                    <g key={i}>
                      <line x1={x} y1={y - 14} x2={x} y2={y + 14} stroke="var(--accent)" strokeWidth="1.4" />
                      <circle cx={x} cy={y} r="4" fill="var(--accent)" />
                    </g>
                  );
                })}

                {/* fit line */}
                {fitT > 0 && (
                  <line x1="-400" y1="-220" x2={-400 + 800 * fitT} y2={-220 + 440 * fitT}
                    stroke="var(--accent-green)" strokeWidth="3" />
                )}
                {fitT > 0.5 && (
                  <text x="0" y="-230" textAnchor="middle" fill="var(--accent-green)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="28" opacity={fitT}>
                    slope = −am
                  </text>
                )}
              </g>

              {/* gap spectrum: E axis with gap between 0 and m */}
              {gapT > 0 && (
                <g transform="translate(960, 920)" opacity={gapT}>
                  <line x1="-300" y1="0" x2="300" y2="0" stroke="var(--canvas-dim)" strokeWidth="1.2" />
                  <circle cx="-300" cy="0" r="6" fill="var(--accent-green)" />
                  <text x="-300" y="30" textAnchor="middle" fill="var(--accent-green)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="18">vacuum</text>
                  <circle cx="-50" cy="0" r="6" fill="var(--accent)" />
                  <text x="-50" y="30" textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="18">m</text>
                  <line x1="-300" y1="-20" x2="-50" y2="-20" stroke="var(--accent-yellow)" strokeWidth="2" markerStart="url(#barL10)" markerEnd="url(#barR10)" />
                  <text x="-175" y="-34" textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="20">mass gap</text>
                  <circle cx="120" cy="0" r="4" fill="var(--canvas-dim)" />
                  <circle cx="200" cy="0" r="4" fill="var(--canvas-dim)" />
                  <text x="160" y="30" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="15">excited states</text>
                </g>
              )}
              <defs>
                <marker id="barL10" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-yellow)" /></marker>
                <marker id="barR10" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-yellow)" /></marker>
              </defs>
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 10 ? 'Fit a straight line to the log of the correlator.' :
               t < 18 ? 'The slope is the lightest mass in that channel.' :
               'A gap above the vacuum is the signature of a massive theory.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

Object.assign(window, { Scene06, Scene07, Scene08, Scene09, Scene10 });
