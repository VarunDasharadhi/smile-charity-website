// app/impact/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
import AnimatedCounter from "@/components/AnimatedCounter";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "See the difference SMILE Children's Charity makes for families across Lanarkshire.",
  openGraph: {
    title: "Our Impact | SMILE Children's Charity",
    description: "See the difference SMILE makes for families across Lanarkshire.",
    type: "website",
  },
};

const stats = [
  { value: "250+", label: "Families supported" },
  { value: "40+", label: "Events this year" },
  { value: "120+", label: "Volunteers" },
  { value: "10+", label: "Years making a difference" },
  { value: "?", label: "Raised for SMILE House" },
  { value: "?", label: "Children supported" },
  { value: "?", label: "Nights of respite provided" },
  { value: "?", label: "Corporate partners" },
];

const services = [
  { name: "Respite breaks", description: "[Impact of respite programme. Stephen to supply]" },
  { name: "Family activities", description: "[Impact of activities programme. Stephen to supply]" },
  { name: "Financial grants", description: "[Impact of grant programme. Stephen to supply]" },
  { name: "Community events", description: "[Impact of community events. Stephen to supply]" },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title="The difference your support makes."
        subtitle="Every donation, every fundraiser, every volunteer hour — it all adds up to something real."
        bg="yellow"
      />

      <Section bg="yellow">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.slice(0, 4).map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center mb-12">
          <SectionLabel>By Service</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Where your support goes.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s) => (
            <div key={s.name} className="border border-gray-100 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-yellow mb-4" />
              <h3 className="font-heading font-bold text-black text-xl mb-3">{s.name}</h3>
              <p className="text-gray-600 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="gray">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.slice(4).map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Add to our impact."
        subtext="Your donation directly funds the support SMILE provides to families in Lanarkshire."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Fundraise for SMILE"
        secondaryHref="/fundraising"
        bg="yellow"
      />
    </>
  );
}
