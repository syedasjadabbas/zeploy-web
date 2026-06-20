import { motion, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  Star,
  Workflow,
  Zap,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Plus,
  Minus
} from "lucide-react";
import { DataStreams, NetworkNodes, BlueprintGrid } from "./BackgroundScenes";
import { InfraVisualization } from "./InfraVisualization";

import imgAsjad from "@/assets/images/asjad.png";
import imgAsad from "@/assets/images/asad.jpeg";
import imgAhsan from "@/assets/images/ahsan.jpeg";
import imgHassan from "@/assets/images/hassan.jpeg";

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
    outcomes: ["Reduced manual interview screening by 70%", "Automated candidate evaluation workflow"],
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
    outcomes: ["Increased sales conversion by 25%", "Reduced order processing time by 40%"],
    image: "/projects/educart.png"
  },
  {
    name: "NeuralPay",
    kind: "SaaS · Billing Platform",
    desc: "A high-performance programmable billing engine built to process thousands of subscription events per minute with flawless accuracy, reducing failed renewals by 62%.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe"],
    features: ["Idempotent Webhooks", "Real-time Metrics", "Dynamic Proration", "Automated Dunning"],
    outcomes: ["Reduced failed renewals by 62%", "Increased operational efficiency by 60%"],
    image: "/projects/neuralpay.png"
  },
  {
    name: "Cortex Mesh",
    kind: "AI · Distributed Infrastructure",
    desc: "A distributed LLM inference fabric that intelligently routes workloads across a heterogeneous cluster of GPUs, maximizing throughput and reducing cost-per-token.",
    tech: ["Python", "FastAPI", "Kubernetes", "gRPC", "vLLM"],
    features: ["Dynamic Batching", "Cost-aware Routing", "Auto-scaling Pools", "Model Caching"],
    outcomes: ["Reduced processing time by 50%", "Lowered compute costs by 40%"],
    image: "/projects/cortex.png"
  },
  {
    name: "Synthwave",
    kind: "Analytics · Real-time Engine",
    desc: "A sub-second analytics engine ingesting high-volume event streams to power live operational dashboards and anomaly detection for enterprise organizations.",
    tech: ["TypeScript", "Kafka", "ClickHouse", "React", "WebSocket"],
    features: ["Live Geographic Maps", "Anomaly Detection", "Custom Aggregations", "Role-based Access"],
    outcomes: ["Achieved sub-second real-time latency", "Scaled to process 1M+ events per minute"],
    image: "/projects/synthwave.png"
  }
];

