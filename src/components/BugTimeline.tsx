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

  // Get all unique tags
  const allTags = [...new Set(BUGS.flatMap(bug => bug.tags))];

  // Filter bugs based on search and tag
  const filteredBugs = BUGS.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(search.toLowerCase()) ||
                          bug.challenge.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !activeTag || bug.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  // Severity badge component
  const SeverityBadge = ({ severity }: { severity: string }) => {
    const colors = {
      critical: 'bg-red-500/20 text-red-400 border-red-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-green-500/20 text-green-400 border-green-500/30'
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
        <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4">Timeline of a Bug</h2>
        <p className="text-gray-400 font-mono text-sm">
          Engineering is 10% coding and 90% detective work. This is the log of the crimes I&aposve solved.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bugs..."
            className="w-full bg-charcoal-light border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-cyber-lime"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${
              !activeTag ? 'bg-cyber-lime text-black border-cyber-lime' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${
                activeTag === tag ? 'bg-cyber-lime text-black border-cyber-lime' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Bug List */}
      <div className="grid gap-6 relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-charcoal-border hidden md:block" />

        {filteredBugs.map((bug, index) => (
          <motion.div 
            key={bug.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-0 md:pl-20 group"
          >
            <div className="absolute left-6.5 top-8 w-3 h-3 rounded-full bg-cyber-lime border-2 border-black hidden md:block" />
            
            <div 
              className="bg-charcoal-light border border-white/5 rounded-2xl overflow-hidden hover:border-cyber-lime/30 transition-colors cursor-pointer"
              onClick={() => setExpandedId(expandedId === bug.id ? null : bug.id)}
            >
              {/* Header - always visible */}
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-500/10 text-red-500 rounded border border-red-500/20">
                    <Bug size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-serif text-white">{bug.title}</h3>
                      <SeverityBadge severity={bug.severity} />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-gray-500 text-xs font-mono">{bug.date}</span>
                      {bug.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-white/5 text-gray-400 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedId === bug.id ? 180 : 0 }}
                  className="text-gray-500"
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
                    <div className="px-6 pb-6 space-y-4">
                      <p className="text-gray-400 text-sm">{bug.challenge}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[10px] font-mono text-red-400 uppercase">
                            <Code size={12} /> The Problem
                          </div>
                          <pre className="bg-charcoal-dark p-4 rounded border border-red-900/20 font-mono text-[11px] text-red-300 whitespace-pre-wrap overflow-x-auto">
                            {bug.before}
                          </pre>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[10px] font-mono text-cyber-lime uppercase">
                            <Code size={12} /> The Solution
                          </div>
                          <pre className="bg-charcoal-dark p-4 rounded border border-cyber-lime/20 font-mono text-[11px] text-cyber-lime whitespace-pre-wrap overflow-x-auto">
                            {bug.after}
                          </pre>
                        </div>
                      </div>

                      {bug.learnings && (
                        <div className="bg-cyber-lime/5 border border-cyber-lime/20 rounded-lg p-4">
                          <span className="text-[10px] font-bold text-cyber-lime uppercase">Key Learning</span>
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