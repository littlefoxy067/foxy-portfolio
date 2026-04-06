export type AvatarAction = 'idle' | 'wave' | 'jump' | 'dance' | 'cartwheel' | 'nod' | 'shake' | 'talk';

export interface AvatarAppearance {
  skinColor: string;
  topColor: string;
  bottomColor: string;
  hairColor: string;
  hatColor: string;
  showHat: boolean;
}

export interface AvatarCommand {
  action?: AvatarAction;
  appearance?: Partial<AvatarAppearance>;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  color: 'cyan' | 'magenta';
  url: string;
  icon: string;
  github?: string;
}
