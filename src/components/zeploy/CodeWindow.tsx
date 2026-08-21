import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Copy, FileCode, Terminal } from "lucide-react";

export interface CodeWindowProps {
  fileName?: string;
  language?: string;
  code: string;
  status?: string;
  badge?: string;
  className?: string;
  showLineNumbers?: boolean;
  typingSpeed?: number;
  highlightLines?: number[];
}

interface Token {
  text: string;
  type:
    | "keyword"
    | "string"
    | "comment"
    | "function"
    | "type"
    | "number"
    | "boolean"
    | "operator"
    | "punctuation"
    | "variable"
    | "plain";
}

/**
 * Lightweight, high-precision syntax tokenizer for TypeScript, Python, and Shell
 */
function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  // Single-line comment
  const commentIdx = remaining.search(/\/\/|#/);
  if (commentIdx !== -1) {
    // Check if not inside a string
    const before = remaining.slice(0, commentIdx);
    const quoteCount = (before.match(/["'`]/g) || []).length;
    if (quoteCount % 2 === 0) {
      if (commentIdx > 0) {
        tokens.push(...tokenizeCodePart(before));
      }
      tokens.push({ text: remaining.slice(commentIdx), type: "comment" });
      return tokens;
    }
  }

  return tokenizeCodePart(remaining);
}

function tokenizeCodePart(code: string): Token[] {
  const tokens: Token[] = [];
  // Regex splitting by tokens: strings, words, punctuation, whitespace
  const tokenRegex =
    /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|[a-zA-Z_$][a-zA-Z0-9_$]*|\d+(?:\.\d+)?|[=><!~?:&|+\-*\/%^]+|[.,;(){}[\]]|\s+)/g;

  const keywords = new Set([
    "import",
    "export",
    "from",
    "as",
    "const",
    "let",
    "var",
    "function",
    "return",
    "async",
    "await",
    "type",
    "interface",
    "class",
    "extends",
    "implements",
    "new",
    "if",
    "else",
    "try",
    "catch",
    "finally",
    "for",
    "while",
    "switch",
    "case",
    "default",
    "break",
    "continue",
    "def",
    "module",
    "source",
    "yield",
  ]);

  const types = new Set([
    "string",
    "number",
    "boolean",
    "any",
    "void",
    "Promise",
    "Record",
    "Array",
    "Response",
    "Request",
    "URL",
    "JSON",
    "Buffer",
    "Error",
    "Set",
    "Map",
    "DateRange",
    "GeoPolygon",
    "LedgerTransaction",
    "DonationEvent",
    "POSTransactionEvent",
    "CreateOrderDto",
    "DeliveryStop",
    "LatLng",
  ]);

  const builtins = new Set([
    "console",
    "Math",
    "Object",
    "Zeploy",
    "Redis",
    "Warehouse",
    "FHIRParser",
    "SecureVault",
    "SecurityAudit",
    "Sandbox",
    "RouteSolver",
    "TrafficEngine",
    "ChannelManager",
    "Stripe",
    "TaxEngine",
    "ImpactDashboard",
    "PrivateLLM",
    "CentralInventory",
    "WebhookStream",
    "FallbackRouter",
    "HybridRetriever",
    "Guardrails",
    "LLMStream",
    "LocalDB",
    "NetworkSync",
    "StripeBilling",
    "TenantIsolation",
  ]);

  let match;
  while ((match = tokenRegex.exec(code)) !== null) {
    const text = match[0];

    if (/^["'`]/.test(text)) {
      tokens.push({ text, type: "string" });
    } else if (/^\d/.test(text)) {
      tokens.push({ text, type: "number" });
    } else if (text === "true" || text === "false" || text === "null" || text === "undefined") {
      tokens.push({ text, type: "boolean" });
    } else if (keywords.has(text)) {
      tokens.push({ text, type: "keyword" });
    } else if (types.has(text)) {
      tokens.push({ text, type: "type" });
    } else if (builtins.has(text)) {
      tokens.push({ text, type: "variable" });
    } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(text)) {
      // Check if followed by (
      const nextChar = code.slice(tokenRegex.lastIndex).trim()[0];
      if (nextChar === "(") {
        tokens.push({ text, type: "function" });
      } else {
        tokens.push({ text, type: "plain" });
      }
    } else if (/^[=><!~?:&|+\-*\/%^]+$/.test(text)) {
      tokens.push({ text, type: "operator" });
    } else if (/^[.,;(){}[\]]$/.test(text)) {
      tokens.push({ text, type: "punctuation" });
    } else {
      tokens.push({ text, type: "plain" });
    }
  }

  return tokens;
}

function TokenSpan({ token }: { token: Token }) {
  let className = "text-foreground/90";

  switch (token.type) {
    case "comment":
      className = "text-muted-foreground/70 italic dark:text-slate-500 text-slate-400";
      break;
    case "keyword":
      className =
        "text-blue-600 dark:text-blue-400 font-semibold";
      break;
    case "string":
      className = "text-emerald-600 dark:text-emerald-400";
      break;
    case "function":
      className = "text-sky-600 dark:text-sky-300 font-medium";
      break;
    case "type":
      className = "text-amber-600 dark:text-amber-300 font-medium";
      break;
    case "number":
    case "boolean":
      className = "text-amber-600 dark:text-amber-400";
      break;
    case "variable":
      className = "text-cyan-600 dark:text-cyan-300 font-medium";
      break;
    case "operator":
      className = "text-blue-500 dark:text-blue-400";
      break;
    case "punctuation":
      className = "text-foreground/60 dark:text-slate-400 text-slate-500";
      break;
    default:
      className = "text-foreground/90 dark:text-slate-200 text-slate-800";
      break;
  }

  return <span className={className}>{token.text}</span>;
}

export function CodeWindow({
  fileName = "zeploy.config.ts",
  language = "typescript",
  code,
  status = "Live",
  badge,
  className = "",
  showLineNumbers = true,
  typingSpeed = 16,
  highlightLines = [],
}: CodeWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const [copied, setCopied] = useState(false);
  const [displayedChars, setDisplayedChars] = useState(shouldReduceMotion ? code.length : 0);
  const [isCompleted, setIsCompleted] = useState(shouldReduceMotion);

  // Progressive Typing Animation
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedChars(code.length);
      setIsCompleted(true);
      return;
    }

    if (!isInView || isCompleted) return;

    let current = 0;
    const total = code.length;
    const interval = setInterval(() => {
      current += Math.min(3, total - current);
      setDisplayedChars(current);

      if (current >= total) {
        clearInterval(interval);
        setIsCompleted(true);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [isInView, code, typingSpeed, shouldReduceMotion, isCompleted]);

  // Tokenize the currently displayed slice
  const renderedLines = useMemo(() => {
    const slice = code.slice(0, displayedChars);
    const lines = slice.split("\n");
    return lines.map((line) => tokenizeLine(line));
  }, [code, displayedChars]);

  const totalLines = useMemo(() => code.split("\n").length, [code]);

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`glass-card group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 dark:border-white/10 shadow-[0_20px_50px_rgba(11,21,53,0.25)] transition-all duration-300 ${className}`}
    >
      {/* Top Window Titlebar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-surface/70 dark:bg-surface/50 border-b border-white/10 backdrop-blur-md">
        {/* macOS / Window Controls */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56]/80 border border-[#E0443E]/30" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/80 border border-[#DEA123]/30" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F]/80 border border-[#1AAB29]/30" />
        </div>

        {/* File & Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 border border-white/5 font-mono text-xs text-foreground/80">
          <FileCode className="h-3.5 w-3.5 text-electric" />
          <span className="font-medium text-foreground">{fileName}</span>
          {status && (
            <span className="hidden sm:inline-flex items-center gap-1.5 ml-1 text-[11px] text-emerald-500 font-normal">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {status}
            </span>
          )}
        </div>

        {/* Right Actions / Badge */}
        <div className="flex items-center gap-2.5">
          {badge && (
            <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-electric/10 text-electric border border-electric/20 font-medium">
              {badge}
            </span>
          )}
          <button
            onClick={handleCopy}
            title="Copy code"
            aria-label="Copy code snippet to clipboard"
            className="p-1.5 rounded-lg border border-white/5 bg-background/40 hover:bg-surface text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-1 focus:ring-electric"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-4 sm:p-6 overflow-x-auto bg-background/40 dark:bg-surface/20">
        <pre
          className="font-mono text-xs sm:text-sm leading-relaxed tracking-normal selection:bg-electric/30"
          tabIndex={0}
        >
          <code>
            {renderedLines.map((lineTokens, lineIdx) => {
              const lineNum = lineIdx + 1;
              const isHighlighted = highlightLines.includes(lineNum);

              return (
                <div
                  key={lineIdx}
                  className={`table-row ${
                    isHighlighted
                      ? "bg-electric/10 -mx-4 px-4 rounded border-l-2 border-electric"
                      : ""
                  }`}
                >
                  {showLineNumbers && (
                    <span className="table-cell pr-4 text-right select-none text-muted-foreground/30 dark:text-slate-600 w-8 text-xs align-top">
                      {lineNum}
                    </span>
                  )}
                  <span className="table-cell whitespace-pre">
                    {lineTokens.map((token, tokenIdx) => (
                      <TokenSpan key={tokenIdx} token={token} />
                    ))}
                    {/* Active Blinking Cursor on latest line */}
                    {!isCompleted && lineIdx === renderedLines.length - 1 && (
                      <span className="inline-block w-2 h-4 bg-electric animate-pulse ml-0.5 align-middle" />
                    )}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Subtle Bottom Accent Glow */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-electric/30 to-transparent" />
    </div>
  );
}
