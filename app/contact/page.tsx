import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
import PhotoFrame from "@/components/PhotoFrame";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SMILE Children's Charity.",
  openGraph: {
    title: "Contact | SMILE Children's Charity",
    description: "Get in touch with SMILE Children's Charity.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        subtitle="We would love to hear from you. Whether you have a question, want to volunteer, or need support for your family."
        bg="white"
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <SectionLabel>Our Details</SectionLabel>
            <h2 className="font-heading text-2xl font-bold text-black mb-8">
              Find us here.
            </h2>
            <dl className="space-y-6">
              <div>
                <dt className="font-heading font-bold text-black text-sm uppercase tracking-wide mb-1">Address</dt>
                <dd className="text-gray-600">101 Union Street<br />Larkhall<br />ML9 1EB</dd>
              </div>
              <div>
                <dt className="font-heading font-bold text-black text-sm uppercase tracking-wide mb-1">Phone</dt>
                <dd className="text-gray-600">[Phone number. Stephen to supply]</dd>
              </div>
              <div>
                <dt className="font-heading font-bold text-black text-sm uppercase tracking-wide mb-1">Email</dt>
                <dd className="text-gray-600">[Email address. Stephen to supply]</dd>
              </div>
              <div>
                <dt className="font-heading font-bold text-black text-sm uppercase tracking-wide mb-1">Opening hours</dt>
                <dd className="text-gray-600">[Opening hours. Stephen to supply]</dd>
              </div>
            </dl>
            <div className="mt-8">
              <PhotoFrame alt="SMILE office location" placeholder="[Map or location image. Stephen to supply]" aspect="video" accentColor="yellow" />
            </div>
          </div>

          <div>
            <SectionLabel>Send a Message</SectionLabel>
            <h2 className="font-heading text-2xl font-bold text-black mb-8">
              Contact form coming soon.
            </h2>
            <div className="bg-gray-50 rounded-3xl p-8 border-2 border-dashed border-gray-200 text-center">
              <p className="text-gray-500 text-sm italic mb-4">
                The contact form is being set up. In the meantime, please reach us by phone or email above.
              </p>
              <p className="text-gray-400 text-xs">
                [Form backend to be configured — pending Stephen&apos;s sign-off]
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CTABanner
        heading="Registered charity SC053107"
        subtext="SMILE Children's Charity SCIO is registered with the Office of the Scottish Charity Regulator."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        bg="navy"
      />
    </>
  );
}
