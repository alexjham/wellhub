// Listing data copied from the live wellhub.com.au site, September 2026.
// `url` is left empty until affiliate links are reviewed.

export const STATES = ["NSW", "VIC", "ACT", "QLD", "NT", "SA", "WA", "TAS"];

const except = (...skip) => STATES.filter((s) => !skip.includes(s));
const EAST = ["NSW", "VIC", "ACT", "QLD"];

export const listings = [
  { id: "youfoodz-fueld", brand: "Youfoodz", name: "FUEL'D Meals", type: "ready", price: 10.95, rating: 4.5, states: STATES, tags: ["protein"], deal: "Up to $200 off your first 5 boxes", code: "WH200" },
  { id: "youfoodz-low-cal", brand: "Youfoodz", name: "Low Calorie Plan", type: "ready", price: 8.49, rating: 4.0, states: STATES, tags: ["lowcal"], deal: "Up to $200 off your first 5 boxes", code: "WH200" },
  { id: "youfoodz-veg", brand: "Youfoodz", name: "Vegetarian", type: "ready", price: 8.49, rating: 4.0, states: STATES, tags: ["veg"], deal: "Up to $200 off your first 5 boxes", code: "WH200" },
  { id: "befit-low-cal", brand: "Be Fit Food", name: "Low Calorie", type: "ready", price: 5.95, rating: 4.0, states: STATES, tags: ["lowcal"], deal: "10% off your first order", code: "WELLHUB10" },
  { id: "soulara-vegan", brand: "Soulara", name: "Vegan Meals", type: "ready", price: 10.9, rating: 5.0, states: except("WA"), tags: ["vegan", "veg", "df"], deal: "$240 off across 8 weeks", code: "SOUL240OFF" },
  { id: "macros-df", brand: "MACROS", name: "No Added Dairy", type: "ready", price: 10.5, rating: 4.0, states: except("NT", "TAS"), tags: ["df", "protein"], deal: "$150 off across your first 5 orders", code: "HUB150" },
  { id: "mmc-veg", brand: "My Muscle Chef", name: "Vegetarian", type: "ready", price: 10.95, rating: 4.0, states: except("NT"), tags: ["veg", "protein"], deal: "Up to $120 off your first 6 orders", code: "WELLHUB120" },
  { id: "bondi-halal", brand: "Bondi Meal Prep", name: "Halal Meals", type: "ready", price: 12.9, rating: 4.0, states: EAST, tags: ["halal", "protein"], deal: "10% off your order", code: null },
  { id: "bondi-gf", brand: "Bondi Meal Prep", name: "No Added Gluten", type: "ready", price: 12.9, rating: 4.5, states: EAST, tags: ["gf"], deal: "10% off your order", code: null },
  { id: "dineamic-low-carb", brand: "Dineamic", name: "Low Carb", type: "ready", price: 11.5, rating: 4.5, states: except("ACT", "NT"), tags: ["keto"], deal: "$40 off across your first two boxes", code: null },
  { id: "alifeplus-lchp", brand: "A Life Plus", name: "Low Carb, High Protein", type: "ready", price: 13.0, rating: 4.5, states: except("NT"), tags: ["keto", "protein"], deal: "10 keto meals for $130 a week", code: null },
  { id: "dietlicious-df", brand: "Dietlicious", name: "Dairy Free", type: "ready", price: 13.5, rating: 4.5, states: EAST, tags: ["df"], deal: "$30 off your first order", code: "AFF-MFGK" },
  { id: "dineamic-df", brand: "Dineamic", name: "No Added Dairy", type: "ready", price: 11.0, rating: 4.5, states: except("NT"), tags: ["df"], deal: "$40 off across your first two boxes", code: null },
  { id: "dinnerly", brand: "Dinnerly", name: "Meal Kit", type: "kit", price: 7.49, rating: 4.5, states: STATES, tags: ["family"], deal: "$140 off your first 5 boxes", code: null },
  { id: "dinnerly-veg", brand: "Dinnerly", name: "Vegetarian Kit", type: "kit", price: 7.49, rating: 4.5, states: STATES, tags: ["veg", "family"], deal: "$140 off your first 5 boxes", code: null },
  { id: "hellofresh", brand: "HelloFresh", name: "Meal Kit", type: "kit", price: 10.5, rating: 4.0, states: except("TAS"), tags: ["family"], deal: "Up to $200 off your first 6 boxes", code: "WELLHUBFRESH" },
  { id: "hellofresh-vegan", brand: "HelloFresh", name: "Vegan Kit", type: "kit", price: 10.5, rating: 5.0, states: except("TAS"), tags: ["vegan", "veg", "df"], deal: "Up to $200 off your first 6 boxes", code: "WELLHUBFRESH" },
  { id: "hellofresh-protein", brand: "HelloFresh", name: "High Protein", type: "kit", price: 11.67, rating: 4.0, states: except("TAS"), tags: ["protein", "family"], deal: "Up to $200 off your first 6 boxes", code: "WELLHUBFRESH" },
  { id: "marley-spoon", brand: "Marley Spoon", name: "Meal Kits", type: "kit", price: 10.99, rating: 5.0, states: except("NT", "WA"), tags: ["family"], deal: "$220 off your first 5 boxes", code: null },
  { id: "marley-spoon-veg", brand: "Marley Spoon", name: "Vegetarian", type: "kit", price: 8.5, rating: 4.0, states: except("NT", "WA"), tags: ["veg", "family"], deal: "$220 off your first 5 boxes", code: null },
  { id: "quitelike", brand: "QuiteLike", name: "Meal Kit", type: "kit", price: 9.0, rating: 5.0, states: EAST, tags: ["family"], deal: "Up to $200 off your first 5 boxes", code: "WELLHUB200" },
];

