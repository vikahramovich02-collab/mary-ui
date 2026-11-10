// Витрина: раздел «Состояния кнопок и полей» (ручной код components/states.jsx).
import { Button, IconButton, PlusButton, MoreButton, GlassButton, Chip, Segmented, SegItem, Tab, TabDivider, SearchField, TextField, Toggle, Checkbox, Menu, MenuRow, MenuSeparator, MenuCaption, ChatInput, FileRow, FileTile, Icon } from "../components/states.jsx";
import React from "react";

const P = () => null; // метку «предложено» убрали (Вика, 01.11)
// матрица: cols = [[заголовок, предложено?]], rows = [[подпись, [ячейки]]]
function Matrix({ cols, rows, first = 150 }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: `${first}px repeat(${cols.length}, minmax(max-content, 1fr))` }}>
      <div className="h" />
      {cols.map(([t, p], i) => <div key={i} className="h">{t}{p && <P />}</div>)}
      {rows.map(([label, cells], r) => (
        <React.Fragment key={r}>
          <div className="rl">{label}</div>
          {cells.map((c, i) => <div key={i} className="c">{c === null ? <span style={{ color: "var(--text-3)", fontSize: 12 }}>—</span> : c}</div>)}
        </React.Fragment>
      ))}
    </div>
  );
}
const Card = ({ title, src, children }) => <section className="card"><h2>{title}</h2><div className="src">{src}</div>{children}</section>;
const ST = ["default", "hover", "pressed", "focus"];
const C5 = [["Default"], ["Hover"], ["Pressed", 1], ["Focus", 1], ["Disabled"]];

