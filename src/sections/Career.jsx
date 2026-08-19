import { useLang } from '../i18n.jsx'
import { Reveal } from '../hooks.jsx'

export default function Career({ onRequest }) {
  const { t } = useLang()
  return (
    <section className="section" id="career">
      <div className="container">
        <Reveal className="career">
          <div>
            <span className="kicker" style={{ color: 'rgba(212,190,160,.75)' }}>Avenue Estate / {t.career.title}</span>
            <h3 className="display career-title">{t.career.lead}</h3>
            <p>{t.career.body}</p>
          </div>
          <button className="btn" onClick={() => onRequest('career')}>
            {t.career.cta}
          </button>
        </Reveal>
      </div>
    </section>
  )
}
