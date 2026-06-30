import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SMILE Children's Charity, our mission, and the team behind us.",
};

export default function AboutPage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">About SMILE</h1>
        <p className="text-black text-lg max-w-2xl">
          We support families of children with disabilities and serious illness across Lanarkshire,
          giving them a break, a community, and a reason to smile.
        </p>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [Content coming soon. Stephen to supply About Us copy, trustee bios, and charity overview.]
        </p>
        <div className="mt-8 text-center">
          <DonateButton size="md" />
        </div>
      </Section>
    </>
  );
}
