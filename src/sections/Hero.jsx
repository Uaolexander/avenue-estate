import { useLang } from '../i18n.jsx'
import { useReveal, SplitText } from '../hooks.jsx'

/*
  Кадри крутяться самі, по колу, без привʼязки до прокрутки.
  Порядок — прохід квартирою: зайшли з боку вікна → вітальня → диван →
  обідня зона → стіл → сходи → антресоль.

  У кожного кадру свій напрямок руху (--tx / --ty у відсотках): камера їде
  туди, де буде головне в наступному кадрі, тож зміна читається як
  продовження руху. Уся анімація живе в CSS — браузер крутить її сам,
  без участі JavaScript.
*/
const FRAMES = [
  { src: 'loft-5.jpg', tx: '-1.5%', ty: '-0.5%' },
  { src: 'loft-1.jpg', tx: '-1.2%', ty: '0.7%' },
  { src: 'loft-4.jpg', tx: '1.6%', ty: '-0.4%' },
  { src: 'loft-2.jpg', tx: '1.4%', ty: '0.5%' },
  { src: 'loft-3.jpg', tx: '1.5%', ty: '-0.5%' },
  { src: 'loft-6.jpg', tx: '-0.7%', ty: '-1.5%' },
  { src: 'loft-7.jpg', tx: '0.8%', ty: '0.6%' },
]

export default function Hero() {
  const { t } = useLang()
  const revealRef = useReveal()

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" ref={revealRef} style={{ '--frames': FRAMES.length }}>
      <div className="hero-media" aria-hidden="true">
        {FRAMES.map((frame, i) => (
          <img
            key={frame.src}
            src={`${import.meta.env.BASE_URL}${frame.src}`}
            alt=""
            fetchpriority={i === 0 ? 'high' : 'low'}
            style={{ '--i': i, '--tx': frame.tx, '--ty': frame.ty }}
          />
        ))}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-inner">
        <span className="reveal-line kicker"><span style={{ '--d': '0.1s' }}>{t.hero.kicker}</span></span>
        <h1 className="display hero-title">
          <SplitText text="Avenue" delay={0.25} />
          <SplitText text="Estate" delay={0.25 + 6 * 0.055 + 0.12} />
        </h1>
        <span className="reveal-line hero-tagline"><span style={{ '--d': '0.95s' }}>
          {t.hero.tagline}
        </span></span>
        <p className="hero-sub reveal" style={{ '--d': '1.05s' }}>{t.hero.sub}</p>
        <div className="hero-ctas reveal" style={{ '--d': '1.15s' }}>
          <a className="btn btn-solid" href="#properties" onClick={scrollTo('properties')}>
            {t.hero.cta}
          </a>
          <a className="btn btn-ghost" href="#contact" onClick={scrollTo('contact')}>{t.hero.cta2}</a>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        {t.hero.scroll}
        <span className="line" />
      </div>
    </section>
  )
}
