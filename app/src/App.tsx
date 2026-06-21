import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Certificates } from './components/Certificates';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  const { scrollTo } = useSmoothScroll();

  const handleNavigate = (href: string) => {
    scrollTo(href);
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar onNavigate={handleNavigate} />
      <Hero onCtaClick={() => handleNavigate('#projects')} />
      <About />
      <Skills />
      <Certificates />
      <Projects />
      <Experience />
      <Contact />
    </div>
  );
}

export default App;
