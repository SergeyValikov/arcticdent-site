import { useEffect, useRef, useState } from 'react'

import '../styles/ClinicGallery.css'

const AUTOPLAY_DELAY = 3000

export default function ClinicGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const pointerStartX = useRef(null)

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length)
  }

  useEffect(() => {
    if (images.length < 2 || isPaused) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length)
    }, AUTOPLAY_DELAY)

    return () => window.clearInterval(intervalId)
  }, [images.length, isPaused])

  useEffect(() => {
    const nextImage = images[(activeIndex + 1) % images.length]

    if (!nextImage) {
      return
    }

    const preloadImage = new Image()
    preloadImage.src = nextImage.src
  }, [activeIndex, images])

  const activeImage = images[activeIndex]

  return (
    <figure
      className="clinic-gallery"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false)
        }
      }}
    >
      <div
        className="clinic-gallery__viewport"
        onPointerDown={(event) => {
          pointerStartX.current = event.clientX
        }}
        onPointerUp={(event) => {
          if (pointerStartX.current === null) {
            return
          }

          const distance = event.clientX - pointerStartX.current
          pointerStartX.current = null

          if (Math.abs(distance) < 42) {
            return
          }

          if (distance > 0) {
            showPrevious()
          } else {
            showNext()
          }
        }}
        onPointerCancel={() => {
          pointerStartX.current = null
        }}
      >
        <img
          className="clinic-gallery__image"
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          loading={activeIndex === 0 ? 'eager' : 'lazy'}
          fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
          draggable="false"
        />

        <div className="clinic-gallery__wash" aria-hidden="true" />

        <div className="clinic-gallery__caption">
          <span>Пространство клиники</span>
          <strong>{activeImage.caption}</strong>
        </div>

        <div className="clinic-gallery__controls">
          <button type="button" onClick={showPrevious} aria-label="Предыдущая фотография">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m14.5 5-7 7 7 7" />
            </svg>
          </button>
          <button type="button" onClick={showNext} aria-label="Следующая фотография">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9.5 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </figure>
  )
}
