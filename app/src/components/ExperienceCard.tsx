import { forwardRef } from 'react';
import type { Experience } from '../data/portfolioData';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(
  ({ experience, index }, ref) => {
    const isLeft = index % 2 === 0;

    return (
      <div
        ref={ref}
        className={`relative md:w-[60%] ${
          isLeft ? 'md:mr-auto' : 'md:ml-auto'
        }`}
      >
        <div
          className={`p-8 bg-[#0A0A0A] border border-[#2A2A2A] border-l-2 border-l-[#C8A97E] transition-all duration-300 hover:border-[#3A3A3A] hover:shadow-[0_0_20px_rgba(200,169,126,0.05)] ${
            isLeft ? '' : ''
          }`}
        >
          <h4 className="text-lg font-bold text-[#E0E0E0] mb-1">
            {experience.company}
          </h4>
          <p className="text-base font-medium text-[#C8A97E] mb-2">
            {experience.role}
          </p>
          <p className="font-mono text-sm text-[#5A5A5A] italic mb-4">
            {experience.period}
          </p>
          <p className="text-[15px] text-[#9A9A9A] leading-relaxed whitespace-pre-line">
            {experience.description}
          </p>
        </div>

        {/* Timeline dot - desktop only */}
        <div
          className={`hidden md:block absolute top-8 w-3 h-3 rounded-full bg-[#C8A97E] border-2 border-[#050505] ${
            isLeft ? 'right-[-28px]' : 'left-[-28px]'
          }`}
        />
      </div>
    );
  }
);

ExperienceCard.displayName = 'ExperienceCard';
