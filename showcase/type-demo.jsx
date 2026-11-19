// Витрина: раздел «Шрифт и стили» — гайд по типографике (Вика, 19.11.2026).
// Шрифт Mary — Onest. Стили взяты из Figma (текстовые стили Mary DS/* и Mary/*, файл o1syNp93H3v2dyA3JHp4em).
import React, { useState } from "react";

const ink = (a) => `rgba(var(--ink-rgb),${a})`;
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const Card = ({ id, title, lead, children }) => (
  <section className="card" id={id}>
    <h2>{title}</h2>
    {lead && <div className="src" style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.55 }}>{lead}</div>}
    {children}
  </section>
);
const Code = ({ children }) => <code style={{ fontFamily: MONO, fontSize: 12, color: "var(--text)", background: ink(0.05), padding: "1px 6px", borderRadius: 6, whiteSpace: "nowrap" }}>{children}</code>;

// интерфейс: Mary DS/* — основной набор для экранов продукта
const UI = [
  { n: "Title L", sz: 24, lh: 30, w: 500, ls: -0.24, use: "Заголовок страницы", ex: "База знаний", tok: "text-24" },
  { n: "Title M", sz: 20, lh: 26, w: 500, ls: -0.2, use: "Заголовок попапа и крупного блока", ex: "Отключить Telegram?", tok: "text-20" },
  { n: "Title S", sz: 16, lh: 22, w: 500, ls: 0, use: "Заголовок секции, имя в карточке", ex: "Что смогу делать", tok: "text-16" },
  { n: "Body", sz: 14, lh: 20, w: 400, ls: 0, use: "Основной текст: ответы Mary, абзацы", ex: "Собрала договор и счёт для Sofa Club по шаблону «аутсорс».", tok: "text-14" },
  { n: "Body Medium", sz: 14, lh: 20, w: 500, ls: 0, use: "Акцент в тексте, пункты меню слева", ex: "Подключения", tok: "text-14 font-medium" },
  { n: "UI", sz: 13, lh: 18, w: 400, ls: 0, use: "Строки таблиц и списков, поля ввода", ex: "Договор № 1 — Диван Плюс", tok: "text-13" },
  { n: "UI Medium", sz: 13, lh: 18, w: 500, ls: 0, use: "Кнопки, пункты меню, вкладки", ex: "Загрузить выписку", tok: "text-13 font-medium" },
  { n: "Caption", sz: 12, lh: 16, w: 400, ls: 0, use: "Пояснения серым, даты, размеры файлов", ex: "19 нояб · 36 КБ", tok: "text-12", grey: true },
  { n: "Caption Medium", sz: 12, lh: 16, w: 500, ls: 0, use: "Подписи колонок, лейблы полей", ex: "Дата добавления", tok: "text-12 font-medium", grey: true },
  { n: "Micro", sz: 11, lh: 14, w: 500, ls: 0, use: "Заголовки групп, счётчики", ex: "Приложения", tok: "text-11 font-medium", grey: true },
];
// крупные: Mary/* — лендинг, презентации, промо. В интерфейсе продукта не используем
const BIG = [
  { n: "Display", sz: 56, lh: "105%", w: 600, ls: "-2%", use: "Обложка, главный экран лендинга", ex: "Mary заберёт рутину" },
  { n: "H1", sz: 40, lh: "108%", w: 600, ls: "-2%", use: "Заголовок экрана лендинга", ex: "Документы за минуту" },
  { n: "H2", sz: 36, lh: "110%", w: 500, ls: "-2%", use: "Заголовок блока", ex: "Как это работает" },
  { n: "H3", sz: 20, lh: "120%", w: 500, ls: "-1%", use: "Подзаголовок", ex: "Договор, счёт и акт по вашему шаблону" },
  { n: "Body L", sz: 16, lh: "150%", w: 500, ls: "0", use: "Текст на лендинге", ex: "Mary собирает документы по вашим шаблонам и раскладывает их по папкам." },
  { n: "UI · Value", sz: 16, lh: "100%", w: 600, ls: "-1%", use: "Крупная цифра в карточке", ex: "4 500 Br" },
];
const W = { 400: "Regular", 500: "Medium", 600: "SemiBold" };

const Head = ({ cols, items }) => (
  <div style={{ display: "grid", gridTemplateColumns: cols, fontSize: 12, fontWeight: 500, color: "var(--text-2)", padding: "0 0 8px" }}>{items.map(h => <div key={h}>{h}</div>)}</div>
);

