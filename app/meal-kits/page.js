import CategoryPage from "../../components/CategoryPage";
import { listingsFor } from "../../lib/diets";

export const metadata = {
  alternates: { canonical: "/meal-kits" },
  title: "Meal Kits Australia (2026): HelloFresh, Marley Spoon & More Compared",
  description: "Compare Australian meal kits and recipe boxes like HelloFresh, Marley Spoon and Dinnerly by price per serve and nutritionist rating.",
};

export default function MealKitsPage() {
  return (
    <CategoryPage
      title="Meal kits"
      hand="compared"
      intro="Recipe boxes with ingredients measured out, so you cook without the shopping. Compare price per serve, ratings and what's on offer."
      items={listingsFor((l) => l.type === "kit")}
      showDiets
    />
  );
}
