// app/families/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";

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
        <div className="max-w-xl mx-auto text-center">
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Wondering what SMILE can offer your own family? See our services, who they are for, and
            how to access them.
          </p>
          <Link
            href="/family-support"
            className="inline-block px-6 py-3 rounded-full bg-teal text-white font-bold hover:bg-teal-dark transition-colors"
          >
            View Family Support
          </Link>
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
