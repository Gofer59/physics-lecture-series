# 04 — Motion

**Source anchors.** `render_moment_clip.py`, `render_lecture_broll.py`, memory
`feedback_engagement_visuals.md`, `ffmpeg_zoompan_gotcha.md`.

---

## 4.1 — The grammar of reveals

Every reveal in a 3Blue1Brown-like video obeys the same 3-beat sentence:

1. **Structure arrives.** The axes, frame, or empty diagram appears (over
   `duration.quick` = 0.5 s).
2. **Object arrives.** The physics object (curve, vertex, spin, lattice link)
   draws itself in (over `duration.base` = 1.0 s, easing = ease-out).
3. **Label attaches.** The name / symbol appears next to the object (over
   `duration.quick`, offset by 0.3 s from the end of beat 2).

**Beat rules.**
- Beats are sequential, not overlapping. The viewer needs the structure before
  the object lands.
- A beat can be skipped only if its element was already on-screen from a prior
  slide or prior moment.
- Do not combine beats 2 and 3 by labeling the object before it fully exists.
  The label always arrives *after* the object.

---

## 4.2 — Duration tokens

| Token | Seconds | When to use |
|---|---|---|
| `flash` | 0.2 | Instantaneous change — sparingly, only if narration is already fast |
| `quick` | 0.5 | Small reveals: label attaching, axis drawing, tick appearing |
| `base` | 1.0 | Default reveal for a single object (curve, vertex, spin flip cascade start) |
| `deliberate` | 2.5 | Slow scan: derivation step, panning over a long equation, mass plateau growing |
| `dwell` | 5.0 | Hold on a complete state before moving on — gives narration room |
| `moment.default` | 3.0 | Moment-clip overlay duration |
| `moment.long` | 12.0 | Moment-clip upper bound (use only when concept justifies it) |
| `broll` | 22.0 | Dual-panel b-roll length |

**Rule of thumb.** If an animation feels fast, it is fast. Double the duration
and check again.

---

## 4.3 — Easing

| Token | Curve | Where |
|---|---|---|
| `easing.reveal` | cubic ease-out (decelerate) | Object entering screen, label attaching |
| `easing.morph` | cubic ease-in-out | Equation term-to-term morph |
| `easing.linear` | linear | matplotlib frame loops, acceptable fallback |
| `easing.dwell` | step | Static holds — no motion |

No bounce. No overshoot. No elastic. No custom Bézier per animation; pick from
the four above.

---

## 4.4 — Equation morph (the 3Blue1Brown signature)

An equation changes from `f(x) = x² + bx + c` to `f(x) = (x − h)² + k` by:

1. Identifying which tokens are **preserved** (`f`, `(`, `x`, `)`, `=`).
2. Identifying which are **transformed** (`x²` → `(x − h)²`; `bx + c` → `+ k`).
3. Animating preserved tokens: they translate to their new position (base, ease-in-out).
4. Animating transformed tokens: old tokens fade out (quick), new tokens fade in
   (quick) at the new position, with a 0.1 s gap so the audience registers the
   change.

**Never** cross-fade a whole equation. **Never** jump-cut a rewrite. Even when
matplotlib mathtext limits per-glyph animation, split the equation across two
frames with a brief hold between them.

---

## 4.5 — Forbidden patterns

| Pattern | Why forbidden |
|---|---|
| Dip-to-black transitions between slides | Chained `fade=t=in` renders black frames |
| `zoom+x` with `d=1` in ffmpeg zoompan | Does not accumulate; see memory `ffmpeg_zoompan_gotcha.md` — use `pzoom` or `on`-based expression |
| Ken-Burns pan/zoom on a static slide | Added motion that teaches nothing |
| Zoom-to-region emphasis | Rejected — simplify the region instead |
| Red/teal highlight bands (`drawbox`) | All variants rejected by user |
| Pulsing glow on multiple simultaneous elements | Viewer can't track — pulse at most one element |
| Flash frames faster than 0.2 s | Accessibility hazard + looks cheap |
| Auto-editor silence cuts | Produces ~124 black frames per 24-min video |
| Cross-cut between clips without narration bridge | Disorients the viewer |

---

## 4.6 — Overlay timing (moment clips + b-roll)

Moment clips and b-roll are laid on top of slide video with ffmpeg `overlay` +
`enable='between(t,T0,T1)'`. Timing rules:

- `T0` = the moment in narration that the clip illustrates, minus 0.5 s so the
  viewer sees the clip appear just as the concept is named.
- `T1` = `T0 + duration` (either `moment.default` / `moment.long` / `broll`).
- Moment clips: fade in over 0.3 s at T0, fade out over 0.3 s at T1 (handled by
  the clip's own alpha frames, not by ffmpeg fade).
- B-roll: first frame must be non-blank (avoids a black flash during PiP
  cross-over). Fade handled internally.

Never use `fade=t=in:st=T0` on the overlay — chains black.

---

## 4.7 — Per-panel concurrency

In dual-panel b-roll, both panels animate **simultaneously** with the same
timebase. Left panel shows mechanism; right panel shows outcome. Coupling the
two visually (left causes right) is the whole point — if the viewer has to
alternate attention, the panels are poorly paired.

If left and right want different paces, split into two separate moment clips
instead of forcing a b-roll.

---

## 4.8 — Camera

The camera is static. Full stop.

- No pan, no zoom, no dolly on slides.
- No animated crop inside a moment clip.
- No parallax.
- If an element needs emphasis, animate *the element*, not the viewport.

---

## 4.9 — Pausing the motion

When narration is making a crucial point, the animation should *hold* its
current state. Code this as an explicit `dwell` segment of `duration.dwell`
length. The frame does not move; the narrator carries the beat.

This is the opposite of modern YouTube pacing. It's also the reason the
3Blue1Brown reference is the anchor — the audience is graduate-level and
does not need a stimulus every half-second.
