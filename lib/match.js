import { listings } from "./listings";

const NEED_LABELS = { veg: "vegetarian", vegan: "vegan", gf: "gluten free", df: "dairy free", keto: "low carb", halal: "halal" };

// Rank listings against quiz answers. Diet needs and state are hard filters;
// meal type is relaxed when fewer than two listings survive it.
export function matchListings({ goal, how, needs = [], who, state }) {
  const wanted = needs.filter((n) => n !== "none");
  let pool = listings.filter(
    (l) => l.states.includes(state) && wanted.every((n) => l.tags.includes(n)),
  );

  let relaxed = false;
  if (how !== "either") {
    const typed = pool.filter((l) => l.type === how);
    if (typed.length >= 2) pool = typed;
    else relaxed = true;
  }

  const scored = pool.map((l) => {
    let score = l.rating * 2;
    const why = [];
    if (goal === "lose" && l.tags.includes("lowcal")) { score += 3; why.push("lower-calorie plan"); }
    if (goal === "muscle" && l.tags.includes("protein")) { score += 3; why.push("high protein"); }
    if (goal === "time" && l.type === "ready") { score += 2; why.push("no cooking"); }
    if (goal === "healthy" && l.rating >= 4.5) { score += 1.5; why.push("top nutritionist rating"); }
    if (who === "family" && l.tags.includes("family")) { score += 1.5; why.push("family-size boxes"); }
    score -= l.price * (goal === "money" ? 0.6 : 0.12);
    wanted.forEach((n) => why.push(NEED_LABELS[n]));
    if (goal === "money" && l.price < 9) why.push("low price per serve");
    return { ...l, score, why };
  });

  scored.sort((a, b) => b.score - a.score);
  return { results: scored.slice(0, 3), relaxed };
}
