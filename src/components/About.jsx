import { memo } from "react";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";
import { ShimmerButton } from "./ui/shimmer-button";
import { LinkButton } from "./ui/link-button";

const facts = [
  {
    title: (
      <>
        Full Stack Developer,{" "}
        <a
          href="https://verchool.ai"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-accent/60 decoration-2 underline-offset-[0.2em] transition-colors duration-200 hover:text-accent hover:decoration-accent"
        >
          Verchool Platforms
        </a>
      </>
    ),
    detail: "Since April 2026",
  },
  { title: "B.Tech, Information Technology", detail: "JIIT Noida, 2025" },
  { title: "3 products shipped", detail: "Notarize Doctor, OffClock, CruxIO" },
];

const Strong = ({ children }) => <b className="font-semibold text-foreground">{children}</b>;

const About = () => (
  <section
    className="relative mx-auto max-w-7xl overflow-x-clip px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
    id="about"
  >
    <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-14 lg:gap-20">
      {/* Portrait: stays in view while the story scrolls on wider screens */}
      <div className="md:sticky md:top-24 md:col-span-5">
        <figure className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card md:max-w-none">
          <img
            src="/kartikay.webp"
            alt="Portrait of Kartikay Shukla"
            width={937}
            height={1406}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[50%_18%]"
          />
          <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-accent" />
          <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-accent" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-accent" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-accent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
          <figcaption className="absolute inset-x-4 bottom-4 flex justify-between gap-3 font-body text-xs text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
            <span>Kartikay Shukla</span>
          </figcaption>
        </figure>
      </div>

      <div className="md:col-span-7">
        <h2 className="text-left font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Hi, I&apos;m Kartikay<span className="text-muted-foreground">.</span>
        </h2>
        <p className="mb-4 mt-5 max-w-xl text-balance font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          I own systems end to end, from the interface down to the infrastructure.
        </p>

        <div className="flex max-w-[62ch] flex-col gap-4 font-body text-base leading-[1.75] text-slate-600 dark:text-slate-400">
          <p>
            I started in 2023 building <Strong>iOS apps in Swift and SwiftUI</Strong>, and learned quickly that the
            screen is the thinnest layer of a product. I wanted to own the rest: the data model, the servers, the
            infrastructure beneath them, and the trade-offs between each. So I moved down the stack, and I&apos;ve
            built products <Strong>end to end</Strong> ever since.
          </p>
          <p>
            I studied <Strong>Information Technology at JIIT</Strong> (2021–2025), then freelanced in React, Next.js
            and Node, which taught me what it takes to get a system live and keep it there. Since{" "}
            <Strong>April 2026</Strong> I&apos;ve been a Full Stack Developer at{" "}
            <Strong>
              <a
                href="https://verchool.ai"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-accent/60 decoration-2 underline-offset-[0.2em] transition-colors duration-200 hover:text-accent hover:decoration-accent"
              >
                Verchool Platforms
              </a>
            </Strong>
            , where I work on reliability for a live-streaming platform (diagnostics, reconnect flows, capacity
            scaling) and its cross-platform desktop client.
          </p>
          <p>
            Outside work I build the tools I wished existed. <Strong>Notarize Doctor</Strong> catches Mac signing
            failures before CI does, <Strong>OffClock</Strong> tells your household when you&apos;re done for the
            day, and <Strong>CruxIO</Strong> turns crash data into a ranked fix list.
          </p>
        </div>

        <dl className="mt-8 grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card/70 sm:grid-cols-3">
          {facts.map((f, i) => (
            <div
              key={i}
              className="border-b border-border p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <dt className="font-display text-lg font-semibold leading-tight text-foreground">{f.title}</dt>
              <dd className="mt-1 text-sm leading-snug text-muted-foreground">{f.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <ShimmerButton
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start a project
          </ShimmerButton>
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
    </div>
  </section>
);

export default memo(About);
