import catalogue from "./catalogue.json";

const NEED = {
  veg: ["vegetarian", "vegetarian"], vegan: ["vegan", "vegan"], gf: ["gluten-free", "gluten free"],
  df: ["dairy-free", "dairy free"], keto: ["keto-low-carb", "low carb"], halal: ["halal", "halal"],
};

const meals = catalogue.filter((l) => (l.type === "ready" || l.type === "kit") && l.rating);

// Rank listings against quiz answers. Diet needs and state are hard filters;
// meal type is relaxed when fewer than two listings survive it.
export function matchListings({ goal, how, needs = [], who, state }) {
  const wanted = needs.filter((n) => NEED[n]);
  let pool = meals.filter(
    (l) => l.states.includes(state) && wanted.every((n) => l.diets.includes(NEED[n][0])),
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
    if (goal === "lose" && l.diets.includes("weight-loss")) { score += 3; why.push("weight-loss plan"); }
    if (goal === "muscle" && l.diets.includes("high-protein")) { score += 3; why.push("high protein"); }
    if (goal === "time" && l.type === "ready") { score += 2; why.push("no cooking"); }
    if (goal === "healthy" && l.rating >= 4.5) { score += 1.5; why.push("top nutritionist rating"); }
    if (who === "family" && l.diets.includes("family")) { score += 1.5; why.push("family-size boxes"); }
    if (l.code) score += 0.5;
    score -= l.price * (goal === "money" ? 0.6 : 0.12);
    wanted.forEach((n) => why.push(NEED[n][1]));
    if (goal === "money" && l.price < 9) why.push("low price per serve");
    return { ...l, score, why };
  });

  scored.sort((a, b) => b.score - a.score);
  // One result per brand keeps the shortlist varied.
  const seen = new Set();
  const results = scored.filter((l) => !seen.has(l.brand) && seen.add(l.brand)).slice(0, 3);
  return { results, relaxed };
}
