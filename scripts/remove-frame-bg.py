#!/usr/bin/env python3
"""Make the near-white background of extracted hero frames transparent.

Flood-fills from the image border: only background pixels CONNECTED to the
edge are keyed out, so white/light areas inside the character are preserved.
Run after `npm run extract:frames`:

    python3 scripts/remove-frame-bg.py
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

FRAMES = Path(__file__).resolve().parent.parent / "public" / "frames"
TOL = 16          # max per-channel distance from the border color to count as background
FEATHER = 1.2     # gaussian blur radius (px) on the alpha edge


def process(path: Path) -> None:
    img = Image.open(path).convert("RGBA")
    arr = np.asarray(img).astype(np.int16)
    rgb = arr[..., :3]

    # Background color = median of the outer 2px ring
    ring = np.concatenate([
        rgb[:2].reshape(-1, 3), rgb[-2:].reshape(-1, 3),
        rgb[:, :2].reshape(-1, 3), rgb[:, -2:].reshape(-1, 3),
    ])
    bg = np.median(ring, axis=0)

    near_bg = (np.abs(rgb - bg).max(axis=-1) <= TOL)

    # Keep only the background region connected to the border
    seed = np.zeros_like(near_bg)
    seed[0, :] = seed[-1, :] = seed[:, 0] = seed[:, -1] = True
    seed &= near_bg
    bg_mask = ndimage.binary_propagation(seed, mask=near_bg)

    alpha = np.where(bg_mask, 0, 255).astype(np.float32)
    if FEATHER > 0:
        alpha = ndimage.gaussian_filter(alpha, FEATHER)

    out = arr.astype(np.uint8)
    out[..., 3] = np.clip(alpha, 0, 255).astype(np.uint8)
    Image.fromarray(out, "RGBA").save(path, "WEBP", quality=90, exact=False)


def main() -> None:
    manifest = json.loads((FRAMES / "manifest.json").read_text())
    n = manifest["count"]
    for i in range(1, n + 1):
        p = FRAMES / f"{manifest['prefix']}{i:0{manifest['pad']}d}.{manifest['ext']}"
        process(p)
        if i % 20 == 0 or i == n:
            print(f"{i}/{n}", flush=True)


if __name__ == "__main__":
    sys.exit(main())
