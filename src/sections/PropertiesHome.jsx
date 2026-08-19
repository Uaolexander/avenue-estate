import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { Reveal, useProperties } from '../hooks.jsx'
import { TELEGRAM_CHANNEL, TELEGRAM_BOT } from '../config.js'
import PropertyCarousel from '../components/PropertyCarousel.jsx'
import { Icon } from '../components/Icons.jsx'

export default function PropertiesHome() {
  const { t } = useLang()
  const { items, updated, loading } = useProperties()
  // у стрічку кладемо більше карток, ніж вміщається в екран — щоб було що гортати
  const featured = items.slice(0, 18)

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

        <PropertyCarousel items={featured} />

        <div className="props-footer" style={{ flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          <p className="props-channel-lead">{t.properties.channelLead}</p>
          <div className="props-actions">
            <Link className="btn btn-solid" to="/offers">
              {t.properties.more}
            </Link>
            <a className="btn btn-ghost" href={TELEGRAM_CHANNEL} target="_blank" rel="noreferrer">
              <Icon id="telegram" size={17} />
              {t.properties.channel}
            </a>
            <a className="btn btn-green" href={TELEGRAM_BOT} target="_blank" rel="noreferrer">
              {t.properties.bot}
            </a>
          </div>
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
