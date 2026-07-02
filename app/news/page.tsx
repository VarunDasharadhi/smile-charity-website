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
  {
    category: "Appeal",
    title: "Successful Community Asset Transfer of Canderavon",
    date: "18 March 2026",
    excerpt: "South Lanarkshire Council has formally approved the transfer of Canderavon to SMILE, the foundation for a new respite house, sensory space, and community hub.",
    image: "/images/news-canderavon.jpg",
  },
  {
    category: "Impact",
    title: "Co-Op Local Community Fund Win",
    date: "27 February 2026",
    excerpt: "A Co-op customer won £500 in the member prize draw and kindly nominated SMILE Children's Charity to receive it.",
    image: "/images/news-coop.jpg",
  },
  {
    category: "Impact",
    title: "Free Holistic Therapies for Parent/Carers",
    date: "19 February 2026",
    excerpt: "SMILE has been awarded funding to continue free holistic therapy sessions for unpaid carers of children with serious illness or disabilities, at Hilary's House of Calm.",
    image: "/images/news-holistic.jpg",
  },
  {
    category: "Events",
    title: "We're Taking on the Kiltwalk, Join Team SMILE!",
    date: "23 January 2026",
    excerpt: "Join Team SMILE at the Kiltwalk in Glasgow, Aberdeen, Dundee, or Edinburgh and help raise vital funds for local families.",
    image: "/images/news-kiltwalk.jpg",
  },
  {
    category: "Appeal",
    title: "Women's Guild Visit - Machan's Church in Larkhall",
    date: "3 March 2026",
    excerpt: "We visited the Women's Guild at St Machan's Church in Larkhall, who kindly gifted the charity £50 plus additional donations of £207.",
    image: "/images/news-guild.jpg",
  },
  {
    category: "Appeal",
    title: "£700 Donation From Broadlees Golf",
    date: "14 January 2026",
    excerpt: "Broadlees Golf raised an incredible £700 over the festive period to support SMILE's work with families across Lanarkshire.",
    image: "/images/news-broadlees.jpg",
  },
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
              <PhotoFrame src={a.image} alt={a.title} aspect="video" accentColor="yellow" />
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
