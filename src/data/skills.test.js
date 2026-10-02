import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import skills from "./skills.js";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "../../public");

describe("skills data", () => {
  it("keeps all 21 skills across 3 categories with unique ids", () => {
    assert.equal(skills.length, 3);
    assert.equal(new Set(skills.map((g) => g.id)).size, 3);
    assert.equal(skills.reduce((n, g) => n + g.items.length, 0), 21);
  });

  it("every referenced icon file exists in public/skills", () => {
    for (const g of skills)
      for (const item of g.items)
        if (item.icon) assert.ok(existsSync(join(publicDir, "skills", `${item.icon}.svg`)), `${item.name}: ${item.icon}.svg`);
  });

  it("items without a logo carry an explicit monogram or a usable name", () => {
    for (const g of skills)
      for (const item of g.items)
        if (!item.icon) assert.ok(item.mono || /[A-Za-z0-9]/.test(item.name), item.name);
  });
});
