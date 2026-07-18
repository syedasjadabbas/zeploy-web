import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState, useRef, type ReactNode } from "react";
import { motion, useInView, animate } from "framer-motion";

import { ArrowUpRight, ArrowUp } from "lucide-react";
import Nav from "@/components/zeploy/Nav";
const Services = lazy(() => import("@/components/zeploy/Sections").then(m => ({ default: m.Services })));
const FeaturedWork = lazy(() => import("@/components/zeploy/Sections").then(m => ({ default: m.FeaturedWork })));
const WhyChoose = lazy(() => import("@/components/zeploy/Sections").then(m => ({ default: m.WhyChoose })));
const Reliability = lazy(() => import("@/components/zeploy/Sections").then(m => ({ default: m.Reliability })));
const Process = lazy(() => import("@/components/zeploy/Sections").then(m => ({ default: m.Process })));
const Team = lazy(() => import("@/components/zeploy/Sections").then(m => ({ default: m.Team })));
const Testimonials = lazy(() => import("@/components/zeploy/Sections").then(m => ({ default: m.Testimonials })));
const Blog = lazy(() => import("@/components/zeploy/Sections").then(m => ({ default: m.Blog })));
const ProjectInquiry = lazy(() => import("@/components/zeploy/Sections").then(m => ({ default: m.ProjectInquiry })));
const Footer = lazy(() => import("@/components/zeploy/Sections").then(m => ({ default: m.Footer })));
const FounderMessage = lazy(() => import("@/components/zeploy/Sections").then(m => ({ default: m.FounderMessage })));
const Faq = lazy(() => import("@/components/zeploy/Sections").then(m => ({ default: m.Faq })));

const HeroScene = lazy(() => import("@/components/zeploy/HeroScene"));

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
    <div className="relative inline-block">
      <span ref={ref} className="relative z-10 font-display text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function ClientHeroScene() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <div className="h-full w-full rounded-3xl bg-surface/30" />;
  
  if (isMobile) {
    return (
      <div className="h-full w-full rounded-3xl bg-[#020817] border border-white/5 relative overflow-hidden flex items-center justify-center">
        <div className="absolute w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/15 via-[#020817]/80 to-[#020817] animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-32 h-32 rounded-full bg-blue-500/10 blur-3xl animate-[pulse_3s_ease-in-out_infinite]" />
        <div className="font-display text-5xl font-bold text-white z-10 opacity-80" style={{ textShadow: "0 0 20px rgba(59,130,246,0.5)" }}>Z</div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="h-full w-full rounded-3xl bg-surface/30" />}>
      <HeroScene />
    </Suspense>
  );
}

/** Defers mounting of children until the wrapper enters the viewport.
 *  Uses content-visibility: auto via the section-lazy utility for paint deferral. */
function LazySection({ children, fallbackHeight = "200px", id }: { children: ReactNode; fallbackHeight?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} id={id} className="section-lazy">
      {visible ? (
        <Suspense fallback={<div style={{ minHeight: fallbackHeight }} />}>
          {children}
        </Suspense>
      ) : (
        <div style={{ minHeight: fallbackHeight }} />
      )}
    </div>
  );
}


function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8, pointerEvents: visible ? "auto" : "none" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-surface/80 border border-electric/30 text-electric shadow-[0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-md transition-all hover:bg-electric hover:text-white hover:scale-110 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
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
      <LazySection fallbackHeight="600px">
        <Services />
      </LazySection>
      <LazySection id="why-zeploy" fallbackHeight="500px">
        <WhyChoose />
      </LazySection>
      <LazySection id="work" fallbackHeight="600px">
        <FeaturedWork />
      </LazySection>
      <LazySection fallbackHeight="400px">
        <Reliability />
      </LazySection>
      <LazySection fallbackHeight="400px">
        <Process />
      </LazySection>
      <LazySection fallbackHeight="500px">
        <Testimonials />
      </LazySection>
      <LazySection id="team" fallbackHeight="500px">
        <Team />
      </LazySection>
      <LazySection fallbackHeight="300px">
        <Blog />
      </LazySection>
      <LazySection fallbackHeight="400px">
        <FounderMessage />
      </LazySection>
      <LazySection id="faq" fallbackHeight="400px">
        <Faq />
      </LazySection>
      <LazySection id="contact" fallbackHeight="400px">
        <ProjectInquiry />
      </LazySection>
      <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
        <Footer />
      </Suspense>
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute left-1/2 top-1/3 -z-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-electric/20 blur-[160px]" />

      <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-32 pt-12 md:px-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-20">
        <div className="relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4"
          >
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.25em] text-foreground sm:text-3xl">
              <span className="text-electric">ZEPLOY</span> TECH
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl"
          >
            Zeploy Tech is a software engineering studio delivering custom web apps, mobile apps,
            AI systems, cloud infrastructure, and scalable digital products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-electric px-8 py-4 text-base font-medium text-primary-foreground shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.7)]"
            >
              View our work
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="mailto:zeploytech@gmail.com?subject=Project%20Inquiry%20-%20Portfolio%20Website"
              className="rounded-full border border-white/20 bg-surface/50 px-8 py-4 text-base font-medium text-foreground backdrop-blur-md transition-colors hover:border-electric/50 hover:bg-surface hover:text-electric"
            >
              Start a project
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
