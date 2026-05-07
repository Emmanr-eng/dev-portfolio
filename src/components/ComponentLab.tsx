import { useState } from 'react';
import { motion } from 'motion/react';

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Components Data ──────────────────────────────────────────────────────────

const COMPONENTS: Component[] = [
  {
    id: 'glass-nav',
    title: 'Glass Nav',
    category: 'navigation',
    description: 'A frosted-glass navigation bar with dynamic backdrop filters.',
    propDefs: [
      {
        label: 'Background',
        key: 'bg',
        type: 'select',
        options: ['bg-white/10', 'bg-black/20', 'bg-blue-500/20', 'bg-purple-500/20'],
        default: 'bg-white/10',
      },
      {
        label: 'Border Color',
        key: 'border',
        type: 'select',
        options: ['border-white/20', 'border-cyber-lime/30', 'border-blue-400/30'],
        default: 'border-white/20',
      },
    ],
    ui: (props) => (
      <nav
        className={`w-full ${props.bg} backdrop-blur-md rounded-lg border ${props.border} p-4 flex gap-4`}
      >
        <div className="font-bold text-white">Nav</div>
        <div className="flex-1" />
        <div className="text-white/60">Link</div>
      </nav>
    ),
    code: (props) =>
      `<nav className="${props.bg} backdrop-blur-md rounded-lg border ${props.border} p-4">
  {/* Navigation content */}
</nav>`,
  },
  {
    id: 'haptic-button',
    title: 'Haptic Glow',
    category: 'buttons',
    description: 'A button with a persistent, intelligent glow based on interaction.',
    propDefs: [
      {
        label: 'Glow Color',
        key: 'glow',
        type: 'select',
        options: [
          'shadow-[0_0_20px_rgba(0,255,0,0.5)]',
          'shadow-[0_0_20px_rgba(0,150,255,0.5)]',
          'shadow-[0_0_20px_rgba(255,0,200,0.5)]',
        ],
        default: 'shadow-[0_0_20px_rgba(0,255,0,0.5)]',
      },
      {
        label: 'Label',
        key: 'label',
        type: 'text',
        default: 'Haptic Glow',
      },
    ],
    ui: (props) => (
      <motion.button
        whileHover={{ scale: 1.05 }}
        className={`bg-black text-cyber-lime px-8 py-3 font-bold border-2 border-cyber-lime rounded-lg ${props.glow}`}
      >
        {props.label}
      </motion.button>
    ),
    code: (props) =>
      `<motion.button
  whileHover={{ scale: 1.05 }}
  className="bg-black text-cyber-lime px-8 py-3 ${props.glow}"
>
  ${props.label}
</motion.button>`,
  },
  {
    id: 'skeleton-loader',
    title: 'Skeleton Loader',
    category: 'effects',
    description: 'Animated loading placeholder for content.',
    propDefs: [
      {
        label: 'Bar Color',
        key: 'color',
        type: 'select',
        options: ['bg-white/10', 'bg-black/10', 'bg-cyber-lime/20', 'bg-blue-400/20'],
        default: 'bg-white/10',
      },
    ],
    ui: (props) => (
      <div className="w-full h-32 flex items-center justify-center gap-4 p-4">
        <div className="space-y-3 w-full max-w-xs">
          <div className={`h-4 ${props.color} rounded animate-pulse`} />
          <div className={`h-4 ${props.color} rounded animate-pulse w-3/4`} />
          <div className={`h-4 ${props.color} rounded animate-pulse w-1/2`} />
        </div>
      </div>
    ),
    code: (props) =>
      `<div className="space-y-3">
  <div className="h-4 ${props.color} rounded animate-pulse" />
  <div className="h-4 ${props.color} rounded w-3/4 animate-pulse" />
  <div className="h-4 ${props.color} rounded w-1/2 animate-pulse" />
</div>`,
  },
  {
    id: 'flip-card',
    title: 'Flip Card',
    category: 'cards',
    description: '3D flip card with front and back faces.',
    propDefs: [
      {
        label: 'Front Color',
        key: 'front',
        type: 'select',
        options: ['bg-cyber-lime', 'bg-blue-400', 'bg-pink-400', 'bg-orange-400'],
        default: 'bg-cyber-lime',
      },
      {
        label: 'Back Color',
        key: 'back',
        type: 'select',
        options: ['bg-black', 'bg-blue-900', 'bg-purple-900', 'bg-gray-900'],
        default: 'bg-black',
      },
    ],
    ui: (props) => (
      <div className="w-full h-32 flex items-center justify-center perspective-1000">
        <motion.div
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.6 }}
          className="w-32 h-24 relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className={`absolute inset-0 ${props.front} border-2 border-black flex items-center justify-center font-bold`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            FRONT
          </div>
          <div
            className={`absolute inset-0 ${props.back} text-cyber-lime border-2 border-cyber-lime flex items-center justify-center font-bold`}
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          >
            BACK
          </div>
        </motion.div>
      </div>
    ),
    code: (props) =>
      `<motion.div
  whileHover={{ rotateY: 180 }}
  style={{ transformStyle: 'preserve-3d' }}
>
  <div className="${props.front} backface-hidden">FRONT</div>
  <div className="${props.back}" style={{ transform: 'rotateY(180deg)' }}>BACK</div>
</motion.div>`,
  },
  {
    id: 'morph-button',
    title: 'Morph Button',
    category: 'buttons',
    description: 'Button that morphs shape on interaction.',
    propDefs: [
      {
        label: 'Background',
        key: 'bg',
        type: 'select',
        options: ['bg-cyber-lime', 'bg-blue-400', 'bg-pink-400', 'bg-orange-400'],
        default: 'bg-cyber-lime',
      },
      {
        label: 'Text Color',
        key: 'text',
        type: 'select',
        options: ['text-black', 'text-white'],
        default: 'text-black',
      },
      {
        label: 'Label',
        key: 'label',
        type: 'text',
        default: 'MORPH ME',
      },
    ],
    ui: (props) => (
      <div className="w-full h-32 flex items-center justify-center">
        <motion.button
          whileHover={{ borderRadius: '9999px', scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`${props.bg} ${props.text} px-8 py-3 font-bold border-2 border-black`}
        >
          {props.label}
        </motion.button>
      </div>
    ),
    code: (props) =>
      `<motion.button
  whileHover={{ borderRadius: '9999px', scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="${props.bg} ${props.text} px-8 py-3 font-bold"
>
  ${props.label}
</motion.button>`,
  },
];

