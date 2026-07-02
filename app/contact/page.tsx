import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";

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
            <SectionHeading eyebrow="Our Details" title="Find us here." size="sm" centered={false} />
            <dl className="space-y-6">
              <div>
                <dt className="font-heading font-bold text-black text-sm uppercase tracking-wide mb-1">Address</dt>
                <dd className="text-gray-600">101 Union Street<br />Larkhall<br />ML9 1EB</dd>
              </div>
              <div>
                <dt className="font-heading font-bold text-black text-sm uppercase tracking-wide mb-1">Phone</dt>
                <dd className="text-gray-600">01698 642411</dd>
              </div>
              <div>
                <dt className="font-heading font-bold text-black text-sm uppercase tracking-wide mb-1">Email</dt>
                <dd className="text-gray-600">smilechildrenscharity@gmail.com</dd>
              </div>
              <div>
                <dt className="font-heading font-bold text-black text-sm uppercase tracking-wide mb-1">Opening hours</dt>
                <dd className="text-gray-600">Tuesday to Saturday, from 10am (charity shop, same address)</dd>
              </div>
            </dl>
            <div className="mt-8">
              <div className="rounded-3xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.18)] aspect-video">
                <iframe
                  src="https://maps.google.com/maps?q=101%20Union%20Street%2C%20Larkhall%2C%20ML9%201EB&output=embed"
                  title="Map showing SMILE Children's Charity at 101 Union Street, Larkhall"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=101+Union+Street+Larkhall+ML9+1EB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-bold text-black underline underline-offset-4 hover:text-yellow-dark transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Send a Message" title="Contact form coming soon." size="sm" centered={false} />
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
