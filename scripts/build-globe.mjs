/*
  Готує обриси материків для глобуса в блоці «Нерухомість за кордоном».

  Бере відкриті дані Natural Earth (спрощені обриси суходолу), проєктує їх
  ортографічно — тобто так, як Земля виглядає з космосу — під тим самим кутом,
  що й точки країн у Abroad.jsx, і зберігає готові контури у src/sections/globeLand.js.

  Рахуємо один раз тут, а не в браузері: так на сайт іде лише готовий результат,
  без зайвої бібліотеки та без звернень до чужого сервера.

  Запуск: npm run globe
  Кут повороту кулі мусить збігатися з LAT0/LON0/R у Abroad.jsx.
*/

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const SOURCE =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson'

// Кут, під яким дивимось на кулю. Підібраний так, щоб усі країни агенції
// (від Португалії до Балі) опинились на видимій половині.
const LAT0 = 18
const LON0 = 52
const R = 100

// Наскільки прорідити контури: більше значення — менший файл, грубіші береги.
const TOLERANCE = 1.1

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'sections', 'globeLand.js')

const rad = (deg) => (deg * Math.PI) / 180
const sinLat0 = Math.sin(rad(LAT0))
const cosLat0 = Math.cos(rad(LAT0))

function project(lon, lat) {
  const dLon = rad(lon - LON0)
  const sinLat = Math.sin(rad(lat))
  const cosLat = Math.cos(rad(lat))
  return {
    x: R * cosLat * Math.sin(dLon),
    y: -R * (cosLat0 * sinLat - sinLat0 * cosLat * Math.cos(dLon)),
    // > 0 означає, що точка на видимій половині кулі
    front: sinLat0 * sinLat + cosLat0 * cosLat * Math.cos(dLon),
  }
}

// прибираємо точки, що стоять надто щільно одна до одної
function thin(points) {
  const out = [points[0]]
  for (let i = 1; i < points.length - 1; i++) {
    const last = out[out.length - 1]
    if (Math.hypot(points[i].x - last.x, points[i].y - last.y) >= TOLERANCE) out.push(points[i])
  }
  out.push(points[points.length - 1])
  return out
}

const res = await fetch(SOURCE)
if (!res.ok) throw new Error(`HTTP ${res.status} for ${SOURCE}`)
const geo = await res.json()

const runs = []
for (const feature of geo.features) {
  const { type, coordinates } = feature.geometry
  const polygons = type === 'MultiPolygon' ? coordinates : [coordinates]
  for (const polygon of polygons) {
    for (const ring of polygon) {
      /*
        Кільце берегової лінії може заходити за край кулі. Тому ведемо його
        по точках і розриваємо там, де воно ховається за горизонт: із кожного
        видимого шматка виходить окремий контур.
      */
      let run = []
      for (const [lon, lat] of ring) {
        const p = project(lon, lat)
        if (p.front > 0.02) {
          run.push(p)
        } else {
          if (run.length > 3) runs.push(run)
          run = []
        }
      }
      if (run.length > 3) runs.push(run)
    }
  }
}

const paths = runs
  .map(thin)
  .filter((run) => run.length >= 4)
  .map((run) => 'M' + run.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L'))

const file = `/*
  ЗГЕНЕРОВАНИЙ ФАЙЛ — руками не правити.
  Перебудувати: npm run globe (див. scripts/build-globe.mjs).

  Обриси материків, спроєктовані на кулю під кутом LAT0=${LAT0}, LON0=${LON0}, R=${R}.
  Джерело: Natural Earth, відкриті дані (public domain).
*/
export const GLOBE_LAND = ${JSON.stringify(paths)}
`

writeFileSync(OUT, file)
console.log(`saved ${paths.length} coastline paths (${(file.length / 1024).toFixed(1)} kB) to src/sections/globeLand.js`)
