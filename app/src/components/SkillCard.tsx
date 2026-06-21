import { forwardRef } from 'react';
import type { Skill } from '../data/portfolioData';

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard = forwardRef<HTMLDivElement, SkillCardProps>(
  ({ skill }, ref) => {
    return (
      <div
        ref={ref}
        className="p-6 border border-[#2A2A2A] bg-[#0A0A0A] transition-all duration-300 hover:border-[#3A3A3A] hover:shadow-[0_0_20px_rgba(200,169,126,0.05)]"
      >
        <h4 className="text-base font-semibold text-[#E0E0E0] mb-3">
          {skill.name}
        </h4>
        <div className="h-1 bg-[#2A2A2A] overflow-hidden">
          <div
            className="skill-bar-fill h-full origin-left"
            style={{
              width: `${skill.level}%`,
              background: 'linear-gradient(90deg, #C8A97E 0%, #E8C99A 100%)',
            }}
          />
        </div>
        <span className="font-mono text-sm text-[#9A9A9A] mt-2 block text-right">
          {skill.level}%
        </span>
      </div>
    );
  }
);

SkillCard.displayName = 'SkillCard';
