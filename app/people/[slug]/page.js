import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import { allAuthors, getAuthor, allGuides } from "../../../lib/content";
import { abs } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return allAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) return {};
  return { title: a.name, description: a.bio[0]?.slice(0, 155), alternates: { canonical: `/people/${slug}` } };
}

export default async function PersonPage({ params }) {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) notFound();
  const articles = allGuides().filter((g) => g.reviewedBy === a.slug);
  return (
    <div className="wrap" style={{ paddingTop: 40, maxWidth: 820 }}>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: a.name, jobTitle: a.credential, url: abs(`/people/${slug}`), image: a.photo ? abs(a.photo) : undefined, description: a.bio[0] }} />
      <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        {a.photo && <img src={a.photo} alt={a.name} width="96" height="96" style={{ borderRadius: "50%", objectFit: "cover" }} />}
        <div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>{a.name}</h1>
          <p className="muted" style={{ fontWeight: 600 }}>{a.credential}</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 24, maxWidth: "68ch" }}>
        {a.bio.map((p) => <p key={p}>{p}</p>)}
      </div>
      {articles.length > 0 && (
        <>
          <h2 style={{ marginTop: 40, fontSize: "1.5rem" }}>Reviewed by {a.name}</h2>
          <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12, paddingLeft: "1.2em" }}>
            {articles.map((g) => <li key={g.slug}><Link href={`/${g.slug}`}>{g.title}</Link></li>)}
          </ul>
        </>
      )}
    </div>
  );
}
