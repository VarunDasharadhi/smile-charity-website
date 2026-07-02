// app/family-support/page.tsx
import type { Metadata } from "next";
import { HeartPulse, Sun } from "lucide-react";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

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
    title: "Holistic Therapy Treatments",
    description: "Free holistic therapy sessions for unpaid carers of children with serious illness or disabilities, held at Hilary's House of Calm and funded by the Community Health and Wellbeing Fund, managed by Voluntary Action South Lanarkshire. These sessions support your mental, emotional, and physical wellbeing, helping you manage stress, build emotional resilience, and take time for yourself.",
    eligibility: "Unpaid carers of a child with a serious illness or disability in Lanarkshire. Email smilechildrenscharity@gmail.com to register your interest.",
    icon: HeartPulse,
  },
  {
    title: "Family Days Out",
    description: "Organised trips offering families a day full of adventure, laughter, and relaxation. Our annual Blair Drummond Safari Park day out took 150 people last year, and another trip is planned for 2026, with the date to be announced soon.",
    eligibility: "Families of children with serious illness or disabilities supported by SMILE. Keep an eye on our News page for upcoming dates.",
    icon: Sun,
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
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="group border border-gray-100 rounded-2xl p-8 h-full transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                <span className="w-14 h-14 rounded-2xl bg-teal text-white flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <s.icon className="w-7 h-7" strokeWidth={2} />
                </span>
                <h3 className="relative inline-block font-heading font-bold text-black text-xl mb-3">
                  {s.title}
                  <span
                    className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-yellow rounded-full transition-all duration-300 ease-out group-hover:w-full"
                    aria-hidden="true"
                  />
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">{s.description}</p>
                <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
                  <span className="font-semibold text-black">Who can access this:</span> {s.eligibility}
                </p>
              </div>
            </Reveal>
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
