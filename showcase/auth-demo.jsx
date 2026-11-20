// Витрина: раздел «Вход и пароль» — поля входа, подсказки, ошибки и сценарии (Вика, 20.11.2026).
// Источник: Figma «Вход/Регистрация» (13416:42499) + компоненты «Components Вход» (13481:19725), прототип vision-login.jsx.
import React, { useState } from "react";

const ink = (a) => `rgba(var(--ink-rgb),${a})`;
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const FIG = "https://www.figma.com/design/o1syNp93H3v2dyA3JHp4em/Mary?node-id=";
const PROTO = "http://77.237.241.242:8083/?ready=1&login=";
const GREEN = "#2FA35B";
const PASS_MIN = 8;

const Card = ({ id, title, lead, children }) => (
  <section className="card" id={id}>
    <h2>{title}</h2>
    {lead && <div className="src" style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.55 }}>{lead}</div>}
    {children}
  </section>
);
const Code = ({ children }) => <code style={{ fontFamily: MONO, fontSize: 12, color: "var(--text)", background: ink(0.05), padding: "1px 6px", borderRadius: 6 }}>{children}</code>;

// иконки полей — стиль бокового меню: Solar linear, линия 1.5, 16px
const PATHS = {
  mail: <><path d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12Z" /><path d="m6 8l2.159 1.8c1.837 1.53 2.755 2.295 3.841 2.295s2.005-.765 3.841-2.296L18 8" /></>,
  lock: <><path d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16s0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z" /><path d="M6 10V8a6 6 0 1 1 12 0v2" /></>,
  user: <><circle cx="12" cy="6" r="4" /><path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" /></>,
  org: <><path d="M22 22H2" /><path d="M17 22V6c0-1.886 0-2.828-.586-3.414S14.886 2 13 2h-2c-1.886 0-2.828 0-3.414.586S7 4.114 7 6v16" /><path d="M21 22V8.5c0-1.404 0-2.107-.337-2.611a2 2 0 0 0-.552-.552C19.607 5 18.904 5 17.5 5M3 22V8.5c0-1.404 0-2.107.337-2.611a2 2 0 0 1 .552-.552C4.393 5 5.096 5 6.5 5M12 22v-3m-2-7h4m-4-3h4m-4-3h4" /></>,
  link: <><path d="M10.046 14c-1.506-1.512-1.37-4.1.303-5.779l4.848-4.866c1.673-1.68 4.25-1.816 5.757-.305s1.37 4.1-.303 5.78l-2.424 2.433" /><path d="M13.954 10c1.506 1.512 1.37 4.1-.303 5.779l-2.424 2.433l-2.424 2.433c-1.673 1.68-4.25 1.816-5.757.305s-1.37-4.1.303-5.78l2.424-2.433" /></>,
  eye: <><path d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z" /><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" /></>,
};
const Ico = ({ k, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">{PATHS[k]}</svg>
);

// поле входа: 48px, скругление 999, иконка слева 17px, текст с 44px, 14 Medium
function Field({ icon, value = "", placeholder, type = "text", eye, suffix, error, onChange, onBlur }) {
  const [see, setSee] = useState(false);
  return (
    <span style={{ position: "relative", display: "block", width: "100%", maxWidth: 460 }}>
      <span style={{ position: "absolute", left: 17, top: "50%", transform: "translateY(-50%)", color: ink(0.5), display: "flex" }}><Ico k={icon} /></span>
      <input readOnly={!onChange} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder}
        type={type === "password" && !see ? "password" : "text"}
        style={{ height: 48, width: "100%", boxSizing: "border-box", borderRadius: 999, padding: `0 ${eye || suffix ? 86 : 18}px 0 44px`,
          border: `1px solid ${error ? "var(--danger)" : "var(--border)"}`, fontFamily: "inherit", fontSize: 14, fontWeight: 500,
          color: "var(--text)", background: "var(--bg-panel)", outline: "none" }} />
      {eye && <span onClick={() => setSee(!see)} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: see ? "var(--text)" : ink(0.5), cursor: "pointer", display: "flex" }}><Ico k="eye" size={17} /></span>}
      {suffix && <span style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: ink(0.3) }}>{suffix}</span>}
    </span>
  );
}
const Hint = ({ c = "grey", children }) => (
  <div style={{ fontSize: 12, marginTop: 6, paddingLeft: 18, color: c === "red" ? "var(--danger)" : c === "green" ? GREEN : "var(--text-2)" }}>{children}</div>
);
const Label = ({ children }) => <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text-2)", margin: "0 0 8px" }}>{children}</div>;
const Grid = ({ children }) => <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px 32px", marginTop: 18 }}>{children}</div>;

