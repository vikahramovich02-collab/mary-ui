// Mary UI · рендер компонентов, выгруженных из Figma.
// Данные (data/*.json) — дерево узла: auto-layout, размеры, заливки, обводки, радиусы, тени, тексты, SVG-иконки.
// figmaComponent(def) превращает набор Figma в React-компонент с пропами по свойствам Figma.
//
// Формат узла: t — тип Figma; w,h — размер; x,y,abs — абсолютная позиция; sz — [layoutSizingH, layoutSizingV];
// l — [layoutMode, gap, pt, pr, pb, pl, primaryAlign, counterAlign, wrap, rowGap]; f — заливки (CSS-цвет | {img}); s — обводка {c,w,a,d};
// r — радиус; e — эффекты; o — прозрачность; clip; tx — текст [[символы, кегль, вес, цвет, интерлиньяж, трекинг, курсив, подчёркивание]];
// al — [выравнивание H, V]; ar — textAutoResize; svg — ключ в data/svg.json; ref/vref — ключи текстовых и булевых свойств Figma.

import React, { useState } from "react";
import SVG from "../../data/svg.json";
import IMG from "../../data/images.json";

export const ASSETS = (typeof window !== "undefined" && window.MARY_UI_ASSETS) || "./assets/";
const JUST = { MIN: "flex-start", CENTER: "center", MAX: "flex-end", SPACE_BETWEEN: "space-between" };
const ALIGN = { MIN: "flex-start", CENTER: "center", MAX: "flex-end", BASELINE: "baseline" };

function bg(fills) {
  if (!fills || !fills.length) return null;
  const layers = [...fills].reverse().map(p => {
    if (typeof p === "string") return p.includes("gradient(") ? p : `linear-gradient(${p}, ${p})`;
    const ext = IMG[p.img] || "png";
    return `url(${ASSETS}${p.img}.${ext}) center / ${p.mode === "FIT" ? "contain" : p.mode === "TILE" ? "auto" : "cover"} ${p.mode === "TILE" ? "repeat" : "no-repeat"}`;
  });
  if (fills.length === 1 && typeof fills[0] === "string" && !fills[0].includes("gradient(")) return { backgroundColor: fills[0] };
  return { background: layers.join(", ") };
}
function strokeCss(s, shadows) {
  if (!s) return {};
  const w = s.w, c = s.c;
  if (s.d) { const ww = Array.isArray(w) ? Math.max(...w) : w; return { outline: `${ww}px dashed ${c}`, outlineOffset: s.a === "OUTSIDE" ? 0 : s.a === "CENTER" ? -ww / 2 : -ww }; }
  if (Array.isArray(w)) {
    const [t, r, b, l] = w;
    if (t) shadows.push(`inset 0 ${t}px 0 0 ${c}`); if (b) shadows.push(`inset 0 -${b}px 0 0 ${c}`);
    if (l) shadows.push(`inset ${l}px 0 0 0 ${c}`); if (r) shadows.push(`inset -${r}px 0 0 0 ${c}`);
    return {};
  }
  if (!w) return {};
  if (s.a === "INSIDE") { shadows.push(`inset 0 0 0 ${w}px ${c}`); return {}; }
  if (s.a === "OUTSIDE") { shadows.push(`0 0 0 ${w}px ${c}`); return {}; }
  shadows.push(`inset 0 0 0 ${w / 2}px ${c}`, `0 0 0 ${w / 2}px ${c}`); return {};
}
function sizeCss(n, parentL, isRoot) {
  const st = {};
  if (isRoot) {
    const hug = n.lm && n.l ? (n.l[0] === "HORIZONTAL" ? [n.lm[0] === "AUTO", n.lm[1] === "AUTO"] : [n.lm[1] === "AUTO", n.lm[0] === "AUTO"]) : [false, false];
    if (!hug[0]) st.width = n.w; if (!hug[1]) st.height = n.h;
    if (hug[0] && n.t !== "TEXT") st.width = "max-content";
    return st;
  }
  if (n.abs || !parentL) { st.position = "absolute"; st.left = n.x; st.top = n.y; st.width = n.w; st.height = n.h; if (n.t === "TEXT" && n.ar === "WIDTH_AND_HEIGHT") { delete st.width; delete st.height; } return st; }
  if (parentL[0] === "GRID") { st.flexShrink = 0; st.width = n.w; if ((n.sz || [])[1] !== "HUG") st.height = n.h; return st; }
  const horiz = parentL[0] === "HORIZONTAL";
  const [sh, sv] = n.sz || ["FIXED", "FIXED"];
  const main = horiz ? sh : sv, cross = horiz ? sv : sh;
  st.flexShrink = 0;
  if (main === "FILL") { st.flex = "1 1 0"; st[horiz ? "minWidth" : "minHeight"] = 0; }
  else if (main === "FIXED") st[horiz ? "width" : "height"] = horiz ? n.w : n.h;
  if (cross === "FILL") { st.alignSelf = "stretch"; st[horiz ? "minHeight" : "minWidth"] = 0; }
  else if (cross === "FIXED") st[horiz ? "height" : "width"] = horiz ? n.h : n.w;
  if (n.t === "TEXT" && n.ar === "HEIGHT" && main !== "FILL" && cross !== "FILL") st.width = n.w;
  return st;
}
function txtSeg(t) {
  const [, fs, fw, col, lh, ls, it, dec] = t;
  const st = { fontSize: fs, fontWeight: fw };
  if (col) st.color = col;
  if (lh != null) st.lineHeight = typeof lh === "number" ? lh + "px" : lh;
  if (ls) st.letterSpacing = ls;
  if (it) st.fontStyle = "italic";
  if (dec) st.textDecoration = dec === 1 ? "underline" : "line-through";
  return st;
}

