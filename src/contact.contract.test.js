import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const read = (p) => (existsSync(join(dir, p)) ? readFileSync(join(dir, p), "utf8") : "");
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

  it("reaches sessionStorage only through the safe getter (blocked storage must not crash the page)", () => {
    assert.match(contact, /getSessionStore/);
    assert.doesNotMatch(contact, /window\.sessionStorage/);
  });

  it("persists a draft only in sessionStorage and clears it on success", () => {
    assert.match(contact, /sessionStorage|getSessionStore/);
    assert.match(contact, /clearDraft/);
    assert.doesNotMatch(contact, /localStorage/);
  });

  it("shows the sent letter with a way to send another", () => {
    assert.match(contact, /<SentLetter/);
    assert.match(letter, /Send another message/);
    assert.match(letter, /role="status"/);
  });

  it("sizes the inline fields to the sentence they sit in", () => {
    const inline = (contact.match(/const inline =\s*"([^"]*)"/) || [])[1] || "";
    assert.match(inline, /text-\[1em\]/, "inline inputs must inherit the sentence font size");
    assert.match(inline, /leading-\[1\.\d+\]/, "inline inputs need a tight own line height so the underline hugs the text");
  });

  it("announces the result: the confirmation takes focus, and the form gets focus back on reset", () => {
    assert.match(letter, /tabIndex=\{-1\}/);
    assert.match(letter, /\.focus\(\)/);
    assert.match(contact, /getElementById\("contact-name"\)\?\.focus\(\)/);
  });

  it("keeps error and typed text readable in light mode", () => {
    assert.doesNotMatch(contact, /(?<!dark:)text-red-400/, "red-400 on cream is ~2.4:1; use text-red-700 dark:text-red-400");
    assert.match(contact, /text-red-700 dark:text-red-400/);
    assert.doesNotMatch(contact, /placeholder:text-muted-foreground\//, "placeholders must be full-strength muted-foreground (>=4.5:1)");
    assert.match(contact, /text-amber-800 dark:text-accent/);
    assert.match(letter, /text-amber-800 dark:text-accent/);
  });
});
