const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
p.author = "ЛАЙМ";
p.title = "Битрикс24 для застройщика";
p.theme = { headFontFace: "Calibri", bodyFontFace: "Calibri" };

// ── palette (Аврора · стекло) ──
const BG = "F4F6FD", INK = "0F1729", SUB = "51607A", MUT = "8A93A8";
const VIOLET = "7C3AED", FUCHSIA = "D946EF", SKY = "0EA5E9", EMER = "10B981";
const CARD = "FFFFFF", BORDER = "E4E8F3", CHIP = "EDE9FE", DARK = "241F47";
const W = 13.33, H = 7.5, MX = 0.7;
const HEAD = "Calibri", BODY = "Calibri";

const SHADOW = { type: "outer", color: "8893B0", blur: 12, offset: 4, angle: 90, opacity: 0.22 };

function base(slide, orbs = "soft") {
  slide.background = { color: BG };
  if (orbs === "none") return;
  // faint aurora washes via high-transparency ovals
  slide.addShape(p.shapes.OVAL, { x: -2.2, y: -2.4, w: 7, h: 7, fill: { color: FUCHSIA, transparency: 90 }, line: { type: "none" } });
  slide.addShape(p.shapes.OVAL, { x: W - 5.2, y: -2.6, w: 8, h: 8, fill: { color: SKY, transparency: 90 }, line: { type: "none" } });
  if (orbs === "full") {
    slide.addShape(p.shapes.OVAL, { x: W - 4.4, y: H - 4.6, w: 7, h: 7, fill: { color: VIOLET, transparency: 91 }, line: { type: "none" } });
    slide.addShape(p.shapes.OVAL, { x: -1.8, y: H - 3.6, w: 6, h: 6, fill: { color: EMER, transparency: 93 }, line: { type: "none" } });
  }
}

function eyebrow(slide, text, y = 0.5) {
  slide.addText(text.toUpperCase(), {
    x: MX, y, w: 8, h: 0.32, fontFace: HEAD, fontSize: 11, bold: true, color: VIOLET, charSpacing: 3, align: "left", valign: "middle", margin: 0,
  });
}

function pageTag(slide, section, n) {
  slide.addText(`${section.toUpperCase()}   ·   ${String(n).padStart(2, "0")} / 22`, {
    x: W - 4.7, y: 0.32, w: 4, h: 0.3, fontFace: HEAD, fontSize: 10, bold: true, color: MUT, align: "right", valign: "middle", charSpacing: 2, margin: 0,
  });
}

function title(slide, text, y = 0.92, size = 33) {
  slide.addText(text, { x: MX, y, w: W - 2 * MX, h: 0.95, fontFace: HEAD, fontSize: size, bold: true, color: INK, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 0.98 });
}

function lead(slide, text, y, h = 0.9) {
  slide.addText(text, { x: MX, y, w: W - 2 * MX - 0.2, h, fontFace: BODY, fontSize: 15, color: SUB, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
}

function card(slide, x, y, w, h, fill = CARD) {
  slide.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.14, fill: { color: fill }, line: { color: BORDER, width: 1 }, shadow: SHADOW });
}

function chipNum(slide, x, y, n, color = VIOLET) {
  slide.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w: 0.62, h: 0.62, rectRadius: 0.14, fill: { color: CHIP }, line: { type: "none" } });
  slide.addText(String(n), { x, y, w: 0.62, h: 0.62, fontFace: HEAD, fontSize: 20, bold: true, color, align: "center", valign: "middle", margin: 0 });
}

// generic feature-card grid (icon-chip + title + desc)
function cardGrid(slide, items, opts) {
  const { cols, x0, y0, cardW, cardH, gapX, gapY, numbered = true } = opts;
  items.forEach((it, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const x = x0 + c * (cardW + gapX), y = y0 + r * (cardH + gapY);
    card(slide, x, y, cardW, cardH);
    const pad = 0.32;
    if (numbered) chipNum(slide, x + pad, y + pad, it.n != null ? it.n : i + 1);
    const tY = y + pad + (numbered ? 0.78 : 0);
    slide.addText(it.t, { x: x + pad, y: tY, w: cardW - 2 * pad, h: 0.45, fontFace: HEAD, fontSize: 16.5, bold: true, color: INK, align: "left", valign: "top", margin: 0 });
    slide.addText(it.d, { x: x + pad, y: tY + 0.5, w: cardW - 2 * pad, h: cardH - (tY + 0.5 - y) - pad, fontFace: BODY, fontSize: 12, color: SUB, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  });
}

// ════════════════════════ SLIDES ════════════════════════

// 1 — COVER
(() => {
  const s = p.addSlide();
  base(s, "full");
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: MX, y: 1.5, w: 4.5, h: 0.46, rectRadius: 0.23, fill: { color: "FFFFFF", transparency: 25 }, line: { color: "FFFFFF", width: 1 } });
  s.addText("ПРЕЗЕНТАЦИЯ ДЛЯ ЗАСТРОЙЩИКА", { x: MX + 0.05, y: 1.5, w: 4.4, h: 0.46, fontFace: HEAD, fontSize: 11, bold: true, color: VIOLET, charSpacing: 3, align: "center", valign: "middle", margin: 0 });
  s.addText([
    { text: "Битрикс24", options: { color: INK, breakLine: true } },
    { text: "для застройщика", options: { color: VIOLET } },
  ], { x: MX - 0.05, y: 2.25, w: 11, h: 2.5, fontFace: HEAD, fontSize: 62, bold: true, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 0.95 });
  s.addText("Единая система управления девелопментом: от первого звонка покупателя до передачи ключей — и весь внутренний контур стройки в одном окне.", { x: MX, y: 5.05, w: 8.6, h: 1.1, fontFace: BODY, fontSize: 17, color: SUB, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.1 });
  const tags = ["Продажи", "Стройка", "Сервис"];
  tags.forEach((t, i) => {
    const x = MX + i * 2.0;
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: 6.45, w: 1.85, h: 0.5, rectRadius: 0.25, fill: { color: "FFFFFF", transparency: 20 }, line: { color: "FFFFFF", width: 1 } });
    s.addText(t, { x, y: 6.45, w: 1.85, h: 0.5, fontFace: HEAD, fontSize: 13, bold: true, color: INK, align: "center", valign: "middle", margin: 0 });
  });
})();

