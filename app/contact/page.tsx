import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SMILE Children's Charity. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Get in Touch</h1>
        <p className="text-black text-lg max-w-2xl">
          Whether you want to donate, volunteer, partner with us, or just find out more,
          we&apos;d love to hear from you.
        </p>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h2 className="font-heading text-2xl font-bold mb-4">Our Shops</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <p className="font-semibold text-black">Larkhall</p>
                <p>101 Union Street, Larkhall, ML9 1EB</p>
              </div>
              <div>
                <p className="font-semibold text-black">Hamilton</p>
                <p>[Address. Stephen to confirm]</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-600 text-sm">
                Email: <a href="mailto:smilechildrenscharity@gmail.com" className="text-blue hover:underline">smilechildrenscharity@gmail.com</a>
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold mb-4">Send a Message</h2>
            <p className="text-gray-600 italic text-sm mb-6">
              [Contact form coming soon.]
            </p>
            <DonateButton size="md" />
          </div>
        </div>
      </Section>
    </>
  );
}
