import { useEffect, useRef, useState } from 'react'

import { services } from '../data/services.js'
import '../styles/ServicesPage.css'

const AUTOPLAY_DELAY = 5200

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState('next')
  const [isAutoplayStopped, setIsAutoplayStopped] = useState(false)
  const autoplayRef = useRef(null)

  const goToSlide = (nextIndex, nextDirection, isManual = false) => {
    setDirection(nextDirection)
    setActiveIndex((currentIndex) => {
      const normalizedIndex = (nextIndex + services.length) % services.length

      return normalizedIndex === currentIndex ? currentIndex : normalizedIndex
    })

    if (isManual) {
      setIsAutoplayStopped(true)
    }
  }

  const showPrevious = () => {
    goToSlide(activeIndex - 1, 'prev', true)
  }

  const showNext = () => {
    goToSlide(activeIndex + 1, 'next', true)
  }

  useEffect(() => {
    if (isAutoplayStopped || services.length <= 1) {
      return undefined
    }

    autoplayRef.current = window.setInterval(() => {
      setDirection('next')
      setActiveIndex((currentIndex) => (currentIndex + 1) % services.length)
    }, AUTOPLAY_DELAY)

    return () => {
      window.clearInterval(autoplayRef.current)
    }
  }, [isAutoplayStopped])

  const activeService = services[activeIndex]

  return (
    <section className="services-page" aria-labelledby="services-page-title">
      <h1 className="visually-hidden" id="services-page-title">
        Услуги ArcticDent
      </h1>

      <div className="services-slider" data-direction={direction}>
        <div className="services-slider__frame">
          <img
            className="services-slider__image"
            src={activeService.image}
            alt={activeService.title}
            key={activeService.id}
          />

          <a className="button button--primary services-slider__cta" href="#appointment">
            <strong>
              Записаться
              <br />
              на консультацию
            </strong>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <button
          className="services-slider__arrow services-slider__arrow--prev"
          type="button"
          aria-label="Предыдущая услуга"
          onClick={showPrevious}
        >
          <span aria-hidden="true">‹</span>
        </button>

        <button
          className="services-slider__arrow services-slider__arrow--next"
          type="button"
          aria-label="Следующая услуга"
          onClick={showNext}
        >
          <span aria-hidden="true">›</span>
        </button>

        <div className="services-slider__dots" aria-label="Текущая услуга">
          {services.map((service, index) => (
            <button
              className="services-slider__dot"
              type="button"
              aria-label={`Показать услугу: ${service.title}`}
              aria-current={index === activeIndex}
              key={service.id}
              onClick={() => goToSlide(index, index > activeIndex ? 'next' : 'prev', true)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
