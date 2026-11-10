// Mary UI · Боковой чат с Mary — сгенерировано из Figma o1syNp93H3v2dyA3JHp4em (5 компонентов).
// Значения 1:1 из макета: auto-layout, отступы, радиусы, цвета (переменные «Mary / Тема» → CSS var), тексты, иконки SVG.
// Пропы = свойства Figma (см. README). Не править руками — перегенерировать.
import { figmaComponent } from "./core/figma-node.jsx";
import DATA from "../data/sidechat.json";

/** side-chat / window · Figma 12902:16210 · пропы: state=conversation|empty|tabs|history|withFile|typing|docked|withText */
export const SideChatWindow = figmaComponent(DATA["SideChatWindow"]);
/** side-chat / composer · Figma 12916:15868 · пропы: state=empty|withFile */
export const SideChatComposer = figmaComponent(DATA["SideChatComposer"]);
/** side-chat / tab · Figma 12916:15876 · пропы: active=true|false */
export const SideChatTab = figmaComponent(DATA["SideChatTab"]);
/** side-chat / history-row · Figma 12916:15885 · пропы: active=true|false */
export const SideChatHistoryRow = figmaComponent(DATA["SideChatHistoryRow"]);
/** side-chat / icon-button · Figma 12916:28735 · пропы: state=default|hover */
export const SideChatIconButton = figmaComponent(DATA["SideChatIconButton"]);
