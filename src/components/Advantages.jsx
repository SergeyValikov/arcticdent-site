import { Link } from 'react-router-dom'

import './Advantages.css'
import Icon from './Icon'

const advantages = [
  {
    to: '/about',
    icon: 'infoCircle',
    title: 'О клинике',
    text: 'Оборудование, подход и стандарты лечения',
  },
  {
    to: '/contacts',
    icon: 'mapPin',
    title: 'Контакты',
    text: 'Адреса, телефоны и как добраться',
  },
]

export default function Advantages({ className = '' }) {
  return (
    <section className={['advantages', className].filter(Boolean).join(' ')} aria-label="Навигация по клинике">
      {advantages.map((item) => {
        const content = (
          <>
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
          </>
        )

        if (item.to) {
          return (
            <Link className="advantage" to={item.to} key={item.title}>
              {content}
            </Link>
          )
        }

        return (
          <a className="advantage" href={item.href} key={item.title}>
            {content}
          </a>
        )
      })}
    </section>
  )
}
