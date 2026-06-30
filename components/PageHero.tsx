import Link from "next/link";
import PhotoFrame from "./PhotoFrame";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  bg?: "yellow" | "navy" | "teal" | "white";
  imageSrc?: string;
  imageAlt?: string;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  bg = "yellow",
  imageSrc,
  imageAlt,
}: PageHeroProps) {
  const bgClasses = {
    yellow: "bg-yellow",
    navy: "bg-black",
    teal: "bg-teal",
    white: "bg-white border-b border-gray-100",
  };
  const isDark = bg === "navy" || bg === "teal";
  const titleColor = isDark ? "text-white" : "text-black";
  const subtitleColor = isDark ? "text-white/80" : "text-black/70";
  const btnClasses = isDark
    ? "bg-yellow text-black hover:bg-yellow-dark"
    : "bg-black text-white hover:bg-gray-800";

  const content = (
    <div>
      {eyebrow && (
        <p className={`font-heading font-semibold text-sm uppercase tracking-widest mb-3 ${
          isDark ? "text-yellow" : "text-black/60"
        }`}>
          {eyebrow}
        </p>
      )}
      <h1
        className={`font-heading text-4xl md:text-5xl font-bold ${titleColor} mb-4 max-w-2xl`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className={`${subtitleColor} text-lg max-w-xl${ctaLabel ? " mb-8" : ""}`}>
          {subtitle}
        </p>
      )}
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className={`inline-block mt-6 px-6 py-3 rounded-full font-bold transition-all ${btnClasses}`}
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );

  return (
    <section className={`py-16 md:py-24 ${bgClasses[bg]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {imageSrc ? (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {content}
            <PhotoFrame src={imageSrc} alt={imageAlt ?? title} accentColor={isDark ? "yellow" : "teal"} />
          </div>
        ) : (
          content
        )}
      </div>
    </section>
  );
}
