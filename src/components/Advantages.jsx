import './Advantages.css'
import Icon from './Icon'

const advantages = [
  {
    href: '#о-клинике',
    icon: 'infoCircle',
    title: 'О клинике',
    text: 'Оборудование, подход и стандарты лечения',
  },
  {
    href: '#контакты',
    icon: 'mapPin',
    title: 'Контакты',
    text: 'Адрес, телефон и как добраться',
  },
]

export default function Advantages() {
  return (
    <section className="advantages" aria-label="Навигация по клинике">
      {advantages.map((item) => (
        <a className="advantage" href={item.href} key={item.title}>
          <span className="advantage__icon">
            <Icon name={item.icon} />
          </span>
          <div className="advantage__content">
            <div className="advantage__heading">
              <h2>{item.title}</h2>
              <span className="advantage__arrow" aria-hidden="true">
                →
              </span>
            </div>
            <p>{item.text}</p>
          </div>
        </a>
      ))}
    </section>
  )
}
