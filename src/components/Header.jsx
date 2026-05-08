import './Header.css'

const navItems = ['Услуги', 'Врачи', 'О клинике', 'Цены', 'Отзывы', 'Контакты']

export default function Header() {
  return (
    <header className="header">
      <a className="header__logo" href="/" aria-label="Арктик Дент">
        <img src="/assets/logo.png" alt="Арктик Дент" />
      </a>

      <nav className="header__nav" aria-label="Основная навигация">
        {navItems.map((item) => (
          <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>
            {item}
          </a>
        ))}
      </nav>

      <div className="header__actions">
        <div className="header__contacts">
          <a className="header__phone" href="tel:+78152216216">
            +7 8152 216 216
          </a>
          <span className="header__city">г. Мурманск</span>
        </div>

        <div className="header__socials" aria-label="Социальные сети">
          <a href="#vk" aria-label="ВКонтакте">
            vk
          </a>
          <a href="#profile" aria-label="Профиль клиники">
            p
          </a>
          <a href="#phone" aria-label="Позвонить">
            <span>⌕</span>
          </a>
        </div>
      </div>
    </header>
  )
}
