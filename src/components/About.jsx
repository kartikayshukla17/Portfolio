import { memo } from "react";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";

const links = [
  { href: "https://github.com/kartikayshukla17", label: "GitHub", Icon: GitHubIcon },
  { href: "https://www.linkedin.com/in/kartikay-shukla-27357a243/", label: "LinkedIn", Icon: LinkedInIcon },
];

const About = () => (
  <section
    className="relative mx-auto max-w-7xl overflow-x-clip px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    id="about"
  >
    <h2 className="mb-10 max-w-3xl text-left font-display text-4xl font-bold tracking-tight text-foreground sm:mb-14 sm:text-5xl md:text-6xl">
      What I <span className="font-normal text-muted-foreground">build.</span>
    </h2>

    <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-16">
      <div className="flex flex-col gap-5 md:col-span-7">
        <p className="font-display text-lg font-bold leading-snug text-foreground sm:text-2xl">
          I build the whole product, not just the UI.
        </p>
        <p className="max-w-[65ch] font-body text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Developer at Verchool Platforms. OffClock, Notarize Doctor, and CruxIO are mine.
          I take a product from the database through to a tap that does what you expected.
        </p>
      </div>

      <div className="flex flex-col gap-1 md:col-span-5">
        {links.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 cursor-pointer items-center justify-between border-b border-border py-3 text-foreground transition-colors duration-200 hover:text-accent"
          >
            <span className="flex items-center gap-3">
              <Icon className="h-5 w-5" />
              <span className="font-body text-sm font-medium sm:text-base">{label}</span>
            </span>
            <span className="material-symbols-outlined text-base text-muted-foreground" aria-hidden="true">
              arrow_forward
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default memo(About);
