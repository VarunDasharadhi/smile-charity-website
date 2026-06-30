// components/MobileNav.tsx
"use client";
import { useEffect } from "react";
import Link from "next/link";
import DonateButton from "./DonateButton";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Our Story", href: "/our-story" },
  { label: "Impact", href: "/impact" },
  { label: "SMILE House", href: "/smile-house" },
  { label: "Families", href: "/families" },
  { label: "Events", href: "/events" },
  { label: "Fundraising", href: "/fundraising" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Contact", href: "/contact" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed top-0 right-0 h-full w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl">
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
            {navLinks.map((link) => (
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
