# 🦊 Foxy Tech Portfolio

> Wolf's interactive portfolio — Built by [Foxy Tech](https://github.com/wolfix-bots) · Powered by Casper Tech Kenya

A cyberpunk-themed portfolio website featuring a real-time AI assistant and a fully interactive 3D avatar that responds to natural language commands.

---

## ✨ Features

### 🤖 FoxyAI — Live AI Chatbot
- Powered by **Claude claude-sonnet-4-6** (Anthropic) via streaming SSE
- Knows everything about Wolf, Foxy Tech, and all 6 projects
- Responds in real time with personality matching the Foxy Tech brand
- Issues avatar commands embedded in responses

### 🕺 Interactive 3D Avatar
- Built entirely with **React Three Fiber** + **Three.js**
- Fully procedural character — no external GLTF files
- Neon cyberpunk aesthetic: glowing cyan eyes, cyber stripe, neon shoe soles
- Floating particle system + spinning neon grid platform
- **Drag to rotate** (OrbitControls)

#### Avatar Animations
| Command | Action |
|---------|--------|
| `wave` | Waves right arm |
| `jump` | Jumps with squash/stretch |
| `dance` | Full body groove |
| `cartwheel` | Z-axis rotation cartwheel |
| `nod` | Head nod (yes) |
| `shake` | Head shake (no) |
| `idle` | Gentle breathing idle |
| `talk` | Talking gestures |

#### Avatar Appearance (changeable live)
- `topColor` — shirt color (any hex)
- `bottomColor` — pants color
- `skinColor` — skin tone
- `hairColor` — hair color
- `hatColor` — hat color
- `showHat` — toggle hat on/off

**Just tell FoxyAI what you want:** *"wear a red hat"*, *"make your shirt neon green"*, *"do a cartwheel"*, *"can you dance?"*

---

## 🗂 Portfolio Sections

| Section | Content |
|---------|---------|
| **Hero** | Animated typewriter titles + live 3D avatar |
| **About** | Bio, tech stack, brand story |
| **Projects** | All 6 Foxy Tech projects with links |
| **FoxyAI** | Full AI chat + avatar control |

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + TypeScript + Vite |
| 3D / Avatar | React Three Fiber + Three.js + Drei |
| Styling | Tailwind CSS + custom cyberpunk CSS |
| AI | Claude claude-sonnet-4-6 via Anthropic SDK |
| Backend | Node.js + Express (AI proxy server) |
| Fonts | Orbitron + Rajdhani (Google Fonts) |

---

## 🚀 Run Locally

```bash
# Install dependencies
npm install

# Start dev (Vite + AI API server run concurrently)
npm run dev
```

Requires environment variables:
```env
AI_INTEGRATIONS_ANTHROPIC_BASE_URL=<your-anthropic-base-url>
AI_INTEGRATIONS_ANTHROPIC_API_KEY=<your-key>
```

### Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
foxy-portfolio/
├── api.mjs                  # Express AI proxy server (dev)
├── server.mjs               # Production server (serves dist + AI)
├── vite.config.ts
├── src/
│   ├── App.tsx              # Root — avatar state management
│   ├── components/
│   │   ├── avatar/
│   │   │   ├── AvatarCanvas.tsx    # Three.js Canvas + lighting + scene
│   │   │   └── FoxyCharacter.tsx   # Procedural 3D character + animations
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx         # Typewriter + avatar display
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx     # 6 projects grid
│   │   ├── AiSection.tsx           # SSE chat + avatar command parser
│   │   └── Footer.tsx
│   └── lib/
│       ├── portfolioData.ts        # Projects + about data
│       └── types.ts                # AvatarAction, AvatarCommand, etc.
```

---

## 🦊 The Foxy Tech Ecosystem

| Project | Description |
|---------|-------------|
| [FoxyStream](https://foxystream.onrender.com) | Cyberpunk movie & TV streaming app |
| FoxyFlix | Vanilla JS streaming SPA |
| [Foxy API](https://foxy-api-febf.onrender.com) | 85+ endpoint REST API |
| WebFoxy | WhatsApp automation bot |
| Foxy IG | Instagram bot panel |
| Foxy Bot Telegram | Telegram bot dashboard |

---

*Built by Wolf · Foxy Tech · Kenya*  
*Powered by Casper Tech Kenya*
