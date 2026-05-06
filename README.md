# 🗺️ Developer Atlas

> An interactive map of a developer's journey featuring a Component Lab, interactive Bento grid, and AI-powered resume agent.

![TypeScript](https://img.shields.io/badge/TypeScript-93.7%25-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC)

## ✨ Features

- **🎨 Neo-Brutalist Design** — Bold, modern aesthetic with cyber-lime accents and glass-panel effects
- **📦 Interactive Bento Grid** — Dynamic layout showcasing skills, projects, and live experiments
- **🧪 Component Lab** — Showcase of reusable UI components with live previews
- **🐛 Bug Timeline** — Visual archive documenting code optimizations and debugging journeys
- **🤖 AI Chat Agent** — Gemini-powered conversational interface for portfolio queries
- **🎬 Smooth Animations** — Framer Motion (motion/react) powered scroll and interaction animations
- **📱 Fully Responsive** — Optimized for all screen sizes

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
│   │   ├── ai/              # AI-related components
│   │   ├── BugTimeline.tsx  # Bug fix timeline component
│   │   ├── ChatAgent.tsx    # AI chat interface
│   │   ├── ComponentLab.tsx # Interactive component showcase
│   │   └── InteractiveTiles.tsx # Bento grid tiles
│   ├── hooks/               # Custom React hooks
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── tests/                   # Playwright tests
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
- Status indicator
- Interactive terminal
- Live experiment counter
- AI Agent access point

### Archive (Bug Timeline)
A visual timeline documenting the evolution of code optimizations and bug fixes.

### Component Lab
An interactive showcase of custom UI components with live demonstrations.

### Connect
Contact section with social links and call-to-action for collaborations.

## 🔧 Configuration

### Environment Variables

For the AI Chat Agent functionality, you may need to configure:

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

## 📝 License

This project is licensed under Apache-2.0.

---

<p align="center">
  <strong>© 2026 Developer Atlas</strong> • Constructed with Intent
</p>
