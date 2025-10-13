import { useEffect, useMemo, useState } from "react";

const PALETTE = ["#4285f4", "#34a853", "#f9ab00", "#ea4335"] as const;

function pickRandomColors(count: number): string[] {
  const indices = [...PALETTE.keys()];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count).map((i) => PALETTE[i]);
}

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  const gradient = useMemo(() => {
    const [c1, c2, c3] = pickRandomColors(3);
    return `linear-gradient(90deg, ${c1}, ${c2}, ${c3})`;
  }, []);

  useEffect(() => {
    const update = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(pct);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <div
        aria-hidden
        className="h-1.5 shadow-md"
        style={{
          width: `${progress}%`,
          background: gradient,
          backgroundSize: "200% 100%",
          animation: "scrollGradientShift 6s ease-in-out infinite",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}


