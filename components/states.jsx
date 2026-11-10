// Mary UI — кнопки и поля со всеми состояниями (handoff 31.10.2026)
// Источник истины — прототип ~/projects/mary-vision (vision-files.jsx, vision-demo.jsx, vision-kb.jsx, vision-crm.jsx, menu.jsx, chat-input.jsx).
// Нужен ../tokens.css. Стили инлайн на CSS-переменных — тёмная тема работает через [data-theme="dark"].
//
// Общие пропсы почти у всех:
//   forceState — "default" | "hover" | "pressed" | "focus" — показать состояние статично (витрина, Storybook, тесты)
//   disabled   — выключено
// Значения: controlled (value/checked + onChange) или uncontrolled (defaultValue/defaultChecked).
// Комментарий «предложено» = в прототипе такого состояния нет, значение придумано по аналогии (см. README).

import React, { useState, useRef } from "react";

// ───────────────────────── утилиты ─────────────────────────
const ink = (a) => `rgba(var(--ink-rgb),${a})`;
const FOCUS_RING = "var(--focus-ring)"; // предложено

function useControllable(value, defaultValue, onChange) {
  const [inner, setInner] = useState(defaultValue);
  const controlled = value !== undefined;
  const v = controlled ? value : inner;
  const set = (next) => { if (!controlled) setInner(next); onChange && onChange(next); };
  return [v, set];
}

// hover / pressed / focus-visible — из мыши и клавиатуры либо принудительно через forceState
function useInteraction(forceState, disabled) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focus, setFocus] = useState(false);
  const live = disabled ? "default" : pressed ? "pressed" : focus ? "focus" : hover ? "hover" : "default";
  const state = forceState || live;
  const handlers = disabled ? {} : {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPressed(false); },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onFocus: (e) => { try { setFocus(e.target.matches(":focus-visible")); } catch { setFocus(true); } },
    onBlur: () => setFocus(false),
  };
  return { state, handlers, hover: forceState ? forceState === "hover" : hover };
}

const reset = { border: "none", background: "none", padding: 0, margin: 0, font: "inherit", color: "inherit", outline: "none", appearance: "none" };

// ───────────────────────── иконки (line 1.5–1.9, viewBox 24) ─────────────────────────
export const ICONS = {
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
  filter: <path d="M4 7h16M7 12h10M10 17h4" />,
  expand: <><path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5" /></>,
  download: <><path d="M12 14.5V4" /><path d="M8.5 11.5L12 15l3.5-3.5" /><path d="M3.5 15.5c0 2.3.4 3.4 1 4s1.7 1 4 1h7c2.3 0 3.4-.4 4-1s1-1.7 1-4" /></>,
  fullscreen: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  play: <path d="M8 5.5v13l10.5-6.5z" />,
  back: <path d="M15 6l-6 6 6 6" />,
  next: <path d="M9 6l6 6-6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  check: <path d="M5 12l5 5L20 7" />,
  history: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  upload: <><path d="M12 4v10.5" /><path d="M8.5 7.5L12 4l3.5 3.5" /><path d="M3.5 15.5c0 2.3.4 3.4 1 4s1.7 1 4 1h7c2.3 0 3.4-.4 4-1s1-1.7 1-4" /></>,
  rename: <><path d="M14.4 5.6l1.7-1.7a2 2 0 0 1 2.8 0l1.2 1.2a2 2 0 0 1 0 2.8l-1.7 1.7" /><path d="M14.4 5.6L4.8 15.2c-.4.4-.6.9-.7 1.4L3.5 20.5l3.9-.6c.5-.1 1-.3 1.4-.7l9.6-9.6" /><path d="M13 7l4 4" /></>,
  chat: <path d="M12 21a9 9 0 1 0-7.605-4.185L3 21l4.185-1.395A8.96 8.96 0 0 0 12 21" />,
  trash: <><path d="M19.5 5.5l-.6 10.4c-.2 2.6-.3 3.9-1.1 4.7s-2.1.9-4.7.9h-2.2c-2.6 0-3.9 0-4.7-.9s-.9-2.1-1.1-4.7L4.5 5.5" /><path d="M3 5.5h18" /><path d="M8.5 5.5l.3-.9c.4-1.2.9-1.6 2-1.6h2.4c1.1 0 1.6.4 2 1.6l.3.9" /><path d="M10 10v6M14 10v6" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></>,
  arrowUp: <><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></>,
};
export function Icon({ name, d, size = 16, stroke = 1.5, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "block", ...style }}>{d || ICONS[name]}</svg>
  );
}
const Dots = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
    <circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" />
  </svg>
);

// тёмная подсказка под иконкой (vision-files.jsx iconBtn)
export function Tooltip({ children, align = "center" }) {
  return (
    <span role="tooltip" style={{
      position: "absolute", top: "calc(100% + 6px)", zIndex: 95,
      ...(align === "left" ? { left: 0 } : align === "right" ? { right: 0 } : { left: "50%", transform: "translateX(-50%)" }),
      background: "var(--tooltip-bg)", color: "#fff", fontSize: 11, fontWeight: 400, lineHeight: "15px",
      padding: "3px 8px", borderRadius: 999, whiteSpace: "nowrap", pointerEvents: "none",
    }}>{children}</span>
  );
}

