/**
 * Colour-grades the hero photo to match the site's warm ivory/gold palette.
 *
 *   npm run grade-hero                       # uses assets-src/hero-original.jpg
 *   npm run grade-hero -- path/to/new.jpg    # grade a different source image
 *
 * Writes public/hero-johannesburg.jpg and public/og-image.jpg (1200×630).
 * Tweak CROP, GLOW, WARMTH and SATURATION below to taste.
 */
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const src = process.argv[2] ?? "assets-src/hero-original.jpg";
// Area of the source to keep, as fractions of its width/height. Trimming the right edge
// moves the skyline's focal point (the tower) into the clear space beside the hero text.
const CROP = { left: 0, top: 0, right: 0.82, bottom: 1 };
// Centre of the gold glow (where the sunset is), as fractions of the cropped image
const GLOW = { x: 0.88, y: 0.24 };
const OUTPUT_WIDTH = 2000;
const WARMTH = 0.35; // 0 = original colours, 1 = full sepia
const SATURATION = 0.8;

const { width: W, height: H } = await sharp(src).metadata();
const crop = {
  left: Math.round(W * CROP.left),
  top: Math.round(H * CROP.top),
  width: Math.round(W * (CROP.right - CROP.left)),
  height: Math.round(H * (CROP.bottom - CROP.top)),
};
const OW = OUTPUT_WIDTH;
const OH = Math.round((OW * crop.height) / crop.width);

// Blend of identity and sepia matrices: warms the image and pulls blues toward bronze
const SEPIA = [
  [0.393, 0.769, 0.189],
  [0.349, 0.686, 0.168],
  [0.272, 0.534, 0.131],
];
const warm = SEPIA.map((row, i) => row.map((v, j) => (i === j ? 1 - WARMTH : 0) + WARMTH * v));

// Soft gold glow where the sunset sits, and a gentle dark vignette around the edges
const glow = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${OW}" height="${OH}">
  <defs><radialGradient id="g" cx="${GLOW.x}" cy="${GLOW.y}" r="0.55">
    <stop offset="0" stop-color="#e2b25c" stop-opacity="0.55"/>
    <stop offset="1" stop-color="#e2b25c" stop-opacity="0"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/></svg>`);
const vignette = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${OW}" height="${OH}">
  <defs><radialGradient id="v" cx="0.62" cy="0.4" r="0.85">
    <stop offset="0.45" stop-color="#14120f" stop-opacity="0"/>
    <stop offset="1" stop-color="#14120f" stop-opacity="0.6"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="url(#v)"/></svg>`);

const graded = await sharp(src)
  .extract(crop)
  .resize(OW, OH, { kernel: "lanczos3" })
  .recomb(warm)
  .modulate({ saturation: SATURATION, brightness: 0.96 })
  .linear(1.08, -8)
  .composite([
    { input: glow, blend: "soft-light" },
    { input: vignette, blend: "over" },
  ])
  .sharpen({ sigma: 0.9, m1: 0.6, m2: 1.2 })
  .jpeg({ quality: 82, progressive: true, mozjpeg: true })
  .toBuffer();

await writeFile("public/hero-johannesburg.jpg", graded);
await sharp(graded)
  .resize(1200, 630, { fit: "cover", position: "top" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/og-image.jpg");

console.log("Wrote public/hero-johannesburg.jpg and public/og-image.jpg");
