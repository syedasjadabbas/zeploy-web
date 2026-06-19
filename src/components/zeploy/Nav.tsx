import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

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
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    const sections = ["services", "work", "reliability", "team", "stack", "contact"];
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
    { href: "#services", label: "Services", id: "services" },
    { href: "#work", label: "Work", id: "work" },
    { href: "#reliability", label: "Reliability", id: "reliability" },
    { href: "#team", label: "Team", id: "team" },
    { href: "#stack", label: "Tech Stack", id: "stack" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "backdrop-blur-xl" : ""
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 ${scrolled || mobileOpen ? "border-b border-white/5" : ""}`}>
        <a href="#" className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
          <img src="/logo.png" alt="Zeploy Tech Logo" className="h-6 w-auto" />
          <span><span className="text-electric">ZEPLOY</span> <span className="text-foreground">TECH</span></span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
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

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="rounded-full border border-white/10 bg-surface/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-electric/50 hover:text-electric"
          >
            Start a project
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-surface/60 text-foreground transition-colors hover:border-electric/50 hover:text-electric md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl border-t border-white/5 px-6 py-4">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
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
        </nav>
      </div>
    </header>
  );
}
