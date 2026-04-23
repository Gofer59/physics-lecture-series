# 10 — Pipeline Integration

**Source anchors.** `01-tokens.md`, `engagement_overhaul/render_moment_clip.py`,
`engagement_overhaul/render_lecture_broll.py`, `../livres/slides/preamble.tex`,
`video_pipeline/build_video.py`, `video_pipeline/build_all.py`.

This file maps every token to the place it is consumed in code.

---

## 10.1 — Pipeline stages

```
SSML narration (series_*/STEM_narration.xml)
        │
        ▼
Edge TTS synthesis  ──►  audio/series_*/STEM.mp3
        │
        ▼
build_video.py  ──►  video/series_*/STEM.mp4   (slides + voice, timings baked)
        │
        ▼
gen_spotlight_timelines.py  ──►  engagement_overhaul/timelines/STEM.json
        │
        ▼
gen_moment_specs.py (claude -p)  ──►  engagement_overhaul/moment_specs/STEM.json
gen_broll_spec.py   (claude -p)  ──►  engagement_overhaul/broll_specs/STEM.json
        │
        ▼
render_moment_clip.py  ──►  engagement_overhaul/moment_clips/STEM/*.mp4
render_lecture_broll.py ──►  engagement_overhaul/broll/STEM.mp4
        │
        ▼
ffmpeg overlay (PiP)  ──►  STEM._pip.mp4, STEM._moments.mp4
        │
        ▼
ffmpeg amix + loudnorm  ──►  STEM._music.mp4  (FINAL)
```

---

## 10.2 — Where each token lives

| Token | Consumer file | Evidence |
|---|---|---|
| `canvas.bg` `#0d1117` | `preamble.tex` L48 `darkbg` | ✅ canonical |
| `canvas.bg` `#0d1117` | `render_moment_clip.py` BG constant | ❌ currently `#0b1020` — DRIFT |
| `canvas.bg` `#0d1117` | `render_lecture_broll.py` BG constant | ❌ currently `#0b1020` — DRIFT |
| `canvas.text` `#e8e8e8` | `preamble.tex` L49 `darktext` | ✅ canonical |
| `canvas.dim` `#5e6c8c` | Both renderers `DIM` constant | ✅ matches |
| `block.def.*` hex | `preamble.tex` L53–64 | ✅ canonical |
| `accent.blue` `#5ba3f5` | `render_*.py` `ACCENT_B` | ✅ matches |
| `accent.green` `#3df0c0` | `render_*.py` `ACCENT_G` | ✅ matches |
| `accent.yellow` `#ffd166` | `render_*.py` `ACCENT_Y` | ✅ matches |
| `accent.red` `#ff4d6d` | `render_*.py` `ACCENT_R` | ✅ matches |
| `fps.master` 25 | `build_video.py` | ✅ canonical |
| `fps.render` 25 | `render_*.py` | ❌ currently 30 — DRIFT |
| `canvas.moment` 280×180 | `render_moment_clip.py` figsize / dpi | ✅ matches |
| `canvas.broll` 1280×720 | `render_lecture_broll.py` figsize / dpi | ✅ matches |
| `pip.moment.pos` bottom-left 24 px | `build_all.py` overlay expression | ✅ matches |
| `pip.broll.pos` bottom-right 24 px | `build_all.py` overlay expression | ✅ matches |
| `panel.left` `(0.04,0.10,0.42,0.78)` | `render_lecture_broll.py` | ✅ matches |
| `panel.right` `(0.54,0.10,0.42,0.78)` | `render_lecture_broll.py` | ✅ matches |
| `voice.id` `en-US-EmmaMultilingualNeural` | `synth_audio.py` (edge-tts call) | ✅ canonical |
| `loudness.voice` −16 LUFS | `build_all.py` loudnorm filter | ✅ matches |
| `loudness.music` −22 LUFS (post-mix target) | `build_all.py` music volume=0.18 + loudnorm | ✅ matches |

---

## 10.3 — Known drift to fix

Three drift items were surfaced during the initial reconciliation. Each is a
separate code change, out of scope for the design-system spec itself but
documented here so a future session can pick them up.

### Drift #1 — matplotlib bg `#0b1020` vs canonical `#0d1117`
- Files: `render_moment_clip.py` (BG constant), `render_lecture_broll.py`.
- Action: change both `BG` constants to `#0d1117`.
- Impact: all existing rendered clips and b-roll become off-brand. Need to
  re-render everything under `engagement_overhaul/moment_clips/` and
  `engagement_overhaul/broll/` before the next build pass.
