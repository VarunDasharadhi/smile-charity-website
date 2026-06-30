interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: "white" | "gray" | "yellow" | "black";
}

export default function Section({ children, className = "", bg = "white" }: SectionProps) {
  const bgClasses = {
    white: "bg-white",
    gray:  "bg-gray-50",
    yellow: "bg-yellow",
    black: "bg-black text-white",
  };

  return (
    <section className={`py-16 md:py-24 ${bgClasses[bg]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
