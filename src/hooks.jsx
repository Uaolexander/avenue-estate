import { useEffect, useRef, useState } from 'react'

// Adds .is-in when the element scrolls into view (used with .reveal / .reveal-line)
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}s` }} {...rest}>
      {children}
    </Tag>
  )
}

/*
  Легкий паралакс: картинка всередині рамки рухається повільніше за сторінку.
  Рахуємо тільки у кадрах анімації, щоб не смикати layout на кожен піксель скролу.
*/
export function useParallax(strength = 60) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    const update = () => {
      ticking = false
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.bottom < 0 || rect.top > vh) return
      // -1 коли блок унизу екрана, +1 коли вгорі
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)
      el.style.setProperty('--shift', `${(-progress * strength).toFixed(1)}px`)
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [strength])

  return ref
}

// Тонка смужка вгорі, що показує, скільки сторінки вже прогорнуто.
export function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p.toFixed(4)})`
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div className="scroll-progress" aria-hidden="true"><span ref={ref} /></div>
}

/*
  Число зʼявляється так само, як великий напис на першому екрані: кожен знак
  підіймається з-під рядка, розмиття сходить, знаки йдуть один за одним.
  Спокійніше й дорожче, ніж механічний лічильник, і в одній мові з рештою сайту.
*/
export function RisingNumber({ value, step = 0.07 }) {
  const ref = useReveal()

  return (
    <span className="rise" ref={ref} aria-label={String(value)}>
      {[...String(value)].map((char, i) => (
        <span className="rise-slot" key={i} aria-hidden="true">
          <span className="rise-char" style={{ '--d': `${(i * step).toFixed(2)}s` }}>
            {char}
          </span>
        </span>
      ))}
    </span>
  )
}

/*
  Слово, розібране на окремі букви: кожна прилітає знизу з невеликим поворотом
  і розмиттям, одна за одною. Анімація запускається, коли предок отримує
  клас .is-in (це робить useReveal).
  Для читалок віддаємо ціле слово через aria-label, а самі букви ховаємо —
  інакше вони озвучувались би по одній.
*/
export function SplitText({ text, delay = 0, step = 0.055, className = '' }) {
  return (
    <span className={`split ${className}`} aria-label={text}>
      {[...text].map((char, i) => (
        <span
          className="split-char"
          key={i}
          aria-hidden="true"
          style={{ '--d': `${(delay + i * step).toFixed(3)}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

export function useProperties() {
  const [data, setData] = useState({ updated: null, items: [] })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}properties.json?v=${Date.now()}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])
  return { ...data, loading }
}
