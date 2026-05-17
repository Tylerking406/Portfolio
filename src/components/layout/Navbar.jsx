import { useState, useEffect } from "react";
import { personal } from "../../data/portfolio";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(10, 10, 15, 0.92)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(30, 30, 48, 0.8)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{ textDecoration: "none" }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: "0.85rem",
              color: "var(--accent-cyan)",
              letterSpacing: "0.1em",
            }}
          >
            &lt;AN /&gt;
          </span>
        </a>

        {/* Desktop nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "32px" }}
          className="desktop-nav"
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(link.href.slice(1));
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                textDecoration: "none",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:
                  activeSection === link.href.slice(1)
                    ? "var(--accent-cyan)"
                    : "var(--text-secondary)",
                transition: "color 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color =
                  activeSection === link.href.slice(1)
                    ? "var(--accent-cyan)"
                    : "var(--text-secondary)")
              }
            >
              <span style={{ color: "var(--text-muted)", marginRight: "4px" }}>
                0{i + 1}.
              </span>
              {link.label}
            </a>
          ))}
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ fontSize: "0.68rem", padding: "8px 18px" }}
          >
            GitHub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "var(--text-primary)",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <div
            style={{
              width: "22px",
              height: "2px",
              background: menuOpen ? "var(--accent-cyan)" : "var(--text-primary)",
              transition: "all 0.2s",
              transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              marginBottom: "4px",
            }}
          />
          <div
            style={{
              width: "22px",
              height: "2px",
              background: menuOpen ? "transparent" : "var(--text-primary)",
              transition: "all 0.2s",
            }}
          />
          <div
            style={{
              width: "22px",
              height: "2px",
              background: menuOpen ? "var(--accent-cyan)" : "var(--text-primary)",
              transition: "all 0.2s",
              transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
              marginTop: "4px",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(10, 10, 15, 0.98)",
            borderTop: "1px solid var(--border)",
            padding: "20px 24px",
          }}
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(link.href.slice(1));
                if (el) el.scrollIntoView({ behavior: "smooth" });
                setMenuOpen(false);
              }}
              style={{
                display: "block",
                padding: "12px 0",
                textDecoration: "none",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span style={{ color: "var(--accent-cyan)", marginRight: "10px" }}>
                0{i + 1}.
              </span>
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
