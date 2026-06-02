// Shared premium UI primitives — Editorial Luxury system.
// Thin-line icons (Phosphor-light style), double-bezel cards, eyebrow tags.

const ic = "stroke-current fill-none";
const sw = 1.25;

export const Icon = {
  funnel: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  channels: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
    </svg>
  ),
  chart: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <path d="M4 4v16h16" strokeLinecap="round" />
      <path d="M8 14l3-4 3 2 4-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  phone: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <path d="M6 3h3l1.5 5-2 1.5a12 12 0 0 0 6 6l1.5-2 5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
    </svg>
  ),
  crane: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <path d="M5 21V5l14 2M5 8h9M5 5l4-2M11 8v4m0 0H8m3 0h3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  handshake: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <path d="M3 8l4-2 5 3 5-3 4 2v7l-4 2-3-2M3 8v7l4 2 3-2 2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  doc: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <path d="M6 3h8l4 4v14H6V3Z" strokeLinejoin="round" />
      <path d="M14 3v4h4M9 12h6M9 16h6" strokeLinecap="round" />
    </svg>
  ),
  people: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.7" strokeLinecap="round" />
    </svg>
  ),
  gauge: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <path d="M4 16a8 8 0 1 1 16 0" strokeLinecap="round" />
      <path d="M12 16l4-4" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" className="fill-current" />
    </svg>
  ),
  shield: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  track: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <path d="M3 12h4l2-7 3 14 2-7h7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  grid: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  ),
  spark: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" strokeLinecap="round" />
    </svg>
  ),
  route: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={sw} {...p}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.5 6H15a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6.5" strokeLinecap="round" />
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={1.4} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  arrowUpRight: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={1.4} {...p}>
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 24 24" className={ic} strokeWidth={1.5} {...p}>
      <path d="M5 12l4 4 10-11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-espresso/15 bg-espresso/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-umber ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-ember" />
      {children}
    </span>
  );
}

// Double-bezel card: outer machined tray + inner core with inset highlight.
export function Bezel({ children, className = "", inner = "", tone = "light" }) {
  const trays = {
    light: "bg-espresso/[0.04] ring-1 ring-espresso/[0.06]",
    warm: "bg-clay/40 ring-1 ring-espresso/[0.07]",
    dark: "bg-espresso/80 ring-1 ring-white/10",
  };
  const cores = {
    light: "bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_20px_50px_-30px_rgba(36,27,18,0.45)]",
    warm: "bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_20px_50px_-30px_rgba(36,27,18,0.45)]",
    dark: "bg-bark text-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]",
  };
  return (
    <div className={`rounded-[2rem] p-1.5 ${trays[tone]} ${className}`}>
      <div className={`h-full rounded-[calc(2rem-0.375rem)] ${cores[tone]} ${inner}`}>{children}</div>
    </div>
  );
}

export function IconCircle({ glyph: Glyph, className = "", tone = "ember" }) {
  const tones = {
    ember: "bg-ember/10 text-ember ring-ember/15",
    bark: "bg-bark/[0.06] text-bark ring-bark/10",
    sage: "bg-sage/12 text-sage ring-sage/20",
    cream: "bg-white/10 text-cream ring-white/15",
  };
  return (
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${tones[tone]} ${className}`}>
      <Glyph className="h-6 w-6 stroke-current fill-none" />
    </span>
  );
}

export function PillButton({ children, tone = "dark" }) {
  const tones = {
    dark: "bg-espresso text-cream",
    ember: "bg-ember text-cream",
    ghost: "bg-espresso/[0.04] text-espresso ring-1 ring-espresso/10",
  };
  return (
    <span className={`group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-500 ease-spring active:scale-[0.98] ${tones[tone]}`}>
      {children}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-all duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
        <Icon.arrowUpRight className="h-4 w-4" />
      </span>
    </span>
  );
}

// staggered float-up; pass index for delay
export function Reveal({ children, i = 0, className = "" }) {
  return (
    <div className={`animate-floatUp ${className}`} style={{ animationDelay: `${120 + i * 90}ms` }}>
      {children}
    </div>
  );
}
