import { useEffect, useRef, useState } from 'react'

import { services } from '../data/services.js'
import '../styles/ServicesPage.css'

const AUTOPLAY_DELAY = 5200
const SWIPE_THRESHOLD = 42
const SWIPE_AXIS_RATIO = 1.18

const shouldUseMobileServiceImage = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return (
    document.documentElement.classList.contains('real-mobile') ||
    window.matchMedia('(max-width: 560px)').matches ||
    window.matchMedia('(hover: none) and (pointer: coarse)').matches
  )
}

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState('next')
  const [isAutoplayStopped, setIsAutoplayStopped] = useState(false)
  const [isSwipeHintDismissed, setIsSwipeHintDismissed] = useState(false)
  const [isCtaNudging, setIsCtaNudging] = useState(false)
  const [usesMobileServiceImage, setUsesMobileServiceImage] = useState(shouldUseMobileServiceImage)
  const autoplayRef = useRef(null)
  const touchStartRef = useRef(null)
  const mouseSwipeStartRef = useRef(null)

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

  const handleSwipeDelta = (deltaX, deltaY) => {
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY) * SWIPE_AXIS_RATIO) {
      return
    }

    if (!isSwipeHintDismissed) {
      setIsSwipeHintDismissed(true)
      setIsCtaNudging(true)
    }

    if (deltaX < 0) {
      goToSlide(activeIndex + 1, 'next', true)
      return
    }

    goToSlide(activeIndex - 1, 'prev', true)
  }

  const handleTouchStart = (event) => {
    if (!event.target.closest('.services-slider__picture')) {
      return
    }

    const touch = event.touches[0]

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    }
  }

  const handleTouchEnd = (event) => {
    if (!touchStartRef.current) {
      return
    }

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y

    touchStartRef.current = null

    handleSwipeDelta(deltaX, deltaY)
  }

  const handleMouseSwipeStart = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || !event.target.closest('.services-slider__picture')) {
      return
    }

    mouseSwipeStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    }

    event.currentTarget.setPointerCapture?.(event.pointerId)
    event.preventDefault()
  }

  const handleMouseSwipeEnd = (event) => {
    if (event.pointerType !== 'mouse' || !mouseSwipeStartRef.current) {
      return
    }

    const deltaX = event.clientX - mouseSwipeStartRef.current.x
    const deltaY = event.clientY - mouseSwipeStartRef.current.y
    const pointerId = mouseSwipeStartRef.current.pointerId

    mouseSwipeStartRef.current = null

    if (event.currentTarget.hasPointerCapture?.(pointerId)) {
      event.currentTarget.releasePointerCapture(pointerId)
    }

    handleSwipeDelta(deltaX, deltaY)
  }

  const handleMouseSwipeCancel = (event) => {
    if (event.pointerType !== 'mouse' || !mouseSwipeStartRef.current) {
      return
    }

    const pointerId = mouseSwipeStartRef.current.pointerId

    mouseSwipeStartRef.current = null

    if (event.currentTarget.hasPointerCapture?.(pointerId)) {
      event.currentTarget.releasePointerCapture(pointerId)
    }
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

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 560px)')
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)')

    const updateServiceImageMode = () => {
      setUsesMobileServiceImage(shouldUseMobileServiceImage())
    }

    updateServiceImageMode()

    mobileQuery.addEventListener?.('change', updateServiceImageMode)
    touchQuery.addEventListener?.('change', updateServiceImageMode)
    window.addEventListener('resize', updateServiceImageMode, { passive: true })

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateServiceImageMode, { passive: true })
    }

    return () => {
      mobileQuery.removeEventListener?.('change', updateServiceImageMode)
      touchQuery.removeEventListener?.('change', updateServiceImageMode)
      window.removeEventListener('resize', updateServiceImageMode)

      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateServiceImageMode)
      }
    }
  }, [])

  useEffect(() => {
    const imagesToPreload = services.map((service) => (
      usesMobileServiceImage ? service.mobileImage : service.desktopImage
    ))

    imagesToPreload.forEach((src) => {
      const image = new Image()
      image.src = src
    })
  }, [usesMobileServiceImage])

  const activeService = services[activeIndex]
  const activeServiceImage = usesMobileServiceImage ? activeService.mobileImage : activeService.desktopImage

  return (
    <section className="services-page" aria-labelledby="services-page-title">
      <h1 className="visually-hidden" id="services-page-title">
        Услуги ArcticDent
      </h1>

      <div className="services-slider" data-direction={direction}>
        <div
          className="services-slider__frame"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handleMouseSwipeStart}
          onPointerUp={handleMouseSwipeEnd}
          onPointerCancel={handleMouseSwipeCancel}
        >
          <picture className="services-slider__picture" key={`${activeService.id}-${usesMobileServiceImage ? 'mobile' : 'desktop'}`}>
            <img
              className="services-slider__image"
              src={activeServiceImage}
              alt={activeService.title}
              decoding="async"
              draggable="false"
              fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
            />
          </picture>

          <a className="button button--primary services-slider__cta services-slider__cta--desktop" href="#appointment">
            <strong>
              Записаться
              <br />
              на консультацию
            </strong>
            <span aria-hidden="true">→</span>
          </a>

          <div
            className="services-slider__swipe-hint"
            data-visible={!isSwipeHintDismissed}
            aria-hidden="true"
          >
            <img src="/images/services/mobile/hand-swipe.png" alt="" />
          </div>
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

        <a
          className="button button--primary services-slider__cta services-slider__cta--mobile"
          href="#appointment"
          data-nudge={isCtaNudging}
          onAnimationEnd={(event) => {
            if (event.animationName === 'service-cta-nudge') {
              setIsCtaNudging(false)
            }
          }}
        >
          <strong>
            Записаться
            <br />
            на консультацию
          </strong>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
