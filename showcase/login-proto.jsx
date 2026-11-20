// Витрина: «Вход и регистрация» — компоненты взяты из кода прототипа (эталон), не из выгрузки Figma (Вика, 20.11.2026).
// Источник: mary-vision/src/platform/vision-login.jsx и vision-join.jsx. Стили и тексты 1:1 оттуда.
import React, { useState } from "react";

const ink = (a) => `rgba(var(--ink-rgb),${a})`;
const INK = "var(--text)", GREY = ink(0.5), GHOST = ink(0.32), GREEN = "#2FA35B";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const FIG = "https://www.figma.com/design/o1syNp93H3v2dyA3JHp4em/Mary?node-id=";
const GH = "https://github.com/Mary-projecttfdfed/Mary_V4";  // код прототипа — mary-vision/src/platform
const PROTO = "http://77.237.241.242:8083/?ready=1&";

// ─── из vision-login.jsx ───
const fieldBase = { height: 48, width: "100%", boxSizing: "border-box", border: "1px solid var(--border)", borderRadius: 999, padding: "0 18px 0 44px", fontFamily: "inherit", fontSize: 14, fontWeight: 500, color: INK, outline: "none", background: "var(--bg-panel)" };
const errField = { borderColor: "var(--danger)" };
const Ico = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const icoMail = <><path d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12Z" /><path d="m6 8l2.159 1.8c1.837 1.53 2.755 2.295 3.841 2.295s2.005-.765 3.841-2.296L18 8" /></>;
const icoLock = <><path d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16s0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z" /><path d="M6 10V8a6 6 0 1 1 12 0v2" /></>;
const icoOrg = <><path d="M22 22H2" /><path d="M17 22V6c0-1.886 0-2.828-.586-3.414S14.886 2 13 2h-2c-1.886 0-2.828 0-3.414.586S7 4.114 7 6v16" /><path d="M21 22V8.5c0-1.404 0-2.107-.337-2.611a2 2 0 0 0-.552-.552C19.607 5 18.904 5 17.5 5M3 22V8.5c0-1.404 0-2.107.337-2.611a2 2 0 0 1 .552-.552C4.393 5 5.096 5 6.5 5M12 22v-3m-2-7h4m-4-3h4m-4-3h4" /></>;
const icoUser = <><circle cx="12" cy="6" r="4" /><path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" /></>;
const icoEye = <><path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z" /><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" /></>;
const icoEyeOff = <><path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4c1.633 0 3.06.381 4.284.985M20.725 8.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20c-1.633 0-3.06-.381-4.284-.985" /><path d="M9.88 14.12a3 3 0 0 1 4.24-4.24" /><path d="M21 3L3 21" /></>;
const icoLink = <><path d="M10.046 14c-1.506-1.512-1.37-4.1.303-5.779l4.848-4.866c1.673-1.68 4.25-1.816 5.757-.305s1.37 4.1-.303 5.78l-2.424 2.433" /><path d="M13.954 10c1.506 1.512 1.37 4.1-.303 5.779l-2.424 2.433l-2.424 2.433c-1.673 1.68-4.25 1.816-5.757.305s-1.37-4.1.303-5.78l2.424-2.433" /></>;

