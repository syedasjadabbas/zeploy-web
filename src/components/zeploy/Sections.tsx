import { motion, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
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
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Mail,
} from "lucide-react";
import { DataStreams, NetworkNodes, BlueprintGrid } from "./BackgroundScenes";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex flex-col items-center gap-3">
      <span className="font-mono text-sm uppercase tracking-[0.25em] font-medium text-electric">
        {children}
      </span>
      <span className="h-px w-8 bg-electric/60" />
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
      <DataStreams />
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold tracking-tight leading-[1.05] text-gradient-soft md:text-6xl lg:text-7xl">
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
              className="group relative bg-background p-10 transition-colors hover:bg-surface/60 md:p-12"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-surface text-electric transition-all group-hover:border-electric/60 group-hover:glow-electric">
                  <s.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" />
              </div>
              <h3 className="mt-8 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.desc}</p>
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
    <section id="stack" className="relative border-t border-white/5 px-6 py-32 md:px-12 overflow-hidden">
      <NetworkNodes />
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div {...fadeUp} className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel>Stack</SectionLabel>
            <h2 className="mt-6 text-5xl font-bold tracking-tight leading-[1.05] text-gradient-soft md:text-6xl lg:text-7xl">
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
                className="glass-card glass-card-hover rounded-3xl p-10 md:p-12"
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
    name: "MockAI",
    kind: "AI Interview Evaluation Platform",
    desc: "AI-powered mock interview platform that evaluates candidates using speech analysis, facial expression analysis, NLP, confidence scoring, and performance analytics.",
    tech: ["React", "FastAPI", "Python", "MongoDB Atlas", "BERT NLP", "DeepFace"],
    features: [
      "AI interview scoring",
      "Facial emotion analysis",
      "Speech-to-text processing",
      "Confidence tracking",
      "Performance reports"
    ],
    image: "/projects/mockai.png"
  },
  {
    name: "EduCart",
    kind: "Full Stack E-Commerce Platform",
    desc: "Modern e-commerce platform designed for students with authentication, product management, SEO optimization, AI-powered assistance, cart management, and order tracking.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "Tailwind"],
    features: [
      "Admin dashboard",
      "Product management",
      "Shopping cart",
      "Order tracking",
      "SEO automation",
      "AI assistant"
    ],
    image: "/projects/educart.png"
  },
  {
    name: "NeuralPay",
    kind: "SaaS · Billing Platform",
    desc: "A high-performance programmable billing engine built to process thousands of subscription events per minute with flawless accuracy, reducing failed renewals by 62%.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe"],
    features: ["Idempotent Webhooks", "Real-time Metrics", "Dynamic Proration", "Automated Dunning"],
    image: "/projects/neuralpay.png"
  },
  {
    name: "Cortex Mesh",
    kind: "AI · Distributed Infrastructure",
    desc: "A distributed LLM inference fabric that intelligently routes workloads across a heterogeneous cluster of GPUs, maximizing throughput and reducing cost-per-token.",
    tech: ["Python", "FastAPI", "Kubernetes", "gRPC", "vLLM"],
    features: ["Dynamic Batching", "Cost-aware Routing", "Auto-scaling Pools", "Model Caching"],
    image: "/projects/cortex.png"
  },
  {
    name: "Synthwave",
    kind: "Analytics · Real-time Engine",
    desc: "A sub-second analytics engine ingesting high-volume event streams to power live operational dashboards and anomaly detection for enterprise organizations.",
    tech: ["TypeScript", "Kafka", "ClickHouse", "React", "WebSocket"],
    features: ["Live Geographic Maps", "Anomaly Detection", "Custom Aggregations", "Role-based Access"],
    image: "/projects/synthwave.png"
  }
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative border-t border-white/5 px-6 py-32 md:px-12 bg-background">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Case Studies</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold tracking-tight leading-[1.05] text-gradient-soft md:text-6xl lg:text-7xl">
            Representative product concepts demonstrating Zeploy's engineering capabilities.
          </h2>
        </motion.div>

        <div className="mt-24 space-y-24">
          {work.map((p, i) => (
            <motion.article
              key={p.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="group glass-card overflow-hidden rounded-[2.5rem]"
            >
              <div className="grid lg:grid-cols-2">
                <div className={`p-10 md:p-16 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-electric animate-pulse" />
                    <p className="font-mono text-xs uppercase tracking-widest text-electric">
                      {p.kind}
                    </p>
                  </div>
                  <h3 className="mt-6 text-4xl font-semibold md:text-5xl">{p.name}</h3>

                  <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>

                  <div className="mt-10">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-electric-soft mb-4">Key Features</p>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {p.features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-sm text-foreground/90">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-electric-soft mb-4">Technology Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-electric/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`relative border-white/5 bg-surface/30 overflow-hidden min-h-[400px] ${i % 2 === 1 ? 'lg:border-r lg:order-1' : 'border-l'}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10 pointer-events-none" />
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
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
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Why Teams Choose Zeploy</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold tracking-tight leading-[1.05] text-gradient-soft md:text-6xl lg:text-7xl">
            A studio, not a staffing agency.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="glass-card glass-card-hover group relative overflow-hidden rounded-3xl p-10 md:p-12"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
              <r.icon className="h-8 w-8 text-electric" />
              <h3 className="mt-8 text-2xl font-semibold">{r.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- RELIABILITY DASHBOARD ---------- */
export function AnimatedDecimalCounter({ from, to, duration, prefix = "", suffix = "", decimals = 0 }: { from: number; to: number; duration: number; prefix?: string; suffix?: string; decimals?: number; }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}{from.toFixed(decimals)}{suffix}</span>;
}

export function Reliability() {
  const bars = Array.from({ length: 40 }, () => 0.6 + Math.random() * 0.4);
  return (
    <section id="reliability" className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Reliability</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold tracking-tight leading-[1.05] text-gradient-soft md:text-6xl lg:text-7xl">
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
              { k: "Deployment Success", v: <AnimatedDecimalCounter from={0} to={99.7} decimals={1} suffix="%" duration={2} />, icon: Rocket },
              { k: "Infra Health", v: "Nominal", icon: Server },
              { k: "Client Satisfaction", v: <AnimatedDecimalCounter from={0} to={4.9} decimals={1} suffix=" / 5" duration={2} />, icon: Sparkles },
              { k: "Response Time", v: <AnimatedDecimalCounter from={0} to={2} decimals={0} prefix="< " suffix="h" duration={2} />, icon: Zap },
              { k: "Uptime (90d)", v: <AnimatedDecimalCounter from={0} to={99.99} decimals={2} suffix="%" duration={2} />, icon: ShieldCheck },
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
    <section className="relative border-t border-white/5 px-6 py-32 md:px-12 overflow-hidden">
      <BlueprintGrid />
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Process</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold tracking-tight leading-[1.05] text-gradient-soft md:text-6xl lg:text-7xl">
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
    skills: ["Chief Architect", "System Architecture", "Cloud Infrastructure", "Engineering Strategy"],
    initials: "SA",
    image: "/src/assets/images/asjad.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/syed-asjad-abbas/",
      github: "https://github.com/syedasjadabbas"
    }
  },
  {
    name: "Rana Asad Ur Rehman",
    role: "Co-Founder & Full Stack Developer",
    skills: ["Backend Systems", "API Development", "Database Architecture"],
    initials: "RA",
    image: "/src/assets/images/asad.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/rana-asad-ur-rahman-0a2457339/",
      github: "https://github.com/asad-rana306"
    }
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
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Leadership</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold tracking-tight leading-[1.05] text-gradient-soft md:text-6xl lg:text-7xl">
            The engineers behind the studio.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="glass-card glass-card-hover relative overflow-hidden rounded-3xl p-10"
            >
              <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-electric/15 blur-[100px] transition-all duration-500 group-hover:bg-electric/25" />
              <div className="flex flex-col gap-6">
                <div className="group/avatar relative aspect-[4/5] w-[85%] mx-auto p-3 rounded-2xl border border-electric/20 bg-surface/40 transition-all duration-300 hover:border-electric/50 hover:bg-surface/60">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-background">
                    <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover/avatar:scale-[1.03]" />
                    
                    {/* Social Icons on Hover */}
                    {m.socials && (
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/avatar:opacity-100 flex items-end justify-center pb-6 gap-4">
                        {m.socials.linkedin && (
                          <a href={m.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} LinkedIn`} className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {m.socials.github && (
                          <a href={m.socials.github} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} GitHub`} className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="min-w-0 px-2 transition-transform duration-300 group-hover:translate-x-1 text-center mt-2">
                  <h3 className="text-2xl font-semibold">{m.name}</h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-electric-soft">
                    {m.role}
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-2 sm:grid-cols-2 px-2">
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
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold tracking-tight leading-[1.05] text-gradient-soft md:text-6xl lg:text-7xl">
            Trusted by teams shipping at scale.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="glass-card rounded-3xl p-10 md:p-12"
            >
              <blockquote className="text-lg leading-relaxed text-foreground/90">
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
    category: "Architecture",
    date: "Aug 12, 2023",
    title: "Why we abandoned microservices for a modular monolith",
    description: "A deep dive into our infrastructure rewrite that reduced AWS costs by 40% and improved developer velocity.",
    slug: "abandoned-microservices",
  },
  {
    category: "AI Systems",
    date: "Sep 28, 2023",
    title: "Scaling LLM inference in production",
    description: "Techniques for managing latency, token streaming, and cost when deploying large language models to thousands of users.",
    slug: "scaling-llm-inference",
  },
  {
    category: "Performance",
    date: "Nov 04, 2023",
    title: "Achieving 99.99% uptime with global edge networks",
    description: "How we architected a multi-region failover system that survived two major cloud provider outages.",
    slug: "edge-networks-uptime",
  },
];

export function Blog() {
  return (
    <section id="insights" className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Engineering Notes</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold tracking-tight leading-[1.05] text-gradient-soft md:text-6xl lg:text-7xl">
            Field notes from production systems.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.a
              href={`/notes/${p.slug}`}
              key={p.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="group bg-background p-10 transition-colors hover:bg-surface/60 md:p-12"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-electric">
                  {p.tag}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" />
              </div>
              <h3 className="mt-12 text-2xl font-semibold leading-snug text-foreground group-hover:text-electric-soft">
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
export function ProjectInquiry() {
  return (
    <section id="contact" className="relative border-t border-white/5 px-6 py-32 md:px-12 bg-surface-2/30">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 lg:gap-24">
        <motion.div {...fadeUp}>
          <SectionLabel>Project Inquiry</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold tracking-tight leading-[1.05] text-gradient-soft md:text-6xl lg:text-7xl">
            Let's architect your next platform.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Fill out the details of your project. Whether you have a complete technical specification or just a feature list, we'll review it and get back to you with an architecture proposal and timeline within 24 hours.
          </p>
          
          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-electric/40 bg-surface text-electric">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground">Technical Discovery</h4>
                <p className="mt-1 text-sm text-muted-foreground">We dive deep into your architecture requirements.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-electric/40 bg-surface text-electric">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground">Rapid Prototyping</h4>
                <p className="mt-1 text-sm text-muted-foreground">Clear milestones, wireframes, and scalable design.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="glass-card rounded-[2.5rem] p-8 md:p-12">
          <form className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Full Name</label>
                <input type="text" placeholder="Full Name" className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email</label>
                <input type="email" placeholder="Email Address" className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Company</label>
              <input type="text" placeholder="Company Name" className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Budget Range</label>
                <select className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors appearance-none">
                  <option value="">Select a range</option>
                  <option value="10k-25k">$10k - $25k</option>
                  <option value="25k-50k">$25k - $50k</option>
                  <option value="50k-100k">$50k - $100k</option>
                  <option value="100k+">$100k+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project Type</label>
                <select className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors appearance-none">
                  <option value="">Select a type</option>
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile Application</option>
                  <option value="ai">AI System / Automation</option>
                  <option value="saas">SaaS Development</option>
                  <option value="cloud">Cloud Infrastructure</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project Description</label>
              <textarea rows={4} placeholder="Describe your project..." className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors resize-none" />
            </div>

            <button type="button" onClick={(e) => e.preventDefault()} className="mt-4 w-full rounded-xl bg-electric px-6 py-4 text-sm font-semibold text-primary-foreground transition-all hover:glow-electric hover:scale-[1.02]">
              Submit Request
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function FooterLink({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <li>
      <a href={href} className="text-muted-foreground hover:text-electric transition-colors" {...props}>
        {children}
      </a>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background pt-32 pb-12 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-5 border-b border-white/5 pb-20">
          <div className="lg:col-span-2">
            <div className="flex flex-col items-start">
              <img src="/logo.png" alt="Zeploy Tech" className="h-12 w-auto mb-6" />
              <h3 className="font-display text-2xl font-semibold tracking-widest text-foreground">
                <span className="text-electric">ZEPLOY</span> TECH
              </h3>
            </div>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
              A premium software engineering and AI studio dedicated to building robust, scalable, and visually stunning digital products.
            </p>
            <div className="mt-10">
              <p className="font-mono text-xs uppercase tracking-widest text-electric-soft mb-4">Contact Us</p>
              <a href="mailto:zeploytech@gmail.com" className="text-foreground text-lg hover:text-electric transition-colors">zeploytech@gmail.com</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-8">Services</h4>
            <ul className="space-y-4 text-sm">
              <FooterLink href="#services">Web Applications</FooterLink>
              <FooterLink href="#services">Mobile Apps</FooterLink>
              <FooterLink href="#services">SaaS Development</FooterLink>
              <FooterLink href="#services">AI Systems</FooterLink>
              <FooterLink href="#services">Cloud Solutions</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-8">Studio</h4>
            <ul className="space-y-4 text-sm">
              <FooterLink href="#work">Featured Work</FooterLink>
              <FooterLink href="#team">Our Team</FooterLink>
              <FooterLink href="#process">The Process</FooterLink>
              <FooterLink href="#insights">Engineering Notes</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-8">Socials</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="https://www.linkedin.com/company/zeploy-tech/" target="_blank" rel="noopener noreferrer" aria-label="Zeploy Tech LinkedIn" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/syedasjadabbas" target="_blank" rel="noopener noreferrer" aria-label="Zeploy Tech GitHub" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/zeploy.tech/" target="_blank" rel="noopener noreferrer" aria-label="Zeploy Tech Instagram" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/zeploytech" target="_blank" rel="noopener noreferrer" aria-label="Zeploy Tech Facebook" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="mailto:zeploytech@gmail.com" aria-label="Zeploy Tech Email" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <p>© {new Date().getFullYear()} Zeploy Tech. All rights reserved.</p>
          <div className="flex items-center gap-3 text-electric-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
            We Deploy Your Vision.
          </div>
        </div>
      </div>
    </footer>
  );
}
