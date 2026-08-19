import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import { Reveal } from '../hooks.jsx'
import { Keyhole } from './Icons.jsx'

function formatPrice(n) {
  return new Intl.NumberFormat('pl-PL').format(n)
}

/*
  animate={false} потрібен для горизонтальної стрічки. Анімація появи ховає
  елемент, доки він не потрапить у кадр, а картки, що поїхали за правий край
  стрічки, у кадр не потрапляють — і лишаються прозорими назавжди. Саме тому
  при гортанні стрілками стрічка виглядала порожньою.
*/
export default function PropertyCard({ item, delay = 0, active = false, animate = true }) {
  const { t } = useLang()
  const p = t.properties
  const Wrapper = animate ? Reveal : 'article'
  const wrapperProps = animate
    ? { as: 'article', className: `prop-card ${active ? 'is-active' : ''}`, delay }
    : { className: `prop-card ${active ? 'is-active' : ''}` }
  // Telegram віддає фото за тимчасовими посиланнями, які з часом перестають
  // працювати. Якщо картинка не завантажилась — показуємо фірмову заглушку,
  // щоб картка не виглядала порожньою до наступного оновлення бази.
  const [imgFailed, setImgFailed] = useState(false)
  const floorLabel =
    item.floor === 0 || item.floor === 'ground'
      ? p.groundFloor
      : item.floor != null
        ? `${item.floor}${item.floorTotal ? `/${item.floorTotal}` : ''} ${p.floor}`
        : null

  return (
    <Wrapper {...wrapperProps}>
      <a href={item.url} target="_blank" rel="noreferrer" aria-label={item.address} style={{ display: 'contents' }}>
        <div className="prop-media">
          {item.photo && !imgFailed && (
            <img src={item.photo} alt={item.address} loading="lazy" onError={() => setImgFailed(true)} />
          )}
          {(!item.photo || imgFailed) && (
            <span className="prop-media-fallback" aria-hidden="true">
              <Keyhole height={54} />
            </span>
          )}
          <span className={`prop-badge ${item.type}`}>{item.type === 'rent' ? p.rent : p.sale}</span>
          {/* кругла стрілка на знімку: одразу видно, що в оферту можна зайти */}
          <span className="prop-enter" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <div className="prop-body">
          <div className="prop-price">
            {formatPrice(item.price)} zł
            {item.type === 'rent' && <small> / mies.</small>}
          </div>
          <div className="prop-addr">{item.address}</div>
          {/*
            Порівнюємо з нулем явно: у JSX запис `item.fee && ...` при fee === 0
            малює на картці саму цифру 0 замість того, щоб нічого не показати.
          */}
          <div className="prop-meta">
            {item.area > 0 && <span>{item.area} m²</span>}
            {item.rooms > 0 && <span>{item.rooms} {p.rooms}</span>}
            {floorLabel && <span>{floorLabel}</span>}
            {item.fee > 0 && <span>{p.fee} {formatPrice(item.fee)} zł</span>}
          </div>
          <span className="prop-link">
            {p.view}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
          </span>
        </div>
      </a>
    </Wrapper>
  )
}
