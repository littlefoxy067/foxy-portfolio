import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'FoxyAI', href: '#ai' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-bg/90 backdrop-blur-md border-b border-neon-cyan/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 border border-neon-cyan/60 rounded flex items-center justify-center group-hover:shadow-neon-cyan transition-all">
            <span className="text-neon-cyan font-display text-sm font-bold">FT</span>
          </div>
          <span className="font-display text-sm text-white tracking-widest">
            FOXY<span className="text-neon-cyan">TECH</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm tracking-wider text-gray-400 hover:text-neon-cyan transition-colors uppercase"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#ai" className="hidden md:block btn-cyber text-xs">
          Chat with AI
        </a>

        {/* Mobile */}
        <button className="md:hidden text-neon-cyan" onClick={() => setOpen(p => !p)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark-bg/95 backdrop-blur-md border-t border-neon-cyan/10 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-base tracking-wider text-gray-300 hover:text-neon-cyan transition-colors uppercase"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
