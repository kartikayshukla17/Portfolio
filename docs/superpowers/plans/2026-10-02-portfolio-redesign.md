# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the remaining approved redesign in `Portfolio/`: hero byline, blueprint-grid background, icon-cloud + periodic-table skills, and the sentence-form contact section.

**Architecture:** Vite + React 19 single page (`src/App.jsx`) made of section components. Pure logic (skills math, contact validation/submit/draft) goes in `src/lib/*.js` with `node:test` unit tests; UI is covered by source-reading "contract" tests (the repo's existing pattern in `src/projects-scroll.contract.test.js`) plus a build, lint and headless-Chrome screenshot check per task.

**Tech Stack:** React 19, Vite 7, Tailwind 4 (`@config ../tailwind.config.js`), GSAP + Lenis (already wired in `App.jsx`), `motion` (added with the smooth cursor), `lucide-react`, Web3Forms, `node --test`.

**Spec:** `DESIGN-DECISIONS.md` (decisions 1, 2, 5 and 10 are the unshipped ones; 3, 4, 6, 7, 8, 9 are already shipped). Mockups for reference, in the parent folder `learn in public/`: `backgrounds-mockup.html` (variant 3), `skills-icons-mockup.html` (views 1 and 4), `contact-sentence-mockup.html`, `hero-portrait-mockup.html` (variant 1, "Byline").

## Global Constraints

- Amber (`--accent`, 38°) is the only accent colour. No new hues (no purple/teal category colours).
- One button size site-wide (40px tall, 44px on `pointer: coarse`) via `ShimmerButton` (primary) and `LinkButton` (secondary). Do not add new button styles.
- Portrait is the black-and-white `public/kartikay.webp`. The résumé PDF and phone number are never linked or published.
- Copy: "Verchool Platforms" (never bare "Verchool") linking to `https://verchool.ai`; iOS start year is 2023; Verchool work is described only at résumé level (NDA).
- New JS in `src/lib/` imports with relative paths only (no `@/`), so `node --test` can import it. Components may use the `@` alias (`@` = `src`).
- No new runtime dependencies. All motion respects `prefers-reduced-motion`.
- Tests: `npm test` runs `node --test` (auto-discovers `*.test.js`). No test libraries.
- Commit only with the user's go-ahead. Commit steps below show the intended message; run them once the user has approved committing.

## Review Focus

1. Contact submit failure (non-200, network error, missing access key): user sees an error line, keeps everything they typed, and can retry; a double-click sends once. (Task 5 tests, Task 6 contract tests.)
2. `sessionStorage` unavailable or throwing (private window, blocked storage): the form still works with no draft. (Task 5 tests.)
3. Bot-filled honeypot field: appears to succeed but sends nothing. (Task 5 test.)
4. Skills cloud on a phone: vertical swipe must still scroll the page (`touch-pan-y`), reduced-motion users get a still cloud, and a missing icon file falls back to a monogram. One-item and zero-item lists do not crash. (Tasks 3 and 4.)
5. Hero byline at 320px wide: no horizontal overflow, text can wrap, avatar is not lazy-loaded (it is above the fold). (Task 1.)

---

## File Structure

| File | Responsibility |
|---|---|
| `public/kartikay-avatar.webp` (create) | 192×192 square crop of the portrait for the hero byline |
| `src/components/Hero.jsx` (modify) | Replace the "Kartikay Shukla — available" line with the byline |
| `src/hero.contract.test.js` (create) | Contract test for the byline |
| `src/components/ui/blueprint-grid.jsx` (create) | Fixed full-page grid with cursor spotlight (sets `--mx/--my`) |
| `src/index.css` (modify) | Remove `.page-stamps*` rules, add `.blueprint-grid` rules |
| `src/App.jsx` (modify) | Mount `BlueprintGrid` instead of `StampField` |
| `src/background.contract.test.js` (create) | Contract test for the background |
| `src/projects-scroll.contract.test.js` (modify) | Look for `<BlueprintGrid` instead of `<StampField` |
| `src/lib/skills.js` (create) | Pure helpers: sphere points, rotation, flatten, dimming, icon path, monogram |
| `src/lib/skills.test.js` (create) | Unit tests for the above |
| `src/data/skills.js` (modify) | Items become `{ name, icon?, mono? }`, categories get `id` |
| `src/data/skills.test.js` (create) | Data integrity test (icons exist, 21 items) |
| `public/skills/*.svg` (create) | Self-hosted logos |
| `src/components/skills/IconTile.jsx` (create) | One logo tile with monogram fallback |
| `src/components/skills/IconCloud.jsx` (create) | Draggable 3D cloud |
| `src/components/skills/SkillTable.jsx` (create) | Periodic-table grid (the accessible list) |
| `src/components/Skill.jsx` (rewrite) | Section: heading, category filter, cloud, table |
| `src/skills-section.contract.test.js` (create) | Contract test for the skills UI |
| `src/lib/contact.js` (create) | Topics, validate, describeErrors, buildPayload, submitContact, draft storage |
| `src/lib/contact.test.js` (create) | Unit tests for the above |
| `src/components/contact/AutoSizeInput.jsx` (create) | Inline input that sizes to its content |
| `src/components/contact/SentLetter.jsx` (create) | Post-send "letter" view |
| `src/components/Contact.jsx` (rewrite) | Sentence form section |
| `src/contact.contract.test.js` (create) | Contract test for the contact UI |
| `src/components/ConfirmationModal.jsx`, `src/context/ContactContext.jsx` (delete) | Replaced by the inline flow |
| `DESIGN-DECISIONS.md` (modify) | Record decision 10, flip statuses to shipped |

---

### Task 0: Checkpoint the work already done (needs the user's approval to commit)

**Files:** none changed; git only.

- [ ] **Step 1: See what is uncommitted**

Run: `git status --short`
Expected: modified `package.json`, `package-lock.json`, `src/App.jsx`, `src/index.css`, `src/components/{About,ConfirmationModal,Contact,Header,Hero,Projects,Timeline}.jsx`, `src/data/project.js`, `index.html`; untracked `components.json`, `DESIGN-DECISIONS.md`, `docs/`, `public/kartikay.webp`, `src/components/ui/{shimmer-button,link-button,smooth-cursor}.jsx`, plus `.claude/` and `.cursor/` (leave those two alone).

- [ ] **Step 2: Ask the user whether to commit, then commit in five slices** (skip this task if they decline; later tasks still work on the dirty tree)

```bash
git add package.json package-lock.json components.json src/index.css src/App.jsx src/components/ui/shimmer-button.jsx src/components/ui/link-button.jsx src/components/ui/smooth-cursor.jsx
git commit -m "feat(ui): smooth cursor, shimmer and link button components"
git add src/components/Hero.jsx src/components/Header.jsx src/components/Contact.jsx src/components/ConfirmationModal.jsx src/components/Projects.jsx
git commit -m "feat(buttons): apply the button system and run-it-yourself project covers"
git add src/data/project.js
git commit -m "feat(projects): CruxIO first, keep Marketplace"
git add src/components/About.jsx src/components/Timeline.jsx index.html public/kartikay.webp
git commit -m "feat(about): portrait and story, Verchool Platforms, iOS 2023"
git add DESIGN-DECISIONS.md docs/
git commit -m "docs: design decisions log and redesign plan"
```

- [ ] **Step 3: Confirm a clean tree**

Run: `git status --short`
Expected: only `?? .claude/` and `?? .cursor/`.

---

### Task 1: Hero byline

**Files:**
- Create: `public/kartikay-avatar.webp`, `src/hero.contract.test.js`
- Modify: `src/components/Hero.jsx`, `package.json` (add `test` script)

**Interfaces:**
- Consumes: `/kartikay.webp` (existing portrait).
- Produces: `/kartikay-avatar.webp` (192×192), `npm test`.

- [ ] **Step 1: Add the test script**

In `package.json` `"scripts"`, add `"test": "node --test"` after `"lint"`. Result:

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "test": "node --test",
    "preview": "vite preview"
  },
