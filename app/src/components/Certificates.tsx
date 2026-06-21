import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  certificates,
  type Certificate,
} from '../data/certificatesData';

import { CertificateCard } from './CertificateCard';
import { CertificateModal } from './CertificateModal';

export function Certificates() {
  const [selected, setSelected] =
    useState<Certificate | null>(null);

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(['Все']);

  const categories = useMemo(() => {
    return [
      'Все',
      ...new Set(
        certificates
          .map((c) => c.category)
          .filter(Boolean)
      ),
    ];
  }, []);

  const filteredCertificates =
    selectedCategories.includes('Все')
      ? certificates
      : certificates.filter((certificate) =>
          selectedCategories.includes(
            certificate.category
          )
        );

  const toggleCategory = (category: string) => {
    if (category === 'Все') {
      setSelectedCategories(['Все']);
      return;
    }

    let updated = selectedCategories.filter(
      (c) => c !== 'Все'
    );

    if (updated.includes(category)) {
      updated = updated.filter(
        (c) => c !== category
      );
    } else {
      updated.push(category);
    }

    if (!updated.length) {
      updated = ['Все'];
    }

    setSelectedCategories(updated);
  };

  return (
    <section
      id="certificates"
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-[#C8A97E] uppercase tracking-widest text-sm">
            Сертификаты
          </p>

          <h2 className="text-4xl font-bold text-[#E0E0E0] mt-3">
            Подтверждение знаний
          </h2>

          <div className="flex flex-wrap gap-3 mt-8">
            {categories.map((category) => {
              const active =
                selectedCategories.includes(category);

              return (
                <button
                  key={category}
                  onClick={() =>
                    toggleCategory(category)
                  }
                  className={`
                    px-5 py-2 rounded-full
                    border text-sm font-medium
                    transition-all duration-300

                    ${
                      active
                        ? `
                          bg-[#C8A97E]
                          text-black
                          border-[#C8A97E]
                          shadow-[0_0_20px_rgba(200,169,126,0.25)]
                        `
                        : `
                          border-[#2A2A2A]
                          text-[#8A8A8A]
                          hover:border-[#C8A97E]
                          hover:text-[#E0E0E0]
                        `
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map(
              (certificate) => (
                <motion.div
                  key={`${certificate.title}-${certificate.issuer}`}
                  layout
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <CertificateCard
                    certificate={certificate}
                    onClick={() =>
                      setSelected(certificate)
                    }
                  />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        <CertificateModal
          certificate={selected}
          open={!!selected}
          onClose={() => setSelected(null)}
        />
      </div>
    </section>
  );
}