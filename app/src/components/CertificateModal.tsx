import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Certificate } from '../data/certificatesData';

interface Props {
  certificate: Certificate | null;
  open: boolean;
  onClose: () => void;
}

export function CertificateModal({
  certificate,
  open,
  onClose,
}: Props) {
  if (!certificate) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="max-w-[1400px] w-[95vw] max-h-[95vh] p-0 bg-[#1A1A1A] border border-[#2A2A3A] rounded-none"
      >
        <DialogTitle className="sr-only">
          {certificate.title}
        </DialogTitle>

        <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
          <div>
            <h2 className="text-xl font-bold text-[#E0E0E0]">
              {certificate.title}
            </h2>

            <p className="text-[#9A9A9A] text-sm">
              {certificate.issuer} • {certificate.date}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#9A9A9A] hover:text-[#E0E0E0]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="
              w-full
              max-h-[75vh]
              object-contain
            "
          />
        </div>

        <div className="px-6 pb-6 flex justify-center">
          <a
            href={certificate.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2.5
              border
              border-[#C8A97E]
              text-[#C8A97E]
              text-sm
              font-semibold
              hover:bg-[#C8A97E]
              hover:text-[#050505]
              transition-all
              duration-300
            "
          >
            Открыть PDF
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