// ───────────────────────── Button ─────────────────────────
// variant: "primary" (чёрная, var(--btn)) | "secondary" (обводочная) | "link" (серая ссылка-кнопка) | "ghost" (серая с подложкой на ховере — «История чатов»)
// size: "md" 32 | "sm" 30
export function Button({ variant = "primary", size = "md", icon, children, disabled, forceState, onClick, type = "button", style, ...rest }) {
  const { state, handlers } = useInteraction(forceState, disabled);
  const h = size === "sm" ? 30 : 32;
  const base = {
    ...reset, display: "inline-flex", alignItems: "center", gap: 6, height: h, whiteSpace: "nowrap", flexShrink: 0,
    fontSize: 13, fontWeight: 500, lineHeight: 1, cursor: disabled ? "default" : "pointer",
    transition: "background .12s, color .12s, border-color .12s, opacity .12s, box-shadow .12s",
  };
  let s;
  if (variant === "primary") {
    s = { ...base, padding: icon ? "0 14px 0 11px" : size === "sm" ? "0 12px" : "0 14px", borderRadius: 40,
      background: "var(--btn)", color: "var(--on-btn)",
      // hover/pressed — предложено; disabled — как «Заполнить» без текста в CRM (vision-crm.jsx crm-fill)
      opacity: state === "hover" ? 0.88 : state === "pressed" ? 0.78 : 1 };
    if (disabled) s = { ...s, background: ink(0.06), color: "var(--ghost-35)", opacity: 1 };
  } else if (variant === "secondary") {
    s = { ...base, padding: icon ? "0 14px 0 11px" : size === "sm" ? "0 12px" : "0 14px", borderRadius: 40,
      border: `1px solid ${state === "hover" || state === "pressed" ? "var(--line-14)" : "var(--line-10)"}`, // предложено: .14 как у поиска
      background: state === "pressed" ? "var(--pressed)" : state === "hover" ? "var(--surface)" : "var(--bg-panel)", color: "var(--text)" };
    if (disabled) s = { ...s, opacity: "var(--disabled-opacity)" };
  } else if (variant === "link") {
    // «Показать все 12» (vision-files.jsx sec-more): серый, на ховере — основной цвет
    s = { ...base, padding: "0 4px", color: state === "hover" || state === "pressed" ? "var(--text)" : "var(--text-muted)",
      opacity: state === "pressed" ? 0.7 : 1 };
    if (disabled) s = { ...s, color: "var(--text-3)" };
  } else { // ghost — «История чатов» (vision-demo.jsx)
    s = { ...base, gap: 7, padding: "0 10px", borderRadius: 9, fontWeight: 450,
      background: state === "pressed" ? "var(--pressed)" : state === "hover" ? "var(--surface)" : "transparent",
      color: state === "hover" || state === "pressed" ? "var(--text)" : "var(--text-muted)" };
    if (disabled) s = { ...s, color: "var(--text-3)" };
  }
  if (state === "focus") s.boxShadow = FOCUS_RING;
  return (
    <button type={type} disabled={disabled} onClick={onClick} data-state={disabled ? "disabled" : state} style={{ ...s, ...style }} {...handlers} {...rest}>
      {icon && (typeof icon === "string" ? <Icon name={icon} size={variant === "ghost" ? 15 : 14} stroke={1.8} /> : icon)}
      {children}
    </button>
  );
}

// ───────────────────────── IconButton ─────────────────────────
// shape: "square" — 30×30, радиус 10 (шапка «Данных», «+» нового чата) | "round" — 34×34 круг (поиск, фильтр); phone → 44
// active — кнопка «включена» или её меню открыто (подложка остаётся)
export function IconButton({ icon, title, shape = "square", phone, active, disabled, forceState, onClick, tooltip = true, tooltipAlign, iconSize, iconStroke, children, style, ...rest }) {
  const { state, handlers, hover } = useInteraction(forceState, disabled);
  const sq = shape === "square";
  const size = phone ? 44 : sq ? 30 : 34;
  const lit = active || state === "hover" || state === "pressed" || state === "focus";
  const s = {
    ...reset, position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    width: size, height: size, borderRadius: 999, /* все иконки-кнопки круглые (Вика, 01.11) */ cursor: disabled ? "default" : "pointer",
    background: state === "pressed" ? "var(--pressed)" : lit ? "var(--surface)" : "transparent",
    color: lit ? "var(--text)" : "var(--text-muted)",
    opacity: disabled ? 0.35 : 1, // как стрелка «Назад» на первой странице в FileBar
    boxShadow: state === "focus" ? FOCUS_RING : "none",
    transition: "background .12s, color .12s",
  };
  return (
    <button type="button" aria-label={title} aria-pressed={active || undefined} disabled={disabled} onClick={onClick}
      data-state={disabled ? "disabled" : active ? "active" : state} style={{ ...s, ...style }} {...handlers} {...rest}>
      {children || <Icon name={icon} size={iconSize || (sq ? 15 : 17)} stroke={iconStroke || 1.7} />}
      {tooltip && title && hover && !disabled && <Tooltip align={tooltipAlign}>{title}</Tooltip>}
    </button>
  );
}
// «+» — новый чат / добавить файл: тот же квадрат 30, иконка 16 / 1.9
export const PlusButton = (p) => <IconButton icon="plus" iconSize={16} iconStroke={1.9} title="Новый чат" {...p} />;
// «⋯» в строке файла: 30×30, точки 18 (в коде без ховера — подложка предложена)
export const MoreButton = (p) => <IconButton title="Ещё" tooltip={false} {...p}><Dots /></IconButton>;

// ───────────────────────── GlassButton ─────────────────────────
// круглая стеклянная 40×40 поверх файла (vision-files.jsx GlassBtn)
export function GlassButton({ icon, d, title, disabled, forceState, onClick, style, ...rest }) {
  const { state, handlers } = useInteraction(forceState, disabled);
  const s = {
    ...reset, width: 40, height: 40, borderRadius: 999, display: "grid", placeItems: "center", color: "var(--text)",
    background: state === "pressed" ? "var(--pop-bg)" : state === "hover" ? "var(--glass-bg-hover)" : "var(--glass-bg)",
    backdropFilter: "blur(22px) saturate(160%)", WebkitBackdropFilter: "blur(22px) saturate(160%)",
    border: `1px solid ${ink(0.07)}`, cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.35 : 1, boxShadow: state === "focus" ? FOCUS_RING : "none",
    transform: state === "pressed" ? "scale(0.96)" : "none", transition: "background .12s, transform .12s",
  };
  return (
    <button type="button" aria-label={title} title={title} disabled={disabled} onClick={onClick}
      data-state={disabled ? "disabled" : state} style={{ ...s, ...style }} {...handlers} {...rest}>
      <Icon name={icon} d={d} size={17} stroke={1.5} />
    </button>
  );
}

