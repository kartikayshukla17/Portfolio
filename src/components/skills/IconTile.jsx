import { useState } from "react";
import { cn } from "@/lib/utils";
import { iconPath, monogram } from "@/lib/skills";

// One logo on a light rounded tile (keeps dark logos visible in both themes).
// Falls back to a monogram if the item has no logo or the file fails to load.
export default function IconTile({ item, className, style, ref }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "grid place-items-center rounded-[22%] bg-[#f4f1ea] shadow-[0_2px_10px_rgba(0,0,0,0.25),inset_0_0_0_1px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      {item.icon && !failed ? (
        <img
          src={iconPath(item.icon)}
          alt=""
          draggable={false}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-[62%] w-[62%] object-contain"
        />
      ) : (
        <span aria-hidden="true" className="font-body text-sm font-medium text-[#2a2433]">
          {monogram(item)}
        </span>
      )}
    </div>
  );
}
