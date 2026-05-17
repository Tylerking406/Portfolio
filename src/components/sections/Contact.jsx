import { useScrollReveal } from "../../hooks/useScrollReveal";
import { personal } from "../../data/portfolio";
import { Mail, GitBranch, ExternalLink as LinkedInIcon, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const links = [
    {
      icon: Mail,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
      copyable: true,
      description: "Best for opportunities & enquiries",
    },
    {
      icon: GitBranch,
      label: "GitHub",
      value: "github.com/Tylerking406",
      href: personal.github,
      copyable: false,
      description: "Open source & personal projects",
    },
    {
      icon: LinkedInIcon,
      label: "LinkedIn",
      value: "Arinao Ndou",
      href: personal.linkedin,
      copyable: false,
      description: "Professional profile & experience",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: "120px 24px 80px", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "64px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}
      >
        <span className="section-label">
          <span className="h-line" />
          05 / Contact
        </span>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            marginTop: "12px",
            letterSpacing: "-0.02em",
          }}
        >
          Get in Touch
        </h2>
        <p
          style={{
            marginTop: "16px",
            fontSize: "16px",
            color: "var(--text-secondary)",
            maxWidth: "480px",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          I'm currently open to new opportunities — whether it's a full-time role, contract, or an
          interesting project. My inbox is always open.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "start",
        }}
        className="contact-grid"
      >
        {/* Contact links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-20px)",
            transition: "all 0.6s ease 0.15s",
          }}
        >
          {links.map(({ icon: Icon, label, value, href, copyable, description }) => (
            <div
              key={label}
              className="card-hover glow-border-cyan"
              style={{
                background: "var(--bg-card)",
                borderRadius: "4px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                cursor: copyable ? "pointer" : "default",
              }}
              onClick={() => copyable && copyToClipboard(value, label)}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(0,229,255,0.07)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={16} color="var(--accent-cyan)" />
              </div>
              <div style={{ flex: 1 }}>
                <p
                  className="font-mono"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "3px",
                  }}
                >
                  {label}
                </p>
                <p style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: 500 }}>
                  {value}
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                  {description}
                </p>
              </div>
              {copyable ? (
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.6rem",
                    color: copied === label ? "#00ff88" : "var(--text-muted)",
                    letterSpacing: "0.1em",
                    transition: "color 0.2s",
                    flexShrink: 0,
                  }}
                >
                  {copied === label ? "Copied!" : "Copy"}
                </span>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-muted)", flexShrink: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowRight size={14} />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* CTA card */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.6s ease 0.25s",
          }}
        >
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid rgba(255,184,0,0.2)",
              borderRadius: "4px",
              padding: "40px 36px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "250px",
                height: "250px",
                background:
                  "radial-gradient(circle at top right, rgba(255,184,0,0.06), transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              // Ready to collaborate
            </span>
            <h3
              className="font-display"
              style={{
                fontSize: "24px",
                fontWeight: 700,
                marginBottom: "16px",
                lineHeight: 1.3,
              }}
            >
              Let's build something great together.
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "32px",
                fontWeight: 300,
              }}
            >
              Whether you're building a product from scratch, scaling an existing system, or need a
              sharp full-stack engineer to join your team — I'd love to hear about it.
            </p>
            <a
              href={`mailto:${personal.email}`}
              className="btn-primary"
              style={{ display: "inline-block", textDecoration: "none" }}
            >
              Say Hello →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
