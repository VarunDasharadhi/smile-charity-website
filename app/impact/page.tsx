// app/impact/page.tsx
import type { Metadata } from "next";
import { HeartPulse, Sun } from "lucide-react";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import WaveDivider from "@/components/WaveDivider";
import AnimatedCounter from "@/components/AnimatedCounter";
import FeatureCard from "@/components/FeatureCard";

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
  { value: "?", label: "Families supported" },
  { value: "?", label: "Events this year" },
  { value: "?", label: "Volunteers" },
  { value: "3", label: "Corporate partners" },
  { value: "?", label: "Raised for SMILE House" },
  { value: "?", label: "Children supported" },
  { value: "?", label: "Nights of respite provided" },
  { value: "?", label: "Years making a difference" },
];

const services = [
  { name: "Holistic Therapy Treatments", description: "Free therapy sessions for unpaid carers, funded by the Community Health and Wellbeing Fund, at Hilary's House of Calm.", icon: HeartPulse },
  { name: "Family Days Out", description: "Organised trips like our annual Blair Drummond Safari Park day out, which brought 150 people together in its most recent year.", icon: Sun },
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

      <Section bg="white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.slice(0, 4).map((s) => (
            <AnimatedCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="By Service" title="Where your support goes." />
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <FeatureCard
              key={s.name}
              icon={s.icon}
              title={s.name}
              description={s.description}
              delay={i * 100}
            />
          ))}
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#FFF8EE" />

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
