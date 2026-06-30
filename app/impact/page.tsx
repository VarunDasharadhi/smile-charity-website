// app/impact/page.tsx
import type { Metadata } from "next";
import { Home, Users, HandCoins, CalendarHeart } from "lucide-react";
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
  { name: "Respite breaks", description: "[Impact of respite programme. Stephen to supply]", icon: Home },
  { name: "Family activities", description: "[Impact of activities programme. Stephen to supply]", icon: CalendarHeart },
  { name: "Financial grants", description: "[Impact of grant programme. Stephen to supply]", icon: HandCoins },
  { name: "Community events", description: "[Impact of community events. Stephen to supply]", icon: Users },
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
