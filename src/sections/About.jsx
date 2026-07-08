import { useLang } from '../i18n.jsx'
import { Reveal } from '../hooks.jsx'
import wordmark from '../assets/wordmark-stacked.jpg'

export default function About() {
  const { t } = useLang()
  return (
    <section className="section on-paper" id="about">
      <div className="container about-grid">
        <div>
          <Reveal as="span" className="kicker">{t.about.title}</Reveal>
          <Reveal as="h2" className="about-lead display" delay={0.1}>{t.about.lead}</Reveal>
          <Reveal className="about-body" delay={0.2}>
            <p>{t.about.body1}</p>
            <p>{t.about.body2}</p>
          </Reveal>
          <Reveal as="ul" className="about-points" delay={0.3}>
            {t.about.points.map((p, i) => (
              <li key={i}><span className="key" aria-hidden="true" />{p}</li>
            ))}
          </Reveal>
        </div>
        <Reveal delay={0.25}>
          <div className="about-art">
            <img src={wordmark} alt="Avenue Estate" loading="lazy" />
          </div>
          <div className="about-est">{t.about.est}</div>
        </Reveal>
      </div>
    </section>
  )
}
