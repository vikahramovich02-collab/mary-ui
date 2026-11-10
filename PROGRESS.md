# Перенос всех компонентов Figma в ui-states — прогресс

Файл Figma o1syNp93H3v2dyA3JHp4em. Компоненты: Mary Platform — 114 (из них 12 «Состояния / …» уже в коде вручную), Design System — 58 (37 иконок + 21 базовый). Всего 172.

## Как вынимаются данные (без копирования через контекст)
1. use_figma сериализует все компоненты страницы в JSON (layout, отступы, размеры, заливки с привязкой к переменным «Mary / Тема» → CSS var, обводки, радиусы, тени, тексты, иконки SVG), кодирует в base64 и кладёт во временные текстовые узлы «tmp-data-carrier …» (x=-300000) с exportSettings SVG без обводки текста.
2. download_assets по узлу → URL SVG → curl → python собирает tspan → base64 → JSON.
3. Временные узлы удаляются (по имени tmp-data-carrier).
Генератор кода: tools/gen.py.

## Сделано
- [x] Инвентарь (172 компонента), см. README.
- [x] Картинки: 9 файлов в assets/<sha1>.png|jpg (sha1 = imageHash Figma).
- [x] Сериализация v2 Mary Platform. Временные узлы удалены.
- [x] Сериализация v2 Design System. Временные узлы удалены.
- [x] Генератор: data/*.json + components/<раздел>.jsx + components/core/figma-node.jsx + index.js.
- [x] Витрина states.html: навигация, поиск, тёмная тема.
- [x] README: таблица Figma → код.
- [x] Playwright, скриншоты, rsync из handoff.

## Итог 01.11
- Перенесено 170 из 172: 12 ручным кодом (states.jsx) + 158 сгенерировано из Figma. Не перенесены 2 дубля сайдбара: menu_set/Развёрнуто и menu_set/Свёрнуто.
- Playwright: 13 разделов, 0 ошибок в консоли.
- Пересобрать код из выгрузки: `python3 tools/gen.py` (берёт tools/dl/mp2.json и ds2.json). Новая выгрузка из Figma — по схеме выше (carriers → download_assets → decode).