export function FigmaNode({ n, ctx, parentL, root, style }) {
  if (n.vref && ctx.bool && ctx.bool[n.vref] === false) return null;
  const st = { boxSizing: "border-box", ...sizeCss(n, parentL, root) };
  if (root) st.position = "relative";
  if (n.o != null) st.opacity = n.o;
  if (n.rot) st.transform = `rotate(${-n.rot}deg)`;
  if (n.svg) {
    return <span data-figma={n.n} style={{ ...st, display: "block", lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: SVG[n.svg] || "" }} />;
  }
  if (n.t === "TEXT") {
    const tx = n.tx || [];
    const override = n.ref && ctx.text && ctx.text[n.ref] != null ? ctx.text[n.ref] : null;
    Object.assign(st, txtSeg(tx[0] || ["", 12, 400]));
    st.fontFamily = n.ff && !/SF Pro/.test(n.ff) ? `'${n.ff}', var(--font)` : "var(--font)";
    st.textAlign = { LEFT: "left", CENTER: "center", RIGHT: "right", JUSTIFIED: "justify" }[n.al?.[0]] || "left";
    st.whiteSpace = n.ar === "WIDTH_AND_HEIGHT" ? "pre" : "pre-wrap";
    st.overflowWrap = "break-word";
    if (n.ar === "NONE" || n.ar === "TRUNCATE") { st.display = "flex"; st.flexDirection = "column"; st.justifyContent = { TOP: "flex-start", CENTER: "center", BOTTOM: "flex-end" }[n.al?.[1]] || "flex-start"; }
    if (n.tr) { st.overflow = "hidden"; if (n.tr === 1) { st.whiteSpace = "nowrap"; st.textOverflow = "ellipsis"; st.display = "block"; } else { st.display = "-webkit-box"; st.WebkitLineClamp = n.tr; st.WebkitBoxOrient = "vertical"; } }
    const body = override != null ? override : tx.length === 1 ? tx[0][0] : tx.map((t, i) => <span key={i} style={txtSeg(t)}>{t[0]}</span>);
    return <div data-figma={n.n} style={{ ...st, ...style }}>{n.ar === "NONE" && !n.tr ? <span>{body}</span> : body}</div>;
  }
  const shadows = [];
  Object.assign(st, bg(n.f), strokeCss(n.s, shadows));
  if (n.r != null) st.borderRadius = Array.isArray(n.r) ? n.r.map(x => x + "px").join(" ") : n.r;
  for (const e of n.e || []) {
    if (e[0] === "d") shadows.push(`${e[1]}px ${e[2]}px ${e[3]}px ${e[4]}px ${e[5]}`);
    else if (e[0] === "i") shadows.push(`inset ${e[1]}px ${e[2]}px ${e[3]}px ${e[4]}px ${e[5]}`);
    else if (e[0] === "bb") { st.backdropFilter = `blur(${e[1] / 2}px)`; st.WebkitBackdropFilter = st.backdropFilter; }
    else if (e[0] === "lb") st.filter = `blur(${e[1] / 2}px)`;
  }
  if (shadows.length) st.boxShadow = shadows.join(", ");
  if (n.clip) st.overflow = "hidden";
  const L = n.l;
  if (L && L[0] === "GRID") {
    // GRID auto-layout Figma: треки не выгружены — раскладываем ячейки их размерами в строку с переносом (как сетка row-major)
    st.display = "flex"; st.flexDirection = "row"; st.flexWrap = "wrap"; st.alignItems = "center"; st.alignContent = "flex-start";
    st.padding = `${L[2]}px ${L[3]}px ${L[4]}px ${L[5]}px`;
    if (!root) { st.width = n.w; }
  } else if (L) {
    st.display = "flex"; st.flexDirection = L[0] === "HORIZONTAL" ? "row" : "column";
    if (L[6] === "SPACE_BETWEEN") st.justifyContent = "space-between"; else { st.gap = L[1]; st.justifyContent = JUST[L[6]] || "flex-start"; }
    st.padding = `${L[2]}px ${L[3]}px ${L[4]}px ${L[5]}px`;
    st.alignItems = ALIGN[L[7]] || "flex-start";
    if (L[8]) { st.flexWrap = "wrap"; st.rowGap = L[9]; st.columnGap = L[6] === "SPACE_BETWEEN" ? undefined : L[1]; }
  }
  if (!root && !st.position && (n.k || []).some(k => k.abs)) st.position = "relative";
  if ((n.k || []).some(k => k.abs) && !st.position) st.position = "relative";
  return (
    <div data-figma={n.n} style={{ ...st, ...style }}>
      {(n.k || []).map((k, i) => <FigmaNode key={i} n={k} ctx={ctx} parentL={L || null} />)}
    </div>
  );
}

