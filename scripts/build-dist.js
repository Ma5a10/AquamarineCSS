import { bundle } from "lightningcss";
import { writeFileSync, mkdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

const srcFile = resolve(import.meta.dir, "../src/aquamarine.css");
const distDir = resolve(import.meta.dir, "../dist");

mkdirSync(distDir, { recursive: true });

console.log("🌊 Building AquamarineCSS...");

// 1. Unminified bundle
const unminified = bundle({
  filename: srcFile,
  minify: false,
});

const unminifiedPath = resolve(distDir, "aquamarine.css");
writeFileSync(unminifiedPath, unminified.code);
const unminifiedSize = (statSync(unminifiedPath).size / 1024).toFixed(2);
console.log(`✅ Generated: dist/aquamarine.css (${unminifiedSize} KB)`);

// 2. Minified bundle
const minified = bundle({
  filename: srcFile,
  minify: true,
  sourceMap: true,
});

const minifiedPath = resolve(distDir, "aquamarine.min.css");
writeFileSync(minifiedPath, minified.code);
if (minified.map) {
  writeFileSync(resolve(distDir, "aquamarine.min.css.map"), minified.map);
}
const minifiedSize = (statSync(minifiedPath).size / 1024).toFixed(2);
console.log(`⚡ Generated: dist/aquamarine.min.css (${minifiedSize} KB)`);

console.log("✨ AquamarineCSS build completed!");
