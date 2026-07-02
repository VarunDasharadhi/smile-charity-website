// app/smile-house/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import PhotoFrame from "@/components/PhotoFrame";
import WaveDivider from "@/components/WaveDivider";
import ProgressBar from "@/components/ProgressBar";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "SMILE House Project",
  description: "Help us build SMILE House — a dedicated space for families supported by SMILE Children's Charity.",
  openGraph: {
    title: "SMILE House Project | SMILE Children's Charity",
    description: "Help us build SMILE House — a dedicated space for families.",
    type: "website",
  },
};

const timeline = [
  { phase: "Phase 1", title: "Community Asset Transfer of Canderavon approved", status: "current" },
  { phase: "Phase 2", title: "Bringing Canderavon to life, working with partners, funders, and the community", status: "upcoming" },
  { phase: "Phase 3", title: "[Phase title. Stephen to supply]", status: "upcoming" },
];

export default function SmileHousePage() {
  return (
    <>
      <PageHero
        eyebrow="SMILE House"
        title="A place for families to breathe."
        subtitle="SMILE House will give families the space to rest, recharge, and connect with others who truly understand."
        bg="navy"
        ctaLabel="Support SMILE House"
        ctaHref="/donate"
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="The Vision" title="Why SMILE House matters." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              In March 2026, South Lanarkshire Council formally approved the Community Asset Transfer
              of Canderavon to SMILE Children&apos;s Charity, the foundation for a transformational new
              chapter for families across Lanarkshire.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Canderavon will be developed into a dedicated, inclusive space, including a respite house
              for children with disabilities and serious illness, a sensory play and wellbeing centre,
              and a welcoming community hub for families and carers.
            </p>
          </div>
          <PhotoFrame alt="SMILE House" placeholder="[SMILE House render or image. Stephen to supply]" aspect="video" accentColor="teal" accentPosition="bottom-right" />
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#2E3245" />

      <Section bg="black">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading eyebrow="Fundraising Progress" title="Together we are building this." dark size="sm" />
          <ProgressBar raised={null} target={null} label="SMILE House Appeal" />
          <div className="mt-8">
            <DonateButton size="lg" label="Donate to SMILE House" />
          </div>
        </div>
      </Section>

      <CTABanner
        heading="Spread the word."
        subtext="Share the SMILE House appeal with your network and help us reach our target."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Fundraise for SMILE House"
        secondaryHref="/fundraising"
        bg="yellow"
      />

      <Section>
        <SectionHeading eyebrow="Build Timeline" title="Our plan to make it happen." />
        <div className="max-w-2xl mx-auto space-y-6">
          {timeline.map((t) => (
            <div
              key={t.phase}
              className={`flex gap-6 p-6 rounded-2xl border ${
                t.status === "current"
                  ? "border-yellow bg-yellow/10"
                  : "border-gray-100"
              }`}
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-heading font-bold text-xs ${
                t.status === "current" ? "bg-yellow text-black" : "bg-gray-100 text-gray-500"
              }`}>
                {t.phase}
              </div>
              <div>
                <p className="font-heading font-bold text-black">{t.title}</p>
                {t.status === "current" && (
                  <p className="text-teal text-sm font-semibold mt-1">In progress</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Every donation brings SMILE House closer."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        bg="navy"
      />
    </>
  );
}
