import { useLang } from '../i18n.jsx'
import { useReveal } from '../hooks.jsx'
import collage from '../assets/brand-collage.jpg'

export default function Hero() {
  const { t } = useLang()
  const ref = useReveal()

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" ref={ref}>
      <div className="hero-grid">
        <div>
          <span className="reveal-line kicker"><span style={{ '--d': '0.1s' }}>{t.hero.kicker}</span></span>
          <h1 className="display hero-title">
            <span className="reveal-line"><span style={{ '--d': '0.18s' }}>Avenue</span></span>
            <span className="reveal-line"><span style={{ '--d': '0.3s' }}>Estate</span></span>
          </h1>
          <span className="reveal-line"><span style={{ '--d': '0.42s' }}>
            <strong style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: 'var(--cream)', fontWeight: 600 }}>
              {t.hero.tagline}
            </strong>
          </span></span>
          <p className="hero-sub reveal" style={{ '--d': '0.54s' }}>{t.hero.sub}</p>
          <div className="hero-ctas reveal" style={{ '--d': '0.66s' }}>
            <a className="btn btn-solid" href="#properties" onClick={scrollTo('properties')}>
              {t.hero.cta}
              <span className="arr" aria-hidden="true">→</span>
            </a>
            <a className="btn btn-ghost" href="#contact" onClick={scrollTo('contact')}>{t.hero.cta2}</a>
          </div>
        </div>
        <div className="hero-art reveal" style={{ '--d': '0.4s' }}>
          <img src={collage} alt="Avenue Estate" fetchpriority="high" />
          <span className="est-badge">est. 2024</span>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        {t.hero.scroll}
        <span className="line" />
      </div>
    </section>
  )
}
