import { memo, useCallback } from "react";
import { ContactProvider, useContact } from "../context/ContactContext";
import ConfirmationModal from "./ConfirmationModal";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";

const fieldClass =
  "w-full min-h-11 rounded-lg border border-border bg-background p-4 text-base text-foreground font-body placeholder:text-slate-500 outline-none transition-colors duration-200 focus:border-accent focus-visible:outline-none";

const ContactForm = memo(function ContactForm() {
  const { form, setForm, openModal } = useContact();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, [setForm]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    openModal();
  }, [openModal]);

  return (
    <section className="relative overflow-x-clip bg-transparent px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32" id="contact">
      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 className="mb-3 text-left font-display text-4xl font-bold text-foreground sm:text-5xl">
          Get in <span className="font-normal text-muted-foreground">touch.</span>
        </h2>
        <p className="mb-10 max-w-lg font-body text-sm text-slate-500 dark:text-slate-400 sm:mb-14">
          Need something built? Email me.
        </p>

        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div>
              <p className="mb-1 font-body text-sm text-muted-foreground">Location</p>
              <p className="font-body font-medium text-foreground">Remote / Global</p>
            </div>
            <div>
              <p className="mb-1 font-body text-sm text-muted-foreground">Email</p>
              <a
                href="mailto:kartikayshukla17@gmail.com"
                className="font-body font-medium text-foreground underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
              >
                kartikayshukla17@gmail.com
              </a>
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com/kartikayshukla17"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-foreground transition-colors duration-200 hover:text-accent"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/kartikay-shukla-27357a243/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-foreground transition-colors duration-200 hover:text-accent"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-7">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="font-body text-sm text-muted-foreground">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="font-body text-sm text-muted-foreground">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  autoComplete="email"
                  inputMode="email"
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="font-body text-sm text-muted-foreground">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={handleChange}
                placeholder="What this is about"
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="font-body text-sm text-muted-foreground">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="What do you need built?"
                className={`${fieldClass} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-foreground px-10 py-4 font-body text-[16px] font-medium text-background transition-opacity duration-200 hover:opacity-85 sm:w-auto"
            >
              Send message
            </button>
          </form>
        </div>
      </div>

      <ConfirmationModal />
    </section>
  );
});

export default function Contact() {
  return (
    <ContactProvider>
      <ContactForm />
    </ContactProvider>
  );
}
