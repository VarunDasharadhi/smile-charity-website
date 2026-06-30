import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "See the difference SMILE Children's Charity makes, in numbers and in lives.",
};

const stats = [
  { value: "?", label: "Families supported" },
  { value: "?", label: "Events held" },
  { value: "?", label: "Volunteers" },
  { value: "?", label: "Raised for SMILE House" },
];

export default function ImpactPage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Our Impact</h1>
        <p className="text-black text-lg max-w-2xl">
          Every pound donated goes directly to supporting families who need it most.
        </p>
      </Section>

      <Section bg="black">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-4xl font-bold text-yellow mb-2">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [Content coming soon. Stephen to supply impact statistics and milestone highlights.]
        </p>
        <div className="mt-8 text-center">
          <DonateButton size="md" />
        </div>
      </Section>
    </>
  );
}