// ───────────────────────── Chip ─────────────────────────
// variant: "filter" — мягкий чип раздела (kb-picker: Недавние/Избранное), выбран = подложка
//          "choice" — выбор этапа в CRM NewRecord, выбран = чёрный
//          "removable" — выбранный фильтр с крестиком («Документы ×» в «Данных»)
export function Chip({ variant = "filter", selected, defaultSelected = false, onChange, onRemove, phone, disabled, forceState, children, style, ...rest }) {
  const [on, setOn] = useControllable(selected, defaultSelected, onChange);
  const { state, handlers } = useInteraction(forceState, disabled);
  let s = { ...reset, display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0, whiteSpace: "nowrap", fontSize: 13, fontWeight: 500, lineHeight: 1,
    cursor: disabled ? "default" : "pointer", transition: "background .12s, color .12s, border-color .12s", boxShadow: state === "focus" ? FOCUS_RING : "none" };
  if (variant === "filter") {
    s = { ...s, height: 30, padding: "0 12px", borderRadius: 999,
      background: on ? "var(--surface)" : state === "pressed" ? "var(--surface)" : state === "hover" ? ink(0.03) : "transparent", // hover .03 — как строка папки в kb-picker
      color: on || state === "hover" ? "var(--text)" : "var(--grey-55)" };
  } else if (variant === "choice") {
    s = { ...s, height: 32, padding: "0 14px", borderRadius: 40,
      background: on ? "var(--btn)" : state === "pressed" ? "var(--pressed)" : state === "hover" ? "var(--surface)" : "transparent",
      color: on ? "var(--on-btn)" : "var(--text)",
      border: on ? "1px solid transparent" : `1px solid ${state === "hover" ? "var(--line-14)" : "var(--line-10)"}` };
  } else {
    s = { ...s, height: phone ? 36 : 33, padding: "0 10px 0 13px", borderRadius: 999, fontSize: phone ? 15 : 13,
      background: state === "hover" ? "var(--surface)" : "var(--bg-panel)", border: `1px solid ${state === "hover" ? "var(--line-14)" : "var(--line-10)"}`, color: "var(--text)" };
  }
  if (disabled) s.opacity = "var(--disabled-opacity)";
  const click = () => { if (variant !== "removable") setOn(!on); };
  return (
    <button type="button" aria-pressed={variant === "removable" ? undefined : !!on} disabled={disabled} onClick={click}
      data-state={disabled ? "disabled" : on && variant !== "removable" ? "selected" : state} style={{ ...s, ...style }} {...handlers} {...rest}>
      {children}
      {variant === "removable" && (
        <span role="button" aria-label="Убрать" onClick={(e) => { e.stopPropagation(); onRemove && onRemove(); }}
          style={{ display: "inline-flex", width: 13, height: 13, alignItems: "center", justifyContent: "center" }}>
          <Icon name="close" size={13} stroke={2.2} />
        </span>
      )}
    </button>
  );
}

// ───────────────────────── Segmented ─────────────────────────
// vision-crm.jsx Seg: items = [[id, label, count?]]
export function Segmented({ items, value, defaultValue, onChange, forceState, disabled, style }) {
  const [v, setV] = useControllable(value, defaultValue ?? (items[0] && items[0][0]), onChange);
  return (
    <div role="tablist" style={{ display: "inline-flex", gap: 4, ...style }}>
      {items.map(([id, label, count]) => (
        <SegItem key={id} on={v === id} label={label} count={count} disabled={disabled}
          forceState={forceState && forceState[id]} onClick={() => setV(id)} />
      ))}
    </div>
  );
}
// forceState у Segmented — объект { [id]: "hover" | "pressed" | "focus" }
export function SegItem({ on, label, count, disabled, forceState, onClick }) {
  const { state, handlers } = useInteraction(forceState, disabled);
  const s = { ...reset, display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 14px", borderRadius: 40, cursor: disabled ? "default" : "pointer",
    fontSize: 13, fontWeight: 500, lineHeight: 1, whiteSpace: "nowrap",
    background: on ? "var(--surface)" : state === "pressed" ? "var(--surface)" : state === "hover" ? ink(0.03) : "transparent",
    color: on || state === "hover" || state === "pressed" ? "var(--text)" : "var(--grey-55)",
    boxShadow: state === "focus" ? FOCUS_RING : "none", opacity: disabled ? 0.4 : 1, transition: "background .12s, color .12s" };
  return (
    <button type="button" role="tab" aria-selected={on} disabled={disabled} onClick={onClick} data-state={disabled ? "disabled" : on ? "selected" : state} style={s} {...handlers}>
      {label}{count != null && <span style={{ color: "var(--ghost-35)", fontVariantNumeric: "tabular-nums" }}>{count}</span>}
    </button>
  );
}

// ───────────────────────── Tab ─────────────────────────
// вкладка файла / чата: 30, радиус 10; крестик виден у активной и при наведении (vision-files.jsx TabStrip)
export function Tab({ label, icon, active, disabled, forceState, closeHover, onClick, onClose, style }) {
  const { state, handlers } = useInteraction(forceState, disabled);
  const showX = !!onClose && (active || state === "hover" || state === "pressed");
  const [xHover, setXHover] = useState(false);
  const s = {
    display: "inline-flex", alignItems: "center", gap: 8, height: 30, boxSizing: "border-box",
    padding: showX ? "0 6px 0 8px" : "0 12px 0 8px", borderRadius: 10, maxWidth: 190, minWidth: 0,
    cursor: disabled ? "default" : "pointer", userSelect: "none",
    background: active ? "var(--user-bubble)" : state === "pressed" ? "var(--surface)" : "transparent",
    boxShadow: state === "focus" ? FOCUS_RING : "none", opacity: disabled ? 0.4 : 1, outline: "none",
  };
  return (
    <div role="tab" tabIndex={disabled ? -1 : 0} aria-selected={!!active} onClick={disabled ? undefined : onClick}
      data-state={disabled ? "disabled" : active ? "active" : state} style={{ ...s, ...style }} {...handlers}>
      {icon}
      <span style={{ minWidth: 0, fontSize: 13, lineHeight: 1.2, fontWeight: active ? 500 : 450,
        color: active ? "var(--text)" : "var(--text-muted)", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{label}</span>
      {showX && (
        <span role="button" aria-label="Закрыть" onClick={(e) => { e.stopPropagation(); onClose(); }}
          onMouseEnter={() => setXHover(true)} onMouseLeave={() => setXHover(false)}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, flexShrink: 0,
            color: xHover || closeHover ? "var(--text)" : "var(--text-muted)", cursor: "pointer" }}>
          <Icon d={<path d="M5 5l14 14M19 5L5 19" />} size={13} stroke={2.2} />
        </span>
      )}
    </div>
  );
}
// разделитель между неактивными вкладками
export const TabDivider = ({ hidden }) => <span style={{ width: 1, height: 16, margin: "0 6px", flexShrink: 0, background: hidden ? "transparent" : ink(0.12) }} />;

