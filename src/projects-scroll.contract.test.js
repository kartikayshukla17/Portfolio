import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const appSrc = readFileSync(join(dir, "App.jsx"), "utf8");
const projectsSrc = readFileSync(join(dir, "components/Projects.jsx"), "utf8");

describe("projects archive scroll (GitHub main contract)", () => {
  it("keeps overflow-clip on the page shell so position:sticky can pin the archive", () => {
    assert.match(
      appSrc,
      /flex min-h-dvh flex-col overflow-clip/,
      "overflow-x-hidden on an ancestor creates a scroll container and breaks sticky"
    );
    assert.doesNotMatch(appSrc, /overflow-x-hidden/);
    const stampIdx = appSrc.indexOf("<StampField");
    const clipIdx = appSrc.indexOf("overflow-clip");
    assert.ok(
      stampIdx !== -1 && clipIdx !== -1 && stampIdx < clipIdx,
      "stamp field must mount outside overflow-clip or sticky breaks"
    );
  });

  it("turns on the pinned archive at 768px so height, sticky, and wheel-snap stay in sync", () => {
    assert.match(projectsSrc, /innerWidth >= 768/);
    assert.match(projectsSrc, /min-width: 768px/);
    assert.match(projectsSrc, /hidden md:flex md:flex-col sticky top-0 h-screen overflow-hidden/);
    assert.match(projectsSrc, /className="md:hidden /);
    assert.doesNotMatch(
      projectsSrc,
      /hidden md:block lg:hidden/,
      "a tablet-only grid at md–lg desyncs isDesktop from the sticky layout"
    );
  });
});
