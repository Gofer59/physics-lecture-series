#!/usr/bin/env bash
# run_edge_tts.sh — Synthesize per-scene narration with Edge TTS (Emma voice)
#
# Usage: ./run_edge_tts.sh <scene_texts_dir> <audio_out_dir>
#
# Requires: edge-tts (pip install edge-tts), ffprobe (ffmpeg)
set -euo pipefail

TEXT_DIR="${1:?Usage: $0 <scene_texts_dir> <audio_out_dir>}"
AUDIO_DIR="${2:?Usage: $0 <scene_texts_dir> <audio_out_dir>}"
LOG="$AUDIO_DIR/edge_tts.log"

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

echo "[$(date +%H:%M:%S)] Done." | tee -a "$LOG"
