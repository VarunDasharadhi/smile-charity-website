// app/families/page.tsx
import type { Metadata } from "next";
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

const whatWeOffer = [
  { title: "Respite breaks", description: "[Description of respite provision. Stephen to supply]" },
  { title: "Family activities", description: "[Description of activities. Stephen to supply]" },
  { title: "Community support", description: "[Description of community programmes. Stephen to supply]" },
  { title: "Practical grants", description: "[Description of grants. Stephen to supply]" },
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatWeOffer.map((item) => (
            <div key={item.title} className="border border-gray-100 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-teal mb-4" />
              <h3 className="font-heading font-bold text-black mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
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
            <TestimonialCard key={i} quote={f.quote} name={f.name} location={f.location} />
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
