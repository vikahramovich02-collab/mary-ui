// Mary UI · Чат — сгенерировано из Figma o1syNp93H3v2dyA3JHp4em (19 компонентов).
// Значения 1:1 из макета: auto-layout, отступы, радиусы, цвета (переменные «Mary / Тема» → CSS var), тексты, иконки SVG.
// Пропы = свойства Figma (см. README). Не править руками — перегенерировать.
import { figmaComponent } from "./core/figma-node.jsx";
import DATA from "../data/chat.json";

/** Вариант ответа · Figma 12313:233405 · пропы: state=Дефолт|Наведение|Нажатие|Фокус */
export const AnswerOption = figmaComponent(DATA["AnswerOption"]);
/** Поле ввода · Figma 12313:233414 · пропы: state=Пусто|Файл|Текст|Изображение|Несколько файлов|Запись|Отправка|Расшифровка|Много текста|Скролл|Таблица|Наведение|Фокус|Выключено */
export const ChatComposer = figmaComponent(DATA["ChatComposer"]);
/** Плашка действия · Figma 12313:233737 · пропы: state=Дефолт|Наведение|Активная */
export const ActionChip = figmaComponent(DATA["ActionChip"]);
/** История чатов · Figma 12313:233747 · пропы: state=Дефолт|Наведение|Активная */
export const ChatHistoryRow = figmaComponent(DATA["ChatHistoryRow"]);
/** Кнопка панели · Figma 12313:233768 · пропы: state=Дефолт|Наведение|Активная */
export const PanelButton = figmaComponent(DATA["PanelButton"]);
/** Плитка файла · Figma 12313:233792 · пропы: type=PDF|DOCX|MD|XLSX|CSV|PNG|JPG */
export const FileTypeTile = figmaComponent(DATA["FileTypeTile"]);
/** Вложение · Figma 12313:233828 · пропы: type=PDF|DOCX|MD|XLSX|CSV|Изображение */
export const Attachment = figmaComponent(DATA["Attachment"]);
/** Вкладка чата · Figma 12313:233863 · пропы: state=Дефолт|Наведение|Активная|Нажатие|Фокус */
export const ChatTab = figmaComponent(DATA["ChatTab"]);
/** Кнопка нового чата · Figma 12313:233887 · пропы: state=Дефолт|Наведение|Нажатие|Фокус|Активная|Выключено */
export const NewChatButton = figmaComponent(DATA["NewChatButton"]);
/** Шапка чата · Figma 12313:233895 · пропы: state=Обычная|Много вкладок|Меню открыто */
export const ChatHeader = figmaComponent(DATA["ChatHeader"]);
/** Источники · Figma 12313:233942 · пропы: state=Свёрнуто|Раскрыто */
export const Sources = figmaComponent(DATA["Sources"]);
/** Очередь сообщений · Figma 12313:233994 · пропы: count=1|2|3 */
export const MessageQueue = figmaComponent(DATA["MessageQueue"]);
/** Работа Mary · Figma 12313:234060 · пропы: state=Идёт|Готово */
export const MaryWork = figmaComponent(DATA["MaryWork"]);
/** Кнопка действия · Figma 12313:234115 · пропы: icon=Копировать|Нравится|Не нравится|Скачать|Поделиться, state=Дефолт|Наведение */
export const MessageActionButton = figmaComponent(DATA["MessageActionButton"]);
/** Боковая панель · Figma 12313:234154 · пропы: view=Документ|База знаний|Пусто */
export const SidePanel = figmaComponent(DATA["SidePanel"]);
/** Button · Figma 12990:42483 · пропы: variant=Добавить|Загрузить|Собрать отчет */
export const ChatButton = figmaComponent(DATA["ChatButton"]);
/** Search · Figma 13152:40993 · пропы: variant=Default */
export const ChatSearch = figmaComponent(DATA["ChatSearch"]);
/** Чат / Чат · пузырь запроса · Figma 13347:19063 */
export const UserBubble = figmaComponent(DATA["UserBubble"]);
/** Чат / Чат · ответ Mary · Figma 13347:19082 */
export const MaryReply = figmaComponent(DATA["MaryReply"]);
