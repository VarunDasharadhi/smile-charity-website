import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Donate",
  description: "Donate to SMILE Children's Charity. Every pound helps a family in Lanarkshire.",
};

export default function DonatePage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Make a Donation</h1>
        <p className="text-black text-lg max-w-2xl">
          Your donation goes directly to supporting families of children with disabilities and
          serious illness across Lanarkshire. Every amount makes a difference.
        </p>
      </Section>

      <Section>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-gray-600 text-lg italic mb-6">
            [Donation form coming soon. Payment processor to be confirmed with Stephen.
            Will support one-off and monthly giving with Gift Aid declaration.]
          </p>
          <p className="text-sm text-gray-500">
            SMILE Children&apos;s Charity SCIO. Registered charity SC053107
          </p>
        </div>
      </Section>
    </>
  );
}
