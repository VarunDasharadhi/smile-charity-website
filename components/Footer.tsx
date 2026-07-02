import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, XIcon } from "./SocialIcons";
import DonateButton from "./DonateButton";
import WaveDivider from "./WaveDivider";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/p/SMILE-Childrens-Charity-61555674308075/",
    icon: FacebookIcon,
    brandClass: "bg-[#1877F2] text-white",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/smilechildrenscharity",
    icon: InstagramIcon,
    brandClass: "bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] text-white",
  },
  {
    label: "X",
    href: "https://www.twitter.com/smilechildrens",
    icon: XIcon,
    brandClass: "bg-white text-black",
  },
];

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
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${s.brandClass}`}
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
