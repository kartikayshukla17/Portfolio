import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const read = (p) => (existsSync(join(dir, p)) ? readFileSync(join(dir, p), "utf8") : "");
const skill = read("components/Skill.jsx");
const cloud = read("components/skills/IconCloud.jsx");
const table = read("components/skills/SkillTable.jsx");
const tile = read("components/skills/IconTile.jsx");

describe("skills section", () => {
  it("renders the cloud, the table and a category filter", () => {
    assert.match(skill, /<IconCloud/);
    assert.match(skill, /<SkillTable/);
    assert.match(skill, /aria-pressed=\{active === /);
    assert.match(skill, /id="skills"/);
  });

  it("hides the decorative cloud from assistive tech; the table is the accessible list", () => {
    assert.match(cloud, /aria-hidden="true"/);
    assert.match(table, /<ul/);
    assert.match(table, /item\.name/);
  });

  it("lets vertical touch swipes scroll the page past the cloud", () => {
    assert.match(cloud, /touch-pan-y/);
    assert.doesNotMatch(cloud, /touch-none/);
  });

  it("stops rotating for reduced-motion users and cleans up its frame loop", () => {
    assert.match(cloud, /usePrefersReducedMotion/);
    assert.match(cloud, /cancelAnimationFrame/);
  });

  it("falls back to a monogram when a logo fails to load", () => {
    assert.match(tile, /onError/);
    assert.match(tile, /monogram\(item\)/);
  });

  it("introduces no new accent hues", () => {
    for (const src of [skill, cloud, table, tile]) assert.doesNotMatch(src, /purple|teal|indigo|violet|cyan|rose-/);
  });

  it("resets dragging when the browser cancels the pointer (a vertical swipe on a phone)", () => {
    assert.match(cloud, /onPointerCancel/);
    assert.match(cloud, /onLostPointerCapture/);
  });
});