// ───────────────────────── SearchField ─────────────────────────
// поле поиска в шапке «Данных» (data-test="panel-search"): 34, радиус 33; phone — 44, радиус 60, кегль 16
// collapsed — свёрнуто в круглую иконку 34
export function SearchField({ value, defaultValue = "", onChange, placeholder = "Искать", phone, collapsed, onExpand, disabled, forceState, width = 240, style }) {
  const [q, setQ] = useControllable(value, defaultValue, onChange);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);
  if (collapsed) return <IconButton icon="search" title="Поиск" shape="round" phone={phone} tooltip={false} onClick={onExpand} forceState={forceState === "hover" ? "hover" : undefined} />;
  const st = forceState || (disabled ? "default" : focus ? "focus" : q ? "filled" : hover ? "hover" : "default");
  const bright = st === "focus" || st === "filled" || !!q;
  const s = {
    flex: phone ? 1 : `0 1 ${width}px`, width: phone ? "100%" : width, minWidth: 0, display: "flex", alignItems: "center", gap: 4,
    height: phone ? 44 : 34, padding: "0 14px", borderRadius: phone ? 60 : 33, cursor: disabled ? "default" : "text", boxSizing: "border-box",
    border: `1px solid ${st === "hover" || st === "focus" ? "var(--line-14)" : "var(--line-10)"}`,
    background: disabled ? "var(--surface)" : "var(--bg-panel)", opacity: disabled ? 0.6 : 1,
    transition: "border-color .15s ease",
  };
  return (
    <div data-state={disabled ? "disabled" : st} style={{ ...s, ...style }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => ref.current && ref.current.focus()}>
      <Icon name="search" size={18} stroke={1.7} style={{ color: ink(bright ? 0.8 : 0.5) }} />
      <input ref={ref} value={q} disabled={disabled} placeholder={placeholder}
        onChange={(e) => setQ(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        onKeyDown={(e) => { if (e.key === "Escape") { setQ(""); e.currentTarget.blur(); } }}
        style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontFamily: "inherit",
          fontSize: phone ? 16 : 14, fontWeight: 500, color: "var(--text)", padding: 0 }} />
      {q && !disabled && (
        <span role="button" aria-label="Очистить" onMouseDown={(e) => e.preventDefault()} onClick={() => setQ("")}
          style={{ width: 20, height: 20, flexShrink: 0, display: "grid", placeItems: "center", cursor: "pointer", color: ink(0.5) }}>
          <Icon name="close" size={12} stroke={2.2} />
        </span>
      )}
    </div>
  );
}

// ───────────────────────── TextField ─────────────────────────
// поле формы CRM NewRecord: 40, радиус 12, рамка .10; select — то же + шеврон
// size="inline" — поле переименования в строке файла: 22, радиус 6, рамка .20
// state: error — рамка danger + подсказка снизу (подсказка — как «Пароли не совпадают» на входе)
export function TextField({ label, value, defaultValue = "", onChange, placeholder, select, options = [], size = "md", phone, error, hint, disabled, forceState, inputRef, style, ...rest }) {
  const [v, setV] = useControllable(value, defaultValue, onChange);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const st = forceState || (focus ? "focus" : hover ? "hover" : "default");
  const inline = size === "inline";
  const border = error ? "var(--danger)"
    : inline ? "var(--line-20)"
    : st === "focus" ? "var(--line-20)"   // предложено: как у поля переименования
    : st === "hover" ? "var(--line-14)"   // предложено: как у поиска
    : "var(--line-10)";
  const field = inline ? {
    height: 22, padding: "0 6px", margin: "0 0 0 -6px", borderRadius: 6, fontSize: phone ? 15 : 13,
  } : { height: 40, padding: select ? "0 34px 0 12px" : "0 12px", borderRadius: 12, fontSize: phone ? 16 : 14 };
  const s = {
    ...field, width: "100%", boxSizing: "border-box", fontFamily: "inherit", fontWeight: 500,
    color: disabled ? "var(--text-3)" : select && !v ? "var(--ghost-35)" : "var(--text)",
    background: disabled ? "var(--surface)" : "var(--bg-panel)", border: `1px solid ${border}`, outline: "none",
    boxShadow: st === "focus" && error ? `0 0 0 3px rgba(var(--danger-rgb),0.12)` : "none",
    transition: "border-color .12s", appearance: "none",
    ...(select ? { cursor: disabled ? "default" : "pointer",
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
      backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" } : {}),
  };
  const common = { value: v, disabled, onChange: (e) => setV(e.target.value), onFocus: () => setFocus(true), onBlur: () => setFocus(false),
    onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), "aria-invalid": !!error, ref: inputRef, style: s, ...rest };
  const control = select
    ? <select {...common}><option value="">Не выбрано</option>{options.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}</select>
    : <input placeholder={placeholder} {...common} />;
  if (inline) return <span data-state={error ? "error" : disabled ? "disabled" : st} style={{ display: "block", ...style }}>{control}</span>;
  return (
    <label data-state={error ? "error" : disabled ? "disabled" : st} style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0, ...style }}>
      {label && <span style={{ fontSize: 12, fontWeight: 500, color: "var(--grey-55)" }}>{label}</span>}
      {control}
      {(error || hint) && <span style={{ fontSize: 12, color: error ? "var(--danger)" : "var(--text-3)", marginTop: 0 }}>{typeof error === "string" ? error : hint}</span>}
    </label>
  );
}