```

Run: `npm test`
Expected: PASS, 2 tests (the existing contract test).

- [ ] **Step 2: Write the failing contract test**

Create `src/hero.contract.test.js`:

```js
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
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test`
Expected: FAIL in `hero byline` (no avatar `<img>`).

- [ ] **Step 4: Make the avatar asset**

```bash
dwebp -quiet public/kartikay.webp -o /tmp/kartikay-full.png
cwebp -quiet -q 90 -m 6 -crop 0 0 937 937 -resize 192 192 /tmp/kartikay-full.png -o public/kartikay-avatar.webp
ls -l public/kartikay-avatar.webp
```
Expected: file exists, well under 30 KB.

- [ ] **Step 5: Replace the kicker with the byline in `src/components/Hero.jsx`**

Replace this block:

```jsx
        <p className="mb-5 font-body text-sm text-muted-foreground">
          Kartikay Shukla — available
        </p>
```

with:

```jsx
        <div data-hero-byline className="mb-6 flex items-center gap-3.5 sm:mb-8 sm:gap-4">
          <img
            src="/kartikay-avatar.webp"
            alt="Portrait of Kartikay Shukla"
            width={192}
            height={192}
            decoding="async"
            className="h-14 w-14 flex-none rounded-full object-cover ring-2 ring-accent ring-offset-2 ring-offset-background sm:h-[4.25rem] sm:w-[4.25rem]"
          />
          <div className="min-w-0">
            <p className="font-body text-base font-semibold text-foreground">Kartikay Shukla</p>
            <p className="font-body text-sm leading-snug text-muted-foreground">
              Full Stack Developer at{" "}
              <a
                href="https://verchool.ai"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-accent/60 decoration-2 underline-offset-[0.2em] transition-colors duration-200 hover:text-accent hover:decoration-accent"
              >
                Verchool Platforms
              </a>{" "}
              · Noida, India
            </p>
            <p className="mt-1 inline-flex items-center gap-2 font-body text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for work
            </p>
          </div>
        </div>
```

- [ ] **Step 6: Run the tests, lint the file, build**

Run: `npm test && npx eslint src/components/Hero.jsx && npm run build`
Expected: tests PASS, no ESLint output for Hero.jsx, build succeeds.

- [ ] **Step 7: Look at it (desktop and 320px)**

```bash
npx vite preview --port 4173 &
sleep 3
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$C" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 --window-size=1280,800 --screenshot=/tmp/hero-d.png http://localhost:4173/
"$C" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 --window-size=320,700 --screenshot=/tmp/hero-m.png http://localhost:4173/
pkill -f "vite preview --port 4173"
```
Open both PNGs. Expected: round portrait with amber ring above the headline, name, role line with the Verchool Platforms link, green availability dot; at 320px nothing is clipped on the right.

- [ ] **Step 8: Commit** (with user's go-ahead)

```bash
git add package.json public/kartikay-avatar.webp src/components/Hero.jsx src/hero.contract.test.js
git commit -m "feat(hero): byline with portrait, role and availability"
```

---

### Task 2: Blueprint grid background

**Files:**
- Create: `src/components/ui/blueprint-grid.jsx`, `src/background.contract.test.js`
- Modify: `src/index.css`, `src/App.jsx`, `src/projects-scroll.contract.test.js`
- Delete: `src/components/ui/stamp-field.jsx`, `public/stamp.svg`, `public/stamp-light.svg`

**Interfaces:**
- Consumes: CSS tokens `--pattern-fg` (line colour) and `--accent` (HSL triplet) already in `src/index.css`.
- Produces: default export `BlueprintGrid` (no props); CSS class `.blueprint-grid`.

- [ ] **Step 1: Update the existing contract test to expect the new component**

In `src/projects-scroll.contract.test.js` change:

```js
    const stampIdx = appSrc.indexOf("<StampField");
```
to
```js
    const stampIdx = appSrc.indexOf("<BlueprintGrid");
```
and change the assertion message `"stamp field must mount outside overflow-clip or sticky breaks"` to `"background grid must mount outside overflow-clip or sticky breaks"`.

- [ ] **Step 2: Write the background contract test**

Create `src/background.contract.test.js`:

```js
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(dir, "index.css"), "utf8");
const app = readFileSync(join(dir, "App.jsx"), "utf8");
const grid = readFileSync(join(dir, "components/ui/blueprint-grid.jsx"), "utf8");

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
    const block = css.match(/\.blueprint-grid\s*\{[^}]*\}/)[0];
    assert.match(block, /pointer-events:\s*none/);
  });

  it("is hidden from assistive tech and skips touch pointers", () => {
    assert.match(grid, /aria-hidden="true"/);
    assert.match(grid, /pointer: coarse/);
  });
});
```

- [ ] **Step 3: Run to verify failure**

Run: `npm test`
Expected: FAIL (no `blueprint-grid.jsx`, so the file read throws; the projects test fails on `<BlueprintGrid`).

- [ ] **Step 4: Create the component**

`src/components/ui/blueprint-grid.jsx`:

```jsx
import { useEffect, useRef } from "react";

// Fixed full-page grid. A brighter amber copy of the grid is revealed around the cursor
// through a radial mask driven by --mx / --my. Touch devices just get the plain grid.
const BlueprintGrid = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let x = -9999;
    let y = -9999;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      queue();
    };
    const onLeave = () => {
      x = -9999;
      y = -9999;
      queue();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="blueprint-grid" aria-hidden="true" />;
};

