# Portfolio design decisions

Running log of what's been decided. Newest at the bottom. "Mockup" files live in the parent folder (`learn in public/`) and are throwaway; every decision below is marked **Shipped** once it is in `src/`.

## 1. Background: blueprint grid (decided 2026-10-02)

- **Choice:** fine 48px grid in the theme's line color, with an amber (`38 90% 55%`) brighter grid revealed in a ~11rem radius around the cursor.
- **Replaces:** the current "stamp" background (`.page-stamps` in `src/index.css`).
- **Why:** quieter than the stamps, reads as "builder", works in light and dark, cheap to render (two CSS gradients + one mask, no images).
- **Constraints:** respect `prefers-reduced-motion` (spotlight is cursor-driven, not animated); keep text contrast on top of the grid.
- **Reference mockup:** `backgrounds-mockup.html`, variant 3.
- **Status:** Shipped 2026-10-02.

## 2. Skills section: icon cloud + periodic table (decided 2026-10-02)

- **Choice:** a 3D draggable icon cloud as the hero visual, with the "periodic table" grid (numbered tiles with logo + name) beneath as the scannable list.
- **Replaces:** the plain pill list in `src/components/Skill.jsx`.
- **Why:** the cloud is memorable but hard to read on its own; the table is scannable but forgettable. Together they cover both. Category filter (Frontend / Backend / Tools & Practices) dims the rest in both views.
- **Icons:** one logo per skill on a light rounded tile so dark logos (Next.js, Express, GitHub) stay visible in both themes. Devicon + Simple Icons CDNs in the mockup; for the real build, self-host the SVGs in `public/` rather than depending on a CDN. Lenis and REST APIs have no logo, so use a monogram.
- **Implementation plan:** hand-port, no new dependencies (do not run `shadcn add @magicui/icon-cloud`, as there is no `components.json` and it would run `init` and can rewrite `src/index.css` tokens; Magic UI's version also needs `react-icon-cloud`).
- **Reference mockup:** `skills-icons-mockup.html` (views 1 and 4).
- **Status:** Shipped 2026-10-02.

## Rejected

- Skills as bento grid (`skills-bento-mockup.html`): "didn't like it". Do not revisit unless asked.
- Other skills layouts from `skills-mockup.html` (spec sheet, stack diagram, package.json, editorial rows, node map).

## 3. Projects: "Run it yourself" cover for projects without a screenshot (decided 2026-10-02)

- **Choice:** where a project has no `image`, the cover is a terminal block with a copy button for `git clone <repo>`, followed by `cd`, `npm install`, `npm run dev` lines. Replaces the "Preview unavailable" placeholder.
- **Buttons:** dropped the disabled "Offline" and "Private" buttons. Source-only projects get a primary "Read the source" button plus a quiet "No live demo yet"; projects with no repo show "Source is private".
- **Why:** the old badge read like something broke and the disabled buttons were dead ends. This hands the visitor a next step.
- **Open item:** the `npm install` / `npm run dev` lines are a template. Confirm each repo (Notarize Doctor, OffClock, HealthCare+) actually runs from a fresh clone, or edit its lines.
- **Shipped:** yes, in `src/components/Projects.jsx` (`RunItCover`).

## 4. Projects: list order and removals (decided 2026-10-02)

- **CruxIO first**, rest in previous order: Notarize Doctor, OffClock, B2B Marketplace, FirmCommand, HealthCare+, VisionaryAI.
- **B2B Marketplace: kept.** It was briefly removed because its repo/demo show the Verchool name, then restored (strong backend, decent UI). **Open item:** decide how to handle the Verchool name (rename in the repo/demo, or confirm it's fine under the MOU/NDA) before promoting it publicly.
- **Shipped:** yes.

## 5. Contact: sentence form (decided 2026-10-02)

- **Choice:** "Hi Kartikay, I'm [name] from [company]. I'd like to talk about [topic chips]. You can reach me at [email]." plus a details box. Replaces the Full name / Email / Subject / Message form.
- **Details:** inline fields auto-size and turn amber when filled; the chosen topic changes the message prompt and quick-add chips; a single error line names what's missing and focuses it; after sending, the sentence stays as a filled-in letter with a confirmation (no pop-up); drafts persist in `sessionStorage` until sent; strip below with availability dot, live IST time, copy-email, GitHub, LinkedIn.
- **Why:** shorter path to a reply, friendlier tone, no required Subject, readable placeholders (>=4.5:1), and sets expectations after sending.
- **Open items:** "Available for work" and "within 1-2 days" are placeholder claims; set to what's true. Keep the existing Web3Forms submit in `ConfirmationModal.jsx` logic; remove the pop-up once ported.
- **Reference mockup:** `contact-sentence-mockup.html`. **Status:** Shipped 2026-10-02 (`src/components/Contact.jsx`, `src/lib/contact.js`; pop-up and context removed).

## 6. Smooth cursor (decided 2026-10-02) and button direction (in progress)

- **Smooth cursor:** installed `@magicui/smooth-cursor` (`src/components/ui/smooth-cursor.jsx`, adds the `motion` dependency) and mounted it in `src/App.jsx`. Native cursor is hidden site-wide via `html.has-smooth-cursor` (`src/index.css`) only on fine-pointer, hover-capable devices and when reduced motion is off. Touch devices and reduced-motion users keep the normal cursor. The older `CustomCursor.jsx` (dot + ring) was not mounted and is unused.
- **Buttons:** the three custom directions (machined / keycap / rim light) were rejected. Trying `@magicui/shimmer-button` (`src/components/ui/shimmer-button.jsx`, installed, not yet used anywhere). Preview and tuning: `shimmer-button-mockup.html`. Not decided.
- **Tooling note:** to let `shadcn add` run, a minimal `components.json` was added (JSX, `@` alias, `src/index.css`). The CLI added `@custom-variant dark` and the shimmer keyframes to `src/index.css`; nothing else changed.

## 7. Primary button: Shimmer button settings (decided 2026-10-02)

- **Choice:** Magic UI `ShimmerButton` with **pill** shape, **amber** shimmer (`#f5b942`), **black** base, **6s** speed. Used for the one main action per view (hero CTA, Send message, project-card "Read the source").
- **Status:** component installed (`src/components/ui/shimmer-button.jsx`), settings chosen and applied across the site (see decision 8).

## 8. Secondary button: link with arrow chip (decided 2026-10-02, shipped)

- **Choice:** the "Link" secondary: text label with an always-visible hairline underline (affordance on touch) plus arrow, paired with the shimmer primary. Replaces the pill-shaped "Get in touch".
- **Refinement chosen:** "Chip": the arrow sits in a circle that fills amber and turns to a diagonal arrow on hover. Component: `src/components/ui/link-button.jsx`.
- **One size for all buttons (user request):** 40px tall, 14px text, no separate "small" (44px on touch screens). Applies to `ShimmerButton` and `LinkButton` so pairs always line up.
- **Shipped:** Hero ("Start a project" shimmer + "See the work" link), mobile header "Hire Me", Send message in `Contact.jsx` (the old confirmation pop-up was later removed), project cards (Live app / Read the source shimmer + Source link). The liquid-metal shader button is no longer used (file left in place).
- **Not shipped:** the icon-only button (unused in the site).

## 9. About: portrait + story (decided 2026-10-02, shipped)

- **Choice:** "Hi, I'm Kartikay." with a B&W portrait (sticky on wide screens), a three-paragraph story, a 3-fact strip (role at Verchool Platforms, B.Tech IT at JIIT 2025, 3 products shipped) and Start a project / GitHub / LinkedIn buttons. Replaces "What I build."
- **Why:** engineer-facing credibility from checkable facts and a real photo; the story's through-line is the user's own reason: moved down the stack to own the whole system and make the technical decisions.
- **Photo:** B&W (user's own edit) at `public/kartikay.webp`, 937x1406, WebP q92, 148 KB. The source was a chat copy; if the original B&W file exists, re-export from it at 1024x1536 for slightly more detail.
- **Constraints:** Verchool content kept to resume level (NDA); link to https://verchool.ai. Résumé link intentionally omitted (PDF contains a phone number; add only if wanted).
- **To confirm:** "iOS at Origins, 2023" is in the Journey section but not on the résumé.
- **Reference mockup:** `about-mockup.html`. Layout 2 (byline) not used.

## 10. Hero: byline with portrait (decided 2026-10-02, shipped)

- **Choice:** small round portrait (amber ring), name, "Full Stack Developer at Verchool Platforms · Noida, India" (link to verchool.ai) and an "Available for work" dot, above the headline. Replaces "Kartikay Shukla — available". About stays directly below the hero.
- **Why:** answers "who is this and why trust them" on the first screen without competing with the headline.
- **Open item:** "Available for work" must stay true.
- **Reference mockup:** `hero-portrait-mockup.html` (variant 1). **Plan:** `docs/superpowers/plans/2026-10-02-portfolio-redesign.md` (Task 1). Avatar: `public/kartikay-avatar.webp` (192px square crop).
