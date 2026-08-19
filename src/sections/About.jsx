import { useLang } from '../i18n.jsx'
import { Reveal, RisingNumber, useParallax, useProperties } from '../hooks.jsx'
import { KeyholeMark, Keyhole } from '../components/Icons.jsx'
import PhotoWithFallback from '../components/PhotoWithFallback.jsx'

export default function About() {
  const { t } = useLang()
  const artRef = useParallax(26)
  const { items } = useProperties()

  /*
    Головне фото блоку — public/interior-2.jpg, знімок інтерʼєру від Діани.
    Поки файлу немає, підставляється перший знімок із актуальних оферт, а
    якщо й він недоступний — фірмова замкова щілина.
  */
  const sources = [
    `${import.meta.env.BASE_URL}interior-2.jpg`,
    items.find((i) => i.photo)?.photo,
  ]

  return (
    <section className="section invert" id="about">
      <div className="container about-grid">
        <div>
          <Reveal as="span" className="kicker">{t.about.title}</Reveal>
          <Reveal as="h2" className="about-lead display" delay={0.1}>{t.about.lead}</Reveal>
          <Reveal className="about-body" delay={0.2}>
            <p>{t.about.body1}</p>
            <p>{t.about.body2}</p>
            <p>{t.about.body3}</p>
          </Reveal>
          <Reveal as="ul" className="about-points" delay={0.3}>
            {t.about.points.map((p, i) => (
              <li key={i}><span className="key"><KeyholeMark height={17} /></span>{p}</li>
            ))}
          </Reveal>
        </div>
        <Reveal delay={0.25}>
          <div className="about-art" ref={artRef}>
            <PhotoWithFallback className="parallax-img" sources={sources} alt="">
              <span className="about-art-mark" aria-hidden="true"><Keyhole height={210} /></span>
            </PhotoWithFallback>
          </div>
          <div className="about-est">{t.about.est}</div>
        </Reveal>
      </div>

      <div className="container about-stats">
        {t.about.stats.map((s, i) => (
          <Reveal className="stat" key={i} delay={i * 0.12}>
            <div className="stat-value"><RisingNumber value={s.value} /></div>
            <div className="stat-label">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
