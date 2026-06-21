import { forwardRef } from 'react';
import type { Project } from '../data/portfolioData';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, onClick }, ref) => {
    const initials = project.title
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();

    return (
      <div
        ref={ref}
        onClick={onClick}
        className="border border-[#2A2A2A] bg-[#0A0A0A] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#C8A97E] hover:shadow-[0_0_30px_rgba(200,169,126,0.08)] hover:-translate-y-1"
      >
        {/* Image area */}
        <div className="h-[200px] w-full relative">
          {project.images.length > 0 ? (
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center">
              <span className="text-[3rem] font-extrabold text-[#3A3A3A] select-none">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Content area */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#E0E0E0] mb-3">
            {project.title}
          </h3>
          <p className="text-[15px] text-[#9A9A9A] leading-relaxed mb-4 line-clamp-3">
            {project.shortDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium uppercase tracking-[0.03em] px-2.5 py-1 border border-[#2A2A2A] text-[#9A9A9A] transition-colors duration-200 hover:border-[#C8A97E] hover:text-[#C8A97E]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';
