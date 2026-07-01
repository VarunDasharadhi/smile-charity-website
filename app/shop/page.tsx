// app/shop/page.tsx
import type { Metadata } from "next";
import { MapPin, Clock, ShoppingBag } from "lucide-react";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Shop",
  description: "Visit SMILE Children's Charity's shops in Larkhall and Hamilton, or find us online.",
  openGraph: {
    title: "Shop | SMILE Children's Charity",
    description: "Visit our charity shops in Larkhall and Hamilton, or find us online.",
    type: "website",
  },
};

const shops = [
  {
    town: "Larkhall",
    address: "[Shop address, Larkhall. Stephen to supply]",
    hours: "[Opening hours. Stephen to supply]",
  },
  {
    town: "Hamilton",
    address: "[Shop address, Hamilton. Stephen to supply]",
    hours: "[Opening hours. Stephen to supply]",
  },
];

const onlineShops = [
  { label: "eBay", href: "#" },
  { label: "Vinted", href: "#" },
  { label: "Depop", href: "#" },
];

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Every donated item helps a family."
        subtitle="Our charity shops in Larkhall and Hamilton raise funds for SMILE, and you can shop with us online too."
        bg="yellow"
      />

      <Section>
        <SectionHeading eyebrow="Visit Us" title="Our shops." />
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {shops.map((shop, i) => (
            <Reveal key={shop.town} delay={i * 100}>
              <div className="border border-gray-100 rounded-2xl p-8 h-full">
                <span className="w-14 h-14 rounded-2xl bg-teal text-white flex items-center justify-center mb-4">
                  <ShoppingBag className="w-7 h-7" strokeWidth={2} />
                </span>
                <h3 className="font-heading font-bold text-black text-xl mb-4">{shop.town}</h3>
                <p className="flex items-start gap-2 text-gray-600 text-sm mb-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2} />
                  {shop.address}
                </p>
                <p className="flex items-start gap-2 text-gray-600 text-sm">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2} />
                  {shop.hours}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeading eyebrow="Shop Online" title="Find us on the marketplaces too." />
        <p className="text-gray-600 text-lg max-w-xl mx-auto text-center mb-10">
          Cannot make it into the shop? We list items online too, with every sale supporting SMILE.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {onlineShops.map((shop) => (
            <a
              key={shop.label}
              href={shop.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white border-2 border-black font-heading font-bold text-black shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]"
            >
              {shop.label}
            </a>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Have items to donate?"
        subtext="Drop them into either shop during opening hours, no appointment needed."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Donate Now"
        secondaryHref="/donate"
        bg="yellow"
      />
    </>
  );
}
