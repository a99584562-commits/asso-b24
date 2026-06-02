import { useRef, useState } from "react";

// Stylized Bitrix24-native CRM Kanban — now LIVE: drag a deal between stages
// (mouse or touch), column sums recompute. Reads as a real Битрикс24 board.

const COLS = [
  { name: "Лид", accent: "#9AA7B0" },
  { name: "Бронь", accent: "#2FC6F6" },
  { name: "ДДУ", accent: "#7E57C2" },
  { name: "Ипотека", accent: "#F4A52F" },
  { name: "Сделка", accent: "#4FB36B" },
];

const INIT = [
  { id: 1, who: "Орлова Н.", what: "1-комн., с сайта", sum: 3.5, av: "#C2622C", stage: 0 },
  { id: 2, who: "Гусев П.", what: "ЦИАН, перезвон", sum: 4.1, av: "#6E7A5E", stage: 0 },
  { id: 3, who: "Седов А.", what: "кв. №72, 57.8 м²", sum: 5.3, av: "#3D6CB0", stage: 1 },
  { id: 4, who: "Лыкова И.", what: "кв. №41, 39.6 м²", sum: 5.7, av: "#B07B3C", stage: 1 },
  { id: 5, who: "Зорин В.", what: "кв. №33, эскроу", sum: 6.4, av: "#9D5BA8", stage: 2 },
  { id: 6, who: "Юдина С.", what: "Сбер, одобрено", sum: 7.2, av: "#C2622C", stage: 3 },
  { id: 7, who: "Котов Д.", what: "кв. №12, оплата", sum: 5.9, av: "#4FB36B", stage: 4 },
];

