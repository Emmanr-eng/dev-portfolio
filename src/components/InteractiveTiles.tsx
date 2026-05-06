import { useState, useEffect, type SubmitEvent } from 'react';
import { Terminal, Clock, Cloud } from 'lucide-react';
import { motion } from 'motion/react';

export default function TerminalTile() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Developer Atlas v2.6.0',
    'Type "help" for a list of commands.',
  ]);

  const handleCommand = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    let response: string;

    if (cmd === 'help') {
      response = 'Available commands: about, skills, contact, clear, whoami';
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
      response = `Command not found: ${cmd}. Type "help" for options.`;
    }

    setHistory((prev) => [...prev, `> ${input}`, response]);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col h-full bg-black rounded-3xl border border-white/10 p-5 font-mono text-xs group overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-cyber-lime/90">
          <Terminal size={12} />
          <span className="text-[10px] uppercase tracking-widest">Terminal</span>
        </div>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-[10px] text-green-400/80"
        >
          LIVE
        </motion.div>
      </div>

      <div className="flex gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
      </div>
      
      <div className="flex-1 overflow-y-auto mb-2 space-y-1 custom-scrollbar text-gray-500">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-green-400' : ''}>
            {line}
          </div>
        ))}
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.1 }}
          className="text-cyber-lime"
        >
          _
        </motion.div>
      </div>

      <form onSubmit={handleCommand} className="flex gap-2 border-t border-white/5 pt-2">
        <span className="text-green-400">$</span>
        <input
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help'..."
          className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 placeholder:text-gray-700"
          autoComplete="off"
        />
      </form>
    </motion.div>
  );
}

export function StatusTile() {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 }}
      className="bg-charcoal-light rounded-3xl border border-white/5 p-6 flex flex-col justify-between h-full group"
    >
      <div className="text-cyber-lime text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
        <Clock size={12} />
        Local Status
      </div>
      
      <div>
        <div className="text-5xl font-serif italic text-white tracking-tighter">{time}</div>
        <div className="text-xs text-gray-500 font-mono mt-1 flex items-center gap-2">
          <Cloud size={12} />
          <span>Global Node • 18°C</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyber-lime animate-pulse" />
        <span className="text-[10px] uppercase font-bold opacity-50 font-mono">Currently Coding</span>
      </div>
    </motion.div>
  );
}
