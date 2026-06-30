import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Meet Our Families",
  description: "Real stories from families SMILE Children's Charity has supported.",
};

export default function FamiliesPage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Meet Our Families</h1>
        <p className="text-black text-lg max-w-2xl">
          Behind every donation is a real family. Here are some of their stories.
        </p>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [Content coming soon. Stephen to supply family stories, photos (with signed consent for each child), and testimonials.]
        </p>
        <div className="mt-8 text-center">
          <DonateButton size="md" />
        </div>
      </Section>
    </>
  );
}
