# Avenue Estate

Сайт агенції нерухомості Avenue Estate (Познань). React + Vite, три мови (PL / UA / EN), оферти автоматично підтягуються з Telegram-каналу.

## Локальний запуск

```bash
npm install
npm run dev        # http://localhost:5173
```

## Оновлення офертів з Telegram

```bash
npm run sync       # парсить t.me/s/firststreetestate -> public/properties.json
```

На GitHub це робить workflow `sync-telegram.yml` кожні 3 години. Деплой на GitHub Pages відбувається автоматично при пуші в `main` (`deploy.yml`).

## Що треба замінити перед показом клієнту

- `src/config.js`: реальний телефон, e-mail, посилання на Facebook, адресат форми (formsubmit.co)
- `src/sections/Team.jsx`: імена та фото команди
- Графік роботи в `src/i18n.jsx` (ключ `contact.hoursValue`), якщо відрізняється

Форма працює через formsubmit.co: після першої відправки на вказану пошту прийде лист підтвердження, його треба відкрити один раз.
