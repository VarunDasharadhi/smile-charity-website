import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

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
    <Reveal className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && <SectionLabel dark={dark}>{eyebrow}</SectionLabel>}
      <h2
        className={`font-heading text-4xl md:text-5xl font-extrabold tracking-tight inline-block ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      <svg
        width="190"
        height="16"
        viewBox="0 0 190 16"
        className={`block mt-3 ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      >
        <path
          d="M4 10 Q 34 1, 62 9 T 118 9 T 186 5"
          stroke="#FDD70E"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </Reveal>
  );
}
