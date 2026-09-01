import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowUp,
  RotateCcw,
  ExternalLink,
  MessageSquare,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

const SUGGESTED_PROMPTS = [
  "What does Zeploy do?",
  "Our services",
  "Show me your projects",
  "How do I start a project?",
];

// Clean, lightweight Markdown formatter for assistant responses
function FormattedContent({ text }: { text: string }) {
  const rendered = React.useMemo(() => {
    if (!text) return null;

    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];
    let listType: "ul" | "ol" = "ul";

    const flushList = () => {
      if (inList && listItems.length > 0) {
        if (listType === "ul") {
          elements.push(
            <ul key={`ul-${elements.length}`} className="list-disc pl-4 space-y-1 my-2 text-foreground/90">
              {listItems.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {parseInline(item)}
                </li>
              ))}
            </ul>
          );
        } else {
          elements.push(
            <ol key={`ol-${elements.length}`} className="list-decimal pl-4 space-y-1 my-2 text-foreground/90">
              {listItems.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {parseInline(item)}
                </li>
              ))}
            </ol>
          );
        }
        listItems = [];
        inList = false;
      }
    };

    const parseInline = (str: string): React.ReactNode => {
      const parts: React.ReactNode[] = [];
      let cursor = 0;
      const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(str)) !== null) {
        if (match.index > cursor) {
          parts.push(str.substring(cursor, match.index));
        }
        const token = match[0];
        if (token.startsWith("**") && token.endsWith("**")) {
          parts.push(
            <strong key={match.index} className="text-foreground font-semibold">
              {token.slice(2, -2)}
            </strong>
          );
        } else if (token.startsWith("*") && token.endsWith("*")) {
          parts.push(
            <em key={match.index} className="text-foreground/80 italic">
              {token.slice(1, -1)}
            </em>
          );
        } else if (token.startsWith("`") && token.endsWith("`")) {
          parts.push(
            <code
              key={match.index}
              className="bg-muted/80 text-electric px-1.5 py-0.5 rounded font-mono text-[11px] border border-border"
            >
              {token.slice(1, -1)}
            </code>
          );
        } else if (token.startsWith("[") && token.includes("](")) {
          const m = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (m) {
            const isExternal = m[2].startsWith("http");
            parts.push(
              <a
                key={match.index}
                href={m[2]}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-electric hover:text-blue-500 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-0.5"
              >
                {m[1]}
                {isExternal && <ExternalLink className="w-2.5 h-2.5 inline ml-0.5 opacity-70" />}
              </a>
            );
          }
        }
        cursor = regex.lastIndex;
      }

      if (cursor < str.length) {
        parts.push(str.substring(cursor));
      }

      return parts.length > 0 ? parts : str;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed) {
        flushList();
        continue;
      }

      // Headers (### or ##)
      if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h4 key={`h-${i}`} className="font-display font-bold text-foreground text-sm mt-3 mb-1 tracking-tight">
            {parseInline(trimmed.slice(4))}
          </h4>
        );
        continue;
      }
      if (trimmed.startsWith("## ")) {
        flushList();
        elements.push(
          <h3 key={`h-${i}`} className="font-display font-bold text-foreground text-base mt-3.5 mb-1.5 tracking-tight">
            {parseInline(trimmed.slice(3))}
          </h3>
        );
        continue;
      }

      // Unordered list (* or -)
      const ulMatch = trimmed.match(/^[\*\-]\s+(.+)/);
      if (ulMatch) {
        if (!inList || listType !== "ul") {
          flushList();
          inList = true;
          listType = "ul";
        }
        listItems.push(ulMatch[1]);
        continue;
      }

      // Ordered list (1., 2., etc.)
      const olMatch = trimmed.match(/^\d+\.\s+(.+)/);
      if (olMatch) {
        if (!inList || listType !== "ol") {
          flushList();
          inList = true;
          listType = "ol";
        }
        listItems.push(olMatch[1]);
        continue;
      }

      flushList();
      elements.push(
        <p key={`p-${i}`} className="my-1.5 leading-relaxed text-slate-200">
          {parseInline(trimmed)}
        </p>
      );
    }

    flushList();
    return elements;
  }, [text]);

  return <div className="space-y-0.5 text-sm">{rendered}</div>;
}

