import { useEffect, useState } from 'react';
import { ChevronDown, Github, Zap } from 'lucide-react';
import AvatarCanvas from './avatar/AvatarCanvas';
import type { AvatarAction, AvatarAppearance } from '../lib/types';

interface Props {
  action: AvatarAction;
  appearance?: Partial<AvatarAppearance>;
}

const TITLES = [
  'Full-Stack Developer',
  'Bot Architect',
  'Streaming Pioneer',
  'API Engineer',
  'Cyberpunk Creator',
];

export default function HeroSection({ action, appearance }: Props) {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = TITLES[titleIdx];
    if (typing) {
      if (displayed.length < target.length) {
        const timer = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(timer);
      }
    } else {
      if (displayed.length > 0) {
        const timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(timer);
      } else {
        setTitleIdx(i => (i + 1) % TITLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, titleIdx]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center cyber-grid overflow-hidden">
      {/* Scanline */}
      <div className="scan-line" />

      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-neon-magenta/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left: Text */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div className="flex items-center gap-2 w-fit">
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
            <span className="font-display text-xs text-neon-cyan tracking-widest uppercase">
              Foxy Tech — Kenya
            </span>
          </div>

          {/* Name */}
          <div>
            <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-tight">
              WOLF
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-neon-magenta mt-2 rounded" />
          </div>

          {/* Animated title */}
          <p className="font-display text-xl md:text-2xl text-neon-cyan typing-cursor min-h-[2rem]">
            {displayed}
          </p>

          {/* Bio */}
          <p className="font-body text-lg text-gray-400 max-w-lg leading-relaxed">
            Building bots, streaming platforms, and APIs from Kenya.
            Cyberpunk aesthetic. Production-grade code. Always shipping.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-2">
            <a href="#projects" className="btn-cyber text-sm">
              <Zap size={14} className="inline mr-2" />
              View Projects
            </a>
            <a href="#ai" className="btn-cyber btn-cyber-magenta text-sm">
              Chat with FoxyAI
            </a>
            <a
              href="https://github.com/wolfix-bots"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-body text-sm"
            >
              <Github size={18} />
              <span>wolfix-bots</span>
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-4 pt-6 border-t border-white/5">
            {[
              { value: '6+', label: 'Projects' },
              { value: '85+', label: 'API Endpoints' },
              { value: '∞', label: 'Ambition' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display text-2xl text-neon-cyan">{s.value}</div>
                <div className="font-body text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Avatar */}
        <div className="relative w-full h-[500px] lg:h-[560px]">
          <div className="absolute inset-0 rounded-2xl overflow-hidden neon-border-cyan">
            <AvatarCanvas action={action} appearance={appearance} height="100%" />
          </div>
          {/* Avatar label */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-dark-bg/80 backdrop-blur-sm px-4 py-2 rounded font-display text-xs text-neon-cyan border border-neon-cyan/20 whitespace-nowrap">
            FOXYAI AVATAR — DRAG TO ROTATE
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-display text-xs text-gray-600 tracking-widest">SCROLL</span>
        <ChevronDown size={16} className="text-neon-cyan/50" />
      </div>
    </section>
  );
}
