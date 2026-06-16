import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { ArrowUpRight } from "lucide-react";
import Nav from "@/components/zeploy/Nav";
import {
  Services,
  TechStack,
  FeaturedWork,
  WhyChoose,
  Reliability,
  Process,
  Team,
  Testimonials,
  Blog,
  CTA,
  Footer,
} from "@/components/zeploy/Sections";

const HeroScene = lazy(() => import("@/components/zeploy/HeroScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zeploy Tech — We Deploy Your Vision" },
      {
        name: "description",
        content:
          "Zeploy Tech is a software engineering studio building scalable web apps, mobile apps, AI systems, and cloud infrastructure for startups and businesses.",
      },
      { property: "og:title", content: "Zeploy Tech — We Deploy Your Vision" },
      {
        property: "og:description",
        content:
          "Software engineering & AI studio delivering custom web apps, mobile apps, AI systems, cloud infrastructure, and scalable digital products.",
      },
    ],
  }),
  component: Index,
});

function ClientHeroScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-full w-full rounded-3xl bg-surface/30" />;
  return (
    <Suspense fallback={<div className="h-full w-full rounded-3xl bg-surface/30" />}>
      <HeroScene />
    </Suspense>
  );
}


function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <Services />
      <TechStack />
      <FeaturedWork />
      <WhyChoose />
      <Reliability />
      <Process />
      <Team />
      <Testimonials />
      <Blog />
      <CTA />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute left-1/2 top-1/3 -z-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-electric/20 blur-[160px]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-12 md:px-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-20">
        <div className="relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-surface/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-electric-soft"
          >
            <span className="relative h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-electric" />
              <span className="absolute inset-0 animate-ping rounded-full bg-electric/70" />
            </span>
            Software Engineering · AI Solutions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-8 font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl"
          >
            <span className="text-gradient-soft">We build software</span>
            <br />
            <span className="text-gradient-soft">that scales your</span>{" "}
            <span className="text-electric">business.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Zeploy Tech is a software engineering studio delivering custom web apps, mobile apps,
            AI systems, cloud infrastructure, and scalable digital products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:glow-electric"
            >
              View our work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="mailto:hello@zeploytech.com"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-electric/50 hover:text-electric"
            >
              Start a project
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/5 pt-8"
          >
            {[
              { v: "50+", k: "Projects" },
              { v: "30+", k: "Clients" },
              { v: "6", k: "Countries" },
            ].map((s) => (
              <div key={s.k}>
                <p className="font-display text-3xl font-semibold text-foreground md:text-4xl">
                  {s.v}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.k}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Three.js scene */}
        <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[640px]">
          <div className="absolute inset-0">
            <ClientHeroScene />
          </div>


          {/* Floating telemetry chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute left-4 top-8 glass-card rounded-xl px-4 py-3 font-mono text-[11px] uppercase tracking-widest"
          >
            <p className="text-muted-foreground">node · us-east-1</p>
            <p className="mt-1 text-electric-soft">p95 84ms · 12.4K rps</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-10 right-2 glass-card rounded-xl px-4 py-3 font-mono text-[11px] uppercase tracking-widest"
          >
            <p className="text-muted-foreground">deploy · build #1847</p>
            <p className="mt-1 text-electric-soft">✓ shipped · 1m 12s</p>
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-10 border-y border-white/5 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:px-12">
          <span>Trusted execution · Senior engineering · Production-grade</span>
          <span className="text-electric-soft">Lahore · Remote · Globally distributed</span>
        </div>
      </div>
    </section>
  );
}
