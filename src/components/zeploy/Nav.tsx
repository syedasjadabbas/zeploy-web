import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#team", label: "Team" },
    { href: "#insights", label: "Notes" },
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
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="mailto:hello@zeploytech.com"
          className="rounded-full border border-white/10 bg-surface/60 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-electric/50 hover:text-electric"
        >
          Start a project
        </a>
      </div>
    </header>
  );
}
