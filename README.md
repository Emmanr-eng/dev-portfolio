# 🗺️ Developer Atlas

> An interactive map of a developer's journey featuring an enhanced Component Lab, searchable Bug Timeline, and AI-powered resume agent with conversation memory.

![TypeScript](https://img.shields.io/badge/TypeScript-93.7%25-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC)

## ✨ Features

### 🎨 Neo-Brutalist Design
Bold, modern aesthetic with cyber-lime accents and glass-panel effects.

### 📦 Interactive Bento Grid
Dynamic layout showcasing skills, projects, and live experiments.

### 🧪 Component Lab (Enhanced)
- **Category Filtering** — Filter components by type: Navigation, Buttons, Cards, Effects
- **5 Interactive Components** — Glass Nav, Haptic Glow, Skeleton Loader, Flip Card, Morph Button
- **Copy to Clipboard** — One-click code copying with visual feedback
- **Live UI Previews** — See components in action with real-time interactions

### 🐛 Bug Timeline (Enhanced)
- **Search Functionality** — Find bugs by title or description
- **Tag Filtering** — Filter by React, CSS, Performance, Hooks, and more
- **Severity Indicators** — Visual badges for Critical, Medium, and Low severity
- **Expandable Cards** — Click to reveal before/after code comparisons
- **Key Learnings** — Each bug includes actionable takeaways
- **Scroll Animations** — Staggered reveal animations on scroll

### 🤖 AI Chat Agent (Enhanced)
- **Conversation Memory** — Context-aware responses using chat history
- **localStorage Persistence** — Chat history saved across sessions
- **Suggested Prompts** — Quick-start conversation chips
- **Retry Mechanism** — Easy retry on failed API calls
- **Clear History** — One-click chat reset

### 🎬 Smooth Animations
Framer Motion (motion/react) powered scroll and interaction animations.

### 📱 Fully Responsive
Optimized for all screen sizes from mobile to desktop.

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS v4, Custom CSS |
| **Animation** | Framer Motion (motion/react) |
| **AI** | Google Gemini (@google/genai) |
| **Icons** | Lucide React |
| **Testing** | Playwright |
| **Deployment** | GitHub Pages |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Emmanr-eng/dev-portfolio.git
   cd dev-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Remove dist folder |
| `npm run deploy` | Deploy to GitHub Pages |

## 📁 Project Structure

```
dev-portfolio/
├── src/
│   ├── components/
│   │   ├── ai/                   # AI-related components
│   │   ├── BugTimeline.tsx       # Searchable bug archive with filters
│   │   ├── ChatAgent.tsx         # AI chat with memory & persistence
│   │   ├── ComponentLab.tsx      # Categorized component showcase
│   │   └── InteractiveTiles.tsx  # Bento grid tiles
│   ├── hooks/                    # Custom React hooks
│   ├── App.tsx                   # Main application component
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global styles
├── tests/                        # Playwright tests
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🎯 Key Sections

### Home
The main hero section featuring a Bento grid layout with:
- Hero tile with brand identity
- Component Lab preview
- Status indicator with live clock
- Interactive terminal with commands
- Live experiment counter
- AI Agent access point

### Archive (Bug Timeline)
A searchable, filterable timeline documenting code optimizations and bug fixes with:
- Search by title/description
- Filter by technology tags
- Severity badges (Critical/Medium/Low)
- Expandable before/after code comparisons
- Key learning summaries

### Component Lab
An interactive showcase of 5 custom UI components organized by category:
- **Navigation**: Glass Nav
- **Buttons**: Haptic Glow, Morph Button
- **Cards**: Flip Card
- **Effects**: Skeleton Loader

### Connect
Contact section with social links and call-to-action for collaborations.

## 🔧 Configuration

### Environment Variables

For the AI Chat Agent functionality, configure:

```env
GEMINI_API_KEY=your_api_key_here
```

### GitHub Pages Deployment

Update the `homepage` field in `package.json` with your GitHub username:

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/dev-portfolio/"
}
```

Then deploy with:

```bash
npm run deploy
```

## 🧪 Testing

Run end-to-end tests with Playwright:

```bash
npx playwright test
```

## 🆕 Recent Updates (v2.7.0)

- ✅ **Component Lab**: Added category filtering, 3 new components, copy-to-clipboard
- ✅ **Bug Timeline**: Added search, tag filtering, severity badges, expandable cards
- ✅ **AI Chat Agent**: Added conversation context, localStorage persistence, suggested prompts, retry mechanism

## 📝 License

This project is licensed under Apache-2.0.

---

<p align="center">
  <strong>© 2026 Developer Atlas</strong> • Constructed with Intent
</p>
