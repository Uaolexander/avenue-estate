import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLang, LANGS } from '../i18n.jsx'
import { SOCIALS, CONTACT } from '../config.js'
import { Icon, Keyhole } from './Icons.jsx'

const SECTIONS = ['about', 'properties', 'abroad', 'services', 'team', 'career', 'contact']

export default function Header() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  /*
    Перший блок — темне фото на всю висоту, і бордовий текст шапки на ньому
    не читався б. Поки низ цього блоку ще під шапкою, перемикаємо її у світлу
    гаму; далі вона повертається до звичайної.
  */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const scene = document.querySelector('.hero')
      setOverHero(scene ? scene.getBoundingClientRect().bottom > 90 : false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const goTo = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''} ${overHero ? 'is-over-hero' : ''} ${open ? 'is-menu-open' : ''}`}>
        <div className="header-left">
          <Link to="/" className="logo" aria-label="Avenue Estate" onClick={() => setOpen(false)}>
            <Keyhole height={34} />
            <span className="logo-text">
              Avenue
              <small>Estate</small>
            </span>
          </Link>
          <nav className="header-socials" aria-label="Social media">
            {SOCIALS.map((s) => (
              <a key={s.id} className="social-btn" href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                <Icon id={s.id} />
              </a>
            ))}
          </nav>
        </div>
        <div className="header-right">
          <div className="lang-switch" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button
                key={l}
                className={`lang-btn ${lang === l ? 'is-active' : ''}`}
                onClick={() => setLang(l)}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`menu-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <ul className="menu-links">
          {SECTIONS.map((id, i) => (
            <li key={id} style={{ transitionDelay: open ? `${0.12 + i * 0.06}s` : '0s' }}>
              <a href={`#${id}`} onClick={goTo(id)}>
                <span className="idx">0{i + 1}</span>
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-footer">
          <span>{CONTACT.phones[0].display}</span>
          <span>{CONTACT.email}</span>
          <span style={{ display: 'flex', gap: 4 }}>
            {SOCIALS.map((s) => (
              <a key={s.id} className="social-btn" href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                <Icon id={s.id} />
              </a>
            ))}
          </span>
        </div>
      </div>
    </>
  )
}
