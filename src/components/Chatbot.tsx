import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { ChatMessage, Issue } from '../types';
import { TRANSLATIONS } from '../translations';

interface ChatbotProps {
  currentIssues: Issue[];
  langCode: string;
  languageName: string;
}

const QUICK_PROMPTS = [
  "How can I report a water leakage?",
  "What are the most critical potholes?",
  "How does community verification work?",
  "How can I earn Level 8 Citizen Hero?"
];

export default function Chatbot({ currentIssues, langCode, languageName }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[langCode] || TRANSLATIONS['en-US'];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize and translate welcome when language changes
  useEffect(() => {
    setMessages([
      {
        id: 'init-1',
        sender: 'ai',
        text: t.chatbotWelcome || "Hello! I am your CivicResolve AI Assistant. I have live access to active municipal issues in Metro Heights. Ask me anything about local reports, prediction models, or how to resolve civic challenges!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [langCode]);

  // Auto-scroll messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Connect to full-stack Express backend /api/chat Proxy
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-10), // Send last 10 messages for conversation context
          currentIssues: currentIssues,
          language: languageName
        })
      });

      if (!response.ok) {
        throw new Error("Failed to reach full-stack proxy");
      }

      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || "I was unable to analyze your query properly. Please check your credentials.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      // Premium Rule-based Heuristic Response Fallback if offline/failed
      setTimeout(() => {
        let reply = "I am operating on offline fallback mode. ";
        const query = textToSend.toLowerCase();

        if (query.includes("report") || query.includes("pothole") || query.includes("water")) {
          reply += "To report an issue like a pothole or water leakage, click the 'Report Issue' button or double-click directly on the live community map! You can also paste social media links to automatically parse them.";
        } else if (query.includes("verification") || query.includes("vote")) {
          reply += "Community Verification crowdsources validation! Scroll down to the 'Active Reports' section, review reports, and click 'Verify' to support or confirm issues you have personally seen. This drives municipal priority!";
        } else if (query.includes("level") || query.includes("points") || query.includes("hero")) {
          reply += "You earn XP and Bounty Points by reporting active issues (50 pts), getting your reports verified (+10 pts), or voting to verify other citizen reports (15 pts). Redeem points in the rewards store!";
        } else {
          reply += "I'm Metro Heights' civic assistant. I can guide you on active reports, priority scales, and community rewards. Set GEMINI_API_KEY inside the Secrets panel to activate full conversational neural responses!";
        }

        const aiMsg: ChatMessage = {
          id: `ai-mock-${Date.now()}`,
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      }, 1000);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Siri-like visual glowing floating button with top-tier z-index */}
      <button
        id="btn-chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 group"
        title="CivicResolve AI Assistant"
      >
        <span className="absolute inset-0 rounded-full bg-indigo-400 opacity-40 animate-ping group-hover:animate-none"></span>
        <span className="absolute inset-1 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 blur-sm opacity-80"></span>
        <MessageSquare className="w-6 h-6 relative z-10 animate-pulse" />
      </button>

      {/* Floating Glass Panel Chat Dialog with top-tier z-index */}
      {isOpen && (
        <div 
          id="chat-dialog-panel"
          className="fixed inset-0 w-screen h-screen rounded-none md:inset-auto md:fixed md:bottom-24 md:right-6 md:w-[500px] md:h-[80vh] md:rounded-3xl lg:w-[420px] lg:h-[75vh] z-[9999] glass-panel-dark text-white border-0 md:border md:border-white/20 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300"
        >
          {/* Header Panel matching layout: 🤖 CivicHero AI */}
          <div className="bg-slate-900/90 border-b border-white/10 px-5 py-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-base font-display font-black text-white flex items-center gap-1.5">
                🤖 CivicHero AI
              </span>
            </div>
            
            <button
              id="btn-close-chat"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/40"
          >
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div 
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs font-sans shadow-sm leading-relaxed ${
                      isUser 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white/10 text-slate-100 border border-white/5 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="block text-[8px] opacity-50 mt-1 text-right">{msg.timestamp}</span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-slate-100 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 text-xs flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestion Prompts Section (Always visible right above input for premium guidance) */}
          <div className="px-4 py-2.5 bg-slate-950/20 border-t border-white/5 shrink-0">
            <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1 font-mono">
              <HelpCircle className="w-3 h-3 text-indigo-400" /> Suggested Prompts
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(p)}
                  className="text-[10px] text-slate-300 bg-white/5 hover:bg-indigo-500/10 hover:text-indigo-200 border border-white/10 hover:border-indigo-500/20 px-2.5 py-1 rounded-full transition text-left cursor-pointer font-sans"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Form Footer matching layout: Type your message... ➤ */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center relative shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full text-xs bg-white/5 text-white border border-white/10 rounded-xl pl-4 pr-11 py-3 outline-none focus:bg-white/10 focus:border-indigo-500/50 transition font-sans"
            />
            <button
              id="btn-chat-submit"
              type="submit"
              className="absolute right-6 p-1.5 text-indigo-400 hover:text-indigo-300 transition flex items-center justify-center cursor-pointer active:scale-95 text-sm font-bold"
              title="Send Message"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