function Row({ s, cols, big }) {
  const [copied, setCopied] = useState(false);
  const css = big
    ? `font: ${s.w} ${s.sz}px/${s.lh} var(--font); letter-spacing: ${s.ls === "0" ? "0" : s.ls.replace("%", "") / 100 + "em"};`
    : `font: ${s.w} ${s.sz}px/${s.lh}px var(--font);${s.ls ? ` letter-spacing: ${s.ls}px;` : ""}`;
  const copy = () => { try { navigator.clipboard.writeText(css).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1200); }); } catch (e) {} };
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, alignItems: "baseline", gap: 0, padding: "16px 0", borderTop: `1px solid ${ink(0.06)}` }}>
      <div style={{ minWidth: 0, paddingRight: 16 }}>
        <div style={{ fontSize: s.sz, lineHeight: big ? s.lh : s.lh + "px", fontWeight: s.w, letterSpacing: big ? (s.ls === "0" ? 0 : s.ls.replace("%", "") / 100 + "em") : s.ls, color: s.grey ? "var(--text-2)" : "var(--text)", overflowWrap: "anywhere" }}>{s.ex}</div>
        <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 6 }}>{s.use}</div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{big ? "Mary/" : "Mary DS/"}{s.n}</div>
      <div style={{ fontSize: 13, color: "var(--text-2)", fontVariantNumeric: "tabular-nums" }}>{s.sz} / {big ? s.lh : s.lh}</div>
      <div style={{ fontSize: 13, color: "var(--text-2)" }}>{W[s.w]} {s.w}</div>
      <div><button onClick={copy} title={css} style={{ border: `1px solid ${ink(0.1)}`, background: "transparent", borderRadius: 999, padding: "4px 10px", fontSize: 12, fontWeight: 500, color: "var(--text)", cursor: "pointer", fontFamily: "inherit" }}>{copied ? "Скопировано" : "CSS"}</button></div>
    </div>
  );
}

