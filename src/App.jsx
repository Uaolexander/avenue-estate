import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LangProvider } from './i18n.jsx'
import Header from './components/Header.jsx'
import Footer from './sections/Footer.jsx'
import Home from './pages/Home.jsx'
import Offers from './pages/Offers.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offers" element={<Offers />} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </LangProvider>
  )
}
