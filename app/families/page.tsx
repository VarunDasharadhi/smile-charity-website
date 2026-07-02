// app/families/page.tsx
import type { Metadata } from "next";
import { HeartPulse, Sun } from "lucide-react";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import FeatureCard from "@/components/FeatureCard";

export const metadata: Metadata = {
  title: "Meet Our Families",
  description: "Read stories from the families SMILE Children's Charity supports across Lanarkshire.",
  openGraph: {
    title: "Meet Our Families | SMILE Children's Charity",
    description: "Read stories from the families SMILE supports across Lanarkshire.",
    type: "website",
  },
};

const families = [
  { quote: "[Family story. Stephen to supply with consent]", name: "[Family name]", location: "Lanarkshire" },
  { quote: "[Family story. Stephen to supply with consent]", name: "[Family name]", location: "Lanarkshire" },
  { quote: "[Family story. Stephen to supply with consent]", name: "[Family name]", location: "Lanarkshire" },
  { quote: "[Family story. Stephen to supply with consent]", name: "[Family name]", location: "Lanarkshire" },
  { quote: "[Family story. Stephen to supply with consent]", name: "[Family name]", location: "Lanarkshire" },
  { quote: "[Family story. Stephen to supply with consent]", name: "[Family name]", location: "Lanarkshire" },
];

const whatWeOffer = [
  { title: "Holistic Therapy Treatments", description: "Free therapy sessions for unpaid carers, a chance to unwind, recharge, and focus on your own wellbeing.", icon: HeartPulse },
  { title: "Family Days Out", description: "Organised trips, like our annual Blair Drummond Safari Park day out, bringing families together for fun.", icon: Sun },
];

export default function FamiliesPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet Our Families"
        title="Real families. Real stories."
        subtitle="The families we support carry an enormous weight. These are their stories."
        bg="teal"
      />

      <Section>
        <SectionHeading eyebrow="What We Offer" title="How SMILE supports your family." />
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {whatWeOffer.map((item, i) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              tone="teal"
              delay={i * 100}
            />
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Know a family who needs support?"
        subtext="Reach out to us and we will help connect them with what SMILE can offer."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Donate"
        secondaryHref="/donate"
        bg="teal"
      />

      <Section bg="gray">
        <SectionHeading eyebrow="Family Stories" title="Hear from the families we support." />
        <div className="grid md:grid-cols-3 gap-8">
          {families.map((f, i) => (
            <TestimonialCard key={i} quote={f.quote} name={f.name} location={f.location} delay={(i % 3) * 100} />
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Help us support more families."
        subtext="Every donation means another family gets the break they need."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Fundraise"
        secondaryHref="/fundraising"
        bg="yellow"
      />
    </>
  );
}
