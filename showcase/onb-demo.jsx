// Витрина: раздел «Онбординг» — компоненты знакомства с Mary (Вика, 23.11.2026).
// Источник — код прототипа: src/platform/onb-cards.jsx (шкала шагов), onb-scenes.jsx (картинки разделов), onboarding-flow.js (шаги).
import React, { useState, useRef, useEffect } from "react";

const ink = (a) => `rgba(var(--ink-rgb),${a})`;
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const PROTO = "http://77.237.241.242:8083/?ready=1&onb=1";
const A = "assets/onb/";

const Card = ({ id, title, lead, children }) => (
  <section className="card" id={id}>
    <h2>{title}</h2>
    {lead && <div className="src" style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.55 }}>{lead}</div>}
    {children}
  </section>
);
const Code = ({ children }) => <code style={{ fontFamily: MONO, fontSize: 12, color: "var(--text)", background: ink(0.05), padding: "1px 6px", borderRadius: 6 }}>{children}</code>;
const Stage = ({ children, pad = 24, bg = "#fff" }) => <div style={{ marginTop: 16, padding: pad, borderRadius: 16, border: `1px solid ${ink(0.08)}`, background: bg, overflow: "hidden" }}>{children}</div>;
const Rules = ({ items }) => <ul style={{ margin: "14px 0 0", paddingLeft: 18, fontSize: 14, lineHeight: 1.6, color: "var(--text-2)" }}>{items.map((t, i) => <li key={i}>{t}</li>)}</ul>;
const Spec = ({ rows }) => (
  <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "max-content 1fr", gap: "6px 18px", fontSize: 13 }}>
    {rows.map(([k, v], i) => <React.Fragment key={i}><span style={{ color: "var(--text-2)" }}>{k}</span><span style={{ color: "var(--text)", fontWeight: 500 }}>{v}</span></React.Fragment>)}
  </div>
);

// шаги знакомства: id, подпись, сколько вопросов или разделов внутри (столько овальчиков в линии)
const STEPS = [
  { id: "about", label: "Наше знакомство", n: 5 },
  { id: "tour", label: "Что есть на платформе", n: 7 },
  { id: "first", label: "Первое дело", n: 4 },
  { id: "launch", label: "Запуск", n: 2 },
];

// значок шага: у текущего ролик идёт по кругу, пройденные стоят на первом кадре, будущие — серые и бледные
function StepIcon({ id, state, size = 22 }) {
  const ref = useRef(null);
  useEffect(() => { const v = ref.current; if (!v) return; if (state === "current") v.play().catch(() => {}); else { v.pause(); try { v.currentTime = 0; } catch (e) {} } }, [state]);
  return (
    <span style={{ width: size, height: size, display: "block", overflow: "hidden", mixBlendMode: "multiply", opacity: state === "next" ? 0.4 : 1, filter: state === "next" ? "grayscale(1)" : "none", transition: "opacity .35s ease, filter .35s ease" }}>
      <video ref={ref} src={A + id + ".mp4"} poster={A + id + ".webp"} muted playsInline loop preload="auto" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </span>
  );
}

