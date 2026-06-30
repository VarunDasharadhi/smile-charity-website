import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Legacy & Will Partnerships",
  description: "Leave a lasting gift to SMILE Children's Charity and support families for generations to come.",
};

export default function LegacyPage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Leave a Legacy</h1>
        <p className="text-black text-lg max-w-2xl">
          A gift in your will is one of the most powerful ways to support SMILE long into the future.
        </p>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [Content coming soon. Stephen to supply legacy giving information and how to include SMILE in a will.]
        </p>
        <div className="mt-8 text-center">
          <DonateButton size="md" label="Find Out More" />
        </div>
      </Section>
    </>
  );
}
