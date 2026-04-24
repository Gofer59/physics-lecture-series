#!/usr/bin/env bash
# run_pipeline.sh — Split + synthesize all lectures that have narration but no audio yet.
#
# Usage: bash tools/run_pipeline.sh [series_dir]
#   series_dir defaults to ./series
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
SERIES_DIR="${1:-$REPO/series}"
SPLIT="$REPO/tools/split_scenes.py"
TTS="$REPO/tools/run_edge_tts.sh"

find "$SERIES_DIR" -name "narration_transcript.txt" | sort | while read -r transcript; do
    lecture_dir="$(dirname "$transcript")"
    audio_dir="$lecture_dir/audio"
    scene_texts="$lecture_dir/scene_texts"
    name="$(basename "$lecture_dir")"
    series="$(basename "$(dirname "$lecture_dir")")"

    # Skip if no real narration (placeholder only — all scenes are "TODO")
    if grep -q "^TODO$" "$transcript"; then
        echo "SKIP $series/$name — placeholder narration"
        continue
    fi

    # Skip if audio already synthesized (at least scene_01.mp3 exists)
    if [ -f "$audio_dir/scene_01.mp3" ]; then
        echo "SKIP $series/$name — audio exists"
        continue
    fi

    echo ""
    echo "═══ $series/$name ═══"
    python3 "$SPLIT" "$transcript" "$scene_texts"
    bash "$TTS" "$scene_texts" "$audio_dir"
done

echo ""
echo "Pipeline complete."
