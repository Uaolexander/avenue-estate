import { useLang } from '../i18n.jsx'
import { Reveal } from '../hooks.jsx'
import { Keyhole } from '../components/Icons.jsx'

// TODO: replace with real names and photos when Diana sends them.
const MEMBERS = [
  { name: 'Diana', photo: null },
  { name: 'Avenue Agent', photo: null },
  { name: 'Avenue Agent', photo: null },
]

export default function Team() {
  const { t } = useLang()
  return (
    <section className="section on-paper" id="team">
      <div className="container">
        <Reveal as="span" className="kicker">Avenue Estate / {t.team.title}</Reveal>
        <Reveal as="h2" className="display section-title" delay={0.08}>{t.team.title}</Reveal>
        <Reveal as="p" delay={0.14} style={{ color: 'var(--ink-dim)', maxWidth: '42ch' }}>{t.team.lead}</Reveal>
        <div className="team-grid">
          {MEMBERS.map((m, i) => (
            <Reveal className="team-card" key={i} delay={i * 0.1}>
              <div className="team-photo">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} loading="lazy" />
                ) : (
                  <div className="placeholder">
                    <Keyhole height={64} color="#2a1208" />
                    <span className="hint">{t.team.soon}</span>
                  </div>
                )}
              </div>
              <div className="team-body">
                <div className="team-name">{m.name}</div>
                <div className="team-role">{t.team.roles[i % t.team.roles.length]}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
