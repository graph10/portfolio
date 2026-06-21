import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '../components/SectionLabel';
import { aboutText } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

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

      if (paragraphsRef.current) {
        const paragraphs = paragraphsRef.current.querySelectorAll('.about-p');
        gsap.to(paragraphs, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.15,
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-[120px] bg-[#050505]"
    >
      <div className="max-w-[800px] mx-auto px-6">
        <div ref={labelRef} className="opacity-0 translate-y-[30px] mb-6">
          <SectionLabel text="ОБО МНЕ" />
        </div>

        <h2
          ref={titleRef}
          className="opacity-0 translate-y-[30px] text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase tracking-[-2px] mb-12"
          style={{
            background: 'linear-gradient(180deg, #E0E0E0 0%, #9A9A9A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Кто я
        </h2>

        <div ref={paragraphsRef} className="space-y-6">
          {aboutText.map((paragraph, idx) => (
            <p
              key={idx}
              className="about-p opacity-0 translate-y-[30px] text-lg text-[#9A9A9A] leading-[1.8]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
