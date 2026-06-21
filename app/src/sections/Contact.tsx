import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Send, Check } from 'lucide-react';
import { SectionLabel } from '../components/SectionLabel';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

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
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.to(emailRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.to(socialsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.4,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = personalInfo.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-[120px] bg-[#050505]"
    >
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <div ref={labelRef} className="opacity-0 translate-y-[30px] mb-6">
          <SectionLabel text="КОНТАКТЫ" />
        </div>

        <h2
          ref={titleRef}
          className="opacity-0 translate-y-[30px] text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase tracking-[-2px] mb-6"
          style={{
            background: 'linear-gradient(180deg, #E0E0E0 0%, #9A9A9A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Давайте работать
        </h2>

        <p
          ref={subtitleRef}
          className="opacity-0 translate-y-[30px] text-lg text-[#9A9A9A] mb-12"
        >
          Открыт к предложениям и интересным проектам.
        </p>

        <div ref={emailRef} className="opacity-0 translate-y-5">
          <button
            onClick={handleCopyEmail}
            className="text-xl font-semibold text-[#C8A97E] hover:text-[#E8C99A] hover:underline transition-colors duration-300 cursor-pointer bg-transparent border-none"
          >
            {personalInfo.email}
          </button>
          {copied && (
            <p className="text-sm text-[#4ADE80] mt-2 animate-in fade-in duration-200">
              <Check className="inline w-4 h-4 mr-1" />
              Скопировано!
            </p>
          )}
        </div>

        <div
          ref={socialsRef}
          className="opacity-0 translate-y-5 flex items-center justify-center gap-6 mt-8"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#9A9A9A] hover:text-[#C8A97E] transition-colors duration-300"
          >
            <Github size={18} />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <a
            href={personalInfo.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#9A9A9A] hover:text-[#C8A97E] transition-colors duration-300"
          >
            <Send size={18} />
            <span className="text-sm font-medium">Telegram</span>
          </a>
        </div>

        {/* Footer */}
        <p className="text-sm text-[#5A5A5A] mt-20">
          &copy; 2026 Roman Code. Все права защищены.
        </p>
      </div>
    </section>
  );
}
