# Video drop folder

Drop your finished product MP4 into this folder. Any filename works.
The first `.mp4` / `.mov` / `.m4v` / `.webm` file found here will be used.

Then run, from the project root:

```
npm run extract:frames
```

This will:

1. Run FFmpeg to extract WebP frames at 24fps, quality 85
2. Write them to `public/frames/frame-0001.webp`, `frame-0002.webp`, …
3. Write `public/frames/manifest.json` so the hero canvas knows how many frames to load

You can override the defaults:

```
npm run extract:frames -- --fps=30 --quality=90 --input=public/video/my.mp4
```

This folder is tracked but its contents (other than this README) are gitignored.
