import type { Metadata } from "next";
import { Heart, Users, HandHeart } from "lucide-react";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import SectionHeading from "@/components/SectionHeading";
import PhotoFrame from "@/components/PhotoFrame";
import WaveDivider from "@/components/WaveDivider";
import FeatureCard from "@/components/FeatureCard";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SMILE Children's Charity, our mission, values, and the team behind us.",
  openGraph: {
    title: "About Us | SMILE Children's Charity",
    description: "Learn about SMILE Children's Charity, our mission, values, and the team behind us.",
    type: "website",
  },
};

const team = [
  { name: "Wendy Meek", role: "CEO/Founder" },
  { name: "Stephen Meek", role: "Founder/Trustee" },
  { name: "Emma Allan", role: "Chairperson" },
  { name: "Sophie Meek", role: "Treasurer" },
];

const values = [
  {
    title: "Family first",
    description: "Every decision we make starts with what is best for the families we serve.",
    icon: Heart,
  },
  {
    title: "Community",
    description: "We build connections so no family ever feels isolated in what they are going through.",
    icon: Users,
  },
  {
    title: "Compassion",
    description: "We listen, we care, and we show up, because that is what families need most.",
    icon: HandHeart,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SMILE"
        title="Supporting families who need it most."
        subtitle="We support families of children with disabilities and serious illness across Lanarkshire, giving them a break, a community, and a reason to smile."
        bg="yellow"
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Our Mission" title="Why SMILE exists." centered={false} />
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Our vision is to open a tranquil respite facility in Lanarkshire where families with
              children who have disabilities or serious illness can relax, have fun, and spend
              quality time together making memories.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              &ldquo;We understand that sometimes the memories are all that are left, and are priceless.
              We offer our families mindfulness sessions and alternative therapies, a time to relax,
              reflect, and improve their mental health.&rdquo;
              <span className="block mt-2 text-black font-heading font-bold text-base not-italic">
                Wendy Meek, CEO and Founder
              </span>
            </p>
          </div>
          <PhotoFrame alt="The SMILE team" placeholder="[Team or charity photo. Stephen to supply]" aspect="video" accentColor="yellow" />
        </div>
      </Section>

      <WaveDivider fromColor="#FFFFFF" toColor="#FFF8EE" />

      <Section bg="gray">
        <SectionHeading eyebrow="Our Values" title="What guides everything we do." />
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <FeatureCard
              key={v.title}
              icon={v.icon}
              title={v.title}
              description={v.description}
              delay={i * 100}
            />
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Want to get involved?"
        subtext="There are many ways to support SMILE, from donating to volunteering to fundraising."
        primaryLabel="Donate Now"
        primaryHref="/donate"
        secondaryLabel="Volunteer"
        secondaryHref="/volunteer"
        bg="yellow"
      />

      <Section>
        <SectionHeading eyebrow="Our Team" title="The people behind SMILE." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((t) => (
            <div key={t.name} className="text-center">
              <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-3 flex items-center justify-center text-gray-400 text-sm italic">
                [Photo. Stephen to supply]
              </div>
              <p className="font-heading font-bold text-black text-sm">{t.name}</p>
              <p className="text-gray-500 text-xs">{t.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        heading="Registered charity SC053107"
        subtext="SMILE Children's Charity SCIO, 101 Union Street, Larkhall, ML9 1EB"
        primaryLabel="Contact Us"
        primaryHref="/contact"
        bg="navy"
      />
    </>
  );
}
