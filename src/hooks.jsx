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
