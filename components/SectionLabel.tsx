interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-yellow font-heading font-semibold text-sm uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}
