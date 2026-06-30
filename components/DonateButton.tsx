import Link from "next/link";

interface DonateButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
  label?: string;
}

export default function DonateButton({
  size = "md",
  variant = "primary",
  label = "Donate Now",
}: DonateButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-yellow text-black hover:bg-yellow-dark font-bold",
    outline: "border-2 border-yellow text-yellow hover:bg-yellow hover:text-black font-bold",
  };

  return (
    <Link
      href="/donate"
      className={`inline-block rounded-full transition-all ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {label}
    </Link>
  );
}
