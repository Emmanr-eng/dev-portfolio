import { useState } from 'react';
import { Bug, Code, ChevronDown, Search, ShieldAlert } from 'lucide-react';
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

const SEVERITY_CONFIG = {
  critical: {
    badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    dot: 'bg-rose-400',
    glow: 'rgba(244,63,94,0.5)',
    label: '● CRITICAL'
  },
  medium: {
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    dot: 'bg-amber-400',
    glow: 'rgba(251,191,36,0.5)',
    label: '◆ MEDIUM'
  },
  low: {
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    dot: 'bg-emerald-400',
    glow: 'rgba(52,211,153,0.5)',
    label: '▲ LOW'
  },
};

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

  const SeverityBadge = ({ severity }: { severity: 'critical' | 'medium' | 'low' }) => {
    const cfg = SEVERITY_CONFIG[severity];
    return (
      <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded border font-mono ${cfg.badge}`}>
        {cfg.label}
      </span>
    );
  };

  return (
    <div className="space-y-10">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-3">
            <ShieldAlert size={18} className="text-neon-violet" />
            <span className="text-neon-violet text-[10px] font-black uppercase tracking-[0.25em] font-mono">
              {`// Incident Log — Bug Timeline`}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
            Timeline of a Bug
          </h2>
          <p className="text-gray-500 font-mono text-sm leading-relaxed">
            Engineering is 10% coding and 90% detective work. This is the log of the crimes I&apos;ve solved.
          </p>
        </div>

        {/* Stats strip */}
        <div className="flex gap-4 shrink-0">
          {[
            { label: 'Resolved', val: '4', color: 'text-emerald-400' },
            { label: 'Critical', val: '2', color: 'text-rose-400' },
            { label: 'Avg Fix', val: '3d', color: 'text-neon-violet' },
          ].map(s => (
            <div key={s.label} className="bg-void-card rounded-2xl px-4 py-3 glow-border-violet text-center min-w-64px">
              <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
              <div className="text-[10px] text-gray-600 font-mono uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Search & Filters ── */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search incident log..."
            className="w-full bg-void-card border border-void-border rounded-xl pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-neon-violet/50 font-mono placeholder:text-gray-700 transition-colors"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 text-xs font-black rounded-full border transition-all font-mono uppercase ${
              !activeTag
                ? 'text-white border-neon-violet/60 bg-neon-violet/15'
                : 'bg-transparent text-gray-600 border-void-border hover:border-neon-violet/30 hover:text-gray-400'
            }`}
          >
            ALL
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1.5 text-xs font-black rounded-full border transition-all font-mono uppercase ${
                activeTag === tag
                  ? 'text-white border-neon-cyan/60 bg-neon-cyan/15'
                  : 'bg-transparent text-gray-600 border-void-border hover:border-neon-cyan/30 hover:text-gray-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Bug List ── */}
      <div className="relative">
        {/* Timeline spine — violet gradient */}
        <div className="absolute left-[1.65rem] top-4 bottom-4 w-px hidden md:block"
          style={{ background: 'linear-gradient(180deg, rgba(167,139,250,0.6) 0%, rgba(34,211,238,0.3) 100%)' }} />

        <div className="grid gap-5">
          {filteredBugs.map((bug, index) => {
            const cfg = SEVERITY_CONFIG[bug.severity];
            return (
              <motion.div
                key={bug.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative pl-0 md:pl-16 group"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-5 top-7 w-3.5 h-3.5 rounded-full hidden md:block border-2 border-void ${cfg.dot}`}
                  style={{ boxShadow: `0 0 10px ${cfg.glow}` }}
                />

                <div
                  className="bg-void-card rounded-2xl overflow-hidden border border-void-border hover:border-neon-violet/25 transition-all duration-300 cursor-pointer group-hover:shadow-[0_0_30px_rgba(167,139,250,0.06)]"
                  onClick={() => setExpandedId(expandedId === bug.id ? null : bug.id)}
                >
                  {/* Card header */}
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl shrink-0"
                        style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)' }}>
                        <Bug size={16} className="text-neon-violet" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                          <h3 className="text-lg font-black text-white tracking-tight">{bug.title}</h3>
                          <SeverityBadge severity={bug.severity} />
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-gray-600 text-[11px] font-mono">{bug.date}</span>
                          {bug.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded font-mono uppercase"
                              style={{ background: 'rgba(167,139,250,0.08)', color: 'rgba(167,139,250,0.6)', border: '1px solid rgba(167,139,250,0.12)' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === bug.id ? 180 : 0 }}
                      className="text-gray-600 shrink-0"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </div>

                  {/* Expandable body */}
                  <AnimatePresence>
                    {expandedId === bug.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-5 border-t border-void-border pt-5">
                          <p className="text-gray-400 text-sm font-mono leading-relaxed">{bug.challenge}</p>

                          <div className="grid md:grid-cols-2 gap-4">
                            {/* Problem */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-[10px] font-mono text-rose-400 uppercase font-black">
                                <Code size={11} /> The Problem
                              </div>
                              <pre className="p-4 rounded-xl font-mono text-[11px] text-rose-300 whitespace-pre-wrap overflow-x-auto leading-relaxed"
                                style={{ background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.15)' }}>
                                {bug.before}
                              </pre>
                            </div>
                            {/* Solution */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-[10px] font-mono text-neon-violet uppercase font-black">
                                <Code size={11} /> The Solution
                              </div>
                              <pre className="p-4 rounded-xl font-mono text-[11px] text-neon-violet whitespace-pre-wrap overflow-x-auto leading-relaxed"
                                style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.2)' }}>
                                {bug.after}
                              </pre>
                            </div>
                          </div>

                          {bug.learnings && (
                            <div className="rounded-xl p-4"
                              style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)' }}>
                              <span className="text-[10px] font-black text-neon-cyan uppercase font-mono">⚡ Key Learning</span>
                              <p className="text-gray-300 text-sm mt-1.5 leading-relaxed">{bug.learnings}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}