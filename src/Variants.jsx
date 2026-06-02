import { useEffect, useState } from "react";
import { Icon } from "./ui.jsx";

// Standalone design-variants playground (route: #variants).
// Same content rendered in several premium themes so the look can be chosen,
// then the whole deck gets reskinned to the winner.

const FEATURES = [
  { g: Icon.funnel, t: "Продажи", d: "Воронка лид → ключи, все каналы и сквозная аналитика" },
  { g: Icon.crane, t: "Стройка", d: "Проекты, диаграмма Ганта, тендеры и закупки" },
  { g: Icon.track, t: "Сервис", d: "Личный кабинет дольщика и гарантийные обращения" },
];
const STATS = [
  { v: "₽214 млн", l: "продажи в работе" },
  { v: "37", l: "активных сделок" },
  { v: "68%", l: "готовность объекта" },
];

const THEMES = [
  {
    id: "midnight",
    name: "Полночное стекло",
    kind: "стекло",
    root: "bg-[#06070C] text-white",
    headFont: "font-sans",
    orbs: (
      <>
        <div className="absolute -left-24 -top-28 h-[34rem] w-[34rem] rounded-full bg-violet-600/30 blur-[110px]" />
        <div className="absolute right-[-6rem] top-1/4 h-[30rem] w-[30rem] rounded-full bg-cyan-400/25 blur-[120px]" />
        <div className="absolute bottom-[-8rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-[120px]" />
      </>
    ),
    eyebrow: "border-white/15 bg-white/5 text-white/70",
    dot: "bg-cyan-300",
    title: "text-white",
    accent: "bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent",
    titleItalic: false,
    sub: "text-white/55",
    card: "bg-white/[0.06] border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]",
    cardTitle: "text-white",
    cardText: "text-white/55",
    icon: "bg-white/10 text-cyan-200 ring-1 ring-white/15",
    cta: "bg-white text-[#06070C]",
    ctaIcon: "bg-black/10",
    statV: "text-white",
    statL: "text-white/45",
    divider: "border-white/10",
  },
  {
    id: "aurora",
    name: "Светлая аврора",
    kind: "стекло",
    root: "bg-[#EEF1F8] text-slate-900",
    headFont: "font-sans",
    orbs: (
      <>
        <div className="absolute -left-20 -top-24 h-[32rem] w-[32rem] rounded-full bg-fuchsia-300/45 blur-[110px]" />
        <div className="absolute right-[-5rem] top-1/4 h-[30rem] w-[30rem] rounded-full bg-sky-300/50 blur-[110px]" />
        <div className="absolute bottom-[-7rem] left-1/4 h-[26rem] w-[26rem] rounded-full bg-emerald-300/35 blur-[110px]" />
      </>
    ),
    eyebrow: "border-slate-900/10 bg-white/60 text-slate-600",
    dot: "bg-fuchsia-500",
    title: "text-slate-900",
    accent: "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent",
    titleItalic: false,
    sub: "text-slate-600",
    card: "bg-white/60 border border-white backdrop-blur-xl shadow-[0_24px_60px_-34px_rgba(30,40,80,0.55)]",
    cardTitle: "text-slate-900",
    cardText: "text-slate-500",
    icon: "bg-white text-indigo-500 ring-1 ring-slate-900/5 shadow-sm",
    cta: "bg-slate-900 text-white",
    ctaIcon: "bg-white/20",
    statV: "text-slate-900",
    statL: "text-slate-500",
    divider: "border-slate-900/10",
  },
  {
    id: "aurora-glass",
    name: "Аврора · стекло",
    kind: "жидкое стекло",
    root: "bg-[#E7EBF6] text-slate-900",
    headFont: "font-sans",
    orbs: (
      <>
        <div className="absolute -left-16 -top-20 h-[34rem] w-[34rem] rounded-full bg-fuchsia-400/55 blur-[90px]" />
        <div className="absolute right-[-4rem] top-1/5 h-[32rem] w-[32rem] rounded-full bg-sky-400/55 blur-[90px]" />
        <div className="absolute bottom-[-6rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-violet-400/45 blur-[90px]" />
        <div className="absolute bottom-4 right-1/4 h-[24rem] w-[24rem] rounded-full bg-emerald-300/45 blur-[90px]" />
      </>
    ),
    eyebrow: "border-white/60 bg-white/40 text-slate-700 backdrop-blur-md",
    dot: "bg-fuchsia-500",
    title: "text-slate-900",
    accent: "bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent",
    titleItalic: false,
    sub: "text-slate-700",
    card: "bg-white/35 border border-white/70 backdrop-blur-2xl shadow-[0_30px_70px_-30px_rgba(60,70,120,0.5),inset_0_1px_0_rgba(255,255,255,0.9)]",
    sheen: true,
    cardTitle: "text-slate-900",
    cardText: "text-slate-600",
    icon: "bg-white/70 text-violet-600 ring-1 ring-white shadow-sm backdrop-blur-md",
    cta: "bg-white/40 text-slate-900 border border-white/70 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]",
    ctaIcon: "bg-white/60",
    statV: "text-slate-900",
    statL: "text-slate-600",
    divider: "border-slate-900/10",
  },
  {
    id: "gold",
    name: "Тёмный люкс",
    kind: "графит + золото",
    root: "bg-[#0C0A07] text-[#F2E9D8]",
    headFont: "font-display",
    orbs: (
      <>
        <div className="absolute right-[-6rem] -top-24 h-[34rem] w-[34rem] rounded-full bg-[#C8A24B]/18 blur-[120px]" />
        <div className="absolute bottom-[-9rem] left-[-4rem] h-[30rem] w-[30rem] rounded-full bg-[#7A5A23]/20 blur-[120px]" />
      </>
    ),
    eyebrow: "border-[#C8A24B]/30 bg-[#C8A24B]/10 text-[#D9C188]",
    dot: "bg-[#C8A24B]",
    title: "text-[#F2E9D8]",
    accent: "italic text-[#D6B25E]",
    titleItalic: true,
    sub: "text-[#F2E9D8]/55",
    card: "bg-white/[0.03] border border-[#C8A24B]/18 backdrop-blur-md shadow-[inset_0_1px_0_rgba(214,178,94,0.12)]",
    cardTitle: "text-[#F2E9D8]",
    cardText: "text-[#F2E9D8]/50",
    icon: "bg-[#C8A24B]/12 text-[#D6B25E] ring-1 ring-[#C8A24B]/25",
    cta: "bg-[#C8A24B] text-[#0C0A07]",
    ctaIcon: "bg-black/10",
    statV: "text-[#D6B25E]",
    statL: "text-[#F2E9D8]/45",
    divider: "border-[#C8A24B]/15",
  },
  {
    id: "cream",
    name: "Тёплый (текущий)",
    kind: "editorial",
    root: "bg-[#FBF8F2] text-[#241B12]",
    headFont: "font-display",
    orbs: (
      <>
        <div className="absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-[#C2622C]/12 blur-[90px]" />
        <div className="absolute -bottom-40 -left-28 h-[30rem] w-[30rem] rounded-full bg-[#6E7A5E]/12 blur-[90px]" />
      </>
    ),
    eyebrow: "border-[#241B12]/15 bg-[#241B12]/[0.03] text-[#5C4A33]",
    dot: "bg-[#C2622C]",
    title: "text-[#241B12]",
    accent: "italic text-[#C2622C]",
    titleItalic: true,
    sub: "text-[#5C4A33]",
    card: "bg-white border border-[#241B12]/[0.06] shadow-[0_22px_50px_-32px_rgba(36,27,18,0.45)]",
    cardTitle: "text-[#241B12]",
    cardText: "text-[#5C4A33]",
    icon: "bg-[#C2622C]/10 text-[#C2622C] ring-1 ring-[#C2622C]/15",
    cta: "bg-[#241B12] text-[#FBF8F2]",
    ctaIcon: "bg-white/15",
    statV: "text-[#241B12]",
    statL: "text-[#5C4A33]/70",
    divider: "border-[#241B12]/10",
  },
];