const DoDont = ({ ok, children, note }) => (
  <div style={{ border: `1px solid ${ink(0.1)}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
    <div style={{ fontSize: 12, fontWeight: 500, color: ok ? "#2FA35B" : "#E5484D" }}>{ok ? "Так" : "Не так"}</div>
    <div>{children}</div>
    <div style={{ fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.5 }}>{note}</div>
  </div>
);

export function TypeSection() {
  const cols = "minmax(0,2.2fr) 190px 100px 120px 90px";
  const glyphs = "Аа Бб Вв Гг Дд Ее Ёё Жж Зз Ии Йй Кк Лл Мм Нн Оо Пп Рр Сс Тт Уу Фф Хх Цц Чч Шш Щщ Ъъ Ыы Ьь Ээ Юю Яя";
  return (
    <div>
      <Card id="t-font" title="Шрифт — Onest"
        lead={<>Один шрифт на весь продукт, сайт и презентации. С 19.11.2026 вместо системного SF Pro: SF Pro нельзя раздавать файлом, поэтому на Windows и Linux люди видели другой шрифт. Onest раздаём сами, лицензия <b style={{ fontWeight: 500, color: "var(--text)" }}>OFL</b> — бесплатно и в коммерческом продукте.</>}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[400, 500, 600].map(w => (
            <div key={w} style={{ background: ink(0.04), borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 44, lineHeight: 1, fontWeight: w, color: "var(--text)", letterSpacing: "-0.02em" }}>Аа Mary</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginTop: 14 }}>{W[w]} · {w}</div>
              <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>{w === 400 ? "Основной текст, таблицы, пояснения" : w === 500 ? "Заголовки интерфейса, кнопки, меню, акценты" : "Только крупные заголовки на лендинге и большие цифры"}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 18, lineHeight: 1.6, color: "var(--text)", marginTop: 16, overflowWrap: "anywhere" }}>{glyphs}</div>
        <div style={{ fontSize: 18, lineHeight: 1.6, color: "var(--text)", fontVariantNumeric: "tabular-nums" }}>0123456789 · 4 500,00 Br · 19.11.2026 · 17:42 · № 1 · «ёлочки» — тире</div>
      </Card>

      <Card id="t-ui" title="Стили интерфейса · Mary DS"
        lead="Набор для экранов продукта. В Figma — текстовые стили Mary DS/*. Кегли только целые, межстрочный — в пикселях. Нажмите «CSS», чтобы скопировать.">
        <Head cols={cols} items={["Пример", "Стиль в Figma", "Кегль / строка", "Вес", ""]} />
        {UI.map(s => <Row key={s.n} s={s} cols={cols} />)}
      </Card>

      <Card id="t-big" title="Крупные стили · лендинг и презентации"
        lead="Стили Mary/* для сайта, презентаций и промо. В интерфейсе продукта их не используем — там максимум Title L 24.">
        <Head cols={cols} items={["Пример", "Стиль в Figma", "Кегль / строка", "Вес", ""]} />
        {BIG.map(s => <Row key={s.n} s={s} cols={cols} big />)}
      </Card>

      <Card id="t-rules" title="Правила">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, fontSize: 14, lineHeight: 1.55, color: "var(--text)" }}>
          {[
            ["Цвет текста", <>Основной <Code>#494F5C</Code> (<Code>--text</Code>), второстепенный — он же на 50%. Чистый чёрный для текста не используем.</>],
            ["Вес", <>В интерфейсе только 400 и 500. Бывший «Medium 510» из SF Pro = <b style={{ fontWeight: 500 }}>500</b>. 600 — только крупные заголовки лендинга и большие цифры.</>],
            ["Кегли", <>Только целые: 11 · 12 · 13 · 14 · 16 · 20 · 24. Никаких 13,5 и 12,5.</>],
            ["Цифры", <>В таблицах, суммах и времени — <Code>font-variant-numeric: tabular-nums</Code>, чтобы колонки не прыгали.</>],
            ["Регистр", <>Без капса и разрядки. Заголовки — с заглавной буквы, как обычное предложение.</>],
            ["Фичи шрифта", <>Не включать <Code>"cv11", "ss01"</Code> — это настройки Inter, у Onest они меняют вид букв.</>],
          ].map(([t, d]) => (
            <div key={t} style={{ background: ink(0.04), borderRadius: 16, padding: 16 }}><div style={{ fontWeight: 500, marginBottom: 6 }}>{t}</div><div style={{ color: "var(--text-2)" }}>{d}</div></div>
          ))}
        </div>
      </Card>

      <Card id="t-dodont" title="Так и не так">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <DoDont ok note="Заголовок Title L, под ним Caption серым — понятная иерархия в два уровня.">
            <div style={{ fontSize: 24, lineHeight: "30px", fontWeight: 500, letterSpacing: -0.24, color: "var(--text)" }}>Документы</div>
            <div style={{ fontSize: 12, lineHeight: "16px", color: "var(--text-2)", marginTop: 4 }}>6 документов · обновлено сегодня</div>
          </DoDont>
          <DoDont note="Жирный 700, капс и чёрный цвет — кричит и не похоже на Mary.">
            <div style={{ fontSize: 24, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "#000" }}>Документы</div>
            <div style={{ fontSize: 13.5, color: "#000", marginTop: 4 }}>6 документов · обновлено сегодня</div>
          </DoDont>
          <DoDont ok note="Суммы — табличными цифрами, выровнены по правому краю.">
            <div style={{ fontVariantNumeric: "tabular-nums", fontSize: 13, color: "var(--text)", display: "grid", gap: 4, justifyItems: "end" }}><span>1 500,00 Br</span><span>4 500,00 Br</span><span>11 000,00 Br</span></div>
          </DoDont>
        </div>
      </Card>

      <Card id="t-code" title="Код" lead="В продукте Onest подключаем через Next.js — шрифт скачивается при сборке и отдаётся с нашего сервера, к Google браузер не ходит.">
        <pre style={{ fontFamily: MONO, margin: 0, padding: 16, borderRadius: 12, background: ink(0.04), fontSize: 12, lineHeight: 1.6, color: "var(--text)", overflowX: "auto" }}>{`// app/layout.tsx
import { Onest } from "next/font/google";
const onest = Onest({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
// <html className={onest.variable}>

/* стек */
font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* стили интерфейса */
.title-l   { font: 500 24px/30px var(--font-sans); letter-spacing: -0.24px; }
.title-m   { font: 500 20px/26px var(--font-sans); letter-spacing: -0.2px; }
.title-s   { font: 500 16px/22px var(--font-sans); }
.body      { font: 400 14px/20px var(--font-sans); }
.body-m    { font: 500 14px/20px var(--font-sans); }
.ui        { font: 400 13px/18px var(--font-sans); }
.ui-m      { font: 500 13px/18px var(--font-sans); }
.caption   { font: 400 12px/16px var(--font-sans); }
.caption-m { font: 500 12px/16px var(--font-sans); }
.micro     { font: 500 11px/14px var(--font-sans); }`}</pre>
      </Card>
    </div>
  );
}
