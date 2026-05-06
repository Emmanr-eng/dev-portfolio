/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, Github, Mail, Linkedin, Twitter, Globe } from 'lucide-react';
import TerminalTile, { StatusTile } from './components/InteractiveTiles';
import ComponentLab from './components/ComponentLab';
import BugTimeline from './components/BugTimeline';
import ChatAgent from './components/ChatAgent';

const BRAND_NAME = "Developer Atlas";
const BRAND_TAGLINE = "I build things that live on the internet, and then I show you how I built them.";
const LOGO = "EBR - DEV Atlas";

const TECH_STACK = ["React 19", "Next.js 15+", "TypeScript", "Tailwind v4", "Framer Motion", "Gemini 3", "Node.js", "Three.js", "Rust", "WebAssembly"];

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main id="home" className="min-h-screen bg-charcoal-dark selection:bg-cyber-lime selection:text-black pb-32">
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-cyber-lime z-100 origin-left"
        style={{ scaleX }}
      />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6 border-b border-charcoal-border/50 bg-charcoal-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-cyber-lime font-mono font-black text-2xl tracking-tighter cursor-pointer hover:scale-105 transition-transform"
          >
            {LOGO}
          </motion.div>

          <div className="hidden md:flex gap-8 items-center bg-charcoal-light/50 px-6 py-2 rounded-full border border-charcoal-border glass-panel">
            {[
              { name: "Home", id: "home" },
              { name: "Archive", id: "about" },
              { name: "Lab", id: "component-lab" },
              { name: "Connect", id: "contact-us" }
            ].map((item) => (
              <a 
                key={item.name}
                href={`#${item.id}`}
                className="text-gray-400 hover:text-cyber-lime font-mono text-xs uppercase tracking-widest transition-all hover:scale-110 px-2"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex gap-4 md:gap-6 items-center">
            <div className="hidden lg:flex gap-4 border-r border-charcoal-border pr-6 mr-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors"><Github size={16} /></a>
              <a href="https://linkedin.com/in/emmanuel-blas-roberto-b369972b3/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={16} /></a>
              <a href="https://twitter.com/yourhandle" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors"><Twitter size={16} /></a>
              <a href="mailto:emmanuel@hurdman.net" className="text-gray-500 hover:text-white transition-colors"><Mail size={16} /></a>
              
            </div>
            <motion.a 
              href="mailto:emmanuel@hurdman.net"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyber-lime text-black px-5 py-2 font-mono text-xs font-bold. border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none -translate-x-0.5 -translate-y-0.5 hover:translate-x-0 hover:translate-y-0 transition-all font-bold"
            >
              PING ME
            </motion.a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-32 space-y-4">
        
        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto :md:min-h-192">
          
          {/* Main Hero Tile (2x2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 bg-charcoal-light rounded-[2.5rem] p-8 md:p-12 border border-white/5 flex flex-col justify-between group overflow-hidden relative"
          >
             <div className="absolute -bottom-10 -right-10 text-[180px] font-black text-white/3 select-none rotate-6 transition-transform group-hover:rotate-0 duration-700">
                ATLAS
             </div>
             
             <div className="relative z-10 space-y-6">
               <p className="text-cyber-lime text-xs font-black uppercase tracking-[0.25em] underline decoration-cyber-lime/40 underline-offset-8 font-mono">
                 The 2026 Developer Identity
               </p>
               <h1 className="text-7xl lg:text-[110px] leading-[0.8] font-serif font-black italic tracking-tighter text-white">
                 Software <br/><span className="text-cyber-lime">Atlas</span>
               </h1>
               <p className="text-gray-400 text-lg font-mono leading-tight max-w-[85%]">
                 {BRAND_TAGLINE}
               </p>
             </div>

             <div className="relative z-10 flex flex-wrap gap-4 mt-8">
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-cyber-lime text-black font-black px-8 py-4 rounded-full text-sm uppercase tracking-tighter hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
                >
                  View Archive <ArrowUpRight size={16} />
                </button>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="glass-panel text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-tighter hover:bg-white hover:text-black transition-all flex items-center gap-2">
                  <Github size={16} /> GitHub
                </a>
             </div>
          </motion.div>

          {/* Component Lab Tile (2x1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 md:row-span-1 bg-cyber-lime text-black rounded-[2.5rem] border-4 border-black p-8 relative group cursor-pointer overflow-hidden"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Component Lab</h2>
              <div className="flex bg-black/10 rounded-lg p-1 text-[10px] font-bold">
                <span className="bg-black text-white px-2 py-1 rounded">UI</span>
                <span className="px-2 py-1 opacity-50">CODE</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-24 border-2 border-dashed border-black/20 rounded-2xl group-hover:bg-black/5 transition-colors">
               <div className="w-48 h-10 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-bold italic text-black">
                 Neo-Brutal Button
               </div>
            </div>
            <p className="mt-4 text-[10px] font-black uppercase tracking-widest opacity-60">FEATURED: PHY-01 Physics Toggle v2.4</p>
          </motion.div>

          {/* Status Tile (1x1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 md:row-span-1"
          >
            <StatusTile />
          </motion.div>

          {/* Terminal Tile (1x1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 md:row-span-1"
            style={{ height: '280px', maxHeight: '280px' }}
          >
            <TerminalTile />
          </motion.div>

          {/* Timeline Tile (2x1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 md:row-span-1 bg-charcoal-card rounded-[2.5rem] p-8 border border-white/5 relative group overflow-hidden"
          >
            <h3 className="text-[10px] font-black text-cyber-lime uppercase tracking-widest mb-6">Log 082: Timeline of a Bug</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex flex-col justify-center">
                <span className="text-[10px] font-black text-red-500 uppercase mb-1">Broken</span>
                <code className="text-[11px] text-gray-500 font-mono">state.map(x =&gt; x)</code>
              </div>
              <div className="bg-cyber-lime/10 border border-cyber-lime/20 rounded-2xl p-4 flex flex-col justify-center">
                <span className="text-[10px] font-black text-cyber-lime uppercase mb-1">Optimized</span>
                <code className="text-[11px] text-white font-mono">useMemo(() =&gt; st, [v])</code>
              </div>
            </div>
          </motion.div>

          {/* Micro-Stat Tile (1x1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-1 md:row-span-1 bg-charcoal-light rounded-[2.5rem] p-6 border border-white/5 flex flex-col items-center justify-center text-center group hover:border-cyber-lime/30 transition-colors"
          >
            <div className="text-5xl font-serif font-black italic mb-2 group-hover:scale-110 transition-transform">42</div>
            <div className="text-[10px] uppercase font-black tracking-widest opacity-40">Live Experiments</div>
          </motion.div>

          {/* AI Agent CTA (1x1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="md:col-span-1 md:row-span-1 bg-cyber-lime rounded-[2.5rem] p-8 border-4 border-black flex flex-col justify-between group cursor-pointer hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-2 opacity-10">
               <Globe size={40} className="animate-spin-slow" />
            </div>
            <div className="flex justify-end">
               <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-cyber-lime group-hover:rotate-360 transition-transform duration-700 shadow-xl">
                 <ChatAgent triggerOnly />
               </div>
            </div>
            <div className="text-black">
              <p className="text-[11px] font-black uppercase tracking-tighter mb-1">Neural Query</p>
              <p className="text-3xl font-black leading-none uppercase tracking-tighter">Query AI</p>
            </div>
          </motion.div>
        </div>

        {/* Tech Marquee */}
        <div className="py-20 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-charcoal-dark to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-charcoal-dark to-transparent z-10" />
          <div className="flex whitespace-nowrap animate-marquee">
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span key={i} className="text-6xl md:text-8xl font-serif font-bold italic text-white/5 mx-8 flex items-center gap-4 hover:text-cyber-lime/20 transition-colors cursor-default">
                {tech} <div className="w-4 h-4 bg-cyber-lime rounded-full" />
              </span>
            ))}
          </div>
        </div>

        {/* Extended Sections */}
        <section id="about" className="pt-24 scroll-mt-24">
          <BugTimeline />
        </section>

        <section id="component-lab" className="pt-24 scroll-mt-24">
          <ComponentLab />
        </section>

        {/* Contact Section */}
        <section id="contact-us" className="pt-32 pb-20 scroll-mt-24">
           <div className="bg-charcoal-light rounded-[3rem] p-12 md:p-20 text-center border border-white/5 flex flex-col items-center gap-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-64 h-64 bg-cyber-lime/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyber-lime/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
             
             <motion.div 
               whileInView={{ scale: [0.9, 1.05, 1], opacity: [0, 1] }}
               transition={{ duration: 0.8 }}
               className="relative z-10"
             >
               <h2 className="text-5xl md:text-8xl font-serif italic text-white mb-6 tracking-tighter leading-none">
                 Let&apos;s architect the <br/>
                 <span className="text-cyber-lime">future protocol.</span>
               </h2>
               <p className="text-gray-400 font-mono text-lg max-w-xl mx-auto mb-12">
                 Currently sourcing for innovative collaborations and high-impact engineering challenges.
               </p>
             </motion.div>

             <div className="flex flex-wrap justify-center gap-4 relative z-10">
               <a 
                 href="mailto:emmanuel@hurdman.net" 
                 className="bg-cyber-lime text-black font-black px-10 py-5 rounded-full uppercase tracking-tighter hover:scale-105 transition-transform flex items-center gap-3 text-lg"
               >
                 INITIATE CONNECTION <ArrowUpRight size={24} />
               </a>
               <div className="flex gap-4">
                 <a href="https://github.com" target="_blank" rel="noreferrer" className="glass-panel text-white p-5 rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center group" title="GITHUB">
                    <Github className="group-hover:rotate-12 transition-transform" />
                 </a>
                 <a href="#" className="glass-panel text-white p-5 rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center group" title="LINKEDIN">
                    <Linkedin className="group-hover:rotate-12 transition-transform" />
                 </a>
               </div>
             </div>

             <div className="mt-12 text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">
               ESTABLISHING SECURE HANDSHAKE...
             </div>
           </div>
        </section>
      </div>

      <footer className="border-t border-charcoal-border/30 pt-12 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-cyber-lime font-mono text-xl font-black">{LOGO}</div>
          <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.2em] order-2 md:order-1">
            &copy; 2026 {BRAND_NAME} &bull; Constructed with Intent &bull; Version 2.6.4
          </p>
          <div className="flex gap-6 text-gray-500 font-mono text-xs order-1 md:order-2 uppercase">
            <a href="#home" className="hover:text-cyber-lime transition-colors">ROOT</a>
            <a href="#about" className="hover:text-cyber-lime transition-colors">NODES</a>
            <a href="#contact-us" className="hover:text-cyber-lime transition-colors">UPLINK</a>
          </div>
        </div>
      </footer>

      {/* AI Agent Overlay */}
      <ChatAgent />
    </main>
  );
}
