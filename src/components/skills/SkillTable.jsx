import { cn } from "@/lib/utils";
import { isDimmed } from "@/lib/skills";
import IconTile from "./IconTile";

// The "periodic table": every skill as a numbered tile. This is the accessible list.
export default function SkillTable({ items, activeId }) {
  return (
    <ul className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(7.4rem,1fr))] gap-2.5">
      {items.map((item, i) => (
        <li
          key={item.name}
          className={cn(
            "flex flex-col gap-2.5 rounded-lg border border-accent/40 bg-card/70 p-3 transition-[opacity,transform,border-color] duration-200 hover:-translate-y-1 hover:border-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0",
            isDimmed(item, activeId) && "opacity-25"
          )}
        >
          <span className="font-body text-[0.65rem] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
          <IconTile item={item} className="h-10 w-10" />
          <span className="font-body text-sm font-medium leading-tight text-foreground">{item.name}</span>
        </li>
      ))}
    </ul>
  );
}
