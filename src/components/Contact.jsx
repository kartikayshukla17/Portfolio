import { memo, useEffect, useRef, useState } from "react";
import { ArrowRight, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_PLACEHOLDER, EMPTY_FORM, TOPICS, clearDraft, describeErrors, getSessionStore, loadDraft, saveDraft, submitContact, validate,
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
  "text-pretty font-display text-[clamp(1.45rem,3.3vw,2.4rem)] font-medium leading-[1.95] text-muted-foreground max-w-[64rem]";
const inline =
  "mx-[0.05em] max-w-full border-0 border-b-2 border-dashed border-accent/60 bg-transparent px-[0.2em] font-[inherit] text-[1em] leading-[1.25] text-foreground caret-accent outline-none transition-colors duration-200 placeholder:text-muted-foreground hover:bg-accent/10 focus:border-solid focus:border-accent focus:bg-accent/10 aria-[invalid=true]:border-solid aria-[invalid=true]:border-red-600 dark:aria-[invalid=true]:border-red-400";

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
  const [form, setForm] = useState(() => loadDraft(getSessionStore()));
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState([]);
  const [copied, setCopied] = useState(false);
  const messageRef = useRef(null);
  const time = useIstTime();
  const topic = TOPICS.find((t) => t.id === form.topic);

  const update = (patch) => {
    setForm((prev) => {
      const next = { ...prev, ...patch };
      saveDraft(getSessionStore(), next);
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
      clearDraft(getSessionStore());
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
              setTimeout(() => document.getElementById("contact-name")?.focus(), 0);
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
                className={cn(inline, form.name.trim() && "border-solid border-accent/50 text-amber-800 dark:text-accent")}
              />{" "}
              from{" "}
              <span className="whitespace-nowrap">
              <AutoSizeInput
                name="company"
                value={form.company}
                onChange={(e) => update({ company: e.target.value })}
                placeholder="company"
                autoComplete="organization"
                aria-label="Company, optional"
                className={cn(inline, form.company.trim() && "border-solid border-accent/50 text-amber-800 dark:text-accent")}
              />
              <span className="ml-1 align-middle font-body text-[0.5em] text-muted-foreground">optional</span>.
              </span>
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
                className={cn(inline, form.email.trim() && "border-solid border-accent/50 text-amber-800 dark:text-accent")}
              />
              .
            </p>

            <div id="contact-error" role="alert" className="mt-3 min-h-6 font-body text-sm text-red-700 dark:text-red-400">
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
                className="w-full resize-y rounded-xl border border-border bg-card/85 p-4 font-body text-base leading-relaxed text-foreground caret-accent outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground hover:border-accent/40 focus:border-accent focus:ring-4 focus:ring-accent/20 aria-[invalid=true]:border-red-600 dark:aria-[invalid=true]:border-red-400"
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