function PassLive() {
  const [p, setP] = useState(""); const [p2, setP2] = useState(""); const [touched, setTouched] = useState(false);
  const ok = p.length >= PASS_MIN, same = p === p2, mism = p2.length > 3 && !same;
  return (
    <div style={{ maxWidth: 460, marginTop: 18 }}>
      <Field icon="lock" type="password" eye placeholder="Пароль" value={p} onChange={(e) => setP(e.target.value)} onBlur={() => setTouched(true)} />
      <Hint c={ok ? "green" : touched && p.length ? "red" : "grey"}>{ok ? "✓ Минимум 8 символов" : p.length ? `Минимум 8 символов — ещё ${PASS_MIN - p.length}` : "Минимум 8 символов"}</Hint>
      <div style={{ marginTop: 10 }}><Field icon="lock" type="password" placeholder="Повторите пароль" value={p2} error={mism} onChange={(e) => setP2(e.target.value)} /></div>
      {mism && <Hint c="red">Пароли не совпадают</Hint>}
      <button disabled={!(ok && same)} style={{ marginTop: 18, width: "100%", height: 48, border: "none", borderRadius: 999, background: "var(--surface)", fontFamily: "inherit", fontSize: 14, fontWeight: 500, color: ok && same ? "var(--text)" : "var(--text-2)", cursor: ok && same ? "pointer" : "default" }}>Создать и войти</button>
      <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 10 }}>Попробуйте: введите короткий пароль и уйдите из поля, потом допишите до 8.</div>
    </div>
  );
}

const SCEN = [
  { t: "Вход", s: "Рабочая почта и пароль. Ошибки: неверный пароль, почты нет.", f: "13452-20395", p: "1" },
  { t: "Неверный пароль", s: "Красная рамка у пароля, слева «Неверный пароль», «Забыли пароль?» становится тёмной.", f: "16428-65371", p: "1" },
  { t: "Почта не найдена", s: "Красная рамка у почты, под ней «Аккаунта с этой почтой нет — проверьте адрес».", f: "16428-65507", p: "1" },
  { t: "Восстановить пароль", s: "Почта → «Отправить ссылку».", f: "16424-65271", p: "reset" },
  { t: "Проверьте почту", s: "Ссылка работает 1 час, «Отправить ещё раз», «Вернуться ко входу».", f: "16424-65399", p: "reset" },
  { t: "Новый пароль", s: "По ссылке из письма: два поля, подсказка про 8 символов, «Сохранить и войти».", f: "16425-65143", p: "newpass" },
  { t: "Ссылка устарела", s: "Если ссылке больше часа → «Запросить новую ссылку».", f: "16425-65272", p: "expired" },
  { t: "Создать организацию", s: "Компания, адрес .mary.by, имя, почта, пароль ×2.", f: "13452-20649", p: "org" },
];

