import { useLayoutEffect, useRef, useState } from 'react'

export default function DoctorCard({ doctor, isActive, onToggle }) {
  const [isHovered, setIsHovered] = useState(false)
  const detailsRef = useRef(null)
  const isOpen = isActive || isHovered
  const detailsId = `doctor-details-${doctor.id}`
  const hasEducation = doctor.education?.length > 0

  useLayoutEffect(() => {
    if (!isActive || !detailsRef.current) return

    let frameId
    const alignDetails = () => {
      const bounds = detailsRef.current.getBoundingClientRect()
      const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0
      const visibleTop = Math.max(0, headerBottom) + 14
      const visibleBottom = window.innerHeight - 14
      const offset = bounds.top < visibleTop
        ? bounds.top - visibleTop
        : Math.max(0, bounds.bottom - visibleBottom)

      if (offset) window.scrollBy({ top: offset, behavior: 'instant' })
    }
    const scheduleAlignment = () => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        frameId = window.requestAnimationFrame(alignDetails)
      })
    }
    scheduleAlignment()
    window.addEventListener('resize', scheduleAlignment)
    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', scheduleAlignment)
    }
  }, [isActive])

  const closeDetails = () => {
    setIsHovered(false)
    if (isActive) onToggle()
  }

  return (
    <article
      className={`doctor-card${isOpen ? ' is-active' : ''}`}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover)').matches) {
          setIsHovered(true)
        }
      }}
      onPointerLeave={() => setIsHovered(false)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') closeDetails()
      }}
    >
      <button
        className="doctor-card__trigger"
        type="button"
        aria-label={`${doctor.name}. ${hasEducation ? 'Образование врача' : doctor.role}`}
        aria-expanded={isOpen}
        aria-controls={detailsId}
        onClick={() => {
          if (isActive) closeDetails()
          else onToggle()
        }}
      >
        <img
          className="doctor-card__image"
          src={doctor.image}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </button>
      <div className="doctor-card__overlay" id={detailsId} hidden={!isOpen}>
        <div
          ref={detailsRef}
          className="doctor-card__overlay-content"
          role="region"
          aria-label={`${doctor.name}: сведения о враче`}
          tabIndex={isOpen ? 0 : -1}
          onClick={(event) => {
            if (!isActive && !event.target.closest('button')) onToggle()
          }}
        >
          <button className="doctor-card__close" type="button" onClick={closeDetails} aria-label="Закрыть сведения о враче">
            ×
          </button>
          <p className="doctor-card__name">{doctor.name}</p>
          <p className="doctor-card__role">{doctor.role}</p>
          {hasEducation ? (
            <>
              <h2 className="doctor-card__education-title">Образование</h2>
              <ul className="doctor-card__education">
                {doctor.education.map((item) => (
                  <li key={`${item.year}-${item.title}`}>
                    <p>{item.year && <strong>{item.year} — </strong>}{item.title}</p>
                    {item.institution && <p className="doctor-card__institution">{item.institution}</p>}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="doctor-card__description">{doctor.description}</p>
          )}
        </div>
      </div>
    </article>
  )
}
