import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { SOCIALS, CONTACT, TELEGRAM_BOT } from '../config.js'
import { Icon } from '../components/Icons.jsx'
import { Reveal } from '../hooks.jsx'

const SECTIONS = ['about', 'properties', 'abroad', 'services', 'team', 'career', 'contact']

export default function Footer() {
  const { t } = useLang()
  const location = useLocation()
  const navigate = useNavigate()

  // Те саме меню, що й у шапці: з інших сторінок спершу вертаємось на головну.
  const goTo = (id) => (e) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer invert">
      <div
        className="footer-photo"
        aria-hidden="true"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}loft-2.jpg)` }}
      />
      <div className="container">
        <Reveal>
          <div className="display footer-word">
            Avenue <span className="thin">Estate</span>
          </div>
        </Reveal>

        <div className="footer-cols">
          <nav className="footer-nav" aria-label="Avenue Estate">
            {SECTIONS.map((id) => (
              <a key={id} href={`#${id}`} onClick={goTo(id)}>{t.nav[id]}</a>
            ))}
            <Link to="/offers">{t.properties.all}</Link>
          </nav>

          <div className="footer-contacts">
            {CONTACT.phones.map((p) => (
              <a href={p.href} key={p.href}>{p.display}</a>
            ))}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={TELEGRAM_BOT} target="_blank" rel="noreferrer">@Avenuerealestate_bot</a>
            <span>{t.contact.hoursValue}</span>
          </div>
        </div>

        <div className="footer-row">
          <span>© {new Date().getFullYear()} Avenue Estate. {t.footer.rights}</span>
          <span>{t.footer.madeFor}</span>
          <span className="socials">
            {SOCIALS.map((s) => (
              <a key={s.id} className="social-btn" href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                <Icon id={s.id} />
              </a>
            ))}
          </span>
          <span>{t.footer.city}</span>
        </div>
        <div className="footer-credit">
          {t.footer.credit}{' '}
          <a href="https://alexvdovych.com" target="_blank" rel="noreferrer">Oleksandr Vdovychenko</a>
        </div>
      </div>
    </footer>
  )
}
