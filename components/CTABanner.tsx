import Link from "next/link";

interface CTABannerProps {
  heading: string;
  subtext?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  bg?: "yellow" | "navy" | "teal";
}

export default function CTABanner({
  heading,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  bg = "yellow",
}: CTABannerProps) {
  const bgClasses = {
    yellow: "bg-yellow",
    navy: "bg-black",
    teal: "bg-teal",
  };
  const isDark = bg !== "yellow";
  const textColor = isDark ? "text-white" : "text-black";
  const subtextColor = isDark ? "text-white/70" : "text-black/70";
  const primaryBtn = isDark
    ? "bg-yellow text-black hover:bg-yellow-dark"
    : "bg-black text-white hover:bg-gray-800";
  const secondaryBtn = isDark
    ? "border-2 border-white text-white hover:bg-white hover:text-black"
    : "border-2 border-black text-black hover:bg-black hover:text-white";

  return (
    <section className={`py-12 ${bgClasses[bg]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`font-heading text-3xl md:text-4xl font-extrabold tracking-tight ${textColor} mb-3`}>
          {heading}
        </h2>
        {subtext && (
          <p className={`${subtextColor} mb-8 max-w-xl mx-auto`}>{subtext}</p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={primaryHref}
            className={`inline-block px-6 py-3 rounded-full font-bold transition-all ${primaryBtn}`}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className={`inline-block px-6 py-3 rounded-full font-bold transition-all ${secondaryBtn}`}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
