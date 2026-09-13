import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const readJson = async file => JSON.parse((await fs.readFile(file, "utf8")).replace(/^\uFEFF/, ""));
const args = process.argv.slice(2);
let theme = "both";
for (let index = 0; index < args.length; index++) {
  const arg = args[index];
  if (arg === "--theme") theme = args[++index];
  else if (arg.startsWith("--theme=")) theme = arg.slice("--theme=".length);
  else throw new Error(`Unknown option: ${arg}. Use --theme both|original|maya.`);
}
if (!["both", "original", "maya"].includes(theme)) {
  throw new Error("Image theme must be both, original, or maya.");
}

const originals = theme !== "maya" ? await readJson("scripts/reference-assets.json") : [];
const maya = theme !== "original" ? await readJson("scripts/maya-assets.json") : [];
const names = ["hero", "hero-side", "intro", "individuals", "couples", "teens", "banner", "approach", "transition", "closing-one", "closing-two", "logo"];
const entries = [
  ...originals.map((item, index) => ({ name: `original-${names[index]}`, file: item.file, url: item.url })),
  ...maya.map(item => ({
    name: item.name,
    file: path.join(".asset-source", item.file),
    url: item.download ?? `https://drive.google.com/uc?export=download&id=${item.source.match(/\/d\/([^/]+)/)[1]}`,
    preserve: item.preserve === true,
    maxWidth: item.maxWidth,
    quality: item.quality,
  })),
];
await fs.mkdir(".asset-source", { recursive: true });
await fs.mkdir("public/images", { recursive: true });
// A theme-specific run must retain the other route's responsive source records.
let manifest = {};
try { manifest = await readJson("src/content/image-manifest.json"); }
catch (error) { if (error.code !== "ENOENT") throw error; }

for (const entry of entries) {
  const imagePath = `/images/${entry.name}.webp`;
  const existing = manifest[imagePath];
  if (entry.preserve && existing) {
    const files = new Set([imagePath, ...existing.sources.map(source => source.src)]);
    const available = await Promise.all([...files].map(file => fs.access(path.join("public", file)).then(() => true, () => false)));
    if (available.every(Boolean)) {
      console.log(`${entry.name}: preserved supplied asset`);
      continue;
    }
  }
  try { await fs.access(entry.file); }
  catch {
    const response = await fetch(entry.url);
    if (!response.ok) throw new Error(`Failed to download ${entry.name}: ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    // Reject non-images before saving them to the download cache.
    await sharp(buffer).metadata();
    await fs.mkdir(path.dirname(entry.file), { recursive: true });
    await fs.writeFile(entry.file, buffer);
  }
  const original = await sharp(entry.file).metadata();
  const sourceWidth = original.autoOrient?.width ?? original.width;
  const maxWidth = Math.min(sourceWidth, entry.maxWidth ?? (/banner/.test(entry.name) ? 1920 : entry.name.includes("logo") ? 770 : 1600));
  const variants = [...new Set([640, 960, 1600, maxWidth].filter(width => width <= maxWidth))].sort((a, b) => a - b);
  const output = `public/images/${entry.name}.webp`;
  const result = await sharp(entry.file).rotate().resize({ width: maxWidth, withoutEnlargement: true }).webp({ quality: entry.quality ?? 83, effort: 5 }).toFile(output);
  const sources = [];
  for (const width of variants) {
    if (width === maxWidth) { sources.push({ src: `/images/${entry.name}.webp`, width }); continue; }
    const filename = `${entry.name}-${width}.webp`;
    await sharp(entry.file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: Math.min(entry.quality ?? 80, 80), effort: 5 }).toFile(`public/images/${filename}`);
    sources.push({ src: `/images/${filename}`, width });
  }
  manifest[imagePath] = { width: result.width, height: result.height, sources };
  console.log(`${entry.name}: ${result.width}x${result.height}, ${Math.round(result.size / 1024)}KB`);
}
await fs.mkdir("src/content", { recursive: true });
await fs.writeFile("src/content/image-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
