import { useLang } from '../i18n.jsx'
import { Reveal } from '../hooks.jsx'

export default function Career({ onRequest }) {
  const { t } = useLang()
  return (
    <section className="section" id="career">
      <div className="container">
        <Reveal className="career">
          <div>
            <span className="kicker" style={{ color: 'rgba(247,243,230,.6)' }}>Avenue Estate / {t.career.title}</span>
            <h3 className="display" style={{ marginTop: 14 }}>{t.career.lead}</h3>
            <p>{t.career.body}</p>
          </div>
          <button className="btn" onClick={() => onRequest('career')}>
            {t.career.cta}
            <span className="arr" aria-hidden="true">→</span>
          </button>
        </Reveal>
      </div>
    </section>
  )
}
