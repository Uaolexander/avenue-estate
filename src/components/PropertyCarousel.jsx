import { useCallback, useEffect, useRef, useState } from 'react'
import PropertyCard from './PropertyCard.jsx'

// як довго підсвічена одна картка, перш ніж черга перейде до наступної
const STEP_MS = 1900

/*
  Горизонтальна стрічка оферт.

  Стрічка рівномірно їде сама, а підсвіченою стає та картка, яка опинилась
  посередині видимої області. Підсвітку не призначаємо вручну — вона рахується
  з фактичного положення стрічки, тому ніколи не дістається боковій картці
  й не виглядає випадковою.

  Два правила, без яких блок ламає всю сторінку:
  1. Прокручуємо лише саму стрічку (scrollBy на ній), ніколи не scrollIntoView —
     той тягне за собою вікно й перекидає читача на цей блок.
  2. Черга йде тільки поки стрічку видно на екрані. Інакше вона крутиться
     у фоні й смикає сторінку, поки людина читає зовсім інший блок.
*/
export default function PropertyCarousel({ items }) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [active, setActive] = useState(0)
  const rafRef = useRef(0)
  // ширина одного кроку стрічки — картка плюс проміжок між картками
  const cardStep = useCallback(() => {
    const track = trackRef.current
    if (!track) return 0
    const card = track.querySelector('.prop-card')
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    return card ? card.offsetWidth + gap : track.clientWidth * 0.8
  }, [])

  /*
    Підсвічену картку не призначаємо — її визначає саме положення стрічки:
    беремо ту, чия середина найближча до середини видимої області. Тому
    підсвітка завжди рівно посередині й ніколи не стрибає на бокову.
  */
  const syncActive = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const style = getComputedStyle(track)
    const padLeft = parseFloat(style.paddingLeft) || 0
    const padRight = parseFloat(style.paddingRight) || 0
    const rect = track.getBoundingClientRect()
    const centre = rect.left + padLeft + (rect.width - padLeft - padRight) / 2

    let best = 0
    let bestDist = Infinity
    for (let i = 0; i < track.children.length; i++) {
      const r = track.children[i].getBoundingClientRect()
      const dist = Math.abs((r.left + r.right) / 2 - centre)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    }
    setActive(best)
  }, [])

  const onScroll = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      syncActive()
    })
  }, [syncActive])

  // стрілка зсуває стрічку на одну картку; підсвітка перерахується сама
  const nudge = useCallback((dir) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * cardStep(), behavior: 'smooth' })
  }, [cardStep])

  /*
    Стежимо, чи стрічка взагалі на екрані.

    items.length у залежностях обовʼязково: оферти приходять із затримкою, і на
    першому проході компонент ще повертає null. Без цього спостерігач чіплявся
    до неіснуючого блоку, більше не перезапускався — і черга не рушала ніколи.
  */
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    // достатньо, щоб на екрані була будь-яка частина стрічки
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [items.length])

  // черга: просто рівномірно зсуваємо стрічку, з кінця вертаємось на початок
  useEffect(() => {
    if (paused || !onScreen || items.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      const track = trackRef.current
      if (!track) return
      const max = track.scrollWidth - track.clientWidth
      if (track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: 'smooth' })
      else track.scrollBy({ left: cardStep(), behavior: 'smooth' })
    }, STEP_MS)
    return () => clearInterval(id)
  }, [paused, onScreen, items.length, cardStep])

  // початкова підсвітка, коли картки вже відрендерились
  useEffect(() => {
    if (items.length) syncActive()
  }, [items.length, syncActive])

  if (items.length === 0) return null

  return (
    <div
      className="carousel"
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={(e) => {
        // тільки для клавіатури: після кліку мишею фокус лишався на стрілці
        // й підсвітка більше ніколи не рушала далі
        if (e.target?.matches?.(':focus-visible')) setPaused(true)
      }}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="carousel-track" ref={trackRef} onScroll={onScroll}>
        {items.map((item, i) => (
          <PropertyCard key={item.id} item={item} active={i === active} animate={false} />
        ))}
      </div>

      <button
        className="carousel-arrow prev"
        onClick={() => nudge(-1)}
        aria-label="←"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        className="carousel-arrow next"
        onClick={() => nudge(1)}
        aria-label="→"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