// Deals page: one entry per brand code, from wellhub.com.au/deals.
export const deals = [
  { brand: "Youfoodz", group: "ready", offer: "Up to $200 off your first 5 boxes", code: "WH200", tags: ["New customers"] },
  { brand: "HelloFresh", group: "kit", offer: "Up to $200 off your first 6 boxes", code: "WELLHUBFRESH", tags: ["New customers", "Family"] },
  { brand: "Soulara", group: "ready", offer: "$240 off across 8 weeks", code: "SOUL240OFF", tags: ["Vegan"] },
  { brand: "MACROS", group: "ready", offer: "$150 off across your first 5 orders", code: "HUB150", tags: ["High protein"] },
  { brand: "My Muscle Chef", group: "ready", offer: "Up to $120 off your first 6 orders", code: "WELLHUB120", tags: ["High protein"] },
  { brand: "QuiteLike", group: "kit", offer: "Up to $200 off your first 5 boxes", code: "WELLHUB200", tags: ["NSW, VIC, ACT, QLD"] },
  { brand: "EveryPlate", group: "kit", offer: "Meals from $2.19 per plate", code: "WELLPLATE", tags: ["Budget"] },
  { brand: "Pam Pam Asian Meals", group: "ready", offer: "15% off your first order", code: "WELLHUB15", tags: ["New customers"] },
  { brand: "Be Fit Food", group: "ready", offer: "10% off your first order", code: "WELLHUB10", tags: ["Weight loss"] },
  { brand: "Garden of Vegan", group: "ready", offer: "$30 off a one-off purchase", code: "WELLHUB30", tags: ["Vegan"] },
  { brand: "HerbiDoor", group: "ready", offer: "10% off your order", code: "WELLHUBAU", tags: ["Vegan"] },
  { brand: "Dietlicious", group: "ready", offer: "$30 off your first order", code: "AFF-MFGK", tags: ["Dairy free"] },
  { brand: "The St. Food Co.", group: "ready", offer: "10% off your first order", code: "WELLHUB10", tags: ["New customers"] },
  { brand: "Vitable", group: "supp", offer: "40% off your first month ($20 min. spend)", code: "VITWELSB40", tags: ["Vitamins"] },
  { brand: "SWIISH", group: "supp", offer: "15% off storewide", code: "WELLHUB", tags: ["Wellness"] },
  { brand: "Bush Tucker Blends", group: "supp", offer: "10% off your first order", code: "WELLHUB10", tags: ["Wholefood"] },
  { brand: "Butcher Crowd", group: "other", offer: "$10 off your first box, plus a free cut per box for 12 months", code: "WLLHB10", tags: ["Meat box"] },
  { brand: "TinyBeets Foods", group: "other", offer: "15% off your first order", code: "WELLHUB15", tags: ["Baby & toddler"] },
];
