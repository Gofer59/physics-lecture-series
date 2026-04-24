// lqcd-primitives.jsx — shared primitives for the LQCD lecture animation
// Adapted from QFT primitives; LQCD accent = #b589e8

function Scene({ start, end, label, children }) {
  return (
    <Sprite start={start} end={end}>
      {(ctx) => (
        <div data-scene={label} style={{ position: 'absolute', inset: 0 }}>
          {typeof children === 'function' ? children(ctx) : children}
        </div>
      )}
    </Sprite>
  );
}

const REFS = {
  wilson74:   { marker: 'Wilson 1974',          full: 'K. G. Wilson, "Confinement of quarks," Phys. Rev. D 10, 2445 (1974)' },
  creutz83:   { marker: 'Creutz 1983',          full: 'M. Creutz, Quarks, Gluons and Lattices, Cambridge, 1983' },
  montvay:    { marker: 'Montvay & Münster',    full: 'I. Montvay & G. Münster, Quantum Fields on a Lattice, Cambridge, 1994' },
  rothe:      { marker: 'Rothe 2012',           full: 'H. J. Rothe, Lattice Gauge Theories: An Introduction, 4th ed., World Scientific, 2012' },
  gattringer: { marker: 'Gattringer & Lang',    full: 'C. Gattringer & C. B. Lang, Quantum Chromodynamics on the Lattice, Springer, 2010' },
  osterwalder:{ marker: 'Osterwalder–Schrader', full: 'K. Osterwalder & R. Schrader, "Axioms for Euclidean Green\'s functions," Commun. Math. Phys. 31, 83 (1973)' },
  symanzik:   { marker: 'Symanzik 1983',        full: 'K. Symanzik, "Continuum limit and improved action in lattice theories," Nucl. Phys. B 226, 187 (1983)' },
  luscher:    { marker: 'Lüscher–Weisz',        full: 'M. Lüscher & P. Weisz, "On-shell improved lattice gauge theories," Commun. Math. Phys. 97, 59 (1985)' },
  kogut79:    { marker: 'Kogut 1979',           full: 'J. B. Kogut, "An introduction to lattice gauge theory and spin systems," Rev. Mod. Phys. 51, 659 (1979)' },
  wilsonRG:   { marker: 'Wilson 1971 (RG)',     full: 'K. G. Wilson, "Renormalization group and critical phenomena," Phys. Rev. B 4, 3174 (1971)' },
  flag:       { marker: 'FLAG 2024',            full: 'Flavour Lattice Averaging Group, Eur. Phys. J. C 84, 897 (2024)' },
};

