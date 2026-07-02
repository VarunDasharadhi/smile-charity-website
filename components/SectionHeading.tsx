import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  centered?: boolean;
  dark?: boolean;
  size?: "lg" | "sm";
  accent?: "yellow" | "navy";
}

export default function SectionHeading({
  eyebrow,
  title,
  centered = true,
  dark = false,
  size = "lg",
  accent = "yellow",
}: SectionHeadingProps) {
  return (
    <Reveal className={`${size === "lg" ? "mb-12" : "mb-8"} ${centered ? "text-center" : ""}`}>
      {eyebrow && <SectionLabel dark={dark}>{eyebrow}</SectionLabel>}
      <h2
        className={`font-heading font-extrabold tracking-tight inline-block text-balance ${
          size === "lg" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
        } ${dark ? "text-white" : "text-black"}`}
      >
        {title}
      </h2>
      <svg
        width={size === "lg" ? 190 : 130}
        height={size === "lg" ? 16 : 11}
        viewBox="0 0 190 16"
        className={`block ${size === "lg" ? "mt-3" : "mt-2"} ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      >
        <path
          d="M4 10 Q 34 1, 62 9 T 118 9 T 186 5"
          stroke={accent === "navy" ? "#2E3245" : "#FDD70E"}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </Reveal>
  );
}
