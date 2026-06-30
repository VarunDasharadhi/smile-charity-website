import type { Metadata } from "next";
import Section from "@/components/Section";
import DonateButton from "@/components/DonateButton";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming SMILE Children's Charity events. Come along, get involved, and help raise funds.",
};

export default function EventsPage() {
  return (
    <>
      <Section bg="yellow">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Events</h1>
        <p className="text-black text-lg max-w-2xl">
          From fundraising nights to family days, here&apos;s what&apos;s coming up. All welcome.
        </p>
      </Section>

      <Section>
        <p className="text-gray-600 text-center text-lg italic">
          [Events will be listed here. Stephen to supply upcoming event details once CMS is connected.]
        </p>
        <div className="mt-8 text-center">
          <DonateButton size="md" label="Support Our Events" />
        </div>
      </Section>
    </>
  );
}
