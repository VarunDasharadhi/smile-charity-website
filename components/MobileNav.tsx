// components/MobileNav.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DonateButton from "./DonateButton";

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
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ease-in-out ${
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
        </nav>
        <div className="p-4 border-t border-gray-100">
          <DonateButton size="md" />
        </div>
      </div>
    </>
  );
}
