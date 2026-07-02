// app/corporate/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { Megaphone, Users, HeartHandshake, Award, CheckCircle2 } from "lucide-react";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";

export const metadata: Metadata = {
  title: "Corporate Partnerships",
  description: "Partner with SMILE Children's Charity and support families across Lanarkshire.",
  openGraph: {
    title: "Corporate Partnerships | SMILE Children's Charity",
    description: "Partner with SMILE and support families across Lanarkshire.",
    type: "website",
  },
};

const benefits = [
  { title: "Brand association", description: "Align your brand with a trusted local charity making a real difference.", icon: Megaphone },
  { title: "Staff engagement", description: "Fundraising and volunteering opportunities that bring teams together.", icon: Users },
  { title: "Community impact", description: "Show customers and stakeholders your commitment to the local community.", icon: HeartHandshake },
  { title: "Recognition", description: "Logo on our website, social media mentions, and event acknowledgements.", icon: Award },
];

const tiers = [
  {
    name: "Bronze Partner",
    amount: "[Amount. Stephen to supply]",
    perks: ["Logo on website", "Social media mention", "Invitation to annual event"],
  },
  {
    name: "Silver Partner",
    amount: "[Amount. Stephen to supply]",
    perks: ["Everything in Bronze", "Staff volunteering day", "Newsletter feature"],
    featured: true,
  },
  {
    name: "Gold Partner",
    amount: "[Amount. Stephen to supply]",
    perks: ["Everything in Silver", "Event sponsorship", "Dedicated case study", "VIP event access"],
  },
];

export default function CorporatePage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate Partnerships"
        title="Partner with SMILE."
        subtitle="Support families in Lanarkshire while showing your customers and team what your business stands for."
        bg="navy"
        ctaLabel="Become a Partner"
        ctaHref="/contact"
      />

      <Section>
        <SectionHeading eyebrow="Why Partner With Us" title="Good for your business. Great for families." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <FeatureCard
              key={b.title}
              icon={b.icon}
              title={b.title}
              description={b.description}
              delay={i * 100}
            />
          ))}
        </div>
      </Section>

      <Section bg="gray">
        <SectionHeading eyebrow="Partnership Tiers" title="Find the right level for your business." />
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl p-8 ${
                t.featured
                  ? "bg-black text-white shadow-xl scale-105"
                  : "bg-white border border-gray-100 shadow-sm"
              }`}
            >
              {t.featured && (
                <span className="inline-block px-3 py-1 rounded-full bg-yellow text-black text-xs font-bold mb-4">
                  Most popular
                </span>
              )}
              <h3 className={`font-heading font-bold text-xl mb-2 ${t.featured ? "text-white" : "text-black"}`}>
                {t.name}
              </h3>
              <p className={`font-heading font-extrabold text-3xl mb-6 ${t.featured ? "text-yellow" : "text-black"}`}>
                {t.amount}
              </p>
              <ul className="space-y-2 mb-8">
                {t.perks.map((p) => (
                  <li key={p} className={`flex items-center gap-2 text-sm ${t.featured ? "text-gray-300" : "text-gray-600"}`}>
                    <CheckCircle2 className="w-4 h-4 text-yellow flex-shrink-0" strokeWidth={2} /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our Partners" title="Businesses that already support SMILE." />
        <p className="text-gray-600 text-lg max-w-xl mx-auto text-center -mt-6 mb-10">
          We are incredibly grateful to the organisations and partners who support us.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Rocca Hamilton", logo: "/images/brands/partner-rocca.png", href: "https://www.roccaristorante.co.uk/" },
            { name: "Co-op", logo: "/images/brands/partner-coop.png", href: "https://www.coop.co.uk/" },
            { name: "National Lottery Community Fund", logo: "/images/brands/partner-lottery.png", href: "https://www.tnlcommunityfund.org.uk/" },
          ].map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-100 rounded-2xl p-8 text-center transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
            >
              <span className="flex items-center justify-center h-20 mb-4">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={80}
                  className="max-h-16 w-auto object-contain"
                />
              </span>
              <p className="font-heading font-semibold text-xs uppercase tracking-widest text-black/50 mb-1">
                Charity Partner
              </p>
              <p className="font-heading font-bold text-black group-hover:text-yellow-dark transition-colors">
                {partner.name}
              </p>
            </a>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Ready to partner with SMILE?"
        subtext="Get in touch and we will put together a proposal tailored to your business."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        bg="yellow"
      />
    </>
  );
}
