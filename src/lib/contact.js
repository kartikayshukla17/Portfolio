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

// Reading window.sessionStorage itself can throw (blocked site data, sandboxed iframes).
export function getSessionStore(win = typeof window === "undefined" ? undefined : window) {
  try {
    return win ? win.sessionStorage ?? null : null;
  } catch {
    return null;
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
