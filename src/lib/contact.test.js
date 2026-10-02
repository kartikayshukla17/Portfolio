import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  EMPTY_FORM, TOPICS, buildPayload, clearDraft, describeErrors, getSessionStore, loadDraft, saveDraft, submitContact, validate,
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
    const res = await submitContact({ ...good, botcheck: "x" }, { accessKey: "K", fetchImpl: async () => { called = true; return { status: 200 }; } });
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

describe("getSessionStore", () => {
  it("returns the storage when it is available", () => {
    const store = { getItem() {} };
    assert.equal(getSessionStore({ sessionStorage: store }), store);
  });
  it("returns null instead of throwing when reading sessionStorage is blocked", () => {
    const win = { get sessionStorage() { throw new Error("SecurityError"); } };
    assert.equal(getSessionStore(win), null);
  });
  it("returns null when there is no window (server render)", () => {
    assert.equal(getSessionStore(undefined), null);
  });
  it("a null store behaves like blocked storage everywhere", () => {
    assert.deepEqual(loadDraft(null), EMPTY_FORM);
    assert.doesNotThrow(() => saveDraft(null, { ...EMPTY_FORM, name: "x" }));
    assert.doesNotThrow(() => clearDraft(null));
  });
});
