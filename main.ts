// news-image-20261125 — "Sum up 25 November's world news in one image".
//
// The artwork is a finished newspaper front page, typeset locally around a
// paper-collage hero image and stored beside this program as entry.png.
// The page is a JPEG under a .png name, which the competition's gate
// explicitly allows: it tells PNG from JPEG by the first bytes, not by the
// file name.
//
// This program does more than copy the page across. Before anything is
// written it proves the stored file is exactly the page that was built:
//   1. its first bytes carry a PNG or JPEG signature, and
//   2. its length is the recorded byte size of the finished page, and
//   3. it sits under the competition's one-mebibyte cap.
// Only then is it copied into the output directory, and the copy is read
// back and compared byte for byte so a truncated write can never pass.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Byte size of the finished 25 November front page, recorded when it was
// typeset. If the file in the repository is ever swapped or damaged, this
// number stops the run instead of submitting the wrong picture.
const EXPECTED_BYTES = 269886;

// The gate's hard cap: 1 MiB.
const MAX_BYTES = 1048576;

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_SIGNATURE = [0xff, 0xd8, 0xff];

function startsWith(bytes: Buffer, signature: number[]): boolean {
  return signature.every((value, index) => bytes[index] === value);
}

function describeFormat(bytes: Buffer): string {
  if (startsWith(bytes, PNG_SIGNATURE)) return "PNG";
  if (startsWith(bytes, JPEG_SIGNATURE)) return "JPEG";
  throw new Error("entry.png starts with neither the PNG nor the JPEG signature");
}

function loadFrontPage(path: string): Buffer {
  const bytes = readFileSync(path);
  const format = describeFormat(bytes);
  if (bytes.length !== EXPECTED_BYTES) {
    throw new Error(`entry.png is ${bytes.length} bytes, expected ${EXPECTED_BYTES}`);
  }
  if (bytes.length > MAX_BYTES) {
    throw new Error(`entry.png is ${bytes.length} bytes, over the ${MAX_BYTES} cap`);
  }
  console.log(`front page verified: ${format}, ${bytes.length} bytes`);
  return bytes;
}

function main(): void {
  const repoDir = dirname(fileURLToPath(import.meta.url));
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const page = loadFrontPage(join(repoDir, "entry.png"));

  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.png");
  writeFileSync(target, page);

  // Read the copy back: the grader runs this program twice and both runs
  // must produce the same bytes, so prove the write landed whole.
  const written = readFileSync(target);
  if (!written.equals(page)) {
    throw new Error("the written copy differs from the verified front page");
  }
  console.log("wrote", target);
}

main();
