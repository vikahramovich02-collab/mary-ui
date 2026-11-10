// Витрина: раздел «Попапы» — гайд для разработки (Вика, 10.11).
// Компонент — Dialog из components/states.jsx. Здесь правила, анатомия, примеры и что нельзя.
import { Dialog, Button, Icon } from "../components/states.jsx";
import React, { useState } from "react";
import { AllPopups } from "./popups-all.jsx";

const A = (p) => window.MARY_UI_ASSETS + p;
const ink = (a) => `rgba(var(--ink-rgb),${a})`;

const Card = ({ id, title, lead, children }) => (
  <section className="card" id={id}>
    <h2>{title}</h2>
    {lead && <div className="src" style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.55 }}>{lead}</div>}
    {children}
  </section>
);

// подложка «как под затемнением» для статичных примеров
const Stage = ({ children, h = 360, phone }) => (
  <div style={{
    position: "relative", minHeight: h, borderRadius: 16, overflow: "hidden",
    background: "rgba(20,22,30,0.22)", display: "grid", placeItems: phone ? "end center" : "center", padding: phone ? 0 : 24,
  }}>
    <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, #F3F3F5 0 44px, #FAFAFB 44px 88px)", zIndex: -1 }} />
    {children}
  </div>
);

// голова Mary — как в чате у «Думаю..»: видео mary-typing.mp4, обрезанное до головы (vision-update.jsx MaryHeadLive)
export const MaryHead = ({ size = 56 }) => {
  const k = size / 38;
  return (
    <span style={{ display: "block", width: size, height: size, position: "relative", overflow: "hidden" }}>
      <video src={A("mary-typing.mp4")} autoPlay loop muted playsInline preload="auto"
        style={{ position: "absolute", left: Math.round(-17 * k), top: Math.round(-16 * k), width: Math.round(73 * k), height: Math.round(73 * k), mixBlendMode: "multiply" }} />
    </span>
  );
};

const Brand = ({ bg = "#FFD43B", children }) => (
  <span style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: "grid", placeItems: "center", fontSize: 18, fontWeight: 700, color: "#111" }}>{children}</span>
);

const Table = ({ head, rows, cols }) => (
  <div style={{ display: "grid", gridTemplateColumns: cols, fontSize: 13, lineHeight: 1.5 }}>
    {head.map((h, i) => <div key={"h" + i} style={{ fontSize: 12, fontWeight: 500, color: "var(--text-2)", padding: "0 12px 8px 0" }}>{h}</div>)}
    {rows.map((r, ri) => r.map((c, ci) => (
      <div key={ri + "-" + ci} style={{ padding: "10px 12px 10px 0", borderTop: `1px solid ${ink(0.06)}`, color: ci === 0 ? "var(--text)" : "var(--text-2)", fontWeight: ci === 0 ? 500 : 400 }}>
        {typeof c === "string" ? c.split(/(`[^`]+`)/).map((part, k) => part.startsWith("`")
          ? <code key={k} style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, color: "var(--text)", background: ink(0.05), padding: "1px 6px", borderRadius: 6 }}>{part.slice(1, -1)}</code>
          : part) : c}
      </div>
    )))}
  </div>
);

// хорошо / плохо
const DoDont = ({ ok, children, note }) => (
  <div style={{ minWidth: 0 }}>
    <div style={{ padding: 16, borderRadius: 16, background: ink(0.03), display: "grid", placeItems: "center", minHeight: 210 }}>{children}</div>
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 10, fontSize: 13, lineHeight: 1.5, color: "var(--text)" }}>
      <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 9, display: "grid", placeItems: "center", marginTop: 1, background: ok ? "var(--btn)" : "var(--danger)", color: "#fff" }}>
        <Icon name={ok ? "check" : "close"} size={11} stroke={2.4} />
      </span>
      <span><b style={{ fontWeight: 500 }}>{ok ? "Так" : "Не так"}.</b> <span style={{ color: "var(--text-2)" }}>{note}</span></span>
    </div>
  </div>
);

