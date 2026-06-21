import { useEffect, useState, useCallback } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { codeToHtml } from 'shiki';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  const [highlightedSnippets, setHighlightedSnippets] = useState<
    { title: string; html: string }[]
  >([]);

  const highlightSnippets = useCallback(async (proj: Project) => {
    const results = await Promise.all(
      proj.codeSnippets.map(async (snippet) => {
        const html = await codeToHtml(snippet.code, {
          lang: snippet.language as 'typescript' | 'python' | 'go' | 'javascript',
          theme: 'github-dark',
        });
        return { title: snippet.title, html };
      })
    );
    setHighlightedSnippets(results);
  }, []);

  useEffect(() => {
    if (!project) {
      setHighlightedSnippets([]);
      return;
    }
    highlightSnippets(project);
  }, [project, highlightSnippets]);

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="max-w-[800px] max-h-[90vh] overflow-y-auto bg-[#1A1A1A] border border-[#2A2A3A] p-0 rounded-none"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#2A2A2A #0A0A0A',
        }}
      >
        <DialogTitle className="sr-only">{project.title}</DialogTitle>

        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-0">
          <h2 className="text-2xl font-bold text-[#E0E0E0]">
            {project.title}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-[#9A9A9A] hover:text-[#E0E0E0] transition-colors bg-transparent border-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image */}
        {project.images.length > 0 && (
          <div className="mt-6 px-8">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full max-h-[400px] object-cover"
            />
          </div>
        )}

        {/* Description */}
        <div className="px-8 py-6">
          <p className="text-[17px] text-[#9A9A9A] leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Technologies */}
        <div className="px-8 pb-6">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium uppercase tracking-[0.03em] px-2.5 py-1 border border-[#C8A97E] text-[#C8A97E]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Code Snippets */}
        {project.codeSnippets.length > 0 && (
          <div className="px-8 pb-6">
            <h4 className="text-sm font-semibold uppercase tracking-[0.05em] text-[#E0E0E0] mb-4">
              Код
            </h4>
            {highlightedSnippets.length > 0
              ? highlightedSnippets.map((snippet, idx) => (
                  <div key={idx} className="mb-4">
                    <h5 className="text-[13px] font-semibold text-[#C8A97E] mb-2">
                      {snippet.title}
                    </h5>
                    <div
                      className="bg-[#0A0A0A] border border-[#2A2A2A] overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: snippet.html }}
                    />
                  </div>
                ))
              : project.codeSnippets.map((snippet, idx) => (
                  <div key={idx} className="mb-4">
                    <h5 className="text-[13px] font-semibold text-[#C8A97E] mb-2">
                      {snippet.title}
                    </h5>
                    <pre className="bg-[#0A0A0A] border border-[#2A2A2A] p-5 overflow-x-auto">
                      <code className="font-mono text-[13px] leading-relaxed text-[#9A9A9A]">
                        {snippet.code}
                      </code>
                    </pre>
                  </div>
                ))}
          </div>
        )}

        {/* Links */}
        <div className="px-8 pb-8 flex gap-4">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#C8A97E] text-[#C8A97E] text-sm font-semibold hover:bg-[#C8A97E] hover:text-[#050505] transition-all duration-300"
            >
              <Github size={16} />
              GitHub
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#C8A97E] text-[#C8A97E] text-sm font-semibold hover:bg-[#C8A97E] hover:text-[#050505] transition-all duration-300"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
