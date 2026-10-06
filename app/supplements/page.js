import CategoryPage from "../../components/CategoryPage";
import { listingsFor } from "../../lib/diets";

export const metadata = {
  title: "Supplements",
  description: "Compare vitamin subscriptions, protein powder and greens powder in Australia, reviewed by a qualified nutritionist.",
};

export default function SupplementsPage() {
  return (
    <CategoryPage
      title="Supplements"
      hand="compared"
      intro="Vitamin subscriptions, protein powder and greens powder. Supplements don't replace a balanced diet; talk to your GP or pharmacist if you take medicines."
      items={listingsFor((l) => l.type === "supp")}
    />
  );
}
