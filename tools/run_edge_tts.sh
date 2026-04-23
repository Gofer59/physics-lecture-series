#!/usr/bin/env bash
set -euo pipefail

PIPELINE_DIR="/home/gofer/Documents_organise/references/video_project/qft01_v2_voice_pipeline"
TEXT_DIR="$PIPELINE_DIR/scene_texts_short"
AUDIO_DIR="$PIPELINE_DIR/audio_short"
LOG="$PIPELINE_DIR/edge_tts_short.log"

mkdir -p "$AUDIO_DIR"
: > "$LOG"

for txt in "$TEXT_DIR"/scene_*.txt; do
    scene=$(basename "$txt" .txt)
    out="$AUDIO_DIR/${scene}.mp3"
    echo "[$(date +%H:%M:%S)] Synthesizing $scene ..." | tee -a "$LOG"
    if edge-tts \
        --voice en-US-EmmaMultilingualNeural \
        --file "$txt" \
        --write-media "$out" >> "$LOG" 2>&1; then
        size=$(stat -c%s "$out")
        dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out" 2>/dev/null)
        echo "[$(date +%H:%M:%S)]   OK: ${scene}.mp3 ${size}B ${dur}s" | tee -a "$LOG"
    else
        echo "[$(date +%H:%M:%S)]   FAIL: $scene" | tee -a "$LOG"
    fi
    sleep 1
done

echo "[$(date +%H:%M:%S)] All done." | tee -a "$LOG"
