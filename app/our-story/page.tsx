import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import PhotoFrame from "@/components/PhotoFrame";
import WaveDivider from "@/components/WaveDivider";

export const metadata: Metadata = {
  title: "Our Story",
  description: "How SMILE was founded — in memory of Justin Meek, and why Wendy and Stephen started SMILE Children's Charity.",
  openGraph: {
    title: "Our Story | SMILE Children's Charity",
    description: "How SMILE was founded — in memory of Justin Meek.",
    type: "website",
  },
};

const milestones = [
  { year: "2024", event: "SMILE Children's Charity founded in memory of Justin Meek" },
  { year: "2026", event: "Secured Scottish Government funding for a Changing Places toilet" },
  { year: "2026", event: "Awarded funding to launch free holistic therapy sessions for carers" },
  { year: "2026", event: "Community Asset Transfer of Canderavon approved, the site for SMILE House" },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Born from love. Built for families."
        subtitle="Founded in memory of a much-loved little boy, and built to make sure other families never face it alone."
        bg="navy"
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <PhotoFrame alt="Wendy and Stephen Meek, SMILE founders" placeholder="[Photo of Wendy and Stephen, or of Justin. Stephen to supply]" accentColor="teal" />
          <div>
            <SectionHeading eyebrow="How It Started" title="In loving memory of Justin." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              SMILE Children&apos;s Charity was founded in February 2024, inspired by an incredible young boy,
              Justin Meek, who sadly passed away suddenly in 2014 while on a family holiday in Florida.
              His death inspired his parents, Wendy and Stephen, to set up SMILE Children&apos;s Charity in his memory.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              With their daughter Charlotte living with complex needs, Wendy and Stephen understand
              first-hand the challenges families face, and the importance of accessible, compassionate
              support. Our vision is to open a tranquil respite facility in Lanarkshire where families
              with children who have disabilities or serious illness can relax, have fun, and spend
              quality time together making memories.
            </p>
          </div>
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#FFF8EE" />

      <Section bg="gray">
        <SectionHeading eyebrow="Our Journey" title="From idea to impact." />
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-yellow" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="pl-12 relative">
                <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-yellow border-2 border-white" />
                <p className="text-yellow font-heading font-bold text-sm mb-1">{m.year}</p>
                <p className="text-gray-700 text-base">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTABanner
        heading="Be part of the next chapter."
        subtext="Your support helps us reach more families and build SMILE House."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Meet Our Families"
        secondaryHref="/families"
        bg="yellow"
      />

      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PhotoFrame
              key={i}
              alt={`SMILE moment ${i}`}
              placeholder={`[Photo ${i}. Stephen to supply]`}
              accentColor={i % 2 === 0 ? "teal" : "yellow"}
              accentPosition={i % 2 === 0 ? "bottom-right" : "top-left"}
            />
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Want to support SMILE?"
        subtext="Every donation helps us be there for families who need it most."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Get Involved"
        secondaryHref="/volunteer"
        bg="yellow"
      />
    </>
  );
}
