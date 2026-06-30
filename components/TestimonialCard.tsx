// components/TestimonialCard.tsx
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  name: string;
  location?: string;
  avatarSrc?: string;
}

export default function TestimonialCard({
  quote,
  name,
  location,
  avatarSrc,
}: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col">
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
  );
}
