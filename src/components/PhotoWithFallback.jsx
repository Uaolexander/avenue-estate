import { useEffect, useState } from 'react'

/*
  Картинка зі списком запасних варіантів.
  Пробує джерела по черзі: якщо перше не завантажилось (файлу немає або
  посилання з Telegram протухло) — бере наступне. Коли не спрацювало жодне,
  віддає children, тобто фірмову заглушку.

  Завдяки цьому фото інтерʼєру можна просто покласти у public/ і воно
  підхопиться саме, а поки його немає — стоїть знімок із актуальних оферт.
*/
export default function PhotoWithFallback({ sources = [], className = '', alt = '', children, ...rest }) {
  const list = sources.filter(Boolean)
  const [index, setIndex] = useState(0)

  // Якщо список джерел змінився (оферти довантажились), починаємо спочатку.
  useEffect(() => { setIndex(0) }, [list.join('|')])

  if (list.length === 0 || index >= list.length) return children ?? null

  return (
    <img
      key={list[index]}
      className={className}
      src={list[index]}
      alt={alt}
      loading="lazy"
      onError={() => setIndex((i) => i + 1)}
      {...rest}
    />
  )
}
