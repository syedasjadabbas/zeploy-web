import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, ArrowUpRight, RotateCcw } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const SUGGESTED_PROMPTS = [
  "What does Zeploy do?",
  "What services do you offer?",
  "Show me your projects",
  "How can I start a project?",
];

const WELCOME_TEXT = `Hi, I'm Zee 👋
I'm Zeploy's AI assistant. Ask me about our services, projects, process, team, or anything else about Zeploy.`;

function FormattedContent({ text }: { text: string }) {
  // Simple, safe Markdown-like renderer for paragraphs, bullet points, bold text, and inline links
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Bullet point detection
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
          const content = trimmed.replace(/^[-*•]\s+/, "");
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1 text-foreground/90">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
              <span>{renderInlineFormatting(content)}</span>
            </div>
          );
        }

        // Numbered list detection
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1 text-foreground/90">
              <span className="font-mono text-[11px] font-semibold text-electric shrink-0">
                {numMatch[1]}.
              </span>
              <span>{renderInlineFormatting(numMatch[2])}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="text-foreground/90">
            {renderInlineFormatting(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineFormatting(str: string): React.ReactNode[] {
  // Split on bold (**text**)
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function Zee() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // SSR Safe initialization
  useEffect(() => {
    setIsClient(true);
    setMessages([
      {
        id: "welcome-msg",
        role: "assistant",
        content: WELCOME_TEXT,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input on desktop
      const timer = setTimeout(() => {
        if (window.innerWidth >= 640) {
          inputRef.current?.focus();
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages, scrollToBottom]);

  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend ?? inputValue;
    const text = rawText.trim();
    if (!text || isLoading) return;

    setHasInteracted(true);
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsLoading(true);

    try {
      // Build conversation history (excluding initial welcome message for cleaner context)
      const conversationHistory = messages
        .filter((m) => m.id !== "welcome-msg")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/zee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: conversationHistory,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      const replyText =
        data?.reply ||
        "I couldn't process that response. Please feel free to reach out to us at zeploytech@gmail.com.";

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: replyText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Zee fetch error:", err);
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "I ran into a temporary connection issue. You can try asking again or reach out to the Zeploy team directly at **zeploytech@gmail.com** or on WhatsApp at **+923033236878**.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-msg",
        role: "assistant",
        content: WELCOME_TEXT,
        timestamp: Date.now(),
      },
    ]);
    setHasInteracted(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-[390px] h-[520px] max-h-[calc(100vh-6.5rem)] flex flex-col rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B1535]/95 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.6)] overflow-hidden"
            role="dialog"
            aria-label="Zee - Zeploy AI Assistant"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-surface/50 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                {/* Zee Avatar Badge */}
                <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-electric to-blue-700 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <span className="font-display text-base font-bold tracking-tight">Z</span>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0B1535] bg-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-sm font-bold tracking-wide text-foreground">Zee</h3>
                    <span className="rounded-full bg-electric/15 border border-electric/30 px-1.5 py-0.2 font-mono text-[9px] font-medium text-electric uppercase tracking-wider">
                      AI
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Zeploy Tech Assistant
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                {hasInteracted && (
                  <button
                    type="button"
                    onClick={handleResetChat}
                    title="Reset conversation"
                    aria-label="Reset conversation"
                    className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="grid h-8 w-8 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-electric/20 border border-electric/30 text-electric mt-0.5">
                        <Sparkles className="h-3 w-3" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm shadow-sm ${
                        isUser
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs"
                          : "bg-surface/80 border border-white/10 text-foreground rounded-tl-xs backdrop-blur-md"
                      }`}
                    >
                      <FormattedContent text={msg.content} />
                    </div>
                  </div>
                );
              })}

              {/* Suggested Questions (only if user hasn't sent a message yet) */}
              {!hasInteracted && messages.length === 1 && (
                <div className="mt-4 pt-2 border-t border-white/5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-1">
                    Suggested Questions
                  </p>
                  <div className="grid gap-1.5">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleSendMessage(prompt)}
                        className="group flex items-center justify-between w-full rounded-xl border border-white/5 bg-surface/40 hover:bg-surface/80 hover:border-electric/40 px-3 py-2 text-left text-xs text-foreground/85 hover:text-foreground transition-all duration-200"
                      >
                        <span className="truncate pr-2">{prompt}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-electric transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading / Typing Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2 justify-start">
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-electric/20 border border-electric/30 text-electric mt-0.5">
                    <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: "3s" }} />
                  </div>
                  <div className="rounded-2xl rounded-tl-xs bg-surface/80 border border-white/10 px-4 py-2.5 backdrop-blur-md">
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-electric animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-electric animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-electric animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="border-t border-white/10 bg-surface/30 p-2.5 sm:p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Zee a question..."
                    disabled={isLoading}
                    maxLength={2000}
                    className="w-full rounded-xl border border-white/10 bg-background/70 px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-electric text-white transition-all hover:bg-blue-600 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-electric shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground/60 font-mono tracking-tight">
                Zeploy AI Studio • Lahore, Pakistan
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close Zee assistant" : "Open Zee assistant"}
        className="group relative flex items-center gap-2.5 rounded-full border border-electric/30 bg-[#0B1535]/90 px-4 py-3 text-foreground shadow-[0_0_25px_rgba(59,130,246,0.3)] backdrop-blur-xl transition-all duration-300 hover:border-electric hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]"
      >
        <div className="relative grid h-7 w-7 place-items-center rounded-full bg-electric text-white">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="font-display font-bold text-sm tracking-tight"
              >
                Z
              </motion.div>
            )}
          </AnimatePresence>
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </div>

        <div className="flex flex-col items-start pr-1">
          <span className="font-display text-xs font-bold leading-none tracking-wide text-foreground">
            {isOpen ? "Close" : "Chat with Zee"}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-electric">
            AI Assistant
          </span>
        </div>
      </motion.button>
    </div>
  );
}