export function LoginField({ icon = icoMail, value = "", placeholder, password, eye, suffix, error, onChange, onBlur, onKeyDown }) {
  const [see, setSee] = useState(false);
  const [own, setOwn] = useState(value);  // в витрине поле можно потрогать: печатать, стирать
  const val = onChange ? value : own;
  return (
    <span style={{ position: "relative", display: "block", width: "100%", maxWidth: 460 }}>
      <span style={{ position: "absolute", left: 17, top: "50%", transform: "translateY(-50%)", color: GREY, display: "flex" }}><Ico d={icon} /></span>
      <input value={val} onChange={onChange || ((e) => setOwn(e.target.value))} onBlur={onBlur} onKeyDown={onKeyDown} placeholder={placeholder} type={password && !see ? "password" : "text"}
        style={{ ...fieldBase, paddingRight: eye ? 46 : suffix ? 86 : 18, ...(error ? errField : null) }} />
      {eye && <span onClick={() => setSee(!see)} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: see ? INK : GHOST, cursor: "pointer", display: "flex" }}><Ico d={see ? icoEyeOff : icoEye} size={17} /></span>}
      {suffix && <span style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: GHOST, pointerEvents: "none" }}>{suffix}</span>}
    </span>
  );
}
export const LoginHint = ({ tone = "grey", children }) => (
  <div style={{ fontSize: 12, marginTop: 6, paddingLeft: 18, color: tone === "red" ? "var(--danger)" : tone === "green" ? GREEN : GREY }}>{children}</div>
);
// светлая кнопка формы (Войти / Создать и войти / Продолжить по почте): surface, текст серый пока неактивна
export const LoginPrimary = ({ ok, children }) => (
  <button type="button" style={{ width: "100%", maxWidth: 460, height: 48, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: "var(--surface)", border: "none", borderRadius: 999, cursor: ok ? "pointer" : "default", fontFamily: "inherit", fontSize: 14.5, fontWeight: 500, color: ok ? INK : GREY }}>{children}</button>
);
// ─── из vision-join.jsx ───
export const LoginGoogle = ({ wait }) => (
  <button type="button" style={{ position: "relative", width: "100%", maxWidth: 460, height: 48, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, background: "var(--btn)", border: "none", borderRadius: 999, cursor: wait ? "default" : "pointer", fontFamily: "inherit", fontSize: 14.5, fontWeight: 500, color: "var(--on-btn)" }}>
    <span style={{ position: "absolute", left: 5, width: 38, height: 38, borderRadius: "50%", background: "var(--bg-panel)", display: "grid", placeItems: "center" }}>
      <svg width={19} height={19} viewBox="0 0 48 48"><path fill="var(--accent)" d="M45 24c0-1.6-.1-2.7-.4-4H24v7.5h12c-.2 2-1.5 5-4.4 7l6.7 5.2C42.2 36 45 30.6 45 24" /><path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8 41.4 15.4 46 24 46" /><path fill="#FBBC05" d="M11.5 28.4c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4l-7.1-5.5C2.9 17 2 20.4 2 24s.9 7 2.4 9.9z" /><path fill="var(--danger)" d="M24 10.6c3.3 0 6.1 1.1 8.4 3.3l6.2-6.2C34.9 4.1 29.9 2 24 2 15.4 2 8 6.6 4.4 14.1l7.1 5.5c1.8-5.3 6.7-9 12.5-9" /></svg>
    </span>
    {wait ? "Проверяю аккаунт…" : "Войти через Google"}
  </button>
);
export const LoginOr = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 460 }}>
    <span style={{ flex: 1, height: 1, background: "var(--border)" }} /><span style={{ fontSize: 12, color: GREY }}>или</span><span style={{ flex: 1, height: 1, background: "var(--border)" }} />
  </div>
);
const MaryMark = ({ h = 20 }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: INK }}>
    <svg width={h} height={h} viewBox="0 0 36 36"><path fill="currentColor" d="M18.2598 0C27.9085 0 35.7305 7.82196 35.7305 17.4707C35.7304 27.1194 27.9085 34.9414 18.2598 34.9414C8.61109 34.9414 0.789124 27.1194 0.789062 17.4707C0.789062 7.82198 8.61105 3.12901e-05 18.2598 0ZM18.2559 3.17676C16.4135 3.1771 14.8162 6.48912 14.0234 11.335C13.247 7.77426 11.772 5.36925 10.0781 5.36914C7.57752 5.36914 5.5498 10.6098 5.5498 17.0742C5.54983 23.5386 7.57754 28.7793 10.0781 28.7793C11.628 28.7792 12.9944 26.7653 13.8105 23.6953C14.499 29.345 16.229 33.3531 18.2559 33.3535C19.9608 33.3535 21.4549 30.5174 22.2969 26.2539C23.1108 28.2413 24.3116 29.501 25.7236 29.5762C28.6256 29.7301 31.3166 24.826 31.7334 18.623C32.1501 12.42 30.1354 7.26647 27.2334 7.1123C25.4284 7.01655 23.7047 8.87701 22.5596 11.79C21.7943 6.69743 20.1554 3.17676 18.2559 3.17676Z" /></svg>
    <span style={{ fontSize: Math.round(h * 0.95), fontWeight: 600, lineHeight: 1, letterSpacing: "-0.01em" }}>mary</span>
  </span>
);