export default function Zee() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  // Smart auto-scroll: only scrolls if user was already near bottom
  const scrollToBottom = useCallback((force = false) => {
    const container = chatContainerRef.current;
    if (!container) return;

    if (force) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    if (distanceFromBottom < 120) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
      const timer = setTimeout(() => {
        if (window.innerWidth >= 640) {
          inputRef.current?.focus();
        }
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen && (messages.length > 0 || isStreaming || isWaiting)) {
      scrollToBottom(isWaiting);
    }
  }, [messages, isStreaming, isWaiting, isOpen, scrollToBottom]);

  // Escape key closes window (or collapses if expanded)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isExpanded) {
          setIsExpanded(false);
        } else {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isExpanded]);

  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend ?? inputValue;
    const text = rawText.trim();
    if (!text || isWaiting || isStreaming) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    if (!textToSend) setInputValue("");
    setIsWaiting(true);
    setIsStreaming(false);

    const conversationHistory = nextMessages.slice(-10).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const assistantMsgId = `assistant-${Date.now()}`;

    try {
      const res = await fetch("/api/zee?stream=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream, application/json",
        },
        body: JSON.stringify({
          message: text,
          history: conversationHistory,
          stream: true,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("text/event-stream") && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulated = "";
        let buffer = "";
        let hasStartedStreaming = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() || "";

          for (const part of parts) {
            const trimmed = part.trim();
            if (!trimmed.startsWith("data:")) continue;
            const dataStr = trimmed.replace(/^data:\s*/, "");
            if (dataStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.delta) {
                if (!hasStartedStreaming) {
                  hasStartedStreaming = true;
                  setIsWaiting(false);
                  setIsStreaming(true);
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: assistantMsgId,
                      role: "assistant",
                      content: parsed.delta,
                    },
                  ]);
                  accumulated = parsed.delta;
                } else {
                  accumulated += parsed.delta;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMsgId ? { ...m, content: accumulated } : m
                    )
                  );
                }
              } else if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch {
              // Ignore non-JSON lines
            }
          }
        }

        setIsWaiting(false);
        setIsStreaming(false);
      } else {
        const data = await res.json();
        const replyText =
          data?.reply ||
          "Zee couldn't respond right now. Please try again.";

        setIsWaiting(false);
        setMessages((prev) => [
          ...prev,
          {
            id: assistantMsgId,
            role: "assistant",
            content: replyText,
          },
        ]);
      }
    } catch (err) {
      console.error("[Zee Chat Error]:", err);
      setIsWaiting(false);
      setIsStreaming(false);

      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Zee couldn't respond right now. Please try again.",
        isError: true,
      };

      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactClick = () => {
    setIsOpen(false);
    setIsExpanded(false);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setInputValue("");
    setIsWaiting(false);
    setIsStreaming(false);
  };

  return (
    <>
      {/* 1. FLOATING LAUNCHER (When Closed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="zee-launcher"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Open Zee AI Assistant"
            className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[60] w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-electric hover:bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/25 border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-electric focus:ring-offset-2 focus:ring-offset-background group cursor-pointer transition-all"
          >
            {/* Subtle glow */}
            <span className="absolute -inset-1 rounded-full bg-electric/20 blur-sm group-hover:bg-electric/35 transition-colors" />

            {/* Small green online indicator */}
            <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-background shadow-sm flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-100 animate-pulse" />
            </span>

            {/* Emblem Zee Avatar */}
            <img
              src="/zee-avatar.webp"
              alt="Zee AI Assistant"
              className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-md select-none pointer-events-none"
              draggable={false}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. BACKDROP OVERLAY FOR EXPANDED MODE */}
      <AnimatePresence>
        {isOpen && isExpanded && (
          <motion.div
            key="zee-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[65] transition-opacity"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* 3. CHAT WINDOW (Responsive: Collapsed Floating vs Expanded Workspace) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="zee-panel"
            role="dialog"
            aria-labelledby={titleId}
            aria-modal="true"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`fixed flex flex-col overflow-hidden select-text rounded-2xl border border-electric/25 bg-background/95 backdrop-blur-2xl shadow-2xl shadow-black/60 transition-all duration-200 ${
              isExpanded
                ? "inset-2 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[70] w-[calc(100vw-16px)] sm:w-[min(920px,82vw)] h-[calc(100dvh-16px)] sm:h-[min(720px,84dvh)] max-h-[calc(100dvh-24px)] max-w-[calc(100vw-24px)]"
                : "bottom-2 right-2 left-2 sm:left-auto sm:bottom-4 sm:right-4 z-[60] w-[calc(100vw-16px)] sm:w-[390px] sm:max-w-[calc(100vw-32px)] h-[calc(100dvh-16px)] sm:h-[min(540px,calc(100dvh-96px))] sm:max-h-[calc(100dvh-96px)]"
            }`}
          >
            {/* Top Accent Gradient Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-electric to-transparent shrink-0" />

            {/* =================================================== */}
            {/* HEADER (~60-64px) */}
            {/* =================================================== */}
            <header className="px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-border flex items-center justify-between bg-surface/85 backdrop-blur-md shrink-0 gap-2">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-electric/15 border border-electric/25 flex items-center justify-center shadow-sm shrink-0 overflow-hidden p-1">
                  <img
                    src="/zee-avatar.webp"
                    alt="Zee Avatar"
                    className="w-full h-full object-contain select-none pointer-events-none"
                    draggable={false}
                  />
                </div>
                <div className="min-w-0">
                  <h2 id={titleId} className="text-xs sm:text-sm font-display font-bold text-foreground leading-tight truncate">
                    Zee
                  </h2>
                  <p className="text-[9px] sm:text-[10px] font-mono text-muted-foreground leading-tight truncate">
                    Zeploy AI Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Small Online Badge */}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>

                {messages.length > 0 && (
                  <button
                    onClick={handleClearChat}
                    title="Clear conversation"
                    aria-label="Clear conversation"
                    className="w-7 h-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Expand / Collapse Button (Desktop and Mobile) */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Collapse to floating window" : "Expand to full workspace"}
                  aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
                  className="w-7 h-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsExpanded(false);
                  }}
                  title="Close chat (Esc)"
                  aria-label="Close chat"
                  className="w-7 h-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* =================================================== */}
            {/* CHAT AREA (Scrollable, Flex-1, Min-h-0) */}
            {/* =================================================== */}
            <div
              ref={chatContainerRef}
              className={`flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-4 space-y-3 overscroll-contain ${
                isExpanded ? "max-w-4xl mx-auto w-full" : ""
              }`}
            >
              {/* WELCOME SCREEN */}
              {messages.length === 0 && (
                <div className="py-4 px-2 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-2xl bg-electric/15 border border-electric/25 flex items-center justify-center mb-2 shadow-sm overflow-hidden p-1.5">
                    <img
                      src="/zee-avatar.webp"
                      alt="Zee Avatar"
                      className="w-full h-full object-contain select-none pointer-events-none"
                      draggable={false}
                    />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-sm sm:text-base tracking-tight">
                    Hi, I&apos;m Zee.
                  </h3>
                  <p className="font-mono text-xs text-electric mt-0.5 font-medium">
                    Zeploy&apos;s AI assistant.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5 max-w-[280px] leading-relaxed">
                    Ask me about our services, projects, team, process, or how we work.
                  </p>

                  {/* Compact Suggestion Chips */}
                  <div className={`w-full mt-4 flex flex-col gap-1.5 ${isExpanded ? "sm:grid sm:grid-cols-2 max-w-lg" : ""}`}>
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-left text-xs text-foreground/90 bg-surface hover:bg-muted/70 border border-border hover:border-electric/40 px-3 py-2 rounded-xl transition-all flex items-center justify-between group cursor-pointer shadow-xs"
                      >
                        <span>{prompt}</span>
                        <ArrowUp className="w-3 h-3 text-muted-foreground group-hover:text-electric transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MESSAGES */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-electric text-white font-medium rounded-2xl rounded-tr-xs px-3.5 py-2.5 text-sm max-w-[85%] sm:max-w-[78%] shadow-sm"
                        : "bg-surface/90 border border-border text-foreground rounded-2xl rounded-tl-xs px-3.5 py-3 text-sm leading-relaxed max-w-[88%] sm:max-w-[82%] shadow-xs"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <>
                        <FormattedContent text={msg.content} />
                        {msg.isError && (
                          <div className="mt-2.5 pt-2 border-t border-border flex items-center gap-2">
                            <button
                              onClick={() => {
                                const lastUser = [...messages].reverse().find((m) => m.role === "user");
                                if (lastUser) handleSendMessage(lastUser.content);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors cursor-pointer"
                            >
                              Try again
                            </button>
                            <button
                              onClick={handleContactClick}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-electric hover:bg-blue-600 text-white text-xs font-medium transition-colors cursor-pointer"
                            >
                              <MessageSquare className="w-3 h-3" />
                              Contact Zeploy
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* TINY TYPING INDICATOR */}
              {isWaiting && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start"
                >
                  <div className="bg-surface/90 border border-border rounded-2xl rounded-tl-xs px-3 py-2 shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-electric animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-electric animate-bounce" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* =================================================== */}
            {/* INPUT AREA (Fixed height, shrink-0) */}
            {/* =================================================== */}
            <div className="p-2.5 sm:p-3 border-t border-border bg-surface/90 backdrop-blur-md shrink-0">
              <div className={`relative flex items-center gap-2 bg-background/90 border border-border focus-within:border-electric/50 rounded-2xl px-3 py-1.5 transition-all shadow-xs ${isExpanded ? "max-w-4xl mx-auto" : ""}`}>
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Zee anything..."
                  rows={1}
                  disabled={isWaiting || isStreaming}
                  aria-label="Ask Zee anything"
                  className="bg-transparent text-foreground placeholder:text-muted-foreground/60 text-xs sm:text-sm py-1 outline-none w-full resize-none max-h-20 min-h-[28px] sm:min-h-[30px] leading-snug font-sans disabled:opacity-50"
                  style={{ height: "auto" }}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isWaiting || isStreaming}
                  aria-label="Send message"
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                    inputValue.trim() && !isWaiting && !isStreaming
                      ? "bg-electric hover:bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-100"
                      : "bg-muted text-muted-foreground/40 cursor-not-allowed"
                  }`}
                >
                  <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