// 2 — PAIN
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Проблемы", 2);
  eyebrow(s, "С чего начинается порядок");
  title(s, "Где сегодня теряются деньги и время");
  lead(s, "Знакомо? Эти четыре боли есть почти у каждого регионального девелопера. Битрикс24 закрывает их единой средой.", 1.7);
  const items = [
    { t: "Лид стоит дорого", d: "Заявка с ЦИАН, Авито, Домклика обходится в тысячи рублей — а часть просто теряется в мессенджерах и блокнотах." },
    { t: "Длинный цикл сделки", d: "Бронь → ДДУ → ипотека → передача растягиваются на месяцы. Без системы не понять, где «застряла» сделка." },
    { t: "Данные размазаны", d: "Excel у продаж, переписки у прораба, договоры у юриста. Единой картины по объекту нет ни у кого." },
    { t: "Стройка и продажи врозь", d: "Отдел продаж не видит реальных сроков стройки, стройка — не видит обязательств перед дольщиками." },
  ];
  cardGrid(s, items, { cols: 2, x0: MX, y0: 2.75, cardW: 5.76, cardH: 1.9, gapX: 0.4, gapY: 0.32 });
})();

// section divider helper
function divider(no, label, n) {
  const s = p.addSlide();
  base(s, "full");
  pageTag(s, label, n);
  s.addText(no, { x: MX, y: 1.9, w: 7, h: 2.7, fontFace: HEAD, fontSize: 165, bold: true, color: VIOLET, align: "left", valign: "middle", margin: 0 });
  s.addText(label, { x: MX + 0.1, y: 4.75, w: 10, h: 1, fontFace: HEAD, fontSize: 44, bold: true, color: INK, align: "left", valign: "top", margin: 0 });
}

// 3 — SECTION 01
divider("01", "Продажи", 3);

// 4 — FUNNEL
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Продажи", 4);
  eyebrow(s, "Продажи · Воронка");
  title(s, "Сделка ведётся от лида до ключей");
  lead(s, "Не абстрактная CRM, а воронка под девелопмент. Каждая сделка всегда на понятном этапе — руководитель видит, где она и сколько в ней застряла.", 1.7);
  const steps = [
    { t: "Лид", d: "С любого канала" },
    { t: "Показ / Бронь", d: "Встреча, выбор квартиры" },
    { t: "ДДУ", d: "Договор, эскроу" },
    { t: "Ипотека", d: "Заявки в банки" },
    { t: "Сделка", d: "Оплата, регистрация" },
    { t: "Передача ключей", d: "Акт, заселение" },
  ];
  const n = steps.length, gap = 0.25, cw = (W - 2 * MX - gap * (n - 1)) / n;
  steps.forEach((st, i) => {
    const x = MX + i * (cw + gap), y = 3.0, ch = 2.4;
    card(s, x, y, cw, ch);
    s.addText(String(i + 1), { x: x + 0.25, y: y + 0.25, w: 1, h: 0.7, fontFace: HEAD, fontSize: 30, bold: true, color: VIOLET, align: "left", valign: "top", margin: 0 });
    s.addText(st.t, { x: x + 0.22, y: y + 1.05, w: cw - 0.44, h: 0.7, fontFace: HEAD, fontSize: 15, bold: true, color: INK, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 0.95 });
    s.addText(st.d, { x: x + 0.22, y: y + 1.7, w: cw - 0.44, h: 0.55, fontFace: BODY, fontSize: 11, color: SUB, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1 });
  });
  s.addText("На каждом этапе — свои поля, задачи и автодействия: напомнить менеджеру, запросить документы, уведомить дольщика.", { x: MX, y: 5.75, w: W - 2 * MX, h: 0.5, fontFace: BODY, fontSize: 13, italic: true, color: MUT, align: "left", margin: 0 });
})();

