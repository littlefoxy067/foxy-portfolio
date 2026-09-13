import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import AiSection from './components/AiSection';
import Footer from './components/Footer';
import type { AvatarAction, AvatarAppearance, AvatarCommand } from './lib/types';

const DEFAULT_APPEARANCE: Partial<AvatarAppearance> = {
  skinColor: '#FDBCB4',
  topColor: '#00e5ff',
  bottomColor: '#1a1a3e',
  hairColor: '#2d2d2d',
  hatColor: '#ff00ff',
  showHat: false,
};

export default function App() {
  const [avatarAction, setAvatarAction] = useState<AvatarAction>('idle');
  const [avatarAppearance, setAvatarAppearance] = useState<Partial<AvatarAppearance>>(DEFAULT_APPEARANCE);

  const handleAvatarCommand = useCallback((cmd: AvatarCommand) => {
    if (cmd.action) {
      setAvatarAction(cmd.action);
      if (['wave', 'jump', 'dance', 'cartwheel', 'nod', 'shake'].includes(cmd.action)) {
        setTimeout(() => setAvatarAction('idle'), cmd.action === 'cartwheel' ? 4000 : cmd.action === 'dance' ? 5000 : 3000);
      }
    }
    if (cmd.appearance) {
      setAvatarAppearance(prev => ({ ...prev, ...cmd.appearance }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <main>
        <HeroSection action={avatarAction} appearance={avatarAppearance} />
        <AboutSection />
        <AiSection
          onAvatarCommand={handleAvatarCommand}
          avatarAction={avatarAction}
          avatarAppearance={avatarAppearance}
        />
      </main>
      <Footer />
    </div>
  );
}
