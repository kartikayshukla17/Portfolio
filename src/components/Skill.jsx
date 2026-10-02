import { memo, useMemo, useState } from "react";
import { flattenSkills } from "@/lib/skills";
import { cn } from "@/lib/utils";
import IconCloud from "./skills/IconCloud";
import SkillTable from "./skills/SkillTable";

const Skill = memo(({ skills }) => {
  const items = useMemo(() => flattenSkills(skills), [skills]);
  const [active, setActive] = useState(null);
  const toggle = (id) => setActive((current) => (current === id ? null : id));

  return (
    <section className="relative bg-transparent px-5 py-16 sm:px-6 sm:py-24 lg:px-12 lg:py-28" id="skills">
      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 className="mb-6 text-left font-display text-4xl font-bold text-foreground md:text-5xl">
          Core <span className="font-normal text-muted-foreground">technologies.</span>
        </h2>

        <div role="group" aria-label="Filter by category" className="mb-6 flex flex-wrap gap-2">
          {skills.map((group) => (
            <button
              key={group.id}
              type="button"
              aria-pressed={active === group.id}
              onClick={() => toggle(group.id)}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 font-body text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent pointer-coarse:min-h-11",
                active === group.id
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-foreground hover:border-accent/60"
              )}
            >
              {group.category}
              <span className={active === group.id ? "opacity-80" : "text-muted-foreground"}>{group.items.length}</span>
            </button>
          ))}
        </div>

        <IconCloud items={items} activeId={active} />
        <SkillTable items={items} activeId={active} />
      </div>
    </section>
  );
});

export default Skill;
