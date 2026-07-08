const items = ['Avenue Estate', 'Poznań', 'Wynajem', 'Sprzedaż', 'Pod klucz', 'Marketing']

export default function Marquee() {
  const row = (key) => (
    <span key={key}>
      {items.map((it, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 48 }}>
          {it} <span className="dot" aria-hidden="true">✦</span>
        </span>
      ))}
    </span>
  )
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{row(1)}{row(2)}</div>
    </div>
  )
}
