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
  Industries,
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
      { property: "og:url", content: "https://www.zeploy.tech" },
    ],
    links: [
      { rel: "canonical", href: "https://www.zeploy.tech" },
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
      <span ref={ref} className="relative z-10 font-display text-2xl font-semibold text-text-heading sm:text-3xl md:text-4xl tabular-nums">
        {from}{suffix}
      </span>
    </div>
  );
}

// Eagerly initiate HeroScene bundle download as soon as index.tsx script loads on the client
let cachedHeroComponent: React.ComponentType<{ onReady?: () => void }> | null = null;
let heroSceneModulePromise: Promise<{ default: React.ComponentType<{ onReady?: () => void }> }> | null = null;

function getHeroScenePromise() {
  if (!heroSceneModulePromise && typeof window !== "undefined") {
    heroSceneModulePromise = import("@/components/zeploy/HeroScene").then((m) => {
      cachedHeroComponent = m.default;
      return m;
    });
  }
  return heroSceneModulePromise;
}

if (typeof window !== "undefined") {
  getHeroScenePromise();
}

function ClientHeroScene() {
  const [HeroComponent, setHeroComponent] = useState<React.ComponentType<{ onReady?: () => void }> | null>(
    () => cachedHeroComponent
  );

  useEffect(() => {
    if (HeroComponent) return;
    let isMounted = true;
    const promise = getHeroScenePromise();
    if (promise) {
      promise
        .then((m) => {
          if (isMounted) {
            setHeroComponent(() => m.default);
          }
        })
        .catch((err) => console.error("Failed to load HeroScene:", err?.message, err));
    }

    return () => {
      isMounted = false;
    };
  }, [HeroComponent]);

  if (!HeroComponent) {
    return null;
  }

  return (
    <SafeComponentGuard name="HeroScene" fallback={null}>
      <div className="relative h-full w-full">
        <HeroComponent />
      </div>
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
      className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-surface border border-border-strong text-text shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-colors hover:bg-primary hover:border-primary hover:text-on-primary"
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
    <main className="relative min-h-screen overflow-hidden bg-bg text-text">
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
      <div id="industries">
        <Industries />
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
      <div className="mx-auto grid max-w-7xl gap-12 sm:gap-16 px-4 sm:px-6 pb-32 pt-12 md:px-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-20">
        <div className="relative z-10 flex flex-col justify-center">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4"
          >
            <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.25em] text-text-heading sm:text-3xl">
              <span className="text-accent-text">ZEPLOY</span> TECH
            </h2>
          </motion.div>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-4 font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(3.75rem,5vw,4.5rem)] font-semibold leading-[1.05] sm:leading-[1.02] tracking-[-0.022em] text-text-heading break-words"
          >
            <span>We build software</span>
            <br />
            <span>that scales your</span>{" "}
            <span className="text-accent-text">business.</span>
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 sm:mt-8 max-w-xl text-base sm:text-xl md:text-2xl leading-relaxed text-text-muted"
          >
            Zeploy Tech is a software engineering studio delivering custom web apps, mobile apps,
            AI systems, cloud infrastructure, and scalable digital products.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <a
              href="#work"
              onClick={() => trackGAEvent("portfolio_click", { button_text: "View our work" })}
              className="group inline-flex items-center justify-center gap-2 rounded-[8px] bg-primary px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-medium text-on-primary shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-colors hover:bg-primary-hover"
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
              className="inline-flex items-center justify-center rounded-[8px] border border-border-strong bg-transparent px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-medium text-text transition-colors hover:bg-surface-hover text-center"
            >
              Start a project
            </a>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-12 sm:mt-16 grid max-w-lg grid-cols-3 gap-2 sm:gap-6 border-t border-border pt-6 sm:pt-8"
          >
            <div>
              <AnimatedCounter from={0} to={50} duration={1.5} suffix="+" />
              <p className="mt-2 font-mono text-[9px] sm:text-[11px] uppercase tracking-widest text-text-subtle">
                Projects Shipped
              </p>
            </div>
            <div>
              <AnimatedCounter from={0} to={30} duration={1.5} suffix="+" />
              <p className="mt-2 font-mono text-[9px] sm:text-[11px] uppercase tracking-widest text-text-subtle">
                Clients
              </p>
            </div>
            <div>
              <AnimatedCounter from={0} to={6} duration={1.5} suffix="" />
              <p className="mt-2 font-mono text-[9px] sm:text-[11px] uppercase tracking-widest text-text-subtle">
                Countries Served
              </p>
            </div>
          </motion.div>
        </div>

        {/* Three.js scene */}
        <div className="relative h-[300px] w-full xs:h-[340px] sm:h-[420px] md:h-[520px] lg:h-[640px]">
          <div className="absolute inset-0">
            <ClientHeroScene />
          </div>



        </div>
      </div>

    </section>
  );
}
