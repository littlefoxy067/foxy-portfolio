import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';
import AvatarCanvas from './avatar/AvatarCanvas';
import type { AvatarAction, AvatarAppearance, AvatarCommand, ChatMessage } from '../lib/types';
import { DEFAULT_APPEARANCE } from './avatar/AvatarCanvas';

const AVATAR_CMD_REGEX = /\[AVATAR:(\{.*?\})\]/g;

function parseAvatarCommands(text: string): { cleanText: string; command: AvatarCommand | null } {
  let command: AvatarCommand | null = null;
  const matches = [...text.matchAll(AVATAR_CMD_REGEX)];
  if (matches.length > 0) {
    try {
      command = JSON.parse(matches[matches.length - 1][1]);
    } catch { /* ignore parse errors */ }
  }
  const cleanText = text.replace(AVATAR_CMD_REGEX, '').trim();
  return { cleanText, command };
}

const QUICK_PROMPTS = [
  { label: '👋 Say hi', msg: 'Hey! Introduce yourself!' },
  { label: '🎬 FoxyStream', msg: 'Tell me about FoxyStream' },
  { label: '⚡ Foxy API', msg: 'What is the Foxy API?' },
  { label: '🕺 Dance for me', msg: 'Do a dance!' },
  { label: '🎩 Wear a green hat', msg: 'Can you wear a green hat?' },
  { label: '🔴 Red shirt', msg: 'Make your shirt red please' },
  { label: '🤸 Cartwheel!', msg: 'Do a cartwheel!' },
  { label: '💼 Skills?', msg: "What are Wolf's skills?" },
];

interface Props {
  onAvatarCommand: (cmd: AvatarCommand) => void;
  avatarAction: AvatarAction;
  avatarAppearance: Partial<AvatarAppearance>;
}

