import { Bezel, Eyebrow, Icon, IconCircle, PillButton, Reveal, Tilt } from "./ui.jsx";
import Shahmatka from "./Shahmatka.jsx";
import { CrmKanban } from "./B24.jsx";
import Calculator from "./Calculator.jsx";

// Every slide is a full-bleed flex container. The deck (App) handles paging.
function Frame({ children, className = "" }) {
  return (
    <div className={`mx-auto flex h-full w-full max-w-[1180px] flex-col justify-center px-6 py-16 md:px-12 ${className}`}>
      {children}
    </div>
  );
}

function Title({ eyebrow, children, lead }) {
  return (
    <div className="max-w-3xl">
      <Reveal i={0}>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}</Reveal>
      <Reveal i={1}>
        <h2 className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.05] tracking-tight text-espresso md:text-[3.2rem]">
          {children}
        </h2>
      </Reveal>
      {lead && (
        <Reveal i={2}>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-umber">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ─────────────────────────── 0. COVER ─────────────────────────── */
function Cover() {
  return (
    <div className="relative flex h-full w-full items-center overflow-hidden">
      {/* warm radial wash — slow drifting orbs */}
      <div className="drift-a pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-ember/10 blur-3xl" />
      <div className="drift-b pointer-events-none absolute -bottom-52 -left-40 h-[36rem] w-[36rem] rounded-full bg-sage/10 blur-3xl" />
      <Frame>
        <Reveal i={0}>
          <Eyebrow>Презентация для застройщика</Eyebrow>
        </Reveal>
        <Reveal i={1}>
          <h1 className="mt-7 font-display text-[3.4rem] font-semibold leading-[0.98] tracking-tight text-espresso md:text-[5.4rem]">
            Битрикс24 <br />
            <span className="text-aurora">для застройщика</span>
          </h1>
        </Reveal>
        <Reveal i={2}>
          <p className="mt-7 max-w-xl text-xl leading-relaxed text-umber">
            Единая система управления девелопментом: от первого звонка покупателя до передачи ключей —
            и весь внутренний контур стройки в одном окне.
          </p>
        </Reveal>
        <Reveal i={3}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PillButton tone="ember">Смотреть презентацию</PillButton>
            <span className="text-sm text-umber/80">Листайте стрелками&nbsp;→&nbsp;или свайпом</span>
          </div>
        </Reveal>
      </Frame>
    </div>
  );
}

/* ─────────────────────────── 1. PAIN ─────────────────────────── */
const PAINS = [
  { t: "Лид стоит дорого", d: "Заявка с ЦИАН, Авито, Домклика обходится в тысячи рублей — а часть просто теряется в мессенджерах и блокнотах." },
  { t: "Длинный цикл сделки", d: "Бронь → ДДУ → ипотека → передача растягиваются на месяцы. Без системы невозможно понять, где «застряла» сделка." },
  { t: "Данные размазаны", d: "Excel у продаж, переписки у прораба, договоры у юриста. Единой картины по объекту нет ни у кого." },
  { t: "Стройка и продажи врозь", d: "Отдел продаж не видит реальных сроков стройки, стройка — не видит обязательств перед дольщиками." },
];
function Pain() {
  return (
    <Frame>
      <Title eyebrow="С чего начинается порядок" lead="Знакомо? Эти четыре боли есть почти у каждого регионального девелопера. Битрикс24 закрывает их единой средой.">
        Где сегодня теряются деньги и время
      </Title>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {PAINS.map((p, i) => (
          <Reveal key={p.t} i={3 + i}>
            <Bezel tone="warm" className="h-full">
              <div className="flex h-full items-start gap-4 p-6">
                <span className="mt-1 font-display text-3xl font-semibold text-ember/40">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-espresso">{p.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-umber">{p.d}</p>
                </div>
              </div>
            </Bezel>
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}

/* ─────────────────── section divider helper ─────────────────── */
function SectionMark({ no, label }) {
  return (
    <div className="relative flex h-full w-full items-center overflow-hidden">
      <div className="pointer-events-none absolute -right-32 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-ember/[0.07] blur-3xl" />
      <Frame>
        <Reveal i={0}>
          <span className="font-display text-[7rem] font-semibold leading-none text-clay md:text-[11rem]">{no}</span>
        </Reveal>
        <Reveal i={1}>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-espresso md:text-6xl">{label}</h2>
        </Reveal>
      </Frame>
    </div>
  );
}

/* ─────────────────────────── 2. FUNNEL ─────────────────────────── */
const STAGES = [
  { t: "Лид", d: "Заявка с любого канала" },
  { t: "Показ / Бронь", d: "Встреча, выбор квартиры" },
  { t: "ДДУ", d: "Договор, эскроу" },
  { t: "Ипотека", d: "Заявки в банки" },
  { t: "Сделка", d: "Оплата, регистрация" },
  { t: "Передача ключей", d: "Акт, заселение" },
];
function Funnel() {
  return (
    <Frame>
      <Title eyebrow="Продажи · Воронка" lead="Не абстрактная CRM, а воронка под девелопмент. Каждая сделка всегда на понятном этапе — руководитель видит, где она и сколько в ней застряла.">
        Сделка ведётся от лида до ключей
      </Title>
      <div className="mt-12 flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {STAGES.map((s, i) => (
          <Reveal key={s.t} i={3 + i} className="flex-1">
            <div className="group relative flex h-full flex-col rounded-2xl glass-soft p-5 ring-1 ring-espresso/[0.06] transition-all duration-500 ease-spring hover:-translate-y-1 hover:bg-white/60">
              <span className="font-display text-2xl font-semibold text-ember">{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold leading-tight text-espresso">{s.t}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-umber">{s.d}</p>
              {i < STAGES.length - 1 && (
                <Icon.arrow className="absolute -right-2 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-clay lg:block" />
              )}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal i={10}>
        <p className="mt-8 text-sm text-umber/80">
          На каждом этапе — свои поля, задачи и автодействия: напомнить менеджеру, запросить документы, уведомить дольщика.
        </p>
      </Reveal>
    </Frame>
  );
}

/* ─────────────────── 2b. B24 KANBAN SCREEN ─────────────────── */
function Kanban() {
  return (
    <div className="flex h-full w-full flex-col px-6 py-10 md:px-10">
      <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col">
        <Reveal i={0} className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Eyebrow>Продажи · Так это выглядит в Битрикс24</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-espresso md:text-[2.6rem]">
              Воронка как канбан-доска
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-umber">
            Все сделки на одном экране, по стадиям. Перетащил карточку — этап сменился, сумма по колонке пересчиталась.
          </p>
        </Reveal>
        <Reveal i={1} className="mt-6 flex-1">
          <Bezel className="h-full" tone="warm">
            <div className="h-full p-2.5">
              <CrmKanban />
            </div>
          </Bezel>
        </Reveal>
      </div>
    </div>
  );
}

/* ─────────────────────────── 3. CHANNELS ─────────────────────────── */
const CHANNELS = ["Сайт застройщика", "Авито", "ЦИАН", "Домклик", "Звонки", "WhatsApp", "Telegram", "Email"];
function Channels() {
  return (
    <Frame>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <Title eyebrow="Продажи · Каналы" lead="Все площадки и мессенджеры подключаются в один контакт-центр. Лид автоматически попадает в CRM с источником — ни одна заявка не теряется.">
            Все каналы лидов <br /> в одном окне
          </Title>
          <Reveal i={3}>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-sage/10 px-5 py-3 ring-1 ring-sage/20">
              <Icon.check className="h-5 w-5 stroke-current fill-none text-sage" />
              <span className="text-sm font-medium text-bark">0 потерянных обращений · автораспределение на менеджеров</span>
            </div>
          </Reveal>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3">
            {CHANNELS.map((c, i) => (
              <Reveal key={c} i={2 + i}>
                <div className="flex items-center gap-3 rounded-2xl glass-card p-4 ring-1 ring-espresso/[0.06] transition-all duration-500 ease-spring hover:-translate-y-0.5 hover:ring-ember/30">
                  <span className="h-2.5 w-2.5 rounded-full bg-ember" />
                  <span className="text-[15px] font-semibold text-espresso">{c}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal i={11}>
            <p className="mt-4 text-[13px] leading-relaxed text-umber/70">
              Сайт, формы и Авито — нативно «из коробки». ЦИАН, Домклик и другие площадки — через готовые приложения Маркета Битрикс24.
            </p>
          </Reveal>
        </div>
      </div>
    </Frame>
  );
}

/* ─────────────────────────── 4. ANALYTICS ─────────────────────────── */
const SRC = [
  { n: "Домклик", leads: 180, deals: 14, cost: "4 200 ₽", roi: "high" },
  { n: "ЦИАН", leads: 240, deals: 11, cost: "6 800 ₽", roi: "mid" },
  { n: "Авито", leads: 320, deals: 9, cost: "9 500 ₽", roi: "low" },
  { n: "Контекст", leads: 150, deals: 12, cost: "5 100 ₽", roi: "high" },
];
const roiColor = { high: "text-sage", mid: "text-ember", low: "text-espresso/50" };
function Analytics() {
  return (
    <Frame>
      <Title eyebrow="Продажи · Сквозная аналитика" lead="Система связывает рекламный источник с реальными сделками и деньгами. Видно, какой канал кормит, а какой жжёт бюджет.">
        Видно, какая реклама приносит сделки
      </Title>
      <Reveal i={3}>
        <Bezel className="mt-10">
          <div className="p-5 md:p-7">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_0.8fr] gap-4 border-b border-espresso/10 pb-3 text-xs font-semibold uppercase tracking-wider text-umber/70">
              <span>Источник</span><span>Лиды</span><span>Сделки</span><span>Цена лида</span><span>ROI</span>
            </div>
            {SRC.map((s, i) => (
              <div key={s.n} className="grid grid-cols-[1.4fr_1fr_1fr_1fr_0.8fr] items-center gap-4 border-b border-espresso/[0.06] py-4 text-[15px]">
                <span className="font-semibold text-espresso">{s.n}</span>
                <span className="text-umber">{s.leads}</span>
                <span className="font-semibold text-espresso">{s.deals}</span>
                <span className="text-umber">{s.cost}</span>
                <span className={`font-semibold ${roiColor[s.roi]}`}>
                  {s.roi === "high" ? "▲ выс." : s.roi === "mid" ? "● сред." : "▼ низ."}
                </span>
              </div>
            ))}
            <p className="mt-4 text-sm text-umber/70">
              Вывод за 2 клика: перелить бюджет с Авито на Домклик и контекст — те же деньги, вдвое больше сделок.
            </p>
          </div>
        </Bezel>
      </Reveal>
    </Frame>
  );
}

/* ─────────────────────────── 5. TELEPHONY ─────────────────────────── */
function Telephony() {
  return (
    <Frame>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <Title eyebrow="Продажи · Качество" lead="Вся телефония внутри CRM. Каждый звонок записан и привязан к сделке. Руководитель отдела продаж слышит, как менеджеры отрабатывают дорогие лиды.">
            Телефония и контроль <br /> качества звонков
          </Title>
        </div>
        <div className="space-y-3">
          {[
            { g: Icon.phone, t: "Запись всех разговоров", d: "Привязана к карточке сделки и клиента" },
            { g: Icon.chart, t: "Аналитика по менеджерам", d: "Длительность, пропущенные, конверсия" },
            { g: Icon.gauge, t: "Оценка качества", d: "Чек-листы и скоринг по скрипту разговора" },
          ].map((x, i) => (
            <Reveal key={x.t} i={3 + i}>
              <div className="flex items-center gap-4 rounded-2xl glass-card p-5 ring-1 ring-espresso/[0.06]">
                <IconCircle glyph={x.g} />
                <div>
                  <h3 className="font-display text-lg font-semibold text-espresso">{x.t}</h3>
                  <p className="text-[15px] text-umber">{x.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ─────────────── 5b. BOX TOOLS (из коробки) ─────────────── */
const BOX = [
  { g: Icon.grid, t: "Задачи и проекты", d: "Дедлайны, ответственные, чек-листы, Канбан и диаграмма Ганта — без доработок." },
  { g: Icon.channels, t: "Чат, звонки и видео", d: "Вся переписка и совещания внутри портала, а не в личных мессенджерах." },
  { g: Icon.doc, t: "Согласование документов", d: "Маршрут утверждения собирается штатным бизнес-процессом — мышкой, без программиста." },
  { g: Icon.route, t: "Бизнес-процессы (БП)", d: "Заявки, отпуска, согласования — визуальный конструктор сценариев прямо в коробке." },
  { g: Icon.spark, t: "Диск и база знаний", d: "Файлы, регламенты, шаблоны и CoPilot — всё в одном месте и под рукой." },
  { g: Icon.phone, t: "Мобильное приложение", d: "Задачи, чат и сделки со смартфона — удобно прорабу прямо на объекте." },
];
function BoxTools() {
  return (
    <Frame>
      <Title eyebrow="Внутренние процессы · Без доработок" lead="Большая часть нужного есть в Битрикс24 сразу: задачи, проекты, чат, согласование документов. Настраивается мышкой, без программирования — вайбкод идёт уже сверху.">
        Из коробки — сразу в работу
      </Title>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {BOX.map((x, i) => (
          <Reveal key={x.t} i={3 + i}>
            <Bezel tone="warm" className="h-full">
              <div className="flex h-full flex-col p-6">
                <IconCircle glyph={x.g} tone="bark" />
                <h3 className="mt-4 font-display text-lg font-semibold text-espresso">{x.t}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-umber">{x.d}</p>
              </div>
            </Bezel>
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}

/* ─────────────────────────── 6. CONSTRUCTION ─────────────────────────── */
const GANTT = [
  { t: "Котлован и фундамент", a: 0, w: 18, done: true },
  { t: "Монолит / коробка", a: 16, w: 34, done: true },
  { t: "Фасад и кровля", a: 46, w: 22, done: false, now: true },
  { t: "Инженерные сети", a: 52, w: 26, done: false },
  { t: "Отделка МОП", a: 70, w: 22, done: false },
  { t: "Благоустройство и сдача", a: 84, w: 16, done: false },
];
function Construction() {
  return (
    <Frame>
      <Title eyebrow="Внутренние процессы · Стройка" lead="Каждый дом — это проект с этапами, сроками и ответственными. Диаграмма Ганта показывает реальную картину, а отдел продаж видит честные сроки сдачи.">
        Стройка как управляемый проект
      </Title>
      <Reveal i={3}>
        <Bezel className="mt-10">
          <div className="p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between text-xs text-umber">
              <span className="font-semibold text-espresso">Дом №8 · план-график</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ember" /> сейчас идёт</span>
            </div>
            <div className="space-y-2.5">
              {GANTT.map((g, i) => (
                <div key={g.t} className="grid grid-cols-[10rem_1fr] items-center gap-4 md:grid-cols-[13rem_1fr]">
                  <span className={`truncate text-[15px] ${g.now ? "font-semibold text-espresso" : "text-umber"}`}>{g.t}</span>
                  <div className="relative h-8 rounded-full bg-espresso/[0.04]">
                    <div
                      className={`grow-x absolute top-0 flex h-8 items-center rounded-full px-3 text-xs font-medium ${
                        g.done ? "bg-sage/30 text-bark" : g.now ? "bg-ember text-cream" : "bg-clay text-bark/70"
                      }`}
                      style={{ left: `${g.a}%`, width: `${g.w}%`, animationDelay: `${250 + i * 110}ms` }}
                    >
                      {g.now && <span className="pulse-dot mr-1.5 h-1.5 w-1.5 rounded-full glass-card" />}
                      {g.done ? "готово" : g.now ? "в работе" : "план"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Bezel>
      </Reveal>
    </Frame>
  );
}

/* ─────────────────────────── 7. PROCUREMENT ─────────────────────────── */
const PROC = [
  { t: "Заявка от прораба", d: "Нужны материалы / подрядчик", g: Icon.doc },
  { t: "Согласование сметы", d: "Маршрут утверждения суммы", g: Icon.check },
  { t: "Сбор предложений", d: "Тендер среди поставщиков", g: Icon.handshake },
  { t: "Договор и оплата", d: "Контроль сроков и закрытия", g: Icon.shield },
];
function Procurement() {
  return (
    <Frame>
      <Title eyebrow="Внутренние процессы · Закупки" lead="Тендеры и снабжение — в смарт-процессе. Прозрачно, кто и за какую сумму согласовал подрядчика. Никаких «договорились на словах».">
        Тендеры и закупки без хаоса
      </Title>
      <div className="mt-12 flex flex-col gap-3 lg:flex-row">
        {PROC.map((p, i) => (
          <Reveal key={p.t} i={3 + i} className="flex-1">
            <div className="relative flex h-full flex-col rounded-2xl glass-card p-5 ring-1 ring-espresso/[0.06]">
              <IconCircle glyph={p.g} tone="bark" />
              <h3 className="mt-4 font-display text-lg font-semibold text-espresso">{p.t}</h3>
              <p className="mt-1 text-[15px] text-umber">{p.d}</p>
              <span className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-ember">Этап {i + 1}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}

/* ─────────────────────────── 8. DOCS ─────────────────────────── */
function Docs() {
  return (
    <Frame>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <Title eyebrow="Внутренние процессы · Документы" lead="ДДУ, договоры подряда, акты — формируются из шаблонов и согласуются по маршруту прямо в системе. Акты и подряд подписываются с контрагентами онлайн через Битрикс24.Подпись.">
            Документооборот <br /> и согласования
          </Title>
        </div>
        <div className="space-y-3">
          {[
            { t: "Шаблоны документов", d: "ДДУ, подряд и акты генерируются из полей сделки за секунды" },
            { t: "Согласование (штатный БП)", d: "Юрист → финансы → директор — бизнес-процессом из коробки, с контролем сроков" },
            { t: "Битрикс24.Подпись", d: "Акты и подряд — онлайн с контрагентами, ПЭП по 63-ФЗ" },
            { t: "Контроль регистрации ДДУ", d: "Стадия «подано в Росреестр» → «зарегистрировано»" },
          ].map((x, i) => (
            <Reveal key={x.t} i={3 + i}>
              <div className="flex items-start gap-4 rounded-2xl glass-soft p-5 ring-1 ring-espresso/[0.05]">
                <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-ember/12 text-ember">
                  <Icon.check className="h-4 w-4 stroke-current fill-none" />
                </span>
                <div>
                  <h3 className="font-semibold text-espresso">{x.t}</h3>
                  <p className="text-[15px] text-umber">{x.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ─────────────────────────── 9. TEAM ─────────────────────────── */
function Team() {
  return (
    <Frame>
      <Title eyebrow="Внутренние процессы · Команда" lead="Портал собирает компанию в одном месте: задачи, новости, база знаний и онбординг. Особенно ценно, когда открыты вакансии и приходят новые люди.">
        Команда, регламенты и онбординг
      </Title>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { g: Icon.people, t: "Живая лента и чаты", d: "Новости компании, опросы, обсуждение объектов — вместо разрозненных мессенджеров." },
          { g: Icon.doc, t: "База знаний", d: "Регламенты продаж, инструкции по стройке, шаблоны — всё в одном месте и под рукой." },
          { g: Icon.spark, t: "Онбординг новичков", d: "Готовый сценарий адаптации: задачи, документы, доступы для каждой новой роли." },
        ].map((x, i) => (
          <Reveal key={x.t} i={3 + i}>
            <Bezel tone="warm" className="h-full">
              <div className="flex h-full flex-col p-6">
                <IconCircle glyph={x.g} tone="sage" />
                <h3 className="mt-4 font-display text-xl font-semibold text-espresso">{x.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-umber">{x.d}</p>
              </div>
            </Bezel>
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}

/* ─────────────────────────── 10. DASHBOARD ─────────────────────────── */
const KPI = [
  { v: "₽ 214 млн", l: "продажи в работе", sub: "+18% к плану квартала" },
  { v: "37", l: "активных сделок", sub: "12 на стадии ипотеки" },
  { v: "68%", l: "готовность Дома №8", sub: "сдача — в графике" },
  { v: "5 900 ₽", l: "средняя цена лида", sub: "−21% за счёт аналитики" },
];
function Dashboard() {
  return (
    <Frame>
      <Title eyebrow="Управление · Дашборды" lead="Руководитель открывает один экран и видит компанию целиком: продажи, финансы, готовность объектов. Без планёрок и ручных отчётов.">
        Вся компания на одном экране
      </Title>
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPI.map((k, i) => (
          <Reveal key={k.l} i={3 + i}>
            <Bezel className="h-full">
              <div className="flex h-full flex-col p-6">
                <span className="font-display text-3xl font-semibold text-espresso md:text-4xl">{k.v}</span>
                <span className="mt-2 text-[15px] font-medium text-bark">{k.l}</span>
                <span className="mt-1 text-sm text-sage">{k.sub}</span>
              </div>
            </Bezel>
          </Reveal>
        ))}
      </div>
      <Reveal i={8}>
        <p className="mt-8 text-sm text-umber/80">Данные обновляются в реальном времени — из тех же сделок, задач и звонков, что ведут менеджеры и прорабы.</p>
      </Reveal>
    </Frame>
  );
}

/* ─────────────────────────── 11. SERVICE ─────────────────────────── */
function Service() {
  return (
    <Frame>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <Title eyebrow="Сервис · Постпродажа" lead="Отношения с дольщиком не заканчиваются сделкой. Гарантийные обращения после заселения ведутся как заявки — с исполнителем, сроком и контролем.">
            Гарантийный сервис <br /> после заселения
          </Title>
        </div>
        <div className="space-y-3">
          {[
            { t: "Обращение жильца", d: "С сайта, QR в подъезде или звонка — сразу в систему", s: "Принято" },
            { t: "Назначение мастера", d: "Заявка уходит ответственному со сроком", s: "В работе" },
            { t: "Контроль и закрытие", d: "Фотоотчёт, обратная связь, оценка", s: "Решено" },
          ].map((x, i) => (
            <Reveal key={x.t} i={3 + i}>
              <div className="flex items-center justify-between gap-4 rounded-2xl glass-card p-5 ring-1 ring-espresso/[0.06]">
                <div>
                  <h3 className="font-semibold text-espresso">{x.t}</h3>
                  <p className="text-[15px] text-umber">{x.d}</p>
                </div>
                <span className="shrink-0 rounded-full bg-sage/12 px-3 py-1 text-xs font-semibold text-sage">{x.s}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ─────────────────────────── 12. CABINET ─────────────────────────── */
function Cabinet() {
  return (
    <Frame>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <Title eyebrow="Сервис · Личный кабинет" lead="Дольщик в любой момент видит статус своей квартиры: этап стройки, документы, графики оплат — как трекинг заказа в Ozon или CDEK. Меньше звонков в офис, выше доверие.">
            Личный кабинет покупателя
          </Title>
        </div>
        <Reveal i={3}>
          <Bezel tone="dark">
            <div className="p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ember/90">Кв. №42 · ваш ЖК</p>
              <h3 className="mt-1 font-display text-2xl font-semibold text-cream">Ваша квартира строится</h3>
              <div className="mt-6 space-y-4">
                {[
                  { t: "ДДУ заключён", done: true },
                  { t: "Монолит завершён", done: true },
                  { t: "Фасад и окна", done: true },
                  { t: "Отделка и сети", now: true },
                  { t: "Передача ключей", done: false },
                ].map((s) => (
                  <div key={s.t} className="flex items-center gap-3">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full ${s.done ? "bg-sage/30" : s.now ? "bg-ember" : "bg-white/10"}`}>
                      {s.done ? <Icon.check className="h-3.5 w-3.5 stroke-current fill-none text-cream" /> : <span className="h-1.5 w-1.5 rounded-full glass-card" />}
                    </span>
                    <span className={`text-sm ${s.now ? "font-semibold text-cream" : s.done ? "text-cream/80" : "text-cream/45"}`}>{s.t}</span>
                    {s.now && <span className="ml-auto text-[11px] text-ember">сейчас</span>}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3 border-t border-white/10 pt-5 text-xs text-cream/70">
                <span className="rounded-lg bg-white/10 px-3 py-1.5">Документы</span>
                <span className="rounded-lg bg-white/10 px-3 py-1.5">График оплат</span>
                <span className="rounded-lg bg-white/10 px-3 py-1.5">Чат с офисом</span>
              </div>
            </div>
          </Bezel>
        </Reveal>
      </div>
    </Frame>
  );
}

/* ─────────────────────────── 13. LIVE DEMO ─────────────────────────── */
function Demo() {
  return (
    <div className="flex h-full w-full flex-col px-6 py-10 md:px-10">
      <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col">
        <Reveal i={0} className="flex items-center justify-between">
          <div>
            <Eyebrow>Живое демо · нажмите на квартиру</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-espresso md:text-4xl">
              Интерактивная шахматка → бронь в CRM
            </h2>
          </div>
          <span className="hidden rounded-full bg-ember/10 px-4 py-2 text-xs font-semibold text-ember md:inline">Так это работает вживую</span>
        </Reveal>
        <Reveal i={1} className="mt-6 flex-1">
          <Bezel className="h-full" tone="warm">
            <div className="h-full p-3 md:p-4">
              <Shahmatka />
            </div>
          </Bezel>
        </Reveal>
      </div>
    </div>
  );
}

/* ─────────────────────────── 14. VIBE SHOWCASE ─────────────────────────── */
const VIBE = [
  { g: Icon.grid, t: "Интерактивная шахматка", d: "Выбор квартиры на плане дома с авто-бронью и синхронным статусом в CRM.", tag: "вы видели вживую" },
  { g: Icon.track, t: "Личный кабинет дольщика", d: "Трекинг стройки в стиле Ozon/CDEK: статус, документы, оплаты." },
  { g: Icon.chart, t: "Дашборд план-факт продаж", d: "Сводка по домам и квартирам с целями и прогнозом." },
  { g: Icon.spark, t: "Подсказчик в карточке сделки", d: "Скрипт и next-step для менеджера прямо при работе со сделкой." },
  { g: Icon.gauge, t: "Ипотечный калькулятор", d: "Виджет на сайте, который создаёт готовый лид в Битрикс24." },
  { g: Icon.channels, t: "Авто-выгрузка на ЦИАН/Авито", d: "Объявления формируются из каталога квартир в CRM." },
];
function Showcase() {
  return (
    <Frame>
      <Title eyebrow="Сверх коробки · Вайбкод" lead="Битрикс24 — гибкая платформа. То, чего нет в коробке, мы дорабатываем под ваши процессы. Вот примеры решений, которые можно развернуть под вас.">
        Что можно докрутить
      </Title>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {VIBE.map((v, i) => (
          <Reveal key={v.t} i={3 + i}>
            <Tilt className="h-full">
              <div className="group relative flex h-full flex-col rounded-2xl glass-card p-6 ring-1 ring-espresso/[0.06] transition-shadow duration-500 hover:ring-ember/30 hover:shadow-[0_30px_60px_-40px_rgba(36,27,18,0.5)]">
                <IconCircle glyph={v.g} />
                <h3 className="mt-4 font-display text-lg font-semibold text-espresso">{v.t}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-umber">{v.d}</p>
                {v.tag && <span className="mt-3 inline-flex w-max rounded-full bg-sage/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-sage">{v.tag}</span>}
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}

/* ─────────────── 14b. LIVE MORTGAGE CALCULATOR ─────────────── */
function CalcSlide() {
  return (
    <div className="flex h-full w-full flex-col px-6 py-10 md:px-10">
      <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col">
        <Reveal i={0} className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Eyebrow>Вайбкод · Живой пример</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-espresso md:text-[2.6rem]">
              Ипотечный калькулятор на сайт
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-umber">
            Покупатель считает платёж сам — и оставляет заявку. Лид с готовым расчётом сразу падает в Битрикс24.
            Покрутите ползунки →
          </p>
        </Reveal>
        <Reveal i={1} className="mt-6 flex-1">
          <Bezel className="h-full" tone="warm">
            <div className="h-full p-3 md:p-4">
              <Calculator />
            </div>
          </Bezel>
        </Reveal>
      </div>
    </div>
  );
}

/* ─────────────────────────── 15. ROADMAP ─────────────────────────── */
const ROAD = [
  { ph: "Этап 1", t: "Запуск продаж", d: "Воронка, каналы, телефония, обучение менеджеров.", w: "2–3 недели" },
  { ph: "Этап 2", t: "Внутренний контур", d: "Стройка, закупки, документооборот, портал команды.", w: "1–2 месяца" },
  { ph: "Этап 3", t: "Аналитика и сервис", d: "Сквозная аналитика, дашборды, гарантийный сервис.", w: "2 недели" },
  { ph: "Этап 4", t: "Кастомные доработки", d: "Шахматка, личный кабинет, интеграции с площадками.", w: "по проекту" },
];
function Roadmap() {
  return (
    <Frame>
      <Title eyebrow="Внедрение · Дорожная карта" lead="Не «всё сразу», а понятными этапами с быстрым результатом уже на первом. Коробка — за дни, доработки — следом.">
        Дорожная карта внедрения
      </Title>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ROAD.map((r, i) => (
          <Reveal key={r.ph} i={3 + i}>
            <div className="flex h-full flex-col rounded-2xl glass-soft p-6 ring-1 ring-espresso/[0.06]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ember">{r.ph}</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-espresso">{r.t}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-umber">{r.d}</p>
              <span className="mt-4 inline-flex w-max items-center gap-1.5 rounded-full glass-card px-3 py-1 text-xs font-medium text-bark ring-1 ring-espresso/[0.06]">
                {r.w}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}

// ── deck definition: title shown in the progress rail ──
export const SLIDES = [
  { id: "cover", section: "Старт", el: <Cover /> },
  { id: "pain", section: "Проблемы", el: <Pain /> },
  { id: "s1", section: "Продажи", el: <SectionMark no="01" label="Продажи" /> },
  { id: "funnel", section: "Продажи", el: <Funnel /> },
  { id: "kanban", section: "Продажи", el: <Kanban /> },
  { id: "channels", section: "Продажи", el: <Channels /> },
  { id: "analytics", section: "Продажи", el: <Analytics /> },
  { id: "tel", section: "Продажи", el: <Telephony /> },
  { id: "s2", section: "Внутрянка", el: <SectionMark no="02" label="Внутренние процессы" /> },
  { id: "box", section: "Внутрянка", el: <BoxTools /> },
  { id: "build", section: "Внутрянка", el: <Construction /> },
  { id: "proc", section: "Внутрянка", el: <Procurement /> },
  { id: "docs", section: "Внутрянка", el: <Docs /> },
  { id: "team", section: "Внутрянка", el: <Team /> },
  { id: "dash", section: "Внутрянка", el: <Dashboard /> },
  { id: "s3", section: "Сервис", el: <SectionMark no="03" label="Клиентский сервис" /> },
  { id: "service", section: "Сервис", el: <Service /> },
  { id: "cabinet", section: "Сервис", el: <Cabinet /> },
  { id: "demo", section: "Демо", el: <Demo /> },
  { id: "showcase", section: "Вайбкод", el: <Showcase /> },
  { id: "calc", section: "Вайбкод", el: <CalcSlide /> },
  { id: "road", section: "Внедрение", el: <Roadmap /> },
];
