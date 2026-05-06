<div align="center">

# 🗺️ Developer Atlas

**An Interactive Developer Portfolio for the 2026 Era**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI_Powered-4285F4?logo=google)](https://ai.google.dev/)

*I build things that live on the internet, and then I show you how I built them.*

</div>

---

## ✨ Features

### 🎯 Interactive Bento Grid Layout
A modern, responsive bento-style grid showcasing:
- **Hero Section** — Bold Neo-Brutalist design with animated typography
- **Status Tile** — Real-time developer status indicator
- **Terminal Tile** — Interactive terminal-style UI element
- **Bug Timeline** — Visual journey from broken to optimized code
- **Live Experiments Counter** — Showcasing ongoing projects

### 🧪 Component Lab
A living showcase of UI components with:
- Live interactive previews
- Copy-ready code snippets
- Components include: Glass Nav, Haptic Glow buttons, and more

### 🤖 Atlas AI Chat Agent
An AI-powered assistant built with **Google Gemini 3**:
- Context-aware responses about the portfolio
- Resume/skills information on demand
- Markdown-formatted responses
- Persistent chat overlay

### 🎨 Design System
- **Neo-Brutalist** aesthetic with bold shadows and borders
- **Cyber-lime** accent color (`#DFFF00`)
- **Charcoal** dark theme palette
- **Framer Motion** animations throughout
- **Custom scroll progress indicator**

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 19, Vite 6 |
| **Language** | TypeScript 5.8 |
| **Styling** | Tailwind CSS v4, Custom CSS |
| **Animation** | Framer Motion (motion/react) |
| **AI** | Google Gemini 3 (@google/genai) |
| **Icons** | Lucide React |
| **Markdown** | react-markdown |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **Gemini API Key** — Get one at [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/developer-atlas.git
   cd developer-atlas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Type-check with TypeScript |
| `npm run clean` | Remove dist folder |

---

## 📁 Project Structure

```
developer-atlas/
├── src/
│   ├── components/
│   │   ├── BugTimeline.tsx      # Bug-to-fix journey visualization
│   │   ├── ChatAgent.tsx        # Gemini AI chat interface
│   │   ├── ComponentLab.tsx     # Interactive component showcase
│   │   └── InteractiveTiles.tsx # Terminal & Status tiles
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles & Tailwind
├── index.html                   # HTML template
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts
```

---

## 🎨 Customization

### Branding
Update these constants in `src/App.tsx`:
```typescript
const BRAND_NAME = "Developer Atlas";
const BRAND_TAGLINE = "Your custom tagline here";
const LOGO = "Your Logo Text";
```

### Color Palette
The color scheme is defined in `src/index.css` using Tailwind:
- `cyber-lime` — Primary accent (#DFFF00)
- `charcoal-dark` — Background
- `charcoal-light` — Cards
- `charcoal-border` — Borders

### AI Persona
Modify the `SYSTEM_PROMPT` in `src/components/ChatAgent.tsx` to customize the AI assistant's personality and knowledge.

---

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

The optimized build will be in the `dist/` folder, ready for deployment to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Constructed with Intent** · Version 2.6.4

*© 2026 Developer Atlas*

</div>
