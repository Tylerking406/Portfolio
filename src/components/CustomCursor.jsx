import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const animRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => { isHovering.current = true; };
    const onLeave = () => { isHovering.current = false; };

    window.addEventListener("mousemove", onMove);

    // Attach hover to all interactive elements
    const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Animation loop for smooth trailing ring
    const animate = () => {
      // Dot follows instantly
      dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;

      // Ring lerps behind
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      const scale = isHovering.current ? 1.8 : 1;
      ringEl.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px) scale(${scale})`;
      ringEl.style.borderColor = isHovering.current
        ? "rgba(255,184,0,0.7)"
        : "rgba(0,229,255,0.5)";
      dot.style.background = isHovering.current ? "#ffb800" : "#00e5ff";

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Only show on desktop (pointer: fine)
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 99999,
          width: "8px", height: "8px", borderRadius: "50%",
          background: "#00e5ff",
          pointerEvents: "none",
          transition: "background 0.2s ease",
          boxShadow: "0 0 6px rgba(0,229,255,0.8)",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 99998,
          width: "36px", height: "36px", borderRadius: "50%",
          border: "1px solid rgba(0,229,255,0.5)",
          pointerEvents: "none",
          transition: "border-color 0.2s ease, transform 0.1s ease",
          willChange: "transform",
        }}
      />

      <style>{`
        * { cursor: none !important; }
        @media (pointer: coarse) { * { cursor: auto !important; } }
      `}</style>
    </>
  );
}
