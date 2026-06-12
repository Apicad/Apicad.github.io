import { useEffect, useRef, useState } from "react";

// Small page-level FPS overlay. Shows automatically during `npm run dev`,
// and on the live site when the URL has ?fps (e.g. .../portfolio-website/?fps).
// Measured via requestAnimationFrame so it reflects real render framerate,
// including the Spline/three.js canvases.
const overlayStyle = {
  position: "fixed",
  bottom: "12px",
  left: "12px",
  zIndex: 99999,
  padding: "6px 10px",
  borderRadius: "6px",
  background: "rgba(0, 0, 0, 0.7)",
  color: "#0f0",
  fontFamily: "monospace",
  fontSize: "13px",
  pointerEvents: "none",
};

const fpsMeterEnabled = () =>
  import.meta.env.DEV ||
  new URLSearchParams(window.location.search).has("fps");

const FpsMeter = () => {
  const [fps, setFps] = useState(0);
  const frames = useRef(0);
  const lastTime = useRef(performance.now());
  const enabled = fpsMeterEnabled();

  useEffect(() => {
    if (!enabled) return;
    let rafId;

    const tick = (now) => {
      frames.current += 1;
      if (now - lastTime.current >= 1000) {
        setFps(Math.round((frames.current * 1000) / (now - lastTime.current)));
        frames.current = 0;
        lastTime.current = now;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [enabled]);

  if (!enabled) return null;

  const color = fps >= 50 ? "#0f0" : fps >= 30 ? "#ff0" : "#f44";

  return <div style={{ ...overlayStyle, color }}>{fps} FPS</div>;
};

export default FpsMeter;
