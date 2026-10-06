import catalogue from "./catalogue.json";

// Category pages. `match` picks listings for each page. Old addresses that redirect here live in lib/redirects.js.
const has = (d) => (l) => l.diets.includes(d);
const meals = (l) => l.type === "ready" || l.type === "kit";
const notMuscle = (l) => !/muscle|gain|performance|bulk|ndis/i.test(l.name);

export const DIETS = [
  {
    slug: "weight-loss", label: "Weight loss", title: "Weight loss meal delivery", hand: "compared",
    intro: "Portion-controlled, lower-calorie meals and kits that take the counting out of losing weight. Rated by our nutritionist for balance and fullness, not just calories.",
    match: (l) => meals(l) && l.diets.includes("weight-loss"),
  },
  {
    slug: "glp1-friendly", label: "GLP-1 friendly", title: "GLP-1 friendly meals", hand: "small & satisfying",
    intro: "Smaller, lower-calorie meals with a focus on protein, which suit people whose appetite has dropped on a GLP-1 medicine. These are ready-made plans our nutritionist has flagged as a good fit.",
    note: "These meals aren't a treatment. If you're taking a GLP-1 medicine, check your eating plan with your doctor or dietitian.",
    match: (l) =>
      l.type === "ready" && l.diets.includes("weight-loss") && notMuscle(l) &&
      (l.diets.includes("high-protein") || /low.?cal|calorie|weight|lean|slim|sculpt|portion/i.test(l.name)),
    isNew: true,
  },
  {
    slug: "budget-family", label: "Budget family meals", title: "Budget family meals", hand: "under $9 a serve",
    intro: "Family-friendly meal kits and plans at $9 or less per serve, cheapest first. Most brands drop the price per serve further on bigger boxes and with a discount code.",
    match: (l) => meals(l) && (l.diets.includes("family") || /family/i.test(l.name)) && !/senior/i.test(l.name) && l.price <= 9,
    sort: "price",
    isNew: true,
  },
  {
    slug: "high-protein", label: "High protein", title: "High-protein meal delivery", hand: "compared",
    intro: "Meals built around protein for training, recovery or staying full for longer. Includes the plans previously listed under bodybuilding and workout meals.",
    match: (l) => meals(l) && l.diets.includes("high-protein"),
  },
  {
    slug: "keto-low-carb", label: "Keto & low carb", title: "Keto & low-carb meals", hand: "compared",
    intro: "Low-carb and keto-friendly meal plans and kits. Paleo plans are included too; use the filter to narrow down.",
    match: (l) => meals(l) && (l.diets.includes("keto-low-carb") || l.diets.includes("paleo")),
  },
  {
    slug: "vegan", label: "Vegan", title: "Vegan & plant-based meal delivery", hand: "compared",
    intro: "Fully plant-based meals and kits, with no meat, dairy or eggs.",
    match: (l) => meals(l) && l.diets.includes("vegan"),
  },
  {
    slug: "vegetarian", label: "Vegetarian", title: "Vegetarian meal delivery", hand: "compared",
    intro: "Meat-free meals and kits, including vegan options and a few pescatarian plans.",
    match: (l) => meals(l) && (l.diets.includes("vegetarian") || l.diets.includes("pescatarian")),
  },
  {
    slug: "gluten-free", label: "Gluten free", title: "Gluten-free meal delivery", hand: "compared",
    intro: "Gluten-free and no-added-gluten meals. If you have coeliac disease, check each provider's kitchen practices, as some meals are made where gluten is present.",
    match: (l) => meals(l) && l.diets.includes("gluten-free"),
  },
  {
    slug: "low-fodmap", label: "Low FODMAP & gut health", title: "Low FODMAP & gut-friendly meals", hand: "compared",
    intro: "Low FODMAP meals for people managing IBS, plus gut-friendly options. A dietitian can help you work out which foods suit you.",
    match: (l) => meals(l) && l.diets.includes("low-fodmap"),
  },
  {
    slug: "diabetes-low-salt", label: "Diabetes-friendly & low salt", title: "Diabetes-friendly & low-salt meals", hand: "compared",
    intro: "Meals with less salt and sugar, suited to people managing diabetes or blood pressure. Always follow your own health team's advice.",
    match: (l) => meals(l) && l.diets.includes("diabetes-low-salt"),
  },
  {
    slug: "halal-kosher", label: "Halal & kosher", title: "Halal & kosher meal delivery", hand: "compared",
    intro: "Halal-certified and kosher meal services across Australia. Use the filter to show one or the other.",
    match: (l) => meals(l) && (l.diets.includes("halal") || l.diets.includes("kosher")),
  },
  {
    slug: "seniors", label: "Seniors & home care", title: "Meals for seniors & home care", hand: "compared",
    intro: "Easy, nourishing meals for older Australians, including services approved for Home Care Packages.",
    match: (l) => meals(l) && l.diets.includes("seniors"),
  },
  {
    slug: "ndis", label: "NDIS", title: "NDIS meal delivery", hand: "compared",
    intro: "Meal services that NDIS participants can use. Check with your plan manager about what your plan covers.",
    match: (l) => meals(l) && l.diets.includes("ndis"),
  },
  {
    slug: "frozen", label: "Frozen meals", title: "Frozen & microwave meal delivery", hand: "compared",
    intro: "Meals that keep in the freezer and heat in minutes, for the weeks you don't want to think about dinner.",
    match: (l) => meals(l) && l.diets.includes("frozen"),
  },
  {
    slug: "baby-toddler", label: "Baby & toddler", title: "Baby & toddler food delivery", hand: "compared",
    intro: "Purees, finger foods and toddler meals delivered. Talk to your child health nurse or GP about starting solids.",
    match: (l) => l.type === "baby",
  },
  {
    slug: "cheapest", label: "Cheapest this month", title: "Cheapest meal delivery", hand: "this month",
    intro: "Meal delivery and kits sorted by price per serve, lowest first. Prices are before discount codes, which can bring your first boxes down further.",
    match: meals, sort: "price",
  },
];

export function getDiet(slug) {
  return DIETS.find((d) => d.slug === slug);
}

export function listingsFor(match) {
  return catalogue.filter(match);
}

export { catalogue };
