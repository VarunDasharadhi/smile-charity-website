import SectionLabel from "./SectionLabel";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  centered?: boolean;
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  centered = true,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
      <h2
        className={`font-heading text-3xl md:text-4xl font-bold inline-block ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      <svg
        width="170"
        height="14"
        viewBox="0 0 170 14"
        className={`block mt-2 ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      >
        <path
          d="M4 9 Q 30 1, 56 8 T 106 8 T 166 5"
          stroke="#FDD70E"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
