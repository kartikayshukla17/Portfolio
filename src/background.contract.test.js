import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(dir, "index.css"), "utf8");
const app = readFileSync(join(dir, "App.jsx"), "utf8");
const gridPath = join(dir, "components/ui/blueprint-grid.jsx");
const grid = existsSync(gridPath) ? readFileSync(gridPath, "utf8") : "";

describe("blueprint grid background", () => {
  it("mounts BlueprintGrid and no longer the stamp field", () => {
    assert.match(app, /<BlueprintGrid \/>/);
    assert.doesNotMatch(app, /StampField|stamp-field/);
    assert.equal(existsSync(join(dir, "components/ui/stamp-field.jsx")), false);
  });

  it("removes the old stamp rules", () => {
    assert.doesNotMatch(css, /page-stamps/);
  });

  it("defines the grid and its cursor spotlight", () => {
    assert.match(css, /\.blueprint-grid\s*\{/);
    assert.match(css, /\.blueprint-grid::before\s*\{/);
    assert.match(css, /--mx/);
    assert.match(css, /--my/);
    assert.match(css, /background-size:\s*48px 48px/);
  });

  it("never intercepts pointer events", () => {
    const block = (css.match(/\.blueprint-grid\s*\{[^}]*\}/) || [""])[0];
    assert.match(block, /pointer-events:\s*none/);
  });

  it("is hidden from assistive tech and skips touch pointers", () => {
    assert.match(grid, /aria-hidden="true"/);
    assert.match(grid, /pointer: coarse/);
  });
});
