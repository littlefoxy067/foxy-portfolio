import { Code2, Globe, Cpu, Star } from 'lucide-react';
import { about } from '../lib/portfolioData';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-magenta/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/0 to-neon-cyan/30" />
          <h2 className="font-display text-2xl font-bold text-white tracking-widest">
            ABOUT <span className="text-neon-cyan">WOLF</span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-neon-magenta/0 to-neon-magenta/30" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <div className="flex flex-col gap-6">
            <div className="card-cyber rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded border border-neon-cyan/30 flex items-center justify-center">
                  <Code2 size={18} className="text-neon-cyan" />
                </div>
                <div>
                  <p className="font-display text-white text-sm">{about.name}</p>
                  <p className="font-body text-neon-cyan text-xs">{about.title}</p>
                </div>
              </div>
              <p className="font-body text-gray-300 text-base leading-relaxed">{about.bio}</p>
            </div>

            <div className="card-cyber rounded-lg p-6">
              <p className="font-body text-gray-400 leading-relaxed">{about.bio2}</p>
            </div>

            {/* Location & brand */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Globe size={14} className="text-neon-cyan" />
                <span className="font-body">{about.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Star size={14} className="text-neon-magenta" />
                <span className="font-body">Partner: {about.partner}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Cpu size={14} className="text-neon-cyan" />
                <span className="font-body">{about.brand}</span>
              </div>
            </div>
          </div>

          {/* Right: Skills */}
          <div>
            <h3 className="font-display text-sm text-neon-magenta tracking-widest mb-6 uppercase">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {about.skills.map((skill, i) => (
                <span
                  key={skill}
                  className="font-body text-sm px-4 py-2 rounded border transition-all duration-300 cursor-default"
                  style={{
                    borderColor: i % 2 === 0 ? 'rgba(0,229,255,0.3)' : 'rgba(255,0,255,0.3)',
                    color: i % 2 === 0 ? '#00e5ff' : '#ff00ff',
                    background: i % 2 === 0 ? 'rgba(0,229,255,0.04)' : 'rgba(255,0,255,0.04)',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Brand story */}
            <div className="mt-10 p-6 rounded-lg neon-border-magenta bg-dark-surface">
              <h4 className="font-display text-xs text-neon-magenta tracking-widest mb-3 uppercase">
                The Foxy Tech Story
              </h4>
              <p className="font-body text-gray-400 text-sm leading-relaxed">
                Foxy Tech started as one person's drive to build tools that actually work —
                fast bots, powerful APIs, slick streaming. Every project in the ecosystem
                is connected, sharing the same backbone: <span className="text-neon-cyan">Foxy API</span>.
                Built in Kenya. Built for the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
