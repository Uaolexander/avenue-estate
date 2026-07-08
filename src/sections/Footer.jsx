import { useLang } from '../i18n.jsx'
import { SOCIALS } from '../config.js'
import { Icon } from '../components/Icons.jsx'
import { Reveal } from '../hooks.jsx'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="container">
        <Reveal>
          <div className="display footer-word">
            Avenue <span className="thin">Estate</span>
          </div>
        </Reveal>
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
      </div>
    </footer>
  )
}
