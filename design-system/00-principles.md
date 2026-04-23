# 00 — Principles

**Source anchors.** `CLAUDE_DESIGN_BRIEF.md` §4, `ENGAGEMENT_PLAN.md`, memory
`feedback_engagement_visuals.md`.

---

## Tone anchor: 3Blue1Brown-like

The north star is Grant Sanderson's visual language, adapted for graduate
physics. That means:

- **Primacy of the object.** The thing being explained (a Feynman diagram, a
  lattice, a Markov chain) is centered, large, and unobstructed. Chrome is
  minimal.
- **Reveals are slow.** A new element appears over 0.5–2.5 seconds, not
  instantly. The viewer's eye follows the motion, not a jump-cut.
- **Labels follow objects.** An object appears, then its label appears next to
  it, within 0.3 s. Never the label first.
- **Math is animated, not written.** An equation morphs — term by term, sign
  flip by sign flip — rather than fade-replacing a whole line.
- **The camera is steady.** No Ken-Burns on slides. No zoom-in on an animation.
  If a detail needs emphasis, make the detail move, not the camera.
- **Color is grammar.** One hue = one concept class. Breaking the hue-semantics
  mapping (e.g. using red for acceptance) is a design bug. See `03-color.md`.
- **Silence is content.** Pauses between sentences are deliberate. Do not
  silence-cut.

**Not the anchor.** Not Kurzgesagt (no mascots, no cartoon metaphors). Not PBS
Space Time (denser, faster, less visual). Not Veritasium (more narrative hooks
than we need). Graduate audience expects depth over dopamine.

---

## The 12 design laws

1. **Accuracy beats spectacle.** If a visual simplification makes the physics
   misleading, remove the simplification.
2. **Every asset is per-lecture.** Generic clips reused across videos were
   explicitly rejected by the user. Each lecture gets its own picks.
3. **Dark canvas, always.** `#0d1117` across slides, moment clips, b-roll,
   thumbnails. One dark, no exceptions.
4. **One palette, two contexts.** Slide blocks (WCAG header/body pairs) and
   animation accents (high-chroma on dark) share *semantics* but may differ in
   exact hex. See `03-color.md`.
5. **Motion only where it teaches.** An animation must illustrate a mechanism,
   show a convergence, reveal structure, or compare two states. If it's purely
   decorative, cut it.
6. **Dual-panel is the default b-roll form.** Left panel: mechanism / physics.
   Right panel: outcome / convergence. Validated by user.
7. **Moment clips are corner overlays.** 280×180 px, bottom-left, 3–12 s. Never
   full-frame during a slide.
8. **No highlight overlays on slides.** Red boxes, teal bands, drawbox — all
   rejected. Emphasize through b-roll / moment clips, not on-slide chrome.
9. **No dip-to-black transitions.** Chained `fade=t=in` on overlays produces
   black frames. Use `enable=between(t,T0,T1)` instead.
10. **Narration clock is authoritative.** Audio is locked after `build_video.py`
    bakes per-slide timings into frames. Visuals align to the clock; never the
    reverse.
11. **Typography is restrained.** One sans-serif for UI, Computer Modern for
    math. No decorative fonts, no italic for emphasis on slides (color does
    that job).
12. **Spec over vibe.** If a value is in `01-tokens.md`, use that value. Don't
    pick a "close enough" hex or framerate.

---

## Explicitly rejected patterns

These have been tried and rejected. Do not re-propose without new evidence.

| Pattern | Why rejected |
|---|---|
| Red box / hollow rectangle spotlight on slide | Distracting, unprofessional feel |
| Teal filled highlight band | Still feels like SmartArt slop |
| Drawbox spotlight of any color | User: "still wrong, propose totally other solution" |
| Reusing the same moment clip across lectures | User: "animation has to be specific to the situation" |
| `auto-editor` silence cuts | Introduces ~124 black-frame flashes per 24-min video |
| Dip-to-black slide transitions | Chained fades render black frames |
| Ken-Burns on slides | Added motion without teaching anything |
| Glowing pointer dot, zoom-to-region | Rejected in earlier iteration |
| `en-US-Guy/Aria/Jenny` Neural voices | Flat prosody, LU range ~2.7 |
| Generic stinger / whoosh SFX between sections | Breaks the serious tone |

---

## What "on-brand" looks like in one paragraph

Dark (`#0d1117`) frame. One clean sans-serif or an equation in Computer Modern.
The concept being explained is the largest thing on screen. A moment clip may
sit in the bottom-left corner at 280×180 for 3–12 s while the narration
references it. Once per lecture, a 22-s dual-panel b-roll appears bottom-right
at 720 px wide: left panel shows the mechanism, right panel shows the outcome.
Colors are semantic — blue for definitions, gold for formulas, teal for
examples, purple for notes, green for acceptance/convergence, red for
rejection/error, yellow for highlights, dim gray for grid. Reveals take 1 s,
not 0.1. Music sits at −22 LUFS under a −16 LUFS Emma narration. Nothing
blinks, flashes, or dips to black.
