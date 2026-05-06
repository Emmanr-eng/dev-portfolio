import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Sparkles, User, Bot, X, RotateCcw } from 'lucide-react';
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

// NEW: Suggested prompts
const SUGGESTED_PROMPTS = [
  "What's in the Component Lab?",
  "Tell me about your tech stack",
  "What bugs have you solved?",
  "How can I contact you?"
];

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function ChatAgent({ triggerOnly = false }: { triggerOnly?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    // NEW: Load from localStorage
    const saved = localStorage.getItem('atlas-chat-history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [{ role: 'bot', text: 'Ask me anything about my journey or current experiments.' }];
      }
    }
    return [{ role: 'bot', text: 'Ask me anything about my journey or current experiments.' }];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // NEW: Save to localStorage when messages change
  useEffect(() => {
    localStorage.setItem('atlas-chat-history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (messageText?: string) => {
    const userMsg = (messageText || input).trim();
    if (!userMsg || isTyping) return;

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      // NEW: Build conversation history for context
      const conversationHistory = messages
        .slice(-10) // Last 10 messages for context
        .map(m => `${m.role === 'user' ? 'User' : 'Atlas AI'}: ${m.text}`)
        .join('\n');

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${SYSTEM_PROMPT}\n\nConversation so far:\n${conversationHistory}\n\nUser: ${userMsg}\nAtlas AI:`,
      });
      
      const responseText = response.text || "I'm having trouble retrieving a response.";
      setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
    } catch (err) {
      console.error("Gemini Error:", err);
      setError("Failed to get response. Click retry to try again.");
      setMessages(prev => [...prev, { role: 'bot', text: "I hit a data-stream bottleneck. Try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // NEW: Clear chat history
  const clearHistory = () => {
    setMessages([{ role: 'bot', text: 'Chat cleared. Ask me anything!' }]);
    localStorage.removeItem('atlas-chat-history');
  };

  // NEW: Retry last message
  const retryLast = () => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg) {
      // Remove the last bot error message
      setMessages(prev => prev.slice(0, -1));
      handleSend(lastUserMsg.text);
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
        className="fixed bottom-8 right-8 z-50 bg-cyber-lime text-black p-4 rounded-full shadow-2xl neo-brutalist-border"
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X key="x" size={24} /> : <MessageSquare key="msg" size={24} />}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-8 z-50 w-87.5 md:w-100 h-125 bg-charcoal-light neo-brutalist-border shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header with clear button */}
            <header className="bg-charcoal-dark border-b border-charcoal-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-cyber-lime/10 flex items-center justify-center text-cyber-lime">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-serif italic text-white leading-tight">Atlas Intelligence</h3>
                  <span className="text-[10px] font-mono text-cyber-lime uppercase tracking-widest">Online</span>
                </div>
              </div>
              {/* NEW: Clear history button */}
              <button
                onClick={clearHistory}
                className="text-gray-500 hover:text-white text-[10px] font-mono uppercase"
              >
                Clear
              </button>
            </header>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                      msg.role === 'user' ? 'bg-cyber-lime text-black' : 'bg-charcoal-dark text-white border border-white/10'
                    }`}>
                      {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`p-3 rounded-lg text-sm ${
                      msg.role === 'user' ? 'bg-cyber-lime text-black' : 'bg-charcoal-dark text-gray-300 border border-white/5'
                    }`}>
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-charcoal-dark border border-charcoal-border p-3 rounded-lg flex gap-1">
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-cyber-lime rounded-full" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyber-lime rounded-full" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyber-lime rounded-full" />
                  </div>
                </div>
              )}

              {/* NEW: Error retry button */}
              {error && (
                <button
                  onClick={retryLast}
                  className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 mx-auto"
                >
                  <RotateCcw size={12} /> Retry
                </button>
              )}
            </div>

            {/* NEW: Suggested prompts */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="text-[10px] px-3 py-1.5 bg-charcoal-dark border border-white/10 text-gray-400 rounded-full hover:border-cyber-lime hover:text-cyber-lime transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-4 bg-charcoal-dark border-t border-charcoal-border flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my projects..."
                className="flex-1 bg-charcoal-light border border-charcoal-border text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-cyber-lime"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-cyber-lime/10 text-cyber-lime p-2 rounded hover:bg-cyber-lime hover:text-black transition-all disabled:opacity-50"
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