- Alternative: keep `#0b1020` as a documented intentional choice. But then
  the "one dark canvas" principle in `00-principles.md` is a lie. Pick one.

### Drift #2 — renderer fps 30 vs canonical 25
- Files: `render_moment_clip.py`, `render_lecture_broll.py` (ffmpeg `-r` flag
  or matplotlib `fps` arg).
- Action: change both to 25 fps.
- Impact: per-clip frame count changes (300 → 250 for 10-s clip, 660 → 550
  for 22-s b-roll). Animation durations stay correct because seconds are
  preserved. Re-render required.

### Drift #3 — moment clip default duration 10 s vs spec default 3 s
- Note: memory says "3 s", renderers default to 10 s. The clips are then
  overlayed with `enable=between(t,T0,T0+3)` so the viewer only sees 3 s.
  The spec default is 3 s (matching the overlay window).
- Action: reduce renderer default to 3 s. Faster render times, smaller files.
- Risk: some templates may visually require 10 s to be readable. Audit
  per-template and tag which require the longer form (flag as
  `duration: long` in CLIP_REGISTRY metadata).

---

## 10.4 — Recommended verifier (future work)

`scripts/check_design_tokens.py`:

1. Parses `01-tokens.md` YAML block at §1.7.
2. Greps `preamble.tex`, `render_moment_clip.py`, `render_lecture_broll.py`,
   `build_all.py`, `synth_audio.py` for each token.
3. Reports lines where declared value ≠ spec value.
4. Exit code 0 if zero drift, 1 otherwise. CI-friendly.

Suggested output format:

```
✓ canvas.bg        #0d1117   preamble.tex:48
✗ canvas.bg        #0b1020   render_moment_clip.py:32  (expected #0d1117)
✗ canvas.bg        #0b1020   render_lecture_broll.py:27 (expected #0d1117)
✓ accent.blue      #5ba3f5   render_moment_clip.py:40
...
3 drift items · see 10-pipeline-integration.md §10.3
```

---

## 10.5 — Safe-change protocol

Whenever you edit a token value or a render constant:

1. Update `01-tokens.md` first (spec-first).
2. Run `check_design_tokens.py` → expect non-zero drift.
3. Update each code site to match.
4. Re-run check → expect zero drift.
5. Re-render affected assets. For color/fps changes, this is the whole series.
6. Rebuild videos:
   ```bash
   rm -f video/series_*/{*.mp4,*._pip.mp4,*._moments.mp4,*._music.mp4}
   python video_pipeline/build_all.py --all --force
   ```
7. Verify with `ffmpeg signalstats` (dark-bg check) and `loudnorm` summary.
8. Commit `docs/design/` + code + regenerated assets together.

Never edit a code constant without updating `01-tokens.md`. The spec is
upstream; code is downstream.

---

## 10.6 — Add-a-new-template protocol

To add a new CLIP_REGISTRY or BROLL_REGISTRY entry:

1. Pick a name from `06-animation-vocabulary.md` §6.3 gap list (or propose
   a new one — add to the gap list first if proposing new).
2. Write the render function:
   - Import palette from central constants (do not re-declare hex).
   - Canvas size from `01-tokens.md` (`canvas.moment` or `canvas.broll`).
   - fps from `01-tokens.md` (`fps.render`).
   - Use `easing.reveal` / `easing.morph` / `easing.linear` from `04-motion.md`.
   - Respect the 3-beat reveal grammar (`04-motion.md` §4.1).
3. Render a test frame and confirm it matches `00-principles.md` — one dark
   canvas, ≤ 4 saturated colors, semantic palette respected.
4. Render the full clip and preview in isolation.
5. Add to the registry dict, add an entry to `06-animation-vocabulary.md`
   with trigger keywords.
6. Test overlay on a real lecture:
   ```bash
   ffmpeg -i video/series_B_mc/mc_v03.mp4 \
          -i engagement_overhaul/moment_clips/mc_v03/<name>.mp4 \
          -filter_complex "overlay=x=24:y=H-h-24:enable='between(t,TS,TE)'" \
          test_overlay.mp4
   ```
7. Commit only after preview passes.
