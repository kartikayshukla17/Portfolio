import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const files = (d) =>
  readdirSync(d).flatMap((n) => {
    const p = join(d, n);
    return statSync(p).isDirectory() ? files(p) : /\.(jsx?|tsx?)$/.test(n) && !/\.test\.js$/.test(n) ? [p] : [];
  });

describe("site copy rules", () => {
  it('always says "Verchool Platforms", never bare "Verchool"', () => {
    const offenders = [];
    for (const f of files(root)) {
      readFileSync(f, "utf8").split("\n").forEach((line, i) => {
        if (/Verchool(?! Platforms)/.test(line)) offenders.push(`${f.replace(root, "src")}:${i + 1}: ${line.trim()}`);
      });
    }
    assert.deepEqual(offenders, []);
  });
});
