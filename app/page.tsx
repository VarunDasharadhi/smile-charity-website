import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, TrendingUp, Users, Building2 } from "lucide-react";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import SectionHeading from "@/components/SectionHeading";
import WaveDivider from "@/components/WaveDivider";
import PhotoFrame from "@/components/PhotoFrame";
import IconLinkRow from "@/components/IconLinkRow";
import DonateButton from "@/components/DonateButton";
import AnimatedCounter from "@/components/AnimatedCounter";
import ProgressBar from "@/components/ProgressBar";
import TestimonialCard from "@/components/TestimonialCard";
import EventCard from "@/components/EventCard";

export const metadata: Metadata = {
  title: "SMILE Children's Charity | Supporting Families in Larkhall",
  description: "SMILE Children's Charity SCIO supports seriously ill and disabled children and their families across Larkhall and South Lanarkshire. Donate, volunteer, or get involved.",
  openGraph: {
    title: "SMILE Children's Charity | Supporting Families in Larkhall",
    description: "SMILE Children's Charity SCIO supports seriously ill and disabled children and their families across Larkhall and South Lanarkshire.",
    type: "website",
  },
};

const impactStats = [
  { value: "250+", label: "Families supported" },
  { value: "40+", label: "Events this year" },
  { value: "120+", label: "Volunteers" },
  { value: "?", label: "Raised for SMILE House" },
];

const testimonials = [
  {
    quote: "SMILE gave our family the break we so desperately needed. We finally felt like we weren't alone.",
    name: "Family name",
    location: "Lanarkshire",
  },
  {
    quote: "The support we received changed everything. Our children got to just be children again.",
    name: "Family name",
    location: "Lanarkshire",
  },
  {
    quote: "I didn't think anyone understood what we were going through. SMILE did. They still do.",
    name: "Family name",
    location: "Lanarkshire",
  },
];

const events = [
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location TBC]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location TBC]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location TBC]", href: "/events" },
];

