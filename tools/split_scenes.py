#!/usr/bin/env python3
"""
split_scenes.py — Split a narration transcript into per-scene text files.

Usage:
  python3 split_scenes.py <transcript.txt> <output_dir>

Expects sections headed by:  ## Scene NN
Writes scene_01.txt … scene_NN.txt into output_dir.
"""
import os, re, sys

def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    transcript, out_dir = sys.argv[1], sys.argv[2]
    os.makedirs(out_dir, exist_ok=True)
    with open(transcript) as f:
        content = f.read()
    parts = re.split(r'^## Scene (\d+)', content, flags=re.MULTILINE)
    count = 0
    for i in range(1, len(parts), 2):
        scene_num = parts[i].zfill(2)
        text = parts[i + 1].strip()
        body = '\n'.join(text.split('\n')[1:]).strip()
        out_path = os.path.join(out_dir, f"scene_{scene_num}.txt")
        with open(out_path, 'w') as f:
            f.write(body)
        count += 1
        print(f"Wrote {out_path} ({len(body)} chars)")
    print(f"\nTotal: {count} scene files → {out_dir}")

if __name__ == "__main__":
    main()