// 5 — KANBAN
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Продажи", 5);
  eyebrow(s, "Продажи · Так это выглядит в Битрикс24");
  title(s, "Воронка как канбан-доска");
  lead(s, "Все сделки на одном экране, по стадиям. Перетащил карточку — этап сменился, сумма по колонке пересчиталась.", 1.7);
  const cols = [
    { n: "Лид", c: "9AA7B0", sum: "—", deals: ["Орлова Н. · 3.5", "Гусев П. · 4.1"] },
    { n: "Бронь", c: SKY, sum: "11.0 млн", deals: ["Седов А. · 5.3", "Лыкова И. · 5.7"] },
    { n: "ДДУ", c: VIOLET, sum: "6.4 млн", deals: ["Зорин В. · 6.4"] },
    { n: "Ипотека", c: "F4A52F", sum: "7.2 млн", deals: ["Юдина С. · 7.2"] },
    { n: "Сделка", c: EMER, sum: "5.9 млн", deals: ["Котов Д. · 5.9"] },
  ];
  const gap = 0.22, cw = (W - 2 * MX - gap * (cols.length - 1)) / cols.length, y0 = 2.85;
  cols.forEach((col, i) => {
    const x = MX + i * (cw + gap);
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: y0, w: cw, h: 0.7, rectRadius: 0.08, fill: { color: CARD }, line: { color: BORDER, width: 1 } });
    s.addText(col.n, { x: x + 0.15, y: y0 + 0.08, w: cw - 0.3, h: 0.28, fontFace: HEAD, fontSize: 12.5, bold: true, color: INK, margin: 0 });
    s.addShape(p.shapes.RECTANGLE, { x: x + 0.15, y: y0 + 0.4, w: cw - 0.3, h: 0.05, fill: { color: col.c }, line: { type: "none" } });
    s.addText(col.sum, { x: x + 0.15, y: y0 + 0.46, w: cw - 0.3, h: 0.22, fontFace: BODY, fontSize: 10.5, color: SUB, margin: 0 });
    col.deals.forEach((d, j) => {
      const cy = y0 + 0.85 + j * 0.85;
      s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y: cy, w: cw, h: 0.72, rectRadius: 0.07, fill: { color: CARD }, line: { color: BORDER, width: 1 }, shadow: { type: "outer", color: "8893B0", blur: 6, offset: 2, angle: 90, opacity: 0.15 } });
      s.addShape(p.shapes.RECTANGLE, { x, y: cy, w: 0.05, h: 0.72, fill: { color: col.c }, line: { type: "none" } });
      const parts = d.split(" · ");
      s.addText(parts[0], { x: x + 0.18, y: cy + 0.1, w: cw - 0.3, h: 0.26, fontFace: HEAD, fontSize: 11.5, bold: true, color: INK, margin: 0 });
      s.addText(parts[1] + " млн ₽", { x: x + 0.18, y: cy + 0.38, w: cw - 0.3, h: 0.26, fontFace: HEAD, fontSize: 11, bold: true, color: INK, margin: 0 });
    });
  });
})();

// 6 — CHANNELS
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Продажи", 6);
  eyebrow(s, "Продажи · Каналы");
  title(s, "Все каналы лидов в одном окне");
  lead(s, "Все площадки и мессенджеры подключаются в один контакт-центр. Лид автоматически попадает в CRM с источником — ни одна заявка не теряется.", 1.7, 1.0);
  const chans = ["Сайт застройщика", "Авито", "ЦИАН", "Домклик", "Звонки", "WhatsApp", "Telegram", "Email"];
  const cols = 4, gap = 0.3, cw = (W - 2 * MX - gap * (cols - 1)) / cols, ch = 0.85, y0 = 3.1;
  chans.forEach((c, i) => {
    const r = Math.floor(i / cols), col = i % cols;
    const x = MX + col * (cw + gap), y = y0 + r * (ch + 0.3);
    card(s, x, y, cw, ch);
    s.addShape(p.shapes.OVAL, { x: x + 0.25, y: y + ch / 2 - 0.08, w: 0.16, h: 0.16, fill: { color: VIOLET }, line: { type: "none" } });
    s.addText(c, { x: x + 0.55, y, w: cw - 0.7, h: ch, fontFace: HEAD, fontSize: 14, bold: true, color: INK, align: "left", valign: "middle", margin: 0 });
  });
  s.addText("Сайт, формы и Авито — нативно «из коробки». ЦИАН, Домклик и другие площадки — через готовые приложения Маркета Битрикс24.", { x: MX, y: 6.3, w: W - 2 * MX, h: 0.6, fontFace: BODY, fontSize: 12.5, italic: true, color: MUT, align: "left", margin: 0, lineSpacingMultiple: 1.05 });
})();

// 7 — ANALYTICS (table)
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Продажи", 7);
  eyebrow(s, "Продажи · Сквозная аналитика");
  title(s, "Видно, какая реклама приносит сделки");
  lead(s, "Система связывает рекламный источник с реальными сделками и деньгами. Видно, какой канал кормит, а какой жжёт бюджет.", 1.7);
  const head = ["Источник", "Лиды", "Сделки", "Цена лида", "ROI"].map((t) => ({ text: t, options: { bold: true, color: SUB, fontSize: 12, fill: { color: "EEF1F9" } } }));
  const rows = [
    ["Домклик", "180", "14", "4 200 ₽", { text: "▲ высокий", options: { color: EMER, bold: true } }],
    ["ЦИАН", "240", "11", "6 800 ₽", { text: "● средний", options: { color: VIOLET, bold: true } }],
    ["Авито", "320", "9", "9 500 ₽", { text: "▼ низкий", options: { color: MUT, bold: true } }],
    ["Контекст", "150", "12", "5 100 ₽", { text: "▲ высокий", options: { color: EMER, bold: true } }],
  ].map((r) => r.map((c) => (typeof c === "string" ? { text: c, options: { color: INK, bold: r.indexOf(c) === 0 } } : c)));
  s.addTable([head, ...rows], {
    x: MX, y: 2.95, w: W - 2 * MX, colW: [3.4, 2.0, 2.0, 2.5, 2.03],
    rowH: 0.62, fontFace: BODY, fontSize: 14, valign: "middle", align: "left",
    border: { type: "solid", color: BORDER, pt: 1 }, fill: { color: CARD }, margin: [4, 8, 4, 8],
  });
  s.addText("Вывод за 2 клика: перелить бюджет с Авито на Домклик и контекст — те же деньги, вдвое больше сделок. Цифры иллюстративные.", { x: MX, y: 6.45, w: W - 2 * MX, h: 0.5, fontFace: BODY, fontSize: 12.5, italic: true, color: MUT, margin: 0 });
})();

