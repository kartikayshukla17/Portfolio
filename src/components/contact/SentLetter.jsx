import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { TOPICS } from "@/lib/contact";
import { LinkButton } from "../ui/link-button";

const Filled = ({ children }) => (
  <span className="border-b-2 border-accent/50 px-[0.15em] text-amber-800 dark:text-accent">{children}</span>
);

export default function SentLetter({ form, replyTime, onAgain }) {
  const topic = TOPICS.find((t) => t.id === form.topic);
  const headingRef = useRef(null);
  // The form that held focus is gone: move focus to the confirmation so it is announced and keyboard users keep their place.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);
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
          <p ref={headingRef} tabIndex={-1} className="font-display text-xl font-semibold text-foreground outline-none">
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
