// app/corporate/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";

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
  { title: "Brand association", description: "Align your brand with a trusted local charity making a real difference." },
  { title: "Staff engagement", description: "Fundraising and volunteering opportunities that bring teams together." },
  { title: "Community impact", description: "Show customers and stakeholders your commitment to the local community." },
  { title: "Recognition", description: "Logo on our website, social media mentions, and event acknowledgements." },
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
        <div className="text-center mb-12">
          <SectionLabel>Why Partner With Us</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Good for your business. Great for families.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="border border-gray-100 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-yellow mb-4" />
              <h3 className="font-heading font-bold text-black mb-2">{b.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="gray">
        <div className="text-center mb-12">
          <SectionLabel>Partnership Tiers</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            Find the right level for your business.
          </h2>
        </div>
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
                    <span className="text-yellow">+</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center mb-10">
          <SectionLabel>Our Partners</SectionLabel>
          <h2 className="font-heading text-2xl font-bold text-black mb-2">
            Businesses that already support SMILE.
          </h2>
          <p className="text-gray-500 text-sm">[Partner logos. Stephen to supply]</p>
        </div>
        <div className="flex flex-wrap gap-8 justify-center items-center opacity-40">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-28 h-12 bg-gray-300 rounded-lg" />
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
