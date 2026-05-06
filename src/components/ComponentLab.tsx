import { useState } from 'react';
import { motion } from 'motion/react';


const COMPONENTS = [
  // Existing components...
  {
    id: 'glass-nav',
    title: 'Glass Nav',
    category: 'navigation', // NEW: Add category
    description: 'A frosted-glass navigation bar with dynamic backdrop filters.',
    ui: (
      <nav className="w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4 flex gap-4">
        <div className="font-bold text-white">Nav</div>
        <div className="flex-1" />
        <div className="text-white/60">Link</div>
      </nav>
    ),
    code: `<nav className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4">
  {/* Navigation content */}
</nav>`
  },
  {
    id: 'haptic-button',
    title: 'Haptic Glow',
    category: 'buttons',
    description: 'A button with a persistent, intelligent glow based on interaction.',
    ui: (
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="bg-black text-cyber-lime px-8 py-3 font-bold border-2 border-cyber-lime rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.5)]"
      >
        Haptic Glow
      </motion.button>
    ),
    code: `<motion.button
  whileHover={{ scale: 1.05 }}
  className="bg-black text-cyber-lime px-8 py-3 shadow-[0_0_20px_rgba(0,255,0,0.5)]"
>
  Haptic Glow
</motion.button>`
  },
  // NEW COMPONENTS:
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
  const [view] = useState<'ui' | 'code'>('ui');
  const [activeCategory, setActiveCategory] = useState<string>('all'); // NEW
  const [copied, setCopied] = useState(false); // NEW

  // NEW: Get unique categories
  const categories = ['all', ...new Set(COMPONENTS.map(c => c.category))];

  // NEW: Filter components by category
  const filteredComponents = activeCategory === 'all' 
    ? COMPONENTS 
    : COMPONENTS.filter(c => c.category === activeCategory);

  const activeComp = COMPONENTS.find(c => c.id === activeId) ?? COMPONENTS[0];

  // NEW: Copy to clipboard function
  const copyCode = () => {
    navigator.clipboard.writeText(activeComp.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-cyber-lime text-black rounded-4xl border-4 border-black h-full p-8 flex flex-col gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* ... existing header ... */}
      </div>

      {/* NEW: Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 text-xs font-bold uppercase rounded-full border-2 transition-all ${
              activeCategory === cat 
                ? 'bg-black text-white border-black' 
                : 'bg-transparent text-black/60 border-black/20 hover:border-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Component list - use filteredComponents instead of COMPONENTS */}
        <div className="lg:col-span-4 space-y-2 overflow-y-auto max-h-75 lg:max-h-none pr-2">
          {filteredComponents.map(comp => (
            <button
              key={comp.id}
              onClick={() => setActiveId(comp.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                activeId === comp.id ? 'bg-black text-white border-black' : 'bg-white/30 border-transparent hover:border-black/20'
              }`}
            >
              <div className="font-black text-sm">{comp.title}</div>
              <div className="text-[10px] uppercase opacity-50">{comp.category}</div>
            </button>
          ))}
        </div>

        {/* Preview panel with copy button */}
        <div className="lg:col-span-8 bg-white/40 rounded-2xl border-2 border-dashed border-black/20 relative overflow-hidden flex flex-col min-h-75">
          {/* NEW: Copy button for code view */}
          {view === 'code' && (
            <button
              onClick={copyCode}
              className="absolute top-4 right-4 z-10 bg-black text-cyber-lime px-3 py-1 text-xs font-bold rounded hover:bg-black/80"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          )}
          {/* Preview content */}
          <div className="flex-1 overflow-auto p-4">
            {view === 'ui' ? (
              <div className="flex items-center justify-center h-full">
                {activeComp.ui}
              </div>
            ) : (
              <pre className="bg-black text-cyber-lime p-4 rounded text-xs overflow-auto h-full font-mono">
                <code>{activeComp.code}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}