// 8 — TELEPHONY
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Продажи", 8);
  eyebrow(s, "Продажи · Качество");
  title(s, "Телефония и контроль качества звонков");
  lead(s, "Вся телефония внутри CRM. Каждый звонок записан и привязан к сделке. Руководитель отдела продаж слышит, как менеджеры отрабатывают дорогие лиды.", 1.7, 1.0);
  const items = [
    { t: "Запись всех разговоров", d: "Привязана к карточке сделки и клиента" },
    { t: "Аналитика по менеджерам", d: "Длительность, пропущенные, конверсия" },
    { t: "Оценка качества", d: "Чек-листы и скоринг по скрипту разговора" },
  ];
  items.forEach((it, i) => {
    const y = 3.2 + i * 1.15;
    card(s, MX, y, W - 2 * MX, 0.95);
    chipNum(s, MX + 0.25, y + 0.17, i + 1);
    s.addText(it.t, { x: MX + 1.1, y: y + 0.14, w: 5.5, h: 0.4, fontFace: HEAD, fontSize: 16, bold: true, color: INK, valign: "middle", margin: 0 });
    s.addText(it.d, { x: MX + 6.7, y, w: W - 2 * MX - 6.9, h: 0.95, fontFace: BODY, fontSize: 13, color: SUB, valign: "middle", align: "left", margin: 0 });
  });
})();

// 9 — SECTION 02
divider("02", "Внутренние процессы", 9);

// 10 — BOX TOOLS
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Внутрянка", 10);
  eyebrow(s, "Внутренние процессы · Без доработок");
  title(s, "Из коробки — сразу в работу");
  lead(s, "Большая часть нужного есть в Битрикс24 сразу: задачи, проекты, чат, согласование документов. Настраивается мышкой, без программирования — вайбкод идёт уже сверху.", 1.7, 1.0);
  const items = [
    { t: "Задачи и проекты", d: "Дедлайны, ответственные, чек-листы, Канбан и Гант — без доработок." },
    { t: "Чат, звонки и видео", d: "Вся переписка и совещания внутри портала, а не в личных мессенджерах." },
    { t: "Согласование документов", d: "Маршрут утверждения собирается штатным бизнес-процессом — без программиста." },
    { t: "Бизнес-процессы (БП)", d: "Заявки, отпуска, согласования — визуальный конструктор сценариев в коробке." },
    { t: "Диск и база знаний", d: "Файлы, регламенты, шаблоны и CoPilot — всё в одном месте." },
    { t: "Мобильное приложение", d: "Задачи, чат и сделки со смартфона — удобно прорабу на объекте." },
  ];
  cardGrid(s, items, { cols: 3, x0: MX, y0: 3.05, cardW: 3.84, cardH: 1.85, gapX: 0.27, gapY: 0.25 });
})();

// 11 — CONSTRUCTION (gantt-ish)
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Внутрянка", 11);
  eyebrow(s, "Внутренние процессы · Стройка");
  title(s, "Стройка как управляемый проект");
  lead(s, "Каждый дом — это проект с этапами, сроками и ответственными. Диаграмма Ганта показывает реальную картину, а отдел продаж видит честные сроки сдачи.", 1.7, 1.0);
  const g = [
    { t: "Котлован и фундамент", a: 0, w: 18, st: "готово", c: EMER },
    { t: "Монолит / коробка", a: 16, w: 34, st: "готово", c: EMER },
    { t: "Фасад и кровля", a: 46, w: 22, st: "в работе", c: VIOLET },
    { t: "Инженерные сети", a: 52, w: 26, st: "план", c: "C7CEDF" },
    { t: "Отделка МОП", a: 70, w: 22, st: "план", c: "C7CEDF" },
    { t: "Благоустройство и сдача", a: 84, w: 16, st: "план", c: "C7CEDF" },
  ];
  const trackX = MX + 3.4, trackW = W - MX - trackX, y0 = 3.15, rowH = 0.5, gapR = 0.12;
  g.forEach((r, i) => {
    const y = y0 + i * (rowH + gapR);
    s.addText(r.t, { x: MX, y, w: 3.2, h: rowH, fontFace: HEAD, fontSize: 12.5, bold: r.st === "в работе", color: r.st === "в работе" ? INK : SUB, valign: "middle", margin: 0 });
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: trackX, y: y + 0.08, w: trackW, h: rowH - 0.16, rectRadius: 0.1, fill: { color: "EAEEF7" }, line: { type: "none" } });
    const bx = trackX + (r.a / 100) * trackW, bw = (r.w / 100) * trackW;
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: bx, y: y + 0.08, w: bw, h: rowH - 0.16, rectRadius: 0.1, fill: { color: r.c }, line: { type: "none" } });
    s.addText(r.st, { x: bx, y: y + 0.08, w: bw, h: rowH - 0.16, fontFace: HEAD, fontSize: 10, bold: true, color: r.st === "план" ? SUB : "FFFFFF", align: "center", valign: "middle", margin: 0 });
  });
})();

