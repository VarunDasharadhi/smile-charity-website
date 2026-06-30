import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Fundraising",
  description: "Fundraise for SMILE Children's Charity. Ideas, resources, and everything you need to get started.",
};

export default function FundraisingPage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Fundraise for SMILE</h1>
        <p className="text-black text-lg max-w-2xl">
          Whether it&apos;s a sponsored run, a bake sale, or something completely your own,
          every pound you raise helps a family in Lanarkshire.
        </p>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [Content coming soon. Fundraising ideas, downloadable resources, and how to register your fundraiser.]
        </p>
        <div className="mt-8 text-center">
          <DonateButton size="md" label="Start Fundraising" />
        </div>
      </Section>
    </>
  );
}
