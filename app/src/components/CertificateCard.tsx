import type { Certificate } from '../data/certificatesData';

interface Props {
  certificate: Certificate;
  onClick: () => void;
}

export function CertificateCard({
  certificate,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        border border-[#2A2A2A]
        bg-[#111]
        p-6
        transition-all
        duration-300
        hover:border-[#C8A97E]
      "
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#E0E0E0]">
          {certificate.title}
        </h3>

        <p className="text-[#9A9A9A] text-sm">
          {certificate.issuer}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[#666] text-xs">
          {certificate.date}
        </span>

        <span
          className="
            text-[11px]
            uppercase
            border
            border-[#C8A97E]
            px-2 py-1
            text-[#C8A97E]
          "
        >
          {certificate.category}
        </span>
      </div>
    </div>
  );
}
