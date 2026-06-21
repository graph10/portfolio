import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Download } from 'lucide-react';

import { HeroCanvas } from '../components/HeroCanvas';
import { SectionLabel } from '../components/SectionLabel';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  onCtaClick: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    tl.to(
      labelRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      0.2
    )
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        0.4
      )
      .to(
        roleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        0.6
      )
      .to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        0.8
      )
      .to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        1.0
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-[100dvh] flex items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* WebGL Canvas */}
      <HeroCanvas />

      {/* Grain */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.035,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          boxShadow:
            'inset 0 0 200px 60px rgba(0,0,0,0.75)',
        }}
      />

      {/* Content */}
      <div className="relative z-[3] text-center px-6 max-w-[700px]">
        <div
          ref={labelRef}
          className="opacity-0 translate-y-5 mb-6"
        >
          <SectionLabel text="ПОРТФОЛИО" />
        </div>

        <h1
          ref={titleRef}
          className="
            opacity-0
            translate-y-10
            text-[clamp(3rem,8vw,6.5rem)]
            font-black
            text-[#E0E0E0]
            uppercase
            tracking-[-2.5px]
            leading-[1.05]
          "
          style={{
            textShadow:
              '0 0 40px rgba(200,169,126,0.1)',
          }}
        >
          {personalInfo.name}
        </h1>

        <p
          ref={roleRef}
          className="
            opacity-0
            translate-y-5
            text-[clamp(1.125rem,2vw,1.5rem)]
            font-normal
            text-[#9A9A9A]
            mt-4
            tracking-[-0.2px]
          "
        >
          {personalInfo.role}
        </p>

        <p
          ref={taglineRef}
          className="
            opacity-0
            translate-y-5
            text-lg
            text-[#9A9A9A]
            mt-6
            max-w-[560px]
            mx-auto
            leading-[1.8]
          "
        >
          {personalInfo.tagline}
        </p>

        <div
          ref={buttonsRef}
          className="
            opacity-0
            translate-y-5
            mt-10
            flex
            flex-col
            sm:flex-row
            justify-center
            gap-4
          "
        >
          <button
            onClick={onCtaClick}
            className="
              px-8 py-3.5
              border
              border-[#C8A97E]
              text-[#C8A97E]
              text-sm
              font-semibold
              uppercase
              transition-all
              duration-300
              hover:bg-[#C8A97E]
              hover:text-[#050505]
              hover:shadow-[0_0_30px_rgba(200,169,126,0.25)]
            "
          >
            Посмотреть проекты
          </button>

          <a
            href="/resume/Resume_Kulikov_Roman.pdf"
            download
            className="
              px-8 py-3.5
              flex
              items-center
              justify-center
              gap-2
              border
              border-[#2A2A2A]
              text-[#E0E0E0]
              text-sm
              font-semibold
              uppercase
              transition-all
              duration-300
              hover:border-[#C8A97E]
              hover:text-[#C8A97E]
              hover:shadow-[0_0_30px_rgba(200,169,126,0.15)]
            "
          >
            <Download size={16} />
            Скачать резюме
          </a>
        </div>
      </div>
    </section>
  );
}