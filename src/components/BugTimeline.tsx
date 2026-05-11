import { useState } from 'react';
import { Bug, Code, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BugEntry {
  id: number;
  title: string;
  date: string;
  severity: 'critical' | 'medium' | 'low';
  tags: string[];
  challenge: string;
  before: string;
  after: string;
  learnings?: string;
}

const BUGS: BugEntry[] = [
  {
    id: 1,
    title: "The Race Condition Ghost",
    date: "2026-03-15",
    severity: "critical",
    tags: ["React", "Performance", "Async"],
    challenge: "UI state flickering between 'Initial' and 'Success' during fast network transitions.",
    before: `// Old way: naive state update
setLoading(true);
fetchData().then(res => {
  setData(res);
  setLoading(false);
});`,
    after: `// The fix: abort controller & cleanup
useEffect(() => {
  const controller = new AbortController();
  fetchData({ signal: controller.signal })
    .then(setData);
  return () => controller.abort();
}, []);`,
    learnings: "Always use AbortController for async operations in useEffect to prevent memory leaks and race conditions."
  },
  {
    id: 2,
    title: "Layout Shift Nightmare",
    date: "2026-02-28",
    severity: "medium",
    tags: ["CSS", "Performance", "Fonts"],
    challenge: "Custom fonts causing CLS (Cumulative Layout Shift) score to plummet.",
    before: `@font-face {
  font-family: 'Playfair';
  src: url('/fonts/playfair.woff2');
}`,
    after: `@font-face {
  font-family: 'Playfair';
  src: url('/fonts/playfair.woff2');
  font-display: swap;
  size-adjust: 110%;
}`,
    learnings: "Use font-display: swap and size-adjust to minimize CLS when loading custom fonts."
  },
  {
    id: 3,
    title: "The Infinite Re-render Loop",
    date: "2026-02-10",
    severity: "critical",
    tags: ["React", "Hooks", "Performance"],
    challenge: "Component re-rendering infinitely due to object dependency in useEffect.",
    before: `useEffect(() => {
  fetchUser(config);
}, [config]); // config = { id: 1 }`,
    after: `const configId = config.id;
useEffect(() => {
  fetchUser({ id: configId });
}, [configId]); // Primitive dependency`,
    learnings: "Use primitive values in dependency arrays, or memoize objects with useMemo."
  },
  {
    id: 4,
    title: "Z-Index Chaos",
    date: "2026-01-20",
    severity: "low",
    tags: ["CSS", "UI"],
    challenge: "Modal appearing behind other elements despite high z-index.",
    before: `.modal {
  z-index: 9999;
  position: relative;
}`,
    after: `.modal {
  z-index: 9999;
  position: fixed;
  isolation: isolate;
}`,
    learnings: "Stacking contexts matter! Use isolation: isolate to create a new stacking context."
  }
];

export default function BugTimeline() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const allTags = [...new Set(BUGS.flatMap(bug => bug.tags))];

  const filteredBugs = BUGS.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(search.toLowerCase()) ||
                          bug.challenge.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !activeTag || bug.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  const SeverityBadge = ({ severity }: { severity: string }) => {
    // CHANGED: softer tints → vivid neon cyberpunk badges
    const colors = {
      critical: 'bg-neon-pink/20 text-neon-pink border-neon-pink/50 shadow-[0_0_8px_rgba(255,45,120,0.4)]',
      medium:   'bg-yellow-400/20 text-yellow-300 border-yellow-400/50 shadow-[0_0_8px_rgba(250,204,21,0.35)]',
      low:      'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50 shadow-[0_0_8px_rgba(0,245,255,0.35)]',
    };
    return (
      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${colors[severity as keyof typeof colors]}`}>
        {severity}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-xl">
        {/* CHANGED: text-white → text-neon-cyan with glow */}
        <h2 className="text-4xl md:text-5xl font-serif italic text-neon-cyan text-glow-cyan mb-4">
          Timeline of a Bug
        </h2>
        {/* CHANGED: text-gray-400 → text-neon-cyan/50 */}
        <p className="text-neon-cyan/50 font-mono text-sm">
          Engineering is 10% coding and 90% detective work. This is the log of the crimes I&apos;ve solved.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          {/* CHANGED: text-gray-500 → text-neon-cyan/50 */}
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-cyan/50" />
          {/* CHANGED: bg-charcoal-light border-white/10 focus:border-cyber-lime
                     → bg-charcoal-dark border-neon-cyan/20 focus:border-neon-cyan glow */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bugs..."
            className="w-full bg-charcoal-dark border border-neon-cyan/20 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,245,255,0.3)] transition-all"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTag(null)}
            // CHANGED: bg-cyber-lime text-black → bg-neon-pink text-black with glow
            className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${
              !activeTag
                ? 'bg-neon-pink text-black border-neon-pink shadow-[0_0_10px_rgba(255,45,120,0.55)]'
                : 'bg-transparent text-gray-400 border-white/10 hover:border-neon-pink/40 hover:text-neon-pink'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${
                activeTag === tag
                  ? 'bg-neon-pink text-black border-neon-pink shadow-[0_0_10px_rgba(255,45,120,0.55)]'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-neon-pink/40 hover:text-neon-pink'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Bug List */}
      <div className="grid gap-6 relative">
        {/* CHANGED: bg-charcoal-border → neon-pink/30 timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
             style={{ background: 'linear-gradient(to bottom, rgba(255,45,120,0.6), rgba(0,245,255,0.3))' }} />

        {filteredBugs.map((bug, index) => (
          <motion.div
            key={bug.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-0 md:pl-20 group"
          >
            {/* CHANGED: bg-cyber-lime → neon-pink dot on timeline */}
            <div className="absolute left-6 top-8 w-3.5 h-3.5 rounded-full hidden md:block"
                 style={{ background: '#FF2D78', boxShadow: '0 0 10px 3px rgba(255,45,120,0.7)', border: '2px solid #0A0A0F' }} />

            {/* CHANGED: bg-charcoal-light border-white/5 hover:border-cyber-lime/30
                       → cyber-card with neon-pink glow on hover */}
            <div
              className="bg-charcoal-card border border-neon-pink/20 rounded-2xl overflow-hidden hover:border-neon-pink/60 hover:shadow-[0_0_20px_rgba(255,45,120,0.25)] transition-all cursor-pointer"
              onClick={() => setExpandedId(expandedId === bug.id ? null : bug.id)}
            >
              {/* Header */}
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* CHANGED: bg-red-500/10 text-red-500 border-red-500/20 → neon-pink */}
                  <div className="p-2 bg-neon-pink/10 text-neon-pink rounded border border-neon-pink/30 shadow-[0_0_8px_rgba(255,45,120,0.3)]">
                    <Bug size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      {/* CHANGED: font-serif text-white → font-serif text-white (keep) but add glow on hover via group */}
                      <h3 className="text-xl font-serif text-white group-hover:text-neon-cyan transition-colors">{bug.title}</h3>
                      <SeverityBadge severity={bug.severity} />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* CHANGED: text-gray-500 → text-neon-cyan/40 */}
                      <span className="text-neon-cyan/40 text-xs font-mono">{bug.date}</span>
                      {bug.tags.map(tag => (
                        // CHANGED: bg-white/5 text-gray-400 → bg-neon-pink/5 text-neon-pink/60
                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-neon-pink/8 text-neon-pink/60 border border-neon-pink/15 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* CHANGED: text-gray-500 → text-neon-pink/60 */}
                <motion.div animate={{ rotate: expandedId === bug.id ? 180 : 0 }} className="text-neon-pink/60">
                  <ChevronDown size={20} />
                </motion.div>
              </div>

              {/* Expandable content */}
              <AnimatePresence>
                {expandedId === bug.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      {/* CHANGED: text-gray-400 → text-gray-300 */}
                      <p className="text-gray-300 text-sm">{bug.challenge}</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          {/* CHANGED: text-red-400 → text-neon-pink */}
                          <div className="flex items-center gap-2 text-[10px] font-mono text-neon-pink uppercase">
                            <Code size={12} /> The Problem
                          </div>
                          {/* CHANGED: bg-charcoal-dark border-red-900/20 text-red-300
                                     → dark bg, neon-pink border, neon-pink text */}
                          <pre className="bg-black/60 p-4 rounded border border-neon-pink/30 font-mono text-[11px] text-neon-pink/80 whitespace-pre-wrap overflow-x-auto shadow-[inset_0_0_20px_rgba(255,45,120,0.08)]">
                            {bug.before}
                          </pre>
                        </div>
                        <div className="space-y-2">
                          {/* CHANGED: text-cyber-lime → text-neon-cyan */}
                          <div className="flex items-center gap-2 text-[10px] font-mono text-neon-cyan uppercase">
                            <Code size={12} /> The Solution
                          </div>
                          {/* CHANGED: border-cyber-lime/20 text-cyber-lime → neon-cyan */}
                          <pre className="bg-black/60 p-4 rounded border border-neon-cyan/30 font-mono text-[11px] text-neon-cyan/80 whitespace-pre-wrap overflow-x-auto shadow-[inset_0_0_20px_rgba(0,245,255,0.08)]">
                            {bug.after}
                          </pre>
                        </div>
                      </div>

                      {bug.learnings && (
                        // CHANGED: bg-cyber-lime/5 border-cyber-lime/20 → neon-cyan glow panel
                        <div className="bg-neon-cyan/5 border border-neon-cyan/25 rounded-lg p-4 shadow-[0_0_12px_rgba(0,245,255,0.1)]">
                          <span className="text-[10px] font-bold text-neon-cyan uppercase">Key Learning</span>
                          <p className="text-gray-300 text-sm mt-1">{bug.learnings}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}