// ─── Toast Component ───────────────────────────────────────────────────────────

function Toast({ show }: { show: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 16 }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-6 right-6 z-50 bg-black text-cyber-lime text-sm font-bold px-4 py-2 rounded-lg border-2 border-cyber-lime shadow-lg pointer-events-none"
    >
      ✓ Code copied to clipboard!
    </motion.div>
  );
}

// ─── PropEditor Component ──────────────────────────────────────────────────────

interface PropEditorProps {
  defs: PropDef[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

function PropEditor({ defs, values, onChange }: PropEditorProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-black/10 rounded-xl border border-black/20">
      <div className="text-xs font-black uppercase tracking-widest opacity-50">Live Props</div>
      {defs.map((def) => (
        <div key={def.key} className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase opacity-60">{def.label}</label>
          {def.type === 'select' && def.options ? (
            <select
              value={values[def.key]}
              onChange={(e) => onChange(def.key, e.target.value)}
              className="text-xs font-mono bg-white/60 border-2 border-black/30 rounded px-2 py-1 focus:outline-none focus:border-black"
            >
              {def.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={values[def.key]}
              onChange={(e) => onChange(def.key, e.target.value)}
              className="text-xs font-mono bg-white/60 border-2 border-black/30 rounded px-2 py-1 focus:outline-none focus:border-black"
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Helper: build default prop values ────────────────────────────────────────

function defaultProps(comp: Component): Record<string, string> {
  return Object.fromEntries((comp.propDefs ?? []).map((d) => [d.key, d.default]));
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ComponentLab() {
  const [activeId, setActiveId] = useState(COMPONENTS[0].id);
  const [view, setView] = useState<'ui' | 'code'>('ui');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);

  // Per-component live prop state
  const [propValues, setPropValues] = useState<Record<string, Record<string, string>>>(
    () => Object.fromEntries(COMPONENTS.map((c) => [c.id, defaultProps(c)]))
  );

  // Unique categories
  const categories = ['all', ...new Set(COMPONENTS.map((c) => c.category))];

  // Filtered components: category + search
  const filteredComponents = COMPONENTS.filter((c) => {
    const matchesCategory = activeCategory === 'all' || c.category === activeCategory;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeComp = COMPONENTS.find((c) => c.id === activeId) ?? COMPONENTS[0];
  const activeProps = propValues[activeComp.id];

  // Copy to clipboard
  const copyCode = () => {
    navigator.clipboard.writeText(activeComp.code(activeProps));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Update a single prop value
  const handlePropChange = (key: string, value: string) => {
    setPropValues((prev) => ({
      ...prev,
      [activeComp.id]: { ...prev[activeComp.id], [key]: value },
    }));
  };

  return (
    <>
      <div className="bg-cyber-lime text-black rounded-4xl border-4 border-black h-full p-8 flex flex-col gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black uppercase">Component Lab</h2>
            <p className="text-sm opacity-60">Live UI playground — edit props in real time</p>
          </div>

          {/* Search input */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search components…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2 text-sm font-mono bg-white/40 border-2 border-black/30 rounded-full focus:outline-none focus:border-black placeholder:text-black/30 w-52"
            />
          </div>
        </div>

        {/* ── Category Tabs ── */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
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

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">

          {/* Component List */}
          <div className="lg:col-span-3 space-y-2 overflow-y-auto max-h-75 lg:max-h-none pr-2">
            {filteredComponents.length === 0 ? (
              <p className="text-sm opacity-40 italic px-2">No components match.</p>
            ) : (
              filteredComponents.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => setActiveId(comp.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    activeId === comp.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white/30 border-transparent hover:border-black/20'
                  }`}
                >
                  <div className="font-black text-sm">{comp.title}</div>
                  <div className="text-[10px] uppercase opacity-50">{comp.category}</div>
                </button>
              ))
            )}
          </div>

          {/* Preview + Props Panel */}
          <div className="lg:col-span-9 flex flex-col gap-4 min-h-0">

            {/* View Toggle */}
            <div className="flex gap-2 items-center">
              {(['ui', 'code'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 text-xs font-black uppercase rounded-full border-2 transition-all ${
                    view === v
                      ? 'bg-black text-cyber-lime border-black'
                      : 'bg-transparent text-black/60 border-black/30 hover:border-black'
                  }`}
                >
                  {v === 'ui' ? '👁 Preview' : '</> Code'}
                </button>
              ))}

              {/* Copy button — only shown in CODE view */}
              {view === 'code' && (
                <button
                  onClick={copyCode}
                  className="ml-auto flex items-center gap-1.5 bg-black text-cyber-lime px-3 py-1.5 text-xs font-bold rounded-full border-2 border-black hover:bg-black/80 transition-all"
                >
                  {copied ? (
                    <>✓ Copied!</>
                  ) : (
                    <>
                      {/* Clipboard icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3"
                        />
                      </svg>
                      Copy Code
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">

              {/* Preview / Code Panel */}
              <div className="flex-1 bg-white/40 rounded-2xl border-2 border-dashed border-black/20 overflow-hidden flex flex-col min-h-64">
                <div className="flex-1 overflow-auto p-4">
                  {view === 'ui' ? (
                    <div className="flex items-center justify-center h-full">
                      {activeComp.ui(activeProps)}
                    </div>
                  ) : (
                    <pre className="bg-black text-cyber-lime p-4 rounded-xl text-xs overflow-auto h-full font-mono leading-relaxed">
                      <code>{activeComp.code(activeProps)}</code>
                    </pre>
                  )}
                </div>
              </div>

              {/* Live Prop Editor */}
              {activeComp.propDefs && activeComp.propDefs.length > 0 && (
                <div className="lg:w-56 shrink-0">
                  <PropEditor
                    defs={activeComp.propDefs}
                    values={activeProps}
                    onChange={handlePropChange}
                  />
                  {/* Reset props */}
                  <button
                    onClick={() =>
                      setPropValues((prev) => ({
                        ...prev,
                        [activeComp.id]: defaultProps(activeComp),
                      }))
                    }
                    className="mt-2 w-full text-[10px] font-bold uppercase text-black/40 hover:text-black transition-colors"
                  >
                    ↺ Reset to defaults
                  </button>
                </div>
              )}
            </div>

            {/* Component description */}
            <p className="text-xs opacity-50 italic">{activeComp.description}</p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast show={copied} />
    </>
  );
}
