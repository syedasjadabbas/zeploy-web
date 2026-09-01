import { useEffect, useState } from "react";
import { Menu, X, Linkedin, Instagram, Facebook } from "lucide-react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { trackGAEvent } from "../../lib/analytics";
import { ThemeToggle } from "./ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate({ to: "/" }).then(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    const sections = ["hero", "services", "why-zeploy", "work", "team", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { href: "/#hero", label: "Home", id: "hero" },
    { href: "/#services", label: "Services", id: "services" },
    { href: "/#why-zeploy", label: "Why Zeploy", id: "why-zeploy" },
    { href: "/#work", label: "Our Work", id: "work" },
    { href: "/#team", label: "Team", id: "team" },
    { href: "/#contact", label: "Contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 100);
      });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "backdrop-blur-xl bg-background/80" : ""
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 py-3.5 md:py-4 md:px-12 ${scrolled || mobileOpen ? "border-b border-border" : ""}`}>
        <a
          href="/"
          onClick={handleBrandClick}
          className="flex items-center gap-2 sm:gap-2.5 font-display text-sm sm:text-base font-semibold tracking-tight cursor-pointer shrink-0"
          aria-label="Zeploy Tech Home"
        >
          <img
            src="/logo.webp"
            alt="Zeploy Tech Logo"
            fetchPriority="high"
            width="28"
            height="28"
            className="h-6 w-6 sm:h-7 sm:w-7 object-contain aspect-square shrink-0"
          />
          <span><span className="text-electric">ZEPLOY</span> <span className="text-foreground">TECH</span></span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                handleNavClick(e, l.id);
                if (l.id === 'services') trackGAEvent('service_click', { button_text: l.label });
                if (l.id === 'work') trackGAEvent('portfolio_click', { button_text: l.label });
                if (l.id === 'contact') trackGAEvent('contact_click', { button_text: l.label });
              }}
              className={`relative font-mono text-xs uppercase tracking-widest transition-colors ${
                activeSection === l.id ? "text-electric" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
              {activeSection === l.id && (
                <span className="absolute -bottom-2 left-0 h-px w-full bg-electric shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2 mr-1">
            <a href="https://www.linkedin.com/company/zeploy-tech/" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('linkedin_click', { button_text: 'LinkedIn Header' })} aria-label="LinkedIn" className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface"><Linkedin className="w-4 h-4" /></a>
            <a href="https://www.instagram.com/zeploy.tech/" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('instagram_click', { button_text: 'Instagram Header' })} aria-label="Instagram" className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface"><Instagram className="w-4 h-4" /></a>
            <a href="https://www.facebook.com/zeploytech" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('facebook_click', { button_text: 'Facebook Header' })} aria-label="Facebook" className="text-muted-foreground hover:text-electric transition-colors p-1.5 rounded-md hover:bg-surface"><Facebook className="w-4 h-4" /></a>
          </div>

          <ThemeToggle />

          <a
            href="mailto:zeploytech@gmail.com?subject=Project%20Inquiry%20-%20Portfolio%20Website"
            onClick={() => {
              trackGAEvent('email_click', { button_text: 'Start a project' });
              trackGAEvent('contact_click', { button_text: 'Start a project' });
            }}
            className="rounded-full border border-white/10 dark:border-white/10 bg-surface/60 px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-foreground transition-colors hover:border-electric/50 hover:text-electric whitespace-nowrap"
          >
            Start a project
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/10 dark:border-white/10 bg-surface/60 text-foreground transition-colors hover:border-electric/50 hover:text-electric md:hidden shrink-0"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen ? "max-h-[min(500px,calc(100dvh-4.5rem))] opacity-100 bg-background/95 backdrop-blur-xl" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl border-t border-border px-6 py-4 overflow-y-auto max-h-[calc(100dvh-4.5rem)] overscroll-contain">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  handleNavClick(e, l.id);
                  if (l.id === 'services') trackGAEvent('service_click', { button_text: l.label });
                  if (l.id === 'work') trackGAEvent('portfolio_click', { button_text: l.label });
                  if (l.id === 'contact') trackGAEvent('contact_click', { button_text: l.label });
                }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 font-mono text-sm uppercase tracking-widest transition-colors ${
                  activeSection === l.id
                    ? "bg-electric/10 text-electric"
                    : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
                }`}
              >
                {activeSection === l.id && (
                  <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                )}
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-center gap-4">
            <a href="https://www.linkedin.com/company/zeploy-tech/" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('linkedin_click', { button_text: 'LinkedIn Mobile Header' })} aria-label="LinkedIn" className="text-muted-foreground hover:text-electric transition-colors p-3 rounded-xl border border-border bg-surface/50 flex items-center justify-center"><Linkedin className="w-5 h-5" /></a>
            <a href="https://www.instagram.com/zeploy.tech/" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('instagram_click', { button_text: 'Instagram Mobile Header' })} aria-label="Instagram" className="text-muted-foreground hover:text-electric transition-colors p-3 rounded-xl border border-border bg-surface/50 flex items-center justify-center"><Instagram className="w-5 h-5" /></a>
            <a href="https://www.facebook.com/zeploytech" target="_blank" rel="noopener noreferrer" onClick={() => trackGAEvent('facebook_click', { button_text: 'Facebook Mobile Header' })} aria-label="Facebook" className="text-muted-foreground hover:text-electric transition-colors p-3 rounded-xl border border-border bg-surface/50 flex items-center justify-center"><Facebook className="w-5 h-5" /></a>
          </div>
        </nav>
      </div>
    </header>
  );
}
