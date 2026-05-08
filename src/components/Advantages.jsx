import './Advantages.css'
import Icon from './Icon.jsx'

const advantages = [
  { icon: 'tooth', value: '15+ лет', text: 'заботимся о вашей улыбке' },
  { icon: 'people', value: '5 000+', text: 'довольных пациентов ежегодно' },
  { icon: 'shield', value: '100%', text: 'гарантия на все виды лечения' },
  { icon: 'calendar', value: 'Удобная запись', text: 'онлайн или по телефону за 30 секунд' },
]

export default function Advantages() {
  return (
    <section className="advantages" aria-label="Преимущества клиники">
      {advantages.map((item) => (
        <article className="advantage" key={item.value}>
          <span className="advantage__icon">
            <Icon name={item.icon} />
          </span>
          <div>
            <h2>{item.value}</h2>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
