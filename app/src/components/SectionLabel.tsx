interface SectionLabelProps {
  text: string;
  className?: string;
}

export function SectionLabel({ text, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`text-sm font-medium uppercase tracking-[0.05em] text-[#C8A97E] ${className}`}
    >
      {text}
    </span>
  );
}