// ───────────────────────── Toggle ─────────────────────────
// size "md" 36×20 (правила CRM, включён = var(--btn)) | "sm" 30×18 (тёмная тема в меню, включён = var(--accent))
export function Toggle({ checked, defaultChecked = false, onChange, size = "md", tone, disabled, forceState, label, style }) {
  const [on, setOn] = useControllable(checked, defaultChecked, onChange);
  const { state, handlers } = useInteraction(forceState, disabled);
  const sm = size === "sm";
  const w = sm ? 30 : 36, h = sm ? 18 : 20, k = sm ? 14 : 16;
  const onBg = (tone || (sm ? "accent" : "ink")) === "accent" ? "var(--accent)" : "var(--btn)";
  const track = {
    position: "relative", width: w, height: h, borderRadius: 999, flexShrink: 0, display: "inline-block",
    background: on ? onBg : ink(state === "hover" || state === "pressed" ? (sm ? 0.24 : 0.22) : sm ? 0.18 : 0.15), // hover — предложено
    opacity: disabled ? 0.4 : on && state === "hover" ? 0.88 : 1,
    boxShadow: state === "focus" ? FOCUS_RING : "none", transition: "background .15s",
  };
  const knob = { position: "absolute", top: 2, left: on ? w - k - 2 : 2, width: state === "pressed" ? k + 3 : k, height: k, borderRadius: 999, background: "#fff",
    transition: "left .15s, width .15s", ...(on && state === "pressed" ? { left: w - k - 5 } : {}) };
  return (
    <button type="button" role="switch" aria-checked={!!on} disabled={disabled} onClick={() => setOn(!on)}
      data-state={disabled ? "disabled" : state} style={{ ...reset, display: "inline-flex", alignItems: "center", gap: 8, cursor: disabled ? "default" : "pointer", ...style }} {...handlers}>
      <span style={track}><span style={knob} /></span>
      {label && <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{label}</span>}
    </button>
  );
}

// ───────────────────────── Checkbox ─────────────────────────
// size: "sm" 16 / радиус 5 (таблица CRM, crm-check) | "md" 18 / 6 (поля CRM) | "lg" 20 / 7 (выбор файлов kbp-check)
// tone: "ink" — галочка на var(--btn) | "accent" — на синем (kbp-check)
// light — на фото (белая рамка, затемнение) | disabled+checked — «замок» (обязательное поле, нельзя снять)
export function Checkbox({ checked, defaultChecked = false, onChange, size = "sm", tone, light, disabled, forceState, label, style }) {
  const [on, setOn] = useControllable(checked, defaultChecked, onChange);
  const { state, handlers } = useInteraction(forceState, disabled);
  const px = size === "lg" ? 20 : size === "md" ? 18 : 16;
  const r = size === "lg" ? 7 : size === "md" ? 6 : 5;
  const t = tone || (size === "lg" ? "accent" : "ink");
  const offBorder = light ? "#fff" : ink(state === "hover" ? 0.35 : size === "lg" ? 0.25 : size === "md" ? 0.2 : 0.18); // hover .35 — предложено
  const box = {
    width: px, height: px, borderRadius: r, flexShrink: 0, display: "grid", placeItems: "center", boxSizing: "border-box",
    color: t === "accent" ? "#fff" : "var(--on-btn)",
    background: on ? (disabled ? ink(0.3) : t === "accent" ? "var(--accent)" : "var(--btn)") : light ? "rgba(0,0,0,0.18)" : disabled ? "var(--surface)" : "var(--bg-panel)",
    border: on ? "none" : `1.5px solid ${disabled ? ink(0.12) : offBorder}`,
    boxShadow: state === "focus" ? FOCUS_RING : "none", transform: state === "pressed" ? "scale(0.92)" : "none", transition: "transform .1s, background .12s",
  };
  return (
    <button type="button" role="checkbox" aria-checked={!!on} disabled={disabled} onClick={() => setOn(!on)}
      data-state={disabled ? (on ? "locked" : "disabled") : on ? "checked" : state}
      style={{ ...reset, display: "inline-flex", alignItems: "center", gap: 8, cursor: disabled ? "default" : "pointer", ...style }} {...handlers}>
      <span style={box}>{on && <Icon d={<path d="M5 12.5l4.5 4.5L19 7.5" />} size={12} stroke={2.6} />}</span>
      {label && <span style={{ fontSize: 13, fontWeight: 500, color: disabled ? "var(--text-3)" : "var(--grey-55)" }}>{label}</span>}
    </button>
  );
}

