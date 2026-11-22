// Entry program for the make.fun bounty "Post a GTA 6 meme on X"
// (gta6-meme-x-01). The meme itself is the X post: this program's only job
// is to hand the house the post's address, by copying POST.json from the
// repository root into the output directory, where the gate reads it.
//
// Runs on Node 22 with the standard library only: no network access, no
// wall clock, no files outside the repository. Two runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath = join(botDir, "POST.json");
const targetPath = join(outDir, "POST.json");

if (!existsSync(sourcePath)) {
  // Without the post's address there is nothing to hand in: fail loudly
  // instead of writing an empty output the gate would refuse anyway.
  console.error(
    `gta6-meme-x-01: POST.json is missing from ${botDir} — the X post's address must be in POST.json at the repository root`,
  );
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

try {
  copyFileSync(sourcePath, targetPath);
} catch (err) {
  const reason = err instanceof Error ? err.message : String(err);
  console.error(`gta6-meme-x-01: could not copy POST.json to ${targetPath}: ${reason}`);
  process.exit(1);
}
