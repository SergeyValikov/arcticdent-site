import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Advantages from './components/Advantages.jsx'
import DoctorsPage from './pages/DoctorsPage.jsx'

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

  return (
    <div className="site-shell">
      <Header />
      <main className="site-main">
        <div className="page-transition" key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
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
