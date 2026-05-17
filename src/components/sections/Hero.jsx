import { useEffect, useState } from "react";
import { personal } from "../../data/portfolio";
import { Mail, MapPin, ArrowDown, ExternalLink, Download } from "lucide-react";
import HeroCanvas from "./HeroCanvas";

const ROLES = [
  "Full-Stack Engineer",
  "Backend Architect",
  ".NET Core Specialist",
  "React Developer",
  "Cloud-Native Builder",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 62);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section
      id="hero"
      className="grid-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "64px",
      }}
    >
      {/* Background glows */}
      <div style={{
        position: "absolute", top: "15%", right: "5%",
        width: "700px", height: "700px",
        background: "radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-5%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(255,184,0,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 24px", width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        alignItems: "center",
      }} className="hero-grid">

        {/* LEFT — Text content */}
        <div>
          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            marginBottom: "28px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.6s ease 0.1s",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#00ff88", display: "inline-block",
              boxShadow: "0 0 8px #00ff88",
              animation: "glowPulse 2s ease-in-out infinite",
            }} />
            <span className="font-mono" style={{
              fontSize: "0.65rem", letterSpacing: "0.15em",
              textTransform: "uppercase", color: "var(--text-secondary)",
            }}>
              {personal.availability}
            </span>
            <span style={{ color: "var(--border-bright)" }}>·</span>
            <span className="font-mono" style={{
              fontSize: "0.65rem", letterSpacing: "0.1em",
              color: "var(--text-muted)",
              display: "flex", alignItems: "center", gap: "4px",
            }}>
              <MapPin size={10} /> {personal.location}
            </span>
          </div>

          {/* Name */}
          <h1 className="font-display" style={{
            fontSize: "clamp(44px, 6.5vw, 80px)",
            fontWeight: 800, lineHeight: 0.95,
            letterSpacing: "-0.025em", marginBottom: "6px",
            color: "var(--text-primary)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            Arinao
          </h1>
          <h1 className="font-display" style={{
            fontSize: "clamp(44px, 6.5vw, 80px)",
            fontWeight: 800, lineHeight: 0.95,
            letterSpacing: "-0.025em", marginBottom: "24px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.3s",
          }}>
            <span className="gradient-text-cyan">Ndou</span>
          </h1>

          {/* Typewriter */}
          <div style={{ height: "32px", marginBottom: "20px", opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 0.5s" }}>
            <span className="font-mono" style={{ fontSize: "clamp(12px, 1.6vw, 16px)", color: "var(--accent-cyan)", letterSpacing: "0.05em" }}>
              &gt; {displayed}
              <span style={{ color: "var(--accent-gold)", animation: "blink 1s step-end infinite" }}>_</span>
            </span>
          </div>

          {/* Tagline */}
          <p style={{
            fontSize: "clamp(14px, 1.5vw, 16px)",
            color: "var(--text-secondary)", lineHeight: 1.75,
            maxWidth: "460px", marginBottom: "36px", fontWeight: 300,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.7s ease 0.5s",
          }}>
            {personal.tagline}
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "40px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.7s ease 0.65s",
          }}>
            <button className="btn-primary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Get in touch
            </button>
            <a
              href="/Arinao_Ndou_CV.pdf"
              download="Arinao_Ndou_CV.pdf"
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                fontFamily: "'Space Mono', monospace", fontSize: "0.72rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--text-muted)", textDecoration: "none",
                padding: "11px 20px",
                border: "1px solid var(--border)",
                transition: "all 0.2s ease",
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--accent-gold)"; e.currentTarget.style.borderColor = "rgba(255,184,0,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              <Download size={13} />
              CV
            </a>
          </div>

          {/* Social row */}
          <div style={{
            display: "flex", gap: "24px", alignItems: "center",
            opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 0.8s",
          }}>
            {[
              { label: "GitHub", href: personal.github },
              { label: "LinkedIn", href: personal.linkedin },
              { label: "Email", href: `mailto:${personal.email}` },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="font-mono"
                style={{
                  textDecoration: "none", fontSize: "0.65rem",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "var(--text-muted)", transition: "color 0.2s",
                  display: "flex", alignItems: "center", gap: "5px",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--accent-cyan)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
              >
                <ExternalLink size={11} />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — 3D canvas */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: mounted ? 1 : 0,
          transition: "opacity 1s ease 0.4s",
        }}>
          <HeroCanvas />
        </div>
      </div>

      {/* Scroll indicator */}
      <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          position: "absolute", bottom: "28px", left: "50%",
          transform: "translateX(-50%)", background: "none", border: "none",
          cursor: "pointer", color: "var(--text-muted)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
          animation: "fadeIn 1s ease 1.2s both",
        }}>
        <span className="font-mono" style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>scroll</span>
        <ArrowDown size={13} style={{ animation: "fadeUp 1.2s ease-in-out infinite alternate" }} />
      </button>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
