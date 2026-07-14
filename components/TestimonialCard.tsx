// components/TestimonialCard.tsx
import Image from "next/image";
import Reveal from "./Reveal";

interface TestimonialCardProps {
  quote: string;
  name: string;
  location?: string;
  avatarSrc?: string;
  delay?: number;
}

export default function TestimonialCard({
  quote,
  name,
  location,
  avatarSrc,
  delay = 0,
}: TestimonialCardProps) {
  const initials = name
    .replace(/[^a-zA-Z\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Reveal delay={delay} className="h-full">
    <div className="bg-white rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-[0_28px_50px_rgba(0,0,0,0.12)]">
      <span className="text-yellow font-heading text-5xl font-extrabold leading-none mb-4 select-none">
        &ldquo;
      </span>
      <p className="text-gray-600 italic text-base leading-relaxed flex-1 mb-6">
        {quote}
      </p>
      <div className="flex items-center gap-3">
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-yellow flex items-center justify-center text-black font-bold font-heading text-sm flex-shrink-0">
            {initials}
          </div>
        )}
        <div>
          <p className="font-heading font-bold text-black text-sm">{name}</p>
          {location && (
            <p className="text-gray-500 text-xs">{location}</p>
          )}
        </div>
      </div>
    </div>
    </Reveal>
  );
}
