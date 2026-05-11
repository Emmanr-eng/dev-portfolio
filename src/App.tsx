/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, Github, Mail, Linkedin, Twitter } from 'lucide-react';
import TerminalTile, { StatusTile } from './components/InteractiveTiles';
import ComponentLab from './components/ComponentLab';
import BugTimeline from './components/BugTimeline';
import ChatAgent from './components/ChatAgent';

const BRAND_NAME = "Developer Atlas";
const BRAND_TAGLINE = "I build things that live on the internet, and then I show you how I built them.";
const LOGO = "EBR";

const TECH_STACK = ["React 19", "Next.js 15+", "TypeScript", "Tailwind v4", "Framer Motion", "Gemini 3", "Node.js", "Three.js", "Rust", "WebAssembly"];

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main id="home" className="min-h-screen bg-canvas text-ink selection:bg-ink selection:text-canvas pb-32">

      {/* Scroll progress — single thin black line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] bg-ink z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-canvas/95 backdrop-blur-sm rule-b">
        <div className="max-w-6xl mx-auto px-8 h-14 flex justify-between items-center">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-xs font-bold uppercase tracking-[0.2em] cursor-pointer text-ink hover:text-blue transition-colors"
          >
            {LOGO} — Dev Atlas
          </motion.div>

          <div className="hidden md:flex gap-8 items-center">
            {[
              { name: "Home", id: "home" },
              { name: "Archive", id: "about" },
              { name: "Lab", id: "component-lab" },
              { name: "Connect", id: "contact-us" }
            ].map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                className="text-ink-muted hover:text-ink font-mono text-[11px] uppercase tracking-widest transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex gap-5 items-center">
            <div className="hidden lg:flex gap-4 items-center pr-5 border-r border-rule">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-ink-muted hover:text-ink transition-colors"><Github size={14} /></a>
              <a href="https://linkedin.com/in/emmanuel-blas-roberto-b369972b3/" target="_blank" rel="noreferrer" className="text-ink-muted hover:text-ink transition-colors"><Linkedin size={14} /></a>
              <a href="https://twitter.com/yourhandle" target="_blank" rel="noreferrer" className="text-ink-muted hover:text-ink transition-colors"><Twitter size={14} /></a>
              <a href="mailto:emmanuel@hurdman.net" className="text-ink-muted hover:text-ink transition-colors"><Mail size={14} /></a>
            </div>
            <motion.a
              href="mailto:emmanuel@hurdman.net"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-ink text-canvas px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-blue transition-colors"
            >
              Ping Me
            </motion.a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 pt-28 space-y-3">

        {/* ── Main Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-3">

          {/* Hero Tile (2×2) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 card p-10 flex flex-col justify-between group overflow-hidden relative"
          >
            {/* Large background numeral */}
            <div className="absolute -bottom-4 -right-4 text-[200px] font-black text-ink/[0.025] select-none leading-none pointer-events-none">
              01
            </div>

            <div className="space-y-6 relative z-10">
              <span className="mono-label">The 2026 Developer Identity</span>
              <h1 className="text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-ink">
                Software<br />
                <span className="accent-underline">Atlas</span>
              </h1>
              <p className="text-ink-muted text-sm leading-relaxed max-w-sm font-light">
                {BRAND_TAGLINE}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-10 relative z-10">
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-ink text-canvas font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-blue transition-colors flex items-center gap-2"
              >
                View Archive <ArrowUpRight size={14} />
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="card font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 text-ink hover:border-ink transition-colors flex items-center gap-2"
              >
                <Github size={14} /> GitHub
              </a>
            </div>
          </motion.div>

          {/* Component Lab Tile (2×1) — Automated Project Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="md:col-span-2 md:row-span-1 card p-8 flex flex-col justify-between group cursor-pointer hover:border-ink transition-colors relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="mono-label block mb-2">Automated Project Gallery</span>
                <h2 className="text-lg font-bold tracking-tight text-ink">Component Lab</h2>
              </div>
              <div className="flex border border-rule text-[10px] font-mono font-bold">
                <span className="bg-ink text-canvas px-2.5 py-1">UI</span>
                <span className="px-2.5 py-1 text-ink-muted">CODE</span>
              </div>
            </div>

            <div className="flex items-center justify-center h-16 border border-dashed border-rule group-hover:border-ink/20 transition-colors">
              <div className="border border-ink/20 px-5 py-1.5 font-mono text-xs text-ink-muted">
                &lt;HapticGlow /&gt;
              </div>
            </div>

            <p className="mono-label">5 components · live props · copy-ready code</p>
          </motion.div>

          {/* Status Tile (1×1) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="md:col-span-1 md:row-span-1"
          >
            <StatusTile />
          </motion.div>

          {/* Terminal Tile (1×1) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="md:col-span-1 md:row-span-1"
            style={{ height: '280px', maxHeight: '280px' }}
          >
            <TerminalTile />
          </motion.div>

          {/* Bug Timeline Bento Tile (2×1) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 md:row-span-1 card p-8 flex flex-col justify-between group"
          >
            <div>
              <span className="mono-label block mb-3">Bug Timeline — Incident Log</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                  <span className="text-[10px] font-mono font-bold uppercase text-red block mb-1">● Broken</span>
                  <code className="text-[11px] text-red/60 font-mono">state.map(x =&gt; x)</code>
                </div>
                <div className="p-4" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <span className="text-[10px] font-mono font-bold uppercase text-green block mb-1">✓ Fixed</span>
                  <code className="text-[11px] text-green/70 font-mono">useMemo(() =&gt; st, [v])</code>
                </div>
              </div>
            </div>
            <p className="mono-label">4 resolved incidents · searchable · expandable</p>
          </motion.div>

          {/* Micro-Stat Tile (1×1) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="md:col-span-1 md:row-span-1 card p-6 flex flex-col items-center justify-center text-center group hover:border-ink transition-colors"
          >
            <div className="text-6xl font-black text-ink display-number group-hover:text-blue transition-colors">42</div>
            <div className="mono-label mt-2">Live Experiments</div>
          </motion.div>

          {/* AI Agent CTA (1×1) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28 }}
            className="md:col-span-1 md:row-span-1 bg-ink p-8 flex flex-col justify-between group cursor-pointer hover:bg-blue transition-colors"
          >
            <div className="flex justify-end">
              <div className="w-8 h-8 border border-canvas/20 flex items-center justify-center text-canvas">
                <ChatAgent triggerOnly />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-canvas/40 mb-1">Neural Query</p>
              <p className="text-2xl font-black leading-none uppercase tracking-tight text-canvas">Query AI</p>
            </div>
          </motion.div>
        </div>

        {/* ── Tech Marquee ── */}
        <div className="py-16 overflow-hidden relative rule-x border-b border-rule">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-canvas to-transparent z-10" />
          <div className="flex whitespace-nowrap animate-marquee">
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span key={i} className="text-5xl md:text-6xl font-black text-ink/[0.06] mx-10 flex items-center gap-6 uppercase tracking-tighter hover:text-ink/10 transition-colors cursor-default">
                {tech}
                <span className="text-ink/[0.04] font-light text-2xl">/</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Sections ── */}
        <section id="about" className="pt-20 scroll-mt-20">
          <BugTimeline />
        </section>

        <section id="component-lab" className="pt-20 scroll-mt-20">
          <ComponentLab />
        </section>

        {/* ── Contact ── */}
        <section id="contact-us" className="pt-28 pb-16 scroll-mt-20">
          <div className="card p-14 md:p-20 relative overflow-hidden">
            {/* Ruled line decoration */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue to-transparent opacity-30" />

            <motion.div
              whileInView={{ opacity: [0, 1], y: [12, 0] }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="mono-label block mb-6">Open to collaborations</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-ink mb-6">
                Let&apos;s architect<br />
                the <span className="accent-underline">future protocol.</span>
              </h2>
              <p className="text-ink-muted text-sm leading-relaxed mb-10 max-w-md">
                Currently sourcing for innovative collaborations and high-impact engineering challenges.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:emmanuel@hurdman.net"
                className="bg-ink text-canvas font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 hover:bg-blue transition-colors flex items-center gap-2"
              >
                Initiate Connection <ArrowUpRight size={14} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="card font-mono text-xs font-bold uppercase tracking-widest px-6 py-4 text-ink hover:border-ink transition-colors flex items-center gap-2"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href="#"
                className="card font-mono text-xs font-bold uppercase tracking-widest px-6 py-4 text-ink hover:border-ink transition-colors flex items-center gap-2"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>

            <div className="mt-12 flex items-center gap-2">
              <span className="status-dot" />
              <span className="mono-label">Available for new projects</span>
            </div>
          </div>
        </section>
      </div>

      {/* ── Footer ── */}
      <footer className="rule-x mt-20 pt-10 pb-20">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink">{LOGO} — Dev Atlas</div>
          <p className="text-ink-muted font-mono text-[10px] uppercase tracking-[0.2em]">
            &copy; 2026 {BRAND_NAME} &bull; Constructed with Intent &bull; v2.6.4
          </p>
          <div className="flex gap-6 font-mono text-[11px] text-ink-muted uppercase tracking-widest">
            <a href="#home" className="hover:text-ink transition-colors">Root</a>
            <a href="#about" className="hover:text-ink transition-colors">Nodes</a>
            <a href="#contact-us" className="hover:text-ink transition-colors">Uplink</a>
          </div>
        </div>
      </footer>

      <ChatAgent />
    </main>
  );
}