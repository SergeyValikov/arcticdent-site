import { useRef } from 'react'

const SOURCE_WIDTH = 1448
const SOURCE_HEIGHT = 1086
const TAP_MOVE_TOLERANCE = 10
const TAP_MAX_DURATION = 700

function getCropStyles(crop) {
  const xPosition = (crop.x / (100 - crop.width)) * 100
  const yPosition = (crop.y / (100 - crop.height)) * 100
  const cropWidthPx = SOURCE_WIDTH * (crop.width / 100)
  const cropHeightPx = SOURCE_HEIGHT * (crop.height / 100)

  return {
    '--doctor-bg-size-x': `${10000 / crop.width}%`,
    '--doctor-bg-size-y': `${10000 / crop.height}%`,
    '--doctor-bg-x': `${xPosition}%`,
    '--doctor-bg-y': `${yPosition}%`,
    '--doctor-card-ratio': `${cropWidthPx} / ${cropHeightPx}`,
  }
}

export default function DoctorCard({ doctor, isActive, onToggle }) {
  const tapStartRef = useRef(null)

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      tapStartRef.current = null
      return
    }

    tapStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      scrollY: window.scrollY,
      time: performance.now(),
    }
  }

  const handlePointerUp = (event) => {
    const tapStart = tapStartRef.current
    tapStartRef.current = null

    if (!tapStart) {
      return
    }

    const deltaX = Math.abs(event.clientX - tapStart.x)
    const deltaY = Math.abs(event.clientY - tapStart.y)
    const scrollDelta = Math.abs(window.scrollY - tapStart.scrollY)
    const elapsed = performance.now() - tapStart.time

    if (deltaX <= TAP_MOVE_TOLERANCE && deltaY <= TAP_MOVE_TOLERANCE && scrollDelta <= TAP_MOVE_TOLERANCE && elapsed <= TAP_MAX_DURATION) {
      event.preventDefault()
      onToggle()
    }
  }

  const handlePointerCancel = () => {
    tapStartRef.current = null
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggle()
    }
  }

  return (
    <article
      className={`doctor-card${isActive ? ' is-active' : ''}`}
      style={getCropStyles(doctor.crop)}
      role="button"
      tabIndex={0}
      aria-label={`${doctor.name}. ${doctor.role}`}
      aria-pressed={isActive}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerCancel}
      onKeyDown={handleKeyDown}
    >
      <div className="doctor-card__sprite" aria-hidden="true" />
      <div className="doctor-card__overlay" aria-hidden={!isActive}>
        <div className="doctor-card__overlay-content">
          <p className="doctor-card__name">{doctor.name}</p>
          <p className="doctor-card__role">{doctor.role}</p>
          <p className="doctor-card__description">{doctor.description}</p>
        </div>
      </div>
    </article>
  )
}