export default BlueprintGrid;
```

- [ ] **Step 5: Swap the CSS**

Run this once from the repo root to replace the stamp rules:

```bash
python3 - <<'EOF'
p = "src/index.css"
s = open(p).read()
a = s.index("  .page-stamps {")
b = s.index("  .page-grain {")
new = """  .blueprint-grid {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 0;
    --mx: -9999px;
    --my: -9999px;
    background-image:
      linear-gradient(var(--pattern-fg) 1px, transparent 1px),
      linear-gradient(90deg, var(--pattern-fg) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .blueprint-grid::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(hsl(var(--accent) / 0.6) 1px, transparent 1px),
      linear-gradient(90deg, hsl(var(--accent) / 0.6) 1px, transparent 1px);
    background-size: 48px 48px;
    -webkit-mask-image: radial-gradient(circle 11rem at var(--mx) var(--my), #000, transparent 100%);
    mask-image: radial-gradient(circle 11rem at var(--mx) var(--my), #000, transparent 100%);
  }

"""
open(p, "w").write(s[:a] + new + s[b:])
EOF
```

- [ ] **Step 6: Swap the component in `src/App.jsx`**

Replace `import StampField from "./components/ui/stamp-field";` with `import BlueprintGrid from "./components/ui/blueprint-grid";` and replace `<StampField />` with `<BlueprintGrid />`.

- [ ] **Step 7: Delete the dead files**

```bash
grep -rn "stamp" src public --include=* -l | grep -v "^src/components/ui/stamp-field.jsx"
```
Expected: no output other than files you are about to delete (`public/stamp.svg`, `public/stamp-light.svg` do not reference themselves). Then:

```bash
git rm -q src/components/ui/stamp-field.jsx public/stamp.svg public/stamp-light.svg
```

- [ ] **Step 8: Run tests, lint, build**

Run: `npm test && npx eslint src/App.jsx src/components/ui/blueprint-grid.jsx && npm run build`
Expected: all PASS, no ESLint output, build succeeds.

- [ ] **Step 9: Look at it in both themes**

```bash
npx vite preview --port 4173 &
sleep 3
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$C" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 --window-size=1280,800 --screenshot=/tmp/bg-dark.png http://localhost:4173/
pkill -f "vite preview --port 4173"
```
Open `/tmp/bg-dark.png`. Expected: faint 48px grid across the page, text fully readable. (Light theme: toggle with the site's sun icon in a real browser and confirm the grid is still faint and text contrast is unchanged. Check cursor spotlight by hovering.)

- [ ] **Step 10: Commit** (with user's go-ahead)

```bash
git add -A src public
git commit -m "feat(bg): blueprint grid with cursor spotlight replaces the stamp field"
```

---

### Task 3: Skills data, icons and pure helpers

**Files:**
- Create: `src/lib/skills.js`, `src/lib/skills.test.js`, `src/data/skills.test.js`, `public/skills/*.svg`
- Modify: `src/data/skills.js`

**Interfaces:**
- Produces (`src/lib/skills.js`):
  - `iconPath(icon: string): string` → `/skills/${icon}.svg`
  - `monogram(item: {name: string, mono?: string}): string`
  - `flattenSkills(groups): Array<{name, icon?, mono?, categoryId, category}>`
  - `isDimmed(item, activeId: string|null): boolean`
  - `spherePoints(n: number): Array<{x,y,z}>` (unit vectors)
  - `rotate(p: {x,y,z}, rx: number, ry: number): {x,y,z}` (new point)
- Produces (`src/data/skills.js`): default export `[{ id, category, items: [{ name, icon?, mono? }] }]`.

- [ ] **Step 1: Write the failing helper tests**

Create `src/lib/skills.test.js`:

```js
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
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test`
Expected: FAIL (`Cannot find module './skills.js'`).

- [ ] **Step 3: Implement `src/lib/skills.js`**

```js
export const iconPath = (icon) => `/skills/${icon}.svg`;

export const monogram = (item) =>
  item.mono ?? item.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2);

export const flattenSkills = (groups) =>
  groups.flatMap((group) =>
    group.items.map((item) => ({ ...item, categoryId: group.id, category: group.category }))
  );

export const isDimmed = (item, activeId) => activeId != null && item.categoryId !== activeId;

// Fibonacci sphere: n roughly evenly spaced unit vectors.
export function spherePoints(n) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const t = golden * i;
    return { x: Math.cos(t) * r, y, z: Math.sin(t) * r };
  });
}

// Rotate about the x axis by rx, then the y axis by ry. Returns a new point.
export function rotate(p, rx, ry) {
  const y1 = p.y * Math.cos(rx) - p.z * Math.sin(rx);
  const z1 = p.y * Math.sin(rx) + p.z * Math.cos(rx);
  const x2 = p.x * Math.cos(ry) + z1 * Math.sin(ry);
  const z2 = -p.x * Math.sin(ry) + z1 * Math.cos(ry);
  return { x: x2, y: y1, z: z2 };
}
```

- [ ] **Step 3b: Run the helper tests**

Run: `npm test`
Expected: PASS for `src/lib/skills.test.js`.

- [ ] **Step 4: Write the failing data test**

Create `src/data/skills.test.js`:

```js
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
```

Run: `npm test`
Expected: FAIL (`skills` has no `id`, items are strings).

- [ ] **Step 5: Download the logos into `public/skills/`**

```bash
mkdir -p public/skills
D=https://cdn.jsdelivr.net/gh/devicons/devicon/icons
get() { curl -fsSL "$2" -o "public/skills/$1.svg" && echo "ok  $1" || { rm -f "public/skills/$1.svg"; echo "MISS $1"; }; }
get react "$D/react/react-original.svg"
get nextjs "$D/nextjs/nextjs-original.svg"
get javascript "$D/javascript/javascript-original.svg"
get typescript "$D/typescript/typescript-original.svg"
get html5 "$D/html5/html5-original.svg"
get css3 "$D/css3/css3-original.svg"
get tailwindcss "$D/tailwindcss/tailwindcss-original.svg"
get nodejs "$D/nodejs/nodejs-original.svg"
get express "$D/express/express-original.svg"
get mongodb "$D/mongodb/mongodb-original.svg"
get postgresql "$D/postgresql/postgresql-original.svg"
get prisma "$D/prisma/prisma-original.svg"
get firebase "$D/firebase/firebase-original.svg"
get nestjs "$D/nestjs/nestjs-original.svg"
get github "$D/github/github-original.svg"
get electron "$D/electron/electron-original.svg"
get githubactions "$D/githubactions/githubactions-original.svg"
get hono "https://cdn.simpleicons.org/hono/E36002"
get gsap "https://cdn.simpleicons.org/greensock/0AE448"
ls public/skills | wc -l
```
Expected: 19 `ok` lines. For any `MISS`, remove that skill's `icon` field in Step 6 (it will render its monogram, which is the designed fallback).

- [ ] **Step 6: Rewrite `src/data/skills.js`**

```js
// Icons are self-hosted in public/skills/<icon>.svg. Items without `icon` render a monogram.
const skills = [
  {
    id: "frontend",
    category: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "JavaScript (ES6+)", icon: "javascript", mono: "JS" },
      { name: "TypeScript", icon: "typescript" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
  },
  {
    id: "backend",
    category: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
      { name: "REST APIs", mono: "{ }" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Prisma", icon: "prisma" },
      { name: "Firebase", icon: "firebase" },
      { name: "Hono", icon: "hono", mono: "Hn" },
      { name: "Nest.js", icon: "nestjs" },
    ],
  },
  {
    id: "tools",
    category: "Tools & Practices",
    items: [
      { name: "Git & GitHub", icon: "github" },
      { name: "Electron", icon: "electron" },
      { name: "CI/CD basics", icon: "githubactions" },
      { name: "GSAP", icon: "gsap", mono: "GS" },
      { name: "Lenis", mono: "Ln" },
    ],
  },
];

export default skills;
```

(`Skill.jsx` currently maps `category.items` as strings; it is rewritten in Task 4, so the site is briefly inconsistent only between Tasks 3 and 4. Do not ship between them.)

- [ ] **Step 7: Run all tests**

Run: `npm test`
Expected: PASS (helper tests and data tests).

- [ ] **Step 8: Commit** (with user's go-ahead)

```bash
git add src/lib/skills.js src/lib/skills.test.js src/data/skills.js src/data/skills.test.js public/skills
git commit -m "feat(skills): self-hosted logos, structured skill data and sphere helpers"
```

---

### Task 4: Skills section UI (icon cloud + periodic table)

**Files:**
- Create: `src/components/skills/IconTile.jsx`, `src/components/skills/IconCloud.jsx`, `src/components/skills/SkillTable.jsx`, `src/skills-section.contract.test.js`
- Modify (rewrite): `src/components/Skill.jsx`

**Interfaces:**
- Consumes: `flattenSkills`, `isDimmed`, `iconPath`, `monogram`, `spherePoints`, `rotate` from `src/lib/skills.js`; `usePrefersReducedMotion` from `src/hooks/useMediaQuery.js`; `cn` from `src/lib/utils.js`; `skills` prop shaped as in Task 3.
- Produces: `<Skill skills={...} />` (unchanged call site in `App.jsx`).

- [ ] **Step 1: Write the failing contract test**

Create `src/skills-section.contract.test.js`:

```js
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(dir, p), "utf8");
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
});
```

Run: `npm test`
Expected: FAIL (files not found).

- [ ] **Step 2: Create `src/components/skills/IconTile.jsx`**

```jsx
import { useState } from "react";
import { cn } from "@/lib/utils";
import { iconPath, monogram } from "@/lib/skills";

// One logo on a light rounded tile (keeps dark logos visible in both themes).
// Falls back to a monogram if the item has no logo or the file fails to load.
export default function IconTile({ item, className, style, ref }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "grid place-items-center rounded-[22%] bg-[#f4f1ea] shadow-[0_2px_10px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      {item.icon && !failed ? (
        <img
          src={iconPath(item.icon)}
          alt=""
          draggable={false}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-[62%] w-[62%] object-contain"
        />
      ) : (
        <span aria-hidden="true" className="font-body text-sm font-medium text-[#2a2433]">
          {monogram(item)}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/skills/SkillTable.jsx`**

```jsx
import { cn } from "@/lib/utils";
import { isDimmed } from "@/lib/skills";
import IconTile from "./IconTile";

// The "periodic table": every skill as a numbered tile. This is the accessible list.
export default function SkillTable({ items, activeId }) {
  return (
    <ul className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(7.4rem,1fr))] gap-2.5">
      {items.map((item, i) => (
        <li
          key={item.name}
          className={cn(
            "flex flex-col gap-2.5 rounded-lg border border-accent/40 bg-card/70 p-3 transition-[opacity,transform,border-color] duration-200 hover:-translate-y-1 hover:border-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0",
            isDimmed(item, activeId) && "opacity-25"
          )}
        >
          <span className="font-body text-[0.65rem] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
          <IconTile item={item} className="h-10 w-10" />
          <span className="font-body text-sm font-medium leading-tight text-foreground">{item.name}</span>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Create `src/components/skills/IconCloud.jsx`**

```jsx
import { useEffect, useMemo, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { isDimmed, rotate, spherePoints } from "@/lib/skills";
import IconTile from "./IconTile";

// Decorative 3D cloud of logos. Drag to spin, hover to pause. The table below is the real list.
export default function IconCloud({ items, activeId }) {
  const hostRef = useRef(null);
  const tileRefs = useRef([]);
  const reduced = usePrefersReducedMotion();
  const points = useMemo(() => spherePoints(items.length), [items.length]);
  const motion = useRef({ pts: points, vx: 0, vy: 0, drag: false, hover: false, lx: 0, ly: 0 });

  useEffect(() => {
    const host = hostRef.current;
    const m = motion.current;
    m.pts = points;
    let raf = 0;

    const draw = () => {
      const radius = Math.max(0, Math.min(host.clientWidth, host.clientHeight) / 2 - 34);
      m.pts.forEach((p, i) => {
        const el = tileRefs.current[i];
        if (!el) return;
        const depth = (p.z + 1.6) / 2.6;
        el.style.transform = `translate(${p.x * radius}px, ${p.y * radius}px) scale(${0.55 + depth * 0.6})`;
        el.style.opacity = String(0.25 + depth * 0.75);
        el.style.zIndex = String(Math.round(depth * 100));
      });
    };

    const tick = () => {
      if (!reduced) {
        const f = m.hover || m.drag ? 0 : 1;
        m.vx *= 0.95;
        m.vy *= 0.95;
        m.pts = m.pts.map((p) => rotate(p, 0.002 * f + m.vx, 0.004 * f + m.vy));
      }
      draw();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [points, reduced]);

  const m = motion.current;
  const handlers = {
    onPointerDown: (e) => {
      m.drag = true;
      m.lx = e.clientX;
      m.ly = e.clientY;
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onPointerMove: (e) => {
      if (!m.drag) return;
      m.vy = (e.clientX - m.lx) * 0.0006;
      m.vx = -(e.clientY - m.ly) * 0.0006;
      m.lx = e.clientX;
      m.ly = e.clientY;
    },
    onPointerUp: () => {
      m.drag = false;
    },
    onPointerEnter: () => {
      m.hover = true;
    },
    onPointerLeave: () => {
      m.hover = false;
    },
  };

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      {...handlers}
      className="relative mx-auto h-[min(70vh,34rem)] w-full max-w-3xl cursor-grab touch-pan-y select-none active:cursor-grabbing"
    >
      {items.map((item, i) => (
        <IconTile
          key={item.name}
          item={item}
          ref={(el) => {
            tileRefs.current[i] = el;
          }}
          className={cn(
            "absolute left-1/2 top-1/2 -ml-[1.7rem] -mt-[1.7rem] h-[3.4rem] w-[3.4rem] will-change-transform transition-[filter] duration-300",
            isDimmed(item, activeId) && "brightness-50 grayscale"
          )}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Rewrite `src/components/Skill.jsx`**

```jsx
import { memo, useMemo, useState } from "react";
import { flattenSkills } from "@/lib/skills";
import { cn } from "@/lib/utils";
import IconCloud from "./skills/IconCloud";
import SkillTable from "./skills/SkillTable";

const Skill = memo(({ skills }) => {
  const items = useMemo(() => flattenSkills(skills), [skills]);
  const [active, setActive] = useState(null);
  const toggle = (id) => setActive((current) => (current === id ? null : id));

  return (
    <section className="relative bg-transparent px-5 py-16 sm:px-6 sm:py-24 lg:px-12 lg:py-28" id="skills">
      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 className="mb-6 text-left font-display text-4xl font-bold text-foreground md:text-5xl">
          Core <span className="font-normal text-muted-foreground">technologies.</span>
        </h2>

        <div role="group" aria-label="Filter by category" className="mb-6 flex flex-wrap gap-2">
          {skills.map((group) => (
            <button
              key={group.id}
              type="button"
              aria-pressed={active === group.id}
              onClick={() => toggle(group.id)}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 font-body text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent pointer-coarse:min-h-11",
                active === group.id
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-foreground hover:border-accent/60"
              )}
            >
              {group.category}
              <span className={active === group.id ? "opacity-80" : "text-muted-foreground"}>{group.items.length}</span>
            </button>
          ))}
        </div>

        <IconCloud items={items} activeId={active} />
        <SkillTable items={items} activeId={active} />
      </div>
    </section>
  );
});

export default Skill;
```

- [ ] **Step 6: Run tests, lint, build**

Run: `npm test && npx eslint src/components/Skill.jsx src/components/skills && npm run build`
Expected: tests PASS, no ESLint output, build succeeds.

- [ ] **Step 7: Look at it**

Screenshot the built site tall enough to include the skills section (the page is about 2600px to the end of it):

```bash
npx vite preview --port 4173 &
sleep 3
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$C" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=8000 --window-size=1280,3400 --screenshot=/tmp/skills-d.png http://localhost:4173/
"$C" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=8000 --window-size=390,5200 --screenshot=/tmp/skills-m.png http://localhost:4173/
pkill -f "vite preview --port 4173"
```
Expected: logos on light tiles floating in a sphere, then a grid of 21 numbered tiles. In a real browser: drag the cloud; click "Backend" and see the other tiles dim in both cloud and table; on a phone, vertical swipe over the cloud scrolls the page.

- [ ] **Step 8: Commit** (with user's go-ahead)

```bash
git add src/components/Skill.jsx src/components/skills src/skills-section.contract.test.js
git commit -m "feat(skills): icon cloud and periodic-table grid with category filter"
```

---

### Task 5: Contact logic (validation, submit, draft)

**Files:**
- Create: `src/lib/contact.js`, `src/lib/contact.test.js`

**Interfaces:**
- Produces:
  - `TOPICS: Array<{ id, label, placeholder, helpers: string[] }>`, `DEFAULT_PLACEHOLDER: string`
  - `EMPTY_FORM: { name, company, email, message, topic, botcheck }` (all `""`)
  - `validate(form): Array<{ field: "name"|"email"|"message", need: string }>`
  - `describeErrors(errors): string`
  - `buildPayload(form, accessKey): { access_key, name, email, subject, message }`
  - `submitContact(form, { accessKey, fetchImpl? }): Promise<{ ok: boolean }>`
  - `loadDraft(storage): form`, `saveDraft(storage, form): void`, `clearDraft(storage): void`

- [ ] **Step 1: Write the failing tests**

Create `src/lib/contact.test.js`:

```js
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  EMPTY_FORM, TOPICS, buildPayload, clearDraft, describeErrors, loadDraft, saveDraft, submitContact, validate,
} from "./contact.js";

const good = { ...EMPTY_FORM, name: "Ada Lovelace", email: "ada@acme.com", message: "We need a dashboard." };

describe("validate", () => {
  it("asks for name, email and message when empty", () => {
    assert.deepEqual(validate(EMPTY_FORM).map((e) => e.field), ["name", "email", "message"]);
  });
  it("rejects a malformed email with its own message", () => {
    const [err] = validate({ ...good, email: "not-an-email" });
    assert.equal(err.field, "email");
    assert.match(err.need, /valid email/);
  });
  it("treats whitespace-only values as empty", () => {
    assert.equal(validate({ ...good, name: "   " })[0].field, "name");
  });
  it("accepts a complete form", () => {
    assert.deepEqual(validate(good), []);
  });
});

describe("describeErrors", () => {
  it("joins one, two and three needs naturally", () => {
    assert.equal(describeErrors([{ need: "your name" }]), "Still needed: your name.");
    assert.equal(describeErrors([{ need: "your name" }, { need: "your email" }]), "Still needed: your name and your email.");
    assert.equal(
      describeErrors([{ need: "your name" }, { need: "your email" }, { need: "a line" }]),
      "Still needed: your name, your email and a line."
    );
  });
});

describe("buildPayload", () => {
  it("builds a subject and prefixes topic and company into the message", () => {
    const p = buildPayload({ ...good, topic: "build", company: "Acme" }, "KEY");
    assert.equal(p.access_key, "KEY");
    assert.equal(p.subject, "Portfolio: A freelance build from Ada Lovelace");
    assert.equal(p.message, "Topic: A freelance build\nCompany: Acme\n\nWe need a dashboard.");
  });
  it("falls back to a generic subject and a bare message", () => {
    const p = buildPayload(good, "KEY");
    assert.equal(p.subject, "Portfolio: New message from Ada Lovelace");
    assert.equal(p.message, "We need a dashboard.");
  });
});

describe("submitContact", () => {
  const ok = async () => ({ status: 200 });
  it("resolves ok on 200 and posts JSON to Web3Forms", async () => {
    let seen;
    const res = await submitContact(good, { accessKey: "K", fetchImpl: async (url, init) => { seen = { url, init }; return { status: 200 }; } });
    assert.deepEqual(res, { ok: true });
    assert.equal(seen.url, "https://api.web3forms.com/submit");
    assert.equal(seen.init.method, "POST");
    assert.equal(JSON.parse(seen.init.body).email, "ada@acme.com");
  });
  it("resolves not-ok on a non-200 response", async () => {
    assert.deepEqual(await submitContact(good, { accessKey: "K", fetchImpl: async () => ({ status: 500 }) }), { ok: false });
  });
  it("resolves not-ok when the network throws", async () => {
    assert.deepEqual(await submitContact(good, { accessKey: "K", fetchImpl: async () => { throw new Error("offline"); } }), { ok: false });
  });
  it("resolves not-ok without calling fetch when no access key is configured", async () => {
    let called = false;
    const res = await submitContact(good, { accessKey: "", fetchImpl: async () => { called = true; return { status: 200 }; } });
    assert.deepEqual(res, { ok: false });
    assert.equal(called, false);
  });
  it("pretends to succeed but sends nothing when the honeypot is filled", async () => {
    let called = false;
    const res = await submitContact({ ...good, botcheck: "x" }, { accessKey: "K", fetchImpl: async () => { called = true; return ok(); } });
    assert.deepEqual(res, { ok: true });
    assert.equal(called, false);
  });
});

describe("draft storage", () => {
  const memory = () => { const d = {}; return { getItem: (k) => d[k] ?? null, setItem: (k, v) => { d[k] = v; }, removeItem: (k) => { delete d[k]; } }; };
  const blocked = { getItem() { throw new Error("denied"); }, setItem() { throw new Error("denied"); }, removeItem() { throw new Error("denied"); } };

  it("round-trips a draft but never stores the honeypot", () => {
    const s = memory();
    saveDraft(s, { ...good, botcheck: "spam" });
    const back = loadDraft(s);
    assert.equal(back.name, "Ada Lovelace");
    assert.equal(back.botcheck, "");
  });
  it("clears the draft", () => {
    const s = memory();
    saveDraft(s, good);
    clearDraft(s);
    assert.deepEqual(loadDraft(s), EMPTY_FORM);
  });
  it("survives blocked storage and corrupt data", () => {
    assert.deepEqual(loadDraft(blocked), EMPTY_FORM);
    assert.doesNotThrow(() => saveDraft(blocked, good));
    assert.doesNotThrow(() => clearDraft(blocked));
    assert.deepEqual(loadDraft({ getItem: () => "{not json" }), EMPTY_FORM);
  });
});

describe("TOPICS", () => {
  it("has unique ids and non-empty labels and placeholders", () => {
    assert.equal(new Set(TOPICS.map((t) => t.id)).size, TOPICS.length);
    for (const t of TOPICS) assert.ok(t.label && t.placeholder);
  });
});
```

Run: `npm test`
Expected: FAIL (`Cannot find module './contact.js'`).

- [ ] **Step 2: Implement `src/lib/contact.js`**

```js
export const WEB3FORMS_URL = "https://api.web3forms.com/submit";
export const DEFAULT_PLACEHOLDER = "What do you need built, and by when?";

export const TOPICS = [
  { id: "role", label: "A full-time role", placeholder: "Role, team, and what you're hoping for.", helpers: ["Role: ", "Team: ", "Location: "] },
  { id: "build", label: "A freelance build", placeholder: DEFAULT_PLACEHOLDER, helpers: ["Timeline: ", "Budget: ", "Links: "] },
  { id: "collab", label: "A collaboration", placeholder: "What are you working on, and where could I help?", helpers: ["Links: "] },
  { id: "hi", label: "Just saying hi", placeholder: "Say anything.", helpers: [] },
];

export const EMPTY_FORM = { name: "", company: "", email: "", message: "", topic: "", botcheck: "" };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function validate(form) {
  const errors = [];
  if (!form.name.trim()) errors.push({ field: "name", need: "your name" });
  const email = form.email.trim();
  if (!email) errors.push({ field: "email", need: "your email" });
  else if (!EMAIL_RE.test(email)) errors.push({ field: "email", need: "a valid email (that one doesn't look right)" });
  if (!form.message.trim()) errors.push({ field: "message", need: "a line about what you need" });
  return errors;
}

export function describeErrors(errors) {
  const needs = errors.map((e) => e.need);
  const list = needs.length > 1 ? `${needs.slice(0, -1).join(", ")} and ${needs[needs.length - 1]}` : needs[0];
  return `Still needed: ${list}.`;
}

export function buildPayload(form, accessKey) {
  const topic = TOPICS.find((t) => t.id === form.topic);
  const lines = [];
  if (topic) lines.push(`Topic: ${topic.label}`);
  if (form.company.trim()) lines.push(`Company: ${form.company.trim()}`);
  const body = form.message.trim();
  return {
    access_key: accessKey,
    name: form.name.trim(),
    email: form.email.trim(),
    subject: `Portfolio: ${topic ? topic.label : "New message"} from ${form.name.trim()}`,
    message: lines.length ? `${lines.join("\n")}\n\n${body}` : body,
  };
}

export async function submitContact(form, { accessKey, fetchImpl = globalThis.fetch } = {}) {
  if (form.botcheck) return { ok: true }; // bots think it worked; nothing is sent
  if (!accessKey) return { ok: false };
  try {
    const res = await fetchImpl(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(buildPayload(form, accessKey)),
    });
    return { ok: res.status === 200 };
  } catch {
    return { ok: false };
  }
}

const DRAFT_KEY = "contact-draft";

export function loadDraft(storage) {
  try {
    const raw = storage.getItem(DRAFT_KEY);
    return raw ? { ...EMPTY_FORM, ...JSON.parse(raw) } : { ...EMPTY_FORM };
  } catch {
    return { ...EMPTY_FORM };
  }
}

export function saveDraft(storage, form) {
  try {
    storage.setItem(DRAFT_KEY, JSON.stringify({ ...form, botcheck: "" }));
  } catch {
    /* storage blocked: the form simply has no draft */
  }
}

