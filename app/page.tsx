import Link from "next/link";
import DonateButton from "@/components/DonateButton";
import Section from "@/components/Section";

const impactStats = [
  { value: "?", label: "Families supported" },
  { value: "?", label: "Events this year" },
  { value: "?", label: "Volunteers" },
  { value: "?", label: "Raised for SMILE House" },
];

const ctaLinks = [
  { label: "Donate Now", href: "/donate", primary: true },
  { label: "Monthly Giving", href: "/donate", primary: false },
  { label: "Fundraise", href: "/fundraising", primary: false },
  { label: "Volunteer", href: "/volunteer", primary: false },
  { label: "Corporate", href: "/corporate", primary: false },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-black text-white min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-sm italic pointer-events-none">
          [Hero image placeholder. High-quality photo from Stephen]
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <p className="text-yellow font-heading font-semibold text-sm uppercase tracking-widest mb-4">
            SMILE Children&apos;s Charity
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 max-w-3xl">
            Every child deserves to smile.
          </h1>
          <p className="text-gray-200 text-xl max-w-xl mb-10">
            When your child is seriously ill or disabled, life can feel relentless.
            SMILE is here for families across Lanarkshire. Real support. Real community. People who genuinely care.
          </p>
          <div className="flex flex-wrap gap-4">
            <DonateButton size="lg" />
            <DonateButton size="lg" variant="outline" label="Become a Monthly Supporter" />
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-yellow py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center md:justify-between items-center">
            {ctaLinks.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  cta.primary
                    ? "bg-black text-white hover:bg-gray-800"
                    : "text-black hover:underline"
                }`}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-yellow font-heading font-semibold text-sm uppercase tracking-widest mb-3">
              Who We Are
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-black mb-6">
              Supporting families who need it most.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              SMILE was started by people who know exactly how hard this can be.
              Families of children with serious illness or disability carry a weight most people never see.
              We&apos;re here to lighten that load, even if just for a little while.
              Because no family should carry it alone.
            </p>
            <Link href="/about" className="inline-block font-bold text-black underline underline-offset-4 hover:text-yellow-dark transition-colors">
              More about us
            </Link>
          </div>
          <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center text-gray-400 text-sm italic">
            [Photo. Stephen to supply]
          </div>
        </div>
      </Section>

      {/* Justin & Charlotte story teaser */}
      <Section bg="black">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-yellow font-heading font-semibold text-sm uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Born from love. Built for families.
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            [Justin and Charlotte&apos;s story. Stephen to supply the founding story and photos.]
          </p>
          <Link
            href="/our-story"
            className="inline-block px-6 py-3 rounded-full border-2 border-yellow text-yellow font-bold hover:bg-yellow hover:text-black transition-all"
          >
            Read Our Story
          </Link>
        </div>
      </Section>

      {/* Impact stats */}
      <Section bg="yellow">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-black">
            The difference your support makes.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {impactStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-5xl font-extrabold text-black mb-2">{stat.value}</p>
              <p className="text-black/70 font-medium text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/impact" className="inline-block font-bold text-black underline underline-offset-4 hover:opacity-70 transition-opacity">
            See our full impact
          </Link>
        </div>
      </Section>

      {/* SMILE House appeal */}
      <Section>
        <div className="bg-black rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-yellow font-heading font-semibold text-sm uppercase tracking-widest mb-4">
              Current Appeal
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Help us build SMILE House.
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              SMILE House will give families a proper place to breathe.
              Somewhere to rest, recharge, and spend time with people who truly understand.
              We&apos;re building it together, and every donation brings it closer.
            </p>
            <DonateButton size="lg" label="Support SMILE House" />
          </div>
          <div className="bg-gray-800 rounded-2xl aspect-video flex items-center justify-center text-gray-500 text-sm italic">
            [SMILE House campaign image. Stephen to supply]
          </div>
        </div>
      </Section>

      {/* Family testimonials */}
      <Section bg="gray">
        <div className="text-center mb-12">
          <p className="text-yellow font-heading font-semibold text-sm uppercase tracking-widest mb-3">
            Family Stories
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-black">
            Stories from the families we support.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-yellow mb-4 flex items-center justify-center text-black font-bold font-heading">
                ?
              </div>
              <p className="text-gray-600 italic mb-4">
                &ldquo;[Testimonial placeholder. Stephen to supply with family consent]&rdquo;
              </p>
              <p className="font-heading font-bold text-black text-sm">Family name</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/families" className="inline-block font-bold text-black underline underline-offset-4 hover:opacity-70 transition-opacity">
            Meet more families
          </Link>
        </div>
      </Section>

      {/* Upcoming events teaser */}
      <Section>
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-heading text-3xl font-bold text-black">Upcoming Events</h2>
          <Link href="/events" className="text-sm font-bold text-black underline underline-offset-4 hover:opacity-70">
            See all events
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-yellow flex items-center justify-center font-heading font-bold text-black text-xs mb-4">
                TBC
              </div>
              <h3 className="font-heading font-bold text-black mb-2">[Event name. Stephen to supply]</h3>
              <p className="text-gray-500 text-sm">[Date and location]</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Corporate supporters */}
      <Section bg="gray">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl font-bold text-black mb-2">Supported by</h2>
          <p className="text-gray-500 text-sm">[Corporate supporter logos. Stephen to supply]</p>
        </div>
        <div className="flex flex-wrap gap-8 justify-center items-center opacity-50">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-28 h-12 bg-gray-300 rounded-lg" />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/corporate"
            className="inline-block px-6 py-3 rounded-full border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all"
          >
            Become a Partner
          </Link>
        </div>
      </Section>

      {/* Newsletter signup */}
      <Section bg="yellow">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold text-black mb-4">Stay connected.</h2>
          <p className="text-black/70 mb-8">
            Get updates from SMILE. News, events, and stories from the families we support. Nothing you didn&apos;t ask for.
          </p>
          <form className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full border-2 border-black text-black placeholder:text-black/40 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
