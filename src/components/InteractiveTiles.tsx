import { useState, useEffect, useRef, type SubmitEvent } from 'react';
import { Terminal, Clock, Wifi } from 'lucide-react';
import { motion } from 'motion/react';

const MAX_HISTORY = 20;

export default function TerminalTile() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Developer Atlas v2.6.0',
    'Type "help" for commands.',
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    let response: string;

    if (cmd === 'help') {
      response = 'Commands: about, skills, contact, clear, whoami';
    } else if (cmd === 'about') {
      response = 'The Open-Source Human: Authentic, transparent, and always learning.';
    } else if (cmd === 'whoami' || cmd.startsWith('whoami ')) {
      response = 'Name: Developer Atlas. Role: Creator of things that live on the internet.';
    } else if (cmd === 'skills') {
      response = 'React, TypeScript, Tailwind, Framer Motion, AI Systems Architecture.';
    } else if (cmd === 'contact') {
      response = 'Find me at emmanuel@hurdman.net or on GitHub.';
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === '') {
      return;
    } else {
      response = `bash: ${cmd}: command not found`;
    }

    setHistory((prev) => {
      const next = [...prev, `$ ${input}`, response];
      return next.slice(-MAX_HISTORY);
    });
    setInput('');
  };

  return (
    <div className="h-full w-full" style={{ height: '100%', maxHeight: '280px', minHeight: '200px' }}>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col bg-ink h-full font-mono text-xs"
        style={{ maxHeight: '280px', overflow: 'hidden' }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-canvas/10 shrink-0">
          <div className="flex items-center gap-1.5 text-canvas/50">
            <Terminal size={11} />
            <span className="text-[10px] uppercase tracking-widest">Terminal</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-canvas/10" />
            <div className="w-2 h-2 rounded-full bg-canvas/10" />
            <div className="w-2 h-2 rounded-full bg-canvas/20" />
          </div>
        </div>

        {/* History */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-1"
          style={{ maxHeight: '150px', minHeight: '60px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
        >
          {history.map((line, i) => (
            <div key={i} className={line.startsWith('$') ? 'text-canvas/90' : 'text-canvas/40'}>
              {line}
            </div>
          ))}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-canvas/60 inline-block w-1.5 h-3 bg-canvas/60"
          />
        </div>

        {/* Input */}
        <form
          onSubmit={handleCommand}
          className="flex gap-2 px-4 py-2.5 border-t border-canvas/10 shrink-0"
        >
          <span className="text-canvas/40">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'help'…"
            className="flex-1 bg-transparent border-none outline-none text-canvas/90 focus:ring-0 placeholder:text-canvas/20 min-w-0 text-xs font-mono"
            autoComplete="off"
          />
        </form>
      </motion.div>
    </div>
  );
}

export function StatusTile() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const timer = setInterval(() =>
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
      className="card p-6 flex flex-col justify-between h-full"
      style={{ maxHeight: '280px', minHeight: '200px' }}
    >
      <div className="mono-label flex items-center gap-2">
        <Clock size={11} />
        Local Status
      </div>

      <div>
        <div className="text-5xl font-black text-ink tracking-tighter display-number leading-none">{time}</div>
        <div className="mono-label flex items-center gap-1.5 mt-2">
          <Wifi size={11} />
          Global Node · 18°C
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="status-dot" />
        <span className="mono-label text-blue">Currently Coding</span>
      </div>
    </motion.div>
  );
}