# Mary UI — все компоненты Figma в коде

Пакет для разработки от 01.11.2026. Источник — Figma-файл `o1syNp93H3v2dyA3JHp4em`: страницы «Mary Platform» (там же бывшая «Mary Final Final» и секции `Components …`) и «Design System».
Перенесено **170 из 172** компонентов (COMPONENT и COMPONENT_SET), 2 дубля не перенесены — см. таблицу.

Витрина: **https://vikahramovich02-collab.github.io/mary-ui/** — навигация по разделам, поиск по компонентам и по странице. Локально: `npx serve .` в этой папке.

## С чего начать разработчику

- **Образец для кода** — разделы «Состояния кнопок и полей», «Поля форм и CRM», «Попапы»: ручной код в `components/states.jsx` + токены в `tokens.css`. Их и переносим в продукт.
- **Попапы** — один компонент `Dialog` на все случаи; правила, размеры и все попапы по страницам — в разделе «Попапы» (`showcase/popups-demo.jsx`, `showcase/popups-all.jsx`).
- Остальные разделы сгенерированы из Figma автоматически — это наглядная сверка с макетом, а не код для продукта.
- Вопросы — Вике в Telegram: https://t.me/viksaaaaaa_a

## Что внутри

| Путь | Что это |
|---|---|
| `tokens.css` | CSS-переменные темы (светлая + `[data-theme="dark"]`) |
| `components/states.jsx` | 12 компонентов состояний **ручным кодом** по прототипу mary-vision (Button, IconButton, GlassButton, Chip, Segmented, Tab, SearchField, TextField, Toggle, Checkbox, MenuRow, FileRow, ChatInput) |
| `components/<раздел>.jsx` | 158 компонентов, **сгенерированных из Figma**: `ds`, `icons`, `chat`, `sidechat`, `nav`, `employees`, `lists`, `analytics`, `kb`, `login`, `integrations`, `mobile` |
| `components/core/figma-node.jsx` | рендер: `figmaComponent(def)` превращает набор Figma в React-компонент |
| `components/index.js` | общий вход: `import { ChatTab, DsButton, IconPlus } from "./components"` |
| `data/<раздел>.json` | выгрузка узлов Figma: auto-layout, размеры, отступы, радиусы, заливки, обводки, тени, тексты; `data/svg.json` — иконки SVG; `data/images.json` + `assets/` — картинки (имя файла = imageHash Figma) |
| `showcase/` | код витрины |
| `PROGRESS.md`, `tools/` | как сделана выгрузка; `python3 tools/gen.py` пересобирает components/ и data/ из tools/dl/*.json |

## Как пользоваться сгенерированными компонентами

```jsx
import "./tokens.css";
import { ChatTab, AnalyticsMetric, LetterAvatar, IconPlus } from "./components/index.js";

<ChatTab state="Наведение" />                 // значения варианта — как в Figma
<ChatTab />                                      // живой hover/pressed, если у набора есть такие состояния
<ChatTab forceState="hover" />                   // статично показать hover / pressed / focus
<AnalyticsMetric title="Выручка" value="1,2 млн" captionVariant="Зелёная" />  // текстовые свойства Figma → пропы
<LetterAvatar letter="В" color="Розовый" size="32" />
```

- Пропы = свойства набора Figma: `Состояние/State`→`state`, `Вид`→`view`, `Тип`→`type`, `Размер/Size`→`size`, `Цвет`→`color`, `Иконка`→`icon`, `Property 1/Variant`→`variant`, `Сообщений`→`count`, текстовые (`Название`→`title`, `Значение`→`value`, `Подпись`→`caption`, `Текст`→`text`, `Буква`→`letter` …), булевые (`Счётчик`→`showCounter`, `Меню ···`→`showMenu` …). Полный список пропов каждого компонента — в JSDoc в `components/<раздел>.jsx` и на карточке витрины.
- `index={n}` — выбрать вариант по номеру (для наборов, где варианты называются одинаково).
- Цвета, привязанные в Figma к переменным «Mary / Тема», выводятся как `var(--…)`. Остальные цвета — литералы из макета, поэтому в тёмной теме сгенерированные компоненты перекрашиваются **частично**. Полностью тёмную тему поддерживает только ручной код (`states.jsx`).
- GRID auto-layout Figma (строки таблицы сотрудников, календарь аналитики, карточки интеграций) раскладывается приблизительно: ячейки своими размерами в строку с переносом, треки сетки не выгружались.
- INSTANCE_SWAP-свойства (`iconSwap`, `tile`) пока не подменяются: рисуется иконка из макета.
- Это точная вёрстка макета. Для продакшена компоненты стоит переписывать в идиоматичный код (как в `states.jsx`): данные в `data/*.json` дают все значения. Колонка «Прототип» показывает, где тот же текст встречается в mary-vision. Это ориентир для сверки, а не гарантия совпадения.

## Figma → код

| Figma | id | Вариантов | Компонент | Файл | Прототип (где встречается текст) | Заметки |
|---|---|---|---|---|---|---|
| Состояния / Button | `15551:59598` | 20 | `Button` | `components/states.jsx` | см. раздел ниже | ручной код по прототипу; ⚑ — см. ниже |
| Состояния / Icon button | `15551:59684` | 18 | `IconButton / PlusButton / MoreButton` | `components/states.jsx` | см. раздел ниже | ручной код по прототипу; ⚑ — см. ниже |
| Состояния / Glass button | `15551:59721` | 5 | `GlassButton` | `components/states.jsx` | см. раздел ниже | ручной код по прототипу; ⚑ — см. ниже |
| Состояния / Chip | `15567:59577` | 17 | `Chip` | `components/states.jsx` | см. раздел ниже | ручной код по прототипу; ⚑ — см. ниже |
| Состояния / Segment | `15567:59607` | 6 | `Segmented / SegItem` | `components/states.jsx` | см. раздел ниже | ручной код по прототипу; ⚑ — см. ниже |
| Состояния / Вкладка файла | `15567:59661` | 5 | `Tab` | `components/states.jsx` | см. раздел ниже | ручной код по прототипу; ⚑ — см. ниже |
| Состояния / Поле поиска | `15567:59703` | 6 | `SearchField` | `components/states.jsx` | см. раздел ниже | ручной код по прототипу; ⚑ — см. ниже |
| Состояния / Поле формы | `15577:59603` | 14 | `TextField` | `components/states.jsx` | см. раздел ниже | ручной код по прототипу; ⚑ — см. ниже |
| Состояния / Toggle | `15577:59655` | 20 | `Toggle` | `components/states.jsx` | см. раздел ниже | ручной код по прототипу; ⚑ — см. ниже |
| Состояния / Checkbox | `15577:59727` | 30 | `Checkbox` | `components/states.jsx` | см. раздел ниже | ручной код по прототипу; ⚑ — см. ниже |
| Состояния / Строка меню | `15588:59606` | 11 | `Menu / MenuRow` | `components/states.jsx` | см. раздел ниже | ручной код по прототипу; ⚑ — см. ниже |
| Состояния / Строка файла | `15588:80415` | 4 | `FileRow` | `components/states.jsx` | см. раздел ниже | ручной код по прототипу; ⚑ — см. ниже |
| Button | `14005:780` | 24 | `DsButton` | `components/ds.jsx` | src/platform/vision-kb.jsx:600 («Кнопка») | — |
| Icon Button | `14006:724` | 8 | `DsIconButton` | `components/ds.jsx` | — | — |
| Input | `14008:765` | 10 | `DsInput` | `components/ds.jsx` | — | — |
| Menu Item | `14009:774` | 7 | `DsMenuItem` | `components/ds.jsx` | src/platform/vision-demo.jsx:464 («Переименовать») | — |
| Menu | `14009:781` | 1 | `DsMenu` | `components/ds.jsx` | src/platform/vision-demo.jsx:666 («Загрузить файл») | — |
| Toggle | `14010:765` | 4 | `DsToggle` | `components/ds.jsx` | — | — |
| Checkbox | `14010:778` | 6 | `DsCheckbox` | `components/ds.jsx` | — | — |
| Radio | `14010:783` | 4 | `DsRadio` | `components/ds.jsx` | — | — |
| Segment | `14010:788` | 2 | `DsSegment` | `components/ds.jsx` | src/platform/vision-demo.jsx:985 («7 дней») | — |
| Segmented | `14010:789` | 1 | `DsSegmented` | `components/ds.jsx` | src/platform/vision-demo.jsx:985 («7 дней») | — |
| Tab | `14011:771` | 3 | `DsTab` | `components/ds.jsx` | src/platform/process-pages.jsx:261 («Подключённые») | — |
| Chip | `14011:780` | 2 | `DsChip` | `components/ds.jsx` | src/platform/vision-kb.jsx:3623 («Собрано Mary») | — |
| Badge | `14011:791` | 5 | `DsBadge` | `components/ds.jsx` | src/platform/chat-cards.jsx:381 («Подключено») | — |
| Avatar | `14011:816` | 8 | `DsAvatar` | `components/ds.jsx` | — | — |
| Tooltip | `14013:772` | 1 | `DsTooltip` | `components/ds.jsx` | src/platform/vision-employees.jsx:826 («Копировать») | — |
| Toast | `14013:788` | 3 | `DsToast` | `components/ds.jsx` | src/platform/vision-employees.jsx:962 («Вернуть») | — |
| Modal | `14013:816` | 2 | `DsModal` | `components/ds.jsx` | src/platform/vision-kb.jsx:2651 («Файл уйдёт в архив») | — |
| Card | `14013:826` | 3 | `DsCard` | `components/ds.jsx` | src/platform/vision-employees.jsx:297 («Telegram») | — |
| Empty State | `14014:801` | 2 | `DsEmptyState` | `components/ds.jsx` | src/platform/vision-kb.jsx:4270 («Здесь пока пусто») | — |
| Skeleton | `14014:815` | 3 | `DsSkeleton` | `components/ds.jsx` | — | — |
| button | `14023:1172` | 48 | `DsButtonEn` | `components/ds.jsx` | src/platform/process-sandbox.jsx:61 («Button») | ⚑ второй набор кнопок на странице Design System (англ. имена, есть loading и lg) — дублирует «Button» 14005:780; перенесены оба, выбрать один |
| Icon/plus | `14004:688` | 1 | `IconPlus` | `components/icons.jsx` | — | — |
| Icon/x | `14004:693` | 1 | `IconX` | `components/icons.jsx` | — | — |
| Icon/check | `14004:698` | 1 | `IconCheck` | `components/icons.jsx` | — | — |
| Icon/chevron-down | `14004:703` | 1 | `IconChevronDown` | `components/icons.jsx` | — | — |
| Icon/chevron-right | `14004:708` | 1 | `IconChevronRight` | `components/icons.jsx` | — | — |
| Icon/chevron-left | `14004:713` | 1 | `IconChevronLeft` | `components/icons.jsx` | — | — |
| Icon/arrow-right | `14004:718` | 1 | `IconArrowRight` | `components/icons.jsx` | — | — |
| Icon/search | `14004:723` | 1 | `IconSearch` | `components/icons.jsx` | — | — |
| Icon/more | `14004:729` | 1 | `IconMore` | `components/icons.jsx` | — | — |
| Icon/upload | `14004:736` | 1 | `IconUpload` | `components/icons.jsx` | — | — |
| Icon/download | `14004:742` | 1 | `IconDownload` | `components/icons.jsx` | — | — |
| Icon/pencil | `14004:748` | 1 | `IconPencil` | `components/icons.jsx` | — | — |
| Icon/trash | `14004:754` | 1 | `IconTrash` | `components/icons.jsx` | — | — |
| Icon/copy | `14004:760` | 1 | `IconCopy` | `components/icons.jsx` | — | — |
| Icon/folder | `14004:766` | 1 | `IconFolder` | `components/icons.jsx` | — | — |
| Icon/file | `14004:771` | 1 | `IconFile` | `components/icons.jsx` | — | — |
| Icon/gear | `14004:777` | 1 | `IconGear` | `components/icons.jsx` | — | — |
| Icon/info | `14004:783` | 1 | `IconInfo` | `components/icons.jsx` | — | — |
| Icon/alert | `14004:789` | 1 | `IconAlert` | `components/icons.jsx` | — | — |
| Icon/chat | `14004:795` | 1 | `IconChat` | `components/icons.jsx` | — | — |
| Icon/user | `14004:800` | 1 | `IconUser` | `components/icons.jsx` | — | — |
| Icon/shield | `14004:806` | 1 | `IconShield` | `components/icons.jsx` | — | — |
| Icon/sun | `14004:812` | 1 | `IconSun` | `components/icons.jsx` | — | — |
| Icon/moon | `14004:818` | 1 | `IconMoon` | `components/icons.jsx` | — | — |
| Icon/monitor | `14004:823` | 1 | `IconMonitor` | `components/icons.jsx` | — | — |
| Icon/filter | `14004:829` | 1 | `IconFilter` | `components/icons.jsx` | — | — |
| Icon/grid | `14004:834` | 1 | `IconGrid` | `components/icons.jsx` | — | — |
| Icon/list | `14004:842` | 1 | `IconList` | `components/icons.jsx` | — | — |
| Icon/clock | `14004:850` | 1 | `IconClock` | `components/icons.jsx` | — | — |
| Icon/link | `14004:856` | 1 | `IconLink` | `components/icons.jsx` | — | — |
| Icon/logout | `14004:862` | 1 | `IconLogout` | `components/icons.jsx` | — | — |
| Icon/arrow-return | `14022:788` | 1 | `IconArrowReturn` | `components/icons.jsx` | — | — |
| Icon/folder-move | `14022:792` | 1 | `IconFolderMove` | `components/icons.jsx` | — | — |
| Icon/thumb-up | `14022:797` | 1 | `IconThumbUp` | `components/icons.jsx` | — | — |
| Icon/thumb-down | `14022:801` | 1 | `IconThumbDown` | `components/icons.jsx` | — | — |
| Icon/help | `14022:805` | 1 | `IconHelp` | `components/icons.jsx` | — | — |
| Icon/headset | `14022:811` | 1 | `IconHeadset` | `components/icons.jsx` | — | — |
| Вариант ответа | `12313:233405` | 4 | `AnswerOption` | `components/chat.jsx` | src/platform/vision-demo.jsx:70 («Автоматизируй запись клиентов») | — |
| Поле ввода | `12313:233414` | 14 | `ChatComposer` | `components/chat.jsx` | — | — |
| Плашка действия | `12313:233737` | 3 | `ActionChip` | `components/chat.jsx` | src/platform/vision-employees.jsx:407 («Автоматизации») | — |
| История чатов | `12313:233747` | 3 | `ChatHistoryRow` | `components/chat.jsx` | src/platform/vision-demo.jsx:538 («История чатов») | — |
| Кнопка панели | `12313:233768` | 3 | `PanelButton` | `components/chat.jsx` | src/platform/vision-employees.jsx:283 («Данные») | — |
| Плитка файла | `12313:233792` | 7 | `FileTypeTile` | `components/chat.jsx` | — | — |
| Вложение | `12313:233828` | 6 | `Attachment` | `components/chat.jsx` | — | — |
| Вкладка чата | `12313:233863` | 5 | `ChatTab` | `components/chat.jsx` | — | — |
| Кнопка нового чата | `12313:233887` | 6 | `NewChatButton` | `components/chat.jsx` | — | — |
| Шапка чата | `12313:233895` | 3 | `ChatHeader` | `components/chat.jsx` | src/platform/vision-demo.jsx:1138 («Записи клиентов») | — |
| Источники | `12313:233942` | 2 | `Sources` | `components/chat.jsx` | src/platform/vision-crm.jsx:1048 («Источники») | — |
| Очередь сообщений | `12313:233994` | 3 | `MessageQueue` | `components/chat.jsx` | src/platform/vision-files.jsx:2343 («Скорректировать») | — |
| Работа Mary | `12313:234060` | 2 | `MaryWork` | `components/chat.jsx` | src/platform/vision-demo.jsx:296 («Думаю..») | — |
| Кнопка действия | `12313:234115` | 10 | `MessageActionButton` | `components/chat.jsx` | — | — |
| Боковая панель | `12313:234154` | 3 | `SidePanel` | `components/chat.jsx` | src/platform/chat-mary-activity.jsx:578 («· MD») | — |
| Button | `12990:42483` | 3 | `ChatButton` | `components/chat.jsx` | src/platform/vision-employees.jsx:936 («Добавить») | ⚑ варианты — это тексты кнопок (Добавить/Загрузить/Собрать отчет), а не состояния |
| Search | `13152:40993` | 2 | `ChatSearch` | `components/chat.jsx` | src/platform/vision-process.jsx:1669 («Искать подключения») | ⚑ оба варианта называются Default — различаются только плейсхолдером; вариант выбирается пропом index |
| Чат / Чат · пузырь запроса | `13347:19063` | 1 | `UserBubble` | `components/chat.jsx` | src/platform/vision-employees.jsx:653 («Администратор») | — |
| Чат / Чат · ответ Mary | `13347:19082` | 1 | `MaryReply` | `components/chat.jsx` | — | — |
| side-chat / window | `12902:16210` | 8 | `SideChatWindow` | `components/sidechat.jsx` | src/platform/vision-kb.jsx:2712 («Акции на сентябрь») | — |
| side-chat / composer | `12916:15868` | 2 | `SideChatComposer` | `components/sidechat.jsx` | src/platform/vision-home.jsx:906 («Спросить у Mary») | — |
| side-chat / tab | `12916:15876` | 2 | `SideChatTab` | `components/sidechat.jsx` | src/platform/vision-kb.jsx:2712 («Акции на сентябрь») | — |
| side-chat / history-row | `12916:15885` | 2 | `SideChatHistoryRow` | `components/sidechat.jsx` | src/platform/vision-kb.jsx:2712 («Акции на сентябрь») | — |
| side-chat / icon-button | `12916:28735` | 2 | `SideChatIconButton` | `components/sidechat.jsx` | — | — |
| menu_set/Развёрнуто | `14385:43974` | 1 | `SidebarExpandedLegacy` | `не перенесён` | src/platform/vision-employees.jsx:43 («mary») | ⛔ дубль «Меню» 12313:233316 (развёрнутое) — та же сайдбар-панель |
| menu_set/Свёрнуто | `14391:684` | 1 | `SidebarCollapsedLegacy` | `не перенесён` | — | ⛔ дубль «Меню» 12313:233316 (свёрнутое) |
| Меню | `12313:233316` | 2 | `Sidebar` | `components/nav.jsx` | src/platform/vision-employees.jsx:43 («mary») | — |
| Меню настроек | `13511:758` | 2 | `SettingsSidebar` | `components/nav.jsx` | src/platform/vision-employees.jsx:43 («mary») | — |
| Сотрудники / Строка сотрудника | `13345:19023` | 1 | `EmployeeRow` | `components/employees.jsx` | src/platform/vision-employees.jsx:42 («Александр Лукашевич») | — |
| Сотрудники / Строка сотрудника · ховер | `13345:19047` | 1 | `EmployeeRowHover` | `components/employees.jsx` | src/platform/vision-employees.jsx:48 («Лена Мороз») | ⚑ отдельный компонент вместо варианта: это hover-состояние «Строки сотрудника» 13345:19023; в коде тоже отдельный EmployeeRowHover — стоит слить в один набор с state |
| Сотрудники / Шапка таблицы | `13345:19075` | 1 | `EmployeesTableHead` | `components/employees.jsx` | src/platform/vision-employees.jsx:313 («Сотрудник») | — |
| Сотрудники / Плашка · ждёт входа | `13345:19079` | 1 | `PendingBadge` | `components/employees.jsx` | src/platform/vision-employees.jsx:96 («ждёт входа») | — |
| Сотрудники / Ячейка · автоматизации | `13345:19106` | 1 | `AutomationsCell` | `components/employees.jsx` | — | — |
| Сотрудники / Чип роли | `13345:19116` | 1 | `RoleChip` | `components/employees.jsx` | src/platform/vision-employees.jsx:45 («администратор») | — |
| Сотрудники / Кнопка · Добавить | `13345:19131` | 1 | `AddEmployeeButton` | `components/employees.jsx` | src/platform/vision-employees.jsx:936 («Добавить») | — |
| Сотрудники / Меню строки | `13345:19138` | 1 | `EmployeeRowMenu` | `components/employees.jsx` | src/platform/vision-employees.jsx:1311 («Открыть страницу») | — |
| Сотрудники / Меню · сортировка | `13345:19147` | 1 | `SortMenu` | `components/employees.jsx` | src/platform/vision-employees.jsx:1238 («А → Я») | — |
| Сотрудники / Меню · фильтр роли | `13345:19160` | 1 | `RoleFilterMenu` | `components/employees.jsx` | src/platform/vision-employees.jsx:1242 («все роли») | — |
| Сотрудники / Меню · фильтр автоматизаций | `13345:19213` | 1 | `AutomationFilterMenu` | `components/employees.jsx` | src/platform/vision-employees.jsx:1246 («все автоматизации») | — |
| Сотрудники / Карточка сотрудника | `13345:19299` | 1 | `EmployeeCard` | `components/employees.jsx` | src/platform/vision-employees.jsx:45 («Виктория Войтович») | — |
| Сотрудники / Плашка статистики | `13345:19330` | 1 | `StatsStrip` | `components/employees.jsx` | src/platform/vision-employees.jsx:259 («за неделю») | — |
| Сотрудники / Строка данных | `13345:19335` | 1 | `DataRow` | `components/employees.jsx` | src/platform/vision-employees.jsx:291 («Доступ») | — |
| Сотрудники / Строка истории | `13345:19350` | 1 | `HistoryRow` | `components/employees.jsx` | src/platform/vision-employees.jsx:22 («Проверить запись») | — |
| Сотрудники / Ссылка · отключить сотрудника | `13345:19357` | 1 | `DisconnectLink` | `components/employees.jsx` | src/platform/vision-employees.jsx:431 («Отключить сотрудника») | — |
| Фильтры / Чип | `14414:45362` | 2 | `FilterChip` | `components/lists.jsx` | — | — |
| Фильтры / Поиск | `14414:45369` | 1 | `FilterSearch` | `components/lists.jsx` | src/platform/vision-employees.jsx:1222 («Искать») | — |
| Аватар / Буква | `14416:45346` | 18 | `LetterAvatar` | `components/lists.jsx` | — | — |
| Статус / Точка | `14423:46214` | 3 | `StatusDot` | `components/lists.jsx` | src/platform/vision-employees.jsx:242 («работает») | — |
| Список / Плитка · Процесс | `14444:47355` | 1 | `TileProcess` | `components/lists.jsx` | — | — |
| Список / Плитка · AI-агент | `14444:47359` | 1 | `TileAiAgent` | `components/lists.jsx` | — | — |
| Список / Строка | `14444:47431` | 4 | `ListRow` | `components/lists.jsx` | src/platform/process-pages.jsx:445 («Сбор отзывов») | — |
| Аватар / Mary | `14451:4711` | 1 | `MaryAvatar` | `components/lists.jsx` | — | — |
| Фильтры / Панель | `14458:79306` | 1 | `FilterPanel` | `components/lists.jsx` | src/platform/vision-demo.jsx:985 («7 дней») | — |
| Список / Плитка · Запись клиента | `14462:59378` | 1 | `TileBooking` | `components/lists.jsx` | — | — |
| Список / Плитка · Напоминание о визите | `14462:59388` | 1 | `TileVisitReminder` | `components/lists.jsx` | — | — |
| Список / Плитка · Ответы на вопросы | `14462:59399` | 1 | `TileFaq` | `components/lists.jsx` | — | — |
| Список / Плитка · Отзывы после визита | `14462:59409` | 1 | `TileReviews` | `components/lists.jsx` | — | — |
| Список / Плитка · Возврат ушедших | `14462:59421` | 1 | `TileWinBack` | `components/lists.jsx` | — | — |
| Список / Плитка · Сроки и продления | `14462:59432` | 1 | `TileRenewals` | `components/lists.jsx` | — | — |
| Список / Плитка · Перенос записи | `14462:59443` | 1 | `TileReschedule` | `components/lists.jsx` | — | — |
| Список / Плитка · Акты и счета контрагентам | `14462:59455` | 1 | `TileInvoices` | `components/lists.jsx` | — | — |
| Список / Плитка · Ответ на претензию | `14462:59461` | 1 | `TileClaimReply` | `components/lists.jsx` | — | — |
| Calendar | `12534:430008` | 1 | `AnalyticsCalendar` | `components/analytics.jsx` | src/platform/vision-demo.jsx:985 («7 дней») | — |
| Шапка аналитики | `12534:429443` | 1 | `AnalyticsHeader` | `components/analytics.jsx` | src/platform/vision-demo.jsx:1539 («Аналитика») | — |
| Аналитика / Метрика | `14453:61335` | 3 | `AnalyticsMetric` | `components/analytics.jsx` | src/platform/process-pages.jsx:319 («Обращения») | — |
| Main_button | `12639:34654` | 2 | `KbMainButton` | `components/kb.jsx` | src/platform/vision-home.jsx:906 («Спросить у Mary») | — |
| Вход / Поле ввода | `13481:19740` | 4 | `LoginInput` | `components/login.jsx` | src/platform/vision-join.jsx:150 («Имя и фамилия») | — |
| Вход / Подсказка под полем | `13481:19748` | 3 | `LoginHint` | `components/login.jsx` | — | — |
| Вход / Кнопка Google | `13481:19758` | 1 | `LoginGoogleButton` | `components/login.jsx` | src/platform/vision-join.jsx:169 («Войти через Google») | — |
| Вход / Кнопка · почта | `13481:19778` | 2 | `LoginEmailButton` | `components/login.jsx` | src/platform/vision-join.jsx:209 («Продолжить по почте») | — |
| Вход / Разделитель «или» | `13481:19782` | 1 | `LoginOrDivider` | `components/login.jsx` | — | — |
| Вход / Сноска под кнопкой | `13481:19786` | 1 | `LoginFootnote` | `components/login.jsx` | src/platform/vision-join.jsx:214 («Ссылка работает 7 дней») | — |
| Вход / Данные приглашения · строка | `13481:19790` | 1 | `LoginInviteRow` | `components/login.jsx` | src/platform/vision-join.jsx:140 («Должность:») | — |
| Вход / Юридическая строка | `13481:19794` | 1 | `LoginLegal` | `components/login.jsx` | — | — |
| Вход / Логотип | `13481:19802` | 1 | `LoginLogo` | `components/login.jsx` | src/platform/vision-employees.jsx:43 («mary») | — |
| Вход / Назад · шапка | `13481:19809` | 1 | `LoginBack` | `components/login.jsx` | src/platform/vision-demo.jsx:3652 («Назад») | — |
| Вход / Визуал | `13481:19896` | 1 | `LoginVisual` | `components/login.jsx` | — | — |
| integration | `13760:29574` | 1 | `IntegrationCard` | `components/integrations.jsx` | src/platform/vision-employees.jsx:590 («YCLIENTS») | — |
| Карточка интеграции · подключено | `13773:27816` | 1 | `IntegrationCardConnected` | `components/integrations.jsx` | src/platform/vision-employees.jsx:590 («YCLIENTS») | — |
| Шапка · чат · телефон | `14182:51902` | 1 | `MobileChatHeader` | `components/mobile.jsx` | — | — |
| Статус-бар · телефон | `14182:51916` | 1 | `MobileStatusBar` | `components/mobile.jsx` | — | — |
| Панель браузера · телефон | `14182:51899` | 1 | `MobileBrowserBar` | `components/mobile.jsx` | src/platform/vision-employees.jsx:43 («maryrose.by») | — |
| Меню · телефон | `14182:51900` | 1 | `MobileMenu` | `components/mobile.jsx` | src/platform/vision-pages.jsx:195 («Главная») | — |
| Поле ввода · телефон | `14182:51901` | 1 | `MobileChatInput` | `components/mobile.jsx` | src/platform/vision-demo.jsx:4224 («Напишите что угодно») | — |
| Шапка · меню · телефон | `14182:51917` | 1 | `MobileMenuHeader` | `components/mobile.jsx` | — | — |
| Шапка · раздел · телефон | `14187:44615` | 1 | `MobileSectionHeader` | `components/mobile.jsx` | src/platform/vision-employees.jsx:313 («Сотрудники») | — |
| Плашка подсказок · телефон | `14192:30410` | 1 | `MobileHintPill` | `components/mobile.jsx` | src/platform/vision-demo.jsx:4179 («Показать») | — |
| Варианты ответа · телефон | `14192:30426` | 1 | `MobileAnswerOptions` | `components/mobile.jsx` | — | — |
| Попап подтверждения · телефон | `14192:30450` | 1 | `MobileConfirmPopup` | `components/mobile.jsx` | src/platform/vision-demo.jsx:5189 («Архивировать чат?») | — |
| Меню чата · телефон | `14192:30489` | 1 | `MobileChatMenu` | `components/mobile.jsx` | src/platform/vision-demo.jsx:538 («История чатов») | — |
| Поиск | `14061:56010` | 2 | `MobileSearch` | `components/mobile.jsx` | src/platform/vision-employees.jsx:1362 («Поиск») | ⚑ оба варианта называются Default — различаются текстом; вариант выбирается пропом index |
| Шапка · база знаний · телефон | `14210:30471` | 1 | `MobileKbHeader` | `components/mobile.jsx` | src/platform/vision-pages.jsx:174 («База знаний») | — |
| Поиск и + · телефон | `14210:30491` | 1 | `MobileSearchAndAdd` | `components/mobile.jsx` | src/platform/vision-employees.jsx:1362 («Поиск») | — |
| Вкладки · библиотека · телефон | `14210:30481` | 1 | `MobileLibraryTabs` | `components/mobile.jsx` | src/platform/vision-kb.jsx:21 («Папки») | — |
| Chat | `14278:57550` | 1 | `MobileChatRow` | `components/mobile.jsx` | src/platform/vision-employees.jsx:982 («Спросить Mary») | — |
| Меню | `14289:31369` | 1 | `MobileMenuChatHistory` | `components/mobile.jsx` | src/platform/vision-demo.jsx:538 («История чатов») | — |
| Тариф и оплата | `14182:51918` | 1 | `MobilePlanRow` | `components/mobile.jsx` | src/platform/vision-demo.jsx:3471 («Тариф и оплата») | — |
| Профиль · карточка | `14182:51919` | 1 | `MobileProfileCard` | `components/mobile.jsx` | src/platform/vision-employees.jsx:42 («Александр Лукашевич») | — |
| Меню | `14309:33184` | 1 | `MobileMenuEmployeeRow` | `components/mobile.jsx` | src/platform/vision-employees.jsx:1311 («Открыть страницу») | ⚑ локальное меню внутри мобильного экрана; имя «Меню» повторяется 4 раза |
| Меню | `14309:32873` | 1 | `MobileMenuAddManual` | `components/mobile.jsx` | src/platform/vision-employees.jsx:1194 («Добавить вручную») | ⚑ локальное меню внутри мобильного экрана |
| Меню | `14313:38620` | 1 | `MobileMenuAddViaMary` | `components/mobile.jsx` | src/platform/vision-employees.jsx:1194 («Добавить вручную») | ⚑ локальное меню внутри мобильного экрана |
| Меню | `14313:40376` | 1 | `MobileMenuAddList` | `components/mobile.jsx` | src/platform/vision-employees.jsx:1194 («Добавить вручную») | ⚑ локальное меню внутри мобильного экрана |

⚑ — особенность набора в Figma (дубль, состояние отдельным компонентом, одинаковые имена вариантов). ⛔ — не перенесён.

## Токены

| CSS-переменная | Светлая | Где |
|---|---|---|
| `--btn` | #0E0E0F | основная кнопка, включённый тогл, отмеченный чекбокс |
| `--on-btn` | #FFFFFF | текст и галочка на `--btn` |
| `--text` | #494F5C | основной текст и иконки в активном состоянии |
| `--text-2` / `--text-muted` | ink 50% | иконки и подписи в покое, link-кнопка |
| `--text-3` / `--text-ghost` | ink 30% | мета строки файла, подпись меню |
| `--surface` / `--hover` / `--user-bubble` | ink 5% | подложка hover, active и selected |
| `--bg-panel` | #FFFFFF | фон полей и обводочной кнопки |
| `--accent` | #0064FF | чекбокс выбора файлов, тогл темы |
| `--danger` | #FF1E00 | «Удалить», ошибка поля |
| `--line-10` | ink 10% | рамка поля, обводочной кнопки и чипа |
| `--line-14` | ink 14% | рамка поиска на hover и focus |
| `--line-20` | ink 20% | рамка поля переименования |
| `--grey-55` | ink 55% | неактивный сегмент и чип, подпись поля CRM |
| `--ghost-35` | ink 35% | счётчик в сегменте, пустой select, текст выключенной primary |
| `--tooltip-bg` | rgba(30,30,35,.88) | тёмная подсказка под иконкой |
| `--glass-bg` / `--glass-bg-hover` | popover 55% / 80% | стеклянная кнопка |
| `--pop-bg`, `--pop-shadow` | popover 90%, `0 10px 28px rgba(20,22,30,.14)` | плашка меню |
| ⚑ `--pressed` | ink 8% | нажатие на прозрачных кнопках |
| ⚑ `--focus-ring` | `0 0 0 3px rgba(accent,.24)` | кольцо фокуса с клавиатуры |
| `--disabled-opacity` | 0.4 | так выключена «Создать» в CRM |

`ink` = `rgba(var(--ink-rgb), α)`, где `--ink-rgb: 73,79,92`. Шрифт системный (SF Pro), кегли только целые.

## Ручной код: значения по компонентам (components/states.jsx)

### Button — `variant` × `size`
Общее: высота 32 (`md`) или 30 (`sm`), кегль 13/500, gap 6, радиус 40. С иконкой отступы `0 14 0 11`, без иконки `0 14`.

| variant | Default | Hover | Pressed | Focus | Disabled |
|---|---|---|---|---|---|
| primary | bg `--btn`, текст `--on-btn` | ⚑ opacity .88 | ⚑ opacity .78 | ⚑ `--focus-ring` | bg ink 6%, текст ink 35% (как «Заполнить» в CRM) |
| secondary | bg `--bg-panel`, рамка 1px `--line-10`, текст `--text` | ⚑ bg `--surface`, рамка `--line-14` | ⚑ bg `--pressed` | ⚑ ring | ⚑ opacity .4 |
| ghost («История чатов») | h30, отступы 0 10, радиус 9, 13/450, `--text-muted`, иконка 15/1.8 | bg `--surface`, `--text` | ⚑ `--pressed` | ⚑ ring | ⚑ `--text-3` |
| link («Показать все 12») | отступы 0 4, `--text-muted`, шеврон 14/1.8 | `--text` | ⚑ opacity .7 | ⚑ ring | ⚑ `--text-3` |

Источник: `vision-crm.jsx` Btn и crm-fill, `vision-demo.jsx` «История чатов», `vision-files.jsx` sec-more. В коде «Создать» выключается обёрткой с opacity .4. В пакете для primary disabled взят вариант crm-fill.

### IconButton · PlusButton · MoreButton
| | square (шапка «Данных», «+») | round (поиск, фильтр) |
|---|---|---|
| размер | 30×30, радиус 10 | 34×34, круг; телефон 44 |
| иконка | 15 / 1.7, у «+» 16 / 1.9 | 17 / 1.7 |
| Default | прозрачная, `--text-muted` | то же |
| Hover | bg `--surface`, `--text`, тёмная подсказка снизу (+6, 11/400, отступы 3 7, радиус 5) | bg `--surface`, `--text` |
| Active (вкл. или меню открыто) | bg `--surface`, `--text` | bg ink 5%, `--text` |
| Pressed | ⚑ bg `--pressed` | ⚑ |
| Focus | ⚑ ring | ⚑ |
| Disabled | opacity .35 (как стрелка «Назад» на 1-й странице в FileBar) | то же |

MoreButton «⋯»: 30×30, точки 18 (r 1.6), `--text-muted`. ⚑ В коде у «⋯» нет hover. Предложено как у IconButton: подложка и радиус 10.

### GlassButton
40×40, круг, bg `--glass-bg` (blur 22, saturate 160%), рамка ink 7%, иконка 17/1.5, цвет `--text`.
Hover: bg `--glass-bg-hover`. ⚑ Pressed: bg `--pop-bg` + scale .96. ⚑ Focus: ring. Disabled: opacity .35.

### Chip
| variant | размер | Default | Selected | Hover |
|---|---|---|---|---|
| filter (Недавние / Избранное) | h30, отступы 0 12, радиус 999, 13/500 | прозрачный, ink 55% | bg `--surface`, `--text` | ⚑ bg ink 3%, `--text` (как строка папки в kb-picker) |
| choice (этап сделки) | h32, отступы 0 14, радиус 40 | рамка `--line-10`, `--text` | bg `--btn`, `--on-btn` | ⚑ bg `--surface`, рамка `--line-14` |
| removable («Документы ×») | h33 (телефон 36), отступы 0 10 0 13 | bg `--bg-panel`, рамка `--line-10`, × 13/2.2 | — | ⚑ bg `--surface` |

⚑ Pressed, focus и disabled (opacity .4) предложены.

### Segmented (Seg)
Пункты с gap 4. Пункт: h32, отступы 0 14, радиус 40, 13/500, gap 6. Счётчик ink 35%, табличные цифры.
Selected: bg `--surface`, `--text`. Default: прозрачный, ink 55%. ⚑ Hover: bg ink 3%, `--text`. ⚑ Pressed, focus, disabled.

### Tab
h30, радиус 10, maxWidth 190, gap 8, плитка файла 22 (bare). Отступы `0 12 0 8`, с крестиком `0 6 0 8`.
- Default: прозрачный, 13/450, `--text-muted`.
- Hover: появляется крестик (20×20, иконка 13/2.2, `--text-muted`, на hover `--text`). Фон не меняется, так в коде.
- Active: bg `--user-bubble`, 13/500, `--text`, крестик виден всегда.
- Разделитель между неактивными: 1×16, ink 12%, поля 0 6. Рядом с активной вкладкой он прозрачный.
- ⚑ Pressed: bg `--surface`. ⚑ Focus: ring.

### SearchField (`data-test="panel-search"`)
h34, отступы 0 14, радиус 33, gap 4, bg `--bg-panel`, рамка 1px. Телефон: h44, радиус 60, кегль 16. Иконка 18/1.7, ввод 14/500.

| state | рамка | иконка |
|---|---|---|
| collapsed | — (кнопка round 34) | 17 / 1.7, `--text-muted` |
| default | ink 10% | ink 50% |
| hover | ink 14% | ink 50% |
| focus | ink 14% | ink 80% |
| filled | ink 10% (14% при hover/focus) | ink 80% + «×» 20×20 (12/2.2, ink 50%) |
| ⚑ disabled | ink 10%, bg `--surface`, opacity .6 | — |

Esc очищает поле и снимает фокус. ⚑ Плейсхолдер `--text-2`: в прототипе остался системный цвет.

### TextField (поля формы CRM NewRecord)
Подпись 12/500, ink 55%, gap 6. Поле: h40, радиус 12, отступы 0 12, 14/500, `--text`, bg `--bg-panel`, рамка `--line-10`.
Select: то же + шеврон 14 справа (отступ 12). Пустой select — ink 35%.

| state | значение |
|---|---|
| default | рамка ink 10% |
| filled | рамка ink 10%, текст `--text` |
| ⚑ hover | рамка ink 14% (как у поиска) |
| ⚑ focus | рамка ink 20% (как у поля переименования) |
| ⚑ error | рамка `--danger`. Подсказка 12px `--danger` под полем: она есть в коде, как «Пароли не совпадают» на входе |
| ⚑ disabled | bg `--surface`, текст `--text-3` |

`size="inline"` — поле переименования в строке файла: h22, отступы 0 6, margin-left −6, радиус 6, 13/500, рамка ink 20%. Enter сохраняет, Esc отменяет.

### ChatInput (MaryInputBox)
Контейнер: bg `--bg-panel`, рамка 1px ink 9%, радиус 22, отступ 12, колонка с gap 12. Текст 15/450, межстрочный 1.45, растёт до 208px.
Ряд действий, gap 10:
- «+» — 28, круг, рамка ink 16%, ink 70%, иконка 14/1.9;
- микрофон — 28, радиус 7, ink 50%, 16/1.7;
- отправить — 30, круг, стрелка 16/2.2 белая.

| state | что меняется |
|---|---|
| empty | отправить: bg ink 35%, not-allowed |
| text | отправить: bg `--btn` |
| file | над текстом карточка: отступы 8 36 8 8, радиус 16, рамка ink 10%, плитка 40, имя 14/500, формат 12 `--text-3`; «×» 18 (bg `--btn`) в углу 8/8 |
| voice: recording | «отмена» 30 bg `--surface` · волна (палочки 2.4, gap 3.5, ink 22%/42%) · «стоп» 30 · отправить ink 35% |
| voice: decoding | вместо волны «Расшифровка» 14, ink 62%, по центру + спиннер |
| loading | вместо отправки «стоп» 34, bg `--btn`, квадрат 11 |
| ⚑ hover / focus | рамка ink 12% / 16% |
| ⚑ disabled | opacity .6 |

### Toggle
| size | трек | бегунок | вкл. |
|---|---|---|---|
| md (правила CRM) | 36×20, радиус 999 | 16, белый, top 2, left 2 → 18 | `--btn` |
| sm (тёмная тема в меню) | 30×18 | 14, left 2 → 14 | `--accent` |

Выкл.: ink 15% (md) или 18% (sm). Анимация .15s.
⚑ Hover: выкл. ink 22%/24%, вкл. opacity .88. ⚑ Pressed: бегунок шире на 3. ⚑ Focus: ring. ⚑ Disabled: opacity .4.
В коде у выключенного правила CRM вся строка уходит в opacity .6. Это состояние строки, а не тогла.

### Checkbox
| size | бокс | радиус | рамка выкл. | вкл. | где |
|---|---|---|---|---|---|
| sm | 16 | 5 | 1.5px ink 18% | `--btn` | таблица CRM (crm-check), «Создать ещё одну» (25%) |
| md | 18 | 6 | 1.5px ink 20% | `--btn` | поля CRM |
| lg | 20 | 7 | 1.5px ink 25% | `--accent` | выбор файлов (kbp-check) |

Галочка 12/2.6. Цвет `--on-btn`, на accent белая.
- **Locked** (disabled + checked): bg ink 30%. Есть в коде: обязательное поле «Название» нельзя снять.
- `light` (на фото): рамка #fff, bg rgba(0,0,0,.18).
- kbp-check скрыт до наведения на строку: opacity 0 → 1 за .12s. Когда что-то выбрано, его видно у всех строк.
- ⚑ Hover: рамка ink 35%. ⚑ Pressed: scale .92. ⚑ Focus: ring. ⚑ Disabled unchecked: bg `--surface`, рамка ink 12%.

### Menu + MenuRow (menu.jsx POP/PopRow)
Плашка: bg `--pop-bg` с blur 18, рамка ink 10%, радиус 20, отступ 6, тень `--pop-shadow`.
Разделитель: 1px ink 8%, поля 4 6. Подпись группы: 12, `--text-3`, отступы 4 10 6.

Строка: h31 (телефон 38), отступы 0 10, радиус 999, gap 10, кегль 13 (телефон 15), вес 400 (наследуется). Иконка 16/1.5, opacity .75.

| state | значение |
|---|---|
| default | прозрачный, `--text` |
| hover | bg `--surface` |
| on (выбран) | bg `--surface` + галочка справа 14/2.2 |
| danger | `--danger`, иконка opacity 1, hover тот же |
| ⚑ pressed | bg `--pressed` |
| ⚑ focus | bg `--surface` (навигация стрелками) |
| ⚑ disabled | `--text-3`, без hover |

### FileRow (строка в «Данных»)
gap 12, отступы 6 4 (телефон 10 4), радиус 12.
Состав строки:
- плитка 36;
- имя 13/500 `--text` (телефон 15);
- мета 12 `--text-3` («PDF · 1,2 МБ»);
- плашка «новый» (10 минут после создания): h20, отступы 0 8, ink 6%, 12/500 `--text-muted`;
- «⋯» 30×30.

| state | значение |
|---|---|
| default | прозрачная |
| ⚑ hover | bg `--surface`. В прототипе подложки нет, предложено как у строки kb-picker |
| menu open | «⋯» active + меню (min 200) под строкой справа, top 100%−6: Скачать · Переименовать · Изменить в чате · Удалить (danger) |
| renaming | имя заменено на `TextField size="inline"` |

## Что предложено (⚑), сводка
1. **Pressed** у всех кнопок, чипов, строк меню, тогла и чекбокса: в прототипе нет ни одного pressed.
2. **Focus-ring** с клавиатуры (`--focus-ring`, синее кольцо 3px 24%) у всех интерактивных элементов: в прототипе `outline: none` и колец нет. Исключения есть в коде: поиск (рамка 14%) и поле переименования.
3. **Hover**:
   - secondary-кнопка;
   - чипы filter / choice / removable;
   - сегмент;
   - «⋯»;
   - строка файла;
   - поля формы CRM;
   - тогл и чекбокс;
   - рамка ChatInput.
4. **Disabled**:
   - secondary, ghost и link-кнопки;
   - чипы и сегмент;
   - вкладка;
   - поиск и поля формы;
   - строка меню;
   - тогл;
   - чекбокс без галочки;
   - ChatInput.
5. **Error** у полей формы: рамка `--danger`. Текст ошибки под полем есть в коде (экран входа).
6. Цвет плейсхолдера `--text-2`.