// разметка «как в Figma»: меряем живой Dialog и рисуем отступы, размеры и скругление
const PINK = "rgba(255,0,153,0.14)", PINK_T = "#E0007A", BLUE = "#0064FF";
const Tag = ({ x, y, c = BLUE, children, center = true }) => (
  <span style={{ position: "absolute", left: x, top: y, transform: center ? "translate(-50%,-50%)" : "none", background: c, color: "#fff",
    fontSize: 10, fontWeight: 600, lineHeight: "14px", padding: "0 4px", borderRadius: 4, whiteSpace: "nowrap", zIndex: 3, fontVariantNumeric: "tabular-nums" }}>{children}</span>
);
function Redline({ children }) {
  const box = React.useRef(null);
  const [m, setM] = useState(null);
  React.useLayoutEffect(() => {
    const measure = () => {
      const root = box.current; if (!root) return;
      const card = root.querySelector('[role="dialog"]'); if (!card) return;
      const o = root.getBoundingClientRect();
      const r = (el) => { const b = el.getBoundingClientRect(); return { x: b.left - o.left, y: b.top - o.top, w: b.width, h: b.height }; };
      const [head, body, foot] = card.children;
      const icon = head.children[0], title = head.children[1], close = head.children[2];
      const txt = body && body.querySelector("p");
      const btns = foot ? [...foot.children] : [];
      setM({ card: r(card), head: r(head), icon: r(icon), title: r(title), close: close && r(close), txt: txt && r(txt), foot: foot && r(foot), btns: btns.map(r) });
    };
    measure(); const t = setTimeout(measure, 300); return () => clearTimeout(t);
  }, []);
  // розовые отступы рисуем внутри обрезки по скруглению карточки, подписи — поверх
  const Pad = ({ x, y, w, h, label, lx, ly, c }) => (
    <>
      <span style={{ position: "absolute", left: c.x, top: c.y, width: c.w, height: c.h, borderRadius: 24, overflow: "hidden", zIndex: 2, pointerEvents: "none" }}>
        <span style={{ position: "absolute", left: x - c.x, top: y - c.y, width: w, height: h, background: PINK }} />
      </span>
      {label && <Tag x={lx ?? x + w / 2} y={ly ?? y + h / 2} c={PINK_T}>{label}</Tag>}
    </>
  );
  const Box = ({ b, label, side = "top" }) => (
    <>
      <span style={{ position: "absolute", left: b.x, top: b.y, width: b.w, height: b.h, outline: `1px solid ${BLUE}`, zIndex: 2 }} />
      <Tag x={side === "right" ? b.x + b.w + 4 : b.x + b.w / 2} y={side === "top" ? b.y - 9 : side === "bottom" ? b.y + b.h + 9 : b.y + b.h / 2} center={side !== "right"}>{label}</Tag>
    </>
  );
  return (
    <div ref={box} style={{ position: "relative", padding: "44px 56px 48px 40px", borderRadius: 16, background: ink(0.03) }}>
      {children}
      {m && (() => {
        const c = m.card;
        const icon = m.icon, b0 = m.btns[0], b1 = m.btns[m.btns.length - 1];
        return (
          <>
            {/* ширина карточки */}
            <span style={{ position: "absolute", left: c.x, top: c.y - 22, width: c.w, height: 1, background: BLUE }} />
            <span style={{ position: "absolute", left: c.x, top: c.y - 26, width: 1, height: 9, background: BLUE }} />
            <span style={{ position: "absolute", left: c.x + c.w - 1, top: c.y - 26, width: 1, height: 9, background: BLUE }} />
            <Tag x={c.x + c.w / 2} y={c.y - 22}>{Math.round(c.w)}</Tag>
            {/* скругление */}
            <span style={{ position: "absolute", left: c.x - 1, top: c.y - 1, width: 24, height: 24, borderTopLeftRadius: 24, borderTop: `1.5px dashed ${BLUE}`, borderLeft: `1.5px dashed ${BLUE}`, zIndex: 2 }} />
            <Tag x={c.x - 16} y={c.y - 4}>r 24</Tag>
            {/* отступы карточки 20 */}
            <Pad c={c} x={c.x} y={c.y} w={c.w} h={icon.y - c.y} label="20" lx={c.x + c.w - 70} />
            <Pad c={c} x={c.x} y={icon.y} w={icon.x - c.x} h={b0.y + b0.h - icon.y} label="20" />
            <Pad c={c} x={b1.x + b1.w} y={icon.y} w={c.x + c.w - (b1.x + b1.w)} h={b0.y + b0.h - icon.y} label="20" lx={c.x + c.w - 10} ly={(m.txt ? m.txt.y + m.txt.h / 2 : icon.y + 60) + 26} />
            <Pad c={c} x={c.x} y={b0.y + b0.h} w={c.w} h={c.y + c.h - (b0.y + b0.h)} label="20" lx={c.x + 60} />
            {/* зазоры */}
            <Pad c={c} x={icon.x + icon.w} y={icon.y} w={m.title.x - (icon.x + icon.w)} h={icon.h} label="12" ly={icon.y + icon.h + 9} />
            {m.txt && <Pad c={c} x={m.txt.x} y={icon.y + icon.h} w={m.txt.w} h={m.txt.y - (icon.y + icon.h)} label="16" lx={m.txt.x + 90} />}
            {m.txt && <Pad c={c} x={m.txt.x} y={m.txt.y + m.txt.h} w={m.txt.w} h={b0.y - (m.txt.y + m.txt.h)} label="20" lx={m.txt.x + 60} />}
            {m.btns.length > 1 && <Pad c={c} x={b0.x + b0.w} y={b0.y} w={b1.x - (b0.x + b0.w)} h={b0.h} label="8" ly={b0.y - 9} />}
            {/* размеры элементов */}
            <Box b={icon} label="40" side="bottom" />
            {m.close && <Box b={m.close} label="28" side="top" />}
            <Box b={m.title} label="16 Medium" side="bottom" />
            {m.txt && <Box b={m.txt} label="14 · 1.55" side="right" />}
            <Box b={b1} label="h 36" side="right" />
          </>
        );
      })()}
    </div>
  );
}

