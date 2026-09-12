import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const readJson = async file => JSON.parse((await fs.readFile(file, "utf8")).replace(/^\uFEFF/, ""));
const originals = await readJson("scripts/reference-assets.json");
const maya = await readJson("scripts/maya-assets.json");
const names = ["hero", "hero-side", "intro", "individuals", "couples", "teens", "banner", "approach", "transition", "closing-one", "closing-two", "logo"];
const entries = [
  ...originals.map((item, index) => ({ name: `original-${names[index]}`, file: item.file, url: item.url })),
  ...maya.map(item => ({ name: item.name, file: path.join(".asset-source", item.file), url: item.download ?? `https://drive.google.com/uc?export=download&id=${item.source.match(/\/d\/([^/]+)/)[1]}` })),
];
await fs.mkdir(".asset-source", { recursive: true });
await fs.mkdir("public/images", { recursive: true });
const manifest = {};
for (const entry of entries) {
  try { await fs.access(entry.file); }
  catch {
    const response = await fetch(entry.url);
    if (!response.ok) throw new Error(`Failed to download ${entry.name}: ${response.status}`);
    await fs.writeFile(entry.file, Buffer.from(await response.arrayBuffer()));
  }
  const original = await sharp(entry.file).metadata();
  const maxWidth = Math.min(original.width, /banner/.test(entry.name) ? 1920 : entry.name.includes("logo") ? 770 : 1600);
  const variants = [...new Set([640, 960, 1600, maxWidth].filter(width => width <= maxWidth))].sort((a, b) => a - b);
  const output = `public/images/${entry.name}.webp`;
  const result = await sharp(entry.file).rotate().resize({ width: maxWidth, withoutEnlargement: true }).webp({ quality: 83, effort: 5 }).toFile(output);
  const sources = [];
  for (const width of variants) {
    if (width === maxWidth) { sources.push({ src: `/images/${entry.name}.webp`, width }); continue; }
    const filename = `${entry.name}-${width}.webp`;
    await sharp(entry.file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(`public/images/${filename}`);
    sources.push({ src: `/images/${filename}`, width });
  }
  manifest[`/images/${entry.name}.webp`] = { width: result.width, height: result.height, sources };
  console.log(`${entry.name}: ${result.width}x${result.height}, ${Math.round(result.size / 1024)}KB`);
}
await fs.mkdir("src/content", { recursive: true });
await fs.writeFile("src/content/image-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
