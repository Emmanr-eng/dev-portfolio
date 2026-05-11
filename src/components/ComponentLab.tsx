import { useState } from 'react';
import { motion } from 'motion/react';

const COMPONENTS = [
  {
    id: 'glass-nav',
    title: 'Glass Nav',
    category: 'navigation',
    description: 'A frosted-glass navigation bar with dynamic backdrop filters.',
    ui: (
      <div className="w-full h-32 flex items-center justify-center backdrop-blur-md bg-white/10 rounded-2xl border border-white/20">
        <nav className="flex gap-6 text-sm font-bold">
          <div className="text-black/60 hover:text-black cursor-pointer">Home</div>
          <div className="text-black/60 hover:text-black cursor-pointer">About</div>
          <div className="text-black/60 hover:text-black cursor-pointer">Contact</div>
        </nav>
      </div>
    ),
    code: `<nav className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20">
  <div className="flex gap-6">Home</div>
  <div className="flex gap-6">About</div>
  <div className="flex gap-6">Contact</div>
</nav>`
  },
  {
    id: 'haptic-button',
    title: 'Haptic Glow',
    category: 'buttons',
    description: 'A button with a persistent, intelligent glow based on interaction.',
    ui: (
      <div className="w-full h-32 flex items-center justify-center">
        <motion.button
          whileHover={{ boxShadow: '0 0 20px rgba(200, 255, 0, 0.8)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-cyber-lime text-black px-6 py-2 font-bold rounded-lg border-2 border-black"
        >
          GLOW
        </motion.button>
      </div>
    ),
    code: `<motion.button
  whileHover={{ boxShadow: '0 0 20px rgba(200, 255, 0, 0.8)' }}
  className="bg-cyber-lime text-black px-6 py-2 font-bold"
>
  GLOW
</motion.button>`
  },
  {
    id: 'skeleton-loader',
    title: 'Skeleton Loader',
    category: 'effects',
    description: 'Animated loading placeholder for content.',
    ui: (
      <div className="w-full h-32 flex items-center justify-center gap-4 p-4">
        <div className="space-y-3 w-full max-w-xs">
          <div className="h-4 bg-white/10 rounded animate-pulse" />
          <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-white/10 rounded animate-pulse w-1/2" />
        </div>
      </div>
    ),
    code: `<div className="space-y-3">
  <div className="h-4 bg-white/10 rounded animate-pulse" />
  <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
  <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
</div>`
  },
  {
    id: 'flip-card',
    title: 'Flip Card',
    category: 'cards',
    description: '3D flip card with front and back faces.',
    ui: (
      <div className="w-full h-32 flex items-center justify-center perspective-1000">
        <motion.div 
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.6 }}
          className="w-32 h-24 relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-cyber-lime border-2 border-black flex items-center justify-center font-bold backface-hidden">
            FRONT
          </div>
          <div className="absolute inset-0 bg-black text-cyber-lime border-2 border-cyber-lime flex items-center justify-center font-bold" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
            BACK
          </div>
        </motion.div>
      </div>
    ),
    code: `<motion.div 
  whileHover={{ rotateY: 180 }}
  style={{ transformStyle: 'preserve-3d' }}
>
  <div className="backface-hidden">FRONT</div>
  <div style={{ transform: 'rotateY(180deg)' }}>BACK</div>
</motion.div>`
  },
  {
    id: 'morph-button',
    title: 'Morph Button',
    category: 'buttons',
    description: 'Button that morphs shape on interaction.',
    ui: (
      <div className="w-full h-32 flex items-center justify-center">
        <motion.button 
          whileHover={{ borderRadius: '9999px', scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-cyber-lime text-black px-8 py-3 font-bold border-2 border-black"
        >
          MORPH ME
        </motion.button>
      </div>
    ),
    code: `<motion.button 
  whileHover={{ borderRadius: '9999px', scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  MORPH ME
</motion.button>`
  }
];

export default function ComponentLab() {
  const [activeId, setActiveId] = useState(COMPONENTS[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  const categories = ['all', ...new Set(COMPONENTS.map(c => c.category))];
  const filteredComponents = activeCategory === 'all'
    ? COMPONENTS
    : COMPONENTS.filter(c => c.category === activeCategory);
  const activeComp = COMPONENTS.find(c => c.id === activeId) ?? COMPONENTS[0];

  const copyCode = () => {
    navigator.clipboard.writeText(activeComp.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // ── CHANGED: was bg-cyber-lime text-black border-black shadow-neo-brutalist
    //            now dark cyberpunk card with neon-pink glow border
    <div className="scanlines bg-charcoal-card text-white rounded-3xl border border-neon-pink/40 h-full p-8 flex flex-col gap-6 glow-pink"
         style={{ boxShadow: '0 0 32px rgba(255,45,120,0.25), inset 0 0 60px rgba(0,0,0,0.5)' }}>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          {/* CHANGED: text-black → text-neon-pink with glow */}
          <h2 className="text-3xl font-black tracking-tighter uppercase text-neon-pink text-glow-pink neon-flicker">
            Component Lab
          </h2>
          {/* CHANGED: opacity-60 black text → cyan muted */}
          <p className="text-sm font-mono text-neon-cyan/60 mt-1">{activeComp.description}</p>
        </div>
        {/* CHANGED: bg-black/10 → neon-pink/10 pill badge */}
        <div className="flex bg-neon-pink/10 border border-neon-pink/30 rounded-lg p-1 text-[10px] font-bold shrink-0">
          <span className="bg-neon-pink text-black px-3 py-1 rounded font-black">LIVE UI</span>
          <span className="px-3 py-1 text-neon-pink/50">v2.6</span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            // CHANGED: black/white active → neon-pink/cyan active tabs
            className={`px-3 py-1 text-xs font-bold uppercase rounded-full border-2 transition-all ${
              activeCategory === cat
                ? 'bg-neon-pink text-black border-neon-pink shadow-[0_0_10px_rgba(255,45,120,0.6)]'
                : 'bg-transparent text-neon-cyan/60 border-neon-cyan/20 hover:border-neon-cyan/60 hover:text-neon-cyan'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Component list */}
        <div className="lg:col-span-4 space-y-2 overflow-y-auto max-h-75 lg:max-h-none pr-2">
          {filteredComponents.map(comp => (
            <button
              key={comp.id}
              onClick={() => setActiveId(comp.id)}
              // CHANGED: white/black active → neon-pink active, dark hover
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                activeId === comp.id
                  ? 'bg-neon-pink/15 text-neon-pink border-neon-pink shadow-[0_0_12px_rgba(255,45,120,0.4)]'
                  : 'bg-charcoal-dark/50 text-gray-400 border-white/5 hover:border-neon-pink/30 hover:text-white'
              }`}
            >
              <div className="font-black text-sm">{comp.title}</div>
              <div className="text-[10px] uppercase opacity-50">{comp.category}</div>
            </button>
          ))}
        </div>

        {/* Preview panel */}
        {/* CHANGED: bg-white/40 border-dashed black → dark panel with cyan dashed border */}
        <div className="lg:col-span-8 bg-charcoal-dark/60 rounded-2xl border-2 border-dashed border-neon-cyan/25 relative overflow-hidden flex flex-col min-h-75">
          {/* Copy button — CHANGED: black bg → neon-cyan */}
          <button
            onClick={copyCode}
            className="absolute top-4 right-4 z-10 bg-neon-cyan text-black px-3 py-1 text-xs font-bold rounded hover:bg-neon-cyan/80 transition-colors shadow-[0_0_8px_rgba(0,245,255,0.5)]"
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>

          {/* Component preview */}
          <div className="flex-1 flex items-center justify-center p-6">
            {activeComp.ui}
          </div>

          {/* Code view — CHANGED: border-dashed black/5 → neon-cyan/20 */}
          <div className="border-t-2 border-dashed border-neon-cyan/20 bg-black/30 p-4 overflow-x-auto">
            {/* CHANGED: text-black/70 → text-neon-cyan/70 */}
            <pre className="text-[11px] font-mono text-neon-cyan/70 whitespace-pre-wrap">{activeComp.code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}