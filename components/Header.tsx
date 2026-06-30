import Link from "next/link";
import Image from "next/image";
import DonateButton from "./DonateButton";

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
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="SMILE Children's Charity"
              width={140}
              height={64}
              priority
              className="w-[140px] h-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
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

          {/* Donate CTA — always visible */}
          <DonateButton size="sm" />
        </div>
      </div>
    </header>
  );
}