const PASS_MIN = 8;
const PERSONAL = /@(gmail\.com|mail\.ru|yandex\.(ru|by|com)|ya\.ru|icloud\.com|outlook\.com|bk\.ru|inbox\.ru|list\.ru|tut\.by)$/i;
const isMail = (v) => /^[^\s@]+@[^\s@]+\.[a-zа-я]{2,}$/i.test(v.trim());
function SandLogin() {
  const [mail, setMail] = useState(""); const [pass, setPass] = useState(""); const [err, setErr] = useState(null); const [done, setDone] = useState(false);
  const ok = isMail(mail) && pass.length >= 4;
  const go = () => { if (!ok) return; if (PERSONAL.test(mail.trim())) return setErr("mail"); if (pass.length < PASS_MIN) return setErr("pass"); setErr(null); setDone(true); };
  return (
    <div style={{ maxWidth: 460 }}>
      <LoginField icon={icoMail} placeholder="you@company.by" value={mail} error={err === "mail"} onChange={(e) => { setMail(e.target.value); setErr(null); setDone(false); }} />
      {err === "mail" && <LoginHint tone="red">Аккаунта с этой почтой нет — проверьте адрес</LoginHint>}
      <div style={{ marginTop: 10 }}><LoginField icon={icoLock} placeholder="Пароль" password eye value={pass} error={err === "pass"} onChange={(e) => { setPass(e.target.value); setErr(null); setDone(false); }} onKeyDown={(e) => e.key === "Enter" && go()} /></div>
      <div style={{ display: "flex", justifyContent: err === "pass" ? "space-between" : "flex-end", marginTop: 8, padding: "0 18px" }}>
        {err === "pass" && <span style={{ fontSize: 12, color: "var(--danger)" }}>Неверный пароль</span>}
        <span style={{ fontSize: 12, color: err === "pass" ? INK : GREY, cursor: "pointer" }}>Забыли пароль?</span>
      </div>
      <div style={{ marginTop: 14 }} onClick={go}><LoginPrimary ok={ok}>Войти</LoginPrimary></div>
      {done && <LoginHint tone="green">✓ Вход выполнен (демо)</LoginHint>}
      <div style={{ fontSize: 12, color: GREY, marginTop: 12, lineHeight: 1.6 }}>Ошибки как в прототипе: личная почта (gmail.com, mail.ru…) — «почты нет», пароль короче 8 — «неверный пароль».</div>
    </div>
  );
}
function SandPass() {
  const [p, setP] = useState(""); const [p2, setP2] = useState(""); const [t, setT] = useState(false);
  const ok = p.length >= PASS_MIN, mism = p2.length > 3 && p !== p2;
  return (
    <div style={{ maxWidth: 460 }}>
      <LoginField icon={icoLock} placeholder="Пароль" password eye value={p} onChange={(e) => setP(e.target.value)} onBlur={() => setT(true)} />
      <LoginHint tone={ok ? "green" : t && p.length ? "red" : "grey"}>{ok ? "✓ Минимум 8 символов" : p.length ? `Минимум 8 символов — ещё ${PASS_MIN - p.length}` : "Минимум 8 символов"}</LoginHint>
      <div style={{ marginTop: 10 }}><LoginField icon={icoLock} placeholder="Повторите пароль" password value={p2} error={mism} onChange={(e) => setP2(e.target.value)} /></div>
      {mism && <LoginHint tone="red">Пароли не совпадают</LoginHint>}
      <div style={{ marginTop: 18 }}><LoginPrimary ok={ok && !mism && p2 === p}>Создать и войти</LoginPrimary></div>
    </div>
  );
}


