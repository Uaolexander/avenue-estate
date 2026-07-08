import { useLang } from '../i18n.jsx'
import { Reveal } from '../hooks.jsx'

export default function Services({ onRequest }) {
  const { t } = useLang()
  return (
    <section className="section" id="services" style={{ background: 'var(--bordeaux)' }}>
      <div className="container">
        <Reveal as="span" className="kicker">Avenue Estate / {t.services.title}</Reveal>
        <Reveal as="h2" className="display section-title" delay={0.08} style={{ marginBottom: 'clamp(30px,5vh,60px)' }}>
          {t.services.title}
        </Reveal>
        {t.services.list.map((s, i) => (
          <Reveal as="div" className="service-row" key={s.id} delay={i * 0.06}>
            <span className="service-no">{s.no}</span>
            <h3 className="display service-name">{s.name}</h3>
            <div>
              <p className="service-text">{s.text}</p>
              <div className="service-tags">
                {s.tags.map((tag, j) => <span key={j}>{tag}</span>)}
              </div>
            </div>
            <button className="btn btn-ghost service-cta" onClick={() => onRequest(s.id)}>
              {t.services.cta}
              <span className="arr" aria-hidden="true">→</span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
