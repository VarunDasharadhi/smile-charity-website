import Link from "next/link";

interface IconLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  tone: "yellow" | "teal" | "navy" | "blue" | "teal-dark";
}

interface IconLinkRowProps {
  links: IconLink[];
}

export default function IconLinkRow({ links }: IconLinkRowProps) {
  const toneClasses = {
    yellow: "bg-yellow text-black",
    teal: "bg-teal text-white",
    navy: "bg-black text-white",
    blue: "bg-blue text-white",
    "teal-dark": "bg-teal-dark text-white",
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="flex flex-col items-center gap-2 group"
        >
          <span
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-[0_14px_30px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:scale-125 ${toneClasses[link.tone]}`}
          >
            <span className="inline-flex transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110">
              {link.icon}
            </span>
          </span>
          <span className="text-sm font-semibold text-black">{link.label}</span>
        </Link>
      ))}
    </div>
  );
}