// 12 — PROCUREMENT
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Внутрянка", 12);
  eyebrow(s, "Внутренние процессы · Закупки");
  title(s, "Тендеры и закупки без хаоса");
  lead(s, "Тендеры и снабжение — в смарт-процессе. Прозрачно, кто и за какую сумму согласовал подрядчика. Никаких «договорились на словах».", 1.7);
  const items = [
    { t: "Заявка от прораба", d: "Нужны материалы или подрядчик" },
    { t: "Согласование сметы", d: "Маршрут утверждения суммы" },
    { t: "Сбор предложений", d: "Тендер среди поставщиков" },
    { t: "Договор и оплата", d: "Контроль сроков и закрытия" },
  ];
  const n = 4, gap = 0.35, cw = (W - 2 * MX - gap * (n - 1)) / n;
  items.forEach((it, i) => {
    const x = MX + i * (cw + gap), y = 2.95, ch = 2.5;
    card(s, x, y, cw, ch);
    chipNum(s, x + 0.3, y + 0.3, i + 1);
    s.addText(it.t, { x: x + 0.3, y: y + 1.15, w: cw - 0.6, h: 0.7, fontFace: HEAD, fontSize: 15.5, bold: true, color: INK, margin: 0, lineSpacingMultiple: 0.97 });
    s.addText(it.d, { x: x + 0.3, y: y + 1.8, w: cw - 0.6, h: 0.6, fontFace: BODY, fontSize: 12, color: SUB, margin: 0, lineSpacingMultiple: 1.03 });
  });
})();

// 13 — DOCS
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Внутрянка", 13);
  eyebrow(s, "Внутренние процессы · Документы");
  title(s, "Документооборот и согласования");
  lead(s, "ДДУ, договоры подряда, акты — формируются из шаблонов и согласуются по маршруту прямо в системе. Акты и подряд подписываются с контрагентами онлайн через Битрикс24.Подпись.", 1.7, 1.0);
  const items = [
    { t: "Шаблоны документов", d: "ДДУ, подряд и акты генерируются из полей сделки за секунды." },
    { t: "Согласование (штатный БП)", d: "Юрист → финансы → директор — бизнес-процессом из коробки, с контролем сроков." },
    { t: "Битрикс24.Подпись", d: "Акты и подряд — онлайн с контрагентами, ПЭП по 63-ФЗ." },
    { t: "Контроль регистрации ДДУ", d: "Стадия «подано в Росреестр» → «зарегистрировано»." },
  ];
  cardGrid(s, items, { cols: 2, x0: MX, y0: 3.05, cardW: 5.76, cardH: 1.7, gapX: 0.4, gapY: 0.3 });
})();

// 14 — TEAM
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Внутрянка", 14);
  eyebrow(s, "Внутренние процессы · Команда");
  title(s, "Команда, регламенты и онбординг");
  lead(s, "Портал собирает компанию в одном месте: задачи, новости, база знаний и онбординг. Особенно ценно, когда открыты вакансии и приходят новые люди.", 1.7, 1.0);
  const items = [
    { t: "Живая лента и чаты", d: "Новости компании, опросы, обсуждение объектов — вместо разрозненных мессенджеров." },
    { t: "База знаний", d: "Регламенты продаж, инструкции по стройке, шаблоны — всё в одном месте и под рукой." },
    { t: "Онбординг новичков", d: "Готовый сценарий адаптации: задачи, документы, доступы для каждой роли." },
  ];
  cardGrid(s, items, { cols: 3, x0: MX, y0: 3.15, cardW: 3.84, cardH: 2.3, gapX: 0.27, gapY: 0.25 });
})();

// 15 — DASHBOARD (stats)
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Внутрянка", 15);
  eyebrow(s, "Управление · Дашборды");
  title(s, "Вся компания на одном экране");
  lead(s, "Руководитель открывает один экран и видит компанию целиком: продажи, финансы, готовность объектов. Без планёрок и ручных отчётов.", 1.7);
  const kpi = [
    { v: "₽ 214 млн", l: "продажи в работе", s: "+18% к плану квартала" },
    { v: "37", l: "активных сделок", s: "12 на стадии ипотеки" },
    { v: "68%", l: "готовность Дома №8", s: "сдача в графике" },
    { v: "5 900 ₽", l: "средняя цена лида", s: "−21% за счёт аналитики" },
  ];
  const n = 4, gap = 0.35, cw = (W - 2 * MX - gap * (n - 1)) / n, y = 3.05, ch = 2.3;
  kpi.forEach((k, i) => {
    const x = MX + i * (cw + gap);
    card(s, x, y, cw, ch);
    s.addText(k.v, { x: x + 0.3, y: y + 0.35, w: cw - 0.6, h: 0.8, fontFace: HEAD, fontSize: 30, bold: true, color: VIOLET, margin: 0 });
    s.addText(k.l, { x: x + 0.3, y: y + 1.25, w: cw - 0.6, h: 0.5, fontFace: HEAD, fontSize: 14, bold: true, color: INK, margin: 0, lineSpacingMultiple: 0.95 });
    s.addText(k.s, { x: x + 0.3, y: y + 1.75, w: cw - 0.6, h: 0.45, fontFace: BODY, fontSize: 11.5, color: EMER, margin: 0 });
  });
  s.addText("Данные обновляются в реальном времени — из тех же сделок, задач и звонков, что ведут менеджеры и прорабы. Цифры иллюстративные.", { x: MX, y: 5.75, w: W - 2 * MX, h: 0.5, fontFace: BODY, fontSize: 12.5, italic: true, color: MUT, margin: 0 });
})();

