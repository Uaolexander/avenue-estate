import { useEffect, useState } from 'react'
import { useLang } from '../i18n.jsx'
import { Reveal } from '../hooks.jsx'
import { CONTACT, SOCIALS } from '../config.js'
import { Icon } from '../components/Icons.jsx'

export default function Contact({ prefill }) {
  const { t } = useLang()
  const f = t.contact.form
  const [status, setStatus] = useState('idle')
  const [interest, setInterest] = useState(f.interests[0])
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (!prefill) return
    if (prefill.interestIndex != null) setInterest(f.interests[prefill.interestIndex])
    if (prefill.comment) setComment(prefill.comment)
  }, [prefill]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    setStatus('sending')
    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Avenue Estate: nowe zgłoszenie ze strony',
          name: form.name.value,
          phone: form.phone.value,
          email: form.email.value,
          interest: form.interest.value,
          comment: form.comment.value,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('ok')
      form.reset()
      setComment('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container contact-grid">
        <div>
          <Reveal as="span" className="kicker">Avenue Estate / {t.contact.title}</Reveal>
          <Reveal as="h2" className="display section-title" delay={0.08}>{t.contact.title}</Reveal>
          <Reveal as="p" delay={0.14} style={{ color: 'var(--beige-dim)', maxWidth: '40ch', marginTop: 10 }}>
            {t.contact.lead}
          </Reveal>
          <Reveal as="ul" className="contact-list" delay={0.2}>
            <li>
              <div className="label">{t.contact.phone}</div>
              <a className="value" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </li>
            <li>
              <div className="label">{t.contact.email}</div>
              <a className="value" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <div className="label">{t.contact.hours}</div>
              <div className="value" style={{ fontSize: '1.15rem' }}>{t.contact.hoursValue}</div>
            </li>
            <li>
              <div className="label">{t.contact.socials}</div>
              <div className="contact-socials">
                {SOCIALS.map((s) => (
                  <a key={s.id} className="social-btn" href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                    <Icon id={s.id} />
                  </a>
                ))}
              </div>
            </li>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form className="form-card" onSubmit={onSubmit} id="request-form">
            <h3 className="form-title">{f.title}</h3>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="cf-name">{f.name}</label>
                <input id="cf-name" name="name" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="cf-phone">{f.phone}</label>
                <input id="cf-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+48" />
              </div>
              <div className="field full">
                <label htmlFor="cf-email">{f.email}</label>
                <input id="cf-email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="field full">
                <label htmlFor="cf-interest">{f.interest}</label>
                <div className="select-wrap">
                  <select id="cf-interest" name="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
                    {f.interests.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div className="field full">
                <label htmlFor="cf-comment">{f.comment}</label>
                <textarea id="cf-comment" name="comment" placeholder={f.commentPh} value={comment} onChange={(e) => setComment(e.target.value)} />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-solid" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? f.sending : f.send}
              </button>
              {status === 'ok' && <span className="form-note ok" role="status">{f.ok}</span>}
              {status === 'error' && <span className="form-note err" role="alert">{f.error}</span>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
