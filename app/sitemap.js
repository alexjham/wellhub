import { DIETS } from "../lib/diets";
import { allBrands, allGuides, allPlans, allAuthors } from "../lib/content";
import { abs } from "../lib/site";

const UPDATED = new Date("2026-10-07");

export default function sitemap() {
  const page = (path, priority, lastModified = UPDATED) => ({ url: abs(path), lastModified, priority });
  return [
    page("/", 1),
    page("/quiz", 0.9),
    page("/deals", 0.8),
    page("/meals", 0.8),
    page("/meal-kits", 0.8),
    page("/food-boxes", 0.6),
    page("/supplements", 0.7),
    page("/supplements/creatine", 0.5),
    page("/brands", 0.7),
    page("/guides", 0.7),
    ...DIETS.map((d) => page(`/diet/${d.slug}`, 0.8)),
    ...allBrands().map((b) => page(`/brands/${b.slug}`, 0.8)),
    ...allPlans().map((l) => page(`/brands/${l.brandSlug}/${l.id}`, 0.6)),
    ...allGuides().map((g) => page(`/${g.slug}`, 0.7, g.modified ? new Date(g.modified) : UPDATED)),
    ...allAuthors().map((a) => page(`/people/${a.slug}`, 0.4)),
  ];
}
