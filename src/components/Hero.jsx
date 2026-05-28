import './Hero.css'
import Icon from './Icon.jsx'

const trustItems = [
  { icon: 'shield', title: 'Все', text: 'виды лечения' },
  { icon: 'tooth', title: 'Опытные врачи', text: 'стаж от 10 лет' },
  { icon: 'tool', title: 'Современное', text: 'оборудование' },
]

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-section__content">
        <div className="hero-section__copy">
          <p className="hero-section__eyebrow">
            <span>Современная</span>
            <span>стоматология</span>
            <span className="hero-section__eyebrow-text">в Мурманске</span>
          </p>

          <h1 id="hero-title">
            Лечение зубов <span>без боли и стресса</span>
          </h1>

          <p className="hero-section__lead">
            <span>Комплексный подход, передовые&nbsp;технологии</span>
            <span>и забота о вашем комфорте</span>
          </p>

          <div className="hero-section__trust">
            {trustItems.map((item) => (
              <article className="trust-item" key={item.title}>
                <span className="trust-item__icon">
                  <Icon name={item.icon} />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="hero-section__actions">
            <a className="button button--primary" href="#appointment">
              Записаться на консультацию
              <span aria-hidden="true">→</span>
            </a>
            <a className="button button--ghost" href="#video">
              <span className="button__play" aria-hidden="true">▶</span>
              Посмотреть видео о клинике
            </a>
          </div>
        </div>

        <div className="hero-section__visual">
          <div className="hero-photo">
            <img className="hero-photo__image" src="/assets/hero-clean.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
