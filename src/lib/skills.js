export const iconPath = (icon) => `/skills/${icon}.svg`;

export const monogram = (item) =>
  item.mono ?? item.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2);

export const flattenSkills = (groups) =>
  groups.flatMap((group) =>
    group.items.map((item) => ({ ...item, categoryId: group.id, category: group.category }))
  );

export const isDimmed = (item, activeId) => activeId != null && item.categoryId !== activeId;

// Fibonacci sphere: n roughly evenly spaced unit vectors.
export function spherePoints(n) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const t = golden * i;
    return { x: Math.cos(t) * r, y, z: Math.sin(t) * r };
  });
}

// Rotate about the x axis by rx, then the y axis by ry. Returns a new point.
export function rotate(p, rx, ry) {
  const y1 = p.y * Math.cos(rx) - p.z * Math.sin(rx);
  const z1 = p.y * Math.sin(rx) + p.z * Math.cos(rx);
  const x2 = p.x * Math.cos(ry) + z1 * Math.sin(ry);
  const z2 = -p.x * Math.sin(ry) + z1 * Math.cos(ry);
  return { x: x2, y: y1, z: z2 };
}
