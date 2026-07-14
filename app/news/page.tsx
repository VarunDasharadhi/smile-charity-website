import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import NewsFilter from "@/components/NewsFilter";

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
    category: "Appeal",
    title: "Women's Guild Visit - Machan's Church in Larkhall",
    date: "3 March 2026",
    excerpt: "We visited the Women's Guild at St Machan's Church in Larkhall, who kindly gifted the charity £50 plus additional donations of £207.",
    image: "/images/news-guild.jpg",
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
    title: "£700 Donation From Broadlees Golf",
    date: "14 January 2026",
    excerpt: "Broadlees Golf raised an incredible £700 over the festive period to support SMILE's work with families across Lanarkshire.",
    image: "/images/news-broadlees.jpg",
  },
];

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
        <NewsFilter articles={articles} />
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
