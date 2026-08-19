import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import { Reveal } from '../hooks.jsx'
import { GLOBE_LAND } from './globeLand.js'

/*
  Країни, де агенція працює через партнерів. Координати справжні — саме за
  ними точки лягають на глобус, тож мапа не декоративна, а відповідає дійсності.
  base: true — звідки ведуться всі маршрути (Познань).
*/
const COUNTRIES = [
  { id: 'pl', lat: 52.4, lon: 16.9, base: true },
  { id: 'fr', lat: 48.9, lon: 2.3 },
  { id: 'it', lat: 41.9, lon: 12.5 },
  { id: 'es', lat: 40.4, lon: -3.7 },
  { id: 'pt', lat: 38.7, lon: -9.1 },
  { id: 'gr', lat: 38.0, lon: 23.7 },
  { id: 'cy', lat: 35.2, lon: 33.4 },
  { id: 'ae', lat: 25.2, lon: 55.3 },
  { id: 'th', lat: 13.8, lon: 100.5 },
  { id: 'id', lat: -8.7, lon: 115.2 },
]

/*
  Ортографічна проєкція — та сама, за якою земну кулю малюють «як з космосу».
  Центр підібраний так, щоб усі десять країн опинились на видимій півкулі:
  від Португалії на заході до Балі на сході.
*/
const LAT0 = 18
const LON0 = 52
const R = 100

const rad = (deg) => (deg * Math.PI) / 180

function project({ lat, lon }) {
  const dLon = rad(lon - LON0)
  const cosC =
    Math.sin(rad(LAT0)) * Math.sin(rad(lat)) +
    Math.cos(rad(LAT0)) * Math.cos(rad(lat)) * Math.cos(dLon)
  return {
    x: R * Math.cos(rad(lat)) * Math.sin(dLon),
    // вісь y у SVG спрямована вниз, тому знак протилежний
    y: -R * (Math.cos(rad(LAT0)) * Math.sin(rad(lat)) - Math.sin(rad(LAT0)) * Math.cos(rad(lat)) * Math.cos(dLon)),
    visible: cosC > 0,
  }
}

/*
  Дуга «перельоту»: контрольну точку беремо на середині відрізка й відсуваємо
  її від центру кулі. Чим далі країни одна від одної, тим сильніше вигин.
*/
function arcPath(from, to) {
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const dist = Math.hypot(to.x - from.x, to.y - from.y)
  const lift = 1 + dist / (R * 2.2)
  return `M ${from.x} ${from.y} Q ${mx * lift} ${my * lift} ${to.x} ${to.y}`
}

// меридіани й паралелі: сітка, за якою куля читається як куля
const MERIDIANS = [-60, -30, 0, 30, 60]
const PARALLELS = [-40, -20, 0, 20, 40, 60]

/*
  Паралель на ортографічній проєкції — еліпс: по горизонталі R·cos(широта),
  по вертикалі той самий розмір, стиснутий нахилом кулі, а центр зміщений
  угору чи вниз залежно від широти.
*/
function parallel(latDeg) {
  const rx = R * Math.cos(rad(latDeg))
  return {
    rx,
    ry: Math.abs(rx * Math.sin(rad(LAT0))) || 0.4,
    cy: -R * Math.sin(rad(latDeg)) * Math.cos(rad(LAT0)),
  }
}

export default function Abroad({ onRequest }) {
  const { t } = useLang()
  const [hover, setHover] = useState(null)

  const points = COUNTRIES.map((c) => ({ ...c, ...project(c) }))
  const base = points.find((p) => p.base)
  const routes = points.filter((p) => !p.base)

  return (
    <section className="section invert" id="abroad">
      <div className="container abroad-grid">
        <div>
          <Reveal as="span" className="kicker">Avenue Estate / {t.abroad.title}</Reveal>
          <Reveal as="h2" className="display section-title" delay={0.06}>{t.abroad.title}</Reveal>
          <Reveal as="p" className="abroad-lead" delay={0.12}>{t.abroad.lead}</Reveal>
          <Reveal className="abroad-body" delay={0.18}>
            <p>{t.abroad.body1}</p>
            <p>{t.abroad.body2}</p>
          </Reveal>

          <Reveal as="ul" className="abroad-countries" delay={0.24}>
            {COUNTRIES.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={`abroad-chip ${hover === c.id ? 'is-on' : ''}`}
                  onMouseEnter={() => setHover(c.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(c.id)}
                  onBlur={() => setHover(null)}
                >
                  {t.abroad.countries[c.id]}
                </button>
              </li>
            ))}
          </Reveal>

          <Reveal delay={0.3} style={{ marginTop: 30 }}>
            <button className="btn btn-green" onClick={() => onRequest('abroad')}>
              {t.abroad.cta}
            </button>
          </Reveal>
        </div>

        <Reveal className="abroad-globe" delay={0.2}>
          <svg viewBox="-130 -130 260 260" role="img" aria-label={t.abroad.title}>
            {/* сама куля */}
            <circle className="globe-face" r={R} />
            <circle className="globe-rim" r={R} />

            {/* сітка: меридіани — еліпси, паралелі — горизонтальні еліпси */}
            <g className="globe-grid" aria-hidden="true">
              {MERIDIANS.map((m) => (
                <ellipse key={m} rx={Math.abs(R * Math.sin(rad(m))) || 0.4} ry={R} />
              ))}
              {PARALLELS.map((p) => {
                const e = parallel(p)
                return <ellipse key={p} cx="0" cy={e.cy} rx={e.rx} ry={e.ry} />
              })}
            </g>

            {/* обриси материків — заготовлені в scripts/build-globe.mjs */}
            <g className="globe-land" aria-hidden="true">
              {GLOBE_LAND.map((d, i) => <path key={i} d={d} />)}
            </g>

            {/* маршрути з Познані в кожну країну */}
            <g className="globe-routes" aria-hidden="true">
              {routes.map((p, i) => (
                <path
                  key={p.id}
                  className={hover && hover !== p.id && hover !== 'pl' ? 'is-dim' : ''}
                  d={arcPath(base, p)}
                  style={{ '--d': `${0.25 + i * 0.09}s` }}
                />
              ))}
            </g>

            {/* точки країн */}
            <g className="globe-points">
              {points.map((p, i) => (
                <g
                  key={p.id}
                  className={`globe-point ${p.base ? 'is-base' : ''} ${hover === p.id ? 'is-on' : ''}`}
                  style={{ '--d': `${0.4 + i * 0.07}s` }}
                  onMouseEnter={() => setHover(p.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  <circle className="halo" cx={p.x} cy={p.y} r="11" />
                  <circle className="dot" cx={p.x} cy={p.y} r={p.base ? 4.6 : 3.4} />
                  <text
                    x={p.x + (p.x < 0 ? -9 : 9)}
                    y={p.y - 8}
                    textAnchor={p.x < 0 ? 'end' : 'start'}
                  >
                    {t.abroad.countries[p.id]}
                  </text>
                </g>
              ))}
            </g>
          </svg>
          <span className="abroad-hint">{t.abroad.hint}</span>
        </Reveal>
      </div>
    </section>
  )
}