export function FeaturedWork() {
  return (
    <section className="relative border-t border-white/5 px-6 py-32 md:px-12 bg-background">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Featured Projects</SectionLabel>
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
              className="group glass-card glass-card-hover overflow-hidden rounded-[2.5rem]"
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

                  <div className="mt-8">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-400/80 mb-4">Outcomes & Metrics</p>
                    <ul className="space-y-3">
                      {p.outcomes?.map(o => (
                        <li key={o} className="flex items-start gap-3 text-sm text-foreground/90 leading-snug">
                          <span className="mt-0.5 text-emerald-400">✓</span>
                          {o}
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

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-6 md:grid-cols-2">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                className="glass-card glass-card-hover group relative overflow-hidden rounded-3xl p-8"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
                <r.icon className="h-8 w-8 text-electric" />
                <h3 className="mt-6 text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative w-full h-[600px] rounded-3xl border border-white/10 bg-surface/20 overflow-hidden hidden lg:block">
            <InfraVisualization />
          </div>
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

          <div className="grid grid-cols-2 gap-px bg-white/5 md:grid-cols-3 xl:grid-cols-5">
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
    image: imgAsjad,
    socials: {
      linkedin: "https://www.linkedin.com/in/syed-asjad-abbas/",
      github: "https://github.com/syedasjadabbas",
      portfolio: "https://www.syedasjadabbas.dev/"
    }
  },
  {
    name: "Rana Asad Ur Rehman",
    role: "Co-Founder & Full Stack Developer",
    skills: ["Backend Systems", "API Development", "Database Architecture"],
    initials: "RA",
    image: imgAsad,
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
    image: imgAhsan,
  },
  {
    name: "Hassan Kazmi",
    role: "Managing Partner · Data & Intelligence Lead",
    skills: ["Data Systems", "Research Intelligence", "Analytical Strategy"],
    initials: "HK",
    image: imgHassan,
  },
];

export function Team() {
  return (
    <section className="relative border-t border-white/5 px-6 py-32 md:px-12">
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
                <div className="group/avatar relative aspect-square w-[55%] mx-auto p-4 rounded-2xl border border-electric/20 bg-surface/40 transition-all duration-300 hover:border-electric/50 hover:bg-surface/60">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-background">
                    <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover object-[center_top] transition-transform duration-700 ease-out group-hover/avatar:scale-[1.03]" />
                  </div>
                </div>
                <div className="min-w-0 px-2 transition-transform duration-300 group-hover:translate-x-1 text-center mt-2">
                  <h3 className="text-2xl font-semibold">{m.name}</h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-electric-soft">
                    {m.role}
                  </p>
                  {m.socials && (
                    <div className="mt-4 flex justify-center gap-3">
                      {m.socials.linkedin && (
                        <a href={m.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} LinkedIn`} className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface/50">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {m.socials.github && (
                        <a href={m.socials.github} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} GitHub`} className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface/50">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {(m.socials as any).portfolio && (
                        <a href={(m.socials as any).portfolio} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} Portfolio`} className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface/50">
                          <Globe2 className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
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
    company: "PayStream Labs",
    projectType: "Billing Platform",
    rating: 5,
  },
  {
    q: "They architected an AI pipeline we couldn't have shipped internally in under a year. We had it in production in 9 weeks.",
    a: "Co-Founder · AI Infrastructure Startup",
    company: "Cortex Systems",
    projectType: "AI Pipeline",
    rating: 5,
  },
  {
    q: "Code quality and architecture you'd expect from a top-tier in-house team. We extended the contract three times.",
    a: "VP Product · Enterprise SaaS",
    company: "CloudFirst Inc.",
    projectType: "Enterprise SaaS",
    rating: 5,
  },
  {
    q: "Our real-time fleet dashboard went from concept to production in 8 weeks. Handles 50K+ events per minute without breaking a sweat.",
    a: "Head of Engineering · Logistics Startup",
    company: "FleetPulse",
    projectType: "Real-time Dashboard",
    rating: 5,
  },
  {
    q: "Zeploy delivered a HIPAA-compliant telemedicine platform that our medical staff actually enjoys using. The attention to UX was remarkable.",
    a: "CTO · HealthTech Startup",
    company: "MedSync",
    projectType: "Telemedicine Platform",
    rating: 5,
  },
  {
    q: "They replaced our legacy LMS with a modern, scalable platform in under 12 weeks. Student engagement metrics improved by 40% within the first month.",
    a: "Product Lead · EdTech Company",
    company: "LearnBase",
    projectType: "Learning Management System",
    rating: 5,
  },
  {
    q: "Migrated our entire commerce engine from a monolith to microservices with zero downtime. Revenue processing never skipped a beat.",
    a: "Engineering Manager · E-Commerce",
    company: "ShopScale",
    projectType: "Commerce Engine",
    rating: 5,
  },
  {
    q: "The analytics platform Zeploy built gives us insights we never had before. Data-driven decisions have directly contributed to 3x growth this year.",
    a: "Founder · PropTech Startup",
    company: "NestMetrics",
    projectType: "Analytics Platform",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-white/10 text-white/10"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="relative border-t border-white/5 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold tracking-tight leading-[1.05] text-gradient-soft md:text-6xl lg:text-7xl">
            Trusted by teams shipping at scale.
          </h2>
        </motion.div>

        {/* Average Rating Badge */}
        <motion.div
          {...fadeUp}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-amber-400/20 bg-amber-400/5 px-6 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-display text-lg font-semibold text-foreground">5.0<span className="text-muted-foreground font-normal">/5</span></span>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Based on {testimonials.length} client reviews
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="glass-card glass-card-hover rounded-3xl p-8 md:p-10 flex flex-col"
            >
              <StarRating rating={t.rating} />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground/90">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-6 border-t border-white/5 pt-5">
                <p className="font-mono text-xs uppercase tracking-widest text-electric-soft">
                  {t.a}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-mono text-[11px] text-muted-foreground">{t.company}</span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="font-mono text-[11px] text-electric/60">{t.projectType}</span>
                </div>
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
    date: "Aug 12, 2025",
    title: "Why we abandoned microservices for a modular monolith",
    description: "A deep dive into our infrastructure rewrite that reduced AWS costs by 40% and improved developer velocity.",
    slug: "abandoned-microservices",
  },
  {
    category: "AI Systems",
    date: "Sep 28, 2025",
    title: "Scaling LLM inference in production",
    description: "Techniques for managing latency, token streaming, and cost when deploying large language models to thousands of users.",
    slug: "scaling-llm-inference",
  },
  {
    category: "Performance",
    date: "Nov 04, 2026",
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    type: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("https://formspree.io/f/mykavaol", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          type: formData.type,
          message: formData.message
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", budget: "", type: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="relative border-t border-white/5 px-6 py-32 md:px-12 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 lg:gap-24">
        <motion.div {...fadeUp}>
          <SectionLabel>Project Inquiry</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold tracking-tight leading-[1.05] text-gradient-soft md:text-6xl lg:text-7xl">
            Let's architect your next platform.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Fill out the details of your project. Whether you have a complete technical specification or just a feature list, we'll review it and get back to you with an architecture proposal and timeline within 24 hours.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-white/5 pb-10">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground/80"><span className="text-emerald-400">✓</span> Response within 24 Hours</div>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground/80"><span className="text-emerald-400">✓</span> Free Project Consultation</div>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground/80"><span className="text-emerald-400">✓</span> Transparent Communication</div>
          </div>

          <div className="mt-10 space-y-6">
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
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="form-name" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Full Name</label>
                <input id="form-name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" placeholder="Full Name" className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-base md:text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors" />
              </div>
              <div className="space-y-2">
                <label htmlFor="form-email" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email</label>
                <input id="form-email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" placeholder="Email Address" className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-base md:text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="form-company" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Company</label>
              <input id="form-company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} type="text" placeholder="Company Name" className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-base md:text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="form-budget" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Estimated Budget</label>
                <input id="form-budget" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} type="text" placeholder="Estimated Budget" className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-base md:text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors" />
              </div>
              <div className="space-y-2">
                <label htmlFor="form-type" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project Type</label>
                <input id="form-type" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} type="text" placeholder="Project Type" className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-base md:text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="form-message" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project Description</label>
              <textarea id="form-message" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4} placeholder="Describe your project..." className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-base md:text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric transition-colors resize-none" />
            </div>

            {status === "success" && (
              <div className="text-emerald-400 text-sm font-medium">Your inquiry has been sent successfully. We will be in touch shortly!</div>
            )}
            {status === "error" && (
              <div className="text-red-400 text-sm font-medium">Failed to send inquiry. Please try again later.</div>
            )}

            <button type="submit" disabled={status === "loading"} className="mt-4 w-full rounded-xl bg-electric px-6 py-4 text-sm font-semibold text-primary-foreground transition-all hover:glow-electric hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100">
              {status === "loading" ? "Sending..." : "Submit Request"}
            </button>

            <div className="relative flex items-center justify-center my-1">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest bg-background/50 backdrop-blur-md px-3 text-muted-foreground font-mono">Or</div>
            </div>

            <a href="https://wa.me/923033236878" target="_blank" rel="noopener noreferrer" className="w-full rounded-xl border border-[#25D366]/20 bg-[#25D366]/10 px-6 py-4 text-sm font-semibold text-[#25D366] transition-all flex items-center justify-center gap-2 hover:bg-[#25D366]/20 hover:border-[#25D366]/50">
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
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
              <FooterLink href="#faq">FAQ</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-8">Socials</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="https://www.linkedin.com/company/zeploy-tech/" target="_blank" rel="noopener noreferrer" aria-label="Zeploy Tech LinkedIn" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/zeploy.tech/" target="_blank" rel="noopener noreferrer" aria-label="Zeploy Tech Instagram" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/zeploytech" target="_blank" rel="noopener noreferrer" aria-label="Zeploy Tech Facebook" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://wa.me/923033236878" target="_blank" rel="noopener noreferrer" aria-label="Zeploy Tech WhatsApp" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-[#25D366]/20 text-[#25D366] transition-all hover:bg-[#25D366]/20 hover:border-[#25D366]/50 hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.3)]">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="mailto:zeploytech@gmail.com" aria-label="Zeploy Tech Email" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Zeploy Tech. All rights reserved.</p>
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <div className="flex items-center gap-3 text-electric-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
              We Deploy Your Vision.
            </div>
            <span className="text-muted-foreground">50+ PROJECTS • 30+ CLIENTS • RESPONSE WITHIN 24 HOURS</span>
            <span className="text-electric-soft">Pakistan • Serving Clients Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FounderMessage() {
  return (
    <section className="relative border-t border-white/5 px-6 py-32 md:px-12 bg-background">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>A Word from the Founder</SectionLabel>
          <blockquote className="mt-12 text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.4] text-foreground/90 tracking-tight">
            "At Zeploy, our goal is simple: build software that solves real business problems. We focus on scalable systems, modern technology, and long-term value for every client we work with."
          </blockquote>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-full border border-electric/30 bg-surface">
                <img src={imgAsjad} alt="Syed Asjad Abbas" className="h-full w-full object-cover object-top" />
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">Syed Asjad Abbas</div>
                <div className="font-mono text-xs uppercase tracking-widest text-electric mt-1">CEO & Founder</div>
                <div className="flex justify-center gap-3 mt-4">
                  <a href="https://www.linkedin.com/in/syed-asjad-abbas/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface"><Linkedin className="w-4 h-4" /></a>
                  <a href="https://github.com/syedasjadabbas" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface"><Github className="w-4 h-4" /></a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-full border border-electric/30 bg-surface">
                <img src={imgAsad} alt="Rana Asad Ur Rehman" className="h-full w-full object-cover object-top" />
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">Rana Asad Ur Rehman</div>
                <div className="font-mono text-xs uppercase tracking-widest text-electric mt-1">Co-Founder</div>
                <div className="flex justify-center gap-3 mt-4">
                  <a href="https://www.linkedin.com/in/rana-asad-ur-rahman-0a2457339/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface"><Linkedin className="w-4 h-4" /></a>
                  <a href="https://github.com/asad-rana306" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface"><Github className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Faq() {
  const faqs = [
    { q: "How long does a typical project take?", a: "Project timelines vary based on complexity. A standard MVP typically takes 6 to 10 weeks, while large-scale enterprise systems can take 3 to 6 months. We provide a detailed timeline during the discovery phase." },
    { q: "Do you build both websites and mobile apps?", a: "Yes, we specialize in full-stack web applications and cross-platform mobile apps using modern frameworks like React, Next.js, and React Native, ensuring seamless performance across all devices." },
    { q: "Do you provide maintenance after launch?", a: "Absolutely. We offer long-term support, scaling, and observability retainers to ensure your system runs flawlessly and adapts to your growing user base." },
    { q: "Do you work with international clients?", a: "Yes, we are a globally distributed team. We work with clients across North America, Europe, and Asia, adapting to different time zones for seamless communication." },
    { q: "What technologies do you specialize in?", a: "Our core stack includes React, Next.js, Node.js, Python, FastAPI, and Go. We also have deep expertise in deploying AI models, LLMs, and scalable cloud infrastructure on AWS and GCP." },
    { q: "How do I get started with Zeploy?", a: "Simply fill out our project inquiry form or send us a WhatsApp message. We'll schedule a free technical consultation to discuss your requirements and propose an architecture." },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-white/5 px-6 py-32 md:px-12 bg-surface/20">
      <div className="mx-auto max-w-4xl">
        <motion.div {...fadeUp} className="text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-gradient-soft">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.05 }} className="glass-card rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-electric rounded-xl"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-lg font-medium text-foreground/90">{faq.q}</span>
                <span className="ml-4 shrink-0 text-electric">
                  {open === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>
              <div 
                id={`faq-answer-${i}`}
                className="px-6 text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out overflow-hidden"
                style={{ maxHeight: open === i ? '500px' : '0', paddingBottom: open === i ? '1.25rem' : '0', opacity: open === i ? 1 : 0 }}
              >
                {faq.a}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