// ───────────────────────── Menu + MenuRow ─────────────────────────
// плашка меню (menu.jsx POP): стекло, радиус 20, отступ 6
export function Menu({ children, minWidth = 200, style }) {
  return (
    <div role="menu" style={{ display: "flex", flexDirection: "column", minWidth, padding: 6, borderRadius: 20, boxSizing: "border-box",
      background: "var(--pop-bg)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
      border: `1px solid ${ink(0.1)}`, boxShadow: "var(--pop-shadow)", ...style }}>{children}</div>
  );
}
export const MenuSeparator = () => <span style={{ display: "block", height: 1, background: ink(0.08), margin: "4px 6px" }} />;
export const MenuCaption = ({ children }) => <span style={{ display: "block", padding: "4px 10px 6px", fontSize: 12, color: "var(--text-3)" }}>{children}</span>;
// строка меню (menu.jsx PopRow): 31 (телефон 38), радиус 999, иконка 16 / 1.5 с прозрачностью .75
// on — выбранный пункт (подложка + галочка справа), danger — красный «Удалить»
export function MenuRow({ icon, glyph, children, right, on, checkmark, danger, phone, disabled, forceState, onClick, style }) {
  const { state, handlers } = useInteraction(forceState, disabled);
  const lit = on || state === "hover" || state === "focus";
  const s = {
    display: "flex", alignItems: "center", gap: 10, height: phone ? 38 : 31, padding: "0 10px", borderRadius: 999,
    fontSize: phone ? 15 : 13, cursor: disabled ? "default" : "pointer", whiteSpace: "nowrap", outline: "none",
    color: disabled ? "var(--text-3)" : danger ? "var(--danger)" : "var(--text)",
    background: state === "pressed" ? "var(--pressed)" : lit && !disabled ? "var(--surface)" : "transparent",
    transition: "background .1s",
  };
  return (
    <div role="menuitem" tabIndex={disabled ? -1 : 0} aria-disabled={disabled || undefined} aria-checked={on || undefined} onClick={disabled ? undefined : onClick}
      data-state={disabled ? "disabled" : on ? "on" : state} style={{ ...s, ...style }} {...handlers}>
      {(icon || glyph) && (
        <span style={{ display: "flex", flexShrink: 0, opacity: danger ? 1 : 0.75 }}>
          {typeof icon === "string" ? <Icon name={icon} size={16} stroke={1.5} /> : icon || <Icon d={glyph} size={16} stroke={1.5} />}
        </span>
      )}
      <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>{children}</span>
      {right}
      {on && checkmark !== false && <Icon name="check" size={14} stroke={2.2} />}
    </div>
  );
}

// ───────────────────────── ChatInput ─────────────────────────
// поле ввода чата (chat-input.jsx MaryInputBox): радиус 22, рамка .09, отступ 12
// voice: "idle" | "recording" | "decoding"; loading — Mary отвечает, вместо отправки «стоп»
export function FileTile({ name = "file.pdf", size = 36, bare }) {
  const ext = (String(name).split(".").pop() || "DOC").toUpperCase().slice(0, 4);
  const color = { PDF: "var(--danger)", XLSX: "#2FA35B", CSV: "#2FA35B", PPTX: "#F2B03D", DOCX: "var(--accent)", MD: "var(--accent)" }[ext] || "var(--accent)";
  const small = size < 32;
  const w = size * (small ? 0.58 : 0.5), h = size * (small ? 0.72 : 0.62), fold = w * 0.34, rr = h * 0.2, fr = fold * 0.3;
  return (
    <span style={{ width: size, height: size, borderRadius: size * 0.24, flexShrink: 0, display: "grid", placeItems: "center",
      background: bare ? "transparent" : small ? ink(0.06) : "var(--surface)" }}>
      <span style={{ position: "relative", width: w, height: h, display: "block" }}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", overflow: "visible" }}>
          <path d={`M${rr} 0H${w - fold}L${w} ${fold}V${h - rr}a${rr} ${rr} 0 0 1 -${rr} ${rr}H${rr}a${rr} ${rr} 0 0 1 -${rr}-${rr}V${rr}a${rr} ${rr} 0 0 1 ${rr}-${rr}z`} fill="#fff" stroke={bare ? ink(0.2) : "none"} />
          <path d={`M${w - fold} 0L${w} ${fold}h-${fold - fr}a${fr} ${fr} 0 0 1 -${fr}-${fr}z`} fill={small ? ink(0.14) : ink(0.09)} />
        </svg>
        <span style={{ position: "absolute", left: small ? w * 0.1 : w * 0.16, bottom: h * 0.15, whiteSpace: "nowrap", lineHeight: 1,
          fontSize: ext.length > 3 ? Math.max(6, Math.round(size * 0.15)) : Math.max(7, Math.round(size * 0.18)), fontWeight: 700, color }}>{ext}</span>
      </span>
    </span>
  );
}
// карточка прикреплённого файла (vision-files.jsx AttachChip)
export function AttachCard({ name, onRemove }) {
  const ext = (String(name).split(".").pop() || "").toUpperCase();
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 12, padding: "8px 36px 8px 8px", flexShrink: 0, maxWidth: 300,
      boxSizing: "border-box", borderRadius: 16, border: `1px solid ${ink(0.1)}`, background: "var(--bg-panel)" }}>
      <FileTile name={name} size={40} />
      <span style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
        <span style={{ fontSize: 12, color: "var(--text-3)" }}>{ext}</span>
      </span>
      {onRemove !== null && (
        <span role="button" aria-label="Убрать" onClick={onRemove} style={{ position: "absolute", top: 8, right: 8, width: 18, height: 18, borderRadius: "50%", cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--btn)", color: "var(--on-btn)" }}>
          <Icon name="close" size={8} stroke={3.2} />
        </span>
      )}
    </div>
  );
}
const CircleBtn = ({ title, onClick, bg, children, size = 30, style }) => (
  <button type="button" title={title} aria-label={title} onClick={onClick} style={{ ...reset, display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: size, height: size, borderRadius: "50%", flexShrink: 0, background: bg || "var(--surface)", color: "var(--text)", cursor: "pointer", ...style }}>{children}</button>
);
export function ChatInput({ value, defaultValue = "", onChange, onSend, onStop, placeholder = "Спросите Mary или дайте задачу", attachments = [], onRemoveAttachment, onAttach,
  voice: voiceProp, onVoiceChange, loading, disabled, forceState, style }) {
  const [text, setText] = useControllable(value, defaultValue, onChange);
  const [voice, setVoice] = useControllable(voiceProp, "idle", onVoiceChange);
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const canSend = (text.trim() || attachments.length) && !loading && !disabled;
  const st = forceState || (focus ? "focus" : hover ? "hover" : "default");
  const box = {
    background: "var(--bg-panel)", borderRadius: 22, padding: 12, position: "relative",
    border: `1px solid ${st === "focus" ? ink(0.16) : st === "hover" ? ink(0.12) : ink(0.09)}`, // focus/hover — предложено
    display: "flex", flexDirection: "column", gap: 12, opacity: disabled ? 0.6 : 1, transition: "border-color .15s", boxSizing: "border-box",
  };
  const send = () => { if (canSend) { onSend && onSend(text, attachments); } };
  return (
    <div data-state={disabled ? "disabled" : loading ? "loading" : voice !== "idle" ? voice : attachments.length ? "file" : text ? "text" : "empty"}
      style={{ ...box, ...style }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {attachments.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 4, overflowX: "auto", scrollbarWidth: "none" }}>
          {attachments.map((f, i) => <AttachCard key={f.id || i} name={f.name} onRemove={() => onRemoveAttachment && onRemoveAttachment(f, i)} />)}
        </div>
      )}
      <textarea rows={1} value={text} disabled={disabled || loading} placeholder={placeholder}
        onChange={(e) => setText(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
        style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 15, fontWeight: 450, color: "var(--text)", lineHeight: 1.45,
          background: "transparent", fontFamily: "inherit", padding: 0, minHeight: 22, maxHeight: 208, overflowY: "auto" }} />
      {voice !== "idle" ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <CircleBtn title="Отменить" onClick={() => setVoice("idle")}><Icon name="close" size={13} stroke={1.8} /></CircleBtn>
          {voice === "recording" ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 3.5, height: 22, overflow: "hidden" }}>
              {Array.from({ length: 60 }).map((_, i) => {
                const live = i > 44;
                return <span key={i} style={{ width: 2.4, height: live ? 4 : 2, borderRadius: 1.2, flexShrink: 0, background: live ? ink(0.42) : ink(0.22),
                  animation: live ? `maryWave 0.9s ease-in-out ${(i % 7) * 0.09}s infinite` : "none" }} />;
              })}
            </div>
          ) : (
            <div style={{ flex: 1, textAlign: "center", fontSize: 14, color: ink(0.62) }}>Расшифровка</div>
          )}
          {voice === "recording"
            ? <CircleBtn title="Остановить" onClick={() => setVoice("decoding")}><svg width={10} height={10} viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="2" width="12" height="12" rx="2.5" /></svg></CircleBtn>
            : <CircleBtn title="Расшифровка"><Icon d={<path d="M12 4a8 8 0 1 0 8 8" />} size={14} stroke={1.8} style={{ animation: "marySpin 0.9s linear infinite" }} /></CircleBtn>}
          <CircleBtn title="Отправить" bg={ink(0.35)} style={{ color: "#fff", cursor: "default" }}><Icon name="arrowUp" size={15} stroke={2.2} /></CircleBtn>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <CircleBtn title="Прикрепить файл" size={28} onClick={onAttach} bg="transparent" style={{ border: `1px solid ${ink(0.16)}`, color: ink(0.7) }}><Icon name="plus" size={14} stroke={1.9} /></CircleBtn>
          <div style={{ flex: 1 }} />
          <button type="button" title="Записать голосом" aria-label="Записать голосом" onClick={() => setVoice("recording")}
            style={{ ...reset, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 7, color: ink(0.5), cursor: "pointer" }}>
            <Icon name="mic" size={16} stroke={1.7} />
          </button>
          {loading ? (
            <CircleBtn title="Остановить" size={34} onClick={onStop} bg="var(--btn)" style={{ color: "#fff" }}>
              <svg width={11} height={11} viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="2" width="12" height="12" rx="1.5" /></svg>
            </CircleBtn>
          ) : (
            <CircleBtn title="Отправить" onClick={send} bg={canSend ? "var(--btn)" : ink(0.35)} style={{ color: "#fff", cursor: canSend ? "pointer" : "not-allowed" }}>
              <Icon name="arrowUp" size={16} stroke={2.2} />
            </CircleBtn>
          )}
        </div>
      )}
    </div>
  );
}

