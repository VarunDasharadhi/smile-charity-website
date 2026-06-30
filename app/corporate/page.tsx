import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Corporate Partnerships",
  description: "Partner with SMILE Children's Charity. Support local families and make your business matter.",
};

export default function CorporatePage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Corporate Partnerships</h1>
        <p className="text-black text-lg max-w-2xl">
          Join our growing network of business supporters and make a real difference to
          families across Lanarkshire.
        </p>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [Content coming soon. Partnership packages, current supporters, and how to get in touch.]
        </p>
        <div className="mt-8 text-center">
          <DonateButton size="md" label="Become a Partner" />
        </div>
      </Section>
    </>
  );
}
