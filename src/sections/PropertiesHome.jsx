import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { Reveal, useProperties } from '../hooks.jsx'
import { TELEGRAM_CHANNEL } from '../config.js'
import PropertyCard from '../components/PropertyCard.jsx'

export default function PropertiesHome() {
  const { t } = useLang()
  const { items, updated, loading } = useProperties()
  const featured = items.slice(0, 4)

  return (
    <section className="section" id="properties">
      <div className="container">
        <div className="props-head">
          <div>
            <Reveal as="span" className="kicker">Avenue Estate / {t.properties.title}</Reveal>
            <Reveal as="h2" className="display section-title" delay={0.08}>{t.properties.title}</Reveal>
          </div>
          <Reveal as="p" className="props-lead" delay={0.16}>{t.properties.lead}</Reveal>
        </div>

        {!loading && featured.length === 0 && (
          <div className="props-empty">
            <p>{t.properties.empty}</p>
            <a className="btn btn-ghost" style={{ marginTop: 20 }} href={TELEGRAM_CHANNEL} target="_blank" rel="noreferrer">Telegram</a>
          </div>
        )}

        <div className="props-grid">
          {featured.map((item, i) => (
            <PropertyCard key={item.id} item={item} delay={i * 0.08} />
          ))}
        </div>

        <div className="props-footer" style={{ flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          <Link className="btn btn-solid" to="/offers">
            {t.properties.more}
            <span className="arr" aria-hidden="true">→</span>
          </Link>
          {updated && (
            <span className="props-updated">
              {t.properties.updated}: {new Date(updated).toLocaleDateString('pl-PL')}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
