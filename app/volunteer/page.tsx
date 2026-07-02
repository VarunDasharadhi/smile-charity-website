// app/volunteer/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import PhotoFrame from "@/components/PhotoFrame";

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
  { title: "Fundraising events", commitment: "Flexible", description: "Help out at SMILE fundraising events and challenges throughout the year." },
  { title: "Charity shop", commitment: "Flexible", description: "Assist in our charity shop in Larkhall, from serving customers to sorting donations." },
  { title: "Admin and communications", commitment: "Flexible", description: "Support the team with day-to-day admin and communications." },
  { title: "Contribute from home", commitment: "Flexible", description: "Not able to get to Larkhall? There are ways to help SMILE remotely too." },
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
            <SectionHeading eyebrow="Why Volunteer" title="More than just giving time." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Volunteering with SMILE connects you to families doing something remarkable.
              You will meet people, build skills, and know that what you are doing genuinely matters.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              It&apos;s a chance to meet new people, learn new skills, and take on a role that&apos;s
              flexible and rewarding, whether that&apos;s helping at events, in our charity shop,
              with admin, or from home.
            </p>
          </div>
          <PhotoFrame alt="SMILE volunteer" placeholder="[Volunteer photo. Stephen to supply]" accentColor="teal" />
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeading eyebrow="Volunteer Roles" title="Find the right role for you." />
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
        <SectionHeading eyebrow="How to Apply" title="Three simple steps." />
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
