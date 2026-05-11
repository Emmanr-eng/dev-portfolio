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
  const [activeId, setActiveId]           = useState(COMPONENTS[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copied, setCopied]               = useState(false);

  const categories       = ['all', ...new Set(COMPONENTS.map(c => c.category))];
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
    /*
     * BLUEPRINT RESTYLE
     * Before: dark cyberpunk scanlines card, neon-pink border + glow
     * After:  white card, blueprint blue border, dot-grid texture
     */
    <div
      className="bp-grid bg-bp-surface text-bp-ink rounded-3xl h-full p-8 flex flex-col gap-6"
      style={{
        background: '#FFFFFF',
        border: '1.5px solid rgba(27,79,154,0.18)',
        boxShadow: '0 4px 32px rgba(27,79,154,0.10), 0 1px 4px rgba(27,79,154,0.06)',
      }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          {/* CHANGED: neon-pink flicker → blueprint deep navy */}
          <h2
            className="text-3xl font-black tracking-tighter uppercase"
            style={{ color: '#1B4F9A' }}
          >
            Component Lab
          </h2>
          {/* CHANGED: neon-cyan/60 → muted slate */}
          <p className="text-sm font-mono mt-1" style={{ color: '#4A6080' }}>
            {activeComp.description}
          </p>
        </div>

        {/* CHANGED: neon-pink badge → blueprint blue badge */}
        <div
          className="flex rounded-lg p-1 text-[10px] font-bold shrink-0"
          style={{ background: 'rgba(27,79,154,0.07)', border: '1px solid rgba(27,79,154,0.18)' }}
        >
          <span
            className="px-3 py-1 rounded font-black text-white"
            style={{ background: '#1B4F9A' }}
          >
            LIVE UI
          </span>
          <span className="px-3 py-1" style={{ color: 'rgba(27,79,154,0.45)' }}>v2.6</span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            /*
             * CHANGED: neon-pink active / neon-cyan inactive
             *       → blueprint blue active / muted inactive
             */
            className="px-3 py-1 text-xs font-bold uppercase rounded-full border-2 transition-all font-mono"
            style={
              activeCategory === cat
                ? { background: '#1B4F9A', color: '#FFFFFF', borderColor: '#1B4F9A' }
                : { background: 'transparent', color: '#4A6080', borderColor: 'rgba(27,79,154,0.2)' }
            }
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
              /*
               * CHANGED: neon-pink active → blueprint blue active
               *          dark hover → light blue hover
               */
              className="w-full text-left p-4 rounded-xl border-2 transition-all"
              style={
                activeId === comp.id
                  ? {
                      background: 'rgba(27,79,154,0.07)',
                      color: '#1B4F9A',
                      borderColor: '#1B4F9A',
                    }
                  : {
                      background: '#F4F7FB',
                      color: '#4A6080',
                      borderColor: 'rgba(27,79,154,0.12)',
                    }
              }
            >
              <div className="font-black text-sm">{comp.title}</div>
              <div className="text-[10px] uppercase opacity-60 font-mono">{comp.category}</div>
            </button>
          ))}
        </div>

        {/* Preview panel */}
        {/*
          * CHANGED: dark/neon-cyan dashed border → white panel, blueprint dashed border
          */}
        <div
          className="lg:col-span-8 rounded-2xl relative overflow-hidden flex flex-col min-h-75"
          style={{
            background: '#F4F7FB',
            border: '2px dashed rgba(27,79,154,0.22)',
          }}
        >
          {/* Copy button — CHANGED: neon-cyan → blueprint accent blue */}
          <button
            onClick={copyCode}
            className="absolute top-4 right-4 z-10 px-3 py-1 text-xs font-bold rounded font-mono transition-colors text-white"
            style={{ background: '#2563EB' }}
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>

          {/* Component preview */}
          <div className="flex-1 flex items-center justify-center p-6">
            {activeComp.ui}
          </div>

          {/* Code view — CHANGED: neon-cyan/70 text → blueprint ink on white */}
          <div
            className="border-t-2 border-dashed p-4 overflow-x-auto"
            style={{
              borderColor: 'rgba(27,79,154,0.18)',
              background: '#FFFFFF',
            }}
          >
            <pre
              className="text-[11px] font-mono whitespace-pre-wrap"
              style={{ color: '#1B4F9A' }}
            >
              {activeComp.code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}