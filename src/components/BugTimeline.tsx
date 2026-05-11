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
  const [search, setSearch]       = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const allTags = [...new Set(BUGS.flatMap(bug => bug.tags))];

  const filteredBugs = BUGS.filter(bug => {
    const matchesSearch =
      bug.title.toLowerCase().includes(search.toLowerCase()) ||
      bug.challenge.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !activeTag || bug.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  /*
   * BLUEPRINT SEVERITY BADGE
   * CHANGED: neon-pink/cyan glow badges → crisp blueprint ink badges
   *   critical → red annotation
   *   medium   → amber annotation
   *   low      → green annotation
   */
  const SeverityBadge = ({ severity }: { severity: string }) => {
    const styles: Record<string, React.CSSProperties> = {
      critical: { background: '#FEF2F2', color: '#B91C1C', borderColor: '#FECACA' },
      medium:   { background: '#FFFBEB', color: '#92400E', borderColor: '#FDE68A' },
      low:      { background: '#F0FDF4', color: '#15803D', borderColor: '#BBF7D0' },
    };
    return (
      <span
        className="px-2 py-0.5 text-[10px] font-bold uppercase rounded border font-mono"
        style={styles[severity] ?? {}}
      >
        {severity}
      </span>
    );
  };

  return (
    <div className="space-y-8">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="max-w-xl">
        {/* CHANGED: neon-cyan glow → deep blueprint navy */}
        <h2
          className="text-4xl md:text-5xl font-serif italic mb-4"
          style={{ color: '#1B4F9A' }}
        >
          Timeline of a Bug
        </h2>
        {/* CHANGED: neon-cyan/50 → muted slate */}
        <p className="font-mono text-sm" style={{ color: '#4A6080' }}>
          Engineering is 10% coding and 90% detective work. This is the log of the crimes I&apos;ve solved.
        </p>
      </div>

      {/* ── Search & Filters ────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          {/* CHANGED: neon-cyan/50 → blueprint muted */}
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#4A6080' }} />
          {/* CHANGED: dark bg neon borders → white input, blueprint border */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bugs..."
            className="w-full rounded-lg pl-10 pr-4 py-2 text-sm font-mono transition-all outline-none"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(27,79,154,0.2)',
              color: '#0F1C3F',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = '#2563EB')}
            onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(27,79,154,0.2)')}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {/* CHANGED: neon-pink active → blueprint blue active */}
          <button
            onClick={() => setActiveTag(null)}
            className="px-3 py-1.5 text-xs font-bold rounded-full border font-mono transition-all"
            style={
              !activeTag
                ? { background: '#1B4F9A', color: '#FFFFFF', borderColor: '#1B4F9A' }
                : { background: 'transparent', color: '#4A6080', borderColor: 'rgba(27,79,154,0.2)' }
            }
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className="px-3 py-1.5 text-xs font-bold rounded-full border font-mono transition-all"
              style={
                activeTag === tag
                  ? { background: '#1B4F9A', color: '#FFFFFF', borderColor: '#1B4F9A' }
                  : { background: 'transparent', color: '#4A6080', borderColor: 'rgba(27,79,154,0.2)' }
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Bug List ────────────────────────────────────────────── */}
      <div className="grid gap-5 relative">
        {/*
          * CHANGED: neon-pink→cyan gradient line
          *       → crisp blueprint blue dashed vertical rule
          */}
        <div
          className="absolute left-8 top-0 bottom-0 hidden md:block"
          style={{
            width: '1px',
            borderLeft: '1.5px dashed rgba(27,79,154,0.28)',
          }}
        />

        {filteredBugs.map((bug, index) => (
          <motion.div
            key={bug.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-0 md:pl-20 group"
          >
            {/*
              * CHANGED: neon-pink glow dot → blueprint crosshair marker
              */}
            <div
              className="bp-crosshair absolute left-[26px] top-8 hidden md:block"
            />

            {/*
              * CHANGED: dark card neon-pink border/glow
              *       → white bp-card with blueprint blue border
              */}
            <div
              className="bp-card overflow-hidden cursor-pointer"
              onClick={() => setExpandedId(expandedId === bug.id ? null : bug.id)}
            >
              {/* Card header — always visible */}
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/*
                    * CHANGED: neon-pink icon badge → red on light bg
                    */}
                  <div
                    className="p-2 rounded border flex-shrink-0"
                    style={{
                      background: '#FEF2F2',
                      color: '#B91C1C',
                      borderColor: '#FECACA',
                    }}
                  >
                    <Bug size={18} />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      {/* CHANGED: text-white → deep ink, hover → blueprint blue */}
                      <h3
                        className="text-xl font-serif transition-colors group-hover:text-bp-accent"
                        style={{ color: '#0F1C3F' }}
                      >
                        {bug.title}
                      </h3>
                      <SeverityBadge severity={bug.severity} />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {/* CHANGED: neon-cyan/40 → muted slate mono */}
                      <span className="text-xs font-mono" style={{ color: '#4A6080' }}>
                        {bug.date}
                      </span>
                      {bug.tags.map(tag => (
                        /*
                         * CHANGED: neon-pink/5 border tags → light blueprint chip
                         */
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded font-mono"
                          style={{
                            background: 'rgba(27,79,154,0.07)',
                            color: '#1B4F9A',
                            border: '1px solid rgba(27,79,154,0.15)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CHANGED: neon-pink chevron → blueprint blue */}
                <motion.div
                  animate={{ rotate: expandedId === bug.id ? 180 : 0 }}
                  style={{ color: '#1B4F9A' }}
                >
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
                    <div
                      className="px-6 pb-6 space-y-4 border-t"
                      style={{ borderColor: 'rgba(27,79,154,0.1)', paddingTop: '1.25rem' }}
                    >
                      {/* CHANGED: text-gray-300 → near-black ink */}
                      <p className="text-sm" style={{ color: '#334155' }}>
                        {bug.challenge}
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">

                        {/* Problem panel */}
                        <div className="space-y-2">
                          {/* CHANGED: neon-pink label → red annotation */}
                          <div
                            className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold"
                            style={{ color: '#B91C1C' }}
                          >
                            <Code size={12} /> The Problem
                          </div>
                          {/*
                            * CHANGED: dark bg neon-pink border/text
                            *       → ivory bg, red dashed border, red ink
                            */}
                          <pre
                            className="p-4 rounded font-mono text-[11px] whitespace-pre-wrap overflow-x-auto"
                            style={{
                              background: '#FEF2F2',
                              border: '1.5px dashed #FECACA',
                              color: '#991B1B',
                            }}
                          >
                            {bug.before}
                          </pre>
                        </div>

                        {/* Solution panel */}
                        <div className="space-y-2">
                          {/* CHANGED: neon-cyan label → green annotation */}
                          <div
                            className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold"
                            style={{ color: '#15803D' }}
                          >
                            <Code size={12} /> The Solution
                          </div>
                          {/*
                            * CHANGED: dark bg neon-cyan border/text
                            *       → mint bg, green dashed border, green ink
                            */}
                          <pre
                            className="p-4 rounded font-mono text-[11px] whitespace-pre-wrap overflow-x-auto"
                            style={{
                              background: '#F0FDF4',
                              border: '1.5px dashed #BBF7D0',
                              color: '#15803D',
                            }}
                          >
                            {bug.after}
                          </pre>
                        </div>
                      </div>

                      {bug.learnings && (
                        /*
                         * CHANGED: neon-cyan/5 glow panel
                         *       → blueprint blue note panel
                         */
                        <div
                          className="rounded-lg p-4"
                          style={{
                            background: 'rgba(27,79,154,0.05)',
                            border: '1.5px solid rgba(27,79,154,0.18)',
                          }}
                        >
                          <span
                            className="text-[10px] font-bold uppercase font-mono"
                            style={{ color: '#1B4F9A' }}
                          >
                            Key Learning
                          </span>
                          <p className="text-sm mt-1" style={{ color: '#334155' }}>
                            {bug.learnings}
                          </p>
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