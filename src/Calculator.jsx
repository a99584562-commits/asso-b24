import { useMemo, useState } from "react";
import { Icon } from "./ui.jsx";

// Live mortgage calculator widget — the kind that sits on the developer's site
// and drops a ready lead into Bitrix24. Real annuity math, instant recalcs.

const PROGRAMS = [
  { id: "family", label: "Семейная", rate: 6 },
  { id: "it", label: "IT-ипотека", rate: 5 },
  { id: "gov", label: "Господдержка", rate: 8 },
  { id: "base", label: "Базовая", rate: 18 },
];

const fmt = (n) => Math.round(n).toLocaleString("ru-RU");

function Range({ label, value, min, max, step, onChange, suffix }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] font-medium text-umber">{label}</span>
        <span className="font-display text-lg font-semibold text-espresso tabular-nums">
          {fmt(value)} {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerDown={(e) => e.stopPropagation()}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none"
        style={{ background: `linear-gradient(90deg, #C2622C ${pct}%, #E6D9C5 ${pct}%)`, touchAction: "none" }}
      />
    </div>
  );
}

export default function Calculator() {
  const [price, setPrice] = useState(6_000_000);
  const [downPct, setDownPct] = useState(20);
  const [term, setTerm] = useState(20);
  const [prog, setProg] = useState(PROGRAMS[0]);
  const [lead, setLead] = useState(false);

  const { payment, loan, down } = useMemo(() => {
    const down = (price * downPct) / 100;
    const loan = price - down;
    const mr = prog.rate / 100 / 12;
    const n = term * 12;
    const payment = mr === 0 ? loan / n : (loan * mr) / (1 - Math.pow(1 + mr, -n));
    return { payment, loan, down };
  }, [price, downPct, term, prog]);

  return (
    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[1fr_0.85fr]">
      {/* controls — site widget look */}
      <div className="flex flex-col rounded-[calc(2rem-0.375rem)] bg-cream p-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ember/10 text-ember ring-1 ring-ember/15">
            <Icon.gauge className="h-5 w-5 stroke-current fill-none" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-umber">Виджет на сайт</p>
            <h3 className="font-display text-lg font-semibold text-espresso">Ипотечный калькулятор</h3>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <Range label="Стоимость квартиры" value={price} min={2_000_000} max={15_000_000} step={100_000} onChange={setPrice} suffix="₽" />
          <Range label="Первоначальный взнос" value={downPct} min={10} max={60} step={5} onChange={setDownPct} suffix="%" />
          <Range label="Срок кредита" value={term} min={5} max={30} step={1} onChange={setTerm} suffix="лет" />
        </div>

        <div className="mt-6">
          <p className="mb-2 text-[13px] font-medium text-umber">Программа</p>
          <div className="flex flex-wrap gap-2">
            {PROGRAMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setProg(p)}
                onPointerDown={(e) => e.stopPropagation()}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300 ease-spring ${
                  prog.id === p.id ? "bg-espresso text-cream" : "bg-espresso/[0.05] text-umber hover:bg-espresso/10"
                }`}
              >
                {p.label} · {p.rate}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* result panel */}
      <div className="flex flex-col rounded-[calc(2rem-0.375rem)] bg-bark p-6 text-cream">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ember/90">Ежемесячный платёж</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span key={Math.round(payment)} className="animate-floatUp font-display text-[2.7rem] font-semibold leading-none tabular-nums">
            {fmt(payment)}
          </span>
          <span className="text-lg text-cream/70">₽/мес</span>
        </div>

        <dl className="mt-6 space-y-3 text-sm">
          <Row label="Сумма кредита" value={`${fmt(loan)} ₽`} />
          <Row label="Первый взнос" value={`${fmt(down)} ₽`} />
          <Row label="Ставка" value={`${prog.rate}% · ${prog.label}`} />
        </dl>

        <div className="mt-auto pt-6">
          {!lead ? (
            <button
              onClick={() => setLead(true)}
              onPointerDown={(e) => e.stopPropagation()}
              className="group flex w-full items-center justify-between rounded-full bg-ember px-5 py-3.5 text-sm font-semibold text-cream transition-all duration-500 ease-spring active:scale-[0.98]"
            >
              Оставить заявку
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <Icon.arrowUpRight className="h-4 w-4 stroke-current fill-none" />
              </span>
            </button>
          ) : (
            <div className="animate-floatUp rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-white/10">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#2FC6F6] text-[9px] font-bold text-white">B24</span>
                <span className="text-[13px] font-semibold text-cream">Лид создан в Битрикс24</span>
                <Icon.check className="ml-auto h-4 w-4 stroke-current fill-none text-sage" />
              </div>
              <p className="mt-1.5 text-xs text-cream/60">Менеджер перезвонит — расчёт уже в карточке сделки</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
      <dt className="text-cream/60">{label}</dt>
      <dd className="font-semibold tabular-nums text-cream">{value}</dd>
    </div>
  );
}