const quickLinks = [
  {
    label: "Donate",
    href: "/donate",
    tone: "yellow" as const,
    icon: <HeartHandshake className="w-9 h-9" strokeWidth={2} />,
  },
  {
    label: "Fundraise",
    href: "/fundraising",
    tone: "teal" as const,
    icon: <TrendingUp className="w-9 h-9" strokeWidth={2} />,
  },
  {
    label: "Volunteer",
    href: "/volunteer",
    tone: "navy" as const,
    icon: <Users className="w-9 h-9" strokeWidth={2} />,
  },
  {
    label: "Corporate",
    href: "/corporate",
    tone: "yellow" as const,
    icon: <Building2 className="w-9 h-9" strokeWidth={2} />,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-black text-white min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm italic pointer-events-none select-none">
          [Hero image. Stephen to supply]
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <SectionLabel dark>SMILE Children&apos;s Charity</SectionLabel>
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 max-w-3xl">
            Every child deserves to smile.
          </h1>
          <p className="text-gray-200 text-xl max-w-xl mb-10 leading-relaxed">
            When your child is seriously ill or disabled, life can feel relentless.
            SMILE is here for families across Lanarkshire. Real support. Real community.
            People who genuinely care.
          </p>
          <div className="flex flex-wrap gap-4">
            <DonateButton size="lg" />
            <DonateButton size="lg" variant="outline" label="Become a Monthly Supporter" />
          </div>
        </div>
        <div className="relative flex justify-center pb-8">
          <div className="animate-bounce text-white/40" aria-hidden="true">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      <WaveDivider fromColor="#2E3245" toColor="#FFFFFF" />

      {/* Quick links */}
      <Section>
        <IconLinkRow links={quickLinks} />
      </Section>

      {/* Who we are */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Who We Are" title="Supporting families who need it most." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              SMILE was started by people who know exactly how hard this can be.
              Families of children with serious illness or disability carry a weight most people never see.
              We&apos;re here to lighten that load, even if just for a little while.
              Because no family should carry it alone.
            </p>
            <Link
              href="/about"
              className="inline-block font-bold text-black underline underline-offset-4 hover:text-yellow-dark transition-colors"
            >
              More about us
            </Link>
          </div>
          <PhotoFrame alt="Family supported by SMILE" placeholder="[Photo. Stephen to supply]" accentColor="yellow" />
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#2E3245" />

      {/* Our Story */}
      <Section bg="black">
        <div className="max-w-3xl mx-auto">
          <SectionHeading eyebrow="Our Story" title="Born from love. Built for families." dark />
          <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center">
            [Justin and Charlotte&apos;s story. Stephen to supply the founding story and photos.]
          </p>
          <div className="text-center">
            <Link
              href="/our-story"
              className="inline-block px-6 py-3 rounded-full border-2 border-teal text-teal font-bold hover:bg-teal hover:text-white transition-all"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </Section>

      <WaveDivider fromColor="#2E3245" toColor="#FDD70E" />

      {/* Impact stats */}
      <Section bg="yellow">
        <SectionHeading title="The difference your support makes." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {impactStats.map((stat) => (
            <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/impact"
            className="font-bold text-black underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            See our full impact
          </Link>
        </div>
      </Section>

      <WaveDivider fromColor="#FDD70E" toColor="#FFFFFF" />

      {/* SMILE House appeal */}
      <Section>
        <div className="bg-black rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Current Appeal" title="Help us build SMILE House." dark centered={false} />
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              SMILE House will give families a proper place to breathe.
              Somewhere to rest, recharge, and spend time with people who truly understand.
              We&apos;re building it together, and every donation brings it closer.
            </p>
            <div className="mb-8">
              <ProgressBar raised={null} target={null} />
            </div>
            <DonateButton size="lg" label="Support SMILE House" />
          </div>
          <PhotoFrame
            alt="SMILE House"
            placeholder="[SMILE House image. Stephen to supply]"
            aspect="video"
            accentColor="teal"
            accentPosition="bottom-right"
          />
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#FFF8EE" />

      {/* Family stories */}
      <Section bg="gray">
        <SectionHeading eyebrow="Family Stories" title="Stories from the families we support." />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={i}
              quote={t.quote}
              name={t.name}
              location={t.location}
              delay={i * 100}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/families"
            className="font-bold text-black underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Meet more families
          </Link>
        </div>
      </Section>

      <WaveDivider fromColor="#FFF8EE" toColor="#FFFFFF" />

      {/* Upcoming events */}
      <Section>
        <div className="flex items-end justify-between mb-8">
          <SectionHeading title="Upcoming Events" centered={false} />
          <Link
            href="/events"
            className="text-sm font-bold text-black underline underline-offset-4 hover:opacity-70"
          >
            See all events
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((e, i) => (
            <EventCard
              key={i}
              day={e.day}
              month={e.month}
              title={e.title}
              location={e.location}
              href={e.href}
              delay={i * 100}
            />
          ))}
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#FFF8EE" />

      {/* Corporate supporters */}
      <Section bg="gray">
        <SectionHeading title="Supported by" />
        <p className="text-gray-500 text-sm text-center -mt-8 mb-10">[Corporate supporter logos. Stephen to supply]</p>
        <div className="flex flex-wrap gap-8 justify-center items-center opacity-40">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-28 h-12 bg-gray-300 rounded-lg" />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/corporate"
            className="inline-block px-6 py-3 rounded-full border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all"
          >
            Become a Partner
          </Link>
        </div>
      </Section>

      <WaveDivider fromColor="#FFF8EE" toColor="#FDD70E" />

      {/* Newsletter */}
      <Section bg="yellow">
        <div className="max-w-xl mx-auto text-center">
          <SectionHeading title="Stay connected." />
          <p className="text-black/70 mb-8">
            Get updates from SMILE. News, events, and stories from the families we support.
            Nothing you didn&apos;t ask for.
          </p>
          <form className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full border-2 border-black text-black placeholder:text-black/40 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-colors shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