// номер на анатомии
const Pin = ({ n, x, y }) => (
  <span style={{ position: "absolute", left: x, top: y, width: 20, height: 20, borderRadius: 10, background: "var(--accent)", color: "#fff", fontSize: 11, fontWeight: 600, display: "grid", placeItems: "center", zIndex: 2 }}>{n}</span>
);

const CODE = `import { Dialog } from "components/states.jsx";

// подтверждение
<Dialog open={open} onClose={close}
  title="Удалить «Прайс 2026.xlsx»?"
  text="Файл уйдёт в архив и исчезнет насовсем через 30 дней. До этого его можно вернуть."
  actions={[
    { label: "Отменить", onClick: close },
    { label: "Удалить файл", kind: "danger", onClick: remove },
  ]} />

// системное сообщение: закрыть нельзя, только действие
<Dialog layout="center" closable={false}
  icon={<MaryHead />}
  title="Вышла новая версия Mary"
  text="Эта вкладка открыта на прошлой версии. Обновите страницу, чтобы продолжить"
  actions={[{ label: "Обновить страницу", icon: "refresh", onClick: reload }]} />

// телефон — шторка снизу
<Dialog phone={isPhone} … />`;

export function PopupsSection() {
  const [live, setLive] = useState(null);
  const close = () => setLive(null);
  const refresh = <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20 11a8 8 0 1 0-2.3 5.7" /><path d="M20 4v7h-7" /></svg>;
  const P = {
    version: { layout: "center", closable: false, icon: <MaryHead />, title: "Вышла новая версия Mary", text: "Эта вкладка открыта на прошлой версии. Обновите страницу, чтобы продолжить", actions: [{ label: "Обновить страницу", icon: refresh, onClick: close }] },
    del: { title: "Удалить «Прайс 2026.xlsx»?", text: "Файл уйдёт в архив и исчезнет насовсем через 30 дней. До этого его можно вернуть.", actions: [{ label: "Отменить", onClick: close }, { label: "Удалить файл", kind: "danger", onClick: close }] },
    off: { icon: <Brand bg="#2AABEE"><span style={{ color: "#fff", fontSize: 16 }}>✈</span></Brand>, title: "Отключить Telegram?", text: "Клиенты продолжат писать, но Mary их не увидит. Переписка, что уже есть, останется на месте. Включить обратно можно в любой момент.", actions: [{ label: "Оставить", onClick: close }, { label: "Отключить", kind: "danger", onClick: close }] },
    conn: {
      size: "md", icon: <Brand>Y</Brand>, title: "YCLIENTS", text: "Записи, клиенты и свободные окна мастеров",
      children: (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingBottom: 4 }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text)" }}>Что смогу делать</div>
          {["Видит расписание", "Создаёт и переносит визиты", "Ничего не удаляет без спроса"].map(t => (
            <div key={t} style={{ border: `1px solid ${ink(0.1)}`, borderRadius: 16, padding: "12px 14px", fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{t}</div>
          ))}
        </div>
      ),
      actions: [{ label: "Подключить YCLIENTS", icon: "chat", onClick: close }],
    },
  };

  return (
    <div>
      <Card id="p-when" title="Когда нужен попап">
        <Table cols="180px 1fr 1fr" head={["Что", "Когда", "Пример в Mary"]} rows={[
          ["Попап", "Нужно решение, которое нельзя отменить, или без действия работать дальше нельзя", "Удалить файл, отключить канал, вышла новая версия"],
          ["Попап с содержимым", "Человеку нужно понять, на что он соглашается, прежде чем нажать", "Подключить YCLIENTS — какие данные заберу и что смогу делать"],
          ["Меню", "Выбор из списка действий, ничего не теряется", "⋮ у файла, «+» в чате, перенос в папку"],
          ["Шторка снизу", "То же, что попап, но на телефоне", "Все попапы на телефоне"],
          ["Панель сбоку / на весь экран", "Долгая работа: читать, править, настраивать", "Файл, автоматизация, настройки шага"],
        ]} />
      </Card>

      <Card id="p-anatomy" title="Анатомия и размеры" lead="Три зоны: шапка, тело, кнопки. Шапка и кнопки не уезжают — прокручивается только тело. Розовое — отступы, синее — размеры элементов.">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 560px) 1fr", gap: 32, alignItems: "center" }}>
          <Redline><Dialog inline {...P.off} /></Redline>
          <ol style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.8, color: "var(--text)" }}>
            <li><b style={{ fontWeight: 500 }}>Карточка</b> <span style={{ color: "var(--text-2)" }}>— 400, скругление 24, отступы 20, рамка 1px 5%, тень 0 18 48 / 18%</span></li>
            <li><b style={{ fontWeight: 500 }}>Иконка</b> <span style={{ color: "var(--text-2)" }}>— 40, скругление 12, до заголовка 12. Знак сервиса, файла или голова Mary. Необязательна</span></li>
            <li><b style={{ fontWeight: 500 }}>Заголовок</b> <span style={{ color: "var(--text-2)" }}>— 16 Medium, одна мысль. Для подтверждения — вопросом</span></li>
            <li><b style={{ fontWeight: 500 }}>Закрыть</b> <span style={{ color: "var(--text-2)" }}>— 28, скругление 10, иконка 16 серая. Нет, если без действия нельзя</span></li>
            <li><b style={{ fontWeight: 500 }}>Текст</b> <span style={{ color: "var(--text-2)" }}>— 14 Regular, серый 50%, межстрочный 1.55, от шапки 16. Что произойдёт и можно ли вернуть</span></li>
            <li><b style={{ fontWeight: 500 }}>Кнопки</b> <span style={{ color: "var(--text-2)" }}>— 36, скругление 999, между ними 8, от текста 20. Справа, главная последней: глагол с объектом, а не «Да»</span></li>
          </ol>
        </div>
      </Card>

      <Card id="p-tokens" title="Размеры и токены" lead="Значения одни на все попапы. Не подбирать на глаз — брать отсюда.">
        <Table cols="200px 1fr 1fr" head={["Свойство", "Компьютер", "Телефон"]} rows={[
          ["Ширина", "400 — сообщение, подтверждение · 465 — с содержимым", "Вся ширина экрана, шторка снизу"],
          ["Высота", "По содержимому, не больше 86% экрана", "То же"],
          ["Радиус", "`24`", "`24 24 0 0`"],
          ["Отступы", "`20` со всех сторон · `24` сверху у сообщения по центру", "`16` по бокам · снизу 16 + safe area"],
          ["Фон", "`var(--bg-popover)`", "То же"],
          ["Рамка", "`1px rgba(ink, .05)`", "То же"],
          ["Тень", "`0 18px 48px rgba(shadow, .18)`", "То же"],
          ["Затемнение", "`rgba(20,22,30,.22)` + `blur(2px)`", "То же"],
          ["Заголовок", "16 Medium · 20 у сообщения по центру", "16 · 20"],
          ["Текст", "14 Regular, `var(--text-2)`, межстрочный 1.55", "16"],
          ["Кнопки", "36, скругление 999, 13 Medium, отступ слева-справа 16, между ними 8", "44, 16, на всю ширину"],
          ["Слой", "`z-index: 200`, выше всего, кроме подсказок", "То же"],
        ]} />
      </Card>

      <Card id="p-kinds" title="Виды" lead="Четыре вида закрывают все случаи в Mary. Нажмите «Открыть», чтобы посмотреть вживую.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: 16 }}>
          {[
            ["version", "Сообщение", "Системное: всё по центру, иконка 56, заголовок 20. Одна кнопка на всю ширину. Крестика нет — дальше только через действие"],
            ["del", "Подтверждение", "Необратимое действие. Заголовок — вопрос с объектом. Красная кнопка только для удаления и отключения"],
            ["off", "Подтверждение с иконкой", "Когда важно, о каком сервисе или файле речь: знак 40 слева от заголовка"],
            ["conn", "С содержимым", "Ширина 465. Тело прокручивается, шапка и кнопка на месте. Одна главная кнопка — на всю ширину"],
          ].map(([k, t, d]) => (
            <div key={k} style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 500 }}>{t}</span>
                <span style={{ marginLeft: "auto" }}><Button variant="secondary" size="sm" onClick={() => setLive(k)}>Открыть</Button></span>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5, marginBottom: 12 }}>{d}</div>
              <Stage h={k === "conn" ? 460 : 330}><Dialog inline {...P[k]} style={k === "conn" ? { maxHeight: 420 } : undefined} /></Stage>
            </div>
          ))}
        </div>
      </Card>

      <Card id="p-phone" title="На телефоне" lead="Любой попап превращается в шторку снизу: та же шапка и текст, кнопки 44 на всю ширину, текст 16, отступ снизу учитывает полоску iPhone.">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {["version", "del"].map(k => (
            <div key={k} style={{ width: 360, height: 640, borderRadius: 40, border: `8px solid ${ink(0.9)}`, overflow: "hidden", boxSizing: "border-box" }}>
              <Stage h={624} phone><Dialog inline phone {...P[k]} /></Stage>
            </div>
          ))}
        </div>
      </Card>

      <Card id="p-buttons" title="Кнопки" lead="">
        <Table cols="220px 1fr" head={["Правило", "Почему"]} rows={[
          ["Одна кнопка — на всю ширину", "Действие одно, искать глазами нечего"],
          ["Две — справа, главная последней", "Глаз заканчивает на главном. Отмена всегда слева от неё"],
          ["Главная чёрная `var(--btn)`", "Как все главные кнопки в Mary. Синих кнопок нет"],
          ["Опасная — сплошная красная `var(--danger)`, текст белый. Только удалить и отключить", "Красный значит «потеряете». Для «Сохранить» или «Подключить» — чёрная"],
          ["По центру — две кнопки делят ширину поровну", "Как в «Удалить файл» в Базе знаний: иконка файла сверху, всё по центру"],
          ["Вторая — белая с рамкой `1px var(--line-10)`", "Как «Вторичная» в Figma. Спокойнее главной, но видна как кнопка"],
          ["Текст кнопки — глагол", "«Удалить файл», «Отключить», «Обновить страницу». Не «Да», «Ок», «Подтвердить»"],
          ["Больше двух кнопок нельзя", "Если вариантов больше — это меню, а не попап"],
        ]} />
      </Card>

      <Card id="p-behavior" title="Поведение" lead="">
        <Table cols="220px 1fr" head={["Что", "Как"]} rows={[
          ["Закрыть", "Крестик, клик по затемнению, Esc. Все три — то же, что «Отменить»"],
          ["Нельзя закрыть", "`closable={false}`: нет крестика, клик мимо и Esc не работают. Только когда без действия дальше нельзя (новая версия, вход истёк)"],
          ["Фокус", "При открытии — на главную кнопку, у удаления — на «Отменить». Tab ходит внутри попапа"],
          ["Прокрутка", "Страница под попапом не прокручивается. Длинное тело прокручивается внутри, шапка и кнопки стоят"],
          ["Появление", "Затемнение 0.2 с, карточка 0.25 с снизу вверх на 8px. На телефоне шторка выезжает снизу"],
          ["После действия", "Попап закрывается сразу, результат — на экране. Mary не переспрашивает «точно?» второй раз"],
          ["Один за раз", "Попап поверх попапа не открываем. Нужно второе решение — меняем содержимое того же"],
        ]} />
      </Card>

      <Card id="p-dodont" title="Так и не так" lead="">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          <DoDont ok note="Кнопка говорит, что случится">
            <Dialog inline style={{ width: 300 }} title="Удалить «Прайс.xlsx»?" actions={[{ label: "Отменить" }, { label: "Удалить файл", kind: "danger" }]} />
          </DoDont>
          <DoDont note="«Да» и «Нет» — надо перечитать заголовок, чтобы понять">
            <Dialog inline style={{ width: 300 }} title="Вы уверены?" actions={[{ label: "Нет" }, { label: "Да", kind: "danger" }]} />
          </DoDont>
          <DoDont ok note="Главное действие чёрное">
            <Dialog inline style={{ width: 300 }} title="Подключить YCLIENTS?" actions={[{ label: "Подключить" }]} />
          </DoDont>
          <DoDont note="Синие и красные кнопки там, где ничего не теряется">
            <div style={{ width: 300, boxSizing: "border-box", background: "var(--bg-popover)", border: `1px solid ${ink(0.05)}`, borderRadius: 24, boxShadow: "0 18px 48px rgba(var(--shadow-rgb),0.18)", padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text)" }}>Подключить YCLIENTS?</div>
              <div style={{ marginTop: 20, height: 36, borderRadius: 999, background: "var(--accent)", color: "#fff", display: "grid", placeItems: "center", fontSize: 14, fontWeight: 500 }}>Подключить</div>
            </div>
          </DoDont>
          <DoDont ok note="Текст объясняет последствия и можно ли вернуть">
            <Dialog inline style={{ width: 300 }} title="Отключить Telegram?" text="Mary перестанет видеть новые сообщения. Включить обратно можно в любой момент." actions={[{ label: "Оставить" }, { label: "Отключить", kind: "danger" }]} />
          </DoDont>
          <DoDont note="Свой радиус, своя тень, кнопки слева — каждый попап выглядит по-разному">
            <div style={{ width: 300, background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 30px 80px rgba(0,0,0,.35)" }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Отключить Telegram?</div>
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                <span style={{ height: 38, padding: "0 16px", border: `1px solid ${ink(0.2)}`, borderRadius: 8, display: "grid", placeItems: "center", fontSize: 13 }}>Отмена</span>
                <span style={{ height: 38, padding: "0 16px", background: "var(--danger)", color: "#fff", borderRadius: 8, display: "grid", placeItems: "center", fontSize: 13 }}>Ок</span>
              </div>
            </div>
          </DoDont>
        </div>
      </Card>

      <Card id="p-all" title="Все попапы Mary по страницам" lead="Каждый попап собран из Dialog — так его и делаем в коде. У каждого ссылка на кадр в Figma и где он в прототипе.">
        <AllPopups Stage={Stage} />
      </Card>

      <Card id="p-code" title="Код" lead="Один компонент Dialog на все случаи. Свои попапы с нуля не собираем.">
        <pre style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", margin: 0, padding: 16, borderRadius: 12, background: ink(0.04), fontSize: 12, lineHeight: 1.6, overflowX: "auto", color: "var(--text)" }}>{CODE}</pre>
        <div className="src" style={{ marginTop: 12 }}>
          Где сейчас в прототипе: vision-update.jsx «Новая версия» · vision-process.jsx ConnectorModal, ConfirmOff · vision-kb.jsx confirm «Удалить файл» · process-pages.jsx Modal · vision-employees.jsx карточка сотрудника.
          Часть из них ещё с другим радиусом (20/22) и затемнением (.28/.34) — приводим к этому гайду.
        </div>
      </Card>

      {live && <Dialog {...P[live]} onClose={close} phone={window.innerWidth < 600} actions={P[live].actions.map(a => ({ ...a, onClick: close }))} />}
    </div>
  );
}
