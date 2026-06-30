import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "SMILE House Project",
  description: "Help us build SMILE House, a dedicated respite facility for families across Lanarkshire.",
};

export default function SmileHousePage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">SMILE House Project</h1>
        <p className="text-black text-lg max-w-2xl">
          Our biggest dream: a dedicated respite facility in Lanarkshire where families can rest,
          recharge, and feel supported.
        </p>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [Content coming soon. Stephen to supply SMILE House vision, progress update, and fundraising target.]
        </p>
        <div className="mt-8 text-center">
          <DonateButton size="lg" label="Support SMILE House" />
        </div>
      </Section>
    </>
  );
}
