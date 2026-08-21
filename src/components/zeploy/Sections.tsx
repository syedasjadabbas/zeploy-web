import { motion, animate, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback, lazy, Suspense } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { trackGAEvent } from "../../lib/analytics";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Boxes,
  Brain,
  Briefcase,
  Building2,
  Cloud,
  Code2,
  Coins,
  Cpu,
  Database,
  GitBranch,
  Globe2,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Hotel,
  LineChart,
  Rocket,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Truck,
  Workflow,
  Zap,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { SafeComponentGuard } from "./SafeComponentGuard";
import { TiltCard3D } from "./TiltCard3D";

function DesktopOnly3D({ load }: { load: () => Promise<{ default: React.ComponentType }> }) {
  const [Comp, setComp] = useState<React.ComponentType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadRef = useRef(load);
  loadRef.current = load;

  useEffect(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    if (typeof window === "undefined" || width < 768) {
      return;
    }
    const el = containerRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      loadRef.current()
        .then((m) => {
          setComp(() => m.default);
        })
        .catch((err) => console.error("Desktop3D load error:", err?.message, err));
      return;
    }

    let isMounted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadRef.current()
            .then((m) => {
              if (isMounted) setComp(() => m.default);
            })
            .catch((err) => console.error("Desktop3D load error:", err?.message, err));
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(el);
    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {Comp && (
        <SafeComponentGuard name="Desktop3D">
          <Comp />
        </SafeComponentGuard>
      )}
    </div>
  );
}

