import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Layers,
  MessageCircle,
  Plus,
  Minus,
  Sparkles,
  Zap,
} from "lucide-react";
import Nav from "./Nav";
import { Footer } from "./Sections";
import { TiltCard3D } from "./TiltCard3D";
import { trackGAEvent } from "../../lib/analytics";

interface DetailPageProps {
  category: "Service" | "Industry";
  title: string;
  tagline: string;
  overview: string;
  image: string;
  imageAlt: string;
  problemsOrChallengesTitle?: string;
  problemsOrChallenges: { heading: string; body: string }[];
  deliverablesOrSolutionsTitle?: string;
  deliverablesOrSolutions: string[];
  capabilities?: { label: string; items: string[] }[] | string[];
  stackOrTechConsiderations?: string[];
  stackOrTechTitle?: string;
  useCases?: { title: string; desc: string }[];
  approach?: { step: string; desc: string }[];
  relatedProjects?: { name: string; kind: string }[];
  relatedLinks?: { label: string; slug: string; type: "services" | "industries" }[];
  relatedLinksTitle?: string;
  faq: { q: string; a: string }[];
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export function DetailPageLayout({
  category,
  title,
  tagline,
  overview,
  image,
  imageAlt,
  problemsOrChallengesTitle = "Problems We Solve",
  problemsOrChallenges,
  deliverablesOrSolutionsTitle = "What We Deliver",
  deliverablesOrSolutions,
  capabilities,
  stackOrTechConsiderations,
  stackOrTechTitle = "Technology & Infrastructure",
  useCases,
  approach,
  relatedProjects,
  relatedLinks,
  relatedLinksTitle = "Related Areas",
  faq,
}: DetailPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    type: title,
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/mykavaol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        trackGAEvent("form_submit", {
          button_text: "Submit Request Detail Page",
          project_type: formData.type,
          page_title: title,
        });
        setFormData({ name: "", email: "", company: "", budget: "", type: title, message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-electric/30">
      <Nav />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 md:px-12 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-electric/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-6xl relative z-10">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 font-mono text-xs text-muted-foreground mb-8"
          >
            <Link
              to="/"
              className="hover:text-electric transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Studio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
            <Link
              to="/"
              hash={category === "Service" ? "services" : "industries"}
              className="hover:text-electric transition-colors"
            >
              {category === "Service" ? "Services" : "Industries"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
            <span className="text-electric font-medium truncate max-w-[200px] sm:max-w-none">
              {title}
            </span>
          </motion.div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric/30 bg-electric/10 text-electric font-mono text-xs uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
              {category === "Service" ? "Service Capability" : "Industry Practice"}
            </div>

            <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-gradient-soft">
              {title}
            </h1>

            <p className="mt-6 text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-muted-foreground">
              {tagline}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#inquiry"
                onClick={() =>
                  trackGAEvent("contact_click", {
                    button_text: "Start a Project Hero",
                    page: title,
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-primary-foreground shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all hover:scale-105 hover:glow-electric"
              >
                Discuss Your Project
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="https://wa.me/923033236878"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGAEvent("whatsapp_click", {
                    button_text: "Chat on WhatsApp Detail",
                    page: title,
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 dark:border-white/10 bg-surface/60 px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-medium text-foreground backdrop-blur-md transition-colors hover:border-electric/50 hover:text-electric"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                Direct WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-12 sm:mt-16 relative"
          >
            <div className="glass-card overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(11,21,53,0.3)]">
              {/* Browser Window Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-surface/80 border-b border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 font-mono text-[11px] text-muted-foreground">
                    zeploy.tech/{category.toLowerCase()}s/
                    {title.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-electric">
                    Production Architecture
                  </span>
                </div>
              </div>

              {/* Main Visual Image */}
              <div className="relative aspect-[16/10] w-full bg-surface-2 overflow-hidden">
                <img
                  src={image}
                  alt={imageAlt}
                  width="1600"
                  height="1000"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- OVERVIEW & PROBLEMS / CHALLENGES --- */}
      <section className="relative border-t border-white/5 py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-surface/20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] font-medium text-electric">
              Strategic Overview
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-soft">
              Engineering with purpose & precision.
            </h2>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {overview}
            </p>
          </motion.div>

          <div className="mt-12">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              {problemsOrChallengesTitle}
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {problemsOrChallenges.map((item, idx) => (
                <motion.div
                  key={item.heading}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: idx * 0.08 }}
                >
                  <TiltCard3D className="glass-card glass-card-hover p-6 sm:p-8 rounded-2xl h-full flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-electric/10 border border-electric/30 flex items-center justify-center text-electric mb-6 font-mono font-bold text-sm">
                        0{idx + 1}
                      </div>
                      <h4 className="text-xl font-semibold text-foreground mb-3">
                        {item.heading}
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </TiltCard3D>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT WE DELIVER / SOLUTIONS --- */}
      <section className="relative border-t border-white/5 py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-background">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="max-w-3xl mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.25em] font-medium text-electric">
              Capabilities & Deliverables
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-soft">
              {deliverablesOrSolutionsTitle}
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deliverablesOrSolutions.map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: idx * 0.04 }}
                className="flex items-start gap-3.5 p-5 rounded-xl border border-white/10 bg-surface/40"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base font-medium text-foreground/90 leading-snug">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Use Cases (For Industries) */}
          {useCases && useCases.length > 0 && (
            <div className="mt-20">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
                Target Architecture Use Cases
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {useCases.map((uc, i) => (
                  <motion.div
                    key={uc.title}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                    className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-surface/30"
                  >
                    <div className="flex items-center gap-2 text-electric font-mono text-xs uppercase tracking-widest mb-3">
                      <Sparkles className="w-4 h-4" />
                      Use Case 0{i + 1}
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-2">
                      {uc.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {uc.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Structured Capabilities Breakdown (For Services) */}
          {capabilities && Array.isArray(capabilities) && typeof capabilities[0] === "object" && (
            <div className="mt-20">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
                Key Technical Disciplines
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                {(capabilities as { label: string; items: string[] }[]).map((cap, i) => (
                  <motion.div
                    key={cap.label}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                    className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-surface/30"
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      {cap.label}
                    </h4>
                    <ul className="space-y-2">
                      {cap.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-electric" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- TECH STACK & CONSIDERATIONS --- */}
      {stackOrTechConsiderations && stackOrTechConsiderations.length > 0 && (
        <section className="relative border-t border-white/5 py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-surface/20">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-3xl mb-12">
              <span className="font-mono text-xs uppercase tracking-[0.25em] font-medium text-electric">
                Engineering Foundation
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gradient-soft">
                {stackOrTechTitle}
              </h2>
            </motion.div>

            {category === "Service" ? (
              <div className="flex flex-wrap gap-3">
                {stackOrTechConsiderations.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-white/10 bg-surface/60 px-5 py-3 font-mono text-sm sm:text-base font-medium text-foreground shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {stackOrTechConsiderations.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-xl border border-white/10 bg-surface/40 flex items-start gap-4"
                  >
                    <Zap className="w-5 h-5 text-electric shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {c}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- DEVELOPMENT APPROACH (If present) --- */}
      {approach && approach.length > 0 && (
        <section className="relative border-t border-white/5 py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-background">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-3xl mb-16">
              <span className="font-mono text-xs uppercase tracking-[0.25em] font-medium text-electric">
                The Methodology
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gradient-soft">
                How we take ideas from discovery to deployment.
              </h2>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {approach.map((step, idx) => (
                <motion.div
                  key={step.step}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: idx * 0.06 }}
                  className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-surface/30 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-electric mb-3">
                      Phase 0{idx + 1}
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">
                      {step.step}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- RELEVANT PROJECTS --- */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="relative border-t border-white/5 py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-surface/20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] font-medium text-electric">
                  Proven Track Record
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gradient-soft">
                  Representative Work in this Space
                </h2>
              </div>
              <Link
                to="/"
                hash="work"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-electric hover:text-electric-soft"
              >
                View all case studies <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p) => (
                <div
                  key={p.name}
                  className="p-6 rounded-2xl border border-white/10 bg-surface/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-electric" />
                      <span className="font-mono text-xs uppercase tracking-widest text-electric">
                        {p.kind}
                      </span>
                    </div>
                    <h4 className="text-2xl font-semibold text-foreground">{p.name}</h4>
                  </div>
                  <Link
                    to="/"
                    hash="work"
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-electric"
                  >
                    View project details <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- RELATED INTERNAL LINKS --- */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section className="relative border-t border-white/5 py-16 px-4 sm:px-6 md:px-12 bg-background">
          <div className="mx-auto max-w-6xl">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              {relatedLinksTitle}
            </h3>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.slug}
                  to={`/${link.type}/$slug` as any}
                  params={{ slug: link.slug }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-surface/40 hover:border-electric/50 hover:text-electric text-sm font-medium transition-colors"
                >
                  <Layers className="w-4 h-4 text-electric" />
                  {link.label}
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- FAQ SECTION --- */}
      <section className="relative border-t border-white/5 py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-surface/20">
        <div className="mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.25em] font-medium text-electric">
              Common Inquiries
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-soft">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {faq.map((item, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl overflow-hidden border border-white/10"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-start sm:items-center justify-between text-left focus:outline-none gap-3"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-base sm:text-lg font-medium text-foreground/90 leading-snug">
                    {item.q}
                  </span>
                  <span className="mt-0.5 sm:mt-0 shrink-0 text-electric">
                    {openFaq === i ? (
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </span>
                </button>
                <div
                  className="px-6 text-muted-foreground leading-relaxed transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: openFaq === i ? "400px" : "0",
                    paddingBottom: openFaq === i ? "1.25rem" : "0",
                    opacity: openFaq === i ? 1 : 0,
                  }}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INQUIRY FORM / BOTTOM CTA --- */}
      <section
        id="inquiry"
        className="relative border-t border-white/5 py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-background overflow-hidden"
      >
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div {...fadeUp}>
            <span className="font-mono text-xs uppercase tracking-[0.25em] font-medium text-electric">
              Start an Engagement
            </span>
            <h2 className="mt-4 text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] text-gradient-soft">
              Let's engineer your {title.toLowerCase()} system.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Share your project scope, technical requirements, or business goals. We review all
              inquiries and respond within 24 hours with an architectural consultation.
            </p>

            <div className="mt-8 space-y-4 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Response within 24 hours
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Complimentary technical discovery session
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Full repository and IP ownership
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/10"
          >
            <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5 block">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5 block">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Project Description
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={`Tell us about your ${title} requirements, timeline, or scope...`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric resize-none"
                />
              </div>

              {status === "success" && (
                <div className="text-emerald-400 text-sm font-medium">
                  Your inquiry has been received! Our team will contact you within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="text-red-400 text-sm font-medium">
                  Failed to send inquiry. Please email us directly at zeploytech@gmail.com.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-electric px-6 py-4 text-sm font-semibold text-primary-foreground transition-all hover:glow-electric hover:scale-[1.01] disabled:opacity-50"
              >
                {status === "loading" ? "Submitting..." : "Submit Project Inquiry"}
              </button>

              <div className="flex items-center justify-center my-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                  Or message us directly
                </span>
              </div>

              <a
                href="https://wa.me/923033236878"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackGAEvent("whatsapp_click", {
                    button_text: "WhatsApp Detail Footer",
                    page: title,
                  })
                }
                className="w-full rounded-xl border border-[#25D366]/20 bg-[#25D366]/10 px-6 py-3.5 text-sm font-semibold text-[#25D366] transition-all flex items-center justify-center gap-2 hover:bg-[#25D366]/20"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
