import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '../components/SectionLabel';
import { SkillCard } from '../components/SkillCard';
import { skills } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
        const cards = gridRef.current.querySelectorAll('.skill-card-wrapper');
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        const bars = gridRef.current.querySelectorAll('.skill-bar-fill');
        gsap.fromTo(
          bars,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.0,
            ease: 'power2.out',
            stagger: 0.08,
            transformOrigin: 'left',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-[120px] bg-[#050505]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={labelRef} className="opacity-0 translate-y-[30px] mb-6">
          <SectionLabel text="НАВЫКИ" />
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
          Стек и компетенции
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card-wrapper opacity-0 translate-y-10">
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
