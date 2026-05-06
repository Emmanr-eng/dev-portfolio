import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const COMPONENTS = [
  {
    id: 'glass-nav',
    title: 'Glass Nav',
    description: 'A frosted-glass navigation bar with dynamic backdrop filters.',
    ui: (
      <div className="w-full h-32 flex items-center justify-center p-4">
         <nav className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full flex gap-4 shadow-xl">
           <div className="w-4 h-4 bg-cyber-lime rounded-full" />
           <div className="w-4 h-4 bg-white/20 rounded-full" />
           <div className="w-4 h-4 bg-white/20 rounded-full" />
         </nav>
      </div>
    ),
    code: `nav {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}`
  },
  {
    id: 'haptic-button',
    title: 'Haptic Glow',
    description: 'A button with a persistent, intelligent glow based on interaction.',
    ui: (
      <div className="w-full h-32 flex items-center justify-center">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-charcoal-dark border-2 border-cyber-lime text-cyber-lime px-8 py-3 font-bold tracking-widest relative group"
          style={{ boxShadow: '0 0 20px rgba(223, 255, 0, 0.2)' }}
        >
          <div className="absolute inset-0 bg-cyber-lime/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          ACTIVATE
        </motion.button>
      </div>
    ),
    code: `<motion.button 
  whileHover={{ scale: 1.05 }}
  className="shadow-[0_0_20px_rgba(223,255,0,0.2)]"
>
  ACTIVATE
</motion.button>`
  }
];

export default function ComponentLab() {
  const [activeId, setActiveId] = useState(COMPONENTS[0].id);
  const [view, setView] = useState<'ui' | 'code'>('ui');

  const activeComp = COMPONENTS.find(c => c.id === activeId) ?? COMPONENTS[0];

  return (
    <div className="bg-cyber-lime text-black rounded-4xl border-4 border-black h-full p-8 flex flex-col gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:scale-[1.005]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-2">
            Component Lab
            <span className="text-xs font-mono opacity-50 px-2 py-0.5 border border-black/20 rounded ml-2">v1.2</span>
          </h2>
          <p className="text-black/60 text-[11px] font-bold uppercase tracking-widest mt-1">Interactive experiments in UI architecture.</p>
        </div>
        
        <div className="flex bg-black/10 p-1 rounded-sm border border-black/5">
          <button 
            onClick={() => setView('ui')}
            className={`px-4 py-1.5 text-xs font-bold font-mono transition-colors rounded ${view === 'ui' ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
          >
            UI
          </button>
          <button 
            onClick={() => setView('code')}
            className={`px-4 py-1.5 text-xs font-bold font-mono transition-colors rounded ${view === 'code' ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
          >
            CODE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        <div className="lg:col-span-4 space-y-2 overflow-y-auto max-h-75 lg:max-h-none pr-2 custom-scrollbar">
          {COMPONENTS.map(comp => (
            <button
              key={comp.id}
              onClick={() => setActiveId(comp.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${activeId === comp.id ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]' : 'bg-white/30 border-black/10 hover:border-black/30 text-black'}`}
            >
              <div>
                <div className={`font-mono text-[10px] mb-1 uppercase tracking-tighter ${activeId === comp.id ? 'text-cyber-lime' : 'text-black/40'}`}>
                  {activeId === comp.id ? '// Active' : '// Idle'}
                </div>
                <div className="font-black text-sm">{comp.title}</div>
              </div>
              <ChevronRight size={16} className={`transition-transform group-hover:translate-x-1 ${activeId === comp.id ? 'text-cyber-lime' : 'text-black/30'}`} />
            </button>
          ))}
        </div>

        <div className="lg:col-span-8 bg-white/40 rounded-2xl border-2 border-dashed border-black/20 relative overflow-hidden flex flex-col min-h-75">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-black/20 font-bold select-none">
            {activeComp.id.toUpperCase()}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeId}-${view}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 p-6 flex flex-col justify-center"
            >
              {view === 'ui' ? (
                <div className="w-full flex items-center justify-center">
                  <div className="w-full transform transition-transform hover:scale-105">
                    {activeComp.ui}
                  </div>
                </div>
              ) : (
                <div className="bg-black text-cyber-lime p-6 rounded-xl font-mono text-xs whitespace-pre overflow-x-auto shadow-2xl border border-white/10">
                  {activeComp.code}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
