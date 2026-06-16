import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Boxes,
  Brain,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe2,
  LineChart,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-electric-soft">
      <span className="h-1.5 w-1.5 rounded-full bg-electric" />
      {children}
    </div>
  );
}

/* ---------- SERVICES ---------- */
const services = [
  {
    icon: Globe2,
    title: "Web Applications",
    desc: "High-performance web platforms engineered for scale, speed, and longevity.",
    caps: ["Next.js / React", "Edge-rendered SSR", "Type-safe APIs"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native-grade iOS and Android products built on a unified codebase.",
    caps: ["React Native", "Offline-first", "Push & background sync"],
  },
  {
    icon: Boxes,
    title: "SaaS Development",
    desc: "Multi-tenant SaaS platforms with billing, auth, and admin out of the box.",
    caps: ["Stripe billing", "RBAC + SSO", "Usage metering"],
  },
  {
    icon: Brain,
    title: "AI Systems & Automation",
    desc: "LLM pipelines, retrieval systems, and intelligent workflows in production.",
    caps: ["RAG architectures", "Agent workflows", "Eval & guardrails"],
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    desc: "AWS-native infrastructure, IaC, and CI/CD for zero-downtime deployment.",
    caps: ["AWS / GCP", "Terraform", "Kubernetes"],
  },
  {
    icon: Rocket,
    title: "Startup MVP Development",
    desc: "Ship a defensible v1 in weeks — architected to survive product-market fit.",
    caps: ["6–10 week scope", "Investor-ready", "Scales to v2"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="max-w-2xl">
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl">
            Engineering across the full product surface.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            From the first commit to the millionth request — we design, build, and operate systems
            that scale with your business.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="group relative bg-background p-8 transition-colors hover:bg-surface/60"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-surface text-electric transition-all group-hover:border-electric/60 group-hover:glow-electric">
                  <s.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <ul className="mt-6 space-y-1.5 font-mono text-xs text-electric-soft/80">
                {s.caps.map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="h-px w-3 bg-electric/60" />
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TECH STACK ---------- */
const stack = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js"],
  Backend: ["Node.js", "Express", "Python", "FastAPI"],
  Databases: ["MongoDB", "PostgreSQL", "Redis"],
  Cloud: ["AWS", "Docker", "Kubernetes", "Firebase"],
};
const stackIcons: Record<string, typeof Code2> = {
  Frontend: Code2,
  Backend: Server,
  Databases: Database,
  Cloud: Cloud,
};

export function TechStack() {
  return (
    <section className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel>Stack</SectionLabel>
            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl">
              The toolchain behind every shipped product.
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            04 / DOMAINS · 16 / TECHNOLOGIES
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {Object.entries(stack).map(([category, items], idx) => {
            const Icon = stackIcons[category];
            return (
              <motion.div
                key={category}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: idx * 0.05 }}
                className="glass-card glass-card-hover rounded-2xl p-8"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-5">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-electric" />
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {String(idx + 1).padStart(2, "0")} · {category}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-electric-soft">{items.length} active</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {items.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-surface/60 px-3 py-2 font-mono text-sm text-foreground transition-colors hover:border-electric/50 hover:text-electric"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURED WORK ---------- */
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
      { k: "Events/min", v: "12.4K" },
    ],
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
      { k: "Active nodes", v: "128" },
    ],
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
      { k: "Dashboards", v: "340+" },
    ],
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="max-w-2xl">
          <SectionLabel>Featured Work</SectionLabel>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl">
            Systems running in production today.
          </h2>
        </motion.div>

        <div className="mt-16 space-y-6">
          {work.map((p, i) => (
            <motion.article
              key={p.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="glass-card glass-card-hover overflow-hidden rounded-3xl"
            >
              <div className="grid gap-10 p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-electric">
                    {String(i + 1).padStart(2, "0")} · {p.kind}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold md:text-4xl">{p.name}</h3>
                  <p className="mt-3 max-w-xl text-muted-foreground">{p.desc}</p>

                  <dl className="mt-8 space-y-4 text-sm">
                    <div className="flex gap-6">
                      <dt className="w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-electric-soft">
                        Challenge
                      </dt>
                      <dd className="text-foreground/90">{p.challenge}</dd>
                    </div>
                    <div className="flex gap-6">
                      <dt className="w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-electric-soft">
                        Architecture
                      </dt>
                      <dd className="text-foreground/90">{p.architecture}</dd>
                    </div>
                    <div className="flex gap-6">
                      <dt className="w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-electric-soft">
                        Outcome
                      </dt>
                      <dd className="text-foreground/90">{p.outcome}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dashboard preview */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/60 p-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                        {p.name}.live
                      </span>
                    </div>
                    <Activity className="h-3.5 w-3.5 text-electric" />
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {p.metrics.map((m) => (
                      <div key={m.k}>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {m.k}
                        </p>
                        <p className="mt-1 text-xl font-semibold text-foreground">{m.v}</p>
                      </div>
                    ))}
                  </div>
                  <Sparkline />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sparkline() {
  const points = [12, 18, 14, 22, 19, 28, 24, 34, 30, 42, 38, 48, 44, 56];
  const max = Math.max(...points);
  const path = points
    .map((v, i) => `${(i / (points.length - 1)) * 100},${100 - (v / max) * 90}`)
    .join(" ");
  return (
    <div className="mt-6">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-24 w-full">
        <defs>
          <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={path} fill="none" stroke="#3B82F6" strokeWidth="1.2" />
        <polygon points={`0,100 ${path} 100,100`} fill="url(#sg)" />
      </svg>
    </div>
  );
}

/* ---------- WHY CHOOSE ---------- */
const reasons = [
  { icon: Cpu, title: "Senior Engineers Only", desc: "No juniors hidden in the workflow. Every line shipped by engineers with production scars." },
  { icon: GitBranch, title: "Full Code Ownership", desc: "You own the repo, the infrastructure, and the IP — from day one." },
  { icon: Workflow, title: "Scalable Architecture", desc: "Designed for the system you'll have in two years, not just the demo today." },
  { icon: Zap, title: "Fast Communication", desc: "Direct Slack/Discord channels with the engineers writing your code." },
  { icon: Brain, title: "AI Expertise", desc: "Deep experience with LLMs, RAG, agents, and ML systems in production." },
  { icon: ShieldCheck, title: "Long-Term Support", desc: "We stay after launch — observability, scaling, and roadmap execution." },
];

export function WhyChoose() {
  return (
    <section className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="max-w-2xl">
          <SectionLabel>Why Teams Choose Zeploy</SectionLabel>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl">
            A studio, not a staffing agency.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="glass-card glass-card-hover group relative overflow-hidden rounded-2xl p-8"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
              <r.icon className="h-6 w-6 text-electric" />
              <h3 className="mt-6 text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- RELIABILITY DASHBOARD ---------- */
export function Reliability() {
  const bars = Array.from({ length: 40 }, () => 0.6 + Math.random() * 0.4);
  return (
    <section className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="max-w-2xl">
          <SectionLabel>Reliability</SectionLabel>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl">
            Operations you can monitor in real time.
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="glass-card mt-12 overflow-hidden rounded-3xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-6 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <span className="relative h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400" />
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                ops.zeploy.live — all systems operational
              </span>
            </div>
            <span className="font-mono text-xs text-electric-soft">Last sync · just now</span>
          </div>

          <div className="grid gap-px bg-white/5 md:grid-cols-5">
            {[
              { k: "Deployment Success", v: "99.7%", icon: Rocket },
              { k: "Infra Health", v: "Nominal", icon: Server },
              { k: "Client Satisfaction", v: "4.9 / 5", icon: Sparkles },
              { k: "Response Time", v: "< 2h", icon: Zap },
              { k: "Uptime (90d)", v: "99.99%", icon: ShieldCheck },
            ].map((m) => (
              <div key={m.k} className="bg-background p-6">
                <m.icon className="h-4 w-4 text-electric" />
                <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {m.k}
                </p>
                <p className="mt-1 text-2xl font-semibold">{m.v}</p>
              </div>
            ))}
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Request throughput · 24h
              </p>
              <p className="flex items-center gap-2 font-mono text-xs text-electric-soft">
                <LineChart className="h-3.5 w-3.5" /> +18.2%
              </p>
            </div>
            <div className="mt-5 flex h-32 items-end gap-1.5">
              {bars.map((b, i) => (
                <div
                  key={i}
                  style={{ height: `${b * 100}%` }}
                  className="flex-1 rounded-sm bg-electric/30 transition-colors hover:bg-electric"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
const process = [
  { k: "Discovery", d: "Define scope, constraints, and the success metric we'll engineer toward." },
  { k: "Architecture", d: "System design, data model, and infrastructure decisions documented before code." },
  { k: "Development", d: "Two-week verticals shipped to staging with every PR reviewed by a senior engineer." },
  { k: "Testing", d: "Automated, load, and security tests baked into the pipeline — not bolted on at the end." },
  { k: "Deployment", d: "Zero-downtime rollout, blue/green or canary, observability live from day one." },
  { k: "Growth Support", d: "Ongoing optimization, scaling, and roadmap execution post-launch." },
];

export function Process() {
  return (
    <section className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="max-w-2xl">
          <SectionLabel>Process</SectionLabel>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl">
            From signed contract to shipped system.
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-electric/60 via-electric/20 to-transparent md:left-1/2" />
          <div className="space-y-12">
            {process.map((step, i) => (
              <motion.div
                key={step.k}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className={`relative grid gap-6 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative pl-12 md:pl-0 md:text-right md:pr-12">
                  <span className="absolute left-0 top-1 h-6 w-6 rounded-full border border-electric/60 bg-background md:left-auto md:right-[-13px] md:top-2">
                    <span className="absolute inset-1.5 rounded-full bg-electric" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-widest text-electric">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{step.k}</h3>
                </div>
                <div className="pl-12 md:pl-12">
                  <p className="max-w-md text-muted-foreground">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- TEAM ---------- */
const team = [
  {
    name: "Syed Asjad Abbas",
    role: "CEO & Founder",
    skills: ["Frontend Development", "Product Strategy", "UI/UX Systems", "Brand Direction"],
    initials: "SA",
    image: "/src/assets/images/asjad.png",
  },
  {
    name: "Rana Asad Ur Rehman",
    role: "Co-Founder & Full Stack Developer",
    skills: ["Backend Systems", "API Development", "Database Architecture"],
    initials: "RA",
    image: "/src/assets/images/asad.jpeg",
  },
  {
    name: "Ahsan Rashid",
    role: "CTO & AI Automation Engineer",
    skills: ["AI Automation", "Intelligent Workflows", "Automation Infrastructure"],
    initials: "AR",
    image: "/src/assets/images/ahsan.jpeg",
  },
  {
    name: "Hassan Kazmi",
    role: "Managing Partner · Data & Intelligence Lead",
    skills: ["Data Systems", "Research Intelligence", "Analytical Strategy"],
    initials: "HK",
    image: "/src/assets/images/hassan.jpeg",
  },
];

export function Team() {
  return (
    <section id="team" className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="max-w-2xl">
          <SectionLabel>Leadership</SectionLabel>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl">
            The engineers behind the studio.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="glass-card glass-card-hover relative overflow-hidden rounded-2xl p-8"
            >
              <div className="absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-electric/15 blur-3xl" />
              <div className="flex items-start gap-5">
                <div className="group/avatar grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-electric/40 bg-surface transition-colors duration-300 hover:border-electric/80">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover grayscale transition-all duration-300 group-hover/avatar:scale-110 group-hover/avatar:grayscale-0" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold">{m.name}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-electric-soft">
                    {m.role}
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-2 sm:grid-cols-2">
                {m.skills.map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 rounded-md border border-white/5 bg-surface/40 px-3 py-2 text-xs text-muted-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-electric" />
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
const testimonials = [
  {
    q: "Zeploy rebuilt our billing core in 11 weeks. It's been running clean for a year with zero engineering intervention from our side.",
    a: "Director of Engineering · Series B Fintech",
  },
  {
    q: "They architected an AI pipeline we couldn't have shipped internally in under a year. We had it in production in 9 weeks.",
    a: "Co-Founder · AI Infrastructure Startup",
  },
  {
    q: "Code quality and architecture you'd expect from a top-tier in-house team. We extended the contract three times.",
    a: "VP Product · Enterprise SaaS",
  },
];

export function Testimonials() {
  return (
    <section className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="max-w-2xl">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl">
            Trusted by teams shipping at scale.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="glass-card rounded-2xl p-8"
            >
              <blockquote className="text-base leading-relaxed text-foreground/90">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-6 border-t border-white/5 pt-5 font-mono text-xs uppercase tracking-widest text-electric-soft">
                {t.a}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BLOG ---------- */
const posts = [
  {
    tag: "AI Systems",
    title: "Designing retrieval pipelines that survive production traffic",
    read: "8 min read",
  },
  {
    tag: "Architecture",
    title: "Event-sourced billing: why your ledger should be append-only",
    read: "12 min read",
  },
  {
    tag: "Cloud",
    title: "Zero-downtime Kubernetes rollouts without the operational tax",
    read: "10 min read",
  },
];

export function Blog() {
  return (
    <section id="insights" className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="max-w-2xl">
          <SectionLabel>Engineering Notes</SectionLabel>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-5xl">
            Field notes from production systems.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.a
              href="#"
              key={p.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="group bg-background p-8 transition-colors hover:bg-surface/60"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-electric">
                  {p.tag}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" />
              </div>
              <h3 className="mt-12 text-xl font-semibold leading-snug text-foreground group-hover:text-electric-soft">
                {p.title}
              </h3>
              <p className="mt-6 font-mono text-xs text-muted-foreground">{p.read}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA + FOOTER ---------- */
export function CTA() {
  return (
    <section className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          {...fadeUp}
          className="glass-card relative overflow-hidden rounded-3xl p-12 text-center md:p-20"
        >
          <div className="absolute inset-0 z-0">
            <img src="/src/assets/images/banner.png" alt="Zeploy Banner" className="h-full w-full object-cover opacity-20 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/90" />
            <div className="absolute inset-0 grid-bg opacity-30" />
          </div>
          <div className="relative z-10">
            <SectionLabel>Start a project</SectionLabel>
            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] text-gradient-soft md:text-6xl">
              Let's deploy your vision.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Tell us what you're building. We'll come back with an architecture, a timeline, and a
              senior engineer on the call.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:hello@zeploytech.com"
                className="group inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:glow-electric"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#work"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-electric/50 hover:text-electric"
              >
                View our work
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 font-display text-xl font-semibold">
              <img src="/logo.png" alt="Zeploy Tech Logo" className="h-7 w-auto" />
              <span><span className="text-electric">ZEPLOY</span> TECH</span>
            </p>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Software engineering & AI studio building scalable systems for modern teams.
            </p>
            <div className="mt-6 flex gap-3 font-mono text-xs">
              {["GitHub", "LinkedIn", "X", "Dribbble"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-md border border-white/10 px-2.5 py-1 text-muted-foreground transition-colors hover:border-electric/50 hover:text-electric"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          <FooterCol
            title="Services"
            items={["Web Applications", "Mobile Apps", "SaaS Development", "AI Systems", "Cloud Solutions", "MVP Development"]}
          />
          <FooterCol
            title="Studio"
            items={["Work", "Process", "Team", "Engineering Notes", "Careers"]}
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="text-foreground">hello@zeploytech.com</li>
              <li className="text-muted-foreground">Lahore, Pakistan</li>
              <li className="text-muted-foreground">Working with teams in 6 countries</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 font-mono text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Zeploy Tech. All rights reserved.</p>
          <p>We Deploy Your Vision.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="text-foreground/90 transition-colors hover:text-electric">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
