import { useState } from 'react'
import Hero from '../sections/Hero.jsx'
import Marquee from '../sections/Marquee.jsx'
import About from '../sections/About.jsx'
import PropertiesHome from '../sections/PropertiesHome.jsx'
import Services from '../sections/Services.jsx'
import Team from '../sections/Team.jsx'
import Career from '../sections/Career.jsx'
import Contact from '../sections/Contact.jsx'
import { useLang } from '../i18n.jsx'

export default function Home() {
  const { t } = useLang()
  const [prefill, setPrefill] = useState(null)

  // Called from service rows and the career block: scrolls to the form
  // and pre-fills the interest select / comment field.
  const onRequest = (source) => {
    if (source === 'career') {
      setPrefill({ interestIndex: 4, comment: '', key: Date.now() })
    } else {
      const service = t.services.list.find((s) => s.id === source)
      setPrefill({ interestIndex: null, comment: service ? service.name : '', key: Date.now() })
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <PropertiesHome />
      <Services onRequest={onRequest} />
      <Team />
      <Career onRequest={onRequest} />
      <Contact prefill={prefill} />
    </>
  )
}
