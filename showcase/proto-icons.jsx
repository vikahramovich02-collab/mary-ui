// Mary UI · Иконки прототипа — все иконки из mary-vision/src (11.11.2026): собраны из кода, визуальные дубли склеены, имена по Lucide или по смыслу.
// Данные: data/proto-icons.json (SVG как в коде, цвет — currentColor). Клик по иконке копирует SVG.
import React, { useState, useEffect } from "react";

export function ProtoIcons() {
  const [data, setData] = useState(null);
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState("");
  useEffect(() => { fetch("data/proto-icons.json", { cache: "no-cache" }).then(r => r.json()).then(setData).catch(() => setData({ groups: [] })); }, []);
  if (!data) return <section className="card"><div className="ch"><h2>Иконки прототипа</h2><span className="src" style={{ margin: 0 }}>загружаем…</span></div></section>;
  const s = q.trim().toLowerCase();
  const total = data.groups.reduce((n, g) => n + g.items.length, 0);
  const copy = (it) => {
    const txt = it.svg || it.src;
    try { navigator.clipboard.writeText(txt); } catch (e) {}
    setCopied(it.name); setTimeout(() => setCopied(""), 1400);
  };
  const groups = data.groups.map(g => ({ ...g, items: g.items.filter(it => !s || (it.name + " " + (it.files || [it.file]).join(" ") + " " + g.title).toLowerCase().includes(s)) })).filter(g => g.items.length);
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", margin: "28px 0 12px" }}>
        <h2 style={{ margin: 0 }}>Иконки прототипа · {total}</h2>
        <input className="search" style={{ width: 300, margin: 0 }} placeholder="Найти иконку" value={q} onChange={e => setQ(e.target.value)} />
        <span className="src" style={{ margin: 0 }}>{s ? "Найдено: " + groups.reduce((n, g) => n + g.items.length, 0) : "Клик — скопировать SVG, наведение — где используется"}</span>
      </div>
      {groups.map(g => (
        <section key={g.id} className="card">
          <div className="ch"><h2>{g.title} · {g.items.length}</h2>{g.note && <span className="src" style={{ margin: 0 }}>{g.note}</span>}</div>
          <div className="igrid">
            {g.items.map((it, i) => (
              <button key={g.id + i} type="button" className="icell" onClick={() => copy(it)} title={"Используется: " + (it.files || [it.file]).join(", ")} style={{ border: 0, font: "inherit", cursor: "pointer" }}>
                {it.svg
                  ? <span style={{ width: 24, height: 24, display: "grid", color: "var(--icon-default, #494F5C)" }} dangerouslySetInnerHTML={{ __html: it.svg.replace("<svg ", '<svg width="24" height="24" ') }} />
                  : <img src={it.src} alt="" style={{ width: 24, height: 24, objectFit: "contain" }} />}
                <code>{copied === it.name ? "скопировано" : it.name}</code>
              </button>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