// 16 — SECTION 03
divider("03", "Клиентский сервис", 16);

// 17 — SERVICE
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Сервис", 17);
  eyebrow(s, "Сервис · Постпродажа");
  title(s, "Гарантийный сервис после заселения");
  lead(s, "Отношения с дольщиком не заканчиваются сделкой. Гарантийные обращения после заселения ведутся как заявки — с исполнителем, сроком и контролем.", 1.7, 1.0);
  const items = [
    { t: "Обращение жильца", d: "С сайта, QR в подъезде или звонка — сразу в систему", s: "Принято" },
    { t: "Назначение мастера", d: "Заявка уходит ответственному со сроком", s: "В работе" },
    { t: "Контроль и закрытие", d: "Фотоотчёт, обратная связь, оценка", s: "Решено" },
  ];
  items.forEach((it, i) => {
    const y = 3.2 + i * 1.1;
    card(s, MX, y, W - 2 * MX, 0.92);
    chipNum(s, MX + 0.25, y + 0.15, i + 1);
    s.addText(it.t, { x: MX + 1.1, y: y + 0.13, w: 4.5, h: 0.4, fontFace: HEAD, fontSize: 16, bold: true, color: INK, valign: "middle", margin: 0 });
    s.addText(it.d, { x: MX + 5.6, y, w: W - 2 * MX - 7.6, h: 0.92, fontFace: BODY, fontSize: 12.5, color: SUB, valign: "middle", margin: 0 });
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: W - MX - 1.7, y: y + 0.26, w: 1.45, h: 0.4, rectRadius: 0.2, fill: { color: "D1FAE5" }, line: { type: "none" } });
    s.addText(it.s, { x: W - MX - 1.7, y: y + 0.26, w: 1.45, h: 0.4, fontFace: HEAD, fontSize: 11, bold: true, color: "047857", align: "center", valign: "middle", margin: 0 });
  });
})();

// 18 — CABINET
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Сервис", 18);
  eyebrow(s, "Сервис · Личный кабинет");
  title(s, "Личный кабинет покупателя");
  lead(s, "Дольщик в любой момент видит статус своей квартиры: этап стройки, документы, графики оплат — как трекинг заказа в Ozon или CDEK. Меньше звонков в офис, выше доверие.", 1.7, 1.1);
  // mock panel
  const px = 7.4, pw = W - MX - px, py = 3.0, ph = 3.6;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: px, y: py, w: pw, h: ph, rectRadius: 0.14, fill: { color: DARK }, line: { type: "none" }, shadow: SHADOW });
  s.addText("КВ. №42 · ВАШ ЖК", { x: px + 0.35, y: py + 0.3, w: pw - 0.7, h: 0.3, fontFace: HEAD, fontSize: 10, bold: true, color: "B6A6F0", charSpacing: 2, margin: 0 });
  s.addText("Ваша квартира строится", { x: px + 0.35, y: py + 0.6, w: pw - 0.7, h: 0.5, fontFace: HEAD, fontSize: 19, bold: true, color: "FFFFFF", margin: 0 });
  const steps = [["ДДУ заключён", 1], ["Монолит завершён", 1], ["Фасад и окна", 1], ["Отделка и сети", 2], ["Передача ключей", 0]];
  steps.forEach((st, i) => {
    const y = py + 1.3 + i * 0.42;
    const col = st[1] === 1 ? EMER : st[1] === 2 ? VIOLET : "5A5483";
    s.addShape(p.shapes.OVAL, { x: px + 0.35, y: y + 0.02, w: 0.22, h: 0.22, fill: { color: col }, line: { type: "none" } });
    s.addText(st[0], { x: px + 0.72, y, w: pw - 1.4, h: 0.28, fontFace: BODY, fontSize: 12.5, bold: st[1] === 2, color: st[1] === 0 ? "9A93C0" : "F2EFFF", valign: "middle", margin: 0 });
    if (st[1] === 2) s.addText("сейчас", { x: px + pw - 1.2, y, w: 0.9, h: 0.28, fontFace: HEAD, fontSize: 10, bold: true, color: "B6A6F0", align: "right", valign: "middle", margin: 0 });
  });
  ["Документы", "График оплат", "Чат"].forEach((t, i) => {
    const bw = 1.35, bx = px + 0.35 + i * (bw + 0.18);
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: bx, y: py + ph - 0.7, w: bw, h: 0.42, rectRadius: 0.08, fill: { color: "FFFFFF", transparency: 88 }, line: { type: "none" } });
    s.addText(t, { x: bx, y: py + ph - 0.7, w: bw, h: 0.42, fontFace: BODY, fontSize: 10.5, color: "E6E1FF", align: "center", valign: "middle", margin: 0 });
  });
})();

