// Old wellhub.com.au paths that redirect to each /diet/[slug] page.
exports.DIETS = [
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
