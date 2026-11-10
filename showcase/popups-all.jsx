// Витрина: все попапы Mary по страницам — живыми компонентами на Dialog (Вика, 10.11).
// Тексты и состав — из прототипа mary-vision и макетов Figma (страница Mary Platform).
import { Dialog, Icon, Toggle, Chip, FileTile } from "../components/states.jsx";
import React, { useState } from "react";

const ink = (a) => `rgba(var(--ink-rgb),${a})`;
const FIG = "https://www.figma.com/design/o1syNp93H3v2dyA3JHp4em/Mary?node-id=";
const T = { fontSize: 14, color: "var(--text-2)", lineHeight: 1.55, margin: 0 };
const H = { fontSize: 14, fontWeight: 500, color: "var(--text)", margin: "16px 0 8px" };

// ── мелкие детали попапов ──
const Mark = ({ bg, children }) => <span style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: "grid", placeItems: "center", flexShrink: 0 }}>{children}</span>;
const TG = () => <Mark bg="#2AABEE"><svg width={20} height={20} viewBox="0 0 24 24" fill="#fff"><path d="M21.5 4.5 2.9 11.7c-1 .4-1 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.3-1.5z" /></svg></Mark>;
const YC = () => <Mark bg="#FFD200"><span style={{ fontSize: 20, fontWeight: 800, color: "#111", fontStyle: "italic" }}>Y</span></Mark>;
const GC = () => <Mark bg="#fff"><span style={{ width: 24, height: 24, borderRadius: 5, border: "2px solid #4285F4", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, color: "#4285F4" }}>31</span></Mark>;
const Ava = ({ name = "И", bg = "#C9B8A6", size = 40 }) => <span style={{ width: size, height: size, borderRadius: "50%", background: bg, color: "#fff", display: "grid", placeItems: "center", fontSize: size * 0.4, fontWeight: 500, flexShrink: 0 }}>{name}</span>;
const Agent = () => <Mark bg="linear-gradient(135deg,#5AA0FF,#0064FF)"><svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg></Mark>;
const Status = ({ children = "Работает", sub }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 24, padding: "0 10px", borderRadius: 999, border: `1px solid ${ink(0.1)}`, fontSize: 12, fontWeight: 500, color: "var(--text)" }}>
      <span style={{ width: 6, height: 6, borderRadius: 3, background: "#34C759" }} />{children}
    </span>
    {sub && <span style={{ fontSize: 12, color: "var(--text-2)" }}>{sub}</span>}
  </div>
);
const Group = ({ children }) => <div style={{ border: `1px solid ${ink(0.08)}`, borderRadius: 16, padding: "4px 14px" }}>{children}</div>;
const Row = ({ title, sub, right, last }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: last ? "none" : `1px solid ${ink(0.06)}` }}>
    <span style={{ flex: 1, minWidth: 0 }}>
      <span style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{title}</span>
      {sub && <span style={{ display: "block", fontSize: 12, color: "var(--text-2)", lineHeight: 1.45, marginTop: 2 }}>{sub}</span>}
    </span>
    {right}
  </div>
);
const Rows = ({ items, toggles }) => <Group>{items.map((it, i) => <Row key={i} title={it[0]} sub={it[1]} last={i === items.length - 1} right={toggles ? <Toggle defaultChecked={it[2]} /> : null} />)}</Group>;
const Chips = ({ items }) => <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{items.map(c => <Chip key={c}>{c}</Chip>)}</div>;
const Radio = ({ on, title, sub, right }) => (
  <div style={{ display: "flex", gap: 10, padding: "8px 10px", borderRadius: 12, background: on ? ink(0.04) : "transparent" }}>
    <span style={{ width: 16, height: 16, borderRadius: 8, flexShrink: 0, marginTop: 2, boxSizing: "border-box", border: on ? "5px solid var(--btn)" : `1.5px solid ${ink(0.3)}` }} />
    <span style={{ minWidth: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{title}</span>{right && <span style={{ fontSize: 12, color: "var(--text-2)", marginLeft: 8 }}>{right}</span>}
      {sub && <span style={{ display: "block", fontSize: 12, color: "var(--text-2)", lineHeight: 1.45, marginTop: 2 }}>{sub}</span>}
    </span>
  </div>
);
const Field = ({ label, value, placeholder, select, hint }) => (
  <div style={{ marginTop: 12 }}>
    <div style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 6 }}>{label}</div>
    <div style={{ height: 40, borderRadius: 12, border: `1px solid ${ink(0.1)}`, display: "flex", alignItems: "center", padding: "0 12px", fontSize: 14, color: value ? "var(--text)" : "var(--text-3)" }}>
      <span style={{ flex: 1 }}>{value || placeholder}</span>{select && <Icon name="chevron" size={14} stroke={1.8} />}
    </div>
    {hint && <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 6 }}>{hint}</div>}
  </div>
);
const Info = ({ rows }) => (
  <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", rowGap: 8, fontSize: 13 }}>
    {rows.map(([k, v]) => <React.Fragment key={k}><span style={{ color: "var(--text-2)" }}>{k}</span><span style={{ color: "var(--text)" }}>{v}</span></React.Fragment>)}
  </div>
);
const Alert = ({ children, tone = "danger", actions }) => (
  <div style={{ padding: "12px 14px", borderRadius: 12, background: tone === "danger" ? "rgba(var(--danger-rgb),0.08)" : ink(0.04), fontSize: 13, lineHeight: 1.5, color: tone === "danger" ? "var(--danger)" : "var(--text)" }}>
    {children}
    {actions && <div style={{ display: "flex", gap: 6, marginTop: 10 }}>{actions.map(a => <span key={a} style={{ height: 28, padding: "0 12px", borderRadius: 999, background: "var(--bg-popover)", display: "inline-grid", placeItems: "center", fontSize: 12, fontWeight: 500, color: "var(--text)" }}>{a}</span>)}</div>}
  </div>
);
const Foot = ({ children }) => <p style={{ ...T, fontSize: 12, color: "var(--text-3)", marginTop: 12 }}>{children}</p>;
const Tabs = ({ items, on = 0 }) => (
  <div style={{ display: "flex", padding: 3, borderRadius: 999, background: ink(0.05) }}>
    {items.map((t, i) => <span key={t} style={{ flex: 1, height: 30, borderRadius: 999, display: "grid", placeItems: "center", fontSize: 13, fontWeight: 500, background: i === on ? "var(--bg-popover)" : "transparent", color: i === on ? "var(--text)" : "var(--text-2)", boxShadow: i === on ? "0 1px 3px rgba(0,0,0,.08)" : "none" }}>{t}</span>)}
  </div>
);
const link = "chat";
const plug = <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round"><path d="M10 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1.2 1.2" /><path d="M14 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1.2-1.2" /></svg>;

