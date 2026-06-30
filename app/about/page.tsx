import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SMILE Children's Charity, our mission, values, and the team behind us.",
  openGraph: {
    title: "About Us | SMILE Children's Charity",
    description: "Learn about SMILE Children's Charity, our mission, values, and the team behind us.",
    type: "website",
  },
};

const values = [
  {
    title: "Family first",
    description: "Every decision we make starts with what is best for the families we serve.",
  },
  {
    title: "Community",
    description: "We build connections so no family ever feels isolated in what they are going through.",
  },
  {
    title: "Compassion",
    description: "We listen, we care, and we show up — because that is what families need most.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SMILE"
        title="Supporting families who need it most."
        subtitle="We support families of children with disabilities and serious illness across Lanarkshire, giving them a break, a community, and a reason to smile."
        bg="yellow"
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Our Mission</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-black mb-6">
              Why SMILE exists.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              [Mission statement. Stephen to supply.]
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              [Additional mission copy. Stephen to supply.]
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center text-gray-400 text-sm italic">
            [Team or charity photo. Stephen to supply]
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>Our Values</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            What guides everything we do.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-yellow mb-4" />
              <h3 className="font-heading font-bold text-black text-lg mb-2">{v.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Want to get involved?"
        subtext="There are many ways to support SMILE, from donating to volunteering to fundraising."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Volunteer"
        secondaryHref="/volunteer"
        bg="yellow"
      />

      <Section>
        <div className="text-center mb-12">
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            The people behind SMILE.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-3 flex items-center justify-center text-gray-400 text-sm italic">
                [Photo]
              </div>
              <p className="font-heading font-bold text-black text-sm">[Trustee name]</p>
              <p className="text-gray-500 text-xs">[Role]</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Registered charity SC053107"
        subtext="SMILE Children's Charity SCIO, 101 Union Street, Larkhall, ML9 1EB"
        primaryLabel="Contact Us"
        primaryHref="/contact"
        bg="navy"
      />
    </>
  );
}
