import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Family Support",
  description: "Find out how SMILE Children's Charity supports families and how to access help.",
};

export default function FamilySupportPage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Family Support</h1>
        <p className="text-black text-lg max-w-2xl">
          We&apos;re here for families of children with disabilities and serious illness.
          Find out what support we offer and how to get in touch.
        </p>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [Content coming soon. Stephen to supply details of support services, eligibility, and referral process.]
        </p>
        <div className="mt-8 text-center">
          <DonateButton size="md" />
        </div>
      </Section>
    </>
  );
}