export function clearDraft(storage) {
  try {
    storage.removeItem(DRAFT_KEY);
  } catch {
    /* storage blocked */
  }
}
```

- [ ] **Step 3: Run the tests**

Run: `npm test`
Expected: PASS (all `src/lib/contact.test.js` cases).

- [ ] **Step 4: Commit** (with user's go-ahead)

```bash
git add src/lib/contact.js src/lib/contact.test.js
git commit -m "feat(contact): validation, Web3Forms submit and draft storage helpers"
```

---

### Task 6: Contact sentence form (UI)

**Files:**
- Create: `src/components/contact/AutoSizeInput.jsx`, `src/components/contact/SentLetter.jsx`, `src/contact.contract.test.js`
- Modify (rewrite): `src/components/Contact.jsx`
- Delete: `src/components/ConfirmationModal.jsx`, `src/context/ContactContext.jsx`

**Interfaces:**
- Consumes: everything exported from `src/lib/contact.js` (Task 5); `ShimmerButton`, `LinkButton`; `GitHubIcon`, `LinkedInIcon` from `./ui/BrandIcons`; `lucide-react` `ArrowRight`, `Copy`.
- Produces: default export `Contact` (call site in `App.jsx` unchanged, lazy-loaded).

- [ ] **Step 1: Write the failing contract test**

Create `src/contact.contract.test.js`:

```js
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(dir, p), "utf8");
const contact = read("components/Contact.jsx");
const letter = read("components/contact/SentLetter.jsx");