// ── сами попапы ──
const DEL = (name) => ({ layout: "center", icon: <FileTile name={name} size={40} />, title: `Удалить «${name}»?`, text: "Файл уйдёт в архив и исчезнет насовсем через 30 дней. До этого его можно вернуть.", actions: [{ label: "Отмена" }, { label: "Удалить", kind: "danger" }] });

export const PAGES = [
  { page: "База знаний", items: [
    { name: "Удалить файл", fig: "12581:15412", proto: "vision-kb.jsx · confirm", p: DEL("Отзывы за август.md") },
    { name: "Удалить файл, который нужен автоматизациям", fig: "14453:53030", proto: "vision-kb.jsx · confirm", p: { ...DEL("Переносы и отмены.md"), size: "md",
      text: "Файл используется в 2 процессах — агенты перестанут на него опираться. Если файл устарел, лучше заменить его новым: процессы подхватят замену сами.",
      children: <Group>{["Запись клиента", "Ответы на вопросы"].map((t, i, a) => <Row key={t} title={t} last={i === a.length - 1} />)}</Group>,
      actions: [{ label: "Заменить файлом" }, { label: "Всё равно удалить", kind: "danger" }] } },
  ]},
  { page: "Подключения · интеграции", items: [
    { name: "Подключить сервис", fig: "13771:27759", proto: "vision-process.jsx · ConnectorModal", p: { size: "md", icon: <YC />, title: "YCLIENTS", text: "Записи, клиенты и свободные окна мастеров",
      children: <>
        <div style={{ ...H, marginTop: 0 }}>Вы управляете доступом</div>
        <p style={{ ...T, fontSize: 12 }}>Mary работает только в границах, перечисленных ниже. Доступ виден в «Подключениях» и отключается там же в один клик — данные остаются в сервисе.</p>
        <div style={H}>Какие данные заберу</div><Chips items={["Расписание мастеров", "Услуги и цены", "Записи клиентов", "Свободные окна"]} />
        <div style={H}>Что смогу делать</div>
        <Rows items={[["Видит расписание", "Свободные окна, записи на сегодня и на неделю, занятость мастеров."], ["Создаёт и переносит визиты", "Клиент написал — Mary сама поставит запись и подтвердит её в YCLIENTS."], ["Ничего не удаляет без спроса", "Отмена и перенос — только после подтверждения клиента или администратора."]]} />
        <Foot>Подключение открывает доступ только к перечисленному выше. Отключить можно в любой момент — данные остаются в сервисе.</Foot>
      </>, actions: [{ label: "Подключить YCLIENTS", icon: plug, kind: "primary" }] } },
    { name: "Подключить канал", fig: "13776:27976", proto: "vision-process.jsx · ConnectorModal", p: { size: "md", icon: <TG />, title: "Telegram", text: "Клиенты пишут в Telegram, Mary отвечает и ведёт запись",
      children: <>
        <div style={{ ...H, marginTop: 0 }}>Какие данные заберу</div><Chips items={["Сообщения боту", "Контакты клиентов", "История переписки"]} />
        <div style={H}>Что смогу делать</div>
        <Rows items={[["Читает входящие", "Видит сообщения клиентов боту салона и отвечает по базе знаний."], ["Ведёт запись", "Предлагает время, подтверждает визит и напоминает о нём."], ["Личное не трогает", "Доступ только к чатам бота — личную переписку Mary не видит."]]} />
        <p style={{ ...T, fontSize: 12, textAlign: "center", color: "var(--text)", marginTop: 12 }}>Бота ещё нет — заведу по шаблону</p>
      </>, actions: [{ label: "Подключить Telegram", icon: plug, kind: "primary" }] } },
    { name: "Сервис подключён", fig: "13773:27935", proto: "vision-process.jsx · conn-card", p: { size: "md", icon: <YC />, title: "YCLIENTS",
      children: <>
        <Status sub="последняя синхронизация 6 минут назад" />
        <div style={H}>Что включено</div>
        <Rows toggles items={[["Запись клиентов", "Предлагаю время и завожу визит в YCLIENTS", true], ["Напоминание за день до визита", "Пишу клиенту накануне, если он не отменил", true], ["Ответы на вопросы о цене", "Беру цены из услуг YCLIENTS", false]]} />
        <div style={H}>Права</div>
        <Rows toggles items={[["Читаю расписание и услуги", "", true], ["Создаю и переношу записи", "Спорное отдаю администратору", true], ["Пишу клиентам от имени салона", "Пока выключено — отвечаю только в чате с вами", false]]} />
        <div style={H}>Информация</div>
        <Info rows={[["Подключено", "17 июля 2026, Александр Лукашевич"]]} />
      </>, actions: [{ label: "Отключить YCLIENTS", kind: "secondary" }] } },
    { name: "Канал подключён", fig: "13773:28010", proto: "vision-process.jsx · conn-card", p: { size: "md", icon: <TG />, title: "Telegram",
      children: <>
        <Status sub="Подключено · последняя проверка 2 минуты назад" />
        <div style={H}>Что включено</div>
        <Rows toggles items={[["Ответы клиентам", "Отвечаю на вопросы о ценах и услугах по базе знаний", true], ["Запись прямо в переписке", "Предлагаю время и подтверждаю визит, не выводя клиента из чата", true], ["Ночные ответы", "После 20:00 отвечаю сама, утром передаю администратору", false]]} />
        <div style={H}>Права</div>
        <Rows toggles items={[["Читаю входящие боту", "", true], ["Отвечаю от имени салона", "Спорное и денежное отдаю администратору", true], ["Пишу первым тем, кто давно не приходил", "Пока выключено — первым клиенту не пишу", false]]} />
        <div style={H}>Информация</div>
        <Info rows={[["Подключено", "3 сентября 2026, Александр Лукашевич"], ["Аккаунт", "@mari_salon_bot"], ["Версия интеграции", "1.2"], ["Настройки в сервисе", "Открыть @BotFather ↗"]]} />
      </>, actions: [{ label: "Отключить Telegram", kind: "secondary" }] } },
    { name: "Отключить канал", fig: "14350:45481", proto: "vision-process.jsx · ConfirmOff", p: { icon: <TG />, title: "Отключить Telegram?", text: "Клиенты продолжат писать, но Mary их не увидит: новые обращения перестанут попадать в работу, записи из этого канала не создадутся. Переписка и записи, что уже есть, останутся на месте. Включить обратно можно в любой момент.", actions: [{ label: "Оставить" }, { label: "Отключить", kind: "danger" }] } },
  ]},
  { page: "Сотрудники", items: [
    { name: "Карточка сотрудника", fig: "13345:19299", proto: "vision-employees.jsx · person", p: { icon: <Ava name="В" bg="#2BA88F" />, title: <span>Виктория Войтович <span style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 400, marginLeft: 6 }}>администратор</span></span>,
      children: <>
        <div style={{ fontSize: 13, color: "var(--text)" }}>@vika_salon</div>
        <div style={{ ...H, fontSize: 12, fontWeight: 400, color: "var(--text-2)" }}>Подтверждает</div>
        <Group><Row title="Перенос записи" /><Row title="Запись клиента" last /></Group>
      </>, actions: [{ label: "Подробнее о сотруднике", kind: "primary" }] } },
    { name: "Карточка · ещё не вошёл", fig: "13357:19783", proto: "vision-employees.jsx · person", p: { icon: <Ava name="И" bg="#C9A28A" />, title: <span>Ирина Сокол <span style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 400, marginLeft: 6 }}>сотрудник · мастер бровей</span></span>,
      children: <>
        <Alert actions={["Скопировать ссылку", "Отправит Mary"]}>Ссылка отправлена вчера, 18:40, вход ещё не выполнен. Пока карточки с её узлов подтверждаете вы.</Alert>
        <div style={{ fontSize: 13, color: "var(--text)", marginTop: 12 }}>@ira_brows</div>
        <div style={{ ...H, fontSize: 12, fontWeight: 400, color: "var(--text-2)" }}>Подтверждает</div>
        <p style={T}>Ничего — сотрудник отвечает по своим клиентам, а карточки подтверждает администратор.</p>
      </>, actions: [{ label: "Подробнее о сотруднике", kind: "primary" }] } },
    { name: "Новый сотрудник", fig: "13029:16393", proto: "vision-employees.jsx · person-form", p: { size: "md", title: "Новый сотрудник", text: "Отправим на почту письмо со ссылкой для входа. Человек войдёт через Google и увидит только то, что положено по роли.",
      children: <>
        <Field label="Почта сотрудника" placeholder="anna@maryrose.by" />
        <div style={{ fontSize: 12, color: "var(--text-2)", margin: "12px 0 6px" }}>Роль</div>
        <Radio on title="Администратор" sub="Видит всех клиентов и записи, подтверждает карточки автоматизаций, может добавлять сотрудников" />
        <Radio title="Сотрудник" sub="Видит только свои записи и карточки, отвечает по своим клиентам. За других ничего не подтверждает" />
        <Field label="Какие автоматизации подтверждает" placeholder="Выберите автоматизации" select hint="Можно не выбирать" />
        <Field label="Должность" placeholder="Например, администратор смены" />
      </>, actions: [{ label: "Пригласить", icon: plug, kind: "primary" }] }, note: "Кнопка выключена, пока почта пустая" },
    { name: "Отменить приглашение", fig: "13029:16393", proto: "vision-employees.jsx · confirm-disable", p: { title: "Отменить приглашение?", text: "Ссылка для Ирины С. перестанет работать. Пригласить заново можно в любой момент.", actions: [{ label: "Отменить" }, { label: "Отменить приглашение", kind: "danger" }] } },
  ]},
  { page: "Автоматизации · настройки процесса", items: [
    { name: "Агент · настройки", fig: "14373:764", proto: "process-pages.jsx · Modal", p: { size: "md", icon: <Agent />, title: <span>Агент обращений<span style={{ display: "block", fontSize: 12, fontWeight: 400, color: "var(--text-2)" }}>работает · 2 мин назад</span></span>,
      children: <>
        <Tabs items={["Настройки", "Последние действия"]} />
        <div style={H}>Что делает</div>
        <p style={{ ...T, fontSize: 13 }}>Читает первое сообщение клиента, понимает, чего он хочет — записаться, перенести визит или задать вопрос — и передаёт запрос нужному агенту.</p>
        <div style={H}>Где работает в процессе</div>
        <Rows items={[["Найти клиента и определить статус", "первый шаг после сообщения клиента"], ["Запрос связан с записью?", "решает, куда пойдёт обращение дальше"]]} />
        <div style={H}>Источники и база знаний</div><Chips items={["Instagram", "Telegram", "Скрипт ответов клиентам.md", "Переносы и отмены.md"]} />
      </>, actions: [{ label: "Выключить агента" }, { label: "Изменить с Mary", icon: "chat", kind: "primary" }] } },
    { name: "Сотрудник в процессе", fig: "14349:40235", proto: "process-pages.jsx · Modal", p: { size: "md", icon: <Ava name="В" bg="#2BA88F" />, title: "Виктория Войтович",
      children: <>
        <p style={{ ...T, fontSize: 12 }}>администратор · процесс «Запись клиентов»</p>
        <div style={{ ...H, display: "flex", alignItems: "center" }}><span style={{ flex: 1 }}>Роль в процессе</span><Chip>Изменить роль</Chip></div>
        <p style={{ ...T, fontSize: 13 }}>Подтверждает записи, помогает подобрать время, когда свободного нет, и решает ошибки записи.</p>
        <div style={H}>Когда получает обращение</div>
        <Rows items={[["Решить ошибку записи", "запись не создалась в системе"], ["Проверить запись", "перед подтверждением клиенту"]]} />
        <div style={H}>Доступы</div><Chips items={["Клиенты", "Записи", "Расписание", "История обращений"]} />
      </>, actions: [{ label: "Изменить с Mary", icon: "chat", kind: "primary" }] } },
    { name: "Изменить роль", fig: "14440:953", proto: "—", p: { size: "md", title: "Изменить роль Виктории", text: "Роль действует только в процессе «Запись клиентов».",
      children: <><Radio on title="администратор" sub="видит и решает задачи процесса, меняет настройки" /><Radio title="сотрудник" sub="получает только свои задачи" /><Foot>В других автоматизациях роль Виктории не меняется.</Foot></>,
      actions: [{ label: "Отмена" }, { label: "Сохранить", kind: "primary" }] } },
    { name: "Удалить из процесса", fig: "14431:46917", proto: "—", p: { size: "md", title: "Удалить Викторию из процесса «Запись клиентов»?", text: "У Виктории 2 задачи ждут решения. Кому передать?",
      children: <><Radio on title="Лена Мороз" right="сотрудник" /><Radio title="Александр Лукашевич" right="директор" /><Radio title="Вернуть Mary" right="решит сама или спросит позже" /><Foot>Виктория останется в компании и в других автоматизациях — удаляется только из этого процесса.</Foot></>,
      actions: [{ label: "Отмена" }, { label: "Удалить и передать", kind: "danger" }] } },
    { name: "Отключить сервис", fig: "14350:45481", proto: "vision-process.jsx · ConfirmOff", p: { icon: <YC />, title: "Отключить YCLIENTS?", text: "Mary перестанет находить клиентов, проверять расписание и создавать записи. Обращения будут приходить, но запись заработает только частично.", actions: [{ label: "Отмена" }, { label: "Отключить", kind: "danger" }] } },
    { name: "Уже подключено в компании", fig: "14455:67519", proto: "—", p: { icon: <GC />, title: "Google Календарь уже подключён", text: "Его подключила Виктория Ахрамова для всей компании · studio@maryrose.by. Использовать в «Запись клиентов»? Mary будет видеть личное расписание мастеров и не предложит клиенту занятое время.", actions: [{ label: "Отмена" }, { label: "Использовать в процессе", kind: "primary" }] } },
    { name: "Убрать файл из процесса", fig: "14453:61346", proto: "—", p: { title: "Убрать файл из процесса?", text: "«Мастера и график.xlsx» останется в общей базе знаний. Вернуть его можно в любой момент через «Добавить из базы».",
      children: <Alert>Агент расписания берёт из этого файла график мастеров. Без него Mary не сможет предлагать время и будет передавать запись администратору.</Alert>,
      actions: [{ label: "Отмена" }, { label: "Убрать", kind: "primary" }] } },
    { name: "Продлить план", fig: "14455:66818", proto: "—", p: { size: "md", title: "Продлить план", text: "Сейчас тариф «Старт» — 400 Br в месяц. В сентябре процессы израсходовали 412 Br, из них «Запись клиентов» — 9,40 Br за неделю.",
      children: <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[["Пакет токенов", "+100 Br к текущему месяцу", "100 Br"], ["Тариф «Рост»", "800 Br в месяц · хватит с запасом", "800 Br", 1], ["Автопополнение", "докупать по 50 Br, когда останется 10%", "по 50 Br"]].map(([t, s, p, on]) => (
          <div key={t} style={{ display: "flex", alignItems: "center", padding: "10px 14px", borderRadius: 14, border: on ? "1.5px solid var(--btn)" : `1px solid ${ink(0.1)}` }}>
            <span style={{ flex: 1 }}><span style={{ display: "block", fontSize: 14, fontWeight: 500 }}>{t}</span><span style={{ fontSize: 12, color: "var(--text-2)" }}>{s}</span></span>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{p}</span>
          </div>))}
        <Foot>Итого: 800 Br в месяц · с 4 октября, агенты включатся сразу после оплаты</Foot>
      </div>,
      actions: [{ label: "Отмена" }, { label: "Оплатить 800 Br", kind: "primary" }] } },
    { name: "Вернуть как было", fig: "14451:77317", proto: "—", p: { title: "Вернуть как было?", text: "Правило подтверждения снова станет «подтверждает любой администратор».",
      children: <Foot>Изменение v8 не удалится — останется в истории. Mary создаст новую версию v9.</Foot>,
      actions: [{ label: "Отмена" }, { label: "Вернуть", kind: "primary" }] } },
  ]},
];

export function AllPopups({ Stage }) {
  const [live, setLive] = useState(null);
  return (
    <>
      {PAGES.map(pg => (
        <div key={pg.page} style={{ marginTop: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${ink(0.06)}` }}>
            <span style={{ fontSize: 16, fontWeight: 500 }}>{pg.page}</span>
            <span style={{ fontSize: 12, color: "var(--text-3)" }}>{pg.items.length}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(520px, 1fr))", gap: 20 }}>
            {pg.items.map(it => (
              <div key={it.name} style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                <Stage h={200}><Dialog inline {...it.p} /></Stage>
                <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{it.name}</span>
                  <span style={{ marginLeft: "auto", display: "flex", gap: 12, fontSize: 12 }}>
                    <a href={FIG + it.fig.replace(":", "-")} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>Figma ↗</a>
                    <span style={{ color: "var(--text-2)", cursor: "pointer" }} onClick={() => setLive(it)}>Открыть</span>
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-3)" }}>Прототип: {it.proto}{it.note ? " · " + it.note : ""}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {live && <Dialog {...live.p} onClose={() => setLive(null)} phone={window.innerWidth < 600}
        actions={(live.p.actions || []).map(a => ({ ...a, onClick: () => setLive(null) }))} />}
    </>
  );
}
