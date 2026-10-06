import CategoryPage from "../../components/CategoryPage";
import { listingsFor } from "../../lib/diets";

export const metadata = {
  title: "Ready-made meal delivery",
  description: "Compare Australian ready-made meal delivery services by price per serve, nutritionist rating and diet.",
};

export default function MealsPage() {
  return (
    <CategoryPage
      title="Ready-made meals"
      hand="compared"
      intro="Heat-and-eat meals delivered to your door. Filter by state and diet, or pick a diet below for a closer look."
      items={listingsFor((l) => l.type === "ready")}
      showDiets
    />
  );
}