describe("contact sentence form", () => {
  it("is the sentence, not the old four-field form", () => {
    assert.match(contact, /Hi Kartikay, I(&apos;|')m/);
    assert.match(contact, /I(&apos;|')d like to talk about/);
    assert.match(contact, /You can reach me at/);
    assert.doesNotMatch(contact, /name="subject"/);
  });

  it("no longer uses the confirmation pop-up or its context", () => {
    assert.doesNotMatch(contact, /ConfirmationModal|ContactContext|useContact/);
    assert.equal(existsSync(join(dir, "components/ConfirmationModal.jsx")), false);
    assert.equal(existsSync(join(dir, "context/ContactContext.jsx")), false);
  });

  it("uses the shared lib and the configured access key, never a placeholder key", () => {
    assert.match(contact, /submitContact/);
    assert.match(contact, /validate\(/);
    assert.match(contact, /import\.meta\.env\.VITE_WEB3FORMS_ACCESS_KEY/);
    assert.doesNotMatch(contact, /YOUR_WEB3FORMS_ACCESS_KEY/);
  });

  it("announces errors, labels every inline input, and exposes topic state", () => {
    assert.match(contact, /role="alert"/);
    assert.match(contact, /aria-label="Your name"/);
    assert.match(contact, /aria-label="Your email"/);
    assert.match(contact, /aria-pressed=\{form\.topic === /);
  });

  it("blocks a double submit while sending and keeps typed values on failure", () => {
    assert.match(contact, /disabled=\{status === "sending"\}/);
    assert.match(contact, /status === "error"/);
    assert.doesNotMatch(contact, /setForm\(EMPTY_FORM\)[^;]*\n[^\n]*status === "error"/);
  });

  it("persists a draft only in sessionStorage and clears it on success", () => {
    assert.match(contact, /sessionStorage/);
    assert.match(contact, /clearDraft/);
    assert.doesNotMatch(contact, /localStorage/);
  });

  it("shows the sent letter with a way to send another", () => {
    assert.match(contact, /<SentLetter/);
    assert.match(letter, /Send another message/);
    assert.match(letter, /role="status"/);
  });
});
```

Run: `npm test`
Expected: FAIL (`SentLetter.jsx` missing).

- [ ] **Step 2: Create `src/components/contact/AutoSizeInput.jsx`**

```jsx
import { useCallback, useLayoutEffect, useRef } from "react";

// A text input whose width follows its content, so it can sit inside a sentence.
export default function AutoSizeInput({ value, placeholder, className, ...props }) {
  const ref = useRef(null);

  const fit = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const cs = getComputedStyle(el);
    const probe = document.createElement("span");
    probe.style.cssText = `position:absolute;visibility:hidden;white-space:pre;font:${cs.font}`;
    probe.textContent = value || placeholder || "";
    document.body.appendChild(probe);
    el.style.width = `${Math.ceil(probe.getBoundingClientRect().width + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + 6)}px`;
    probe.remove();
  }, [value, placeholder]);

  useLayoutEffect(() => {
    fit();
    document.fonts?.ready.then(fit);
  }, [fit]);

  return <input ref={ref} value={value} placeholder={placeholder} className={className} {...props} />;
}
```

- [ ] **Step 3: Create `src/components/contact/SentLetter.jsx`**

```jsx
import { CheckCircle2 } from "lucide-react";
import { TOPICS } from "@/lib/contact";
import { LinkButton } from "../ui/link-button";

const Filled = ({ children }) => (
  <span className="border-b-2 border-accent/50 px-[0.15em] text-accent">{children}</span>
);

export default function SentLetter({ form, replyTime, onAgain }) {
  const topic = TOPICS.find((t) => t.id === form.topic);
  return (
    <div>
      <p className="max-w-[52rem] text-pretty font-display text-[clamp(1.45rem,3.3vw,2.4rem)] font-medium leading-[1.95] text-muted-foreground">
        Hi Kartikay, I&apos;m <Filled>{form.name.trim()}</Filled>
        {form.company.trim() && (
          <>
            {" "}from <Filled>{form.company.trim()}</Filled>
          </>
        )}
        . I&apos;d like to talk about <Filled>{topic ? topic.label.toLowerCase() : "something"}</Filled>. You can reach
        me at <Filled>{form.email.trim()}</Filled>.
      </p>
      <blockquote className="mt-5 max-w-2xl whitespace-pre-wrap rounded-xl border border-border bg-card/80 p-4 font-body leading-relaxed text-muted-foreground">
        {form.message.trim()}
      </blockquote>
      <div
        role="status"
        className="mt-7 flex max-w-2xl items-start gap-3.5 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4"
      >
        <CheckCircle2 className="mt-0.5 h-6 w-6 flex-none text-emerald-500" aria-hidden="true" />
        <div>
          <p className="font-display text-xl font-semibold text-foreground">
            Sent. Thank you, {form.name.trim().split(" ")[0]}.
          </p>
          <p className="mt-1 font-body text-sm leading-snug text-muted-foreground">
            I&apos;ll reply to {form.email.trim()} within {replyTime}.
          </p>
        </div>
      </div>
      <LinkButton arrow={false} onClick={onAgain} className="mt-3">
        Send another message
      </LinkButton>
    </div>
  );
}
```

- [ ] **Step 4: Rewrite `src/components/Contact.jsx`**

```jsx
import { memo, useEffect, useRef, useState } from "react";
import { ArrowRight, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_PLACEHOLDER, EMPTY_FORM, TOPICS, clearDraft, describeErrors, loadDraft, saveDraft, submitContact, validate,
} from "@/lib/contact";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";
import { ShimmerButton } from "./ui/shimmer-button";
import { LinkButton } from "./ui/link-button";
import AutoSizeInput from "./contact/AutoSizeInput";
import SentLetter from "./contact/SentLetter";

const EMAIL = "kartikayshukla17@gmail.com";
const REPLY_TIME = "1–2 days"; // confirm before launch
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const sentence =
  "text-pretty font-display text-[clamp(1.45rem,3.3vw,2.4rem)] font-medium leading-[1.95] text-muted-foreground max-w-[52rem]";
const inline =
  "mx-[0.05em] max-w-full border-0 border-b-2 border-dashed border-accent/60 bg-transparent px-[0.2em] font-[inherit] text-foreground caret-accent outline-none transition-colors duration-200 placeholder:text-muted-foreground/70 hover:bg-accent/10 focus:border-solid focus:border-accent focus:bg-accent/10 aria-[invalid=true]:border-solid aria-[invalid=true]:border-red-400";

function useIstTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const Contact = () => {
  const [form, setForm] = useState(() => loadDraft(typeof window === "undefined" ? { getItem: () => null } : window.sessionStorage));
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState([]);
  const [copied, setCopied] = useState(false);
  const messageRef = useRef(null);
  const time = useIstTime();
  const topic = TOPICS.find((t) => t.id === form.topic);

  const update = (patch) => {
    setForm((prev) => {
      const next = { ...prev, ...patch };
      saveDraft(window.sessionStorage, next);
      return next;
    });
    setErrors((prev) => prev.filter((e) => !(e.field in patch)));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const found = validate(form);
    setErrors(found);
    if (found.length) {
      document.getElementById(`contact-${found[0].field}`)?.focus();
      return;
    }
    setStatus("sending");
    const { ok } = await submitContact(form, { accessKey: ACCESS_KEY });
    if (ok) {
      clearDraft(window.sessionStorage);
      setStatus("sent");
    } else {
      setStatus("error");
    }
  };

  const addHelper = (text) => {
    const base = form.message && !form.message.endsWith("\n") ? `${form.message}\n` : form.message;
    update({ message: `${base}${text}` });
    messageRef.current?.focus();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied("blocked");
    }
  };

  const isInvalid = (field) => errors.some((e) => e.field === field);

  return (
    <section className="relative overflow-x-clip bg-transparent px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32" id="contact">
      <div className="relative z-10 mx-auto max-w-5xl">
        <h2 className="mb-10 text-left font-display text-4xl font-bold text-foreground sm:mb-14 sm:text-5xl">
          Get in <span className="font-normal text-muted-foreground">touch.</span>
        </h2>

        {status === "sent" ? (
          <SentLetter
            form={form}
            replyTime={REPLY_TIME}
            onAgain={() => {
              setForm({ ...EMPTY_FORM });
              setStatus("idle");
            }}
          />
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <p className={sentence}>
              <label htmlFor="contact-name" className="font-[inherit]">Hi Kartikay, I&apos;m</label>{" "}
              <AutoSizeInput
                id="contact-name"
                name="name"
                value={form.name}
                onChange={(e) => update({ name: e.target.value })}
                placeholder="your name"
                autoComplete="name"
                aria-label="Your name"
                aria-describedby="contact-error"
                aria-invalid={isInvalid("name")}
                className={cn(inline, form.name.trim() && "border-solid border-accent/50 text-accent")}
              />{" "}
              from{" "}
              <AutoSizeInput
                name="company"
                value={form.company}
                onChange={(e) => update({ company: e.target.value })}
                placeholder="company"
                autoComplete="organization"
                aria-label="Company, optional"
                className={cn(inline, form.company.trim() && "border-solid border-accent/50 text-accent")}
              />
              <span className="ml-1 align-middle font-body text-[0.5em] text-muted-foreground">optional</span>.
            </p>

            <p id="contact-topic-label" className={sentence}>I&apos;d like to talk about…</p>
            <div role="group" aria-labelledby="contact-topic-label" className="mb-5 mt-3 flex flex-wrap gap-2.5">
              {TOPICS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={form.topic === t.id}
                  onClick={() => update({ topic: form.topic === t.id ? "" : t.id })}
                  className={cn(
                    "min-h-11 rounded-full border px-5 font-body text-base transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    form.topic === t.id
                      ? "border-accent bg-accent font-semibold text-accent-foreground"
                      : "border-border bg-card text-foreground hover:border-accent/70"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <p className={sentence}>
              You can reach me at{" "}
              <AutoSizeInput
                id="contact-email"
                name="email"
                type="email"
                inputMode="email"
                value={form.email}
                onChange={(e) => update({ email: e.target.value })}
                placeholder="you@company.com"
                autoComplete="email"
                aria-label="Your email"
                aria-describedby="contact-error"
                aria-invalid={isInvalid("email")}
                className={cn(inline, form.email.trim() && "border-solid border-accent/50 text-accent")}
              />
              .
            </p>

            <div id="contact-error" role="alert" className="mt-3 min-h-6 font-body text-sm text-red-400">
              {errors.length > 0 && describeErrors(errors)}
              {status === "error" &&
                errors.length === 0 &&
                `Couldn't send that. Your message is still here, so try again in a minute, or email ${EMAIL}.`}
            </div>

            <div className="mt-6 max-w-2xl">
              <label htmlFor="contact-message" className="mb-2 block font-body text-sm font-medium text-muted-foreground">
                {topic ? "The details" : "Anything else that helps"}
              </label>
              <textarea
                id="contact-message"
                ref={messageRef}
                name="message"
                rows={5}
                value={form.message}
                onChange={(e) => update({ message: e.target.value })}
                placeholder={topic ? topic.placeholder : DEFAULT_PLACEHOLDER}
                aria-describedby="contact-error"
                aria-invalid={isInvalid("message")}
                className="w-full resize-y rounded-xl border border-border bg-card/85 p-4 font-body text-base leading-relaxed text-foreground caret-accent outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/75 hover:border-accent/40 focus:border-accent focus:ring-4 focus:ring-accent/20 aria-[invalid=true]:border-red-400"
              />
              {topic && topic.helpers.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-2" aria-label="Add a prompt to your message">
                  {topic.helpers.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => addHelper(h)}
                      className="min-h-9 rounded-full border border-dashed border-border px-3.5 font-body text-sm text-muted-foreground transition-colors duration-200 hover:border-accent/70 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      + {h.replace(": ", "")}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              tabIndex={-1}
              autoComplete="off"
              name="botcheck"
              aria-hidden="true"
              value={form.botcheck}
              onChange={(e) => update({ botcheck: e.target.value })}
              className="absolute -left-[9999px]"
            />

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <ShimmerButton type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ShimmerButton>
              <span className="font-body text-sm text-muted-foreground">Goes straight to my inbox. I&apos;ll reply from {EMAIL}.</span>
            </div>
          </form>
        )}

        <div className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-6">
          <span className="mr-2 inline-flex items-center gap-2 font-body text-sm font-medium text-foreground">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for work
            {time && <span className="font-normal text-muted-foreground">· {time} IST</span>}
          </span>
          <LinkButton arrow={false} onClick={copyEmail}>
            <span className="inline-flex items-center gap-2">
              <Copy className="h-4 w-4" aria-hidden="true" />
              {copied === true ? "Copied" : copied === "blocked" ? EMAIL : "Copy email"}
            </span>
          </LinkButton>
          <LinkButton href="https://github.com/kartikayshukla17" target="_blank" rel="noreferrer">
            <span className="inline-flex items-center gap-2">
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </span>
          </LinkButton>
          <LinkButton href="https://www.linkedin.com/in/kartikay-shukla-27357a243/" target="_blank" rel="noreferrer">
            <span className="inline-flex items-center gap-2">
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </span>
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
```

- [ ] **Step 5: Delete the replaced files**

```bash
git rm -q src/components/ConfirmationModal.jsx src/context/ContactContext.jsx
rmdir src/context 2>/dev/null || true
```

- [ ] **Step 6: Run tests, lint, build**

Run: `npm test && npx eslint src/components/Contact.jsx src/components/contact && npm run build`
Expected: tests PASS, no ESLint output, build succeeds. (If ESLint flags `react-hooks/set-state-in-effect` on `useIstTime`, keep it: the setState is inside an interval callback and an initial tick; if it still errors, initialise `useState` with the current time string and only update inside `setInterval`.)

- [ ] **Step 7: Look at it and exercise it**

```bash
npx vite preview --port 4173 &
sleep 3
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$C" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=8000 --window-size=1280,4600 --screenshot=/tmp/contact-d.png http://localhost:4173/
"$C" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=8000 --window-size=390,7600 --screenshot=/tmp/contact-m.png http://localhost:4173/
pkill -f "vite preview --port 4173"
```
Expected: the sentence form at the bottom with amber dashed fields, topic chips, shimmer "Send message", strip with availability dot and IST time. In a real browser: submit empty (error line names what's missing, focus jumps to Name), type a bad email, pick a topic and watch the message prompt change, reload mid-draft (values return), complete and send with a real key (letter + confirmation). Without `VITE_WEB3FORMS_ACCESS_KEY`, sending shows the "Couldn't send that…" line and keeps the text.

- [ ] **Step 8: Commit** (with user's go-ahead)

```bash
git add -A src
git commit -m "feat(contact): sentence form with inline confirmation, replacing the pop-up"
```

---

### Task 7: Final verification and records

**Files:**
- Modify: `DESIGN-DECISIONS.md`

- [ ] **Step 1: Full test, lint and build**

Run: `npm test && npm run lint; npm run build`
Expected: all tests PASS; build succeeds; ESLint reports only the five pre-existing problems (`About.jsx` unused `Icon`, none after this plan's About edit if it is gone: re-check; `Header.jsx` exhaustive-deps; `ui/button.jsx` and `context` removal leaves only `ui/button.jsx` react-refresh; `hooks/useMediaQuery.js` set-state-in-effect). Any ESLint problem in a file this plan created or rewrote is a defect: fix it.

- [ ] **Step 2: Design detector on the changed UI (run once)**

```bash
node /Users/kartikayshukla/.claude/skills/impeccable/scripts/detect.mjs --json src/components/Hero.jsx src/components/Skill.jsx src/components/skills src/components/Contact.jsx src/components/contact src/components/ui/blueprint-grid.jsx
```
Expected: no blocking findings. Fix any real ones in one batch; do not loop.

- [ ] **Step 3: One batched visual pass (desktop and mobile, both themes)**

Take full-page screenshots at 1280 and 390 wide (commands in Tasks 1, 4, 6). Check: hero byline, About, skills cloud and table, projects covers, contact. Then in a real browser toggle the theme and confirm text contrast on the grid in light mode, keyboard-tab through the hero, skills filter and contact form (visible focus ring everywhere), and test with the OS "reduce motion" setting on (cloud still, shimmer still, cursor not shown).

- [ ] **Step 4: Update `DESIGN-DECISIONS.md`**

Append decision 10, and change the status lines of decisions 1, 2 and 5 from "Mockup only" to "Shipped" (with the date), and decision 3's "Open item" stays until the clone commands are verified:

```markdown

## 10. Hero: byline with portrait (decided 2026-10-02, shipped)

- **Choice:** small round portrait (amber ring), name, "Full Stack Developer at Verchool Platforms · Noida, India" (link to verchool.ai) and an "Available for work" dot, above the headline. Replaces "Kartikay Shukla — available". About stays directly below the hero.
- **Why:** answers "who is this and why trust them" on the first screen without competing with the headline.
- **Open item:** "Available for work" must stay true.
- **Reference mockup:** `hero-portrait-mockup.html` (variant 1).
```

- [ ] **Step 5: Hand the user the open-items list** (do not guess these)

1. "Available for work" and the contact reply time (`REPLY_TIME` in `Contact.jsx`, currently "1–2 days") are placeholders: confirm or change.
2. Web3Forms: create `.env` with `VITE_WEB3FORMS_ACCESS_KEY=...` locally and set the same variable in Vercel, or the form shows its error line.
3. Verify the `npm install` / `npm run dev` lines on the three project covers (Notarize Doctor, OffClock, HealthCare+) against each repo.
4. B2B Marketplace repo/demo show the Verchool name: rename or confirm under the MOU/NDA.
5. "iOS at Origins, 2023" appears in About and Journey but not on the résumé: confirm.
6. Colour or black-and-white portrait (currently B&W); original B&W file for a sharper export.
7. Check any public Verchool mention (verchool.ai link, role description) against the MOU/NDA.

- [ ] **Step 6: Commit** (with user's go-ahead)

```bash
git add DESIGN-DECISIONS.md
git commit -m "docs: record hero byline and mark redesign decisions shipped"
```

---

## Self-review (done while writing)

- **Spec coverage:** decision 1 (grid) → Task 2; decision 2 (cloud + table) → Tasks 3–4; decision 5 (sentence form) → Tasks 5–6; decision 10 (hero byline) → Task 1; shipped decisions are committed by Task 0 and recorded by Task 7. Fonts, buttons, cursor, projects, About are already in place and only checkpointed.
- **Placeholders:** none. Every "confirm" item is a named open question for the user with a working default in code (`REPLY_TIME`, availability copy).
- **Type consistency:** `flattenSkills` items carry `categoryId`/`category` (Task 3) and are consumed as `item.categoryId` by `isDimmed`, `IconCloud`, `SkillTable` (Task 4). `monogram(item)` takes the item object everywhere (Task 3 tests, Task 4 `IconTile`). Contact `EMPTY_FORM` keys match the form state in Task 6 and the draft helpers in Task 5. `submitContact` returns `{ ok }` in both Task 5 and Task 6. `SentLetter` props `form`, `replyTime`, `onAgain` match its call in `Contact.jsx`.
- **Review Focus:** items 1–3 are exercised by Task 5's unit tests and Task 6's contract tests; item 4 by Task 3's unit tests and Task 4's contract test (`touch-pan-y`, reduced motion, monogram fallback); item 5 by Task 1's contract test.
