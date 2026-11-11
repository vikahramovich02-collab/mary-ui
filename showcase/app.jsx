// Витрина Mary UI: навигация по разделам, поиск, тёмная тема.
import React, { useState, useEffect, useMemo } from "react";
import * as UI from "../components/index.js";
import { StatesSection, CrmStatesSection } from "./states-demo.jsx";
import { PopupsSection } from "./popups-demo.jsx";
import { ProtoIcons } from "./proto-icons.jsx";
import MANIFEST from "../data/manifest.json";

const FIGMA = "https://www.figma.com/design/o1syNp93H3v2dyA3JHp4em/?node-id=";
const vpLabel = (vp) => Object.entries(vp).map(([k, v]) => `${k}=${v}`).join(", ") || "единственный вариант";

function Scaled({ w, h, max, children }) {
  const k = Math.min(1, max / w);
  return (
    <div style={{ width: w * k, height: h * k, position: "relative", flexShrink: 0 }}>
      <div style={{ transform: `scale(${k})`, transformOrigin: "0 0", width: w, position: "absolute", left: 0, top: 0 }}>{children}</div>
    </div>
  );
}

function CompCard({ name, Comp }) {
  const d = Comp.figma;
  const many = d.vars.length > 1;
  const wide = Math.max(...d.vars.map(v => v.node.w));
  const max = wide > 700 ? 860 : 560;
  return (
    <section className="card" id={"c-" + name}>
      <div className="ch">
        <h2>{d.name}</h2>
        <code className="exp">{"<" + name + " />"}</code>
        <a className="fid" href={FIGMA + d.id.replace(":", "-")} target="_blank" rel="noreferrer">Figma {d.id}</a>
      </div>
      <div className="src">
        {Object.keys(d.map).length ? "Пропы: " + Object.entries(d.map).map(([k, js]) => js + (d.props[k].o ? ` (${d.props[k].o.join(" | ")})` : ` · ${d.props[k].t.toLowerCase()}`)).join(" · ") : "Без свойств"}
        {d.proto && <div>Прототип: {d.proto}</div>}
        {d.note && <div className="note">⚑ {d.note}</div>}
      </div>
      <div className="vgrid" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${Math.min(max, Math.max(160, wide)) + 24}px, 1fr))` }}>
        {d.vars.map((v, i) => (
          <div key={v.id} className="vcell">
            <div className="vl">{many ? vpLabel(v.vp) : "—"} <span className="vid">{v.id}</span></div>
            <div className="vbox"><Scaled w={v.node.w} h={v.node.h} max={max}><Comp index={i} /></Scaled></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function IconsGrid({ items }) {
  return (
    <section className="card">
      <div className="ch"><h2>Базовые иконки · {items.length}</h2><span className="src" style={{ margin: 0 }}>16×16, линия 1.5 — SVG из Figma (Design System › Базовые · Иконки)</span></div>
      <div className="igrid">
        {items.map(([name, C]) => (
          <div key={name} className="icell" title={C.figma.id}>
            <div style={{ transform: "scale(1.5)" }}><C /></div>
            <code>{name}</code>
          </div>
        ))}
      </div>
    </section>
  );
}

export function App() {
  // тёмную тему пока убрали (Вика, 10.11): витрина только в светлой
  useEffect(() => { document.documentElement.dataset.theme = "light"; }, []);
  const [pq, setPq] = useState("");   // поиск по текущей странице
  const [sec, setSec] = useState(() => (location.hash.slice(1) || "states"));
  const [q, setQ] = useState("");
  useEffect(() => { location.hash = sec; window.scrollTo(0, 0); setPq(""); }, [sec]);
  // поиск по странице: прячем карточки, где нет искомого текста
  useEffect(() => {
    const t = pq.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll("main .card").forEach(c => { const ok = !t || c.textContent.toLowerCase().includes(t); c.style.display = ok ? "" : "none"; if (ok) shown++; });
    const e = document.getElementById("pq-empty"); if (e) e.style.display = t && !shown ? "" : "none";
  }, [pq, sec, q]);
  const bySec = useMemo(() => {
    const m = {};
    for (const [name, C] of Object.entries(UI)) if (C && C.figma) { const s = C.figma.section; (m[s] = m[s] || []).push([name, C]); }
    return m;
  }, []);
  const total = Object.values(bySec).reduce((a, l) => a + l.length, 0);
  const query = q.trim().toLowerCase();
  const hits = query ? Object.values(bySec).flat().filter(([n, C]) => n.toLowerCase().includes(query) || C.figma.name.toLowerCase().includes(query) || C.figma.id.includes(query)) : null;
  const SECS = [MANIFEST.sections[0], { id: "states-crm", title: "Поля форм и CRM" }, { id: "popups", title: "Попапы" }, ...MANIFEST.sections.slice(1)];
  const cur = SECS.find(s => s.id === sec) || SECS[0];
  return (
    <div className="shell">
      <aside className="nav">
        <div className="brand">Mary UI</div>
        <div className="sub">Дизайн-система</div>
        <input className="search" placeholder="Найти компонент" value={q} onChange={e => setQ(e.target.value)} />
        {SECS.map(s => (
          <button key={s.id} className={"navi" + (s.id === sec && !query ? " on" : "")} onClick={() => { setQ(""); setSec(s.id); }}>
            <span>{s.title}</span><span className="cnt">{s.id === "states" ? 11 : s.id === "states-crm" ? 3 : s.id === "popups" ? 4 : s.id === "icons" ? (bySec.icons || []).length + 373 : (bySec[s.id] || []).length}</span>
          </button>
        ))}
        {/* не нашли нужное — сразу в личный телеграм */}
        <a className="ask" href="https://t.me/viksaaaaaa_a" target="_blank" rel="noreferrer">
          <span className="ask-who">
            <img className="ask-ava" src={window.MARY_UI_ASSETS + "vika.jpg"} alt="" width={36} height={36} />
            <span className="ask-txt">
              <span className="ask-t">Не нашли нужное?</span>
              <span className="ask-s">Напишите мне</span>
            </span>
          </span>
          <span className="ask-l">@viksaaaaaa_a ↗</span>
          <img className="ask-cat" src={window.MARY_UI_ASSETS + "cat.gif"} alt="" width={64} height={64} />
        </a>
      </aside>
      <main className="main">
        {query ? (
          <>
            <h1>Поиск: «{q}» · {hits.length}</h1>
            {hits.map(([n, C]) => C.figma.section === "icons" ? <IconsGrid key={n} items={[[n, C]]} /> : <CompCard key={n} name={n} Comp={C} />)}
          </>
        ) : (
          <>
            <header className="top">
              <div className="top-row">
                <h1>{cur.title}</h1>
                <input className="search pq" placeholder="Найти на странице" value={pq} onChange={e => setPq(e.target.value)} />
              </div>
              <p className="lead">{sec === "popups"
                ? "Гайд: когда ставить попап, из чего он состоит, какие размеры и кнопки. Компонент Dialog в components/states.jsx — один на все случаи."
                : sec === "states" || sec === "states-crm"
                ? "Ручной код по прототипу mary-vision (components/states.jsx): hover / pressed / focus показаны статично через forceState."
                : `Сгенерировано из Figma (${cur.src}): components/${sec}.jsx + data/${sec}.json. Каждый вариант — живой React-компонент, наведите курсор на варианты с состоянием «Наведение».`}</p>
            </header>
            <div id="pq-empty" className="lead" style={{ display: "none" }}>На этой странице ничего не нашлось. Попробуйте поиск слева — он ищет по всем компонентам</div>
            {sec === "popups" ? <PopupsSection /> : sec === "states" ? <StatesSection /> : sec === "states-crm" ? <CrmStatesSection /> : sec === "icons" ? <><IconsGrid items={bySec.icons || []} /><ProtoIcons /></> : (bySec[sec] || []).map(([n, C]) => <CompCard key={n} name={n} Comp={C} />)}
          </>
        )}
      </main>
    </div>
  );
}
