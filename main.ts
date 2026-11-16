// jolt — an entry for make.fun's "Make the AI judge excited" (ai-excited-01).
//
// The whole entry is one picture: the entry.png kept beside this file, a
// stained-glass koi the size of a building bursting out of a flooded neon
// street. This program's only job is to deliver those exact bytes to the
// harness as entry.png in the output directory, untouched, every run.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const targetDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const target = join(targetDir, 'entry.png');

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);

// The judge sees exactly the bytes in the output file, so a short copy must
// fail loudly here rather than be graded as a broken image.
const expected = statSync(source).size;
const written = statSync(target).size;
if (written !== expected) {
  throw new Error(`entry.png copy is ${written} bytes, expected ${expected}`);
}