// ───────────────────────── FileRow ─────────────────────────
// строка файла в «Данных»: плитка 36, имя 13/500, мета 12 ghost, «⋯» 30×30
// state: menuOpen — открыто меню «⋯» (рисуется под строкой справа); renaming — имя заменено полем
export function FileRow({ name, meta, isNew, phone, menuOpen: menuOpenProp, defaultMenuOpen = false, onMenuOpenChange, renaming, onRename, onRenameCancel,
  onOpen, onAction, forceState, style }) {
  const [menuOpen, setMenuOpen] = useControllable(menuOpenProp, defaultMenuOpen, onMenuOpenChange);
  const [hover, setHover] = useState(false);
  const base = name.replace(/\.[^.]+$/, "");
  const [draft, setDraft] = useState(base);
  const st = forceState || (hover ? "hover" : "default");
  const lit = st === "hover" || menuOpen || renaming;
  return (
    <div style={{ position: "relative", ...style }} data-state={renaming ? "renaming" : menuOpen ? "menu-open" : st}>
      <div onClick={() => { if (!renaming && onOpen) onOpen(); }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ display: "flex", alignItems: "center", gap: 12, padding: phone ? "10px 4px" : "6px 4px", borderRadius: 12, cursor: "pointer",
          background: lit ? "var(--surface)" : "transparent", transition: "background .12s" /* подложка — предложено */ }}>
        <FileTile name={name} size={36} />
        <span style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          {renaming ? (
            <TextField size="inline" phone={phone} value={draft} onChange={setDraft} autoFocus
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => { if (e.key === "Enter") onRename && onRename(draft + (name.match(/\.[^.]+$/) || [""])[0]); if (e.key === "Escape") onRenameCancel && onRenameCancel(); }} />
          ) : (
            <span style={{ fontSize: phone ? 15 : 13, fontWeight: 500, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: "22px" }}>{name}</span>
          )}
          <span style={{ fontSize: 12, color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{meta}</span>
        </span>
        {isNew && <span style={{ flexShrink: 0, height: 20, padding: "0 8px", borderRadius: 999, display: "inline-flex", alignItems: "center", background: ink(0.06), color: "var(--text-muted)", fontSize: 12, fontWeight: 500 }}>новый</span>}
        <MoreButton active={menuOpen} onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }} />
      </div>
      {menuOpen && (
        <Menu minWidth={200} style={{ position: "absolute", top: "calc(100% - 6px)", right: 0, zIndex: 91 }}>
          {[["download", "Скачать", "download"], ["rename", "Переименовать", "rename"], ["edit", "Изменить в чате", "chat"], ["delete", "Удалить", "trash"]].map(([id, label, ic]) => (
            <MenuRow key={id} icon={ic} danger={id === "delete"} phone={phone} onClick={() => { setMenuOpen(false); onAction && onAction(id); }}>{label}</MenuRow>
          ))}
        </Menu>
      )}
    </div>
  );
}

