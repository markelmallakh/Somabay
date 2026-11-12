// After a GitHub Pages export (out/), prefix the public asset paths written as plain strings in
// content (/images/, /videos/, /data/) with the Pages base path. Next only prefixes its own files.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

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