const HOVER = ["Hover", "hover", "Наведение", "Ховер"], PRESSED = ["Pressed", "pressed", "Нажатие"], FOCUS = ["Focus", "focus", "Фокус"];
const pick = (opts, names) => opts && opts.find(o => names.includes(o));

// def = { id, name, props: {figmaKey: {t, d, o}}, map: {figmaKey: jsProp}, vars: [{id, vp, node}] }
export function figmaComponent(def) {
  const variantKeys = Object.keys(def.props).filter(k => def.props[k].t === "VARIANT");
  const stateKey = variantKeys.find(k => def.map[k] === "state");
  const stateOpts = stateKey ? def.props[stateKey].o : null;
  const live = { hover: pick(stateOpts, HOVER), pressed: pick(stateOpts, PRESSED), focus: pick(stateOpts, FOCUS) };
  function Comp(props) {
    const { forceState, index, style, className, onClick } = props;
    const [hov, setHov] = useState(false), [prs, setPrs] = useState(false);
    const want = {};
    for (const k of variantKeys) want[k] = props[def.map[k]] ?? props[k.split("#")[0]] ?? def.props[k].d;
    if (stateKey) {
      const isDefault = props[def.map[stateKey]] == null;
      const fs = forceState || (isDefault ? (prs ? "pressed" : hov ? "hover" : null) : null);
      if (fs && live[fs]) want[stateKey] = live[fs];
    }
    let v;
    if (index != null) v = def.vars[index];
    if (!v) { let best = -1; for (const x of def.vars) { let s = 0; for (const k of variantKeys) if (String(x.vp[k.split("#")[0]] ?? x.vp[k]) === String(want[k])) s++; if (s > best) { best = s; v = x; } } }
    const ctx = { text: {}, bool: {} };
    for (const [k, js] of Object.entries(def.map)) {
      const t = def.props[k].t;
      if (t === "TEXT" && props[js] != null) ctx.text[k] = props[js];
      if (t === "BOOLEAN") ctx.bool[k] = props[js] ?? def.props[k].d;
    }
    const handlers = stateKey && (live.hover || live.pressed) && !forceState ? {
      onMouseEnter: () => setHov(true), onMouseLeave: () => { setHov(false); setPrs(false); },
      onMouseDown: () => setPrs(true), onMouseUp: () => setPrs(false),
    } : {};
    return (
      <div className={className} data-figma-id={v.id} style={{ display: "inline-flex", ...style }} onClick={onClick} {...handlers}>
        <FigmaNode n={v.node} ctx={ctx} root />
      </div>
    );
  }
  Comp.displayName = def.name;
  Comp.figma = def;
  return Comp;
}
