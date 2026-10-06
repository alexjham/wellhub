import CategoryPage from "../../../components/CategoryPage";
import s from "../../../components/category.module.css";

export const metadata = {
  title: "Creatine",
  description: "Compare creatine supplements in Australia, reviewed by a qualified nutritionist.",
};

// Add creatine listings to lib/catalogue.json with type "supp" and sub "creatine".
export default function CreatinePage() {
  return (
    <CategoryPage
      title="Creatine"
      hand="compared"
      intro="Creatine is one of the most researched sports supplements, and it's no longer just for the gym crowd. We're comparing Australian creatine brands on price per serve, quality testing and what's in the tub."
      note="Supplements don't replace a balanced diet. Check with your GP or pharmacist before starting creatine, especially if you have kidney problems or take medicines."
      items={[]}
      links={[{ href: "/supplements", label: "All supplements" }, { href: "/supplements/creatine", label: "Creatine", isNew: true, current: true }]}
    >
      <div className={s.empty}>
        <h2>Brands coming soon</h2>
        <p>Our nutritionist is reviewing creatine brands now. We'll list them here with price per serve and any WellHub codes.</p>
      </div>
    </CategoryPage>
  );
}
