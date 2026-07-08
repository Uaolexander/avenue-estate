import { useLang } from '../i18n.jsx'
import { Reveal } from '../hooks.jsx'

function formatPrice(n) {
  return new Intl.NumberFormat('pl-PL').format(n)
}

export default function PropertyCard({ item, delay = 0 }) {
  const { t } = useLang()
  const p = t.properties
  const floorLabel =
    item.floor === 0 || item.floor === 'ground'
      ? p.groundFloor
      : item.floor != null
        ? `${item.floor}${item.floorTotal ? `/${item.floorTotal}` : ''} ${p.floor}`
        : null

  return (
    <Reveal as="article" className="prop-card" delay={delay}>
      <a href={item.url} target="_blank" rel="noreferrer" aria-label={item.address} style={{ display: 'contents' }}>
        <div className="prop-media">
          {item.photo && <img src={item.photo} alt={item.address} loading="lazy" />}
          <span className={`prop-badge ${item.type}`}>{item.type === 'rent' ? p.rent : p.sale}</span>
        </div>
        <div className="prop-body">
          <div className="prop-price">
            {formatPrice(item.price)} zł
            {item.type === 'rent' && <small> / mies.</small>}
          </div>
          <div className="prop-addr">{item.address}</div>
          <div className="prop-meta">
            {item.area && <span>{item.area} m²</span>}
            {item.rooms && <span>{item.rooms} {p.rooms}</span>}
            {floorLabel && <span>{floorLabel}</span>}
            {item.fee && <span>{p.fee} {formatPrice(item.fee)} zł</span>}
          </div>
          <span className="prop-link">
            {p.view}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
          </span>
        </div>
      </a>
    </Reveal>
  )
}