export default function Variants() {
  const [i, setI] = useState(0);
  const th = THEMES[i];

  // this page scrolls; the deck normally locks body overflow
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className={`relative min-h-[100dvh] w-full overflow-x-hidden transition-colors duration-700 ${th.root}`}>
      {th.orbs}

      {/* switcher */}
      <div className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
        <div className="flex flex-wrap items-center gap-1 rounded-full border border-white/15 bg-black/20 p-1.5 backdrop-blur-2xl">
          {THEMES.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setI(idx)}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                idx === i ? "bg-white text-black" : "text-white/70 hover:text-white"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* back link */}
      <a
        href="#"
        onClick={() => setTimeout(() => location.reload(), 0)}
        className="fixed left-5 top-6 z-50 hidden text-[13px] font-medium text-white/60 transition-colors hover:text-white md:block"
        style={{ mixBlendMode: "difference" }}
      >
        ← к презентации
      </a>

      {/* sample slide */}
      <div key={th.id} className="relative mx-auto flex min-h-[100dvh] max-w-[1180px] animate-floatUp flex-col justify-center px-6 py-24 md:px-12">
        <span className={`inline-flex w-max items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] ${th.eyebrow}`}>
          <span className={`h-1 w-1 rounded-full ${th.dot}`} />
          Битрикс24 · {th.kind}
        </span>

        <h1 className={`mt-6 max-w-3xl text-[3rem] font-semibold leading-[1.02] tracking-tight md:text-[4.6rem] ${th.headFont} ${th.title}`}>
          Битрикс24 <br />
          <span className={th.accent}>для застройщика</span>
        </h1>

        <p className={`mt-6 max-w-xl text-lg leading-relaxed md:text-xl ${th.sub}`}>
          Единая система: продажи, стройка и сервис в одном окне. Один и тот же контент — разные настроения дизайна.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <span className={`group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold ${th.cta}`}>
            Смотреть презентацию
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${th.ctaIcon}`}>
              <Icon.arrowUpRight className="h-4 w-4 stroke-current fill-none" />
            </span>
          </span>
        </div>

        {/* feature cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.t} className={`relative overflow-hidden rounded-[1.6rem] p-6 ${th.card}`}>
              {th.sheen && <div className="pointer-events-none absolute inset-x-0 -top-px h-2/3 bg-gradient-to-b from-white/55 to-transparent" />}
              <span className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${th.icon}`}>
                <f.g className="h-6 w-6 stroke-current fill-none" />
              </span>
              <h3 className={`mt-4 text-xl font-semibold ${th.headFont} ${th.cardTitle}`}>{f.t}</h3>
              <p className={`mt-1.5 text-[15px] leading-relaxed ${th.cardText}`}>{f.d}</p>
            </div>
          ))}
        </div>

        {/* stats */}
        <div className={`mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t pt-6 ${th.divider}`}>
          {STATS.map((s) => (
            <div key={s.l}>
              <div className={`text-3xl font-semibold ${th.headFont} ${th.statV}`}>{s.v}</div>
              <div className={`mt-1 text-sm ${th.statL}`}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
