// After a GitHub Pages export (out/), prefix the public asset paths written as plain strings in
// content (/images/, /videos/, /data/) with the Pages base path. Next only prefixes its own files.
import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";

const base = process.env.PAGES_BASE_PATH ?? "/Somabay";
const root = "out";
const textFile = /\.(html|js|css|txt|json|rsc)$/;
const pattern = /(["'`(])\/(images|videos|data)\//g;

let changed = 0;
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (path === join(root, "images") || path === join(root, "videos")) continue;
      await walk(path);
    } else if (textFile.test(entry.name)) {
      const text = await readFile(path, "utf8");
      const next = text.replace(pattern, `$1${base}/$2/`);
      if (next !== text) {
        await writeFile(path, next);
        changed++;
      }
    }
  }
}
await walk(root);
await writeFile(join(root, ".nojekyll"), "");
console.log(`Prefixed asset paths with ${base} in ${changed} files.`);

// Responsive copies of every photo for the custom image loader (src/lib/pages-image-loader.ts):
// out/_img/<width>/images/… as WebP. A width at or above the original keeps the original pixels
// (never upscaled). The originals in public/ are untouched.
const widths = [256, 640, 1080, 1600, 2400];
const raster = /\.(webp|jpe?g|png)$/i;
async function photos(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await photos(path)));
    else if (raster.test(entry.name)) found.push(path);
  }
  return found;
}
const sources = await photos("public/images");
let written = 0;
const queue = [...sources];
async function worker() {
  for (let file = queue.shift(); file; file = queue.shift()) {
    const relative = file.slice("public".length).replace(raster, ".webp");
    const { width: original = 0 } = await sharp(file).metadata();
    for (const width of widths) {
      const target = join(root, "_img", String(width), relative);
      await mkdir(dirname(target), { recursive: true });
      if (original && width >= original && file.endsWith(".webp")) {
        await copyFile(file, target);
      } else {
        await sharp(file)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 74, effort: 4 })
          .toFile(target);
      }
      written++;
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
console.log(`Wrote ${written} responsive images for ${sources.length} photos.`);
