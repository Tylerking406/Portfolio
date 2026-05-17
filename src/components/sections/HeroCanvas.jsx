import { useRef, useEffect } from "react";

const TECH_NODES = [
  { label: "C# .NET Core", color: "#00e5ff", size: 1.3 },
  { label: "React", color: "#00e5ff", size: 1.2 },
  { label: "Vue.js", color: "#00e5ff", size: 1.0 },
  { label: "Docker", color: "#ffb800", size: 1.1 },
  { label: "Kubernetes", color: "#ffb800", size: 1.0 },
  { label: "TypeScript", color: "#00e5ff", size: 1.0 },
  { label: "Spring Boot", color: "#00e5ff", size: 1.1 },
  { label: "FastAPI", color: "#a78bfa", size: 0.9 },
  { label: "Firebase", color: "#ffb800", size: 0.9 },
  { label: "SQL Server", color: "#00e5ff", size: 1.0 },
  { label: "Supabase", color: "#00ff88", size: 0.9 },
  { label: "LangChain", color: "#a78bfa", size: 1.0 },
];

function fibonacciSphere(n) {
  const pts = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

function rotateXY(x, y, z, rx, ry) {
  // Rotate Y
  const cosY = Math.cos(ry), sinY = Math.sin(ry);
  const x1 = x * cosY + z * sinY;
  const z1 = -x * sinY + z * cosY;
  // Rotate X
  const cosX = Math.cos(rx), sinX = Math.sin(rx);
  const y2 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;
  return { x: x1, y: y2, z: z2 };
}

export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    ry: 0,
    rx: 0.35,
    targetRx: 0.35,
    targetRy: 0,
    frame: 0,
    particles: [],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const DPR = window.devicePixelRatio || 1;
    const SIZE = 480;
    canvas.width = SIZE * DPR;
    canvas.height = SIZE * DPR;
    canvas.style.width = SIZE + "px";
    canvas.style.height = SIZE + "px";
    ctx.scale(DPR, DPR);

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const R = 130;
    const FOV = 420;

    const spherePts = fibonacciSphere(420);

    // Burst particles
    const bursts = [];
    function spawnBurst() {
      const idx = Math.floor(Math.random() * spherePts.length);
      const pt = spherePts[idx];
      bursts.push({
        x: pt.x, y: pt.y, z: pt.z,
        vx: pt.x * 0.02, vy: pt.y * 0.02, vz: pt.z * 0.02,
        life: 1, decay: 0.012 + Math.random() * 0.01,
      });
    }

    // Orbit nodes — fixed positions on a tilted ring
    const orbitNodes = TECH_NODES.map((t, i) => ({
      ...t,
      angle: (i / TECH_NODES.length) * Math.PI * 2,
      speed: 0.0025 + (i % 3) * 0.0008,
      orbitR: 185 + (i % 3) * 22,
      tilt: 0.42 + (i % 2) * 0.18,
    }));

    function project(x, y, z) {
      const scale = FOV / (FOV + z * R + R);
      return { px: cx + x * R * scale, py: cy + y * R * scale, scale, depth: (z + 1) / 2 };
    }

    function hexAlpha(hex, a) {
      const alpha = Math.max(0, Math.min(255, Math.round(a * 255)))
        .toString(16).padStart(2, "0");
      return hex + alpha;
    }

    let animId;

    function draw() {
      const s = stateRef.current;
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Smooth rotation
      s.rx += (s.targetRx - s.rx) * 0.04;
      s.ry += (s.targetRy - s.ry) * 0.04;
      s.targetRy += 0.0038;
      s.frame++;

      // Spawn bursts occasionally
      if (s.frame % 55 === 0) spawnBurst();

      // --- AMBIENT GLOW ---
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.8);
      grd.addColorStop(0, "rgba(0,229,255,0.07)");
      grd.addColorStop(0.45, "rgba(0,229,255,0.025)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // --- EQUATORIAL RING ---
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.28);
      const ringGrd = ctx.createRadialGradient(0, 0, R * 0.85, 0, 0, R * 1.35);
      ringGrd.addColorStop(0, "rgba(0,229,255,0)");
      ringGrd.addColorStop(0.3, "rgba(0,229,255,0.06)");
      ringGrd.addColorStop(0.7, "rgba(255,184,0,0.04)");
      ringGrd.addColorStop(1, "transparent");
      ctx.fillStyle = ringGrd;
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- TRANSFORM SPHERE POINTS ---
      const transformed = spherePts.map((p) => {
        const r = rotateXY(p.x, p.y, p.z, s.rx, s.ry);
        return { ...project(r.x, r.y, r.z), orig: r };
      });

      // Sort back-to-front
      transformed.sort((a, b) => a.depth - b.depth);

      // --- CONNECTION LINES (front hemisphere only) ---
      const frontPts = transformed.filter((p) => p.orig.z > 0.15);
      ctx.lineWidth = 0.4;
      for (let i = 0; i < frontPts.length; i++) {
        for (let j = i + 1; j < Math.min(i + 8, frontPts.length); j++) {
          const dx = frontPts[i].px - frontPts[j].px;
          const dy = frontPts[i].py - frontPts[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 32) {
            const a = (1 - dist / 32) * 0.12 * frontPts[i].depth;
            ctx.strokeStyle = `rgba(0,229,255,${a})`;
            ctx.beginPath();
            ctx.moveTo(frontPts[i].px, frontPts[i].py);
            ctx.lineTo(frontPts[j].px, frontPts[j].py);
            ctx.stroke();
          }
        }
      }

      // --- SPHERE PARTICLES ---
      transformed.forEach((p) => {
        if (p.depth < 0.08) return;
        const sz = p.depth * 2.6 + 0.2;
        const alpha = p.depth * 0.85 + 0.08;

        const g = Math.round(p.depth * 229);
        const b = Math.round(80 + p.depth * 175);
        ctx.beginPath();
        ctx.arc(p.px, p.py, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,${g},${b},${alpha})`;
        ctx.fill();

        if (p.depth > 0.82) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, sz * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,229,255,${(p.depth - 0.82) * 0.25})`;
          ctx.fill();
        }
      });

      // --- BURST PARTICLES ---
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx; b.y += b.vy; b.z += b.vz;
        b.life -= b.decay;
        if (b.life <= 0) { bursts.splice(i, 1); continue; }
        const r = rotateXY(b.x, b.y, b.z, s.rx, s.ry);
        const p = project(r.x, r.y, r.z);
        ctx.beginPath();
        ctx.arc(p.px, p.py, b.life * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${b.life * 0.8})`;
        ctx.fill();
      }

      // --- ORBIT NODES ---
      orbitNodes.forEach((node) => {
        const t = s.frame * node.speed + node.angle;
        const ox = Math.cos(t) * node.orbitR;
        const oy = Math.sin(t) * Math.sin(node.tilt) * node.orbitR * 0.45;
        const oz = Math.sin(t) * Math.cos(node.tilt) * 60;

        const lx = cx + ox;
        const ly = cy + oy;

        // Pseudo-depth for fading
        const depthFactor = (Math.sin(t) + 1) / 2;
        const alpha = 0.3 + depthFactor * 0.7;

        // Line from orbit node to sphere edge
        const edgeX = cx + (ox / node.orbitR) * (R * 0.75);
        const edgeY = cy + (oy / node.orbitR) * (R * 0.75);
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(edgeX, edgeY);
        ctx.strokeStyle = hexAlpha(node.color, alpha * 0.12);
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Node dot
        ctx.beginPath();
        ctx.arc(lx, ly, 4 * node.size, 0, Math.PI * 2);
        ctx.fillStyle = hexAlpha(node.color, alpha);
        ctx.fill();

        // Outer glow ring
        ctx.beginPath();
        ctx.arc(lx, ly, 8 * node.size, 0, Math.PI * 2);
        ctx.fillStyle = hexAlpha(node.color, alpha * 0.15);
        ctx.fill();

        // Label text
        const fontSize = Math.round(9 + depthFactor * 2.5);
        ctx.font = `${fontSize}px 'Space Mono', monospace`;
        ctx.fillStyle = hexAlpha(node.color, alpha * 0.95);
        const offset = lx > cx ? 14 : -14;
        ctx.textAlign = lx > cx ? "left" : "right";
        ctx.fillText(node.label, lx + offset, ly + 4);
      });

      // --- CENTER CORE GLOW ---
      const coreGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
      coreGrd.addColorStop(0, "rgba(0,229,255,0.35)");
      coreGrd.addColorStop(0.5, "rgba(0,229,255,0.08)");
      coreGrd.addColorStop(1, "transparent");
      ctx.fillStyle = coreGrd;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    }

    draw();

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left - SIZE / 2) / SIZE;
      const my = (e.clientY - rect.top - SIZE / 2) / SIZE;
      stateRef.current.targetRx = 0.35 + my * 0.6;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />

      {/* Floating status card */}
      <div style={{
        position: "absolute",
        bottom: "20px",
        right: "0px",
        background: "rgba(13,13,22,0.85)",
        border: "1px solid rgba(0,229,255,0.2)",
        borderRadius: "4px",
        padding: "12px 16px",
        backdropFilter: "blur(12px)",
        minWidth: "160px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#00ff88", boxShadow: "0 0 6px #00ff88",
            animation: "glowPulse 2s ease-in-out infinite",
          }} />
          <span className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "#00ff88", textTransform: "uppercase" }}>
            Systems Online
          </span>
        </div>
        {[
          { label: "Stack depth", value: "12 techs" },
          { label: "Live projects", value: "3 active" },
          { label: "Global reach", value: "67k / mo" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", justifyContent: "space-between", gap: "16px", marginBottom: "4px" }}>
            <span className="font-mono" style={{ fontSize: "0.58rem", color: "var(--text-muted)", letterSpacing: "0.06em" }}>
              {item.label}
            </span>
            <span className="font-mono" style={{ fontSize: "0.58rem", color: "var(--accent-cyan)", letterSpacing: "0.06em" }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Corner decorators */}
      {[
        { top: 8, left: 8, borderTop: "1px solid", borderLeft: "1px solid" },
        { top: 8, right: 8, borderTop: "1px solid", borderRight: "1px solid" },
        { bottom: 8, left: 8, borderBottom: "1px solid", borderLeft: "1px solid" },
        { bottom: 8, right: 8, borderBottom: "1px solid", borderRight: "1px solid" },
      ].map((style, i) => (
        <div key={i} style={{
          position: "absolute", width: "16px", height: "16px",
          borderColor: "rgba(0,229,255,0.35)", ...style,
        }} />
      ))}
    </div>
  );
}
