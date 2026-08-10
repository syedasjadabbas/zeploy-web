import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { trackGAEvent } from "../lib/analytics";

import { ArrowUpRight, ArrowUp } from "lucide-react";
import Nav from "@/components/zeploy/Nav";
import { SafeComponentGuard } from "@/components/zeploy/SafeComponentGuard";
import {
  Services,
  FeaturedWork,
  WhyChoose,
  Reliability,
  Process,
  Team,
  Testimonials,
  Blog,
  ProjectInquiry,
  Footer,
  FounderMessage,
  Faq,
} from "@/components/zeploy/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zeploy Tech | Premium Software Engineering & AI Studio" },
      {
        name: "description",
        content:
          "Zeploy Tech is a premium software engineering and AI studio specializing in scalable web applications, mobile apps, SaaS development, and enterprise cloud infrastructure.",
      },
      { property: "og:title", content: "Zeploy Tech | Premium Software Engineering & AI Studio" },
      {
        property: "og:description",
        content:
          "Premium software engineering & AI studio building scalable, production-grade systems for modern businesses.",
      },
    ],
  }),
  component: Index,
});

function AnimatedCounter({ from, to, duration, suffix = "" }: { from: number; to: number; duration: number; suffix?: string; }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = `${Math.round(value)}${suffix}`;
          }
        },
        onComplete() {
          setIsFinished(true);
        }
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration, suffix]);

  return (
    <div className="relative inline-block min-w-[2.5ch]">
      <span ref={ref} className="relative z-10 font-display text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl tabular-nums">
        {from}{suffix}
      </span>
      {isFinished && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 -z-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/20 blur-xl animate-pulse pointer-events-none"
        />
      )}
    </div>
  );
}

function ClientHeroScene() {
  const [HeroComponent, setHeroComponent] = useState<React.ComponentType | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    if (!mobile) {
      let isMounted = true;
      import("@/components/zeploy/HeroScene")
        .then((m) => {
          if (isMounted) setHeroComponent(() => m.default);
        })
        .catch((err) => console.error("Failed to load HeroScene:", err));

      return () => {
        isMounted = false;
      };
    }
  }, []);

  const fallback = (
    <div className="h-full w-full rounded-3xl bg-[#020817] border border-white/5 relative overflow-hidden flex items-center justify-center">
      <div className="absolute w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/15 via-[#020817]/80 to-[#020817] animate-[pulse_4s_ease-in-out_infinite]" />
      <div className="absolute w-32 h-32 rounded-full bg-blue-500/10 blur-3xl animate-[pulse_3s_ease-in-out_infinite]" />
      <div className="font-display text-5xl font-bold text-white z-10 opacity-80" style={{ textShadow: "0 0 20px rgba(59,130,246,0.5)" }}>Z</div>
    </div>
  );

  if (!mounted) return <div className="h-full w-full rounded-3xl bg-surface/30" />;

  if (isMobile || !HeroComponent) {
    return fallback;
  }

  return (
    <SafeComponentGuard name="HeroScene" fallback={fallback}>
      <HeroComponent />
    </SafeComponentGuard>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPast = window.scrollY > 500;
          setVisible((prev) => (prev !== isPast ? isPast : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8, pointerEvents: visible ? "auto" : "none" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-surface/80 border border-electric/30 text-electric shadow-[0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-md transition-all hover:bg-electric hover:text-white hover:scale-110 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
}

function Index() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Nav />
      <BackToTop />
      <div id="hero">
        <Hero />
      </div>
      <Services />
      <div id="why-zeploy">
        <WhyChoose />
      </div>
      <div id="work">
        <FeaturedWork />
      </div>
      <Reliability />
      <Process />
      <Testimonials />
      <div id="team">
        <Team />
      </div>
      <Blog />
      <FounderMessage />
      <div id="faq">
        <Faq />
      </div>
      <div id="contact">
        <ProjectInquiry />
      </div>
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute left-1/2 top-1/3 -z-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-electric/20 blur-[160px]" />

      <div className="mx-auto grid max-w-7xl gap-12 sm:gap-16 px-4 sm:px-6 pb-32 pt-12 md:px-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-20">
        <div className="relative z-10 flex flex-col justify-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4"
          >
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.25em] text-foreground sm:text-3xl">
              <span className="text-electric">ZEPLOY</span> TECH
            </h2>
          </motion.div>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-[clamp(3.75rem,5vw,4.5rem)]"
          >
            <span className="text-gradient-soft">We build software</span>
            <br />
            <span className="text-gradient-soft">that scales your</span>{" "}
            <span className="text-electric">business.</span>
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl"
          >
            Zeploy Tech is a software engineering studio delivering custom web apps, mobile apps,
            AI systems, cloud infrastructure, and scalable digital products.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              onClick={() => trackGAEvent("portfolio_click", { button_text: "View our work" })}
              className="group inline-flex items-center gap-2 rounded-full bg-electric px-8 py-4 text-base font-medium text-primary-foreground shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.7)]"
            >
              View our work
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="mailto:zeploytech@gmail.com?subject=Project%20Inquiry%20-%20Portfolio%20Website"
              onClick={() => {
                trackGAEvent("email_click", { button_text: "Start a project" });
                trackGAEvent("contact_click", { button_text: "Start a project" });
              }}
              className="rounded-full border border-white/20 bg-surface/50 px-8 py-4 text-base font-medium text-foreground backdrop-blur-md transition-colors hover:border-electric/50 hover:bg-surface hover:text-electric"
            >
              Start a project
            </a>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-16 grid max-w-lg grid-cols-3 gap-3 border-t border-white/5 pt-8 sm:gap-6"
          >
            <div>
              <AnimatedCounter from={0} to={50} duration={1.5} suffix="+" />
              <p className="mt-2 font-mono text-[9px] sm:text-[11px] uppercase tracking-widest text-muted-foreground">
                Projects Shipped
              </p>
            </div>
            <div>
              <AnimatedCounter from={0} to={30} duration={1.5} suffix="+" />
              <p className="mt-2 font-mono text-[9px] sm:text-[11px] uppercase tracking-widest text-muted-foreground">
                Clients
              </p>
            </div>
            <div>
              <AnimatedCounter from={0} to={6} duration={1.5} suffix="" />
              <p className="mt-2 font-mono text-[9px] sm:text-[11px] uppercase tracking-widest text-muted-foreground">
                Countries Served
              </p>
            </div>
          </motion.div>
        </div>

        {/* Three.js scene */}
        <div className="relative h-[320px] w-full sm:h-[420px] md:h-[520px] lg:h-[640px]">
          <div className="absolute inset-0">
            <ClientHeroScene />
          </div>


          {/* Floating telemetry chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute left-4 top-8 glass-card rounded-xl px-4 py-3 font-mono text-[11px] uppercase tracking-widest hidden sm:block"
          >
            <p className="text-electric font-semibold">ZEPLOY TECH</p>
            <p className="mt-1 text-muted-foreground">AI · WEB · CLOUD</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-10 right-2 glass-card rounded-xl px-4 py-3 font-mono text-[11px] uppercase tracking-widest hidden sm:block"
          >
            <p className="text-muted-foreground">CURRENT STATUS</p>
            <p className="mt-1 text-emerald-400">✓ ACCEPTING PROJECTS</p>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
