// Pulls property listings from the public Telegram channel preview
// (https://t.me/s/<channel>) and writes them to public/properties.json.
// Runs locally via `npm run sync` and on a schedule in GitHub Actions.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const CHANNEL = 'firststreetestate'
const PAGES = 4
const MAX_ITEMS = 60
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'properties.json')

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

async function fetchPage(before) {
  const url = `https://t.me/s/${CHANNEL}${before ? `?before=${before}` : ''}`
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.text()
}

function decode(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;| /g, ' ')
}

function parseNumber(s) {
  const n = parseFloat(s.replace(/\s+/g, '').replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

function parseMessage(block) {
  const idMatch = block.match(/data-post="[^/]+\/(\d+)"/)
  if (!idMatch) return null
  const id = idMatch[1]

  const textMatch = block.match(/tgme_widget_message_text js-message_text" dir="auto">([\s\S]*?)<\/div>/)
  if (!textMatch) return null
  const text = decode(textMatch[1].replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, ''))
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  if (!lines.length) return null

  const area = text.match(/([\d.,]+)\s*m²/)
  const rooms = text.match(/(\d+)\s*(?:кімнат|кімната|кімнати|pok|room)/i)
  const price = text.match(/💰\s*([\d\s.,]+?)\s*zł/)
  const fee = text.match(/\+\s*([\d\s.,]+?)\s*zł\s*\(?(?:чинш|czynsz)/i)
  const deposit = text.match(/(?:кауція|kaucja|deposit)[:\s]*([\d\s.,]+?)\s*zł/i)
  const floor = text.match(/🏢\s*(\S+?)(?:\/(\d+))?\s*(?:поверх|piętro|floor)/i)

  // A listing must at least have a price and an address line
  if (!price) return null

  const priceVal = parseNumber(price[1])
  if (!priceVal) return null

  let type = null
  if (/оренд|винайм|wynaj|rent/i.test(text)) type = 'rent'
  if (/прода|sprzeda|sale/i.test(text)) type = 'sale'
  // Guard against mislabeled posts: monthly rent in Poznań does not reach six figures
  if (priceVal >= 100000) type = 'sale'
  if (!type) type = priceVal >= 30000 ? 'sale' : 'rent'

  let floorVal = null
  let floorTotal = null
  if (floor) {
    if (/ground|parter|партер/i.test(floor[1])) floorVal = 0
    else floorVal = parseNumber(floor[1])
    floorTotal = floor[2] ? parseInt(floor[2], 10) : null
  }

  const photos = [...block.matchAll(/tgme_widget_message_photo_wrap[^"]*"[^>]*background-image:url\('([^']+)'\)/g)].map((m) => m[1])
  const dateMatch = block.match(/datetime="([^"]+)"/)

  // The address is the first line that is not one of the metric lines
  const metricLine = /m²|кімнат|pok\b|💰|zł|поверх|piętro|кауція|kaucja|чинш|czynsz/i
  let address = (lines.find((l) => !metricLine.test(l)) || '')
    .replace(/^[^\p{L}\d]+/u, '')
    .replace(/^вул\.\s*(?=(ul|os|pl|al)\.)/i, '')
    .replace(/^вул\.\s*/i, 'ul. ')
    .trim()
  if (!address) address = 'Poznań'

  return {
    id,
    url: `https://t.me/${CHANNEL}/${id}`,
    date: dateMatch ? dateMatch[1] : null,
    address,
    area: area ? parseNumber(area[1]) : null,
    rooms: rooms ? parseInt(rooms[1], 10) : null,
    price: priceVal,
    fee: fee ? parseNumber(fee[1]) : null,
    deposit: deposit ? parseNumber(deposit[1]) : null,
    floor: floorVal,
    floorTotal,
    type,
    photo: photos[0] || null,
    photos,
  }
}

async function main() {
  const found = new Map()
  let before = null

  for (let p = 0; p < PAGES; p++) {
    let html
    try {
      html = await fetchPage(before)
    } catch (e) {
      console.error('fetch failed:', e.message)
      break
    }
    const blocks = html.split('tgme_widget_message_wrap').slice(1)
    if (!blocks.length) break

    let minId = Infinity
    for (const block of blocks) {
      const idMatch = block.match(/data-post="[^/]+\/(\d+)"/)
      if (idMatch) minId = Math.min(minId, parseInt(idMatch[1], 10))
      const item = parseMessage(block)
      if (item) found.set(item.id, item)
    }
    if (!Number.isFinite(minId) || minId <= 1) break
    before = minId
  }

  // Merge with the previous run so older listings survive channel pagination limits
  let previous = []
  if (existsSync(OUT)) {
    try {
      previous = JSON.parse(readFileSync(OUT, 'utf8')).items || []
    } catch { /* start fresh */ }
  }
  for (const item of previous) {
    if (!found.has(item.id)) found.set(item.id, item)
  }

  const items = [...found.values()]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, MAX_ITEMS)

  writeFileSync(OUT, JSON.stringify({ updated: new Date().toISOString(), items }, null, 2))
  console.log(`saved ${items.length} listings to public/properties.json`)
}

main()
