// components/MobileNav.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import DonateButton from "./DonateButton";
import { FacebookIcon, InstagramIcon, XIcon } from "./SocialIcons";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/p/SMILE-Childrens-Charity-61555674308075/", icon: FacebookIcon, brandClass: "bg-[#1877F2] text-white" },
  { label: "Instagram", href: "https://www.instagram.com/smilechildrenscharity", icon: InstagramIcon, brandClass: "bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] text-white" },
  { label: "X", href: "https://www.twitter.com/smilechildrens", icon: XIcon, brandClass: "bg-black text-white" },
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

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-heading font-bold text-black">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-black transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navGroups.map((group) => (
              <li key={group.label}>
                <button
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                  aria-expanded={openGroup === group.label}
                >
                  {group.label}
                  <svg
                    className={`w-4 h-4 transition-transform ${openGroup === group.label ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openGroup === group.label && (
                  <ul className="pl-4 space-y-1 mt-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {flatLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block px-3 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-black transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-100 px-3 space-y-3">
            <a href="tel:01698642411" className="flex items-center gap-3 text-sm text-gray-600 hover:text-black transition-colors">
              <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" strokeWidth={2} />
              </span>
              01698 642411
            </a>
            <a href="mailto:smilechildrenscharity@gmail.com" className="flex items-center gap-3 text-sm text-gray-600 hover:text-black transition-colors min-w-0">
              <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" strokeWidth={2} />
              </span>
              <span className="truncate">smilechildrenscharity@gmail.com</span>
            </a>
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${s.brandClass}`}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <DonateButton size="md" />
        </div>
      </div>
    </>
  );
}
