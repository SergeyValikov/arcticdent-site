import { useEffect, useState } from 'react'

import DoctorCard from '../components/DoctorCard.jsx'
import { doctors } from '../data/doctors.js'
import '../styles/DoctorsPage.css'

export default function DoctorsPage() {
  const [activeDoctorId, setActiveDoctorId] = useState(null)

  useEffect(() => {
    if (!activeDoctorId) {
      return undefined
    }

    const closeOnOutsideTap = (event) => {
      if (!event.target.closest('.doctor-card')) {
        setActiveDoctorId(null)
      }
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveDoctorId(null)
      }
    }

    const closeOnPageMove = () => {
      setActiveDoctorId(null)
    }

    document.addEventListener('pointerdown', closeOnOutsideTap)
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('scroll', closeOnPageMove, { passive: true })
    window.addEventListener('wheel', closeOnPageMove, { passive: true })

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideTap)
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('scroll', closeOnPageMove)
      window.removeEventListener('wheel', closeOnPageMove)
    }
  }, [activeDoctorId])

  return (
    <section className="doctors-page" aria-labelledby="doctors-page-title">
      <h1 className="visually-hidden" id="doctors-page-title">
        Наши специалисты ArcticDent
      </h1>

      <div className="doctors-page__grid" aria-label="Наши специалисты">
        {doctors.map((doctor) => (
          <DoctorCard
            doctor={doctor}
            isActive={activeDoctorId === doctor.id}
            key={doctor.id}
            onToggle={() => setActiveDoctorId((currentId) => (currentId === doctor.id ? null : doctor.id))}
          />
        ))}
      </div>
    </section>
  )
}
