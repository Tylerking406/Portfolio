import { useScrollReveal } from "../../hooks/useScrollReveal";
import { projects } from "../../data/portfolio";
import { GitBranch, ExternalLink, ArrowRight } from "lucide-react";

const STATUS_CONFIG = {
  live: { label: "Live", color: "#00ff88", bg: "rgba(0,255,136,0.08)", border: "rgba(0,255,136,0.25)" },
  "in-progress": { label: "In Dev", color: "var(--accent-gold)", bg: "rgba(255,184,0,0.08)", border: "rgba(255,184,0,0.25)" },
  complete: { label: "Complete", color: "var(--accent-cyan)", bg: "rgba(0,229,255,0.08)", border: "rgba(0,229,255,0.25)" },
};

const ACCENT_CONFIG = {
  cyan: { glow: "rgba(0,229,255,0.1)", border: "rgba(0,229,255,0.25)", accent: "var(--accent-cyan)" },
  gold: { glow: "rgba(255,184,0,0.08)", border: "rgba(255,184,0,0.25)", accent: "var(--accent-gold)" },
  purple: { glow: "rgba(124,58,237,0.1)", border: "rgba(124,58,237,0.25)", accent: "#a78bfa" },
};

function ProjectCard({ project, index, isVisible }) {
  const status = STATUS_CONFIG[project.status];
  const accent = ACCENT_CONFIG[project.accent];

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.65s ease ${index * 0.12}s`,
      }}
    >
      <div
        className="card-hover"
        style={{
          background: "var(--bg-card)",
          border: `1px solid ${accent.border}`,
          borderRadius: "4px",
          padding: "32px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background: `radial-gradient(circle at top right, ${accent.glow}, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "16px",
          }}
        >
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: accent.accent,
                display: "block",
                marginBottom: "8px",
              }}
            >
              {project.type}
            </span>
            <h3
              className="font-display"
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              {project.title}
            </h3>
          </div>
          <span
            className="font-mono"
            style={{
              fontSize: "0.6rem",
              padding: "4px 10px",
              background: status.bg,
              border: `1px solid ${status.border}`,
              color: status.color,
              borderRadius: "2px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            {status.label}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            flex: 1,
            marginBottom: "24px",
          }}
        >
          {project.description}
        </p>

        {/* Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="tag-pill"
              style={{
                borderColor: `${accent.border}`,
                color: accent.accent,
                background: `${accent.glow}`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "12px" }}>
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = accent.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <GitBranch size={15} />
              <span className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.08em" }}>
                Source
              </span>
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = accent.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <ExternalLink size={15} />
              <span className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.08em" }}>
                Live
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        padding: "120px 24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "64px",
          flexWrap: "wrap",
          gap: "20px",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}
      >
        <div>
          <span className="section-label">
            <span className="h-line" />
            03 / Projects
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
            What I've Built
          </h2>
        </div>
        <a
          href="https://github.com/Tylerking406"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--accent-cyan)",
            textDecoration: "none",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.gap = "10px")}
          onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
        >
          View all on GitHub
          <ArrowRight size={14} />
        </a>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}