// для витрины без сборки
if (typeof window !== "undefined") {
  window.MaryUI = { Icon, ICONS, Tooltip, Button, IconButton, PlusButton, MoreButton, GlassButton, Chip, Segmented, SegItem, Tab, TabDivider,
    SearchField, TextField, Toggle, Checkbox, Menu, MenuRow, MenuSeparator, MenuCaption, ChatInput, AttachCard, FileTile, FileRow };
}

// ───────────────────────── Dialog · попап ─────────────────────────
// Единый попап Mary (Вика, 10.11). Правила — в витрине, раздел «Попапы».
// Размер: size "sm" 400 — сообщение и подтверждение | "md" 465 — попап с содержимым (коннектор, карточка)
// layout: "start" — иконка 40 + заголовок 16 в строку (по умолчанию) | "center" — системное сообщение: иконка 56, заголовок 20, всё по центру
// actions: [{ label, icon, onClick, kind: "primary" | "secondary" | "danger" }]. Одна кнопка — на всю ширину; две — справа, главная последней
// closable: false — когда без действия дальше нельзя (новая версия): нет крестика, клик мимо и Esc не закрывают
// phone: шторка снизу, кнопки 44, текст 16
// inline: рисовать без затемнения на месте (витрина, Storybook)
export function Dialog({ open = true, onClose, size = "sm", layout = "start", icon, title, text, children, actions = [], closable = true, phone, inline, style, ...rest }) {
  React.useEffect(() => {
    if (!open || inline || !closable) return;
    const k = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open, inline, closable, onClose]);
  if (!open) return null;
  const center = layout === "center";
  const one = actions.length === 1;
  const btn = (a, i) => {
    const kind = a.kind || (i === actions.length - 1 ? "primary" : "secondary");
    // как в экранах Figma (База знаний, Подключения): главная чёрная, вторая белая с рамкой, опасная — сплошная красная
    const bg = kind === "danger" ? "var(--danger)" : kind === "primary" ? "var(--btn)" : "var(--bg-popover)";
    const fg = kind === "danger" ? "#fff" : kind === "primary" ? "var(--on-btn)" : "var(--text)";
    return (
      <button key={i} type="button" onClick={a.onClick} data-kind={kind} style={{
        ...reset, height: phone ? 44 : 36, padding: "0 16px", borderRadius: 999, cursor: "pointer",
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        flex: one || phone || center ? 1 : "none", background: bg, color: fg, boxSizing: "border-box",
        border: kind === "secondary" ? "1px solid var(--line-10)" : "none",
        fontSize: phone ? 16 : 13, fontWeight: 500, whiteSpace: "nowrap",
      }}>
        {a.icon && (typeof a.icon === "string" ? <Icon name={a.icon} size={16} stroke={1.8} /> : a.icon)}
        {a.label}
      </button>
    );
  };
  const card = (
    <div role="dialog" aria-modal={inline ? undefined : "true"} onClick={(e) => e.stopPropagation()} style={{
      position: "relative", width: phone ? "100%" : size === "md" ? 465 : 400, maxWidth: "100%", maxHeight: phone ? "86vh" : "86vh",
      boxSizing: "border-box", display: "flex", flexDirection: "column", overflow: "hidden",
      background: "var(--bg-popover)", border: `1px solid ${ink(0.05)}`, borderRadius: phone ? "24px 24px 0 0" : 24,
      boxShadow: "0 18px 48px rgba(var(--shadow-rgb),0.18)", ...style,
    }} {...rest}>
      {/* шапка — не уезжает при прокрутке */}
      <div style={{ display: "flex", flexDirection: center ? "column" : "row", alignItems: "center", gap: 12, textAlign: center ? "center" : "left",
        padding: phone ? "24px 16px 0" : center ? "24px 20px 0" : "20px 20px 0", flexShrink: 0 }}>
        {icon && <span style={{ display: "flex", flexShrink: 0 }}>{icon}</span>}
        <span style={{ flex: center ? "none" : 1, minWidth: 0, fontSize: center ? 20 : 16, lineHeight: 1.3, fontWeight: 500, color: "var(--text)", paddingRight: closable && !center ? 0 : 0 }}>{title}</span>
        {closable && (
          <span onClick={onClose} title="Закрыть" style={{ position: center ? "absolute" : "static", top: 16, right: 16, width: 28, height: 28, borderRadius: 10,
            display: "grid", placeItems: "center", color: "var(--text-2)", cursor: "pointer", flexShrink: 0 }}>
            <Icon name="close" size={16} stroke={1.7} />
          </span>
        )}
      </div>
      {/* тело — прокручивается, если не влезает */}
      {(text || children) && (
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: phone ? "0 16px" : "0 20px" }}>
          {text && <p style={{ margin: center ? "8px auto 0" : "16px 0 0", maxWidth: center ? 300 : "none", textAlign: center ? "center" : "left",
            fontSize: phone ? 16 : 14, lineHeight: 1.55, color: "var(--text-2)" }}>{text}</p>}
          {children && <div style={{ marginTop: 16 }}>{children}</div>}
        </div>
      )}
      {/* низ — кнопки, тоже не уезжают */}
      {actions.length > 0 && (
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexShrink: 0,
          padding: phone ? "24px 16px calc(16px + env(safe-area-inset-bottom))" : center ? "24px 20px 20px" : "20px" }}>
          {actions.map(btn)}
        </div>
      )}
    </div>
  );
  if (inline) return card;
  return (
    <div onClick={closable ? onClose : undefined} style={{
      position: "fixed", inset: 0, zIndex: 200, display: "grid", placeItems: phone ? "end stretch" : "center",
      padding: phone ? 0 : 24, background: "rgba(20,22,30,0.22)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)",
    }}>{card}</div>
  );
}
