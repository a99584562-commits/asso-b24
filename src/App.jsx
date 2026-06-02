import { useCallback, useEffect, useRef, useState } from "react";
import { SLIDES } from "./slides.jsx";
import { Icon } from "./ui.jsx";

export default function App() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const touch = useRef(null);
  const total = SLIDES.length;

  const go = useCallback(
    (next) => {
      setI((cur) => {
        const clamped = Math.max(0, Math.min(total - 1, next));
        setDir(clamped >= cur ? 1 : -1);
        return clamped;
      });
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        go(i + 1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(i - 1);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, go, total]);

  const onTouchStart = (e) => (touch.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 60) go(i + (dx < 0 ? 1 : -1));
    touch.current = null;
  };

  const slide = SLIDES[i];
  const progress = ((i + 1) / total) * 100;

  return (
    <div className="grain relative h-[100dvh] w-full overflow-hidden bg-cream" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* top progress hairline */}
      <div className="absolute inset-x-0 top-0 z-50 h-[3px] bg-espresso/[0.06]">
        <div className="h-full bg-ember transition-all duration-700 ease-spring" style={{ width: `${progress}%` }} />
      </div>

      {/* floating brand pill */}
      <div className="pointer-events-none absolute left-6 top-6 z-40 hidden items-center gap-2.5 md:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-espresso text-[11px] font-bold text-cream">А</span>
        <span className="text-sm font-semibold tracking-tight text-espresso">АССО-Строй</span>
        <span className="text-clay">×</span>
        <span className="text-sm font-medium text-umber">ЛАЙМ</span>
      </div>

      {/* section + counter */}
      <div className="absolute right-6 top-5 z-40 flex items-center gap-3 text-xs font-medium text-umber">
        <span className="hidden rounded-full bg-espresso/[0.04] px-3 py-1 uppercase tracking-[0.18em] ring-1 ring-espresso/[0.06] sm:inline">
          {slide.section}
        </span>
        <span className="tabular-nums">
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* the slide */}
      <div key={slide.id} className="h-full w-full" style={{ animation: "floatUp 0.7s cubic-bezier(0.32,0.72,0,1) both" }}>
        {slide.el}
      </div>

      {/* nav arrows */}
      <div className="absolute bottom-6 right-6 z-40 flex items-center gap-2">
        <NavBtn disabled={i === 0} onClick={() => go(i - 1)} flip />
        <NavBtn disabled={i === total - 1} onClick={() => go(i + 1)} />
      </div>

      {/* dot rail */}
      <div className="absolute bottom-7 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-1.5 md:flex">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => go(idx)}
            aria-label={`Слайд ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ease-spring ${
              idx === i ? "w-6 bg-ember" : "w-1.5 bg-espresso/15 hover:bg-espresso/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function NavBtn({ onClick, disabled, flip }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group flex h-11 w-11 items-center justify-center rounded-full ring-1 transition-all duration-500 ease-spring active:scale-95 ${
        disabled
          ? "cursor-not-allowed bg-espresso/[0.03] text-espresso/20 ring-espresso/[0.05]"
          : "bg-espresso text-cream ring-espresso hover:bg-bark"
      }`}
    >
      <Icon.arrow className={`h-5 w-5 stroke-current fill-none transition-transform duration-500 ease-spring ${flip ? "rotate-180" : ""} ${disabled ? "" : "group-hover:translate-x-0.5"}`} />
    </button>
  );
}
