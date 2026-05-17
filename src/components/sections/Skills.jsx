import { useScrollReveal } from "../../hooks/useScrollReveal";
import { skills } from "../../data/portfolio";
import { useEffect, useRef, useState } from "react";

function SkillBar({ name, level, isVisible, delay }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const t = setTimeout(() => setAnimated(true), delay);
      return () => clearTimeout(t);
    }
  }, [isVisible, delay]);

  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{name}</span>
        <span
          className="font-mono"
          style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: "2px",
          background: "var(--border)",
          borderRadius: "1px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: animated ? `${level}%` : "0%",
            background: `linear-gradient(90deg, var(--accent-cyan), rgba(0,229,255,0.4))`,
            borderRadius: "1px",
            transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 0 6px rgba(0,229,255,0.4)",
          }}
        />
      </div>
    </div>
  );
}

function SkillGroup({ title, items, accent = "cyan", isVisible, delay }) {
  const accentColor = accent === "gold" ? "var(--accent-gold)" : "var(--accent-cyan)";
  const tagClass = accent === "gold" ? "tag-pill-gold tag-pill" : "tag-pill";

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      <p
        className="font-mono"
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: accentColor,
          marginBottom: "14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            width: "20px",
            height: "1px",
            background: accentColor,
            display: "inline-block",
          }}
        />
        {title}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
        {items.map((item) => (
          <span key={item} className={tagClass} style={{ fontSize: "0.62rem" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="skills"
      style={{
        padding: "120px 0",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div ref={ref} style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
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
            04 / Skills
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
            Tech Stack
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
          }}
          className="skills-grid"
        >
          {/* Language proficiency bars */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-20px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            <p
              className="font-mono"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent-cyan)",
                marginBottom: "28px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ width: "20px", height: "1px", background: "var(--accent-cyan)", display: "inline-block" }} />
              Core Languages
            </p>
            {skills.languages.map((s, i) => (
              <SkillBar
                key={s.name}
                name={s.name}
                level={s.level}
                isVisible={isVisible}
                delay={200 + i * 100}
              />
            ))}
          </div>

          {/* Tag cloud groups */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <SkillGroup title="Frontend" items={skills.frontend} isVisible={isVisible} delay={0.15} />
            <SkillGroup title="Backend & APIs" items={skills.backend} isVisible={isVisible} delay={0.25} />
            <SkillGroup title="Databases" items={skills.data} accent="gold" isVisible={isVisible} delay={0.3} />
            <SkillGroup title="DevOps & Tooling" items={skills.devops} accent="gold" isVisible={isVisible} delay={0.35} />
          </div>
        </div>

        {/* Concepts strip */}
        <div
          style={{
            marginTop: "64px",
            paddingTop: "40px",
            borderTop: "1px solid var(--border)",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          <p
            className="font-mono"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "16px",
            }}
          >
            Engineering Concepts
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {skills.concepts.map((c) => (
              <span
                key={c}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.65rem",
                  padding: "5px 12px",
                  borderRadius: "2px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.05em",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
