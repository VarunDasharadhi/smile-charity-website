// components/Header.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DonateButton from "./DonateButton";
import MobileNav from "./MobileNav";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Our Story", href: "/our-story" },
  { label: "Impact", href: "/impact" },
  { label: "SMILE House", href: "/smile-house" },
  { label: "Events", href: "/events" },
  { label: "Fundraising", href: "/fundraising" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
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

            <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-800 hover:text-yellow-dark transition-colors"
                >
                  {link.label}
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
