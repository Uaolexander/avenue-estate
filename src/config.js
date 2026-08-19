// Central place for contact details and links.
// TODO: replace placeholder phone, e-mail and Facebook URL with the real ones from Diana.
export const CONTACT = {
  // Обидва номери агенції. Перший — основний, Діанин.
  phones: [
    { display: '+48 730 225 019', href: 'tel:+48730225019' },
    { display: '+48 731 118 044', href: 'tel:+48731118044' },
  ],
  email: 'dgodna@gmail.com',
  /*
    Куди приходять заявки з форми — листом через formsubmit.co.
    ВАЖЛИВО: після зміни адреси FormSubmit надсилає на неї один лист із
    підтвердженням. Поки в ньому не натиснути посилання, заявки не доходять.
  */
  formEndpoint: 'https://formsubmit.co/ajax/dgodna@gmail.com',
  /*
    Додатково заявки лягають рядком у Google-таблицю.
    Сюди треба вписати адресу веб-застосунку Apps Script — як її отримати,
    описано в docs/google-sheet.md. Поки поле порожнє, працює тільки пошта.
  */
  sheetEndpoint:
    'https://script.google.com/macros/s/AKfycbzgdr8bm1cX9G-1sslm0rrrafY1jaOtxottqnbLl4i_UlPyIDo2C3ZRCMzn5Ldh_onI9g/exec',
}

// Таблиця, куди збираються заявки (для довідки, у коді не використовується).
export const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1-PYb9eGIZ6eNs_NxOCEj1v9tWUjRgKo9pk28w1PHibg/edit'

export const SOCIALS = [
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/first_street.est/' },
  { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/first.street.estate/' },
  { id: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@first_street.est' },
  { id: 'telegram', label: 'Telegram', url: 'https://t.me/firststreetestate' },
]

export const TELEGRAM_CHANNEL = 'https://t.me/firststreetestate'

// Телеграм-бот агенції: підбирає оферти й приймає заявки.
export const TELEGRAM_BOT = 'https://t.me/Avenuerealestate_bot'
