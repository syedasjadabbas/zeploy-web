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
import { CodeWindow } from "./CodeWindow";
import type { CodeSnippet } from "@/data/codeSnippets";
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
  codeSnippet?: CodeSnippet;
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
  codeSnippet,
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
    <main className="relative min-h-screen bg-bg text-text selection:bg-primary/30">
      <Nav />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 md:px-12 overflow-hidden">
        <div className="mx-auto max-w-6xl relative z-10">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 font-mono text-xs text-text-subtle mb-8"
          >
            <Link
              to="/"
              className="hover:text-[#B9D0FF] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Studio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-border-strong" />
            <Link
              to="/"
              hash={category === "Service" ? "services" : "industries"}
              className="hover:text-[#B9D0FF] transition-colors"
            >
              {category === "Service" ? "Services" : "Industries"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-border-strong" />
            <span className="text-accent-text font-medium truncate max-w-[200px] sm:max-w-none">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-highlight-border bg-highlight-bg text-accent-text text-[14px] font-medium tracking-normal mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {category === "Service" ? "Service Capability" : "Industry Practice"}
            </div>

            <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.022em] leading-[1.05] text-text-heading">
              {title}
            </h1>

            <p className="mt-6 text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-text-muted">
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
                className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-primary px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-on-primary shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-colors hover:bg-primary-hover"
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
                className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-border-strong bg-transparent px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-medium text-text transition-colors hover:bg-surface-hover"
              >
                <MessageCircle className="w-4 h-4 text-accent-text" />
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
            <div className="glass-card overflow-hidden rounded-2xl sm:rounded-3xl border border-border">
              {/* Browser Window Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-border-strong" />
                  <span className="w-3 h-3 rounded-full bg-border-strong" />
                  <span className="w-3 h-3 rounded-full bg-border-strong" />
                  <span className="ml-3 font-mono text-[11px] text-text-subtle">
                    zeploy.tech/{category.toLowerCase()}s/
                    {title.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent-text">
                    Production Architecture
                  </span>
                </div>
              </div>

              {/* Main Visual Image */}
              <div className="relative aspect-[16/10] w-full bg-bg overflow-hidden">
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
      <section className="relative border-t border-border py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-bg">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="max-w-3xl mb-16">
            <span className="text-[14px] sm:text-[15px] font-medium tracking-normal text-accent-text">
              Strategic Overview
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.022em] text-text-heading">
              Engineering with purpose & precision.
            </h2>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-text-muted leading-relaxed">
              {overview}
            </p>
          </motion.div>

          <div className="mt-12">
            <h3 className="text-[14px] sm:text-[15px] font-medium tracking-normal text-accent-text mb-6">
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
                      <div className="w-10 h-10 rounded-[8px] bg-highlight-bg border border-highlight-border flex items-center justify-center text-accent-text mb-6 font-mono font-bold text-sm">
                        0{idx + 1}
                      </div>
                      <h4 className="text-xl font-semibold text-text-heading mb-3">
                        {item.heading}
                      </h4>
                      <p className="text-sm leading-relaxed text-text-muted">
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
      <section className="relative border-t border-border py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-bg">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="max-w-3xl mb-12">
            <span className="text-[14px] sm:text-[15px] font-medium tracking-normal text-accent-text">
              Capabilities & Deliverables
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.022em] text-text-heading">
              {deliverablesOrSolutionsTitle}
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deliverablesOrSolutions.map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: idx * 0.04 }}
                className="flex items-start gap-3.5 p-5 rounded-xl border border-border bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
              >
                <CheckCircle2 className="w-5 h-5 text-accent-text shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base font-medium text-text leading-snug">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Use Cases (For Industries) */}
          {useCases && useCases.length > 0 && (
            <div className="mt-20">
              <h3 className="text-[14px] sm:text-[15px] font-medium tracking-normal text-accent-text mb-8">
                Target Architecture Use Cases
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {useCases.map((uc, i) => (
                  <motion.div
                    key={uc.title}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                    className="p-6 sm:p-8 rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                  >
                    <div className="flex items-center gap-2 text-accent-text font-mono text-xs uppercase tracking-widest mb-3">
                      <Sparkles className="w-4 h-4" />
                      Use Case 0{i + 1}
                    </div>
                    <h4 className="text-xl font-semibold text-text-heading mb-2">
                      {uc.title}
                    </h4>
                    <p className="text-sm text-text-muted leading-relaxed">
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
              <h3 className="text-[14px] sm:text-[15px] font-medium tracking-normal text-accent-text mb-8">
                Key Technical Disciplines
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                {(capabilities as { label: string; items: string[] }[]).map((cap, i) => (
                  <motion.div
                    key={cap.label}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                    className="p-6 sm:p-8 rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                  >
                    <h4 className="text-lg font-semibold text-text-heading mb-4">
                      {cap.label}
                    </h4>
                    <ul className="space-y-2">
                      {cap.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-text-muted"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
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
        <section className="relative border-t border-border py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-bg">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-3xl mb-12">
              <span className="text-[14px] sm:text-[15px] font-medium tracking-normal text-accent-text">
                Engineering Foundation
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.022em] text-text-heading">
                {stackOrTechTitle}
              </h2>
            </motion.div>

            {category === "Service" ? (
              <div className="flex flex-wrap gap-3">
                {stackOrTechConsiderations.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-[8px] border border-highlight-border bg-highlight-bg px-5 py-3 font-mono text-sm sm:text-base font-medium text-text"
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
                    className="p-5 sm:p-6 rounded-xl border border-border bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.3)] flex items-start gap-4"
                  >
                    <Zap className="w-5 h-5 text-accent-text shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                      {c}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* --- CODE WINDOW PRODUCTION BLUEPRINT --- */}
      {codeSnippet && (
        <section className="relative border-t border-border py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-bg">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-3xl mb-10">
              <span className="text-[14px] sm:text-[15px] font-medium tracking-normal text-accent-text">
                Engineering Blueprint
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.022em] text-text-heading">
                Architecture in code.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-text-muted">
                Type-safe primitives and production patterns engineered specifically for {title.toLowerCase()}.
              </p>
            </motion.div>

            <motion.div {...fadeUp}>
              <CodeWindow
                fileName={codeSnippet.fileName}
                language={codeSnippet.language}
                code={codeSnippet.code}
                status={codeSnippet.status}
                badge={codeSnippet.badge}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* --- DEVELOPMENT APPROACH (If present) --- */}
      {approach && approach.length > 0 && (
        <section className="relative border-t border-border py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-bg">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-3xl mb-16">
              <span className="text-[14px] sm:text-[15px] font-medium tracking-normal text-accent-text">
                The Methodology
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.022em] text-text-heading">
                How we take ideas from discovery to deployment.
              </h2>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {approach.map((step, idx) => (
                <motion.div
                  key={step.step}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: idx * 0.06 }}
                  className="p-6 sm:p-8 rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.3)] flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-accent-text mb-3">
                      Phase 0{idx + 1}
                    </div>
                    <h4 className="text-xl font-semibold text-text-heading mb-3">
                      {step.step}
                    </h4>
                    <p className="text-sm text-text-muted leading-relaxed">
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
        <section className="relative border-t border-border py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-bg">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[14px] sm:text-[15px] font-medium tracking-normal text-accent-text">
                  Proven Track Record
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-[-0.022em] text-text-heading">
                  Representative Work in this Space
                </h2>
              </div>
              <Link
                to="/"
                hash="work"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text hover:text-[#B9D0FF]"
              >
                View all case studies <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p) => (
                <div
                  key={p.name}
                  className="p-6 rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.3)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-mono text-xs uppercase tracking-widest text-accent-text">
                        {p.kind}
                      </span>
                    </div>
                    <h4 className="text-2xl font-semibold text-text-heading">{p.name}</h4>
                  </div>
                  <Link
                    to="/"
                    hash="work"
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono text-accent-text hover:text-[#B9D0FF]"
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
        <section className="relative border-t border-border py-16 px-4 sm:px-6 md:px-12 bg-bg">
          <div className="mx-auto max-w-6xl">
            <h3 className="text-[14px] sm:text-[15px] font-medium tracking-normal text-accent-text mb-6">
              {relatedLinksTitle}
            </h3>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                link.type === "services" ? (
                  <Link
                    key={link.slug}
                    to="/services/$slug"
                    params={{ slug: link.slug }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] border border-border-strong bg-surface hover:bg-surface-hover text-text text-sm font-medium transition-colors"
                  >
                    <Layers className="w-4 h-4 text-accent-text" />
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 text-text-subtle" />
                  </Link>
                ) : (
                  <Link
                    key={link.slug}
                    to="/industries/$slug"
                    params={{ slug: link.slug }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] border border-border-strong bg-surface hover:bg-surface-hover text-text text-sm font-medium transition-colors"
                  >
                    <Layers className="w-4 h-4 text-accent-text" />
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 text-text-subtle" />
                  </Link>
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- FAQ SECTION --- */}
      <section className="relative border-t border-border py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-bg">
        <div className="mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-[14px] sm:text-[15px] font-medium tracking-normal text-accent-text">
              Common Inquiries
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.022em] text-text-heading">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {faq.map((item, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl overflow-hidden border border-border"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-start sm:items-center justify-between text-left focus:outline-none gap-3"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-base sm:text-lg font-medium text-text-heading leading-snug">
                    {item.q}
                  </span>
                  <span className="mt-0.5 sm:mt-0 shrink-0 text-accent-text">
                    {openFaq === i ? (
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </span>
                </button>
                <div
                  className="px-6 text-text-muted leading-relaxed transition-all duration-300 ease-in-out overflow-hidden"
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
        className="relative border-t border-border py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-bg overflow-hidden"
      >
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div {...fadeUp}>
            <span className="text-[14px] sm:text-[15px] font-medium tracking-normal text-accent-text">
              Start an Engagement
            </span>
            <h2 className="mt-4 text-3xl xs:text-4xl sm:text-5xl font-semibold tracking-[-0.022em] leading-[1.08] text-text-heading">
              Let's engineer your {title.toLowerCase()} system.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-text-muted leading-relaxed">
              Share your project scope, technical requirements, or business goals. We review all
              inquiries and respond within 24 hours with an architectural consultation.
            </p>

            <div className="mt-8 space-y-4 font-mono text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-text" />
                Response within 24 hours
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-text" />
                Complimentary technical discovery session
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-text" />
                Full repository and IP ownership
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-border"
          >
            <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-text-subtle mb-1.5 block">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-[8px] border border-border-strong bg-surface px-4 py-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-text-subtle mb-1.5 block">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-[8px] border border-border-strong bg-surface px-4 py-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-text-subtle mb-1.5 block">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-[8px] border border-border-strong bg-surface px-4 py-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-text-subtle mb-1.5 block">
                  Project Description
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={`Tell us about your ${title} requirements, timeline, or scope...`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-[8px] border border-border-strong bg-surface px-4 py-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              {status === "success" && (
                <div className="text-accent-text text-sm font-medium">
                  Your inquiry has been received! Our team will contact you within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="text-destructive text-sm font-medium">
                  Failed to send inquiry. Please email us directly at zeploytech@gmail.com.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-[8px] bg-primary px-6 py-4 text-sm font-semibold text-on-primary shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-colors hover:bg-primary-hover disabled:opacity-50"
              >
                {status === "loading" ? "Submitting..." : "Submit Project Inquiry"}
              </button>

              <div className="flex items-center justify-center my-1">
                <span className="text-[10px] uppercase tracking-widest text-text-subtle font-mono">
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
                className="w-full rounded-[8px] border border-border-strong bg-transparent px-6 py-3.5 text-sm font-semibold text-text transition-colors flex items-center justify-center gap-2 hover:bg-surface-hover"
              >
                <MessageCircle className="w-4 h-4 text-accent-text" />
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