export function StatesSection() {
  return (
    <div>
      <Card title="Button" src="vision-files.jsx «Создать с Mary», «Загрузить», sec-more · vision-demo.jsx «История чатов»">
        <Matrix cols={C5} rows={[
          ["primary · md 32", [...ST.map(s => <Button forceState={s}>Создать</Button>), <Button disabled>Создать</Button>]],
          ["primary · sm 30", [...ST.map(s => <Button size="sm" forceState={s}>Заполнить</Button>), <Button size="sm" disabled>Заполнить</Button>]],
          ["primary · icon", [...ST.map(s => <Button icon="plus" forceState={s}>Добавить</Button>), <Button icon="plus" disabled>Добавить</Button>]],
          ["secondary", [...ST.map(s => <Button variant="secondary" forceState={s}>Отмена</Button>), <Button variant="secondary" disabled>Отмена</Button>]],
          ["ghost", [...ST.map(s => <Button variant="ghost" icon="history" forceState={s}>История чатов</Button>), <Button variant="ghost" icon="history" disabled>История чатов</Button>]],
          ["link", [...ST.map(s => <Button variant="link" forceState={s}>Показать все 12 <Icon name="chevron" size={14} stroke={1.8} /></Button>), <Button variant="link" disabled>Показать все 12</Button>]],
        ]} />
      </Card>

      <Card title="IconButton · PlusButton · MoreButton" src="vision-files.jsx iconBtn, search-open, row-more · vision-demo.jsx new-chat">
        <Matrix cols={[["Default"], ["Hover + подсказка"], ["Pressed", 1], ["Focus", 1], ["Active / меню открыто"], ["Disabled"]]} rows={[
          ["square 30 · круг", [...ST.map(s => <div style={{ height: 56, display: "flex", alignItems: "flex-start", paddingTop: 4 }}><IconButton icon="expand" title="Развернуть" forceState={s} /></div>), <IconButton icon="expand" title="Развернуть" active />, <IconButton icon="expand" disabled />]],
          ["plus · новый чат", [...ST.map(s => <div style={{ height: 56, display: "flex", alignItems: "flex-start", paddingTop: 4 }}><PlusButton forceState={s} /></div>), <PlusButton active title="Добавить файл" tooltip={false} />, <PlusButton disabled />]],
          ["round 34", [...ST.map(s => <IconButton icon="search" shape="round" title="Поиск" tooltip={false} forceState={s} />), <IconButton icon="filter" shape="round" active />, <IconButton icon="filter" shape="round" disabled />]],
          ["more ⋯ · строка", [...ST.map(s => <MoreButton forceState={s} />), <MoreButton active />, <MoreButton disabled />]],
        ]} />
      </Card>

      <Card title="GlassButton" src="vision-files.jsx GlassBtn — круглое стекло 40 поверх файла">
        <Matrix cols={C5} rows={[
          ["40 · glass", [...ST.map(s => <div className="glassbg"><GlassButton icon="download" title="Скачать" forceState={s} /></div>), <div className="glassbg"><GlassButton icon="back" disabled /></div>]],
        ]} />
      </Card>


      <Card title="Chip" src="vision-files.jsx kind-chip · vision-kb.jsx kbp-nav — фильтр типа, снимаемый фильтр">
        <Matrix cols={[["Default"], ["Hover", 1], ["Pressed", 1], ["Focus", 1], ["Selected"], ["Disabled", 1]]} rows={[
          ["filter", [...ST.map(s => <Chip forceState={s}>Избранное</Chip>), <Chip defaultSelected>Избранное</Chip>, <Chip disabled>Избранное</Chip>]],
          ["removable", [...ST.map(s => <Chip variant="removable" forceState={s}>Документы</Chip>), null, <Chip variant="removable" disabled>Документы</Chip>]],
        ]} />
      </Card>

      <Card title="Tab" src="vision-files.jsx TabStrip — вкладка файла 30 / r10, крестик у активной и при наведении">
        <Matrix cols={[["Default"], ["Hover · крестик"], ["Pressed", 1], ["Focus", 1], ["Active"], ["Active · ховер на ×"]]} first={120} rows={[
          ["file tab", [...ST.map(s => <Tab label="Отчёт за август.pdf" icon={<FileTile name="a.pdf" size={22} bare />} forceState={s} onClose={() => {}} />),
            <Tab active label="Скрипт продаж.docx" icon={<FileTile name="a.docx" size={22} bare />} onClose={() => {}} />,
            <Tab active closeHover label="Скрипт продаж.docx" icon={<FileTile name="a.docx" size={22} bare />} onClose={() => {}} />]],
        ]} />
        <div style={{ marginTop: 16, display: "flex", alignItems: "center" }}>
          <Tab label="Прайс.xlsx" icon={<FileTile name="a.xlsx" size={22} bare />} onClose={() => {}} /><TabDivider hidden />
          <Tab active label="Регламент.md" icon={<FileTile name="a.md" size={22} bare />} onClose={() => {}} /><TabDivider hidden />
          <Tab label="Отзывы.csv" icon={<FileTile name="a.csv" size={22} bare />} onClose={() => {}} /><TabDivider />
          <Tab label="Договор.pdf" icon={<FileTile name="a.pdf" size={22} bare />} onClose={() => {}} />
          <PlusButton title="Добавить файл" />
        </div>
      </Card>

      <Card title="SearchField" src="vision-files.jsx panel-search — data-state: default / hover / focus / filled">
        <Matrix cols={[["Collapsed"], ["Default"], ["Hover"], ["Focus"], ["Filled"], ["Disabled", 1]]} first={110} rows={[
          ["desktop 34", [<SearchField collapsed />, <SearchField width={180} forceState="default" />, <SearchField width={180} forceState="hover" />, <SearchField width={180} forceState="focus" />, <SearchField width={180} defaultValue="прайс" forceState="filled" />, <SearchField width={180} disabled />]],
          ["phone 44", [<SearchField collapsed phone />, <SearchField phone forceState="default" style={{ width: 170 }} />, <SearchField phone forceState="hover" style={{ width: 170 }} />, <SearchField phone forceState="focus" style={{ width: 170 }} />, <SearchField phone defaultValue="прайс" style={{ width: 170 }} />, <SearchField phone disabled style={{ width: 170 }} />]],
        ]} />
      </Card>



      <Card title="Поле переименования" src="vision-files.jsx rename-input — в строке файла и в шапке открытого файла">
        <Matrix cols={[["Focus"], ["Error", 1]]} first={110} rows={[
          ["inline 22", [<div style={{ width: 200, paddingLeft: 6 }}><TextField size="inline" defaultValue="Отчёт за август" /></div>, <div style={{ width: 200, paddingLeft: 6 }}><TextField size="inline" defaultValue="" error /></div>]],
        ]} />
      </Card>

      <Card title="Checkbox" src="vision-kb.jsx kbp-check — выбор файлов из Базы знаний">
        <Matrix cols={[["Off"], ["Off · hover", 1], ["Pressed", 1], ["Focus", 1], ["On"], ["On · hover", 1], ["Disabled"]]} first={130} rows={[
          ["checkbox sm 16", [<Checkbox />, <Checkbox forceState="hover" />, <Checkbox forceState="pressed" />, <Checkbox forceState="focus" />, <Checkbox defaultChecked />, <Checkbox defaultChecked forceState="hover" />, <span style={{ display: "flex", gap: 8 }}><Checkbox disabled /><Checkbox disabled defaultChecked /></span>]],
          ["checkbox md 18", [<Checkbox size="md" />, <Checkbox size="md" forceState="hover" />, <Checkbox size="md" forceState="pressed" />, <Checkbox size="md" forceState="focus" />, <Checkbox size="md" defaultChecked />, <Checkbox size="md" defaultChecked forceState="hover" />, <span style={{ display: "flex", gap: 8 }}><Checkbox size="md" disabled /><Checkbox size="md" disabled defaultChecked /></span>]],
          ["checkbox lg 20 · accent", [<Checkbox size="lg" />, <Checkbox size="lg" forceState="hover" />, <Checkbox size="lg" forceState="pressed" />, <Checkbox size="lg" forceState="focus" />, <Checkbox size="lg" defaultChecked />, <div className="photo"><Checkbox size="lg" light /></div>, <span style={{ display: "flex", gap: 8 }}><Checkbox size="lg" disabled /><Checkbox size="lg" disabled defaultChecked /></span>]],
          ["с подписью", [<Checkbox label="Создать ещё одну" />, null, null, null, <Checkbox defaultChecked label="Создать ещё одну" />, null, <Checkbox disabled defaultChecked label="Обязательное" />]],
        ]} />
      </Card>

      <Card title="MenuRow · Menu" src="menu.jsx POP / PopRow / PopSep / PopCap">
        <Matrix cols={[["Default"], ["Hover"], ["Pressed", 1], ["Focus", 1], ["On / выбран"], ["Disabled", 1]]} first={90} rows={[
          ["обычная", [...ST.map(s => <div style={{ width: 190 }}><MenuRow icon="download" forceState={s}>Скачать</MenuRow></div>), <div style={{ width: 190 }}><MenuRow on>Документы</MenuRow></div>, <div style={{ width: 190 }}><MenuRow icon="download" disabled>Скачать</MenuRow></div>]],
          ["danger", [...ST.map(s => <div style={{ width: 190 }}><MenuRow icon="trash" danger forceState={s}>Удалить</MenuRow></div>), null, <div style={{ width: 190 }}><MenuRow icon="trash" danger disabled>Удалить</MenuRow></div>]],
        ]} />
        <div style={{ marginTop: 16, display: "flex", gap: 24, alignItems: "flex-start" }}>
          <Menu minWidth={220}>
            <MenuRow icon="upload">Загрузить</MenuRow>
            <MenuRow icon="download" forceState="hover">Из Базы знаний</MenuRow>
            <MenuSeparator />
            <MenuCaption>Последнее</MenuCaption>
            <MenuRow icon={<FileTile name="a.pdf" size={24} />}>Отчёт за август.pdf</MenuRow>
          </Menu>
          <Menu minWidth={186}>
            <MenuRow on>Все типы</MenuRow>
            <MenuRow>Документы</MenuRow>
            <MenuRow>Таблицы</MenuRow>
          </Menu>
        </div>
      </Card>

      <Card title="ChatInput" src="chat-input.jsx MaryInputBox · vision-files.jsx AttachChip">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16 }}>
          {[
            ["Пусто", <ChatInput />],
            ["Hover", <ChatInput forceState="hover" />, 1],
            ["Focus", <ChatInput forceState="focus" />, 1],
            ["Текст", <ChatInput defaultValue="Собери отчёт по расходам за август" />],
            ["С файлом", <ChatInput attachments={[{ name: "Прайс 2026.xlsx" }]} />],
            ["Голос · запись", <ChatInput voice="recording" />],
            ["Голос · расшифровка", <ChatInput voice="decoding" />],
            ["Mary отвечает · стоп", <ChatInput loading />],
            ["Disabled", <ChatInput disabled />, 1],
          ].map(([t, el, p]) => (
            <div key={t}><div style={{ fontSize: 11, fontWeight: 500, color: "var(--text-2)", marginBottom: 8, display: "flex", gap: 6 }}>{t}{p && <P />}</div>{el}</div>
          ))}
        </div>
      </Card>

      <Card title="FileRow" src="vision-files.jsx список «Данных»: плитка 36, «⋯», меню строки, переименование">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 16 }}>
          {[
            ["Default", <FileRow name="Отчёт за август.pdf" meta="PDF · 1,2 МБ" />],
            ["Hover", <FileRow name="Отчёт за август.pdf" meta="PDF · 1,2 МБ" forceState="hover" />, 1],
            ["Новый", <FileRow name="Скрипт продаж.docx" meta="DOCX · 48 КБ" isNew />],
            ["Меню открыто", <div style={{ height: 190 }}><FileRow name="Отчёт за август.pdf" meta="PDF · 1,2 МБ" defaultMenuOpen /></div>],
            ["Переименование", <FileRow name="Отчёт за август.pdf" meta="PDF · 1,2 МБ" renaming />],
          ].map(([t, el, p]) => (
            <div key={t}><div style={{ fontSize: 11, fontWeight: 500, color: "var(--text-2)", marginBottom: 8, display: "flex", gap: 6 }}>{t}{p && <P />}</div>{el}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// поля форм и CRM — отдельный раздел витрины (Вика, 01.11): в «Состояниях» только то, что есть в «Данных»
export function CrmStatesSection() {
  return (
    <div>
      <Card title="TextField · Select" src="vision-crm.jsx NewRecord input/select · vision-login.jsx подсказка ошибки">
        <Matrix cols={[["Default"], ["Hover", 1], ["Focus", 1], ["Filled"], ["Error", 1], ["Disabled", 1]]} first={110} rows={[
          ["input 40", [<TextField style={{ width: 150 }} label="Название" placeholder="Сделка" forceState="default" />, <TextField style={{ width: 150 }} label="Название" placeholder="Сделка" forceState="hover" />, <TextField style={{ width: 150 }} label="Название" placeholder="Сделка" forceState="focus" />,
            <TextField style={{ width: 150 }} label="Название" defaultValue="Свадьба Ивановых" />, <TextField style={{ width: 150 }} label="Телефон" defaultValue="+375 29" error="Не хватает цифр" />, <TextField style={{ width: 150 }} label="Сумма" defaultValue="1 200" disabled />]],
          ["select 40", [<TextField style={{ width: 150 }} select label="Компания" options={[{ id: 1, name: "Фабрика" }]} forceState="default" />, <TextField style={{ width: 150 }} select label="Компания" options={[]} forceState="hover" />, <TextField style={{ width: 150 }} select label="Компания" options={[]} forceState="focus" />,
            <TextField style={{ width: 150 }} select label="Компания" defaultValue="1" options={[{ id: "1", name: "Фабрика" }]} />, <TextField style={{ width: 150 }} select label="Компания" options={[]} error="Выберите компанию" />, <TextField style={{ width: 150 }} select label="Компания" options={[]} disabled />]],
        ]} />
      </Card>

      <Card title="Chip · Segmented" src="vision-crm.jsx стадии NewRecord, Seg">
        <Matrix cols={[["Default"], ["Hover", 1], ["Pressed", 1], ["Focus", 1], ["Selected"], ["Disabled", 1]]} rows={[
          ["choice", [...ST.map(s => <Chip variant="choice" forceState={s}>Переговоры</Chip>), <Chip variant="choice" defaultSelected>Переговоры</Chip>, <Chip variant="choice" disabled>Переговоры</Chip>]],
          ["seg item", [...ST.map(s => <SegItem label="Таблица" forceState={s} />), <SegItem on label="Воронка" />, <SegItem label="Таблица" disabled />]],
        ]} />
        <div style={{ marginTop: 16, display: "flex", gap: 24, alignItems: "center" }}>
          <Segmented defaultValue="rules" items={[["rules", "Что делает Mary"], ["fields", "Поля"], ["funnel", "Этапы", 6], ["history", "История"]]} />
        </div>
      </Card>

      <Card title="Toggle" src="vision-crm.jsx правила (36×20) · vision-demo.jsx ThemeToggle (30×18)">
        <Matrix cols={[["Off"], ["Off · hover", 1], ["Pressed", 1], ["Focus", 1], ["On"], ["On · hover", 1], ["Disabled"]]} first={130} rows={[
          ["toggle md · ink", [<Toggle />, <Toggle forceState="hover" />, <Toggle forceState="pressed" />, <Toggle forceState="focus" />, <Toggle defaultChecked />, <Toggle defaultChecked forceState="hover" />, <span style={{ display: "flex", gap: 8 }}><Toggle disabled /><Toggle disabled defaultChecked /></span>]],
          ["toggle sm · accent", [<Toggle size="sm" />, <Toggle size="sm" forceState="hover" />, <Toggle size="sm" forceState="pressed" />, <Toggle size="sm" forceState="focus" />, <Toggle size="sm" defaultChecked />, <Toggle size="sm" defaultChecked forceState="hover" />, <span style={{ display: "flex", gap: 8 }}><Toggle size="sm" disabled /><Toggle size="sm" disabled defaultChecked /></span>]],
        ]} />
      </Card>
    </div>
  );
}