// 19 — DEMO (shahmatka)
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Демо", 19);
  eyebrow(s, "Живое демо · в веб-версии");
  title(s, "Интерактивная шахматка → бронь в CRM");
  lead(s, "Кликабельная шахматка квартир: выбор свободной квартиры на плане дома → авто-бронь, и статусы (свободна / бронь / продана) синхронны с CRM Битрикс24.", 1.7, 1.0);
  // mini shahmatka grid 4x4 sample
  const gx = MX, gy = 3.1, cols = 8, rows = 3, cw = 1.3, chh = 0.78, gap = 0.16;
  const statuses = [0, 1, 2, 0, 1, 0, 2, 0, 2, 0, 0, 1, 0, 0, 1, 2, 0, 2, 0, 1, 0, 1, 0, 0];
  const fills = { 0: ["EDFCF4", EMER], 1: ["F1ECFE", VIOLET], 2: ["EEF1F7", "9AA7B0"] };
  for (let i = 0; i < cols * rows; i++) {
    const r = Math.floor(i / cols), c = i % cols;
    const x = gx + c * (cw + gap), y = gy + r * (chh + gap);
    const st = statuses[i % statuses.length];
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: chh, rectRadius: 0.08, fill: { color: fills[st][0] }, line: { color: BORDER, width: 1 } });
    s.addText("№" + (70 - i), { x: x + 0.12, y: y + 0.1, w: cw - 0.2, h: 0.3, fontFace: HEAD, fontSize: 12, bold: true, color: fills[st][1], margin: 0 });
    s.addText("2к · 57 м²", { x: x + 0.12, y: y + 0.42, w: cw - 0.2, h: 0.22, fontFace: BODY, fontSize: 8.5, color: SUB, margin: 0 });
  }
  // legend
  const leg = [["Свободна", EMER], ["Бронь", VIOLET], ["Продана", "9AA7B0"]];
  leg.forEach((l, i) => {
    const x = MX + i * 2.0;
    s.addShape(p.shapes.OVAL, { x, y: 6.5, w: 0.18, h: 0.18, fill: { color: l[1] }, line: { type: "none" } });
    s.addText(l[0], { x: x + 0.28, y: 6.42, w: 1.7, h: 0.32, fontFace: BODY, fontSize: 12, color: SUB, valign: "middle", margin: 0 });
  });
})();

// 20 — SHOWCASE
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Вайбкод", 20);
  eyebrow(s, "Сверх коробки · Вайбкод");
  title(s, "Что можно докрутить");
  lead(s, "Битрикс24 — гибкая платформа. То, чего нет в коробке, дорабатываем под ваши процессы. Вот примеры решений, которые можно развернуть под вас.", 1.7, 1.0);
  const items = [
    { t: "Интерактивная шахматка", d: "Выбор квартиры на плане с авто-бронью и статусом в CRM." },
    { t: "Личный кабинет дольщика", d: "Трекинг стройки в стиле Ozon/CDEK: статус, документы, оплаты." },
    { t: "Дашборд план-факт продаж", d: "Сводка по домам и квартирам с целями и прогнозом." },
    { t: "Подсказчик в карточке сделки", d: "Скрипт и next-step для менеджера при работе со сделкой." },
    { t: "Ипотечный калькулятор", d: "Виджет на сайте, который создаёт готовый лид в Битрикс24." },
    { t: "Авто-выгрузка на ЦИАН/Авито", d: "Объявления формируются из каталога квартир в CRM." },
  ];
  cardGrid(s, items, { cols: 3, x0: MX, y0: 3.05, cardW: 3.84, cardH: 1.85, gapX: 0.27, gapY: 0.25 });
})();

