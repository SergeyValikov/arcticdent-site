import { useState } from 'react'

import { clinicLocations } from '../data/clinicLocations.js'
import '../styles/ContactsPage.css'

function getYandexMapSrc(mapQuery) {
  const params = new URLSearchParams({
    text: mapQuery,
    z: '16',
    lang: 'ru_RU',
  })

  return `https://yandex.ru/map-widget/v1/?${params.toString()}`
}

export default function ContactsPage() {
  const [activeLocationId, setActiveLocationId] = useState(null)

  return (
    <section className="contacts-page" aria-labelledby="contacts-page-title">
      <div className="contacts-page__inner">
        <p className="contacts-page__eyebrow">ArcticDent в Мурманске</p>
        <h1 className="contacts-page__title" id="contacts-page-title">
          Адреса и контакты
        </h1>
        <p className="contacts-page__subtitle">
          Выберите филиал, чтобы посмотреть адрес, телефон и маршрут
        </p>

        <div className="contacts-page__grid">
          {clinicLocations.map((location, index) => {
            const isOpen = activeLocationId === location.id

            return (
              <article className={`contact-card${isOpen ? ' is-open' : ''}`} key={location.id}>
                <div className="contact-card__top">
                  <span className="contact-card__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path d="M12 21s6.5-5.8 6.5-11.1A6.5 6.5 0 0 0 5.5 9.9C5.5 15.2 12 21 12 21Z" />
                      <circle cx="12" cy="9.8" r="2.1" />
                    </svg>
                  </span>
                  <span className="contact-card__badge">Филиал {index + 1}</span>
                </div>

                <h2 className="contact-card__address">{location.address}</h2>

                <dl className="contact-card__meta">
                  <div>
                    <dt>Телефон:</dt>
                    <dd>
                      <a href={location.phoneHref}>{location.phone}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Добавочный:</dt>
                    <dd>{location.extension}</dd>
                  </div>
                </dl>

                <button
                  className="contact-card__toggle"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setActiveLocationId((currentId) => (currentId === location.id ? null : location.id))}
                >
                  {isOpen ? 'Скрыть карту' : 'Показать на карте'}
                  <span aria-hidden="true">{isOpen ? '↑' : '↓'}</span>
                </button>

                <div
                  className={`contact-card__media${isOpen ? ' is-map-open' : ''}`}
                  style={{ '--entrance-position': location.entrancePosition }}
                >
                  <img
                    className="contact-card__entrance"
                    src={location.entranceImage}
                    alt={location.entranceAlt}
                    loading="lazy"
                  />
                  <iframe
                    className="contact-card__map"
                    src={getYandexMapSrc(location.mapQuery)}
                    title={`Яндекс.Карта: ${location.address}`}
                    loading="lazy"
                    tabIndex={isOpen ? 0 : -1}
                    aria-hidden={!isOpen}
                    allowFullScreen
                  />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
