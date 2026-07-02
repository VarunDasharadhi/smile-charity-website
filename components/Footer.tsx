import Link from "next/link";
import Image from "next/image";
import DonateButton from "./DonateButton";
import WaveDivider from "./WaveDivider";

const footerLinks = [
  {
    heading: "About",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Meet Our Families", href: "/families" },
      { label: "Our Impact", href: "/impact" },
      { label: "SMILE House Project", href: "/smile-house" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Donate", href: "/donate" },
      { label: "Fundraising", href: "/fundraising" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Corporate Partnerships", href: "/corporate" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Events", href: "/events" },
      { label: "News", href: "/news" },
      { label: "Family Support", href: "/family-support" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Donate strip */}
      <div className="bg-yellow py-8 text-center">
        <p className="font-heading font-bold text-black text-xl mb-4">
          Your support gives a family in Lanarkshire the break they really need.
        </p>
        <DonateButton size="lg" />
      </div>

      <WaveDivider fromColor="#FDD70E" toColor="#2E3245" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Charity info */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo-light.png"
                alt="SMILE Children's Charity"
                width={140}
                height={64}
                unoptimized
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Supporting families of children with disabilities and serious illness across Lanarkshire.
            </p>
            <p className="text-xs text-gray-500">
              Registered charity SC053107<br />
              101 Union Street, Larkhall, ML9 1EB
            </p>
          </div>

          {/* Nav columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-wide">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-yellow transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} SMILE Children&apos;s Charity SCIO. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="https://www.facebook.com/SMILE%20Children%E2%80%99s%20Charity" className="text-gray-500 hover:text-yellow transition-colors text-sm">Facebook</Link>
            <Link href="https://www.instagram.com/smilechildrenscharity" className="text-gray-500 hover:text-yellow transition-colors text-sm">Instagram</Link>
            <Link href="https://www.twitter.com/smilechildrens" className="text-gray-500 hover:text-yellow transition-colors text-sm">X</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
