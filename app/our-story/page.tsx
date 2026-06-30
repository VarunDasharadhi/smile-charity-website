import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story behind SMILE Children's Charity. Justin, Charlotte, and the families who made it happen.",
};

export default function OurStoryPage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Our Story</h1>
        <p className="text-black text-lg max-w-2xl">
          SMILE was founded in memory of Justin, and in honour of families like Charlotte&apos;s.
          Families who needed more support than the system could give them.
        </p>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [Content coming soon. Stephen to supply Justin and Charlotte&apos;s story, photos, and founding timeline.]
        </p>
        <div className="mt-8 text-center">
          <DonateButton size="md" />
        </div>
      </Section>
    </>
  );
}
