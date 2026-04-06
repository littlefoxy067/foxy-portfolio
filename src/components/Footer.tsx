import { Github, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-neon-cyan/40 rounded flex items-center justify-center">
            <span className="font-display text-xs text-neon-cyan">FT</span>
          </div>
          <div>
            <p className="font-display text-xs text-white tracking-widest">FOXY TECH</p>
            <p className="font-body text-xs text-gray-600">Powered by Casper Tech Kenya</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/wolfix-bots"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-neon-cyan transition-colors"
          >
            <Github size={18} />
          </a>
          <a href="#hero" className="text-gray-500 hover:text-neon-magenta transition-colors">
            <Zap size={18} />
          </a>
        </div>

        <p className="font-body text-xs text-gray-600 tracking-wider">
          © {new Date().getFullYear()} Foxy Tech · Built by Wolf
        </p>
      </div>
    </footer>
  );
}
