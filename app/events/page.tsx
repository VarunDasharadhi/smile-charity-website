import type { Metadata } from "next";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionLabel from "@/components/SectionLabel";
import EventCard from "@/components/EventCard";

export const metadata: Metadata = {
  title: "Events",
  description: "Find upcoming SMILE Children's Charity events in Lanarkshire.",
  openGraph: {
    title: "Events | SMILE Children's Charity",
    description: "Find upcoming SMILE events in Lanarkshire.",
    type: "website",
  },
};

const upcomingEvents = [
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location. Stephen to supply]", description: "[Short event description. Stephen to supply]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location. Stephen to supply]", description: "[Short event description. Stephen to supply]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location. Stephen to supply]", description: "[Short event description. Stephen to supply]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location. Stephen to supply]", description: "[Short event description. Stephen to supply]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location. Stephen to supply]", description: "[Short event description. Stephen to supply]", href: "/events" },
  { day: "TBC", month: "2026", title: "[Event name. Stephen to supply]", location: "[Location. Stephen to supply]", description: "[Short event description. Stephen to supply]", href: "/events" },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Get involved. Have fun. Make a difference."
        subtitle="From charity runs to bake sales, every SMILE event raises money and brings people together."
        bg="yellow"
      />

      <Section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <SectionLabel>Upcoming</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-black">Events coming up.</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingEvents.map((e, i) => (
            <EventCard
              key={i}
              day={e.day}
              month={e.month}
              title={e.title}
              location={e.location}
              description={e.description}
              href={e.href}
            />
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Want to run your own event for SMILE?"
        subtext="We can support you with fundraising materials, promotion, and advice."
        primaryLabel="Start Fundraising"
        primaryHref="/fundraising"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
        bg="yellow"
      />

      <Section bg="gray">
        <div className="text-center mb-8">
          <SectionLabel>Past Events</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-black">
            What we have done together.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl aspect-video flex items-center justify-center text-gray-400 text-xs italic shadow-sm">
              [Past event photo {i}. Stephen to supply]
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Support SMILE between events."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        bg="navy"
      />
    </>
  );
}