// 21 — CALCULATOR
(() => {
  const s = p.addSlide();
  base(s);
  pageTag(s, "Вайбкод", 21);
  eyebrow(s, "Вайбкод · Живой пример");
  title(s, "Ипотечный калькулятор на сайт");
  lead(s, "Покупатель считает платёж сам — и оставляет заявку. Лид с готовым расчётом сразу падает в Битрикс24.", 1.7);
  // left controls mock
  card(s, MX, 2.85, 6.7, 3.7);
  const sliders = [["Стоимость квартиры", "6 000 000 ₽", 0.4], ["Первоначальный взнос", "20 %", 0.2], ["Срок кредита", "20 лет", 0.6]];
  sliders.forEach((sl, i) => {
    const y = 3.2 + i * 0.85;
    s.addText(sl[0], { x: MX + 0.35, y, w: 3.5, h: 0.3, fontFace: BODY, fontSize: 12.5, color: SUB, margin: 0 });
    s.addText(sl[1], { x: MX + 3.8, y, w: 2.5, h: 0.3, fontFace: HEAD, fontSize: 14, bold: true, color: INK, align: "right", margin: 0 });
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: MX + 0.35, y: y + 0.38, w: 5.95, h: 0.1, rectRadius: 0.05, fill: { color: "E0E5F2" }, line: { type: "none" } });
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: MX + 0.35, y: y + 0.38, w: 5.95 * sl[2], h: 0.1, rectRadius: 0.05, fill: { color: VIOLET }, line: { type: "none" } });
    s.addShape(p.shapes.OVAL, { x: MX + 0.35 + 5.95 * sl[2] - 0.1, y: y + 0.31, w: 0.24, h: 0.24, fill: { color: "FFFFFF" }, line: { color: VIOLET, width: 2 } });
  });
  s.addText("Программа: Семейная 6%  ·  IT 5%  ·  Господдержка 8%  ·  Базовая 18%", { x: MX + 0.35, y: 6.0, w: 6.0, h: 0.4, fontFace: BODY, fontSize: 11.5, color: SUB, margin: 0 });
  // right result panel
  const rx = MX + 7.1, rw = W - MX - rx;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: rx, y: 2.85, w: rw, h: 3.7, rectRadius: 0.14, fill: { color: DARK }, line: { type: "none" }, shadow: SHADOW });
  s.addText("ЕЖЕМЕСЯЧНЫЙ ПЛАТЁЖ", { x: rx + 0.4, y: 3.2, w: rw - 0.8, h: 0.3, fontFace: HEAD, fontSize: 11, bold: true, color: "B6A6F0", charSpacing: 2, margin: 0 });
  s.addText("34 389 ₽/мес", { x: rx + 0.4, y: 3.5, w: rw - 0.8, h: 0.8, fontFace: HEAD, fontSize: 32, bold: true, color: "FFFFFF", margin: 0 });
  [["Сумма кредита", "4 800 000 ₽"], ["Первый взнос", "1 200 000 ₽"], ["Ставка", "6% · Семейная"]].forEach((row, i) => {
    const y = 4.5 + i * 0.45;
    s.addText(row[0], { x: rx + 0.4, y, w: 2.5, h: 0.32, fontFace: BODY, fontSize: 12, color: "B9B2D8", valign: "middle", margin: 0 });
    s.addText(row[1], { x: rx + rw - 3.0, y, w: 2.6, h: 0.32, fontFace: HEAD, fontSize: 12.5, bold: true, color: "FFFFFF", align: "right", valign: "middle", margin: 0 });
  });
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: rx + 0.4, y: 5.95, w: rw - 0.8, h: 0.45, rectRadius: 0.22, fill: { color: VIOLET }, line: { type: "none" } });
  s.addText("Оставить заявку  →  лид в Битрикс24", { x: rx + 0.4, y: 5.95, w: rw - 0.8, h: 0.45, fontFace: HEAD, fontSize: 12.5, bold: true, color: "FFFFFF", align: "center", valign: "middle", margin: 0 });
})();

// 22 — ROADMAP
(() => {
  const s = p.addSlide();
  base(s, "full");
  pageTag(s, "Внедрение", 22);
  eyebrow(s, "Внедрение · Дорожная карта");
  title(s, "Дорожная карта внедрения");
  lead(s, "Не «всё сразу», а понятными этапами с быстрым результатом уже на первом. Коробка — за дни, доработки — следом.", 1.7);
  const road = [
    { p: "Этап 1", t: "Запуск продаж", d: "Воронка, каналы, телефония, обучение менеджеров.", w: "2–3 недели" },
    { p: "Этап 2", t: "Внутренний контур", d: "Стройка, закупки, документооборот, портал команды.", w: "1–2 месяца" },
    { p: "Этап 3", t: "Аналитика и сервис", d: "Сквозная аналитика, дашборды, гарантийный сервис.", w: "2 недели" },
    { p: "Этап 4", t: "Кастомные доработки", d: "Шахматка, личный кабинет, интеграции с площадками.", w: "по проекту" },
  ];
  const n = 4, gap = 0.35, cw = (W - 2 * MX - gap * (n - 1)) / n, y = 3.0, ch = 2.9;
  road.forEach((r, i) => {
    const x = MX + i * (cw + gap);
    card(s, x, y, cw, ch);
    s.addText(r.p.toUpperCase(), { x: x + 0.3, y: y + 0.3, w: cw - 0.6, h: 0.3, fontFace: HEAD, fontSize: 11, bold: true, color: VIOLET, charSpacing: 2, margin: 0 });
    s.addText(r.t, { x: x + 0.3, y: y + 0.65, w: cw - 0.6, h: 0.7, fontFace: HEAD, fontSize: 16, bold: true, color: INK, margin: 0, lineSpacingMultiple: 0.95 });
    s.addText(r.d, { x: x + 0.3, y: y + 1.4, w: cw - 0.6, h: 1.0, fontFace: BODY, fontSize: 12, color: SUB, margin: 0, lineSpacingMultiple: 1.05 });
    s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: x + 0.3, y: y + ch - 0.55, w: cw - 0.6, h: 0.4, rectRadius: 0.2, fill: { color: CHIP }, line: { type: "none" } });
    s.addText(r.w, { x: x + 0.3, y: y + ch - 0.55, w: cw - 0.6, h: 0.4, fontFace: HEAD, fontSize: 11.5, bold: true, color: VIOLET, align: "center", valign: "middle", margin: 0 });
  });
})();

p.writeFile({ fileName: "Презентация_Битрикс24_для_застройщика.pptx" }).then((f) => console.log("written:", f));
