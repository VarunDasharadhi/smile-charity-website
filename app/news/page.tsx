import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import PhotoFrame from "@/components/PhotoFrame";

export const metadata: Metadata = {
  title: "News",
  description: "The latest news and updates from SMILE Children's Charity.",
  openGraph: {
    title: "News | SMILE Children's Charity",
    description: "The latest news from SMILE Children's Charity.",
    type: "website",
  },
};

const articles = [
  { category: "Appeal", title: "[Article title. Stephen to supply]", date: "[Date]", excerpt: "[Article excerpt. Stephen to supply]" },
  { category: "Events", title: "[Article title. Stephen to supply]", date: "[Date]", excerpt: "[Article excerpt. Stephen to supply]" },
  { category: "Impact", title: "[Article title. Stephen to supply]", date: "[Date]", excerpt: "[Article excerpt. Stephen to supply]" },
  { category: "Appeal", title: "[Article title. Stephen to supply]", date: "[Date]", excerpt: "[Article excerpt. Stephen to supply]" },
  { category: "Volunteer", title: "[Article title. Stephen to supply]", date: "[Date]", excerpt: "[Article excerpt. Stephen to supply]" },
  { category: "Events", title: "[Article title. Stephen to supply]", date: "[Date]", excerpt: "[Article excerpt. Stephen to supply]" },
];

const categories = ["All", "Appeal", "Events", "Impact", "Volunteer"];

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Latest from SMILE."
        subtitle="Updates, stories, and announcements from SMILE Children's Charity."
        bg="white"
      />

      <Section>
        <div className="flex gap-2 mb-10 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                c === "All"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((a, i) => (
            <Link key={i} href="/news" className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <PhotoFrame alt={a.title} placeholder="[Article image. Stephen to supply]" aspect="video" accentColor="yellow" />
              <div className="p-5">
                <span className="inline-block px-3 py-1 rounded-full bg-yellow text-black text-xs font-bold mb-3">
                  {a.category}
                </span>
                <h3 className="font-heading font-bold text-black text-base mb-2 group-hover:text-yellow-dark transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-3">{a.excerpt}</p>
                <p className="text-gray-400 text-xs">{a.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Stay up to date."
        subtext="Sign up for our newsletter and never miss a story."
        primaryLabel="Subscribe"
        primaryHref="/#newsletter"
        secondaryLabel="Donate"
        secondaryHref="/donate"
        bg="yellow"
      />
    </>
  );
}
