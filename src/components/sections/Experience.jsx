import { useScrollReveal } from "../../hooks/useScrollReveal";
import { experience } from "../../data/portfolio";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function ExperienceCard({ job, index, isVisible }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ease ${index * 0.1}s`,
        position: "relative",
      }}
    >
      {/* Timeline line + dot */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            border: "2px solid var(--accent-cyan)",
            background: index === 0 ? "var(--accent-cyan)" : "var(--bg-primary)",
            flexShrink: 0,
            marginTop: "6px",
            boxShadow: index === 0 ? "0 0 10px rgba(0,229,255,0.5)" : "none",
            transition: "all 0.3s ease",
          }}
        />
        {index < experience.length - 1 && (
          <div
            style={{
              width: "1px",
              flex: 1,
              minHeight: "40px",
              background: "linear-gradient(to bottom, rgba(0,229,255,0.3), transparent)",
              marginTop: "8px",
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        style={{
          flex: 1,
          marginBottom: "32px",
        }}
      >
        <div
          className="card-hover"
          style={{
            background: "var(--bg-card)",
            border: `1px solid ${index === 0 ? "rgba(0,229,255,0.25)" : "var(--border)"}`,
            borderRadius: "4px",
            padding: "24px 28px",
            cursor: "pointer",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {job.role}
                </h3>
                {index === 0 && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.58rem",
                      background: "rgba(0,255,136,0.1)",
                      border: "1px solid rgba(0,255,136,0.3)",
                      color: "#00ff88",
                      padding: "2px 8px",
                      borderRadius: "2px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Current
                  </span>
                )}
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--accent-cyan)",
                  fontWeight: 500,
                  marginBottom: "4px",
                }}
              >
                {job.company} · {job.location}
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {job.period}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                  }}
                >
                  · {job.type}
                </span>
              </div>
            </div>
            <div style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "4px" }}>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>

          {/* Expanded content */}
          {expanded && (
            <div style={{ marginTop: "20px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                {job.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "10px",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "var(--accent-cyan)", flexShrink: 0 }}>›</span>
                    {h}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {job.stack.map((tech) => (
                  <span key={tech} className="tag-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="experience"
      style={{
        padding: "120px 0",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        ref={ref}
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
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
            02 / Experience
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
            Where I've Worked
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: "780px" }}>
          {experience.map((job, i) => (
            <ExperienceCard key={job.id} job={job} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