// шкала шагов: голова Mary с названием и три значка в равных колонках, под ними линия из овальчиков
function OnbHead({ at, got = 0 }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", height: 30 }}>
        {STEPS.map((s, i) => {
          const state = i < at ? "done" : i === at ? "current" : "next";
          return (
            <span key={s.id} style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: i ? 4 : 8 }}>
              {i === 0
                ? <img src="assets/mary-head.png" alt="" width={26} height={26} style={{ display: "block", flexShrink: 0 }} />
                : <span style={{ width: 32, display: "inline-flex", justifyContent: "center", flexShrink: 0 }}><StepIcon id={s.id} state={state} /></span>}
              {(i <= at + 1) && <span style={{ fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: state === "next" ? ink(0.35) : "var(--text)", transition: "color .3s ease" }}>{s.label}</span>}
            </span>
          );
        })}
      </div>
      <div style={{ display: "flex", marginTop: 7, height: 8 }}>
        {STEPS.map((s, i) => (
          <span key={s.id} style={{ flex: "1 1 0", display: "flex", alignItems: "center", gap: 2, paddingLeft: i ? 16 : 13, paddingRight: 5, position: "relative" }}>
            <span style={{ position: "absolute", left: i ? 12 : 9, top: 0, width: 8, height: 8, borderRadius: "50%", boxSizing: "border-box", background: i <= at ? "var(--btn, #0E0E0F)" : "#fff", border: i <= at ? "none" : `1.5px solid ${ink(0.2)}` }} />
            <span style={{ width: 8, flexShrink: 0 }} />
            {Array.from({ length: s.n }, (_, j) => (
              <span key={j} style={{ flex: 1, height: 2, borderRadius: 2, overflow: "hidden", background: ink(0.1) }}>
                <span style={{ display: "block", height: "100%", borderRadius: 2, background: "var(--btn, #0E0E0F)", width: i < at || (i === at && j < got) ? "100%" : "0%", transition: "width .6s cubic-bezier(.4,0,.2,1)" }} />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

function HeadDemo() {
  const [at, setAt] = useState(1), [got, setGot] = useState(2);
  const pill = (on) => ({ height: 32, padding: "0 14px", borderRadius: 999, border: `1px solid ${on ? "transparent" : ink(0.14)}`, background: on ? "#0E0E0F" : "#fff", color: on ? "#fff" : "var(--text)", font: "inherit", fontSize: 13, fontWeight: 500, cursor: "pointer" });
  return (
    <>
      <Stage><OnbHead at={at} got={got} /></Stage>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12, alignItems: "center" }}>
        {STEPS.map((s, i) => <button key={s.id} style={pill(i === at)} onClick={() => { setAt(i); setGot(1); }}>Шаг {i + 1}</button>)}
        <button style={pill(false)} onClick={() => setGot(g => Math.min(STEPS[at].n, g + 1))}>+ ответ</button>
        <button style={pill(false)} onClick={() => { setAt(4); setGot(0); }}>Всё пройдено</button>
      </div>
    </>
  );
}

// ── шкала, вариант 2 (на пробу, 23.11): одна сплошная линия, голова Mary едет по ней,
// значки шагов стоят на линии как остановки, подпись только у текущего шага, справа — сколько осталось
function OnbHead2({ at, got = 0 }) {
  const total = STEPS.length, done = at >= total;
  const frac = done ? 1 : (at + Math.min(got, STEPS[at].n) / STEPS[at].n) / total;      // 0…1
  const left = done ? 0 : STEPS.slice(at).reduce((a, s) => a + s.n, 0) - got;             // сколько вопросов и разделов впереди
  const mins = Math.max(1, Math.round(left * 15 / 60));
  const EASE = "cubic-bezier(.4,0,.2,1)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, height: 40 }}>
      <span style={{ fontSize: 13, color: "var(--text)", whiteSpace: "nowrap", minWidth: 170 }}>{done ? "Знакомство пройдено" : STEPS[at].label}</span>
      <span style={{ flex: 1, position: "relative", height: 40 }}>
        <span style={{ position: "absolute", left: 0, right: 0, top: 19, height: 2, borderRadius: 2, background: ink(0.1) }} />
        <span style={{ position: "absolute", left: 0, top: 19, height: 2, borderRadius: 2, background: "var(--btn, #0E0E0F)", width: frac * 100 + "%", transition: `width .7s ${EASE}` }} />
        {STEPS.slice(1).map((s, k) => {
          const i = k + 1;
          if (i === at) return null;
          return (
            <span key={s.id} title={s.label} style={{ position: "absolute", left: (i / total) * 100 + "%", top: 4, width: 32, height: 32, marginLeft: -16, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center" }}>
              <StepIcon id={s.id} state={i < at ? "done" : "next"} />
            </span>
          );
        })}
        <span style={{ position: "absolute", right: -3, top: 16, width: 8, height: 8, borderRadius: "50%", boxSizing: "border-box", background: done ? "var(--btn, #0E0E0F)" : "#fff", border: done ? "none" : `1.5px solid ${ink(0.2)}` }} />
        {!done && (
          <span style={{ position: "absolute", top: 4, left: frac * 100 + "%", width: 32, height: 32, marginLeft: -16, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", transition: `left .7s ${EASE}` }}>
            {at === 0 ? <img src="assets/mary-head.png" alt="" width={26} height={26} style={{ display: "block" }} /> : <StepIcon id={STEPS[at].id} state="current" size={26} />}
          </span>
        )}
      </span>
      <span style={{ fontSize: 12, color: ink(0.45), whiteSpace: "nowrap", minWidth: 96, textAlign: "right" }}>{done ? "готово" : `осталось ~${mins} мин`}</span>
    </div>
  );
}

function HeadCompare() {
  const [at, setAt] = useState(0), [got, setGot] = useState(2);
  const pill = (on) => ({ height: 32, padding: "0 14px", borderRadius: 999, border: `1px solid ${on ? "transparent" : ink(0.14)}`, background: on ? "#0E0E0F" : "#fff", color: on ? "#fff" : "var(--text)", font: "inherit", fontSize: 13, fontWeight: 500, cursor: "pointer" });
  const next = () => { if (at >= STEPS.length) return; if (got + 1 >= STEPS[at].n) { setAt(at + 1); setGot(0); } else setGot(got + 1); };
  const cap = { fontSize: 12, color: "var(--text-2)", margin: "0 0 10px" };
  return (
    <>
      <Stage><div style={cap}>Новый вариант</div><OnbHead2 at={at} got={got} /></Stage>
      <Stage><div style={cap}>Как сейчас</div><OnbHead at={Math.min(at, STEPS.length)} got={got} /></Stage>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12, alignItems: "center" }}>
        <button style={pill(true)} onClick={next}>Ответить на вопрос →</button>
        {STEPS.map((s, i) => <button key={s.id} style={pill(false)} onClick={() => { setAt(i); setGot(0); }}>К шагу {i + 1}</button>)}
        <button style={pill(false)} onClick={() => { setAt(0); setGot(0); }}>Сначала</button>
      </div>
    </>
  );
}

// варианты ответа в чате знакомства: два столбца, стрелка слева, серый текст, на наведении — тёмный
function Options({ items }) {
  const [h, setH] = useState(-1);
  return (
    <div style={{ maxWidth: 620 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: ink(0.45), padding: "0 12px 8px" }}><span>Возможные варианты</span><span>Свернуть</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 16 }}>
        {items.map((t, i) => (
          <button key={t} onMouseEnter={() => setH(i)} onMouseLeave={() => setH(-1)}
            style={{ display: "flex", alignItems: "center", gap: 14, height: 36, padding: "0 12px", border: 0, borderRadius: 10, background: h === i ? ink(0.05) : "transparent", color: h === i ? "var(--text)" : ink(0.5), font: "inherit", fontSize: 14, cursor: "pointer", textAlign: "left", transition: "background .15s, color .15s" }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>{t}
          </button>
        ))}
      </div>
    </div>
  );
}

// картинка раздела «Главная»: светлый фон, главный герой — «Сводка дня» от Mary, за ней зернистая плашка-градиент, справа две плитки с числами
function SceneHome({ height = 140 }) {
  const row = (c, t) => <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, fontWeight: 500, color: "#494F5C", whiteSpace: "nowrap" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: c, flexShrink: 0 }} />{t}</span>;
  const tile = (n, t, top, c) => (
    <div style={{ position: "absolute", right: 12, top, width: 66, height: 50, background: "#fff", borderRadius: 12, boxSizing: "border-box", padding: "8px 9px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 6px 16px rgba(40,50,120,0.10)" }}>
      <span style={{ fontSize: 18, fontWeight: 500, lineHeight: 1, letterSpacing: "-0.03em", color: c }}>{n}</span>
      <span style={{ fontSize: 8, fontWeight: 500, color: "rgba(73,79,92,0.55)", whiteSpace: "nowrap" }}>{t}</span>
    </div>
  );
  return (
    <div style={{ position: "relative", height, borderRadius: 14, overflow: "hidden", background: "linear-gradient(160deg, #EEF0FA 0%, #F4F5F9 60%, #F7F7FA 100%)" }}>
      <div style={{ position: "absolute", left: 14, top: 14, width: 96, height: 84, borderRadius: 16, overflow: "hidden",
        background: "radial-gradient(60% 55% at 20% 18%, #FF8FE0 0%, rgba(255,143,224,0) 70%), radial-gradient(70% 60% at 85% 35%, #6A5AFF 0%, rgba(106,90,255,0) 72%), radial-gradient(70% 60% at 30% 95%, #2F7BFF 0%, rgba(47,123,255,0) 72%), radial-gradient(50% 45% at 92% 100%, #FCA024 0%, rgba(252,160,36,0) 70%), #7C6DFF" }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.85 }}>
          <filter id="ui-home-grain"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 1.4 -0.35" /></filter>
          <rect width="100%" height="100%" filter="url(#ui-home-grain)" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 24, top: 36, width: 134, background: "#fff", borderRadius: 14, boxSizing: "border-box", padding: "10px 11px 11px", display: "flex", flexDirection: "column", gap: 6, boxShadow: "0 12px 28px rgba(40,50,120,0.18)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><img src="assets/mary-head.png" alt="" width={16} height={16} /><span style={{ fontSize: 11.5, fontWeight: 500, color: "#494F5C" }}>Сводка дня</span></span>
        {row("#34C759", "Ответила 38 клиентам")}{row("#0064FF", "4 заявки завела в CRM")}{row("#FCA024", "2 дела ждут вас")}
      </div>
      {tile("23", "за вчера", 16, "#494F5C")}{tile("2", "ждут вас", 74, "#F2702A")}
    </div>
  );
}

// карточка раздела в экскурсии: картинка, название, описание, кнопки
function TourCard() {
  return (
    <div style={{ width: 268, background: "#fff", borderRadius: 20, padding: 12, boxShadow: "0 12px 40px rgba(20,22,30,0.12)", boxSizing: "border-box" }}>
      <SceneHome />
      <div style={{ padding: "14px 8px 6px" }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text)" }}>Главная</div>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--text-2)", marginTop: 6 }}>Каждое утро здесь сводка: что я сделала за вчера и что ждёт вашего решения.</div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <button style={{ height: 34, padding: "0 16px", borderRadius: 999, border: 0, background: "#0E0E0F", color: "#fff", font: "inherit", fontSize: 13, fontWeight: 500 }}>Дальше</button>
          <button style={{ height: 34, padding: "0 16px", borderRadius: 999, border: `1px solid ${ink(0.14)}`, background: "#fff", color: "var(--text)", font: "inherit", fontSize: 13, fontWeight: 500 }}>Позже</button>
        </div>
      </div>
    </div>
  );
}

