import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(__dirname, "../src/assets/images");
const OUTPUT_FILE = path.join(__dirname, "../src/assets/generated.ts");

const files = fs.readdirSync(RAW_DIR);
let content = `/** AUTO-GENERATED FILE - DO NOT EDIT **/\n\n`;

files.forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext).toUpperCase().replace(/-/g, "_");
  const buffer = fs.readFileSync(path.join(RAW_DIR, file));
  const base64 = buffer.toString("base64");

  const mime =
    ext === ".svg" ? "image/svg+xml" : `image/${ext.replace(".", "")}`;
  content += `export const ${name} = "data:${mime};base64,${base64}";\n`;
});

fs.writeFileSync(OUTPUT_FILE, content);
console.log("⚡ Assets processed and Base64 generated.");
