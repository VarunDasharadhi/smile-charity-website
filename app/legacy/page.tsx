// app/legacy/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import PhotoFrame from "@/components/PhotoFrame";

export const metadata: Metadata = {
  title: "Legacy Giving",
  description: "Leave a lasting gift to SMILE Children's Charity in your will.",
  openGraph: {
    title: "Legacy Giving | SMILE Children's Charity",
    description: "Leave a lasting gift to SMILE in your will.",
    type: "website",
  },
};

const steps = [
  {
    step: "1",
    title: "Speak to a solicitor",
    description: "A solicitor can help you update your will or add a codicil to include a gift to SMILE.",
  },
  {
    step: "2",
    title: "Name SMILE in your will",
    description: "Our full legal name is SMILE Children's Charity SCIO. Charity number SC053107.",
  },
  {
    step: "3",
    title: "Tell us if you wish",
    description: "You are not obligated to, but letting us know means we can thank you personally.",
  },
];

export default function LegacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legacy Giving"
        title="Leave a lasting gift."
        subtitle="A gift in your will ensures SMILE can keep supporting families for generations to come."
        bg="navy"
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Why Leave a Legacy" title="A gift that outlasts us all." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Legacy gifts are one of the most powerful ways to support SMILE.
              They allow us to plan for the future, invest in long-term projects like SMILE House,
              and keep helping families no matter what the fundraising climate looks like year to year.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Every gift, however large or small, makes a difference. There is no minimum amount.
            </p>
          </div>
          <PhotoFrame alt="Legacy giving" placeholder="[Legacy section image. Stephen to supply]" accentColor="yellow" />
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeading eyebrow="How It Works" title="Three simple steps." />
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-yellow flex items-center justify-center font-heading font-extrabold text-black text-lg mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="font-heading font-bold text-black mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
          <SectionHeading eyebrow="Legal Information" title="Details for your solicitor" size="sm" centered={false} />
          <dl className="space-y-3 text-sm">
            <div className="flex gap-4">
              <dt className="font-semibold text-black min-w-[140px]">Full legal name</dt>
              <dd className="text-gray-600">SMILE Children&apos;s Charity SCIO</dd>
            </div>
            <div className="flex gap-4">
              <dt className="font-semibold text-black min-w-[140px]">Charity number</dt>
              <dd className="text-gray-600">SC053107</dd>
            </div>
            <div className="flex gap-4">
              <dt className="font-semibold text-black min-w-[140px]">Registered address</dt>
              <dd className="text-gray-600">101 Union Street, Larkhall, ML9 1EB</dd>
            </div>
          </dl>
        </div>
      </Section>

      <CTABanner
        heading="Want to find out more?"
        subtext="Get in touch and we can have a confidential conversation about legacy giving."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Donate Today"
        secondaryHref="/donate"
        bg="navy"
      />
    </>
  );
}
