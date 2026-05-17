import { useScrollReveal } from "../../hooks/useScrollReveal";
import { about, education, achievements, personal } from "../../data/portfolio";
import { GraduationCap, Trophy, MapPin } from "lucide-react";

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "120px 24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Section header */}
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
          01 / About
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
          Who I Am
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Bio */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-20px)",
            transition: "all 0.7s ease 0.1s",
          }}
        >
          {about.split("\n\n").map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: "16px",
                lineHeight: 1.8,
                color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                marginBottom: "20px",
                fontWeight: i === 0 ? 400 : 300,
              }}
            >
              {para}
            </p>
          ))}

          {/* Location + availability badge */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "32px",
            }}
          >
            <span className="tag-pill" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <MapPin size={10} />
              {personal.location}
            </span>
            <span className="tag-pill-gold tag-pill">{personal.availability}</span>
          </div>
        </div>

        {/* Right column: Education + Achievements */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.7s ease 0.2s",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Education card */}
          <div
            className="glow-border-cyan card-hover"
            style={{
              background: "var(--bg-card)",
              padding: "28px",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "rgba(0,229,255,0.08)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <GraduationCap size={16} color="var(--accent-cyan)" />
              </div>
              <div>
                <p
                  className="font-mono"
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--accent-cyan)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Education
                </p>
                <h3
                  className="font-display"
                  style={{ fontSize: "15px", fontWeight: 700, lineHeight: 1.3 }}
                >
                  {education.degree}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    marginTop: "4px",
                  }}
                >
                  {education.institution} · {education.graduated}
                </p>
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,184,0,0.06)",
                border: "1px solid rgba(255,184,0,0.2)",
                borderRadius: "2px",
                padding: "10px 14px",
                marginBottom: "16px",
              }}
            >
              <p
                className="font-mono"
                style={{
                  fontSize: "0.7rem",
                  color: "var(--accent-gold)",
                  letterSpacing: "0.05em",
                }}
              >
                ★ {education.highlight}
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {education.modules.map((mod) => (
                <span key={mod} className="tag-pill" style={{ fontSize: "0.6rem" }}>
                  {mod}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              padding: "28px",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "18px",
              }}
            >
              <Trophy size={16} color="var(--accent-gold)" />
              <p
                className="font-mono"
                style={{
                  fontSize: "0.65rem",
                  color: "var(--accent-gold)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Highlights
              </p>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {achievements.map((a, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                    paddingBottom: "12px",
                    borderBottom:
                      i < achievements.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <span style={{ color: "var(--accent-cyan)", flexShrink: 0, marginTop: "2px" }}>
                    ›
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
