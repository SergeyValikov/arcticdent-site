import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import DoctorCard from '../components/DoctorCard.jsx'
import { defaultDoctorSpecialty, doctorSpecialties, getDoctorSpecialty } from '../data/doctorSpecialties.js'
import '../styles/DoctorsPage.css'

export default function DoctorsPage() {
  const [activeDoctorId, setActiveDoctorId] = useState(null)
  const { specialtySlug } = useParams()
  const specialty = getDoctorSpecialty(specialtySlug)
  const isUnknownSpecialty = specialtySlug && !doctorSpecialties.some((item) => item.slug === specialtySlug)

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

  if (isUnknownSpecialty) {
    return <Navigate replace to={`/doctors/${defaultDoctorSpecialty.slug}`} />
  }

  return (
    <section className="doctors-page" aria-labelledby="doctors-page-title">
      <div className="doctors-page__heading">
        <p>Команда ArcticDent</p>
        <h1 id="doctors-page-title">{specialty.title}</h1>
      </div>

      <div className="doctors-page__grid" aria-label={specialty.title}>
        {specialty.doctors.map((doctor) => (
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
