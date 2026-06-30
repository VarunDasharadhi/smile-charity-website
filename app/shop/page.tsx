import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Shop",
  description: "The SMILE Children's Charity shop — coming soon.",
  openGraph: {
    title: "Shop | SMILE Children's Charity",
    description: "The SMILE shop — coming soon.",
    type: "website",
  },
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="SMILE merchandise — coming soon."
        subtitle="Our shop is on its way. Sign up below to be the first to know when it launches."
        bg="yellow"
      />

      <Section>
        <div className="max-w-md mx-auto text-center">
          <p className="text-gray-600 text-lg mb-8">
            We are working on SMILE merchandise so you can wear your support with pride.
            Leave your email and we will let you know the moment it is live.
          </p>
          <form className="flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full border-2 border-black text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Notify me
            </button>
          </form>
        </div>
      </Section>

      <CTABanner
        heading="Can not wait? Support us directly."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        bg="yellow"
      />
    </>
  );
}
