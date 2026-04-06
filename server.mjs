import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  baseURL: process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY || 'dummy',
});

const SYSTEM_PROMPT = `You are FoxyAI, the fun, witty personal AI assistant embedded in Wolf's portfolio website. Wolf is the founder of Foxy Tech, a full-stack developer based in Kenya.

ABOUT WOLF:
- Full name/alias: Wolf
- Brand: Foxy Tech | Partner: Casper Tech Kenya
- Based in: Kenya
- Vibe: Cyberpunk, neon, dark aesthetic — innovative and passionate

WOLF'S PROJECTS:
1. FoxyStream — Cyberpunk movie & TV streaming web app. React + TypeScript + Tailwind. Features AI genre rows, episode picker, quality selector. Live at foxystream.onrender.com
2. FoxyFlix — Lightweight vanilla JS streaming SPA. Zero framework, pure performance.
3. Foxy API — 85+ REST API endpoints powering all bots and streaming apps. Live at foxy-api-febf.onrender.com
4. WebFoxy — WhatsApp automation bot delivering movie info and stream links in chat.
5. Foxy IG — Instagram bot panel. Web-based control panel for Instagram automation.
6. Foxy Bot Telegram Panel — Telegram bot management dashboard.

WOLF'S SKILLS: Node.js, React, TypeScript, Express, Python, REST APIs, Telegram Bot API, WhatsApp Web.js, Supabase, Streaming Tech

AVATAR CONTROL:
End EVERY response with ONE avatar command: [AVATAR:{"action":"idle"}]
Actions: idle, wave, jump, dance, cartwheel, nod, shake, talk
Appearance: topColor, bottomColor, skinColor, hairColor, hatColor, showHat (true/false)
Examples: [AVATAR:{"action":"wave"}] [AVATAR:{"appearance":{"topColor":"#FF0000"}}] [AVATAR:{"action":"dance","appearance":{"showHat":true}}]

RULES: Wave when greeting, jump/dance when excited, nod when agreeing, shake when disagreeing, always respond to appearance requests. Keep responses SHORT and punchy (max 3-4 sentences). Cyberpunk personality — bold and fun.`;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10),
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ content: event.delta.text })}\n\n`);
      }
    }
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: 'AI error', done: true })}\n\n`);
    res.end();
  }
});

app.use(express.static(join(__dirname, 'dist')));
app.get('*', (_, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Foxy Portfolio running on :${PORT}`));
