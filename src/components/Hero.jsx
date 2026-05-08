import './Hero.css'
import Icon from './Icon.jsx'

const trustItems = [
  { icon: 'shield', title: 'Гарантия', text: 'на все виды лечения' },
  { icon: 'tooth', title: 'Опытные врачи', text: 'стаж от 10 лет' },
  { icon: 'tool', title: 'Современное', text: 'оборудование' },
]

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-section__content">
        <div className="hero-section__copy">
          <p className="hero-section__eyebrow">
            <span>Современная</span> стоматология в Мурманске
          </p>

          <h1 id="hero-title">
            Лечение зубов <span>без боли и стресса</span>
          </h1>

          <p className="hero-section__lead">
            Комплексный подход, передовые технологии и забота о вашем комфорте
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

        <div className="hero-section__visual" aria-hidden="true">
          <div className="hero-photo">
            <img className="hero-photo__image" src="/assets/hero-clean.png" alt="" />
          </div>

          <aside className="consult-card">
            <span className="consult-card__avatar" />
            <div>
              <h2>Бесплатная консультация</h2>
              <p>Подберём оптимальный план лечения и ответим на все вопросы</p>
              <a href="#free-consultation">
                Записаться бесплатно <span aria-hidden="true">→</span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
