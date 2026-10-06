import CategoryPage from "../../components/CategoryPage";
import { listingsFor } from "../../lib/diets";

export const metadata = {
  title: "Fruit, veg & meat boxes",
  description: "Compare Australian fruit and veg boxes, meat boxes and snack boxes delivered to your door.",
};

export default function FoodBoxesPage() {
  return (
    <CategoryPage
      title="Fruit, veg & meat boxes"
      intro="Fresh produce, meat and pantry boxes delivered, including 'imperfect' produce boxes that cost less."
      items={listingsFor((l) => l.type === "box")}
    />
  );
}
