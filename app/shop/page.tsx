// app/shop/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Clock, ShoppingBag, Navigation } from "lucide-react";
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
    address: "101 Union Street, Larkhall, South Lanarkshire, ML9 1EB",
    hours: "Tuesday to Saturday, from 10am",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=101+Union+Street+Larkhall+ML9+1EB",
  },
  {
    town: "Hamilton",
    address: "[Shop address, Hamilton. Stephen to supply]",
    hours: "[Opening hours. Stephen to supply]",
    mapsUrl: null,
  },
];

const onlineShops = [
  { label: "eBay", href: "#", logo: "/images/brands/ebay.svg", logoOnly: true },
  { label: "Vinted", href: "#", logo: "/images/brands/vinted.svg", logoOnly: false },
  { label: "Depop", href: "#", logo: "/images/brands/depop.svg", logoOnly: true },
];

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Every donated item helps a family."
        subtitle="Our charity shops in Larkhall and Hamilton raise funds for SMILE, and you can shop with us online too."
        bg="yellow"
        imageSrc="/images/charity-shop.jpg"
        imageAlt="Inside the SMILE charity shop in Larkhall"
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
                {shop.mapsUrl && (
                  <a
                    href={shop.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-yellow text-black text-sm font-bold transition-all hover:bg-yellow-dark hover:-translate-y-0.5"
                  >
                    <Navigation className="w-4 h-4" strokeWidth={2} />
                    Get directions
                  </a>
                )}
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
              aria-label={`SMILE on ${shop.label}`}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-white border-2 border-black shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]"
            >
              <Image src={shop.logo} alt={shop.label} width={shop.logoOnly ? 72 : 28} height={28} className="h-7 w-auto" />
              {!shop.logoOnly && (
                <span className="font-heading font-bold text-black">{shop.label}</span>
              )}
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
