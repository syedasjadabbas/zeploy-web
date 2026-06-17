import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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
        scrolled ? "backdrop-blur-xl" : ""
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 ${scrolled ? "border-b border-white/5" : ""}`}>
        <a href="#" className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
          <img src="/logo.png" alt="Zeploy Tech Logo" className="h-6 w-auto" />
          <span><span className="text-electric">ZEPLOY</span> <span className="text-foreground">TECH</span></span>
        </a>
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
        <a
          href="#contact"
          className="rounded-full border border-white/10 bg-surface/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-electric/50 hover:text-electric"
        >
          Start a project
        </a>
      </div>
    </header>
  );
}
