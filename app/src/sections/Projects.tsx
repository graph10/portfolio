import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '../components/SectionLabel';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { projects } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card-wrapper');
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-[120px] bg-[#050505]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={labelRef} className="opacity-0 translate-y-[30px] mb-6">
          <SectionLabel text="ПРОЕКТЫ" />
        </div>

        <h2
          ref={titleRef}
          className="opacity-0 translate-y-[30px] text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase tracking-[-2px] mb-16"
          style={{
            background: 'linear-gradient(180deg, #E0E0E0 0%, #9A9A9A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Работы
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div key={project.id} className="project-card-wrapper opacity-0 translate-y-[50px]">
              <ProjectCard
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
