import { useEffect, useState } from "react";

const LINES = [
  { text: "SYSTEM ERROR // 404", color: "#ff4444", bold: true },
  { text: "──────────────────────────────────", color: "#1e1e30", delay: 100 },
  { text: "Attempting to resolve path........", suffix: "FAILED", suffixColor: "#ff4444", delay: 250 },
  { text: "Scanning fallback routes..........", suffix: "NONE", suffixColor: "#ffb800", delay: 450 },
  { text: "Checking cache....................", suffix: "EMPTY", suffixColor: "#ffb800", delay: 650 },
  { text: "──────────────────────────────────", color: "#1e1e30", delay: 780 },
  { text: "", delay: 860 },
  { text: "  Error     :  Page not found", delay: 980 },
  { text: "  Code      :  404", highlight: "404", highlightColor: "#ff4444", delay: 1100 },
  { text: "  Request   :  " + (typeof window !== "undefined" ? window.location.pathname : "/???"), color: "#ffb800", delay: 1220 },
  { text: "", delay: 1300 },
];

export default function NotFound() {
  const [lines, setLines] = useState([]);
  const [countdown, setCountdown] = useState(5);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    LINES.forEach((line) => {
      setTimeout(() => setLines((p) => [...p, line]), line.delay || 0);
    });
    setTimeout(() => setShowCountdown(true), 1500);
  }, []);

  useEffect(() => {
    if (!showCountdown) return;
    if (countdown <= 0) {
      window.location.href = "/";
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, showCountdown]);

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0f",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Space Mono', monospace",
      padding: "24px",
    }}>
      <div style={{ maxWidth: "600px", width: "100%" }}>
        {/* Glitch header */}
        <div style={{ marginBottom: "40px", position: "relative" }}>
          <h1 className="font-display" style={{
            fontSize: "clamp(80px, 15vw, 140px)", fontWeight: 800,
            color: "rgba(255,68,68,0.08)", letterSpacing: "-0.05em",
            lineHeight: 1, userSelect: "none", position: "relative",
          }}>
            404
            <span style={{
              position: "absolute", top: 0, left: 0,
              color: "rgba(0,229,255,0.06)",
              transform: "translate(4px, -2px)",
              pointerEvents: "none",
            }}>404</span>
          </h1>
        </div>

        {/* Terminal lines */}
        <div style={{
          background: "rgba(13,13,22,0.9)", border: "1px solid var(--border)",
          borderRadius: "4px", padding: "28px",
        }}>
          {lines.map((line, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "2px", fontSize: "12px", lineHeight: 1.8 }}>
              {line.text !== "" && <span style={{ color: "#2a2a44" }}>❯</span>}
              <span>
                {line.bold
                  ? <strong style={{ color: line.color || "#ff4444" }}>{line.text}</strong>
                  : <span style={{ color: line.color || "#8888aa" }}>
                      {line.highlight && line.text.includes(line.highlight)
                        ? <>
                            {line.text.split(line.highlight)[0]}
                            <span style={{ color: line.highlightColor }}>{line.highlight}</span>
                            {line.text.split(line.highlight)[1]}
                          </>
                        : line.text}
                    </span>
                }
                {line.suffix && <span style={{ color: line.suffixColor, marginLeft: "4px", fontWeight: 700 }}>{line.suffix}</span>}
              </span>
            </div>
          ))}

          {showCountdown && (
            <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                ❯ Redirecting to{" "}
                <a href="/" style={{ color: "var(--accent-cyan)", textDecoration: "none" }}>home</a>
                {" "}in{" "}
                <span style={{ color: "var(--accent-gold)", fontWeight: 700 }}>{countdown}</span>
                {" "}seconds
                <span style={{ animation: "blink 1s step-end infinite" }}>_</span>
              </p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <a href="/" className="btn-primary" style={{ textDecoration: "none" }}>
            Back to home
          </a>
          <a href="#contact" onClick={() => window.location.href = "/#contact"}
            className="btn-secondary" style={{ textDecoration: "none" }}>
            Contact me
          </a>
        </div>
      </div>
    </div>
  );
}
