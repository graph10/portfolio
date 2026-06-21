import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '../components/SectionLabel';
import { ExperienceCard } from '../components/ExperienceCard';
import { experience } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

      // Timeline line animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.0,
            ease: 'power2.inOut',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Experience cards animation
      if (timelineRef.current) {
        const cards = timelineRef.current.querySelectorAll('.exp-card-wrapper');
        cards.forEach((card, idx) => {
          gsap.to(card, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: 0.3 + idx * 0.2,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-[120px] bg-[#050505]"
    >
      <div className="max-w-[800px] mx-auto px-6">
        <div ref={labelRef} className="opacity-0 translate-y-[30px] mb-6">
          <SectionLabel text="ОПЫТ" />
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
          Карьера
        </h2>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line - desktop only */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#2A2A2A] -translate-x-1/2"
            style={{ transformOrigin: 'top' }}
          />

          {/* Experience cards */}
          <div className="space-y-8 md:space-y-12">
            {experience.map((exp, idx) => (
              <div
                key={`${exp.company}-${exp.period}`}
                className={`exp-card-wrapper opacity-0 ${
                  idx % 2 === 0 ? 'md:-translate-x-10' : 'md:translate-x-10'
                }`}
              >
                <ExperienceCard experience={exp} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
