import { Bug, Code } from 'lucide-react';

const BUGS = [
  {
    id: 1,
    title: "The Race Condition Ghost",
    challenge: "UI state flickering between 'Initial' and 'Success' during fast network transitions.",
    before: "// Old way: naive state update\nsetLoading(true);\nfetchData().then(res => {\n  setData(res);\n  setLoading(false);\n});",
    after: "// The fix: abort controller & cleanup\nuseEffect(() => {\n  const controller = new AbortController();\n  fetchData({ signal: controller.signal })\n    .then(setData);\n  return () => controller.abort();\n}, []);"
  },
  {
    id: 2,
    title: "Layout Shift Nightmare",
    challenge: "Custom fonts causing CLS (Cumulative Layout Shift) score to plummet.",
    before: "@font-face {\n  font-family: 'Playfair';\n  src: url('/fonts/playfair.woff2');\n}",
    after: "@font-face {\n  font-family: 'Playfair';\n  src: url('/fonts/playfair.woff2');\n  font-display: swap;\n  size-adjust: 110%; /* Matches fallback metrics */\n}"
  }
  
];

export default function BugTimeline() {
  return (
    <div className="space-y-12">
      <div className="max-w-xl">
        <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4">Timeline of a Bug</h2>
        <p className="text-gray-400 font-mono text-sm tracking-tighter">
          Engineering is 10% coding and 90% detective work. This is the log of the crimes I&apos;ve solved.
        </p>
      </div>

      <div className="grid gap-16 relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-charcoal-border hidden md:block" />

        {BUGS.map((bug) => (
          <div key={bug.id} className="relative pl-0 md:pl-20 group">
            <div className="absolute left-6.5 top-6 w-3 h-3 rounded-full bg-cyber-lime neo-brutalist-border hidden md:block group-hover:scale-125 transition-transform" />
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 bg-charcoal-light neo-brutalist-border p-8 hover:bg-charcoal-light/80 transition-colors">
              <div>
                <header className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-500/10 text-red-500 rounded border border-red-500/20">
                    <Bug size={18} />
                  </div>
                  <h3 className="text-2xl font-serif text-white">{bug.title}</h3>
                </header>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {bug.challenge}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-red-400 uppercase tracking-widest">
                    <Code size={12} /> The Problem
                  </div>
                  <div className="bg-charcoal-dark p-4 rounded-sm border border-red-900/20 font-mono text-[11px] text-red-300 opacity-50 grayscale hover:grayscale-0 transition-all">
                    <pre className="whitespace-pre-wrap">{bug.before}</pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-cyber-lime uppercase tracking-widest">
                    <Code size={12} /> The Solution
                  </div>
                  <div className="bg-charcoal-dark p-4 rounded-sm border border-cyber-lime/20 font-mono text-[11px] text-cyber-lime shadow-[0_0_10px_rgba(223,255,0,0.05)]">
                    <pre className="whitespace-pre-wrap">{bug.after}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
