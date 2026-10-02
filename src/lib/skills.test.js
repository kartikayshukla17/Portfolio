import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { flattenSkills, iconPath, isDimmed, monogram, rotate, spherePoints } from "./skills.js";

const len = (p) => Math.hypot(p.x, p.y, p.z);

describe("spherePoints", () => {
  it("returns n unit vectors", () => {
    const pts = spherePoints(21);
    assert.equal(pts.length, 21);
    for (const p of pts) assert.ok(Math.abs(len(p) - 1) < 1e-9);
  });

  it("handles one and zero points without NaN", () => {
    assert.deepEqual(spherePoints(0), []);
    const [p] = spherePoints(1);
    assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z));
  });
});

describe("rotate", () => {
  it("preserves length and returns a new object", () => {
    const p = { x: 0.3, y: -0.5, z: Math.sqrt(1 - 0.09 - 0.25) };
    const q = rotate(p, 0.7, -1.3);
    assert.notEqual(q, p);
    assert.ok(Math.abs(len(q) - 1) < 1e-9);
  });

  it("is the identity for zero angles", () => {
    const p = { x: 0.1, y: 0.2, z: Math.sqrt(1 - 0.01 - 0.04) };
    const q = rotate(p, 0, 0);
    assert.ok(Math.abs(q.x - p.x) < 1e-12 && Math.abs(q.y - p.y) < 1e-12 && Math.abs(q.z - p.z) < 1e-12);
  });
});

describe("flattenSkills / isDimmed", () => {
  const groups = [
    { id: "a", category: "A", items: [{ name: "One" }, { name: "Two" }] },
    { id: "b", category: "B", items: [{ name: "Three" }] },
  ];

  it("keeps every item and tags its category", () => {
    const flat = flattenSkills(groups);
    assert.equal(flat.length, 3);
    assert.deepEqual(
      flat.map((i) => [i.name, i.categoryId, i.category]),
      [["One", "a", "A"], ["Two", "a", "A"], ["Three", "b", "B"]]
    );
  });

  it("dims only items outside the active category", () => {
    const [one, , three] = flattenSkills(groups);
    assert.equal(isDimmed(one, null), false);
    assert.equal(isDimmed(one, "a"), false);
    assert.equal(isDimmed(three, "a"), true);
  });
});

describe("iconPath / monogram", () => {
  it("builds the self-hosted path", () => {
    assert.equal(iconPath("react"), "/skills/react.svg");
  });

  it("prefers an explicit monogram, else the first two letters or digits", () => {
    assert.equal(monogram({ name: "REST APIs", mono: "{ }" }), "{ }");
    assert.equal(monogram({ name: "Lenis" }), "Le");
    assert.equal(monogram({ name: "(x)" }), "x");
  });
});
