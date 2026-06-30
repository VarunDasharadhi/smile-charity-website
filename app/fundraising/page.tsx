// app/fundraising/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import PhotoFrame from "@/components/PhotoFrame";
import WaveDivider from "@/components/WaveDivider";

export const metadata: Metadata = {
  title: "Fundraising",
  description: "Fundraise for SMILE Children's Charity. Find ideas, get support, and make a difference.",
  openGraph: {
    title: "Fundraising | SMILE Children's Charity",
    description: "Fundraise for SMILE and make a difference for families in Lanarkshire.",
    type: "website",
  },
};

const ideas = [
  { title: "Challenge events", description: "Sponsored runs, cycles, or swims. Pick a challenge and ask people to back you." },
  { title: "Bake sales", description: "A classic for good reason. Easy to organise, hard to resist." },
  { title: "Collections", description: "Set up a collection tin at your workplace, school, or local business." },
  { title: "Online fundraising", description: "Create a fundraising page and share it with your network." },
  { title: "Events", description: "Quiz nights, raffles, auctions — the more creative the better." },
  { title: "Payroll giving", description: "Give a small amount each month directly from your pay, pre-tax." },
];

export default function FundraisingPage() {
  return (
    <>
      <PageHero
        eyebrow="Fundraising"
        title="Fundraise for SMILE."
        subtitle="Every pound you raise goes directly to families who need it. We will support you every step of the way."
        bg="yellow"
        ctaLabel="Get Your Fundraising Pack"
        ctaHref="/contact"
      />

      <Section>
        <SectionHeading eyebrow="How to Get Started" title="Pick an idea. We handle the rest." />
        <div className="grid md:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div key={idea.title} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-yellow mb-4" />
              <h3 className="font-heading font-bold text-black mb-2">{idea.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{idea.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Ready to get started?"
        subtext="Contact us and we will send you a fundraising pack with everything you need."
        primaryLabel="Get Your Pack"
        primaryHref="/contact"
        secondaryLabel="Donate Instead"
        secondaryHref="/donate"
        bg="teal"
      />

      <WaveDivider fromColor="#FFFFFF" toColor="#FFF8EE" />

      <Section bg="gray">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Fundraising Pack" title="Everything you need in one place." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our fundraising pack includes SMILE branding, collection sheets, poster templates,
              and guidance on how to set up an online giving page. Everything you need to hit the ground running.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all"
            >
              Request a Pack
            </Link>
          </div>
          <PhotoFrame alt="Fundraising pack" placeholder="[Fundraising pack preview image. Stephen to supply]" aspect="video" accentColor="teal" accentPosition="bottom-right" />
        </div>
      </Section>

      <CTABanner
        heading="Can not fundraise right now? Donate directly."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        bg="yellow"
      />
    </>
  );
}
