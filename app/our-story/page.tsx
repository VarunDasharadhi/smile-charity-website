import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Our Story",
  description: "How SMILE was founded — the story of Justin and Charlotte and why they started SMILE Children's Charity.",
  openGraph: {
    title: "Our Story | SMILE Children's Charity",
    description: "How SMILE was founded — the story of Justin and Charlotte.",
    type: "website",
  },
};

const milestones = [
  { year: "[Year]", event: "[Founding milestone. Stephen to supply]" },
  { year: "[Year]", event: "[Growth milestone. Stephen to supply]" },
  { year: "[Year]", event: "[Impact milestone. Stephen to supply]" },
  { year: "[Year]", event: "[SMILE House announcement. Stephen to supply]" },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Born from love. Built for families."
        subtitle="[One-sentence story teaser. Stephen to supply]"
        bg="navy"
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center text-gray-400 text-sm italic">
            [Justin and Charlotte photo. Stephen to supply]
          </div>
          <div>
            <SectionLabel>How It Started</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-black mb-6">
              [Founding story heading. Stephen to supply]
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              [Justin and Charlotte founding story paragraph 1. Stephen to supply]
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              [Founding story paragraph 2. Stephen to supply]
            </p>
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>Our Journey</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            From idea to impact.
          </h2>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-yellow" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="pl-12 relative">
                <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-yellow border-2 border-white" />
                <p className="text-yellow font-heading font-bold text-sm mb-1">{m.year}</p>
                <p className="text-gray-700 text-base">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTABanner
        heading="Be part of the next chapter."
        subtext="Your support helps us reach more families and build SMILE House."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Meet Our Families"
        secondaryHref="/families"
        bg="yellow"
      />

      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center text-gray-400 text-xs italic">
              [Photo {i}. Stephen to supply]
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
