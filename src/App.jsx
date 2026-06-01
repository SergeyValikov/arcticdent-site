import './App.css'
import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Advantages from './components/Advantages.jsx'
import DoctorsPage from './pages/DoctorsPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'

function HomePage() {
  return (
    <>
      <Hero />
      <Advantages />
    </>
  )
}

function AppLayout() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState('is-entering')
  const timeoutRef = useRef([])

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) {
      return undefined
    }

    timeoutRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))

    const leaveStageTimeout = window.setTimeout(() => {
      setTransitionStage('is-leaving')
    }, 0)

    const swapPageTimeout = window.setTimeout(() => {
      setDisplayLocation(location)
      window.scrollTo(0, 0)

      window.requestAnimationFrame(() => {
        setTransitionStage('is-entering')
      })
    }, 180)

    timeoutRef.current = [leaveStageTimeout, swapPageTimeout]

    return () => {
      window.clearTimeout(leaveStageTimeout)
      window.clearTimeout(swapPageTimeout)
    }
  }, [displayLocation.pathname, location])

  useEffect(() => {
    if (transitionStage !== 'is-entering') {
      return undefined
    }

    const enterTimeout = window.setTimeout(() => {
      setTransitionStage('is-idle')
    }, 620)

    timeoutRef.current = [...timeoutRef.current, enterTimeout]

    return () => {
      window.clearTimeout(enterTimeout)
    }
  }, [displayLocation.pathname, transitionStage])

  return (
    <div className="site-shell">
      <Header />
      <main className="site-main">
        <div className={`page-transition ${transitionStage}`} key={displayLocation.pathname}>
          <Routes location={displayLocation}>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
