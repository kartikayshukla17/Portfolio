import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const hero = readFileSync(join(dir, "components/Hero.jsx"), "utf8");
const avatarTag = (hero.match(/<img[^>]*kartikay-avatar\.webp[^>]*>/s) || [""])[0];

describe("hero byline", () => {
  it("shows the avatar with alt text and intrinsic size", () => {
    assert.ok(avatarTag, "an <img> using /kartikay-avatar.webp must exist");
    assert.match(avatarTag, /alt="Portrait of Kartikay Shukla"/);
    assert.match(avatarTag, /width=\{?"?\d+/);
    assert.match(avatarTag, /height=\{?"?\d+/);
  });

  it("does not lazy-load the avatar (it is above the fold)", () => {
    assert.doesNotMatch(avatarTag, /loading="lazy"/);
  });

  it("names the role and links Verchool Platforms to verchool.ai", () => {
    assert.match(hero, /Full Stack Developer at/);
    assert.match(hero, /href="https:\/\/verchool\.ai"[\s\S]*?Verchool Platforms/);
    assert.match(hero, /Noida, India/);
  });

  it("replaces the old kicker line", () => {
    assert.doesNotMatch(hero, /Kartikay Shukla — available/);
    assert.match(hero, /Available for work/);
  });

  it("lets the text column shrink so 320px screens do not overflow", () => {
    assert.match(hero, /data-hero-byline/);
    assert.match(hero, /min-w-0/);
  });
});