const SCREENS = [
  ["01", "Вход", "login=1"], ["02", "Неверный пароль", "login=1"], ["03", "Почты нет", "login=1"],
  ["04", "Восстановить пароль", "login=reset"], ["05", "Проверьте почту", "login=reset"], ["06", "Новый пароль", "login=newpass"],
  ["07", "Ссылка устарела", "login=expired"], ["08", "Создать организацию", "login=org"], ["09", "Приглашение в команду", "join=7f3a91"],
];
function Screens() {
  return (
    <section className="card">
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0 }}>Где это на экранах</h2>
        <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 500 }}><a href={FIG + "13416-42499"} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textUnderlineOffset: 3 }}>Все экраны в Figma ↗</a></span>
      </div>
      <div style={{ fontSize: 13, color: GREY, marginTop: 6 }}>Вход, ошибки, восстановление пароля, создание организации и приглашение. Нажмите на экран — откроется в прототипе.</div>
      <div style={{ display: "flex", gap: 16, overflowX: "auto", marginTop: 18, paddingBottom: 6 }}>
        {SCREENS.map(([f, n, q]) => (
          <a key={f} href={PROTO + q} target="_blank" rel="noreferrer" style={{ flex: "0 0 240px", textDecoration: "none", color: INK }}>
            <img src={`assets/login/${f}.webp`} alt={n} loading="lazy" style={{ width: 240, height: 150, objectFit: "cover", borderRadius: 12, display: "block", boxShadow: `0 0 0 1px ${ink(0.08)}` }} />
            <div style={{ fontSize: 13, fontWeight: 500, marginTop: 8 }}>{n}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── каталог ───
const Card = ({ title, tag, src, fig, proto, children }) => (
  <section className="card">
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      {tag && <code style={{ fontFamily: MONO, fontSize: 13, color: GREY }}>{`<${tag} />`}</code>}
      <span style={{ marginLeft: "auto", display: "flex", gap: 14, fontSize: 12, fontWeight: 500 }}>
        {proto && <a href={PROTO + proto} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textUnderlineOffset: 3 }}>Открыть в прототипе ↗</a>}
        {fig && <a href={FIG + fig} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textUnderlineOffset: 3 }}>Открыть в Figma ↗</a>}
      </span>
    </div>
    <div style={{ fontSize: 13, color: GREY, marginTop: 6 }}>Прототип: <code style={{ fontFamily: MONO, fontSize: 12 }}>{src}</code></div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "22px 32px", marginTop: 20 }}>{children}</div>
  </section>
);
const V = ({ n, children }) => (
  <div><div style={{ fontSize: 12, fontWeight: 500, color: GREY, marginBottom: 8 }}>{n}</div>{children}</div>
);