import imgAsjad from "@/assets/images/asjad.webp";
import imgAsad from "@/assets/images/asad.webp";
import imgAhsan from "@/assets/images/ahsan.webp";
import imgHassan from "@/assets/images/hassan.webp";

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
    slug: "web-development",
    icon: Globe2,
    title: "Web Applications",
    desc: "High-performance web platforms engineered for scale, speed, and longevity.",
    caps: ["Next.js / React", "Edge-rendered SSR", "Type-safe APIs"],
  },
  {
    slug: "mobile-development",
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native-grade iOS and Android products built on a unified codebase.",
    caps: ["React Native", "Offline-first", "Push & background sync"],
  },
  {
    slug: "saas-development",
    icon: Boxes,
    title: "SaaS Development",
    desc: "Multi-tenant SaaS platforms with billing, auth, and admin out of the box.",
    caps: ["Stripe billing", "RBAC + SSO", "Usage metering"],
  },
  {
    slug: "ai-solutions",
    icon: Brain,
    title: "AI Systems & Automation",
    desc: "LLM pipelines, retrieval systems, and intelligent workflows in production.",
    caps: ["RAG architectures", "Agent workflows", "Eval & guardrails"],
  },
  {
    slug: "cloud-solutions",
    icon: Cloud,
    title: "Cloud Solutions",
    desc: "AWS-native infrastructure, IaC, and CI/CD for zero-downtime deployment.",
    caps: ["AWS / GCP", "Terraform", "Kubernetes"],
  },
  {
    slug: "startup-mvp",
    icon: Rocket,
    title: "Startup MVP Development",
    desc: "Ship a defensible v1 in weeks — architected to survive product-market fit.",
    caps: ["6–10 week scope", "Investor-ready", "Scales to v2"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative border-t border-white/5 px-4 sm:px-6 py-24 md:py-32 md:px-12">
      <DesktopOnly3D load={() => import("./BackgroundScenes").then(m => ({ default: m.DataStreams }))} />
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-6 text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] sm:leading-[1.05] text-gradient-soft md:text-6xl lg:text-[clamp(3.5rem,4.5vw,4.5rem)]">
            Engineering across the full product surface.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground">
            From the first commit to the millionth request — we design, build, and operate systems
            that scale with your business.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
            >
              <TiltCard3D className="group relative bg-background border border-white/10 rounded-2xl h-full transition-colors hover:border-electric/50 hover:bg-surface/40 overflow-hidden">
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  onClick={() => trackGAEvent('service_click', { button_text: s.title, page: `/services/${s.slug}` })}
                  className="block p-6 sm:p-10 md:p-12 h-full w-full"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-surface text-electric transition-all group-hover:border-electric/60 group-hover:glow-electric">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" />
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold text-foreground group-hover:text-electric-soft transition-colors">{s.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.desc}</p>
                  <ul className="mt-6 space-y-1.5 font-mono text-xs text-electric-soft/80">
                    {s.caps.map((c) => (
                      <li key={c} className="flex items-center gap-2">
                        <span className="h-px w-3 bg-electric/60" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </Link>
              </TiltCard3D>
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
    image: "/projects/mockai.webp"
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
    image: "/projects/educart.webp"
  },
  {
    name: "NeuralPay",
    kind: "SaaS · Billing Platform",
    desc: "A high-performance programmable billing engine built to process thousands of subscription events per minute with flawless accuracy, reducing failed renewals by 62%.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe"],
    features: ["Idempotent Webhooks", "Real-time Metrics", "Dynamic Proration", "Automated Dunning"],
    outcomes: ["Reduced failed renewals by 62%", "Increased operational efficiency by 60%"],
    image: "/projects/neuralpay.webp"
  },
  {
    name: "Cortex Mesh",
    kind: "AI · Distributed Infrastructure",
    desc: "A distributed LLM inference fabric that intelligently routes workloads across a heterogeneous cluster of GPUs, maximizing throughput and reducing cost-per-token.",
    tech: ["Python", "FastAPI", "Kubernetes", "gRPC", "vLLM"],
    features: ["Dynamic Batching", "Cost-aware Routing", "Auto-scaling Pools", "Model Caching"],
    outcomes: ["Reduced processing time by 50%", "Lowered compute costs by 40%"],
    image: "/projects/cortex.webp"
  },
  {
    name: "Synthwave",
    kind: "Analytics · Real-time Engine",
    desc: "A sub-second analytics engine ingesting high-volume event streams to power live operational dashboards and anomaly detection for enterprise organizations.",
    tech: ["TypeScript", "Kafka", "ClickHouse", "React", "WebSocket"],
    features: ["Live Geographic Maps", "Anomaly Detection", "Custom Aggregations", "Role-based Access"],
    outcomes: ["Achieved sub-second real-time latency", "Scaled to process 1M+ events per minute"],
    image: "/projects/synthwave.webp"
  },
  {
    name: "PulseFit ERP",
    kind: "SaaS · Fitness Management",
    desc: "Comprehensive gym management platform handling member subscriptions, trainer scheduling, automated check-in access control, and revenue analytics for modern fitness centers.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind", "Stripe"],
    features: ["Member Portal", "Automated Billing", "Class Scheduling", "Attendance Tracking", "Financial Reports"],
    outcomes: ["Increased member retention by 35%", "Automated 85% of check-in operations"],
    image: "/projects/gym-management-system.webp"
  },
  {
    name: "TuneBox Studio",
    kind: "Web Application · Audio Streaming",
    desc: "Low-latency audio streaming and collaboration suite empowering music producers to share stems, sync tracks in real-time, and manage studio production workflow.",
    tech: ["React", "WebAudio API", "TypeScript", "Node.js", "AWS S3"],
    features: ["Multi-track Player", "Real-time Waveforms", "Stem Separation", "Cloud Storage", "Collaboration Tools"],
    outcomes: ["Streamlined audio feedback loop by 50%", "Handled 100K+ track uploads"],
    image: "/projects/tunebox.webp"
  },
  {
    name: "FrameGrill Hub",
    kind: "E-Commerce · Digital Ordering",
    desc: "Interactive restaurant management and online ordering system featuring real-time kitchen display screens, automated table reservations, and customer loyalty management.",
    tech: ["Next.js", "Express", "MongoDB", "Tailwind", "WebSocket"],
    features: ["QR Table Ordering", "Kitchen Display Sync", "Loyalty Rewards", "Menu Management", "Analytics Dashboard"],
    outcomes: ["Reduced order wait times by 30%", "Boosted repeat customer visits by 40%"],
    image: "/projects/framegrill.webp"
  },
  {
    name: "Oh My Fries App",
    kind: "Mobile App · Quick Service Dining",
    desc: "Vibrant fast-casual food delivery and loyalty application featuring live driver tracking, location-based geofenced offers, and instant mobile checkout.",
    tech: ["React Native", "TypeScript", "Node.js", "Firebase", "Stripe"],
    features: ["Geofenced Discounts", "Live Driver Tracking", "In-App Payments", "Push Notifications", "Custom Combos"],
    outcomes: ["Achieved 4.8★ app store rating", "Increased mobile order volume by 65%"],
    image: "/projects/oh-my-fries.webp"
  },
  {
    name: "EdilVista Italian ERP",
    kind: "Enterprise Cloud · Civil Engineering",
    desc: "Bespoke construction management suite for tracking multi-site project timelines, material supply chains, compliance safety reporting, and heavy equipment allocation.",
    tech: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL"],
    features: ["3D BIM Viewer", "Subcontractor Portal", "Material Inventory", "Safety Compliance", "Budget Variance"],
    outcomes: ["Lowered material wastage by 22%", "Optimized site scheduling efficiency"],
    image: "/projects/italian-construction.webp"
  },
  {
    name: "ApexInventory Hub",
    kind: "SaaS · Supply Chain Logistics",
    desc: "Enterprise inventory management software with automated stock reordering, barcode and RFID scanning support, and multi-warehouse synchronization.",
    tech: ["React", "Node.js", "GraphQL", "Redis", "Docker"],
    features: ["Barcode Scanning", "Multi-warehouse Sync", "Predictive Stocking", "Supplier Integrations", "Audit Logs"],
    outcomes: ["Eliminated stockouts by 80%", "Reduced inventory auditing time by 60%"],
    image: "/projects/inventory-system.webp"
  }
];