function SceneRefs({ refs, delay = 1.5 }) {
  const ctx = useSprite();
  if (!refs || !refs.length) return null;
  const op = ctx.localTime < delay ? 0
           : ctx.localTime > ctx.duration - 0.4 ? Math.max(0, (ctx.duration - ctx.localTime) / 0.4)
           : Math.min(1, (ctx.localTime - delay) / 0.6);
  return (
    <div style={{
      position: 'absolute', left: 72, bottom: 36,
      display: 'flex', alignItems: 'baseline', gap: 16,
      fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--canvas-dim)',
      letterSpacing: '0.08em', opacity: op * 0.85, pointerEvents: 'none',
      maxWidth: 1300,
    }}>
      <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.7 }}>
        sources
      </span>
      {refs.map((k, i) => {
        const r = REFS[k];
        if (!r) return null;
        return (
          <React.Fragment key={k}>
            {i > 0 && <span style={{ opacity: 0.4 }}>·</span>}
            <span style={{ fontStyle: 'italic' }}>{r.marker}</span>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function SceneLabel({ n, title }) {
  const ctx = useSprite();
  const fade = ctx.localTime < 0.5
    ? ctx.localTime / 0.5
    : ctx.localTime > ctx.duration - 0.6
    ? Math.max(0, (ctx.duration - ctx.localTime) / 0.6)
    : 1;
  return (
    <div style={{
      position: 'absolute', top: 48, left: 72,
      fontFamily: 'var(--font-ui)', color: 'var(--canvas-dim)',
      fontSize: 18, letterSpacing: '0.25em', textTransform: 'uppercase',
      opacity: fade * 0.8,
      display: 'flex', alignItems: 'baseline', gap: 18,
    }}>
      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
        {String(n).padStart(2, '0')}
      </span>
      <span>{title}</span>
    </div>
  );
}

function fadeIO(localTime, duration, inDur = 0.6, outDur = 0.6) {
  if (localTime < inDur) return clamp(localTime / inDur, 0, 1);
  if (localTime > duration - outDur) return clamp((duration - localTime) / outDur, 0, 1);
  return 1;
}

// ─── LQCD-specific: draw a 2D lattice with sites and links ───
function Lattice2D({ ox, oy, cols, rows, spacing, color = 'var(--accent)', siteR = 4, linkOp = 0.5, siteOp = 1, linkW = 1 }) {
  const sites = [];
  const links = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = ox + i * spacing;
      const y = oy + j * spacing;
      sites.push(<circle key={`s-${i}-${j}`} cx={x} cy={y} r={siteR} fill={color} opacity={siteOp} />);
      if (i < cols - 1) {
        links.push(<line key={`lh-${i}-${j}`} x1={x} y1={y} x2={x + spacing} y2={y} stroke={color} strokeWidth={linkW} opacity={linkOp} />);
      }
      if (j < rows - 1) {
        links.push(<line key={`lv-${i}-${j}`} x1={x} y1={y} x2={x} y2={y + spacing} stroke={color} strokeWidth={linkW} opacity={linkOp} />);
      }
    }
  }
  return <g>{links}{sites}</g>;
}

// Drifting field background — LQCD style, violet dots
function FieldBackground({ accent, amplitude = 0.3, speed = 0.1 }) {
  const t = useTime();
  const cols = 22, rows = 12;
  const dots = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = 80 + (i / (cols - 1)) * (1920 - 160);
      const y = 80 + (j / (rows - 1)) * (1080 - 160);
      const wave = Math.sin((i * 0.5 + j * 0.3) + t * speed * 2 * Math.PI);
      const op = 0.05 + 0.12 * amplitude * (wave * 0.5 + 0.5);
      const r = 1.8 + 0.8 * amplitude * (wave * 0.5 + 0.5);
      dots.push(<circle key={i + '-' + j} cx={x} cy={y} r={r} fill={accent || 'var(--accent)'} opacity={op} />);
    }
  }
  return (
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {dots}
    </svg>
  );
}

function SceneCounter({ scenes }) {
  const t = useTime();
  let idx = 0;
  for (let i = 0; i < scenes.length; i++) {
    if (t >= scenes[i].start && t < scenes[i].end) { idx = i; break; }
    if (t >= scenes[i].end) idx = i;
  }
  return (
    <div style={{
      position: 'absolute', right: 48, bottom: 36,
      fontFamily: 'var(--font-ui)',
      color: 'var(--canvas-dim)',
      fontSize: 16, letterSpacing: '0.2em', opacity: 0.55,
    }}>
      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
        {String(idx + 1).padStart(2, '0')}
      </span>
      <span style={{ margin: '0 10px' }}>/</span>
      <span>{String(scenes.length).padStart(2, '0')}</span>
    </div>
  );
}

// Plaquette sigil (LQCD)
function SeriesSigil() {
  return (
    <div style={{
      position: 'absolute', top: 48, right: 72, display: 'flex', alignItems: 'center', gap: 14,
      fontFamily: 'var(--font-ui)', color: 'var(--canvas-dim)',
      fontSize: 14, letterSpacing: '0.25em', textTransform: 'uppercase',
      opacity: 0.6,
    }}>
      <span>LQCD · Lecture 1</span>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="5" width="14" height="14" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
        <circle cx="5" cy="5" r="2" fill="var(--accent)" />
        <circle cx="19" cy="5" r="2" fill="var(--accent)" />
        <circle cx="5" cy="19" r="2" fill="var(--accent)" />
        <circle cx="19" cy="19" r="2" fill="var(--accent)" />
        <line x1="5" y1="5" x2="19" y2="19" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}

function TimecodeTagger() {
  const t = useTime();
  React.useEffect(() => {
    const sec = Math.floor(t);
    const root = document.querySelector('[data-screen-label-root]');
    if (root) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      root.setAttribute('data-screen-label', `t=${m}:${String(s).padStart(2, '0')}`);
    }
  }, [Math.floor(t)]);
  return null;
}

Object.assign(window, {
  Scene, SceneLabel, SceneRefs, REFS, fadeIO,
  Lattice2D, FieldBackground,
  SceneCounter, SeriesSigil, TimecodeTagger,
});
