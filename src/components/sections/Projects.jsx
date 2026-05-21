import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useCountUp } from "../../hooks/useCountUp";
import { useCardTilt } from "../../hooks/useCardTilt";
import { featuredProjects, projects } from "../../data/portfolio";
import { GitBranch as Github, ExternalLink, ArrowRight, TrendingUp } from "lucide-react";

function AnimatedStat({ value, label, isVisible }) {
  const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, ""));
  const suffix = String(value).replace(/[0-9. ]/g, "");
  const count = useCountUp(numericValue, 1800, isVisible);
  const display = Number.isInteger(numericValue) ? Math.round(count) : count.toFixed(1);
  return (
    <div>
      <p className="font-display" style={{ fontSize: "18px", fontWeight: 800, color: "var(--accent-gold)", letterSpacing: "-0.02em" }}>
        {display}{suffix}
      </p>
      <p className="font-mono" style={{ fontSize: "0.58rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "2px" }}>
        {label}
      </p>
    </div>
  );
}

const STATUS_CONFIG = {
  live: { label: "Live", color: "#00ff88", bg: "rgba(0,255,136,0.08)", border: "rgba(0,255,136,0.25)" },
  "in-progress": { label: "In Dev", color: "var(--accent-gold)", bg: "rgba(255,184,0,0.08)", border: "rgba(255,184,0,0.25)" },
  complete: { label: "Complete", color: "var(--accent-cyan)", bg: "rgba(0,229,255,0.08)", border: "rgba(0,229,255,0.25)" },
};

const ACCENT = {
  cyan:   { glow: "rgba(0,229,255,0.08)",  border: "rgba(0,229,255,0.25)",  color: "var(--accent-cyan)" },
  gold:   { glow: "rgba(255,184,0,0.06)",  border: "rgba(255,184,0,0.25)",  color: "var(--accent-gold)" },
  purple: { glow: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.25)", color: "#a78bfa" },
};

function FeaturedCard({ project, index, isVisible }) {
  const status = STATUS_CONFIG[project.status];
  const accent = ACCENT[project.accent];
  const isBabina = project.id === "babina";

  return (
    <div style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(28px)",
      transition: `all 0.7s ease ${index * 0.15}s`,
      minWidth: 0,
    }}>
      <div className="card-hover" style={{
        background: "var(--bg-card)",
        border: `1px solid ${accent.border}`,
        borderRadius: "4px",
        padding: "clamp(20px, 4vw, 36px)",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "300px", height: "300px",
          background: `radial-gradient(circle at top right, ${accent.glow}, transparent 70%)`,
          pointerEvents: "none",
        }} />

        {/* Type + status row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "8px", flexWrap: "wrap" }}>
          <span className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: accent.color }}>
            {project.type}
          </span>
          <span className="font-mono" style={{
            fontSize: "0.58rem", padding: "3px 8px",
            background: status.bg, border: `1px solid ${status.border}`,
            color: status.color, borderRadius: "2px", letterSpacing: "0.1em", textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>
            {status.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display" style={{
          fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800,
          letterSpacing: "-0.02em", marginBottom: "12px", lineHeight: 1.2,
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px", fontWeight: 300 }}>
          {project.description}
        </p>

        {/* Babina traffic stats */}
        {isBabina && project.stats && (
          <div className="stats-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            marginBottom: "20px",
            padding: "16px",
            background: "rgba(255,184,0,0.04)",
            border: "1px solid rgba(255,184,0,0.15)",
            borderRadius: "4px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", gridColumn: "1/-1" }}>
              <TrendingUp size={12} color="var(--accent-gold)" />
              <span className="font-mono" style={{ fontSize: "0.56rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent-gold)" }}>
                Live Traffic — Last 30 Days
              </span>
            </div>
            {project.stats.map((s) => (
              <AnimatedStat key={s.label} value={s.value} label={s.label} isVisible={isVisible} />
            ))}
          </div>
        )}

        {/* Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px", marginTop: "auto" }}>
          {project.stack.map((tech) => (
            <span key={tech} className="tag-pill" style={{ borderColor: accent.border, color: accent.color, background: accent.glow, fontSize: "0.58rem" }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "6px", color: accent.color, textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <ExternalLink size={14} />
              <span className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.08em" }}>Visit Site</span>
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = accent.color}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
            >
              <Github size={14} />
              <span className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.08em" }}>Source</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, isVisible }) {
  const status = STATUS_CONFIG[project.status];
  const accent = ACCENT[project.accent];
  const { ref: tiltRef, onMouseMove, onMouseLeave } = useCardTilt(6);

  return (
    <div style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.6s ease ${index * 0.08}s`,
      minWidth: 0,
    }}>
      <div ref={tiltRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
        style={{
          background: "var(--bg-card)",
          border: `1px solid ${accent.border}`,
          borderRadius: "4px",
          padding: "clamp(16px, 3vw, 24px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          willChange: "transform",
          boxSizing: "border-box",
        }}>
        <div style={{
          position: "absolute", top: 0, right: 0, width: "150px", height: "150px",
          background: `radial-gradient(circle at top right, ${accent.glow}, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", gap: "8px" }}>
          <span className="font-mono" style={{ fontSize: "0.56rem", letterSpacing: "0.12em", textTransform: "uppercase", color: accent.color, flex: 1, minWidth: 0 }}>
            {project.type}
          </span>
          <span className="font-mono" style={{
            fontSize: "0.56rem", padding: "3px 7px",
            background: status.bg, border: `1px solid ${status.border}`,
            color: status.color, borderRadius: "2px", letterSpacing: "0.08em",
            textTransform: "uppercase", flexShrink: 0, whiteSpace: "nowrap",
          }}>{status.label}</span>
        </div>

        <h3 className="font-display" style={{ fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 700, marginBottom: "8px", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
          {project.title}
        </h3>

        {project.mission && (
          <p className="font-mono" style={{
            fontSize: "0.6rem", color: accent.color, letterSpacing: "0.05em",
            marginBottom: "8px", fontStyle: "italic",
          }}>
            "{project.mission}"
          </p>
        )}

        <p style={{ fontSize: "clamp(12px, 1.5vw, 13px)", color: "var(--text-secondary)", lineHeight: 1.65, flex: 1, marginBottom: "14px", fontWeight: 300 }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
          {project.stack.map((tech) => (
            <span key={tech} className="tag-pill" style={{
              fontSize: "0.56rem", borderColor: accent.border,
              color: accent.color, background: accent.glow,
            }}>{tech}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "5px", color: accent.color, textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <ExternalLink size={12} />
              <span className="font-mono" style={{ fontSize: "0.6rem" }}>Live</span>
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = accent.color}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
            >
              <Github size={12} />
              <span className="font-mono" style={{ fontSize: "0.6rem" }}>Source</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

  return (
    <section id="projects" style={{ padding: "80px 16px", maxWidth: "1200px", margin: "0 auto", boxSizing: "border-box" }}>

      {/* Header */}
      <div ref={featuredRef} style={{
        marginBottom: "40px",
        opacity: featuredVisible ? 1 : 0,
        transform: featuredVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}>
        <span className="section-label"><span className="h-line" />03 / Projects</span>
        <h2 className="font-display" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, marginTop: "12px", letterSpacing: "-0.02em" }}>
          What I've Built
        </h2>
        <p style={{ marginTop: "10px", fontSize: "14px", color: "var(--text-secondary)", fontWeight: 300 }}>
          12 repositories · production client work · open-source tools · ML research
        </p>
      </div>

      {/* Featured — stacks to 1 col on mobile */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "20px" }} className="featured-grid">
        {featuredProjects.map((p, i) => (
          <FeaturedCard key={p.id} project={p} index={i} isVisible={featuredVisible} />
        ))}
      </div>

      {/* Projects grid — 3 col desktop, 2 col tablet, 1 col mobile */}
      <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }} className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} isVisible={gridVisible} />
        ))}
      </div>

      {/* GitHub CTA */}
      <div style={{
        marginTop: "40px", display: "flex", justifyContent: "center",
        opacity: gridVisible ? 1 : 0, transition: "opacity 0.6s ease 0.5s",
      }}>
        <a href="https://github.com/Tylerking406" target="_blank" rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            color: "var(--text-muted)", textDecoration: "none",
            fontFamily: "'Space Mono', monospace", fontSize: "0.7rem",
            letterSpacing: "0.1em", transition: "color 0.2s",
            padding: "12px 24px", border: "1px solid var(--border)", borderRadius: "2px",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--accent-cyan)"; e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          <Github size={14} />
          View all repositories on GitHub
          <ArrowRight size={14} />
        </a>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .featured-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .featured-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
