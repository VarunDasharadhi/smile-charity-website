interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
}

export default function SectionLabel({ children, dark = false }: SectionLabelProps) {
  return (
    <p
      className={`font-heading font-semibold text-sm uppercase tracking-widest mb-3 ${
        dark ? "text-yellow" : "text-black/60"
      }`}
    >
      {children}
    </p>
  );
}
