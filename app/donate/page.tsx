import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import DonationAmountPicker from "@/components/DonationAmountPicker";

export const metadata: Metadata = {
  title: "Donate",
  description: "Donate to SMILE Children's Charity and support families across Lanarkshire.",
  openGraph: {
    title: "Donate | SMILE Children's Charity",
    description: "Donate to SMILE and support families across Lanarkshire.",
    type: "website",
  },
};

const impact = [
  { amount: "£5", description: "Covers the cost of a craft activity for a family day." },
  { amount: "£10", description: "Helps fund transport for a family to attend a SMILE event." },
  { amount: "£25", description: "Contributes to a family respite break." },
  { amount: "£100", description: "Funds a full day of activities for a family." },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Your donation changes lives."
        subtitle="Every pound goes directly to supporting families of children with disabilities and serious illness across Lanarkshire."
        bg="yellow"
      />

      <Section>
        <div className="max-w-xl mx-auto">
          <SectionHeading eyebrow="Choose an amount" title="How much would you like to give?" centered={false} />

          <DonationAmountPicker />

          {/* Processor placeholder */}
          <div className="bg-gray-50 rounded-3xl p-8 text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-sm italic">
              [Payment processor to be integrated. Stripe / PayPal Giving Fund / JustGiving, pending Stephen&apos;s confirmation]
            </p>
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeading eyebrow="Your Impact" title="What your donation does." />
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {impact.map((i) => (
            <div key={i.amount} className="bg-white rounded-2xl p-6 shadow-sm flex gap-4 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-yellow flex items-center justify-center font-heading font-extrabold text-black text-sm">
                {i.amount}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pt-1">{i.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Prefer to fundraise?"
        subtext="Set up your own fundraiser and get your friends and family involved."
        primaryLabel="Start Fundraising"
        primaryHref="/fundraising"
        bg="navy"
      />
    </>
  );
}
