import { useState, useEffect } from 'react';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-999 flex items-start justify-center pt-20">
      <div className="w-full max-w-xl bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center border-b-4 border-black pb-2 mb-4">
          <span className="text-2xl mr-2">🤖</span>
          <input 
            autoFocus
            placeholder="Ask the Atlas... (e.g. 'Show projects')" 
            className="w-full text-xl font-bold outline-none uppercase tracking-tighter"
          />
        </div>
        <div className="text-sm font-mono text-gray-500">
          ESC TO CLOSE • CMD+K TO TOGGLE
        </div>
      </div>
    </div>
  );
};
