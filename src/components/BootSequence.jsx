import { useEffect, useState, useRef } from "react";

const LINES = [
  { text: "ARINAO.DEV // PORTFOLIO OS v2.0", delay: 0, color: "#00e5ff", bold: true },
  { text: "─────────────────────────────────────────", delay: 120, color: "#1e1e30" },
  { text: "Booting system environment............", delay: 280, suffix: "OK", suffixColor: "#00ff88" },
  { text: "Loading profile data...................", delay: 500, suffix: "OK", suffixColor: "#00ff88" },
  { text: "Compiling stack manifest...............", delay: 720, suffix: "OK", suffixColor: "#00ff88" },
  { text: "Connecting to global network...........", delay: 940, suffix: "OK", suffixColor: "#00ff88" },
  { text: "─────────────────────────────────────────", delay: 1100, color: "#1e1e30" },
  { text: "", delay: 1180 },
  { text: "  Identity    :  Arinao Ndou", delay: 1300, highlight: "Arinao Ndou", highlightColor: "#00e5ff" },
  { text: "  Role        :  Full-Stack Engineer", delay: 1480, highlight: "Full-Stack Engineer", highlightColor: "#ffb800" },
  { text: "  Location    :  Cape Town, South Africa", delay: 1660, highlight: "Cape Town, South Africa", highlightColor: "#00e5ff" },
  { text: "  Stack       :  C# · React · Docker · K8s · Vue", delay: 1840, highlight: "C# · React · Docker · K8s · Vue", highlightColor: "#a78bfa" },
  { text: "  Status      :  Open to opportunities", delay: 2020, highlight: "Open to opportunities", highlightColor: "#00ff88" },
  { text: "", delay: 2180 },
  { text: "─────────────────────────────────────────", delay: 2260, color: "#1e1e30" },
  { text: "", delay: 2340 },
  { text: "  Initialising interface", delay: 2420, isProgress: true },
];

function ProgressBar({ active }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setPct((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 4;
      });
    }, 32);
    return () => clearInterval(interval);
  }, [active]);

  const filled = Math.round(pct / 100 * 26);
  const bar = "█".repeat(filled) + "░".repeat(26 - filled);

  return (
    <div style={{ marginTop: "6px" }}>
      <span style={{ color: "#00e5ff" }}>[</span>
      <span style={{ color: pct === 100 ? "#00ff88" : "#00e5ff" }}>{bar}</span>
      <span style={{ color: "#00e5ff" }}>] </span>
      <span style={{ color: pct === 100 ? "#00ff88" : "#00e5ff" }}>{pct}%</span>
      {pct === 100 && (
        <span style={{ color: "#00ff88", marginLeft: "12px" }}>READY</span>
      )}
    </div>
  );
}

function HighlightedText({ text, highlight, highlightColor, color }) {
  if (!highlight || !text.includes(highlight)) {
    return <span style={{ color: color || "#8888aa" }}>{text}</span>;
  }
  const parts = text.split(highlight);
  return (
    <span style={{ color: color || "#8888aa" }}>
      {parts[0]}
      <span style={{ color: highlightColor, fontWeight: 700 }}>{highlight}</span>
      {parts[1]}
    </span>
  );
}

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progressActive, setProgressActive] = useState(false);
  const [progressDone, setProgressDone] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [done, setDone] = useState(false);
  const hasRun = useRef(false);

  // Only show once per session
  const shouldSkip = sessionStorage.getItem("boot_done") === "1";

  useEffect(() => {
    if (shouldSkip) { onComplete(); return; }
    if (hasRun.current) return;
    hasRun.current = true;

    LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        if (line.isProgress) setProgressActive(true);
      }, line.delay);
    });

    // Progress completes, then launch
    const totalDelay = 2420 + 900;
    setTimeout(() => setProgressDone(true), totalDelay);
    setTimeout(() => {
      setRevealing(true);
      sessionStorage.setItem("boot_done", "1");
    }, totalDelay + 400);
    setTimeout(() => { setDone(true); onComplete(); }, totalDelay + 1200);
  }, []);

  if (shouldSkip || done) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        background: "#050508",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top half — slides up on reveal */}
      <div
        style={{
          flex: 1, display: "flex", alignItems: "flex-end",
          justifyContent: "center", paddingBottom: "2px",
          transform: revealing ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
          background: "#050508",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: "100%", maxWidth: "680px",
            padding: "0 24px 0",
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(11px, 1.5vw, 13px)",
            lineHeight: 1.8,
          }}
        >
          {/* Scan line effect */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)",
            animation: "scanLine 3s linear infinite",
            pointerEvents: "none",
          }} />

          {/* Terminal lines */}
          {visibleLines.map((line, i) => (
            <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "0" }}>
              {!line.isProgress && (
                <>
                  <span style={{ color: "#2a2a44", marginRight: "8px", userSelect: "none" }}>❯</span>
                  {line.suffix ? (
                    <span>
                      <HighlightedText text={line.text} highlight={line.highlight} highlightColor={line.highlightColor} color={line.color} />
                      <span style={{ color: line.suffixColor, marginLeft: "4px", fontWeight: 700 }}>{line.suffix}</span>
                    </span>
                  ) : (
                    <HighlightedText text={line.text} highlight={line.highlight} highlightColor={line.highlightColor} color={line.color} />
                  )}
                </>
              )}
              {line.isProgress && (
                <div style={{ marginLeft: "16px" }}>
                  <span style={{ color: "#8888aa" }}>{line.text}</span>
                  <ProgressBar active={progressActive} />
                </div>
              )}
            </div>
          ))}

          {/* Blinking cursor */}
          {!progressDone && (
            <div style={{ display: "flex", alignItems: "center", marginTop: "2px" }}>
              <span style={{ color: "#2a2a44", marginRight: "8px" }}>❯</span>
              <span style={{ color: "#00e5ff", animation: "blink 1s step-end infinite" }}>█</span>
            </div>
          )}
        </div>
      </div>

      {/* Dividing line */}
      <div style={{
        height: "1px",
        background: revealing
          ? "rgba(0,229,255,0)"
          : "rgba(0,229,255,0.15)",
        transition: "background 0.4s ease",
        zIndex: 3, flexShrink: 0,
      }} />

      {/* Bottom half — slides down on reveal */}
      <div style={{
        flex: 1,
        transform: revealing ? "translateY(100%)" : "translateY(0)",
        transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
        background: "#050508",
        zIndex: 2,
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: "2px",
      }}>
        <div style={{
          maxWidth: "680px", width: "100%", padding: "0 24px",
          fontFamily: "'Space Mono', monospace", fontSize: "clamp(11px, 1.5vw, 13px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px" }}>
            <span style={{ color: "#2a2a44" }}>❯</span>
            <span style={{ color: "#55556a", fontSize: "0.7em", letterSpacing: "0.15em" }}>
              press <span style={{ color: "#00e5ff" }}>any key</span> to skip
            </span>
          </div>
        </div>
      </div>

      {/* Click / key to skip */}
      <div
        style={{ position: "absolute", inset: 0, cursor: "pointer", zIndex: 4 }}
        onClick={() => {
          setRevealing(true);
          sessionStorage.setItem("boot_done", "1");
          setTimeout(() => { setDone(true); onComplete(); }, 800);
        }}
        onKeyDown={(e) => {
          setRevealing(true);
          sessionStorage.setItem("boot_done", "1");
          setTimeout(() => { setDone(true); onComplete(); }, 800);
        }}
        tabIndex={0}
        role="button"
        aria-label="Skip intro"
      />

      <style>{`
        @keyframes scanLine {
          0% { transform: translateY(0); opacity: 0.6; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
