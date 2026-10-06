import { notFound } from "next/navigation";
import CategoryPage from "../../../components/CategoryPage";
import { DIETS, getDiet, listingsFor } from "../../../lib/diets";

export const dynamicParams = false;

export function generateStaticParams() {
  return DIETS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const diet = getDiet(slug);
  return diet ? { title: diet.title, description: diet.intro } : {};
}

export default async function DietPage({ params }) {
  const { slug } = await params;
  const diet = getDiet(slug);
  if (!diet) notFound();
  return (
    <CategoryPage
      title={diet.title}
      hand={diet.hand}
      intro={diet.intro}
      note={diet.note}
      items={listingsFor(diet.match)}
      exclude={[slug]}
      defaultSort={diet.sort ?? "rating"}
      current={slug}
      showDiets
    />
  );
}
