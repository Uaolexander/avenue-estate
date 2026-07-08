import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { Reveal, useProperties } from '../hooks.jsx'
import { TELEGRAM_CHANNEL } from '../config.js'
import PropertyCard from '../components/PropertyCard.jsx'

export default function Offers() {
  const { t } = useLang()
  const { items, updated, loading } = useProperties()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? items : items.filter((i) => i.type === filter)
  const filters = [
    { id: 'all', label: t.properties.all },
    { id: 'rent', label: t.properties.rent },
    { id: 'sale', label: t.properties.sale },
  ]

  return (
    <>
      <div className="page-head">
        <div className="container">
          <Link to="/" className="back-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M17 7L7 17M15 17H7V9" /></svg>
            Avenue Estate
          </Link>
          <Reveal as="h1" className="display section-title">{t.properties.title}</Reveal>
          <Reveal as="p" delay={0.1} style={{ color: 'var(--beige-dim)', maxWidth: '46ch', marginTop: 12 }}>
            {t.properties.lead}
          </Reveal>
        </div>
      </div>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="filter-row">
            {filters.map((fl) => (
              <button
                key={fl.id}
                className={`filter-btn ${filter === fl.id ? 'is-active' : ''}`}
                onClick={() => setFilter(fl.id)}
              >
                {fl.label}
              </button>
            ))}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="props-empty">
              <p>{t.properties.empty}</p>
              <a className="btn btn-ghost" style={{ marginTop: 20 }} href={TELEGRAM_CHANNEL} target="_blank" rel="noreferrer">Telegram</a>
            </div>
          )}

          <div className="props-grid">
            {filtered.map((item, i) => (
              <PropertyCard key={item.id} item={item} delay={(i % 4) * 0.06} />
            ))}
          </div>

          {updated && (
            <div style={{ marginTop: 36, textAlign: 'center' }}>
              <span className="props-updated">
                {t.properties.updated}: {new Date(updated).toLocaleString('pl-PL')}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
