// Stylized Bitrix24-native UI mockups (no real screenshots — clean, on-brand,
// swap-ready). Renders inside an app-window chrome so it reads as "это Битрикс24".

const STAGES = [
  {
    name: "Лид",
    accent: "#9AA7B0",
    sum: "—",
    deals: [
      { who: "Орлова Н.", what: "1-комн., с сайта", sum: "3.5", av: "#C2622C" },
      { who: "Гусев П.", what: "ЦИАН, перезвон", sum: "4.1", av: "#6E7A5E" },
    ],
  },
  {
    name: "Бронь",
    accent: "#2FC6F6",
    sum: "11.0",
    deals: [
      { who: "Седов А.", what: "кв. №72, 57.8 м²", sum: "5.3", av: "#3D6CB0" },
      { who: "Лыкова И.", what: "кв. №41, 39.6 м²", sum: "5.7", av: "#B07B3C" },
    ],
  },
  {
    name: "ДДУ",
    accent: "#7E57C2",
    sum: "6.4",
    deals: [{ who: "Зорин В.", what: "кв. №33, эскроу", sum: "6.4", av: "#9D5BA8" }],
  },
  {
    name: "Ипотека",
    accent: "#F4A52F",
    sum: "7.2",
    deals: [{ who: "Юдина С.", what: "Сбер, одобрено", sum: "7.2", av: "#C2622C" }],
  },
  {
    name: "Сделка",
    accent: "#4FB36B",
    sum: "5.9",
    deals: [{ who: "Котов Д.", what: "кв. №12, оплата", sum: "5.9", av: "#4FB36B" }],
  },
];

export function CrmKanban() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#eef2f4]">
      {/* app top bar */}
      <div className="flex items-center gap-3 bg-white px-5 py-3 ring-1 ring-black/[0.04]">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#2FC6F6] text-[10px] font-bold text-white">B24</span>
        <span className="text-sm font-semibold text-[#1a2026]">CRM · Воронка продаж</span>
        <span className="ml-1 rounded-md bg-[#eef2f4] px-2 py-0.5 text-xs font-medium text-[#5a6772]">Канбан</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden rounded-md bg-[#eef2f4] px-3 py-1 text-xs text-[#5a6772] sm:inline">Фильтр</span>
          <span className="rounded-md bg-[#2FC6F6] px-3 py-1 text-xs font-semibold text-white">+ Сделка</span>
        </div>
      </div>

      {/* columns */}
      <div className="flex flex-1 gap-2.5 overflow-hidden p-3">
        {STAGES.map((st, ci) => (
          <div key={st.name} className="flex min-w-0 flex-1 flex-col">
            {/* column header */}
            <div className="mb-2 rounded-lg bg-white px-3 py-2 ring-1 ring-black/[0.03]">
              <div className="flex items-center justify-between">
                <span className="truncate text-[13px] font-semibold text-[#1a2026]">{st.name}</span>
                <span className="text-[11px] text-[#8a97a0]">{st.deals.length}</span>
              </div>
              <div className="mt-0.5 h-1 rounded-full" style={{ background: st.accent }} />
              <p className="mt-1.5 text-[11px] font-medium text-[#5a6772]">{st.sum === "—" ? "—" : `${st.sum} млн ₽`}</p>
            </div>
            {/* deal cards */}
            <div className="flex flex-col gap-2">
              {st.deals.map((d, di) => (
                <div
                  key={d.who}
                  className="animate-floatUp rounded-lg bg-white p-2.5 shadow-[0_1px_2px_rgba(26,32,38,0.06)] ring-1 ring-black/[0.03]"
                  style={{ animationDelay: `${200 + (ci * 2 + di) * 70}ms`, borderLeft: `3px solid ${st.accent}` }}
                >
                  <p className="truncate text-[13px] font-semibold text-[#1a2026]">{d.who}</p>
                  <p className="mt-0.5 truncate text-[11px] text-[#7a8893]">{d.what}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[12px] font-bold text-[#1a2026]">{d.sum} млн ₽</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: d.av }}>
                      {d.who[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
