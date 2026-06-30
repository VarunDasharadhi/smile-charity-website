import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Shop",
  description: "Visit SMILE Children's Charity shops in Larkhall and Hamilton.",
};

export default function ShopPage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">SMILE Shops</h1>
        <p className="text-black text-lg max-w-2xl">
          Visit us in Larkhall and Hamilton. Everything you buy supports local families.
        </p>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [Shop details coming soon. Addresses, opening hours, and what we sell. Online shop TBC pending Stephen&apos;s confirmation.]
        </p>
        <div className="mt-8 text-center">
          <DonateButton size="md" />
        </div>
      </Section>
    </>
  );
}