export function LoginProtoSection() {
  return (
    <>
      <Screens />

      <Card title="Попробовать" src="src/platform/vision-login.jsx — логика tryLogin, PASS_MIN, подсказки" fig="13416-42499" proto="login=1">
        <V n="Вход · введите почту и пароль"><SandLogin /></V>
        <V n="Пароль · создание организации, новый пароль"><SandPass /></V>
      </Card>

      <Card title="Поле ввода" tag="LoginField" src="src/platform/vision-login.jsx:36 (Field) · fieldBase :17" fig="13481-19740" proto="login=1">
        <V n="Почта · пусто"><LoginField icon={icoMail} placeholder="you@company.by" /></V>
        <V n="Почта · заполнено"><LoginField icon={icoMail} value="lena@salon.by" /></V>
        <V n="Пароль · с глазом"><LoginField icon={icoLock} value="qwerty123" password eye /></V>
        <V n="Пароль · пусто"><LoginField icon={icoLock} placeholder="Пароль" password eye /></V>
        <V n="Компания"><LoginField icon={icoOrg} value="Салон «Мари»" /></V>
        <V n="Адрес · с суффиксом"><LoginField icon={icoLink} value="mari" suffix=".mary.by" /></V>
        <V n="Имя и фамилия"><LoginField icon={icoUser} value="Мария Радько" /></V>
        <V n="Ошибка · почта"><LoginField icon={icoMail} value="lena@gmail.com" error /><LoginHint tone="red">Аккаунта с этой почтой нет — проверьте адрес</LoginHint></V>
        <V n="Ошибка · пароль"><LoginField icon={icoLock} value="12345" password eye error /></V>
      </Card>

      <Card title="Иконки полей" tag="Ico" src="src/platform/vision-login.jsx:29–34 (icoMail, icoLock, icoOrg, icoUser, icoEye, icoLink)" fig="16432-65168" proto="login=org">
        {[[icoMail, "Почта", "icoMail"], [icoLock, "Пароль", "icoLock"], [icoUser, "Имя", "icoUser"], [icoOrg, "Компания", "icoOrg"], [icoLink, "Адрес пространства", "icoLink"], [icoEye, "Показать пароль", "icoEye"], [icoEyeOff, "Скрыть пароль", "icoEyeOff"]].map(([d, n, k]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ width: 48, height: 48, borderRadius: 14, background: "var(--surface)", display: "grid", placeItems: "center", color: INK }}><Ico d={d} size={20} /></span>
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: INK }}>{n}</span>
              <code style={{ fontFamily: MONO, fontSize: 12, color: GREY }}>{k} · 16px · линия 1.5 · в поле 50%</code>
            </span>
          </div>
        ))}
      </Card>

      <Card title="Подсказка под полем" tag="LoginHint" src="src/platform/vision-login.jsx:320 (org-pass-hint), :213 (пароли), :70 (почта)" fig="13481-19748" proto="login=org">
        <V n="Пароль · требование"><LoginHint>Минимум 8 символов</LoginHint></V>
        <V n="Пароль · мало символов"><LoginHint tone="red">Минимум 8 символов — ещё 3</LoginHint></V>
        <V n="Пароль · выполнено"><LoginHint tone="green">✓ Минимум 8 символов</LoginHint></V>
        <V n="Пароли не совпадают"><LoginHint tone="red">Пароли не совпадают</LoginHint></V>
        <V n="Неверный пароль"><LoginHint tone="red">Неверный пароль</LoginHint></V>
        <V n="Почта не найдена"><LoginHint tone="red">Аккаунта с этой почтой нет — проверьте адрес</LoginHint></V>
        <V n="Опечатка"><LoginHint>Похоже, в адресе опечатка — нужен вид you@company.by</LoginHint></V>
        <V n="Домен"><LoginHint>Может, <span style={{ color: INK, textDecoration: "underline" }}>lena@gmail.com</span>?</LoginHint></V>
      </Card>

      <Card title="«Забыли пароль?»" tag="LoginForgot" src="src/platform/vision-login.jsx:160" fig="16432-65384" proto="login=1">
        <V n="Обычная"><div style={{ display: "flex", justifyContent: "flex-end", maxWidth: 460, padding: "0 18px", boxSizing: "border-box" }}><span style={{ fontSize: 12, color: GREY }}>Забыли пароль?</span></div></V>
        <V n="После ошибки"><div style={{ display: "flex", justifyContent: "space-between", maxWidth: 460, padding: "0 18px", boxSizing: "border-box" }}><span style={{ fontSize: 12, color: "var(--danger)" }}>Неверный пароль</span><span style={{ fontSize: 12, color: INK }}>Забыли пароль?</span></div></V>
      </Card>

      <Card title="Кнопка формы" tag="LoginPrimary" src="src/platform/vision-login.jsx:91 (primary) · vision-join.jsx:201" fig="13481-19778" proto="login=1">
        <V n="Неактивная"><LoginPrimary>Войти</LoginPrimary></V>
        <V n="Активная"><LoginPrimary ok>Войти</LoginPrimary></V>
        <V n="Загрузка"><LoginPrimary>Проверяю…</LoginPrimary></V>
        <V n="Продолжить по почте"><LoginPrimary ok>Продолжить по почте</LoginPrimary></V>
      </Card>

      <Card title="Кнопка Google" tag="LoginGoogle" src="src/platform/vision-join.jsx:160" fig="13481-19758" proto="join=7f3a91">
        <V n="Обычная"><LoginGoogle /></V>
        <V n="Проверка"><LoginGoogle wait /></V>
      </Card>

      <Card title="Разделитель «или», ссылки и строки" src="src/platform/vision-join.jsx:174, :214, :140, :116 · vision-login.jsx:173, :108" fig="13481-19725" proto="join=7f3a91">
        <V n="Разделитель «или»"><LoginOr /></V>
        <V n="Создать организацию"><span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 500, color: INK }}><Ico d={icoUser} />Создать организацию</span></V>
        <V n="Вернуться ко входу"><span style={{ fontSize: 13.5, fontWeight: 500, color: INK }}>Вернуться ко входу</span></V>
        <V n="Назад · шапка"><span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: INK }}><Ico d={<path d="M15 6l-6 6 6 6" />} size={17} />Назад</span></V>
        <V n="Сноска под кнопкой"><div style={{ fontSize: 12, color: GREY, textAlign: "center", maxWidth: 460 }}>Ссылка работает 7 дней</div></V>
        <V n="Данные приглашения"><div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, fontSize: 12.5, color: INK, lineHeight: 1.5, maxWidth: 460 }}><span><span style={{ color: GREY }}>Должность:</span> <b style={{ fontWeight: 500 }}>мастер бровей</b></span><span><span style={{ color: GREY }}>Доступ:</span> <b style={{ fontWeight: 500 }}>сотрудник</b></span></div></V>
        <V n="Юридическая строка"><div style={{ fontSize: 11.5, color: GHOST, textAlign: "center", lineHeight: 1.6, maxWidth: 460 }}>Входя, вы соглашаетесь с <u>Условиями использования</u>, <u>Политикой конфиденциальности</u> и <u>обработкой персональных данных</u>.</div></V>
        <V n="Логотип"><MaryMark /></V>
      </Card>

      <Card title="Заголовок экрана" src="src/platform/vision-login.jsx:113 · vision-join.jsx:125" fig="13416-42499" proto="login=1">
        <V n="Вход / восстановление"><div style={{ maxWidth: 460, textAlign: "center" }}><div style={{ fontSize: 36, fontWeight: 500, color: INK, letterSpacing: "-0.022em", lineHeight: 1.2 }}>Войти в Mary</div><div style={{ fontSize: 13.5, color: GREY, marginTop: 14, lineHeight: 1.5 }}>Введите рабочую почту и пароль</div></div></V>
        <V n="Приглашение · две строки"><div style={{ maxWidth: 460, textAlign: "center" }}><div style={{ fontSize: 36, fontWeight: 500, color: INK, letterSpacing: "-0.022em", lineHeight: 1.2 }}>Вас приглашают в Mary</div><div style={{ fontSize: 36, fontWeight: 500, color: GREY, letterSpacing: "-0.022em", lineHeight: 1.2 }}>Салон «Мари»</div></div></V>
      </Card>
    </>
  );
}
