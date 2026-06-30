import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news and updates from SMILE Children's Charity.",
};

export default function NewsPage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Latest News</h1>
        <p className="text-black text-lg max-w-2xl">
          Updates, announcements, and stories from SMILE.
        </p>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [News articles will appear here. The charity team can add and update these directly once the CMS is set up.]
        </p>
      </Section>
    </>
  );
}
