import { notFound } from "next/navigation";
import CategoryPage from "../../../components/CategoryPage";
import { DIETS, getDiet, listingsFor } from "../../../lib/diets";
import { YEAR } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return DIETS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const diet = getDiet(slug);
  if (!diet) return {};
  const n = listingsFor(diet.match).length;
  return {
    title: `${diet.title} Australia (${YEAR}): ${n} Options Compared`,
    description: `Compare ${n} ${diet.title.toLowerCase()} options in Australia by price per serve and nutritionist rating, with WellHub discount codes.`,
    alternates: { canonical: `/diet/${slug}` },
  };
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
