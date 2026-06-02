import { useMemo, useState } from "react";
import { Icon } from "./ui.jsx";

// Live demo: interactive apartment "chessboard" wired to a mock Bitrix24 deal.
// Pick a free flat -> book it -> a CRM deal card materialises (the sync story).

const STATUS = {
  free: { label: "Свободна", dot: "bg-sage", cell: "bg-sage/12 text-bark ring-sage/25 hover:bg-sage/20", live: true },
  booked: { label: "Бронь", dot: "bg-ember", cell: "bg-ember/15 text-ember ring-ember/25", live: false },
  sold: { label: "Продана", dot: "bg-espresso/40", cell: "bg-espresso/[0.06] text-espresso/35 ring-espresso/10", live: false },
};

const ROOMS = { 1: "1-комн.", 2: "2-комн.", 3: "3-комн." };

// deterministic plan for "Дом №8" — 7 floors × 4 flats
function buildPlan() {
  const seed = [2, 0, 1, 2, 1, 0, 0, 1, 2, 0, 1, 1, 0, 2, 0, 1, 1, 0, 0, 2, 0, 1, 0, 0, 1, 0, 0, 2]; // 0 free,1 booked,2 sold
  const roomsByCol = [1, 2, 2, 3];
  const flats = [];
  let k = 0;
  for (let floor = 7; floor >= 1; floor--) {
    for (let col = 0; col < 4; col++) {
      const s = seed[k] === 0 ? "free" : seed[k] === 1 ? "booked" : "sold";
      const rooms = roomsByCol[col];
      const area = { 1: 38, 2: 54, 3: 72 }[rooms] + col + floor * 0.4;
      const num = floor * 10 + (col + 1);
      flats.push({
        id: num,
        num,
        floor,
        rooms,
        area: Math.round(area * 10) / 10,
        price: Math.round((area * 92) / 10) / 100, // млн ₽
        status: s,
      });
      k++;
    }
  }
  return flats;
}