export function CrmKanban() {
  const [deals, setDeals] = useState(INIT);
  const [drag, setDrag] = useState(null); // {id, x, y, dx, dy, w, h}
  const [over, setOver] = useState(null); // column index under pointer
  const [moved, setMoved] = useState(false);
  const colRefs = useRef([]);

  const sumOf = (stage) => deals.filter((d) => d.stage === stage).reduce((a, d) => a + d.sum, 0);

  // map any X to the nearest column (gaps snap left, overflow snaps to edges)
  function colAt(clientX) {
    const rects = colRefs.current.map((el) => el?.getBoundingClientRect());
    if (!rects[0]) return null;
    for (let i = 0; i < rects.length; i++) {
      if (rects[i] && clientX <= rects[i].right + 6) return i;
    }
    return rects.length - 1;
  }

  function onDown(e, deal) {
    if (e.button === 1 || e.button === 2) return;
    e.stopPropagation();
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    try {
      card.setPointerCapture(e.pointerId);
    } catch {
      /* synthetic / unsupported pointer */
    }
    setMoved(false);
    setDrag({ id: deal.id, x: e.clientX, y: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top, w: r.width, h: r.height });
    setOver(deal.stage);
  }
  function onMove(e) {
    if (!drag) return;
    e.stopPropagation();
    setMoved(true);
    setDrag((d) => (d ? { ...d, x: e.clientX, y: e.clientY } : d));
    setOver(colAt(e.clientX));
  }
  function onUp(e) {
    if (!drag) return;
    e.stopPropagation();
    const target = colAt(e.clientX);
    if (target != null) setDeals((ds) => ds.map((d) => (d.id === drag.id ? { ...d, stage: target } : d)));
    setDrag(null);
    setOver(null);
  }

  const dragDeal = drag ? deals.find((d) => d.id === drag.id) : null;

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#eef2f4]"
      onTouchStart={(e) => e.stopPropagation()}
    >
      {/* app top bar */}
      <div className="flex items-center gap-3 bg-white px-5 py-3 ring-1 ring-black/[0.04]">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#2FC6F6] text-[10px] font-bold text-white">B24</span>
        <span className="text-sm font-semibold text-[#1a2026]">CRM · Воронка продаж</span>
        <span className="ml-1 rounded-md bg-[#eef2f4] px-2 py-0.5 text-xs font-medium text-[#5a6772]">Канбан</span>
        <span className="ml-auto hidden items-center gap-1.5 text-xs text-[#8a97a0] sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4FB36B]" />
          перетащите сделку между стадиями
        </span>
        <span className="rounded-md bg-[#2FC6F6] px-3 py-1 text-xs font-semibold text-white">+ Сделка</span>
      </div>

      {/* columns */}
      <div className="flex flex-1 gap-2.5 overflow-hidden p-3">
        {COLS.map((c, ci) => {
          const colDeals = deals.filter((d) => d.stage === ci);
          const sum = sumOf(ci);
          const isOver = over === ci && drag;
          return (
            <div
              key={c.name}
              ref={(el) => (colRefs.current[ci] = el)}
              className={`flex min-w-0 flex-1 flex-col rounded-xl transition-colors duration-200 ${isOver ? "bg-[#2FC6F6]/10 ring-2 ring-[#2FC6F6]/40" : ""}`}
            >
              {/* column header */}
              <div className="mb-2 rounded-lg bg-white px-3 py-2 ring-1 ring-black/[0.03]">
                <div className="flex items-center justify-between">
                  <span className="truncate text-[13px] font-semibold text-[#1a2026]">{c.name}</span>
                  <span className="text-[11px] text-[#8a97a0]">{colDeals.length}</span>
                </div>
                <div className="mt-0.5 h-1 rounded-full" style={{ background: c.accent }} />
                <p className="mt-1.5 text-[11px] font-medium text-[#5a6772] tabular-nums">{sum > 0 ? `${sum.toFixed(1)} млн ₽` : "—"}</p>
              </div>
              {/* deal cards */}
              <div className="flex flex-col gap-2 px-0.5">
                {colDeals.map((d, di) => {
                  const isDragging = drag?.id === d.id;
                  return (
                    <div
                      key={d.id}
                      onPointerDown={(e) => onDown(e, d)}
                      onPointerMove={onMove}
                      onPointerUp={onUp}
                      style={{
                        borderLeft: `3px solid ${c.accent}`,
                        touchAction: "none",
                        animationDelay: `${150 + (ci * 2 + di) * 60}ms`,
                        opacity: isDragging ? 0.25 : 1,
                      }}
                      className="animate-floatUp cursor-grab touch-none select-none rounded-lg bg-white p-2.5 shadow-[0_1px_2px_rgba(26,32,38,0.06)] ring-1 ring-black/[0.03] transition-shadow active:cursor-grabbing hover:shadow-[0_4px_12px_rgba(26,32,38,0.12)]"
                    >
                      <p className="truncate text-[13px] font-semibold text-[#1a2026]">{d.who}</p>
                      <p className="mt-0.5 truncate text-[11px] text-[#7a8893]">{d.what}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[12px] font-bold text-[#1a2026] tabular-nums">{d.sum.toFixed(1)} млн ₽</span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: d.av }}>
                          {d.who[0]}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* floating drag ghost */}
      {drag && dragDeal && moved && (
        <div
          className="pointer-events-none fixed z-50 rotate-2 rounded-lg bg-white p-2.5 shadow-[0_18px_40px_rgba(26,32,38,0.28)] ring-1 ring-black/10"
          style={{
            left: drag.x - drag.dx,
            top: drag.y - drag.dy,
            width: drag.w,
            borderLeft: `3px solid ${COLS[dragDeal.stage].accent}`,
          }}
        >
          <p className="truncate text-[13px] font-semibold text-[#1a2026]">{dragDeal.who}</p>
          <p className="mt-0.5 truncate text-[11px] text-[#7a8893]">{dragDeal.what}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#1a2026] tabular-nums">{dragDeal.sum.toFixed(1)} млн ₽</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: dragDeal.av }}>
              {dragDeal.who[0]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
