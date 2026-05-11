import { useState } from 'react';
import { motion } from 'motion/react';

interface PropDef {
  label: string;
  key: string;
  type: 'color' | 'select' | 'text';
  options?: string[];
  default: string;
}

interface Component {
  id: string;
  title: string;
  category: string;
  description: string;
  propDefs?: PropDef[];
  ui: (props: Record<string, string>) => React.ReactNode;
  code: (props: Record<string, string>) => string;
}

const COMPONENTS: Component[] = [
  {
    id: 'glass-nav',
    title: 'Glass Nav',
    category: 'navigation',
    description: 'A frosted-glass navigation bar with dynamic backdrop filters.',
    propDefs: [
      { label: 'Background', key: 'bg', type: 'select', options: ['bg-white/10', 'bg-black/20', 'bg-blue-500/20', 'bg-purple-500/20'], default: 'bg-white/10' },
      { label: 'Border Color', key: 'border', type: 'select', options: ['border-white/20', 'border-blue/30', 'border-blue-400/30'], default: 'border-white/20' },
    ],
    ui: (props) => (
      <nav className={`w-full ${props.bg} backdrop-blur-md border ${props.border} p-4 flex gap-4`}>
        <div className="font-bold text-ink text-sm">Nav</div>
        <div className="flex-1" />
        <div className="text-ink-muted text-sm">Link</div>
      </nav>
    ),
    code: (props) => `<nav className="${props.bg} backdrop-blur-md border ${props.border} p-4">\n  {/* Navigation content */}\n</nav>`,
  },
  {
    id: 'haptic-button',
    title: 'Haptic Glow',
    category: 'buttons',
    description: 'A button with a persistent, intelligent glow based on interaction.',
    propDefs: [
      { label: 'Glow Color', key: 'glow', type: 'select', options: ['shadow-[0_0_20px_rgba(0,0,0,0.2)]', 'shadow-[0_0_20px_rgba(37,99,235,0.4)]', 'shadow-[0_0_20px_rgba(220,38,38,0.3)]'], default: 'shadow-[0_0_20px_rgba(37,99,235,0.4)]' },
      { label: 'Label', key: 'label', type: 'text', default: 'Haptic Glow' },
    ],
    ui: (props) => (
      <motion.button whileHover={{ scale: 1.03 }} className={`bg-ink text-canvas px-8 py-3 font-mono font-bold text-sm ${props.glow} hover:bg-blue transition-colors`}>
        {props.label}
      </motion.button>
    ),
    code: (props) => `<motion.button\n  whileHover={{ scale: 1.03 }}\n  className="bg-ink text-canvas px-8 py-3 font-mono font-bold ${props.glow}"\n>\n  ${props.label}\n</motion.button>`,
  },
  {
    id: 'skeleton-loader',
    title: 'Skeleton Loader',
    category: 'effects',
    description: 'Animated loading placeholder for content.',
    propDefs: [
      { label: 'Bar Color', key: 'color', type: 'select', options: ['bg-ink/8', 'bg-blue/10', 'bg-ink/5'], default: 'bg-ink/8' },
    ],
    ui: (props) => (
      <div className="w-full h-32 flex items-center justify-center p-4">
        <div className="space-y-3 w-full max-w-xs">
          <div className={`h-3 ${props.color} animate-pulse`} />
          <div className={`h-3 ${props.color} animate-pulse w-3/4`} />
          <div className={`h-3 ${props.color} animate-pulse w-1/2`} />
        </div>
      </div>
    ),
    code: (props) => `<div className="space-y-3">\n  <div className="h-3 ${props.color} animate-pulse" />\n  <div className="h-3 ${props.color} w-3/4 animate-pulse" />\n  <div className="h-3 ${props.color} w-1/2 animate-pulse" />\n</div>`,
  },
  {
    id: 'flip-card',
    title: 'Flip Card',
    category: 'cards',
    description: '3D flip card with front and back faces.',
    propDefs: [
      { label: 'Front Color', key: 'front', type: 'select', options: ['bg-ink', 'bg-blue', 'bg-ink/80'], default: 'bg-ink' },
      { label: 'Back Color', key: 'back', type: 'select', options: ['bg-canvas', 'bg-blue-subtle', 'bg-surface'], default: 'bg-canvas' },
    ],
    ui: (props) => (
      <div className="w-full h-32 flex items-center justify-center">
        <motion.div whileHover={{ rotateY: 180 }} transition={{ duration: 0.6 }} className="w-32 h-24 relative" style={{ transformStyle: 'preserve-3d' }}>
          <div className={`absolute inset-0 ${props.front} border border-rule flex items-center justify-center font-mono font-bold text-canvas text-sm`} style={{ backfaceVisibility: 'hidden' }}>FRONT</div>
          <div className={`absolute inset-0 ${props.back} border border-ink flex items-center justify-center font-mono font-bold text-ink text-sm`} style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>BACK</div>
        </motion.div>
      </div>
    ),
    code: (props) => `<motion.div\n  whileHover={{ rotateY: 180 }}\n  style={{ transformStyle: 'preserve-3d' }}\n>\n  <div className="${props.front} backface-hidden">FRONT</div>\n  <div className="${props.back}" style={{ transform: 'rotateY(180deg)' }}>BACK</div>\n</motion.div>`,
  },
  {
    id: 'morph-button',
    title: 'Morph Button',
    category: 'buttons',
    description: 'Button that morphs shape on interaction.',
    propDefs: [
      { label: 'Background', key: 'bg', type: 'select', options: ['bg-ink', 'bg-blue', 'bg-ink/80'], default: 'bg-ink' },
      { label: 'Text Color', key: 'text', type: 'select', options: ['text-canvas', 'text-white'], default: 'text-canvas' },
      { label: 'Label', key: 'label', type: 'text', default: 'MORPH ME' },
    ],
    ui: (props) => (
      <div className="w-full h-32 flex items-center justify-center">
        <motion.button whileHover={{ borderRadius: '9999px', scale: 1.06 }} whileTap={{ scale: 0.97 }} className={`${props.bg} ${props.text} px-8 py-3 font-mono font-bold text-sm`}>
          {props.label}
        </motion.button>
      </div>
    ),
    code: (props) => `<motion.button\n  whileHover={{ borderRadius: '9999px', scale: 1.06 }}\n  whileTap={{ scale: 0.97 }}\n  className="${props.bg} ${props.text} px-8 py-3 font-mono font-bold"\n>\n  ${props.label}\n</motion.button>`,
  },
];