export function FeaturedWork() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    duration: 25,
    watchDrag: true,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isDraggingRef = useRef(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    const onPointerDown = () => { isDraggingRef.current = true; };
    const onPointerUp = () => { isDraggingRef.current = false; };

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    let intervalId: any;

    const startAutoplay = () => {
      intervalId = setInterval(() => {
        if (!isHovered && !isDraggingRef.current) {
          emblaApi.scrollNext();
        }
      }, 7000);
    };

    const stopAutoplay = () => {
      clearInterval(intervalId);
    };

    startAutoplay();

    emblaApi.on("pointerDown", stopAutoplay);

    return () => {
      stopAutoplay();
    };
  }, [emblaApi, isHovered]);

  const prevSlide = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const nextSlide = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollToSlide = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <section className="relative border-t border-white/5 py-10 md:py-14 lg:py-16 bg-background overflow-hidden">
      <div className="w-full relative z-10">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center px-4 sm:px-6 md:px-12 mb-6 md:mb-8">
          <SectionLabel>Featured Projects</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold tracking-tight leading-[1.1] text-gradient-soft sm:text-4xl lg:text-[clamp(2.25rem,3vw,3rem)]">
            Representative product concepts demonstrating Zeploy's engineering capabilities.
          </h2>
        </motion.div>

        {/* Embla Viewport */}
        <div 
          className="overflow-hidden w-full px-0 select-none cursor-grab active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
          ref={emblaRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Embla Container */}
          <div className="flex select-none">
            {work.map((p, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div 
                  key={p.name} 
                  className="flex-[0_0_88vw] sm:flex-[0_0_80vw] md:flex-[0_0_680px] lg:flex-[0_0_740px] xl:flex-[0_0_760px] max-w-[760px] min-w-0 px-2 sm:px-3 py-2 sm:py-3"
                  onClick={() => {
                    if (!isActive && emblaApi && emblaApi.clickAllowed()) {
                      scrollToSlide(idx);
                    }
                  }}
                >
                  <div
                    className={`group/card glass-card overflow-hidden rounded-2xl sm:rounded-3xl w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isActive 
                        ? "opacity-100 scale-100 blur-0 shadow-[0_0_35px_rgba(59,130,246,0.12)] border-white/10 hover:shadow-[0_0_45px_rgba(59,130,246,0.22)] hover:-translate-y-0.5 hover:border-electric/40"
                        : "opacity-40 scale-[0.93] md:scale-[0.95] blur-[1.5px] cursor-pointer select-none border-white/5 shadow-none hover:opacity-75 hover:scale-[0.96]"
                    }`}
                  >
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Left Side: Details */}
                      <div className="p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-between select-none">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-electric animate-pulse" />
                            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-electric">
                              {p.kind}
                            </p>
                          </div>
                          <h3 className="mt-2 text-2xl font-semibold sm:text-3xl lg:text-3xl tracking-tight">{p.name}</h3>

                          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                            {p.desc}
                          </p>

                          <div className="mt-4">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-electric-soft mb-1.5">Key Features</p>
                            <ul className="grid sm:grid-cols-2 gap-2">
                              {p.features.map(f => (
                                <li key={f} className="flex items-center gap-2 text-xs text-foreground/90">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-3">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/80 mb-1.5">Outcomes & Metrics</p>
                            <ul className="space-y-1">
                              {p.outcomes?.map(o => (
                                <li key={o} className="flex items-start gap-2 text-xs text-foreground/90 leading-tight">
                                  <span className="mt-0.5 text-emerald-400 font-bold shrink-0">✓</span>
                                  {o}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 pt-3.5 border-t border-white/5">
                          <p className="font-mono text-[10px] uppercase tracking-widest text-electric-soft mb-1.5">Technology Stack</p>
                          <div className="flex flex-wrap gap-1.5">
                            {p.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-foreground transition-colors hover:border-electric/50"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Mockup Image */}
                      <div className="relative border-white/5 bg-surface/30 overflow-hidden flex items-center justify-center p-4 sm:p-5 lg:p-6 lg:border-l select-none">
                        <div className="w-full relative border border-white/10 bg-background/50 rounded-xl overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-[1.01]">
                          {/* Browser-style titlebar */}
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/60 border-b border-white/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                            <span className="ml-2 font-mono text-[8px] text-muted-foreground uppercase tracking-widest bg-white/5 px-1.5 py-0.5 rounded-md">zeploy.live</span>
                          </div>
                          {/* Image Area */}
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-background select-none">
                            <img 
                              src={p.image}
                              srcSet={`/projects/mobile/${p.image.split('/').pop()} 600w, ${p.image} 1024w`}
                              sizes="(max-width: 768px) 88vw, 45vw"
                              alt={`${p.name} - ${p.kind}`} 
                              loading="lazy"
                              decoding="async"
                              draggable={false}
                              width="1920"
                              height="1200"
                              className="absolute inset-0 h-full w-full object-cover object-top select-none pointer-events-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-8 flex items-center justify-center gap-3 sm:gap-6 px-4 md:px-12">
          <button
            onClick={prevSlide}
            className="p-3.5 rounded-full border border-white/10 bg-surface/60 text-foreground transition-all hover:bg-electric hover:text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] focus:outline-none focus:ring-2 focus:ring-electric"
            aria-label="Previous Project"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-wrap justify-center items-center gap-2 max-w-full px-2">
            {work.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  activeIndex === idx 
                    ? "w-8 bg-electric shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-3.5 rounded-full border border-white/10 bg-surface/60 text-foreground transition-all hover:bg-electric hover:text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] focus:outline-none focus:ring-2 focus:ring-electric"
            aria-label="Next Project"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- INDUSTRIES WE SERVE ---------- */
const industries = [
  {
    slug: "startups",
    icon: Rocket,
    title: "Startups",
    desc: "Rapid MVP development, product-market fit iteration, and scalable tech foundations built to survive hypergrowth.",
  },
  {
    slug: "ecommerce",
    icon: ShoppingBag,
    title: "E-commerce",
    desc: "Custom high-conversion storefronts, headless architectures, and integrated order-management engines.",
  },
  {
    slug: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    desc: "Secure, HIPAA-compliant patient management, diagnostic workflows, and encrypted medical data infrastructure.",
  },
  {
    slug: "education",
    icon: GraduationCap,
    title: "Education",
    desc: "Interactive learning platforms, automated grading systems, and scalable student and teacher management portals.",
  },
  {
    slug: "real-estate",
    icon: Building2,
    title: "Real Estate",
    desc: "Modern property portals, automated valuation workflows, tenant portals, and transaction management platforms.",
  },
  {
    slug: "fintech",
    icon: Coins,
    title: "Finance & FinTech",
    desc: "Real-time ledger systems, high-volume payment routing, programmable billing, and compliant reporting tools.",
  },
  {
    slug: "logistics",
    icon: Truck,
    title: "Logistics & Transportation",
    desc: "Real-time fleet telematics, dispatch algorithms, supply chain observability, and multi-hub routing engines.",
  },
  {
    slug: "hospitality",
    icon: Hotel,
    title: "Hospitality",
    desc: "Direct reservation systems, guest experience apps, dynamic pricing engines, and multi-location operations.",
  },
  {
    slug: "nonprofits",
    icon: HeartHandshake,
    title: "NGOs & Nonprofits",
    desc: "Donor engagement platforms, impact tracking dashboards, transparent fundraising, and community systems.",
  },
  {
    slug: "saas",
    icon: Cpu,
    title: "SaaS & Technology",
    desc: "Multi-tenant cloud architectures, API-first platforms, AI workflow automation, and enterprise integrations.",
  },
  {
    slug: "professional-services",
    icon: Briefcase,
    title: "Professional Services",
    desc: "Client collaboration portals, automated document intelligence, time & billing engines, and CRM integrations.",
  },
  {
    slug: "retail",
    icon: Store,
    title: "Retail",
    desc: "Omnichannel inventory sync, point-of-sale integration, customer loyalty apps, and demand forecasting systems.",
  },
];

export function Industries() {
  return (
    <section id="industries" className="relative border-t border-white/5 px-4 sm:px-6 py-24 md:py-32 md:px-12">
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Industries</SectionLabel>
          <h2 className="mt-6 text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] sm:leading-[1.05] text-gradient-soft md:text-6xl lg:text-[clamp(3.5rem,4.5vw,4.5rem)]">
            Industries We Serve.
            <br />
            <span className="text-muted-foreground font-medium">Different markets. Same standard of work.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground">
            From startups and growing businesses to established organizations, we build software around the needs of your industry, users, and operations.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 4) * 0.04 }}
            >
              <TiltCard3D className="group relative bg-background border border-white/10 rounded-2xl h-full transition-all duration-300 hover:border-electric/50 hover:bg-surface/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] flex flex-col justify-between overflow-hidden">
                <Link
                  to="/industries/$slug"
                  params={{ slug: ind.slug }}
                  onClick={() => trackGAEvent('industry_click', { button_text: ind.title, page: `/industries/${ind.slug}` })}
                  className="block p-6 sm:p-7 h-full w-full"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-surface text-electric transition-all duration-300 group-hover:border-electric/60 group-hover:glow-electric">
                      <ind.icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-foreground transition-colors group-hover:text-electric">{ind.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{ind.desc}</p>
                </Link>
              </TiltCard3D>
            </motion.div>
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
    <section className="relative border-t border-white/5 px-4 sm:px-6 py-24 md:py-32 md:px-12">
      <DesktopOnly3D load={() => import("./BackgroundScenes").then(m => ({ default: m.NetworkNodes }))} />
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Why Zeploy</SectionLabel>
          <h2 className="mt-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(3.5rem,4.5vw,4.5rem)] font-bold tracking-tight leading-[1.08] sm:leading-[1.05] text-gradient-soft">
            Why high-growth teams partner with us.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-6 md:grid-cols-2">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              >
                <TiltCard3D className="glass-card glass-card-hover group relative overflow-hidden rounded-3xl p-6 sm:p-8 h-full">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
                  <r.icon className="h-8 w-8 text-electric" />
                  <h3 className="mt-6 text-xl font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                </TiltCard3D>
              </motion.div>
            ))}
          </div>

          <div className="relative w-full min-h-[600px] h-full rounded-3xl border border-white/10 bg-surface/20 overflow-hidden hidden lg:block">
            <DesktopOnly3D load={() => import("./InfraVisualization").then(m => ({ default: m.InfraVisualization }))} />
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

  return <span ref={ref} className="tabular-nums inline-block min-w-[2.5ch]">{prefix}{from.toFixed(decimals)}{suffix}</span>;
}

export function Reliability() {
  const bars = Array.from({ length: 40 }, () => 0.6 + Math.random() * 0.4);
  return (
    <section id="reliability" className="relative border-t border-white/5 px-4 sm:px-6 py-24 md:py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Reliability</SectionLabel>
          <h2 className="mt-6 text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] sm:leading-[1.05] text-gradient-soft md:text-6xl lg:text-[clamp(3.5rem,4.5vw,4.5rem)]">
            Operations you can monitor in real time.
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="glass-card mt-12 overflow-hidden rounded-3xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-4 py-3 sm:px-6 sm:py-4 md:px-8">
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

          <div className="grid grid-cols-2 gap-px bg-white/5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {[
              { k: "Deployment Success", v: <AnimatedDecimalCounter from={0} to={99.7} decimals={1} suffix="%" duration={2} />, icon: Rocket },
              { k: "Infra Health", v: "Nominal", icon: Server },
              { k: "Client Satisfaction", v: <AnimatedDecimalCounter from={0} to={4.9} decimals={1} suffix=" / 5" duration={2} />, icon: Sparkles },
              { k: "Response Time", v: <AnimatedDecimalCounter from={0} to={2} decimals={0} prefix="< " suffix="h" duration={2} />, icon: Zap },
              { k: "Uptime (90d)", v: <AnimatedDecimalCounter from={0} to={99.99} decimals={2} suffix="%" duration={2} />, icon: ShieldCheck },
            ].map((m) => (
              <div key={m.k} className="bg-background p-4 sm:p-6">
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
    <section id="process" className="relative border-t border-white/5 px-4 sm:px-6 py-24 md:py-32 md:px-12 overflow-hidden">
      <DesktopOnly3D load={() => import("./BackgroundScenes").then(m => ({ default: m.BlueprintGrid }))} />
      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Process</SectionLabel>
          <h2 className="mt-6 text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] sm:leading-[1.05] text-gradient-soft md:text-6xl lg:text-[clamp(3.5rem,4.5vw,4.5rem)]">
            From signed contract to shipped system.
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-electric/60 via-electric/20 to-transparent md:left-1/2" />
          <div className="space-y-10 sm:space-y-12">
            {process.map((step, i) => (
              <motion.div
                key={step.k}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className={`relative grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative pl-10 sm:pl-12 md:pl-0 md:text-right md:pr-12">
                  <span className="absolute left-0 top-1 h-6 w-6 rounded-full border border-electric/60 bg-background md:left-auto md:right-[-13px] md:top-2">
                    <span className="absolute inset-1.5 rounded-full bg-electric" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-widest text-electric">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl sm:text-2xl font-semibold">{step.k}</h3>
                </div>
                <div className="pl-10 sm:pl-12 md:pl-12">
                  <p className="max-w-md text-sm sm:text-base text-muted-foreground">{step.d}</p>
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
    transform: "scale(1.0) translateY(0%)",
    objectPosition: "center top",
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
    transform: "scale(1.29) translateY(-8.12%)",
    objectPosition: "center bottom",
    socials: {
      linkedin: "https://www.linkedin.com/in/rana-asad-ur-rahman-0a2457339/",
      github: "https://github.com/asad-rana306",
      portfolio: "https://www.ranaasad.dev/"
    }
  },
  {
    name: "Ahsan Rashid",
    role: "CTO & AI Automation Engineer",
    skills: ["AI Automation", "Intelligent Workflows", "Automation Infrastructure"],
    initials: "AR",
    image: imgAhsan,
    transform: "scale(1.15) translateY(0.49%)",
    objectPosition: "center center",
  },
  {
    name: "Hassan Kazmi",
    role: "Managing Partner · Data & Intelligence Lead",
    skills: ["Data Systems", "Research Intelligence", "Analytical Strategy"],
    initials: "HK",
    image: imgHassan,
    transform: "scale(1.14) translateY(4.14%)",
    objectPosition: "center center",
  },
];

export function Team() {
  return (
    <section className="relative border-t border-white/5 px-4 sm:px-6 py-24 md:py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Leadership</SectionLabel>
          <h2 className="mt-6 text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] sm:leading-[1.05] text-gradient-soft md:text-6xl lg:text-[clamp(3.5rem,4.5vw,4.5rem)]">
            Engineering leadership.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
            >
              <TiltCard3D className="glass-card glass-card-hover relative overflow-hidden rounded-3xl p-5 sm:p-10 h-full">
                <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-electric/15 blur-[100px] transition-all duration-500 group-hover:bg-electric/25" />
                <div className="flex flex-col gap-6">
                  <div className="group/avatar relative aspect-square w-[55%] xs:w-[50%] sm:w-[45%] mx-auto p-3 sm:p-4 rounded-2xl border border-electric/20 bg-surface/40 transition-all duration-300 hover:border-electric/50 hover:bg-surface/60">
                    <div className="absolute inset-4 rounded-xl overflow-hidden bg-background transition-transform duration-700 ease-out group-hover/avatar:scale-[1.03]">
                      <img 
                        src={m.image} 
                        alt={m.name} 
                        loading="lazy" 
                        decoding="async"
                        width="400"
                        height="400"
                        style={{ transform: m.transform, objectPosition: m.objectPosition }} 
                        className="h-full w-full object-cover" 
                      />
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
                      <a href={m.socials.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('linkedin_click', { button_text: `${m.name} LinkedIn` })} aria-label={`${m.name} LinkedIn`} className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface/50">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {m.socials.github && (
                      <a href={m.socials.github} target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('contact_click', { button_text: `${m.name} GitHub` })} aria-label={`${m.name} GitHub`} className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface/50">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {(m.socials as any).portfolio && (
                      <a href={(m.socials as any).portfolio} target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('portfolio_click', { button_text: `${m.name} Portfolio Website` })} aria-label={`${m.name} Portfolio`} className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface/50">
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
              </TiltCard3D>
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
              : "fill-muted-foreground/20 text-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="relative border-t border-white/5 px-4 sm:px-6 py-24 md:py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-6 text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] sm:leading-[1.05] text-gradient-soft md:text-6xl lg:text-[clamp(3.5rem,4.5vw,4.5rem)]">
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

        <div className="mt-12 grid gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
            >
              <TiltCard3D className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col h-full">
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
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="font-mono text-[11px] text-electric/60">{t.projectType}</span>
                  </div>
                </figcaption>
              </TiltCard3D>
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
    <section id="insights" className="relative border-t border-white/5 px-4 sm:px-6 py-24 md:py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionLabel>Engineering Notes</SectionLabel>
          <h2 className="mt-6 text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] sm:leading-[1.05] text-gradient-soft md:text-6xl lg:text-[clamp(3.5rem,4.5vw,4.5rem)]">
            Field notes from production systems.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
            >
              <TiltCard3D className="group bg-background border border-white/10 hover:border-electric/40 rounded-2xl overflow-hidden h-full">
                <Link
                  to="/notes/$slug"
                  params={{ slug: p.slug }}
                  onClick={() => trackGAEvent('case_study_click', { button_text: p.title })}
                  className="block p-6 sm:p-10 md:p-12 h-full w-full"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-electric">
                      {p.category}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" />
                  </div>
                  <h3 className="mt-12 text-2xl font-semibold leading-snug text-foreground group-hover:text-electric-soft">
                    {p.title}
                  </h3>
                  <p className="mt-6 font-mono text-xs text-muted-foreground">{p.description}</p>
                </Link>
              </TiltCard3D>
            </motion.div>
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
        trackGAEvent('form_submit', {
          button_text: "Submit Request",
          budget: formData.budget,
          project_type: formData.type,
        });
        setFormData({ name: "", email: "", company: "", budget: "", type: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="relative border-t border-white/5 px-4 sm:px-6 py-24 md:py-32 md:px-12 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-24">
        <motion.div {...fadeUp}>
          <SectionLabel>Project Inquiry</SectionLabel>
          <h2 className="mt-6 text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] sm:leading-[1.05] text-gradient-soft md:text-6xl lg:text-[clamp(3.5rem,4.5vw,4.5rem)]">
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

        <motion.div {...fadeUp} className="glass-card rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12">
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

            <a href="https://wa.me/923033236878" target="_blank" rel="noopener noreferrer" onClick={() => {
              trackGAEvent('whatsapp_click', { button_text: 'Chat on WhatsApp' });
              trackGAEvent('book_call_click', { button_text: 'Chat on WhatsApp' });
            }} className="w-full rounded-xl border border-[#25D366]/20 bg-[#25D366]/10 px-6 py-4 text-sm font-semibold text-[#25D366] transition-all flex items-center justify-center gap-2 hover:bg-[#25D366]/20 hover:border-[#25D366]/50">
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
    <footer className="border-t border-white/5 bg-background pt-16 md:pt-32 pb-12 px-4 sm:px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:gap-10 md:gap-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-b border-white/5 pb-14 sm:pb-20">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex flex-col items-start">
              <img src="/logo.webp" alt="Zeploy Tech" width="48" height="48" className="h-10 w-10 sm:h-12 sm:w-12 object-contain aspect-square mb-4 sm:mb-6" />
              <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-widest text-foreground">
                <span className="text-electric">ZEPLOY</span> TECH
              </h3>
            </div>
            <p className="mt-4 sm:mt-6 max-w-sm text-sm sm:text-base leading-relaxed text-muted-foreground">
              A premium software engineering and AI studio dedicated to building robust, scalable, and visually stunning digital products.
            </p>
            <div className="mt-6 sm:mt-10">
              <p className="font-mono text-xs uppercase tracking-widest text-electric-soft mb-3 sm:mb-4">Contact Us</p>
              <a href="mailto:zeploytech@gmail.com" onClick={() => { trackGAEvent('email_click', { button_text: 'zeploytech@gmail.com text' }); trackGAEvent('contact_click', { button_text: 'zeploytech@gmail.com text' }); }} className="text-foreground text-sm sm:text-lg hover:text-electric transition-colors break-all">zeploytech@gmail.com</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-5 sm:mb-8">Services</h4>
            <ul className="space-y-3 sm:space-y-4 text-sm">
              <FooterLink href="/#services" onClick={() => trackGAEvent('service_click', { button_text: 'Web Applications Footer' })}>Web Applications</FooterLink>
              <FooterLink href="/#services" onClick={() => trackGAEvent('service_click', { button_text: 'Mobile Apps Footer' })}>Mobile Apps</FooterLink>
              <FooterLink href="/#services" onClick={() => trackGAEvent('service_click', { button_text: 'SaaS Development Footer' })}>SaaS Development</FooterLink>
              <FooterLink href="/#services" onClick={() => trackGAEvent('service_click', { button_text: 'AI Systems Footer' })}>AI Systems</FooterLink>
              <FooterLink href="/#services" onClick={() => trackGAEvent('service_click', { button_text: 'Cloud Solutions Footer' })}>Cloud Solutions</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-5 sm:mb-8">Studio</h4>
            <ul className="space-y-3 sm:space-y-4 text-sm">
              <FooterLink href="/#work" onClick={() => trackGAEvent('portfolio_click', { button_text: 'Featured Work Footer' })}>Featured Work</FooterLink>
              <FooterLink href="/#team">Our Team</FooterLink>
              <FooterLink href="/#process">The Process</FooterLink>
              <FooterLink href="/#insights" onClick={() => trackGAEvent('case_study_click', { button_text: 'Engineering Notes Footer' })}>Engineering Notes</FooterLink>
              <FooterLink href="/#faq">FAQ</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-foreground mb-8">Socials</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="https://www.linkedin.com/company/zeploy-tech/" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('linkedin_click', { button_text: 'LinkedIn Footer' })} aria-label="Zeploy Tech LinkedIn" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/zeploy.tech/" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('instagram_click', { button_text: 'Instagram Footer' })} aria-label="Zeploy Tech Instagram" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/zeploytech" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('facebook_click', { button_text: 'Facebook Footer' })} aria-label="Zeploy Tech Facebook" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://wa.me/923033236878" target="_blank" rel="noopener noreferrer" onClick={() => {
                trackGAEvent('whatsapp_click', { button_text: 'WhatsApp Footer' });
                trackGAEvent('book_call_click', { button_text: 'WhatsApp Footer' });
              }} aria-label="Zeploy Tech WhatsApp" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-[#25D366]/20 text-[#25D366] transition-all hover:bg-[#25D366]/20 hover:border-[#25D366]/50 hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.3)]">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="mailto:zeploytech@gmail.com" onClick={() => { trackGAEvent('email_click', { button_text: 'Email Icon Footer' }); trackGAEvent('contact_click', { button_text: 'Email Icon Footer' }); }} aria-label="Zeploy Tech Email" className="p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-foreground transition-all hover:bg-electric hover:border-electric hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
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
    <section className="relative border-t border-white/5 px-4 sm:px-6 py-20 md:py-32 md:px-12 bg-background">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>A Word from the Founder</SectionLabel>
          <h2 className="sr-only">A Word from the Founder</h2>
          <blockquote className="mt-10 sm:mt-12 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.5] sm:leading-[1.4] text-foreground/90 tracking-tight">
            "At Zeploy, our goal is simple: build software that solves real business problems. We focus on scalable systems, modern technology, and long-term value for every client we work with."
          </blockquote>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-full border border-electric/30 bg-surface">
                <img src={imgAsjad} alt="Syed Asjad Abbas" loading="lazy" decoding="async" width="400" height="400" className="h-full w-full object-cover object-top" />
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">Syed Asjad Abbas</div>
                <div className="font-mono text-xs uppercase tracking-widest text-electric mt-1">CEO & Founder</div>
                <div className="flex justify-center gap-3 mt-4">
                  <a href="https://www.linkedin.com/in/syed-asjad-abbas/" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('linkedin_click', { button_text: 'Syed Asjad Abbas LinkedIn' })} className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface"><Linkedin className="w-4 h-4" /></a>
                  <a href="https://github.com/syedasjadabbas" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('contact_click', { button_text: 'Syed Asjad Abbas GitHub' })} className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface"><Github className="w-4 h-4" /></a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-full border border-electric/30 bg-surface">
                <img src={imgAsad} alt="Rana Asad Ur Rehman" loading="lazy" decoding="async" width="400" height="400" className="h-full w-full object-cover object-top" />
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">Rana Asad Ur Rehman</div>
                <div className="font-mono text-xs uppercase tracking-widest text-electric mt-1">Co-Founder</div>
                <div className="flex justify-center gap-3 mt-4">
                  <a href="https://www.linkedin.com/in/rana-asad-ur-rahman-0a2457339/" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('linkedin_click', { button_text: 'Rana Asad Ur Rehman LinkedIn' })} className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface"><Linkedin className="w-4 h-4" /></a>
                  <a href="https://github.com/asad-rana306" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('contact_click', { button_text: 'Rana Asad Ur Rehman GitHub' })} className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface"><Github className="w-4 h-4" /></a>
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
    <section id="faq" className="relative border-t border-white/5 px-4 sm:px-6 py-24 md:py-32 md:px-12 bg-surface/20">
      <div className="mx-auto max-w-4xl">
        <motion.div {...fadeUp} className="text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-6 text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight md:text-5xl lg:text-6xl text-gradient-soft">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="mt-12 sm:mt-16 space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.05 }} className="glass-card rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-4 py-4 sm:px-6 sm:py-5 flex items-start sm:items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-electric rounded-xl gap-3"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-base sm:text-lg font-medium text-foreground/90 leading-snug">{faq.q}</span>
                <span className="mt-0.5 sm:mt-0 shrink-0 text-electric">
                  {open === i ? <Minus className="w-4 h-4 sm:w-5 sm:h-5" /> : <Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
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
