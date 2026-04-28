#!/usr/bin/env node
// Extract WebP frames from the product MP4 using FFmpeg.
// Usage:  node scripts/extract-frames.mjs [--fps=24] [--quality=85] [--input=<file>]
// Output: public/frames/frame-XXXX.webp + public/frames/manifest.json

import { execSync } from 'node:child_process';
import { existsSync, readdirSync, statSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';

const ROOT = resolve(process.cwd());
const VIDEO_DIR = join(ROOT, 'public', 'video');
const FRAMES_DIR = join(ROOT, 'public', 'frames');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);

const fps = Number(args.fps ?? 24);
const quality = Number(args.quality ?? 85);

const findVideo = () => {
  if (args.input) return resolve(String(args.input));
  if (!existsSync(VIDEO_DIR)) return null;
  const candidates = readdirSync(VIDEO_DIR)
    .filter((f) => /\.(mp4|mov|m4v|webm)$/i.test(f))
    .map((f) => join(VIDEO_DIR, f))
    .filter((p) => statSync(p).isFile());
  return candidates[0] ?? null;
};

const video = findVideo();
if (!video) {
  console.error('\n[extract-frames] No video found.\n  Drop your MP4 into:  public/video/\n  Then re-run:         npm run extract:frames\n');
  process.exit(1);
}

console.log(`[extract-frames] Source : ${basename(video)}`);
console.log(`[extract-frames] FPS    : ${fps}`);
console.log(`[extract-frames] Quality: ${quality}`);

if (existsSync(FRAMES_DIR)) {
  // Clear previous extraction (keep .gitkeep if any)
  for (const f of readdirSync(FRAMES_DIR)) {
    if (f === '.gitkeep') continue;
    rmSync(join(FRAMES_DIR, f), { recursive: true, force: true });
  }
} else {
  mkdirSync(FRAMES_DIR, { recursive: true });
}

const pattern = join(FRAMES_DIR, 'frame-%04d.webp');
const cmd = [
  'ffmpeg',
  '-y',
  '-i', JSON.stringify(video),
  '-vf', `fps=${fps}`,
  '-c:v', 'libwebp',
  '-quality', String(quality),
  '-compression_level', '4',
  '-loop', '0',
  '-an',
  JSON.stringify(pattern),
].join(' ');

console.log(`[extract-frames] Running ffmpeg…`);
execSync(cmd, { stdio: 'inherit' });

const frames = readdirSync(FRAMES_DIR)
  .filter((f) => /^frame-\d{4}\.webp$/.test(f))
  .sort();

if (!frames.length) {
  console.error('[extract-frames] No frames produced — check ffmpeg output above.');
  process.exit(1);
}

const manifest = {
  count: frames.length,
  ext: 'webp',
  pad: 4,
  prefix: 'frame-',
  fps,
  quality,
  source: basename(video),
  generatedAt: new Date().toISOString(),
};

writeFileSync(join(FRAMES_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));

console.log(`\n[extract-frames] ✓ ${frames.length} frames written to public/frames/`);
console.log(`[extract-frames] ✓ manifest.json written`);
console.log(`[extract-frames] First: ${frames[0]}`);
console.log(`[extract-frames] Last : ${frames[frames.length - 1]}`);
