import Image from "next/image";

interface PhotoFrameProps {
  src?: string;
  alt: string;
  placeholder?: string;
  accentPosition?: "top-left" | "bottom-right";
  accentColor?: "yellow" | "teal";
  aspect?: "square" | "video";
}

export default function PhotoFrame({
  src,
  alt,
  placeholder,
  accentPosition = "top-left",
  accentColor = "yellow",
  aspect = "square",
}: PhotoFrameProps) {
  const aspectClass = aspect === "video" ? "aspect-video" : "aspect-square";
  const accentBg =
    accentColor === "teal"
      ? "bg-gradient-to-br from-teal-light to-teal"
      : "bg-[repeating-linear-gradient(45deg,#FDD70E_0,#FDD70E_5px,transparent_5px,transparent_14px)]";
  const accentPositionClasses =
    accentPosition === "bottom-right" ? "-bottom-4 -right-4" : "-top-4 -left-4";

  return (
    <div className="relative">
      <div
        className={`absolute ${accentPositionClasses} w-2/3 h-2/3 rounded-3xl opacity-50 ${accentBg}`}
        aria-hidden="true"
      />
      <div
        className={`relative ${aspectClass} rounded-3xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.18)]`}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm italic p-4 text-center">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}
