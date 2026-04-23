# 08 — Audio

**Source anchors.** Memory `video_project.md` (voice + music), `build_video.py`
pipeline, `ENGAGEMENT_PLAN.md` (voice dynamic-range findings),
`01-tokens.md` §1.5.

---

## 8.1 — Voice

| Setting | Value |
|---|---|
| Engine | Microsoft Edge TTS (free, no API key) |
| Voice ID | `en-US-EmmaMultilingualNeural` |
| Rate | default (no `prosody rate=` override unless slide-specific) |
| Pitch | default |
| Style | conversational (not news, not cheerful) |

**Why Emma.** Validated by user after iterating on Guy / Aria / Jenny. Emma has
measurable prosodic range (LU range > 4 on typical paragraphs) where the
others produce LU range ~2.7 — phone-book flat. The multilingual variant
handles Greek letters, French names, and lattice-jargon edge cases (e.g.
"plaquette", "β-function") better than the standard Emma.

**Rejected voices.** Do not switch to `Guy`, `Aria`, `Jenny` without user
sign-off. All three tested flat on this content.

---

## 8.2 — SSML patterns

Narration is authored in SSML (`series_*/STEM_narration.xml`). Canonical
patterns:

### Slide-change boundary (required)

```xml
<!-- SLIDE CHANGE: Slide 03 — Wilson Action -->
```

`build_video.py` parses this comment to align slide timing. Every slide
boundary must have one.

### Emphasis (on a key term)

```xml
<emphasis level="moderate">asymptotic freedom</emphasis>
```

Use sparingly — once or twice per slide. Over-emphasized narration sounds
theatrical.

### Pause (explicit)

```xml
<break time="300ms"/>   <!-- intra-sentence: breath -->
<break time="800ms"/>   <!-- inter-sentence: reflect -->
```

- Intra-sentence: up to 300 ms.
- Inter-sentence: up to 800 ms.
- Do not insert `<break>` shorter than 100 ms; the engine ignores it anyway.

### Math pronunciation

```xml
<say-as interpret-as="characters">SU(3)</say-as>
```

Use `say-as` for acronyms and compound symbols. For Greek letters, write the
phonetic spelling: `alpha`, `beta`, `mu`, `nu`, `Phi`, `psi-bar`.

### Section breather

Between major sections (not between slides), allow one longer break:

```xml
<break time="1500ms"/>
```

This is a dwell — the audience digests. Do not silence-cut it.

---

## 8.3 — Loudness targets

| Track | Integrated LUFS | True peak | Range (LRA) |
|---|---|---|---|
| Voice | −16 LUFS | −1.5 dBTP | ~ 8–12 LU |
| Music bed | −22 LUFS | −1.5 dBTP | — |
| Final mix | −16 LUFS | −1.5 dBTP | 11 LU |

Standard `loudnorm` filter:

```bash
ffmpeg -i voice.wav -af loudnorm=I=-16:LRA=11:TP=-1.5 voice_ln.wav
```

For the final mix:

```bash
ffmpeg -i voice.wav -i music.wav \
  -filter_complex "[1:a]volume=0.18[m];[0:a][m]amix=inputs=2:duration=first[mix];\
                   [mix]loudnorm=I=-16:LRA=11:TP=-1.5[out]" \
  -map "[out]" -c:v copy final.mp4
```

**Critical.** `-c:v copy` when muxing — re-encoding video invalidates the
per-slide timing built in by `build_video.py`.

---

## 8.4 — Music bed

Music is a continuous low-volume bed under the narration, not stingers between
sections.

| Constraint | Value |
|---|---|
| Genre | Ambient / atmospheric / Kiasmos-adjacent; no melodic hooks, no vocals |
| Volume pre-mix | `volume=0.18` (linear gain before amix) |
| Target post-mix | −22 LUFS integrated (sits ~6 LU under voice) |
| Sidechain | Not required — static gain is sufficient at this mix |
| Fade in | 2 s at video start |
| Fade out | 3 s at video end |

**Forbidden.**
- Stingers / whooshes between slides
- Drum loops
- Music with lyrics
- Dynamic ducking that pumps on speech

---

## 8.5 — Silence policy

Silence is *content*, not defect. Do not remove it.

| Silence type | Handled by |
|---|---|
| Mid-slide breath (`<break>` in SSML) | Keep as-is |
| Inter-sentence pause | Keep as-is |
| Pre-slide-change beat | Keep — viewer catches up visually |
| Recording-gap / dead air before narration starts | Trim manually in SSML, not with auto-editor |

**Forbidden.** `auto-editor`, VAD-based silence cuts, any tool that alters the
audio clock. They produce black frames (~124 per 24-min video, verified) and
ruin the baked slide timings.

---

## 8.6 — Regenerating audio after narration edit

```bash
# 1. Edit the SSML in series_*/STEM_narration.xml
# 2. Re-synthesize:
python video_pipeline/synth_audio.py --stem mc_v03
# 3. Re-build the video (audio timings propagate to frames):
python video_pipeline/build_video.py --stem mc_v03 --voice en-US-EmmaMultilingualNeural
# 4. Re-run downstream layers (moment/broll/music) only if base changed.
```

Do not swap out the `.mp3`/`.wav` file directly. The pipeline assumes each
narration file came from the SSML and derives per-slide durations from the
edge-tts word-boundary timings.

---

## 8.7 — Quality gates

Before publishing a final MP4:

| Check | Command | Pass condition |
|---|---|---|
| Integrated loudness | `ffmpeg -i final.mp4 -af loudnorm=print_format=summary -f null -` | I = −16 ± 0.5, TP ≤ −1.0 |
| No clipping | Same output | True peak ≤ −1.0 dBTP |
| Voice intelligibility | Listen at −20 dB reference, music bed should NOT be distracting | Subjective |
| No black flash | `ffmpeg -i final.mp4 -vf "blackdetect=d=0.1" -f null -` | Zero detections |
