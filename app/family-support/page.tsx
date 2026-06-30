// app/family-support/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Family Support",
  description: "Find out how SMILE Children's Charity can support your family.",
  openGraph: {
    title: "Family Support | SMILE Children's Charity",
    description: "Find out how SMILE can support your family.",
    type: "website",
  },
};

const services = [
  {
    title: "Respite breaks",
    description: "[Full description of respite provision. Stephen to supply]",
    eligibility: "[Eligibility criteria. Stephen to supply]",
  },
  {
    title: "Family activities",
    description: "[Full description of family activities. Stephen to supply]",
    eligibility: "[Eligibility criteria. Stephen to supply]",
  },
  {
    title: "Financial grants",
    description: "[Full description of grant provision. Stephen to supply]",
    eligibility: "[Eligibility criteria. Stephen to supply]",
  },
  {
    title: "Community support",
    description: "[Full description of community support. Stephen to supply]",
    eligibility: "[Eligibility criteria. Stephen to supply]",
  },
];

const steps = [
  { step: "1", title: "Get in touch", description: "Contact us by phone, email, or through the form on our Contact page." },
  { step: "2", title: "Tell us about your family", description: "We will have a conversation to understand your situation and what support would help most." },
  { step: "3", title: "We get to work", description: "Our team puts together a plan tailored to your family's needs." },
];

export default function FamilySupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Family Support"
        title="We are here for your family."
        subtitle="Find out what SMILE can offer and how to access support for your family."
        bg="teal"
      />

      <Section>
        <SectionHeading eyebrow="Our Services" title="What SMILE can provide." />
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div key={s.title} className="border border-gray-100 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-xl bg-teal mb-4" />
              <h3 className="font-heading font-bold text-black text-xl mb-3">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{s.description}</p>
              <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
                <span className="font-semibold text-black">Who can access this:</span> {s.eligibility}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Not sure if you qualify?"
        subtext="Get in touch and we will talk through what we can do for your family. There is no obligation."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        bg="teal"
      />

      <Section bg="gray">
        <SectionHeading eyebrow="How to Access Support" title="Three simple steps." />
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

      <CTABanner
        heading="Help us support more families."
        subtext="Your donation funds the services families rely on."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Volunteer"
        secondaryHref="/volunteer"
        bg="yellow"
      />
    </>
  );
}
