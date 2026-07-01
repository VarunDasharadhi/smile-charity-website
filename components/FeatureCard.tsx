import type { LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: "yellow" | "teal" | "navy";
  delay?: number;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  tone = "yellow",
  delay = 0,
}: FeatureCardProps) {
  const toneClasses = {
    yellow: "bg-yellow text-black",
    teal: "bg-teal text-white",
    navy: "bg-black text-white",
  };

  return (
    <Reveal delay={delay}>
      <div className="group bg-white border border-gray-100 rounded-2xl p-6 h-full transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
        <span
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${toneClasses[tone]}`}
        >
          <Icon className="w-7 h-7" strokeWidth={2} />
        </span>
        <h3 className="relative inline-block font-heading font-bold text-black text-lg mb-2">
          {title}
          <span
            className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-yellow rounded-full transition-all duration-300 ease-out group-hover:w-full"
            aria-hidden="true"
          />
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </Reveal>
  );
}
