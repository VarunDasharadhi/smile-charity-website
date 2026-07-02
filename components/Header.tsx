// components/Header.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, XIcon } from "./SocialIcons";
import DonateButton from "./DonateButton";
import MobileNav from "./MobileNav";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/p/SMILE-Childrens-Charity-61555674308075/", icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/smilechildrenscharity", icon: InstagramIcon },
  { label: "X", href: "https://www.twitter.com/smilechildrens", icon: XIcon },
];

interface NavGroup {
  label: string;
  items: { label: string; href: string }[];
}

const navGroups: NavGroup[] = [
  {
    label: "About",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/our-story" },
      { label: "Our Impact", href: "/impact" },
      { label: "Meet Our Families", href: "/families" },
    ],
  },
  {
    label: "Get Involved",
    items: [
      { label: "SMILE House", href: "/smile-house" },
      { label: "Family Support", href: "/family-support" },
      { label: "Fundraising", href: "/fundraising" },
      { label: "Corporate Partnerships", href: "/corporate" },
      { label: "Legacy Giving", href: "/legacy" },
      { label: "Volunteer", href: "/volunteer" },
    ],
  },
];

const flatLinks = [
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      <div className="hidden lg:block bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a
              href="tel:01698642411"
              className="group flex items-center gap-2 text-white/70 hover:text-yellow transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-all group-hover:bg-yellow group-hover:text-black group-hover:scale-110">
                <Phone className="w-3 h-3" strokeWidth={2} />
              </span>
              01698 642411
            </a>
            <a
              href="mailto:smilechildrenscharity@gmail.com"
              className="group flex items-center gap-2 text-white/70 hover:text-yellow transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-all group-hover:bg-yellow group-hover:text-black group-hover:scale-110">
                <Mail className="w-3 h-3" strokeWidth={2} />
              </span>
              smilechildrenscharity@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/70 transition-all hover:bg-yellow hover:text-black hover:scale-110"
              >
                <s.icon className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" aria-label="SMILE Children's Charity — home">
              <Image
                src="/logo.png"
                alt="SMILE Children's Charity"
                width={140}
                height={64}
                priority
                className="w-[140px] h-auto"
              />
            </Link>

            <nav className="hidden lg:flex flex-1 items-center justify-center gap-10" aria-label="Main navigation">
              {navGroups.map((group) => (
                <div
                  key={group.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(group.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="relative flex items-center gap-1 text-base font-semibold text-black hover:text-yellow-dark transition-colors py-2"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === group.label}
                  >
                    {group.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        openDropdown === group.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span
                      className={`absolute left-0 -bottom-0.5 h-0.5 bg-yellow rounded-full transition-all duration-300 ease-out ${
                        openDropdown === group.label ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`absolute top-full left-0 w-56 bg-white rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.15)] border border-gray-100 py-2 transition-all ${
                      openDropdown === group.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 hover:text-yellow-dark transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              {flatLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-base font-semibold text-black hover:text-yellow-dark transition-colors py-2"
                >
                  {link.label}
                  <span
                    className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-yellow rounded-full transition-all duration-300 ease-out group-hover:w-full"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <DonateButton size="sm" />
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Open navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
