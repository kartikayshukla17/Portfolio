import { memo, useMemo } from "react";

const Skill = memo(({ skills }) => {
  const flatSkills = useMemo(() => skills.flatMap((s) => s.items), [skills]);

  return (
    <section className="relative bg-transparent px-5 py-16 sm:px-6 sm:py-24 lg:px-12 lg:py-28" id="skills">
      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 className="mb-8 text-left font-display text-4xl font-bold text-foreground md:text-5xl">
          Core <span className="font-normal text-muted-foreground">technologies.</span>
        </h2>

        <div className="flex flex-col gap-8 lg:hidden">
          {skills.map((category) => (
            <div key={category.category}>
              <h3 className="mb-3 px-1 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.items.map((skill) => (
                  <div
                    key={skill}
                    className="inline-flex min-h-11 items-center rounded-lg border border-border/50 bg-background px-4 py-2.5"
                  >
                    <span className="font-body text-sm tracking-wide text-slate-700 dark:text-slate-300">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden max-w-4xl flex-wrap gap-3 pt-2 lg:flex">
          {flatSkills.map((skill) => (
            <div
              key={skill}
              className="rounded-lg border border-border/50 bg-background px-5 py-2.5"
            >
              <span className="font-body text-sm tracking-wide text-slate-700 dark:text-slate-300 md:text-base">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Skill;
