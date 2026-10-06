import catalogue from "./catalogue.json";
import brands from "./brands.json";
import guides from "./guides.json";
import authors from "./authors.json";
import planContent from "./plan-content.json";

const byId = Object.fromEntries(catalogue.map((l) => [l.id, l]));
const brandBySlug = Object.fromEntries(brands.map((b) => [b.slug, b]));

export const STATE_COUNT = 8;
export const TYPE_LABEL = { ready: "Ready-made meals", kit: "Meal kits", box: "Food boxes", baby: "Baby & toddler food", supp: "Supplements" };

export function allBrands() {
  return brands;
}

export function getBrand(slug) {
  const b = brandBySlug[slug];
  if (!b) return null;
  const plans = b.plans.map((id) => byId[id]).filter(Boolean);
  const rated = plans.filter((p) => p.rating);
  const prices = plans.map((p) => p.price).filter(Boolean);
  const states = [...new Set(plans.flatMap((p) => p.states))];
  const withCode = plans.find((p) => p.code);
  const withUrl = plans.find((p) => p.url);
  const withDeal = plans.find((p) => p.deal);
  return {
    ...b,
    plans,
    rating: rated.length ? Math.round((rated.reduce((s, p) => s + p.rating, 0) / rated.length) * 10) / 10 : null,
    minPrice: prices.length ? Math.min(...prices) : null,
    maxPrice: prices.length ? Math.max(...prices) : null,
    states,
    types: [...new Set(plans.map((p) => p.type))],
    diets: [...new Set(plans.flatMap((p) => p.diets))],
    code: withCode?.code ?? null,
    deal: withCode?.deal ?? withDeal?.deal ?? null,
    url: withUrl?.url ?? null,
    reviews: b.reviews.map(getGuide).filter(Boolean),
  };
}

export function getPlan(brandSlug, id) {
  const p = byId[id];
  if (!p || p.brandSlug !== brandSlug) return null;
  return { ...p, html: planContent[id] ?? null };
}

export function allPlans() {
  return catalogue;
}

export function allGuides() {
  return guides;
}

export function getGuide(slug) {
  return guides.find((g) => g.slug === slug) ?? null;
}

export function getAuthorByName(name) {
  return authors.find((a) => a.name === name) ?? null;
}

export function getAuthor(slug) {
  return authors.find((a) => a.slug === slug) ?? null;
}

export function allAuthors() {
  return authors;
}

export function listingsById(ids) {
  return ids.map((id) => byId[id]).filter(Boolean);
}

export function brandHref(slug) {
  return `/brands/${slug}`;
}

export function planHref(p) {
  return `/brands/${p.brandSlug}/${p.id}`;
}

export const DIET_WORDS = {
  "weight-loss": "weight loss", "high-protein": "high protein", "keto-low-carb": "keto & low carb", vegan: "vegan",
  vegetarian: "vegetarian", "gluten-free": "gluten free", "dairy-free": "dairy free", "low-fodmap": "low FODMAP",
  "diabetes-low-salt": "low salt", halal: "halal", kosher: "kosher", seniors: "seniors", ndis: "NDIS", frozen: "frozen",
  paleo: "paleo", family: "family",
};
