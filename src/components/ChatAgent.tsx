import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Sparkles, User, Bot, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are the AI Assistant for "Developer Atlas", a portfolio by a world-class front-end engineer.
Your name is Atlas AI. You are witty, concise, and professional. 
You know about the projects on this site (Component Lab, Bug Timeline) and the "The Open-Source Human" branding.
If someone asks about the developer's resume:
- Specialized in React, TypeScript, and 2026 UI trends.
- Loves Neo-Brutalism and motion design.
- Based in the cloud, always building.
Keep responses short. Use bullet points for lists.`;

export default function ChatAgent({ triggerOnly = false }: { triggerOnly?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Ask me anything about my journey or current experiments. I have been trained on the Atlas dataset.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${SYSTEM_PROMPT}\n\nUser: ${userMsg}\nAtlas AI:`,
      });
      
      const responseText = response.text || "I'm having trouble retrieving a response.";

      setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "I hit a data-stream bottleneck. Try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (triggerOnly) {
    return (
      <button onClick={() => setIsOpen(true)} className="w-full h-full flex items-center justify-center">
        <MessageSquare size={20} />
      </button>
    );
  }

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 bg-cyber-lime text-black p-4 rounded-full shadow-2xl neo-brutalist-border transition-shadow hover:shadow-cyber-lime/40"
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X key="x" size={24} /> : <MessageSquare key="msg" size={24} />}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
            className="fixed bottom-28 right-8 z-50 w-87.5 md:w-100 h-125 bg-charcoal-light neo-brutalist-border shadow-2xl flex flex-col overflow-hidden"
          >
            <header className="bg-charcoal-dark border-b border-charcoal-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-cyber-lime/10 flex items-center justify-center text-cyber-lime">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-serif italic text-white leading-tight">Atlas Intelligence</h3>
                  <span className="text-[10px] font-mono text-cyber-lime uppercase tracking-widest">Online & Calibrated</span>
                </div>
              </div>
            </header>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[radial-gradient(#1E1E1E_1px,transparent_1px)] bg-size-[16px_16px]"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === 'user' ? 'bg-cyber-lime text-black' : 'bg-charcoal-dark text-white border border-charcoal-border'}`}>
                      {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`p-3 rounded-sm text-sm font-sans markdown-body ${msg.role === 'user' ? 'bg-cyber-lime text-black font-medium' : 'bg-charcoal-dark text-gray-300 border border-charcoal-border'}`}>
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-charcoal-dark border border-charcoal-border p-3 rounded-sm flex gap-1">
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-cyber-lime rounded-full" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyber-lime rounded-full" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyber-lime rounded-full" />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-4 bg-charcoal-dark border-t border-charcoal-border flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my projects..."
                className="flex-1 bg-charcoal-light border border-charcoal-border text-white px-3 py-2 text-sm focus:outline-none focus:border-cyber-lime transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-cyber-lime/10 text-cyber-lime p-2 hover:bg-cyber-lime hover:text-black transition-all disabled:opacity-50 disabled:hover:bg-cyber-lime/10 disabled:hover:text-cyber-lime"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
