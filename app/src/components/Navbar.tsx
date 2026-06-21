import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Навыки', href: '#skills' },
  { label: 'Проекты', href: '#projects' },
  { label: 'Сертификаты', href: '#certificates' },
  { label: 'Опыт', href: '#experience' },
  { label: 'Контакты', href: '#contact' },
];

interface NavbarProps {
  onNavigate: (href: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) =>
      link.href.slice(1)
    );

    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);

      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () =>
      observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (href: string) => {
    onNavigate(href);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(26,26,26,0.85)] backdrop-blur-[12px]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">

        <button
          onClick={() => handleClick('#')}
          className="font-mono text-xl font-bold text-[#C8A97E] tracking-[-0.5px] hover:text-[#E8C99A] transition-colors"
        >
          {'<RC/>'}
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() =>
                handleClick(link.href)
              }
              className={`text-sm font-medium uppercase tracking-[0.05em] transition-colors duration-300 ${
                activeSection ===
                link.href.slice(1)
                  ? 'text-[#C8A97E]'
                  : 'text-[#9A9A9A] hover:text-[#C8A97E]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <Sheet
          open={mobileOpen}
          onOpenChange={setMobileOpen}
        >
          <SheetTrigger
            asChild
            className="md:hidden"
          >
            <button className="text-[#E0E0E0] p-2">
              <Menu size={24} />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[280px] bg-[#1A1A1A] border-r border-[#2A2A2A] p-0"
          >
            <div className="flex flex-col pt-16 px-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() =>
                    handleClick(link.href)
                  }
                  className={`text-left py-4 text-base font-medium uppercase tracking-[0.05em] transition-colors border-b border-[#2A2A2A] ${
                    activeSection ===
                    link.href.slice(1)
                      ? 'text-[#C8A97E]'
                      : 'text-[#9A9A9A] hover:text-[#C8A97E]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}