export function OnbSection() {
  return (
    <>
      <Card id="onb-head" title="Шкала шагов"
        lead={<>Стоит в шапке чата всё знакомство. Слева голова Mary с названием, дальше три шага в равных колонках. Под ними линия: у каждого шага столько овальчиков, сколько в нём вопросов или разделов. Нажмите на шаги ниже. <a href={PROTO} target="_blank" rel="noreferrer">Открыть в прототипе ↗</a></>}>
        <HeadDemo />
        <Spec rows={[["Высота строки", "30"], ["Голова Mary", "26 × 26"], ["Значок шага", "22 × 22, в ячейке 32"], ["Подпись", "13 Regular; будущий шаг — 35% чернил"], ["Линия", "овальчики 2 высотой, зазор 2; пройденные чёрные, остальные 10% чернил; заливка едет слева направо за 0,6 с"], ["Точка шага", "8; пройденная чёрная, будущая — белая с обводкой"]]} />
        <Rules items={["Подпись видна у пройденных, текущего и следующего шага. У остальных — только значок.", "Не хватает ширины — подпись остаётся только у текущего шага.", <>Код: <Code>OnbHead</Code> в <Code>src/platform/onb-cards.jsx</Code>, шаги — <Code>ONB_STEPS</Code> в <Code>onboarding-flow.js</Code>.</>]} />
      </Card>

      <Card id="onb-head2" title="Шкала шагов — вариант на пробу"
        lead="Одна строка вместо двух. Сплошная линия, по которой едет голова Mary. Значки шагов стоят на линии как остановки: Mary доезжает, подхватывает предмет шага и едет дальше уже с ним. Пройденные шаги остаются на линии цветными значками. Подпись только у текущего шага, справа — сколько осталось. Жмите «Ответить на вопрос» и сравнивайте с текущей шкалой под ней.">
        <HeadCompare />
        <Rules items={["Сколько вопросов внутри шага, не показываем — показываем, далеко ли до конца.", "Время справа считается от числа оставшихся вопросов и разделов (около 15 секунд на каждый).", "Названия остальных шагов — по наведению на значок.", "Это проба в витрине. В прототипе пока стоит прежняя шкала."]} />
      </Card>

      <Card id="onb-icons" title="Значки шагов"
        lead="На каждом значке наша собачка и предмет шага. Собачка всегда графитовая, предмет — в цвете воркфлоу. Текущий шаг играет ролик по кругу, пройденные стоят на первом кадре, будущие серые.">
        <Stage>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[["tour", "Что есть на платформе", "карта, синий #2F7BFF"], ["first", "Первое дело", "листок с галочкой, оранжевый #FCA024"], ["launch", "Запуск", "ракета, фиолетовый #6A5AFF"]].map(([id, t, c]) => (
              <div key={id} style={{ width: 170 }}>
                <StepIcon id={id} state="current" size={120} />
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", marginTop: 10 }}>{t}</div>
                <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>{c}</div>
                <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 12 }}>
                  <StepIcon id={id} state="current" /><StepIcon id={id} state="done" /><StepIcon id={id} state="next" />
                </div>
                <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 4 }}>текущий · пройден · впереди</div>
              </div>
            ))}
          </div>
        </Stage>
        <Spec rows={[["Стиль", "плоский, контур чёрный, без теней и объёма"], ["Собачка", "графит #33353F, как голова Mary"], ["Ролик", "3 секунды, зациклен, без звука, белый фон"], ["Файлы", "public/onb/steps3/tour|first|launch .mp4 и .webp, 192 × 192"]]} />
        <Rules items={["Новый шаг — новый значок в той же манере: собачка плюс один цветной предмет.", "Будущий шаг: значок серый (grayscale) и 40% непрозрачности.", "Значки накладываются умножением (mix-blend-mode: multiply), чтобы белый фон ролика не был виден."]} />
      </Card>

      <Card id="onb-options" title="Варианты ответа"
        lead="Под вопросом Mary предлагает готовые ответы. Они стоят над полем ввода в два столбца, стрелка слева. Свой ответ всегда можно написать в поле.">
        <Stage><Options items={["Красота и уход", "Медицина и ветеринария", "Обучение и спорт", "Кафе, отели, ивенты", "Ремонт и недвижимость", "Авто и транспорт", "Магазин и маркетплейс", "Услуги для бизнеса", "Производство", "Другое, напишу"]} /></Stage>
        <Spec rows={[["Строка", "высота 36, скругление 10"], ["Текст", "14 Regular, 50% чернил; на наведении — основной цвет и подложка 5%"], ["Стрелка", "14, линия 1.5, слева от текста"], ["Заголовок", "«Возможные варианты», 12, справа «Свернуть»"]]} />
        <Rules items={["Не больше десяти вариантов. Последний — «Другое, напишу».", "Плашки-таблетки для вариантов не используем."]} />
      </Card>

      <Card id="onb-tour" title="Карточка раздела в экскурсии"
        lead="На шаге «Что есть на платформе» Mary открывает разделы по очереди. Рядом с пунктом меню появляется карточка: картинка, название, одно-два предложения и кнопки.">
        <Stage bg={ink(0.03)}><TourCard /></Stage>
        <Spec rows={[["Карточка", "ширина 268, скругление 20, поля 12"], ["Картинка", "высота 140, скругление 14"], ["Название", "16 Medium"], ["Текст", "13 Regular, вторичный цвет"], ["Кнопки", "34, главная чёрная, вторая белая с рамкой"]]} />
        <Rules items={["Картинка «Главной»: светлый фон, главный герой — карточка «Сводка дня»; за ней зернистая плашка-градиент в цветах воркфлоу, справа две плитки с числами.", <>Код: <Code>SceneCard</Code> и <Code>SCENES.home</Code> в <Code>src/platform/onb-scenes.jsx</Code>.</>, "Остальные разделы экскурсии переводим на этот стиль по одному."]} />
      </Card>
    </>
  );
}
