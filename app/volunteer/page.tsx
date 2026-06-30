// app/volunteer/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Volunteer with SMILE Children's Charity and help support families across Lanarkshire.",
  openGraph: {
    title: "Volunteer | SMILE Children's Charity",
    description: "Volunteer with SMILE and help support families across Lanarkshire.",
    type: "website",
  },
};

const roles = [
  { title: "Events volunteer", commitment: "[Commitment. Stephen to supply]", description: "[Role description. Stephen to supply]" },
  { title: "Family support volunteer", commitment: "[Commitment. Stephen to supply]", description: "[Role description. Stephen to supply]" },
  { title: "Admin and communications", commitment: "[Commitment. Stephen to supply]", description: "[Role description. Stephen to supply]" },
  { title: "Fundraising volunteer", commitment: "[Commitment. Stephen to supply]", description: "[Role description. Stephen to supply]" },
];

const applySteps = [
  { step: "1", title: "Fill in our form", description: "Tell us a bit about yourself and which role interests you." },
  { step: "2", title: "We get in touch", description: "A member of the SMILE team will reach out within a few days." },
  { step: "3", title: "Get started", description: "Brief induction, then you are part of the SMILE volunteer family." },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Give your time. Change a family's day."
        subtitle="Our volunteers are the heartbeat of SMILE. Whatever you can give, it matters."
        bg="teal"
        ctaLabel="Apply to Volunteer"
        ctaHref="/contact"
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Why Volunteer</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-black mb-6">
              More than just giving time.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Volunteering with SMILE connects you to families doing something remarkable.
              You will meet people, build skills, and know that what you are doing genuinely matters.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              [Additional volunteering copy. Stephen to supply]
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center text-gray-400 text-sm italic">
            [Volunteer photo. Stephen to supply]
          </div>
        </div>
      </Section>

      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>Volunteer Roles</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Find the right role for you.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((r) => (
            <div key={r.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading font-bold text-black text-lg">{r.title}</h3>
                <span className="text-xs text-teal font-semibold bg-teal/10 px-3 py-1 rounded-full whitespace-nowrap ml-3">
                  {r.commitment}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Not sure which role is right for you?"
        subtext="Get in touch and we can find the best way for you to get involved."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        bg="teal"
      />

      <Section>
        <div className="text-center mb-12">
          <SectionLabel>How to Apply</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Three simple steps.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {applySteps.map((s) => (
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
        heading="Ready to volunteer?"
        primaryLabel="Apply Now"
        primaryHref="/contact"
        secondaryLabel="Donate Instead"
        secondaryHref="/donate"
        bg="yellow"
      />
    </>
  );
}