export default function AiSection({ onAvatarCommand, avatarAction, avatarAppearance }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const sendMessage = useCallback(async (userMsg: string) => {
    if (!userMsg.trim() || streaming) return;

    const newMsg: ChatMessage = { role: 'user', content: userMsg.trim() };
    const history = [...messages, newMsg];
    setMessages(history);
    setInput('');
    setStreaming(true);
    setStreamingText('');

    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
        signal: abortRef.current.signal,
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) {
              // Parse and apply avatar command
              const { cleanText, command } = parseAvatarCommands(fullText);
              setStreamingText('');
              setMessages(prev => [...prev, { role: 'assistant', content: cleanText }]);
              if (command) onAvatarCommand(command);
              setStreaming(false);
              return;
            }
            if (data.content) {
              fullText += data.content;
              const { cleanText } = parseAvatarCommands(fullText);
              setStreamingText(cleanText);
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Oops — I'm having a moment. Try again! [AVATAR:{\"action\":\"shake\"}]",
        }]);
        onAvatarCommand({ action: 'shake' });
      }
      setStreaming(false);
      setStreamingText('');
    }
  }, [messages, streaming, onAvatarCommand]);

  const handleQuick = (msg: string) => sendMessage(msg);

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setStreamingText('');
    setStreaming(false);
    onAvatarCommand({ action: 'idle' });
  };

  return (
    <section id="ai" className="py-24 relative overflow-hidden">
      {/* BG glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-neon-magenta/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/0 to-neon-cyan/30" />
          <h2 className="font-display text-2xl font-bold text-white tracking-widest">
            CHAT WITH <span className="text-neon-cyan">FOXYAI</span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-neon-cyan/0 to-neon-cyan/30" />
        </div>
        <p className="text-center font-body text-gray-500 text-sm mb-12 tracking-wider">
          Ask me anything about Wolf & Foxy Tech · Control the avatar with natural language
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Avatar */}
          <div className="sticky top-24">
            <div className="rounded-xl overflow-hidden neon-border-cyan">
              <AvatarCanvas
                action={avatarAction}
                appearance={avatarAppearance}
                height="460px"
                interactive={true}
              />
            </div>

            {/* Current action indicator */}
            <div className="mt-3 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                <span className="font-display text-xs text-gray-500 uppercase tracking-wider">
                  Action: <span className="text-neon-cyan">{avatarAction}</span>
                </span>
              </div>
              <span className="font-display text-xs text-gray-600">Drag to rotate</span>
            </div>

            {/* Quick prompts for avatar */}
            <div className="mt-4">
              <p className="font-display text-xs text-gray-600 mb-3 tracking-widest uppercase">Quick Actions</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.slice(3).map(q => (
                  <button
                    key={q.label}
                    onClick={() => handleQuick(q.msg)}
                    disabled={streaming}
                    className="font-body text-xs px-3 py-1.5 rounded border border-neon-magenta/20 text-neon-magenta hover:bg-neon-magenta/10 transition-all disabled:opacity-40"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Chat */}
          <div className="flex flex-col gap-4">
            {/* Chat box */}
            <div className="card-cyber rounded-xl flex flex-col" style={{ height: '460px' }}>
              {/* Chat header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-neon-cyan" />
                  <span className="font-display text-xs text-neon-cyan tracking-wider">FOXYAI</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                </div>
                <button
                  onClick={reset}
                  className="text-gray-600 hover:text-gray-400 transition-colors"
                  title="Reset chat"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin">
                {messages.length === 0 && !streaming && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-8">
                    <div className="w-14 h-14 rounded-full border border-neon-cyan/30 flex items-center justify-center">
                      <Bot size={24} className="text-neon-cyan" />
                    </div>
                    <div>
                      <p className="font-display text-sm text-white mb-1">Hey! I'm FoxyAI</p>
                      <p className="font-body text-gray-500 text-sm max-w-xs">
                        Ask me anything about Wolf, Foxy Tech projects, or just tell me what to do!
                      </p>
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        msg.role === 'user'
                          ? 'bg-neon-magenta/20 border border-neon-magenta/40'
                          : 'bg-neon-cyan/10 border border-neon-cyan/30'
                      }`}
                    >
                      {msg.role === 'user'
                        ? <User size={12} className="text-neon-magenta" />
                        : <Bot size={12} className="text-neon-cyan" />
                      }
                    </div>
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-lg font-body text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-neon-magenta/10 border border-neon-magenta/20 text-gray-200 rounded-tr-none'
                          : 'bg-dark-elevated border border-neon-cyan/10 text-gray-300 rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Streaming message */}
                {streaming && (
                  <div className="flex gap-3 flex-row">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-neon-cyan/10 border border-neon-cyan/30">
                      <Bot size={12} className="text-neon-cyan" />
                    </div>
                    <div className="max-w-[80%] px-4 py-2.5 rounded-lg rounded-tl-none font-body text-sm leading-relaxed bg-dark-elevated border border-neon-cyan/10 text-gray-300">
                      {streamingText || (
                        <span className="inline-flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                        </span>
                      )}
                      {streamingText && <span className="typing-cursor" />}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/5">
                <form
                  onSubmit={e => { e.preventDefault(); sendMessage(input); }}
                  className="flex gap-3"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask about Wolf, tell the avatar to dance..."
                    disabled={streaming}
                    className="flex-1 bg-dark-elevated border border-neon-cyan/20 rounded px-4 py-2.5 font-body text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 disabled:opacity-50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={streaming || !input.trim()}
                    className="btn-cyber px-4 py-2.5 disabled:opacity-40"
                  >
                    <Send size={15} />
                  </button>
                </form>
              </div>
            </div>

            {/* Quick chat prompts */}
            <div>
              <p className="font-display text-xs text-gray-600 mb-3 tracking-widest uppercase">Quick Questions</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.slice(0, 4).map(q => (
                  <button
                    key={q.label}
                    onClick={() => handleQuick(q.msg)}
                    disabled={streaming}
                    className="font-body text-xs px-3 py-1.5 rounded border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/10 transition-all disabled:opacity-40"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
