import Link from "next/link";

interface EventCardProps {
  day: string;
  month: string;
  title: string;
  location: string;
  description?: string;
  href: string;
}

export default function EventCard({
  day,
  month,
  title,
  location,
  description,
  href,
}: EventCardProps) {
  return (
    <Link
      href={href}
      className="flex gap-4 p-5 border border-gray-100 rounded-2xl hover:shadow-md transition-all hover:-translate-y-0.5 group"
    >
      <div className="flex-shrink-0 w-14 h-14 bg-yellow rounded-xl flex flex-col items-center justify-center">
        <span className="font-heading font-extrabold text-black text-lg leading-none">
          {day}
        </span>
        <span className="font-heading font-semibold text-black text-xs uppercase leading-none mt-0.5">
          {month}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="font-heading font-bold text-black text-base group-hover:text-yellow-dark transition-colors mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-1">{location}</p>
        {description && (
          <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  );
}
