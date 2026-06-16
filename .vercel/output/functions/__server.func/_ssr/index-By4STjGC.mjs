import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { A as ArrowUpRight, E as Earth, S as Smartphone, B as Boxes, a as Brain, C as Cloud, R as Rocket, D as Database, b as Server, c as CodeXml, d as Activity, e as Cpu, G as GitBranch, W as Workflow, Z as Zap, f as ShieldCheck, g as Sparkles, h as ChartLine } from "../_libs/lucide-react.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Nav() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#team", label: "Team" },
    { href: "#insights", label: "Notes" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl" : ""}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 ${scrolled ? "border-b border-white/5" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "flex items-center gap-2 font-display text-base font-semibold tracking-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Zeploy Tech Logo", className: "h-6 w-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-electric", children: "ZEPLOY" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "TECH" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-8 md:flex", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: l.href,
            className: "font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground",
            children: l.label
          },
          l.href
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "mailto:hello@zeploytech.com",
            className: "rounded-full border border-white/10 bg-surface/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-electric/50 hover:text-electric",
            children: "Start a project"
          }
        )
      ] })
    }
  );
}
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-electric-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-electric" }),
    children
  ] });
}
const services = [
  {
    icon: Earth,
    title: "Web Applications",
    desc: "High-performance web platforms engineered for scale, speed, and longevity.",
    caps: ["Next.js / React", "Edge-rendered SSR", "Type-safe APIs"]
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native-grade iOS and Android products built on a unified codebase.",
    caps: ["React Native", "Offline-first", "Push & background sync"]
  },
  {
    icon: Boxes,
    title: "SaaS Development",
    desc: "Multi-tenant SaaS platforms with billing, auth, and admin out of the box.",
    caps: ["Stripe billing", "RBAC + SSO", "Usage metering"]
  },
  {
    icon: Brain,
    title: "AI Systems & Automation",
    desc: "LLM pipelines, retrieval systems, and intelligent workflows in production.",
    caps: ["RAG architectures", "Agent workflows", "Eval & guardrails"]
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    desc: "AWS-native infrastructure, IaC, and CI/CD for zero-downtime deployment.",
    caps: ["AWS / GCP", "Terraform", "Kubernetes"]
  },
  {
    icon: Rocket,
    title: "Startup MVP Development",
    desc: "Ship a defensible v1 in weeks — architected to survive product-market fit.",
    caps: ["6–10 week scope", "Investor-ready", "Scales to v2"]
  }
];
function Services() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "services", className: "relative border-t border-white/5 px-6 py-32 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Services" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl", children: "Engineering across the full product surface." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground", children: "From the first commit to the millionth request — we design, build, and operate systems that scale with your business." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-2 lg:grid-cols-3", children: services.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        ...fadeUp,
        transition: { ...fadeUp.transition, delay: i * 0.04 },
        className: "group relative bg-background p-8 transition-colors hover:bg-surface/60",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-surface text-electric transition-all group-hover:border-electric/60 group-hover:glow-electric", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 text-xl font-semibold", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: s.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-1.5 font-mono text-xs text-electric-soft/80", children: s.caps.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-3 bg-electric/60" }),
            c
          ] }, c)) })
        ]
      },
      s.title
    )) })
  ] }) });
}
const stack = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js"],
  Backend: ["Node.js", "Express", "Python", "FastAPI"],
  Databases: ["MongoDB", "PostgreSQL", "Redis"],
  Cloud: ["AWS", "Docker", "Kubernetes", "Firebase"]
};
const stackIcons = {
  Frontend: CodeXml,
  Backend: Server,
  Databases: Database,
  Cloud
};
function TechStack() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative border-t border-white/5 px-6 py-32 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "flex flex-col items-start justify-between gap-6 md:flex-row md:items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Stack" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl", children: "The toolchain behind every shipped product." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "04 / DOMAINS · 16 / TECHNOLOGIES" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-6 md:grid-cols-2", children: Object.entries(stack).map(([category, items], idx) => {
      const Icon = stackIcons[category];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          ...fadeUp,
          transition: { ...fadeUp.transition, delay: idx * 0.05 },
          className: "glass-card glass-card-hover rounded-2xl p-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/5 pb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-electric" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: [
                  String(idx + 1).padStart(2, "0"),
                  " · ",
                  category
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-electric-soft", children: [
                items.length,
                " active"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: items.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "rounded-md border border-white/10 bg-surface/60 px-3 py-2 font-mono text-sm text-foreground transition-colors hover:border-electric/50 hover:text-electric",
                children: t
              },
              t
            )) })
          ]
        },
        category
      );
    }) })
  ] }) });
}
const work = [
  {
    name: "NeuralPay",
    kind: "SaaS · Billing Platform",
    desc: "High-performance billing engine processing thousands of subscription events per minute.",
    challenge: "Replace a brittle legacy billing layer with a programmable, audit-ready system.",
    architecture: "Event-sourced ledger · Postgres + Redis streams · Stripe orchestration",
    outcome: "62% reduction in failed renewals · 4x faster invoicing pipeline",
    tech: ["Next.js", "Node", "Postgres", "Redis", "Stripe"],
    metrics: [
      { k: "p95 latency", v: "84ms" },
      { k: "Uptime", v: "99.99%" },
      { k: "Events/min", v: "12.4K" }
    ]
  },
  {
    name: "Cortex Mesh",
    kind: "AI · Distributed Infrastructure",
    desc: "Distributed LLM inference fabric routing workloads across heterogeneous GPU pools.",
    challenge: "Serve mixed model sizes with predictable latency and cost.",
    architecture: "K8s scheduler · gRPC mesh · vLLM workers · Prometheus telemetry",
    outcome: "3.1x throughput per GPU · 47% lower cost-per-token",
    tech: ["Python", "FastAPI", "Kubernetes", "gRPC", "vLLM"],
    metrics: [
      { k: "Throughput", v: "3.1x" },
      { k: "Cost / token", v: "−47%" },
      { k: "Active nodes", v: "128" }
    ]
  },
  {
    name: "Synthwave",
    kind: "Analytics · Real-time Engine",
    desc: "Sub-second analytics over high-volume event streams powering live operator dashboards.",
    challenge: "Move from nightly batch to sub-second answers on billions of rows.",
    architecture: "Columnar store · Kafka ingest · Materialized rollups · WebSocket fanout",
    outcome: "Query times from 18s → 240ms · adopted org-wide in 6 weeks",
    tech: ["TypeScript", "Kafka", "ClickHouse", "React", "WebSocket"],
    metrics: [
      { k: "Query p50", v: "240ms" },
      { k: "Events/day", v: "1.2B" },
      { k: "Dashboards", v: "340+" }
    ]
  }
];
function FeaturedWork() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "work", className: "relative border-t border-white/5 px-6 py-32 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Featured Work" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl", children: "Systems running in production today." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 space-y-6", children: work.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.article,
      {
        ...fadeUp,
        transition: { ...fadeUp.transition, delay: i * 0.05 },
        className: "glass-card glass-card-hover overflow-hidden rounded-3xl",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 p-8 md:grid-cols-[1.2fr_1fr] md:p-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs uppercase tracking-widest text-electric", children: [
              String(i + 1).padStart(2, "0"),
              " · ",
              p.kind
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-3xl font-semibold md:text-4xl", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-muted-foreground", children: p.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-8 space-y-4 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-electric-soft", children: "Challenge" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground/90", children: p.challenge })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-electric-soft", children: "Architecture" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground/90", children: p.architecture })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-electric-soft", children: "Outcome" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground/90", children: p.outcome })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: p.tech.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "rounded-md border border-white/10 px-2.5 py-1 font-mono text-xs text-muted-foreground",
                children: t
              },
              t
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/5 pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] uppercase tracking-widest text-muted-foreground", children: [
                  p.name,
                  ".live"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5 text-electric" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-3 gap-4", children: p.metrics.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: m.k }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xl font-semibold text-foreground", children: m.v })
            ] }, m.k)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, {})
          ] })
        ] })
      },
      p.name
    )) })
  ] }) });
}
function Sparkline() {
  const points = [12, 18, 14, 22, 19, 28, 24, 34, 30, 42, 38, 48, 44, 56];
  const max = Math.max(...points);
  const path = points.map((v, i) => `${i / (points.length - 1) * 100},${100 - v / max * 90}`).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "h-24 w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "sg", x1: "0", x2: "0", y1: "0", y2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#3B82F6", stopOpacity: "0.45" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#3B82F6", stopOpacity: "0" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: path, fill: "none", stroke: "#3B82F6", strokeWidth: "1.2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: `0,100 ${path} 100,100`, fill: "url(#sg)" })
  ] }) });
}
const reasons = [
  { icon: Cpu, title: "Senior Engineers Only", desc: "No juniors hidden in the workflow. Every line shipped by engineers with production scars." },
  { icon: GitBranch, title: "Full Code Ownership", desc: "You own the repo, the infrastructure, and the IP — from day one." },
  { icon: Workflow, title: "Scalable Architecture", desc: "Designed for the system you'll have in two years, not just the demo today." },
  { icon: Zap, title: "Fast Communication", desc: "Direct Slack/Discord channels with the engineers writing your code." },
  { icon: Brain, title: "AI Expertise", desc: "Deep experience with LLMs, RAG, agents, and ML systems in production." },
  { icon: ShieldCheck, title: "Long-Term Support", desc: "We stay after launch — observability, scaling, and roadmap execution." }
];
function WhyChoose() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative border-t border-white/5 px-6 py-32 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Why Teams Choose Zeploy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl", children: "A studio, not a staffing agency." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: reasons.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        ...fadeUp,
        transition: { ...fadeUp.transition, delay: i * 0.04 },
        className: "glass-card glass-card-hover group relative overflow-hidden rounded-2xl p-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(r.icon, { className: "h-6 w-6 text-electric" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 text-lg font-semibold", children: r.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: r.desc })
        ]
      },
      r.title
    )) })
  ] }) });
}
function Reliability() {
  const bars = Array.from({ length: 40 }, () => 0.6 + Math.random() * 0.4);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative border-t border-white/5 px-6 py-32 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Reliability" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl", children: "Operations you can monitor in real time." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        ...fadeUp,
        className: "glass-card mt-12 overflow-hidden rounded-3xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-6 py-4 md:px-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative h-2 w-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-emerald-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 animate-ping rounded-full bg-emerald-400/70" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "ops.zeploy.live — all systems operational" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-electric-soft", children: "Last sync · just now" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-px bg-white/5 md:grid-cols-5", children: [
            { k: "Deployment Success", v: "99.7%", icon: Rocket },
            { k: "Infra Health", v: "Nominal", icon: Server },
            { k: "Client Satisfaction", v: "4.9 / 5", icon: Sparkles },
            { k: "Response Time", v: "< 2h", icon: Zap },
            { k: "Uptime (90d)", v: "99.99%", icon: ShieldCheck }
          ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(m.icon, { className: "h-4 w-4 text-electric" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground", children: m.k }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-semibold", children: m.v })
          ] }, m.k)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Request throughput · 24h" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 font-mono text-xs text-electric-soft", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLine, { className: "h-3.5 w-3.5" }),
                " +18.2%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex h-32 items-end gap-1.5", children: bars.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { height: `${b * 100}%` },
                className: "flex-1 rounded-sm bg-electric/30 transition-colors hover:bg-electric"
              },
              i
            )) })
          ] })
        ]
      }
    )
  ] }) });
}
const process = [
  { k: "Discovery", d: "Define scope, constraints, and the success metric we'll engineer toward." },
  { k: "Architecture", d: "System design, data model, and infrastructure decisions documented before code." },
  { k: "Development", d: "Two-week verticals shipped to staging with every PR reviewed by a senior engineer." },
  { k: "Testing", d: "Automated, load, and security tests baked into the pipeline — not bolted on at the end." },
  { k: "Deployment", d: "Zero-downtime rollout, blue/green or canary, observability live from day one." },
  { k: "Growth Support", d: "Ongoing optimization, scaling, and roadmap execution post-launch." }
];
function Process() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative border-t border-white/5 px-6 py-32 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Process" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl", children: "From signed contract to shipped system." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-0 h-full w-px bg-gradient-to-b from-electric/60 via-electric/20 to-transparent md:left-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12", children: process.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          ...fadeUp,
          transition: { ...fadeUp.transition, delay: i * 0.05 },
          className: `relative grid gap-6 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-12 md:pl-0 md:text-right md:pr-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-1 h-6 w-6 rounded-full border border-electric/60 bg-background md:left-auto md:right-[-13px] md:top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-1.5 rounded-full bg-electric" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs uppercase tracking-widest text-electric", children: [
                "Step ",
                String(i + 1).padStart(2, "0")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-2xl font-semibold", children: step.k })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-12 md:pl-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-muted-foreground", children: step.d }) })
          ]
        },
        step.k
      )) })
    ] })
  ] }) });
}
const team = [
  {
    name: "Syed Asjad Abbas",
    role: "CEO & Founder",
    skills: ["Frontend Development", "Product Strategy", "UI/UX Systems", "Brand Direction"],
    initials: "SA",
    image: "/src/assets/images/asjad.png"
  },
  {
    name: "Rana Asad Ur Rehman",
    role: "Co-Founder & Full Stack Developer",
    skills: ["Backend Systems", "API Development", "Database Architecture"],
    initials: "RA",
    image: "/src/assets/images/asad.jpeg"
  },
  {
    name: "Ahsan Rashid",
    role: "CTO & AI Automation Engineer",
    skills: ["AI Automation", "Intelligent Workflows", "Automation Infrastructure"],
    initials: "AR",
    image: "/src/assets/images/ahsan.jpeg"
  },
  {
    name: "Hassan Kazmi",
    role: "Managing Partner · Data & Intelligence Lead",
    skills: ["Data Systems", "Research Intelligence", "Analytical Strategy"],
    initials: "HK",
    image: "/src/assets/images/hassan.jpeg"
  }
];
function Team() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "team", className: "relative border-t border-white/5 px-6 py-32 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Leadership" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl", children: "The engineers behind the studio." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-6 md:grid-cols-2", children: team.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        ...fadeUp,
        transition: { ...fadeUp.transition, delay: i * 0.05 },
        className: "glass-card glass-card-hover relative overflow-hidden rounded-2xl p-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-electric/15 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group/avatar grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-electric/40 bg-surface transition-colors duration-300 hover:border-electric/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: m.image, alt: m.name, className: "h-full w-full object-cover grayscale transition-all duration-300 group-hover/avatar:scale-110 group-hover/avatar:grayscale-0" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold", children: m.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-xs uppercase tracking-widest text-electric-soft", children: m.role })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-2 sm:grid-cols-2", children: m.skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 rounded-md border border-white/5 bg-surface/40 px-3 py-2 text-xs text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-electric" }),
                s
              ]
            },
            s
          )) })
        ]
      },
      m.name
    )) })
  ] }) });
}
const testimonials = [
  {
    q: "Zeploy rebuilt our billing core in 11 weeks. It's been running clean for a year with zero engineering intervention from our side.",
    a: "Director of Engineering · Series B Fintech"
  },
  {
    q: "They architected an AI pipeline we couldn't have shipped internally in under a year. We had it in production in 9 weeks.",
    a: "Co-Founder · AI Infrastructure Startup"
  },
  {
    q: "Code quality and architecture you'd expect from a top-tier in-house team. We extended the contract three times.",
    a: "VP Product · Enterprise SaaS"
  }
];
function Testimonials() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative border-t border-white/5 px-6 py-32 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Testimonials" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl", children: "Trusted by teams shipping at scale." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-6 md:grid-cols-3", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.figure,
      {
        ...fadeUp,
        transition: { ...fadeUp.transition, delay: i * 0.05 },
        className: "glass-card rounded-2xl p-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-base leading-relaxed text-foreground/90", children: [
            '"',
            t.q,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "mt-6 border-t border-white/5 pt-5 font-mono text-xs uppercase tracking-widest text-electric-soft", children: t.a })
        ]
      },
      i
    )) })
  ] }) });
}
const posts = [
  {
    tag: "AI Systems",
    title: "Designing retrieval pipelines that survive production traffic",
    read: "8 min read"
  },
  {
    tag: "Architecture",
    title: "Event-sourced billing: why your ledger should be append-only",
    read: "12 min read"
  },
  {
    tag: "Cloud",
    title: "Zero-downtime Kubernetes rollouts without the operational tax",
    read: "10 min read"
  }
];
function Blog() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "insights", className: "relative border-t border-white/5 px-6 py-32 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Engineering Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl", children: "Field notes from production systems." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-3", children: posts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.a,
      {
        href: "#",
        ...fadeUp,
        transition: { ...fadeUp.transition, delay: i * 0.05 },
        className: "group bg-background p-8 transition-colors hover:bg-surface/60",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] uppercase tracking-widest text-electric", children: p.tag }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-12 text-xl font-semibold leading-snug text-foreground group-hover:text-electric-soft", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 font-mono text-xs text-muted-foreground", children: p.read })
        ]
      },
      p.title
    )) })
  ] }) });
}
function CTA() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative border-t border-white/5 px-6 py-32 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ...fadeUp,
      className: "glass-card relative overflow-hidden rounded-3xl p-12 text-center md:p-20",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/src/assets/images/banner.png", alt: "Zeploy Banner", className: "h-full w-full object-cover opacity-20 mix-blend-screen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/90" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-30" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Start a project" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-6xl", children: "Let's deploy your vision." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-xl text-lg text-muted-foreground", children: "Tell us what you're building. We'll come back with an architecture, a timeline, and a senior engineer on the call." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "mailto:hello@zeploytech.com",
                className: "group inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:glow-electric",
                children: [
                  "Start a conversation",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#work",
                className: "rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-electric/50 hover:text-electric",
                children: "View our work"
              }
            )
          ] })
        ] })
      ]
    }
  ) }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-white/5 px-6 py-20 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 font-display text-xl font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Zeploy Tech Logo", className: "h-7 w-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-electric", children: "ZEPLOY" }),
            " TECH"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xs text-sm text-muted-foreground", children: "Software engineering & AI studio building scalable systems for modern teams." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex gap-3 font-mono text-xs", children: ["GitHub", "LinkedIn", "X", "Dribbble"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#",
            className: "rounded-md border border-white/10 px-2.5 py-1 text-muted-foreground transition-colors hover:border-electric/50 hover:text-electric",
            children: s
          },
          s
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FooterCol,
        {
          title: "Services",
          items: ["Web Applications", "Mobile Apps", "SaaS Development", "AI Systems", "Cloud Solutions", "MVP Development"]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FooterCol,
        {
          title: "Studio",
          items: ["Work", "Process", "Team", "Engineering Notes", "Careers"]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-foreground", children: "hello@zeploytech.com" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-muted-foreground", children: "Lahore, Pakistan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-muted-foreground", children: "Working with teams in 6 countries" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 font-mono text-xs text-muted-foreground md:flex-row md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Zeploy Tech. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We Deploy Your Vision." })
    ] })
  ] }) });
}
function FooterCol({ title, items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-3 text-sm", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-foreground/90 transition-colors hover:text-electric", children: i }) }, i)) })
  ] });
}
const HeroScene = reactExports.lazy(() => import("./HeroScene-Dsi8BrZJ.mjs"));
function ClientHeroScene() {
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
  if (!mounted) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full rounded-3xl bg-surface/30" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full rounded-3xl bg-surface/30" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroScene, {}) });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative min-h-screen overflow-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Services, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TechStack, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedWork, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhyChoose, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reliability, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Process, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Team, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Blog, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTA, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-screen overflow-hidden pt-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-1/3 -z-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-electric/20 blur-[160px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-12 md:px-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6
        }, className: "inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-surface/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-electric-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative h-1.5 w-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-electric" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 animate-ping rounded-full bg-electric/70" })
          ] }),
          "Software Engineering · AI Solutions"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 24
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          delay: 0.05
        }, className: "mt-8 font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-soft", children: "We build software" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-soft", children: "that scales your" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-electric", children: "business." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          delay: 0.15
        }, className: "mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground", children: "Zeploy Tech is a software engineering studio delivering custom web apps, mobile apps, AI systems, cloud infrastructure, and scalable digital products." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          delay: 0.25
        }, className: "mt-10 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#work", className: "group inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:glow-electric", children: [
            "View our work",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:hello@zeploytech.com", className: "rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-electric/50 hover:text-electric", children: "Start a project" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          delay: 0.35
        }, className: "mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/5 pt-8", children: [{
          v: "50+",
          k: "Projects"
        }, {
          v: "30+",
          k: "Clients"
        }, {
          v: "6",
          k: "Countries"
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-semibold text-foreground md:text-4xl", children: s.v }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground", children: s.k })
        ] }, s.k)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[420px] w-full sm:h-[520px] lg:h-[640px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientHeroScene, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.6,
          duration: 0.6
        }, className: "absolute left-4 top-8 glass-card rounded-xl px-4 py-3 font-mono text-[11px] uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "node · us-east-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-electric-soft", children: "p95 84ms · 12.4K rps" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: -10
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.8,
          duration: 0.6
        }, className: "absolute bottom-10 right-2 glass-card rounded-xl px-4 py-3 font-mono text-[11px] uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "deploy · build #1847" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-electric-soft", children: "✓ shipped · 1m 12s" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 border-y border-white/5 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Trusted execution · Senior engineering · Production-grade" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-electric-soft", children: "Lahore · Remote · Globally distributed" })
    ] }) })
  ] });
}
export {
  Index as component
};
