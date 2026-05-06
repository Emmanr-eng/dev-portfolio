// src/components/ai/CommandPalette.tsx
export const CommandPalette = () => {
  // Logic for opening with Cmd+K or Ctrl+K
  // Implementation of your "AI-powered" search filter
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="max-w-2xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4">
        <input 
          type="text" 
          placeholder="Ask the Atlas... (e.g., 'Show React projects')"
          className="w-full p-2 border-2 border-black outline-none"
        />
      </div>
    </div>
  );
};
