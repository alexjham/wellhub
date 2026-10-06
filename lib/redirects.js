// Old wellhub.com.au addresses and where they live now. Used by next.config.js.
const catalogue = require("./catalogue.json");
const brands = require("./brands.json");

const DIETS = [
  { slug: "weight-loss", from: ["/meals/weight-loss-meals", "/meals/low-calorie", "/low-calorie"] },
  { slug: "high-protein", from: ["/meals/high-protein-meals", "/meals/bodybuilding-meals", "/meals/workout-meals"] },
  { slug: "keto-low-carb", from: ["/meals/keto", "/meals/low-carb", "/meals/paleo"] },
  { slug: "vegan", from: ["/meals/vegan", "/meals/plant-based"] },
  { slug: "vegetarian", from: ["/meals/vegetarian", "/meals/pescatarian"] },
  { slug: "gluten-free", from: ["/meals/gluten-free", "/meals/no-gluten-added"] },
  { slug: "low-fodmap", from: ["/meals/low-fodmap"] },
  { slug: "diabetes-low-salt", from: ["/meals/diabetes", "/meals/low-salt", "/meals/low-sugar"] },
  { slug: "halal-kosher", from: ["/meals/halal", "/meals/kosher"] },
  { slug: "seniors", from: ["/meals/senior-meals"] },
  { slug: "ndis", from: ["/meals/ndis"] },
  { slug: "frozen", from: ["/meals/frozen-meal-delivery", "/meals/microwave-meals"] },
  { slug: "baby-toddler", from: ["/baby-food"] },
  { slug: "cheapest", from: ["/cheapest-meal-delivery"] },
];

// Products that no longer have a plan page go to their brand (or the closest listing page).
const RETIRED_PRODUCTS = {
  "everyplate-vegetarian-meal-kit-copy": "/brands/everyplate",
  "lewis-continental-kitchen-kosher-meals": "/diet/halal-kosher",
  "youfoodz-ndis-meals": "/brands/youfoodz",
  "shop": "/meals",
};

// Review posts the old site had already merged into brand pages.
const MERGED_POSTS = {
  "a-nutritionists-review-of-everyplate": "/brands/everyplate",
  "a-nutritionists-review-of-swiish-wellness-products": "/brands/swiish",
  "a-nutritionists-review-of-vitable-powdered-supplements": "/brands/vitable",
  "experts-review-of-vitable-personalised-vitamins-delivered-to-your-door": "/brands/vitable",
  "an-expert-review-of-macros-ready-to-eat-meals": "/brands/macros",
  "nutritionists-review-of-dinnerly-meal-delivery": "/brands/dinnerly",
};

const brandSlugs = new Set(brands.map((b) => b.slug));

function redirects() {
  const out = [];
  const add = (source, destination, permanent = true) => out.push({ source, destination, permanent });
  for (const { slug, from } of DIETS) for (const s of from) add(s, `/diet/${slug}`);
  for (const l of catalogue) add(`/product/${l.id}`, `/brands/${l.brandSlug}/${l.id}`);
  for (const [k, v] of Object.entries(RETIRED_PRODUCTS)) add(`/product/${k}`, v);
  for (const [k, v] of Object.entries(MERGED_POSTS)) add(`/${k}`, v);
  for (const s of brandSlugs) {
    add(`/providers/${s}`, `/brands/${s}`);
    add(`/product-brands/${s}`, `/brands/${s}`);
  }
  add("/providers/:path*", "/brands");
  add("/product-brands/:path*", "/brands");
  add("/meals/meal-kits", "/meal-kits");
  add("/meals/dairy-free", "/meals");
  add("/vitamins", "/supplements");
  add("/protein-powder", "/supplements");
  add("/greens-powder", "/supplements");
  add("/blog", "/guides");
  add("/blog/:path*", "/guides");
  add("/our-story", "/about-us");
  add("/meal-subscriptions", "/meals");
  add("/personalised-meal-subscription", "/meals");
  add("/new-provider", "/list-your-brand");
  add("/sample-page", "/");
  add("/test-author", "/");
  add("/people", "/about-us");
  for (const s of ["lauren", "rose", "holly", "alex-rutkowska", "sheradyn", "zola", "corinne", "ariana"]) add(`/people/${s}`, "/about-us");
  add("/author/:path*", "/about-us");
  add("/product-category/:path*", "/meals");
  add("/quiz-cat", "/quiz");
  add("/meals/page/:n", "/meals");
  add("/shop/:path*", "/meals");
  add("/uncategorized", "/");
  add("/product/dinnerly-gluten-free", "/brands/dinnerly");
  add("/dineamic-review", "/dineamic-meal-review");
  add("/dinnerly-vs-hellofresh", "/dinnerly-vs-hello-fresh");
  add("/my-muscle-chef-vs-youfoodz-expert-comparison", "/youfoodz-vs-my-muscle-chef");
  for (const s of ["/youfoodz-review-nutritionist", "/a-nutritionist-review-of-youfoodz", "/nutritionist-review-youfoodz", "/youfoodz-review-nutritionist-wellhub-au"]) add(s, "/a-nutritionists-review-of-youfoodz");
  return out;
}

module.exports = { redirects, DIETS };