function Toast({ show }: { show: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 12 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 z-50 bg-ink text-canvas text-xs font-mono font-bold px-4 py-2 pointer-events-none"
    >
      ✓ Copied to clipboard
    </motion.div>
  );
}

interface PropEditorProps {
  defs: PropDef[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

function PropEditor({ defs, values, onChange }: PropEditorProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border border-rule bg-canvas">
      <div className="mono-label">Live Props</div>
      {defs.map((def) => (
        <div key={def.key} className="flex flex-col gap-1.5">
          <label className="mono-label">{def.label}</label>
          {def.type === 'select' && def.options ? (
            <select
              value={values[def.key]}
              onChange={(e) => onChange(def.key, e.target.value)}
              className="text-xs font-mono bg-surface border border-rule px-2 py-1.5 focus:outline-none focus:border-ink text-ink transition-colors"
            >
              {def.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : (
            <input
              type="text"
              value={values[def.key]}
              onChange={(e) => onChange(def.key, e.target.value)}
              className="text-xs font-mono bg-surface border border-rule px-2 py-1.5 focus:outline-none focus:border-ink text-ink transition-colors"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function defaultProps(comp: Component): Record<string, string> {
  return Object.fromEntries((comp.propDefs ?? []).map((d) => [d.key, d.default]));
}

export default function ComponentLab() {
  const [activeId, setActiveId] = useState(COMPONENTS[0].id);
  const [view, setView] = useState<'ui' | 'code'>('ui');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);

  const [propValues, setPropValues] = useState<Record<string, Record<string, string>>>(
    () => Object.fromEntries(COMPONENTS.map((c) => [c.id, defaultProps(c)]))
  );

  const categories = ['all', ...new Set(COMPONENTS.map((c) => c.category))];

  const filteredComponents = COMPONENTS.filter((c) => {
    const matchesCategory = activeCategory === 'all' || c.category === activeCategory;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeComp = COMPONENTS.find((c) => c.id === activeId) ?? COMPONENTS[0];
  const activeProps = propValues[activeComp.id];

  const copyCode = () => {
    navigator.clipboard.writeText(activeComp.code(activeProps));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePropChange = (key: string, value: string) => {
    setPropValues((prev) => ({ ...prev, [activeComp.id]: { ...prev[activeComp.id], [key]: value } }));
  };

  return (
    <>
      <div className="card p-8 flex flex-col gap-6">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 rule-b">
          <div>
            <span className="mono-label block mb-2">Automated Project Gallery</span>
            <h2 className="text-2xl font-black tracking-tight text-ink">Component Lab</h2>
            <p className="text-ink-muted text-sm mt-1">Live UI playground — edit props in real time</p>
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint font-mono text-xs">›</span>
            <input
              type="text"
              placeholder="Search components…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 pr-4 py-2 text-xs font-mono bg-canvas border border-rule focus:outline-none focus:border-ink placeholder:text-ink-faint w-48 text-ink transition-colors"
            />
          </div>
        </div>

        {/* ── Category Tabs ── */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest border transition-colors ${
                activeCategory === cat
                  ? 'bg-ink text-canvas border-ink'
                  : 'bg-surface text-ink-muted border-rule hover:border-ink hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">

          {/* Component List */}
          <div className="lg:col-span-3 space-y-1 overflow-y-auto max-h-72 lg:max-h-none">
            {filteredComponents.length === 0 ? (
              <p className="text-xs text-ink-muted italic font-mono px-2">No components match.</p>
            ) : (
              filteredComponents.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => setActiveId(comp.id)}
                  className={`w-full text-left p-3 border transition-colors ${
                    activeId === comp.id
                      ? 'bg-ink text-canvas border-ink'
                      : 'bg-surface border-rule text-ink-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  <div className="font-bold text-sm">{comp.title}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest mt-0.5 opacity-50">{comp.category}</div>
                </button>
              ))
            )}
          </div>

          {/* Preview + Props */}
          <div className="lg:col-span-9 flex flex-col gap-4 min-h-0">

            {/* View Toggle */}
            <div className="flex gap-2 items-center">
              {(['ui', 'code'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest border transition-colors ${
                    view === v
                      ? 'bg-ink text-canvas border-ink'
                      : 'bg-surface text-ink-muted border-rule hover:border-ink'
                  }`}
                >
                  {v === 'ui' ? '▶ Preview' : '</> Code'}
                </button>
              ))}

              {view === 'code' && (
                <button
                  onClick={copyCode}
                  className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest border transition-colors ${
                    copied ? 'bg-green text-canvas border-green' : 'bg-surface text-ink-muted border-rule hover:border-ink hover:text-ink'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3" />
                  </svg>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
              {/* Preview / Code panel */}
              <div className="flex-1 border border-dashed border-rule overflow-hidden flex flex-col min-h-64 bg-canvas">
                <div className="flex-1 overflow-auto p-6">
                  {view === 'ui' ? (
                    <div className="flex items-center justify-center h-full">
                      {activeComp.ui(activeProps)}
                    </div>
                  ) : (
                    <pre className="bg-ink text-canvas/80 p-5 text-[11px] overflow-auto h-full font-mono leading-relaxed">
                      <code>{activeComp.code(activeProps)}</code>
                    </pre>
                  )}
                </div>
              </div>

              {/* Prop Editor */}
              {activeComp.propDefs && activeComp.propDefs.length > 0 && (
                <div className="lg:w-52 shrink-0 flex flex-col gap-2">
                  <PropEditor defs={activeComp.propDefs} values={activeProps} onChange={handlePropChange} />
                  <button
                    onClick={() => setPropValues((prev) => ({ ...prev, [activeComp.id]: defaultProps(activeComp) }))}
                    className="text-[10px] font-mono font-bold uppercase tracking-widest text-ink-muted hover:text-ink transition-colors text-left"
                  >
                    ↺ Reset
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs text-ink-muted font-mono italic">{activeComp.description}</p>
          </div>
        </div>
      </div>

      <Toast show={copied} />
    </>
  );
}