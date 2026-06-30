import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Volunteer with SMILE Children's Charity and give your time to families who need it.",
};

export default function VolunteerPage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Volunteer with SMILE</h1>
        <p className="text-black text-lg max-w-2xl">
          Your time is one of the most valuable things you can give. Find out how to get involved.
        </p>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [Content coming soon. Volunteer roles, sign-up form, and what to expect.]
        </p>
        <div className="mt-8 text-center">
          <DonateButton size="md" label="Sign Up to Volunteer" />
        </div>
      </Section>
    </>
  );
}
