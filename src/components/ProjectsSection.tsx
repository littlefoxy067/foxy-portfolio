import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../lib/portfolioData';

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* BG */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/0 to-neon-cyan/30" />
          <h2 className="font-display text-2xl font-bold text-white tracking-widest">
            THE <span className="text-neon-magenta">PROJECTS</span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-neon-magenta/0 to-neon-magenta/30" />
        </div>
        <p className="text-center font-body text-gray-500 text-sm mb-16 tracking-wider uppercase">
          6 projects · 1 ecosystem · infinite potential
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`group relative rounded-lg p-6 transition-all duration-300 cursor-default ${
                p.color === 'cyan' ? 'card-cyber' : 'card-cyber card-cyber-magenta'
              }`}
            >
              {/* Number */}
              <div
                className="absolute top-4 right-5 font-display text-5xl font-black opacity-5 select-none"
                style={{ color: p.color === 'cyan' ? '#00e5ff' : '#ff00ff' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon + Name */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded flex items-center justify-center text-2xl flex-shrink-0 border"
                  style={{
                    borderColor: p.color === 'cyan' ? 'rgba(0,229,255,0.3)' : 'rgba(255,0,255,0.3)',
                    background: p.color === 'cyan' ? 'rgba(0,229,255,0.06)' : 'rgba(255,0,255,0.06)',
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-display text-base text-white">{p.name}</h3>
                  <div
                    className="h-0.5 w-8 rounded mt-1"
                    style={{
                      background: p.color === 'cyan'
                        ? 'linear-gradient(90deg, #00e5ff, transparent)'
                        : 'linear-gradient(90deg, #ff00ff, transparent)',
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-gray-400 text-sm leading-relaxed mb-5">
                {p.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-display text-xs px-2 py-0.5 rounded-sm"
                    style={{
                      color: p.color === 'cyan' ? '#00e5ff' : '#ff00ff',
                      background: p.color === 'cyan' ? 'rgba(0,229,255,0.08)' : 'rgba(255,0,255,0.08)',
                      border: `1px solid ${p.color === 'cyan' ? 'rgba(0,229,255,0.2)' : 'rgba(255,0,255,0.2)'}`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-auto">
                {p.url !== '#' && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-body text-xs hover:opacity-80 transition-opacity"
                    style={{ color: p.color === 'cyan' ? '#00e5ff' : '#ff00ff' }}
                  >
                    <ExternalLink size={12} />
                    Live Site
                  </a>
                )}
                {p.github && p.github !== '#' && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-body text-xs text-gray-500 hover:text-white transition-colors"
                  >
                    <Github size={12} />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
