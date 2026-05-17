import { useEffect, useState } from "react";
import { personal } from "../../data/portfolio";
import { GitBranch, ExternalLink, Mail, MapPin, ArrowDown } from "lucide-react";

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

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
      {/* Radial glow backdrop */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(255,184,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          {/* Status badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#00ff88",
                display: "inline-block",
                animation: "glowPulse 2s ease-in-out infinite",
                boxShadow: "0 0 8px #00ff88",
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
              }}
            >
              {personal.availability} · {personal.location}
            </span>
          </div>

          {/* Name */}
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(48px, 8vw, 88px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "8px",
              color: "var(--text-primary)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.2s",
            }}
          >
            Arinao
          </h1>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(48px, 8vw, 88px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "28px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.3s",
            }}
          >
            <span className="gradient-text-cyan">Ndou</span>
          </h1>

          {/* Typewriter role */}
          <div
            style={{
              height: "36px",
              marginBottom: "24px",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.5s ease 0.5s",
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: "clamp(14px, 2vw, 18px)",
                color: "var(--accent-cyan)",
                letterSpacing: "0.05em",
              }}
            >
              &gt; {displayed}
              <span
                style={{
                  color: "var(--accent-gold)",
                  animation: "blink 1s step-end infinite",
                }}
              >
                _
              </span>
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "520px",
              marginBottom: "48px",
              fontWeight: 300,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.7s ease 0.5s",
            }}
          >
            {personal.tagline}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "56px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(15px)",
              transition: "all 0.7s ease 0.65s",
            }}
          >
            <button
              className="btn-primary"
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </button>
            <button
              className="btn-secondary"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get in touch
            </button>
          </div>

          {/* Social links */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.5s ease 0.8s",
            }}
          >
            {[
              { icon: GitBranch, href: personal.github, label: "GitHub" },
              { icon: ExternalLink, href: personal.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent-cyan)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Icon size={18} />
                <span
                  className="font-mono"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}
                >
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-muted)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          animation: "fadeIn 1s ease 1.2s both",
        }}
        aria-label="Scroll down"
      >
        <span
          className="font-mono"
          style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
        >
          scroll
        </span>
        <ArrowDown size={14} style={{ animation: "fadeUp 1s ease-in-out infinite alternate" }} />
      </button>

      {/* Decorative corner element */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          right: "24px",
          opacity: 0.15,
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "var(--accent-cyan)",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          ARINAO.DEV · FULL STACK ENGINEER · CAPE TOWN
        </div>
      </div>
    </section>
  );
}
