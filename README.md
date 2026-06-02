# Битрикс24 для АССО-Строй · Презентация

Интерактивная презентация-приложение: как Битрикс24 закрывает процессы застройщика —
продажи, внутренний контур стройки и клиентский сервис. С живым демо интерактивной
шахматки квартир, связанной с CRM.

Стек: **Vite + React + Tailwind CSS**. Дизайн — Editorial Luxury.

## Локально

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # сборка в dist/
npm run preview  # предпросмотр прод-сборки
```

## Управление

- **→ / ← / Space / свайп** — листать слайды
- **точки внизу** — переход к слайду
- **Home / End** — первый / последний слайд

## Деплой на GitHub Pages

Уже настроен GitHub Actions (`.github/workflows/deploy.yml`):

1. Создать репозиторий на GitHub и запушить:
   ```bash
   git remote add origin https://github.com/<user>/asso-b24.git
   git push -u origin main
   ```
2. В репозитории: **Settings → Pages → Source → GitHub Actions**.
3. Каждый push в `main` пересобирает и публикует презентацию.

`base: "./"` в `vite.config.js` делает пути относительными — работает на любом подпути Pages.

## Структура

| Файл | Что |
|------|-----|
| `src/App.jsx` | контроллер слайдов (навигация, прогресс) |
| `src/slides.jsx` | все 20 слайдов + порядок |
| `src/Shahmatka.jsx` | живое демо: шахматка квартир → бронь в CRM |
| `src/ui.jsx` | дизайн-система (иконки, карточки, кнопки) |

---
Команда ЛАЙМ · limecrm.ru · Битрикс24 и amoCRM «под ключ»