export function AuthSection() {
  return (
    <>
      <Card id="when" title="Когда использовать" lead="Экраны, где человек входит в Mary или задаёт пароль: вход, приглашение в команду, создание организации, восстановление пароля. Слева форма шириной 460, справа панель со сферой и ноутбуком. Все поля одного вида — ниже.">
        <div style={{ fontSize: 13, color: "var(--text-2)", marginTop: 12, lineHeight: 1.7 }}>
          Figma: <a href={FIG + "13416-42499"} target="_blank" rel="noreferrer">секция «Вход/Регистрация»</a> (по сценариям, путь «Забыли пароль» кликается в Present) ·{" "}
          <a href={FIG + "13481-19725"} target="_blank" rel="noreferrer">компоненты «Components Вход»</a> · прототип: <a href={PROTO + "1"} target="_blank" rel="noreferrer">экран входа</a>
        </div>
      </Card>

      <Card id="anatomy" title="Поле" lead="Высота 48, скругление 999 (pill), рамка 1px var(--border). Иконка 16px слева на 17px, текст с 44px, 14 Medium. Для пароля справа глаз 17px на 16px от края. Иконка и глаз — #494F5C 50%.">
        <Grid>
          <div><Label>Пусто</Label><Field icon="mail" placeholder="you@company.by" /></div>
          <div><Label>Заполнено</Label><Field icon="mail" value="lena@salon.by" /></div>
          <div><Label>Пароль · с глазом</Label><Field icon="lock" type="password" eye value="qwerty123" /></div>
          <div><Label>С суффиксом</Label><Field icon="link" value="mari" suffix=".mary.by" /></div>
          <div><Label>Имя</Label><Field icon="user" value="Мария Радько" /></div>
          <div><Label>Компания</Label><Field icon="org" value="Салон «Мари»" /></div>
          <div><Label>Ошибка</Label><Field icon="mail" value="lena@salon.com" error /><Hint c="red">Аккаунта с этой почтой нет — проверьте адрес</Hint></div>
        </Grid>
      </Card>

      <Card id="icons" title="Иконки полей" lead="Тот же стиль, что в боковом меню: Solar linear, линия 1.5, 16px. Компонент «Вход / Иконка поля» в Figma.">
        <div style={{ display: "flex", gap: 28, marginTop: 18, flexWrap: "wrap", color: "var(--text)" }}>
          {[["mail", "Почта"], ["lock", "Пароль"], ["user", "Человек"], ["org", "Компания"], ["link", "Адрес"], ["eye", "Показать пароль"]].map(([k, n]) => (
            <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-2)" }}><span style={{ color: "var(--text)" }}><Ico k={k} size={24} /></span>{n}</div>
          ))}
        </div>
      </Card>

      <Card id="hints" title="Подсказки и ошибки под полем" lead="12 Regular, отступ слева 18 (по тексту поля), 6px от поля. Серая — подсказка, красная — ошибка (вместе с красной рамкой поля), зелёная — условие выполнено.">
        <div style={{ maxWidth: 460, marginTop: 12 }}>
          <Hint>Минимум 8 символов</Hint>
          <Hint c="red">Минимум 8 символов — ещё 3</Hint>
          <Hint c="green">✓ Минимум 8 символов</Hint>
          <Hint c="red">Пароли не совпадают</Hint>
          <Hint c="red">Неверный пароль</Hint>
          <Hint c="red">Аккаунта с этой почтой нет — проверьте адрес</Hint>
          <Hint>Похоже, в адресе опечатка — нужен вид you@company.by</Hint>
          <Hint>Может, <u>lena@gmail.com</u>?</Hint>
        </div>
      </Card>

      <Card id="password" title="Пароль: требование видно сразу" lead="Минимум 8 символов. Подсказка стоит под полем всегда, а не появляется после ошибки — иначе непонятно, почему кнопка неактивна. Пока короче — «ещё N», после ухода из поля красная, когда выполнено — зелёная с галочкой. Поле повтора при несовпадении — красная рамка + «Пароли не совпадают».">
        <PassLive />
      </Card>

      <Card id="forgot" title="«Забыли пароль?»" lead="Под полем пароля справа, 12 Regular, серая 50%. После ошибки «Неверный пароль» — слева красная подсказка, ссылка становится тёмной.">
        <div style={{ maxWidth: 460, marginTop: 18 }}>
          <Field icon="lock" type="password" eye value="12345" error />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "0 18px", fontSize: 12 }}>
            <span style={{ color: "var(--danger)" }}>Неверный пароль</span><span style={{ color: "var(--text)", cursor: "pointer" }}>Забыли пароль?</span>
          </div>
        </div>
      </Card>

      <Card id="flows" title="Сценарии" lead="Каждый экран — кадр в Figma и состояние в прототипе.">
        <div style={{ marginTop: 12 }}>
          {SCEN.map((s) => (
            <div key={s.t} style={{ display: "grid", gridTemplateColumns: "200px 1fr auto", gap: 16, padding: "14px 0", borderTop: `1px solid ${ink(0.06)}`, alignItems: "baseline" }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{s.t}</div>
              <div style={{ fontSize: 13, color: "var(--text-2)" }}>{s.s}</div>
              <div style={{ fontSize: 13, whiteSpace: "nowrap" }}><a href={FIG + s.f} target="_blank" rel="noreferrer">Figma</a> · <a href={PROTO + s.p} target="_blank" rel="noreferrer">прототип</a></div>
            </div>
          ))}
        </div>
      </Card>

      <Card id="dos" title="Так / не так">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 12, fontSize: 13, lineHeight: 1.6 }}>
          <div><b style={{ color: GREEN }}>Так</b><ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
            <li>Требование к паролю видно до ввода</li><li>Ошибка — рамка + текст под этим полем</li><li>Иконка в каждом поле, в стиле меню</li><li>Есть путь «Забыли пароль?» до нового пароля</li></ul></div>
          <div><b style={{ color: "var(--danger)" }}>Не так</b><ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
            <li>Серая кнопка без объяснения почему</li><li>Ошибка тостом или над формой</li><li>Точки «········» вместо подписи поля</li><li>Иконки толще 1.5 или другого набора</li></ul></div>
        </div>
      </Card>

      <Card id="code" title="Код" lead="Прототип: src/platform/vision-login.jsx (Field, Ico, PASS_MIN, режимы login / org / reset / newpass / expired).">
        <pre style={{ fontFamily: MONO, fontSize: 12, background: ink(0.04), borderRadius: 12, padding: 16, overflowX: "auto", marginTop: 12 }}>{`const PASS_MIN = 8;
<Field icon="lock" type="password" eye
  error={passTouched && pass.length < PASS_MIN} />
<Hint c={pass.length >= PASS_MIN ? "green" : passTouched ? "red" : "grey"}>
  {pass.length >= PASS_MIN ? "✓ Минимум 8 символов"
    : pass.length ? \`Минимум 8 символов — ещё \${PASS_MIN - pass.length}\` : "Минимум 8 символов"}
</Hint>`}</pre>
      </Card>
    </>
  );
}
