import Link from "next/link";

interface IconLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  tone: "yellow" | "teal" | "navy";
}

interface IconLinkRowProps {
  links: IconLink[];
}

export default function IconLinkRow({ links }: IconLinkRowProps) {
  const toneClasses = {
    yellow: "bg-yellow text-black",
    teal: "bg-teal text-white",
    navy: "bg-black text-white",
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
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_14px_30px_rgba(0,0,0,0.15)] transition-transform group-hover:-translate-y-1 ${toneClasses[link.tone]}`}
          >
            {link.icon}
          </span>
          <span className="text-xs font-semibold text-black">{link.label}</span>
        </Link>
      ))}
    </div>
  );
}