export default function Shahmatka() {
  const initial = useMemo(buildPlan, []);
  const [flats, setFlats] = useState(initial);
  const [sel, setSel] = useState(null);
  const [deal, setDeal] = useState(null);

  const selFlat = flats.find((f) => f.id === sel) || null;
  const counts = flats.reduce((a, f) => ((a[f.status] = (a[f.status] || 0) + 1), a), {});

  function book(flat) {
    setFlats((prev) => prev.map((f) => (f.id === flat.id ? { ...f, status: "booked" } : f)));
    setDeal({
      id: 1240 + flat.id,
      flat,
      stage: "Бронь",
    });
  }

  function reset() {
    setFlats(initial);
    setSel(null);
    setDeal(null);
  }

  return (
    <div className="grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr]">
      {/* ─── shahmatka grid ─── */}
      <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] bg-white/80 p-5">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-umber">Жилой комплекс · Дом №8</p>
            <h3 className="font-display text-2xl font-semibold text-espresso">Шахматка квартир</h3>
          </div>
          <div className="flex gap-3 text-xs">
            {Object.entries(STATUS).map(([k, v]) => (
              <span key={k} className="inline-flex items-center gap-1.5 text-umber">
                <span className={`h-2 w-2 rounded-full ${v.dot}`} />
                {v.label} · {counts[k] || 0}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 gap-2">
          {/* floor rail */}
          <div className="flex flex-col justify-around pr-1 text-[11px] font-medium text-umber/70">
            {[7, 6, 5, 4, 3, 2, 1].map((fl) => (
              <span key={fl} className="leading-none">{fl} эт.</span>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-4 gap-2">
            {flats.map((f) => {
              const st = STATUS[f.status];
              const active = sel === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => st.live && setSel(f.id)}
                  disabled={!st.live}
                  className={`group relative flex flex-col items-start justify-center rounded-xl px-2.5 py-2 text-left ring-1 transition-all duration-300 ease-spring ${st.cell} ${
                    st.live ? "cursor-pointer hover:-translate-y-0.5" : "cursor-not-allowed"
                  } ${active ? "ring-2 ring-ember ring-offset-1 ring-offset-cream" : ""}`}
                >
                  <span className="text-base font-bold leading-none">№{f.num}</span>
                  <span className="mt-1 text-[11px] leading-tight opacity-80">
                    {f.rooms}к · {f.area} м²
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-3 text-xs text-umber/70">
          Кликните <span className="font-semibold text-sage">свободную</span> квартиру — бронь уйдёт в CRM →
        </p>
      </div>

      {/* ─── detail + CRM card ─── */}
      <div className="flex h-full flex-col gap-4">
        <div className="flex-1 rounded-[calc(2rem-0.375rem)] bg-bark p-5 text-cream">
          {!selFlat ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <Icon.grid className="h-7 w-7 stroke-current fill-none text-cream/80" />
              </span>
              <p className="mt-4 max-w-[14rem] text-sm text-cream/70">
                Выберите квартиру на плане, чтобы увидеть карточку и оформить бронь
              </p>
            </div>
          ) : (
            <div className="flex h-full flex-col">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ember/90">Квартира</p>
              <div className="mt-1 flex items-baseline gap-3">
                <h3 className="font-display text-3xl font-semibold">№{selFlat.num}</h3>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium">{ROOMS[selFlat.rooms]}</span>
              </div>

              {/* floor plan */}
              <div className="mt-3 flex min-h-0 flex-1 flex-col rounded-2xl bg-white/[0.92] p-3">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-bark/45">Планировка</p>
                <div className="min-h-0 flex-1">
                  <FloorPlan rooms={selFlat.rooms} />
                </div>
              </div>

              {/* compact specs */}
              <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-cream/70">
                <span>Этаж <b className="text-cream">{selFlat.floor}/7</b></span>
                <span className="text-cream/25">·</span>
                <span>Площадь <b className="text-cream">{selFlat.area} м²</b></span>
                <span className="text-cream/25">·</span>
                <span>Цена <b className="text-cream">{selFlat.price} млн ₽</b></span>
              </div>

              <div className="mt-3">
                {selFlat.status === "free" ? (
                  <button
                    onClick={() => book(selFlat)}
                    className="group flex w-full items-center justify-between rounded-full bg-ember px-5 py-3 text-sm font-semibold text-cream transition-all duration-500 ease-spring active:scale-[0.98]"
                  >
                    Забронировать в CRM
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                      <Icon.arrowUpRight className="h-4 w-4 stroke-current fill-none" />
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-full bg-white/10 py-3 text-sm font-medium text-cream/80">
                    <Icon.check className="h-4 w-4 stroke-current fill-none text-sage" /> Бронь оформлена
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* mock Bitrix24 deal card */}
        <div
          className={`rounded-[calc(2rem-0.375rem)] bg-white/80 p-4 ring-1 ring-espresso/[0.06] transition-all duration-700 ease-spring ${
            deal ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-umber">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#2FC6F6] text-[9px] font-bold text-white">B24</span>
              Новая сделка
            </span>
            {deal && <span className="text-[11px] text-umber/70">#{deal.id}</span>}
          </div>
          {deal && (
            <div className="mt-3">
              <p className="font-display text-lg font-semibold text-espresso">
                Бронь · кв. №{deal.flat.num}, {deal.flat.area} м²
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                {["Лид", "Бронь", "ДДУ", "Ипотека", "Сделка"].map((s) => {
                  const done = s === "Бронь";
                  return (
                    <span
                      key={s}
                      className={`flex-1 rounded-full px-1 py-1.5 text-center text-[10px] font-medium ${
                        done ? "bg-ember text-cream" : "bg-espresso/[0.05] text-umber/60"
                      }`}
                    >
                      {s}
                    </span>
                  );
                })}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-umber">
                <span>Сумма: <b className="text-espresso">{deal.flat.price} млн ₽</b></span>
                <span>Ответственный: <b className="text-espresso">авто</b></span>
              </div>
            </div>
          )}
        </div>

        {deal && (
          <button onClick={reset} className="self-end text-[11px] font-medium text-umber underline-offset-2 hover:underline">
            Сбросить демо
          </button>
        )}
      </div>
    </div>
  );
}

// ─── schematic floor plans (drawn, not images) — vary by room count ───
const PLANS = {
  1: {
    rooms: [
      { x: 6, y: 6, w: 64, h: 46, l: "С/у" },
      { x: 6, y: 52, w: 64, h: 40, l: "Прихожая" },
      { x: 6, y: 92, w: 64, h: 52, l: "Кухня" },
      { x: 70, y: 6, w: 110, h: 138, l: "Комната" },
    ],
    balcony: { x: 180, y: 36, w: 34, h: 78 },
    win: [[110, 6, 150, 6], [6, 108, 6, 130]],
  },
  2: {
    rooms: [
      { x: 6, y: 6, w: 70, h: 54, l: "Кухня" },
      { x: 6, y: 60, w: 70, h: 36, l: "С/у" },
      { x: 6, y: 96, w: 70, h: 48, l: "Прихожая" },
      { x: 76, y: 6, w: 104, h: 78, l: "Гостиная" },
      { x: 76, y: 84, w: 104, h: 60, l: "Спальня" },
    ],
    balcony: { x: 180, y: 30, w: 34, h: 84 },
    win: [[112, 6, 152, 6], [6, 18, 6, 44]],
  },
  3: {
    rooms: [
      { x: 6, y: 6, w: 64, h: 52, l: "Кухня" },
      { x: 6, y: 58, w: 64, h: 34, l: "С/у" },
      { x: 6, y: 92, w: 64, h: 52, l: "Прихожая" },
      { x: 70, y: 6, w: 72, h: 82, l: "Гостиная" },
      { x: 70, y: 88, w: 72, h: 56, l: "Спальня" },
      { x: 142, y: 6, w: 72, h: 82, l: "Спальня" },
      { x: 142, y: 88, w: 72, h: 56, l: "Ванная" },
    ],
    win: [[88, 6, 124, 6], [160, 6, 196, 6]],
  },
};

export function FloorPlan({ rooms }) {
  const plan = PLANS[rooms] || PLANS[2];
  const WALL = "#51607A";
  return (
    <svg viewBox="0 0 220 150" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {plan.rooms.map((r, i) => (
        <g key={i}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="#7C3AED" fillOpacity="0.05" stroke={WALL} strokeOpacity="0.4" strokeWidth="1.1" />
          <text x={r.x + r.w / 2} y={r.y + r.h / 2} fontSize="7.5" fontWeight="600" fill="#51607A" textAnchor="middle" dominantBaseline="central">{r.l}</text>
        </g>
      ))}
      {plan.balcony && (
        <g>
          <rect x={plan.balcony.x} y={plan.balcony.y} width={plan.balcony.w} height={plan.balcony.h} fill="#0EA5E9" fillOpacity="0.07" stroke={WALL} strokeOpacity="0.35" strokeWidth="1.1" />
          <text x={plan.balcony.x + plan.balcony.w / 2} y={plan.balcony.y + plan.balcony.h / 2} fontSize="7" fontWeight="600" fill="#51607A" textAnchor="middle" dominantBaseline="central" transform={`rotate(-90 ${plan.balcony.x + plan.balcony.w / 2} ${plan.balcony.y + plan.balcony.h / 2})`}>Балкон</text>
        </g>
      )}
      {(plan.win || []).map((w, i) => (
        <line key={`w${i}`} x1={w[0]} y1={w[1]} x2={w[2]} y2={w[3]} stroke="#7C3AED" strokeWidth="2.6" strokeLinecap="round" />
      ))}
      <rect x="6" y="6" width="208" height="138" fill="none" stroke={WALL} strokeWidth="2.4" />
    </svg>
  );
}

function Spec({ label, value }) {
  return (
    <div className="rounded-xl bg-white/[0.06] px-3 py-2 ring-1 ring-white/10">
      <dt className="text-[11px] uppercase tracking-wider text-cream/50">{label}</dt>
      <dd className="mt-0.5 text-[15px] font-semibold text-cream">{value}</dd>
    </div>
  );
}
