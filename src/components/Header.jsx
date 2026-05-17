import './Header.css'

const navItems = ['Услуги', 'Врачи', 'О клинике', 'Цены', 'Отзывы', 'Контакты']

export default function Header() {
  return (
    <header className="header">
      <a className="header__logo" href="/" aria-label="Арктик Дент">
        <img src="/assets/logo-header.png" alt="Арктик Дент" />
      </a>

      <nav className="header__nav" aria-label="Основная навигация">
        {navItems.map((item) => (
          <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>
            {item}
          </a>
        ))}
      </nav>

      <div className="header__actions">
        <div className="header__socials" aria-label="Социальные сети">
          <a className="header__social-link header__social-link--vk" href="#vk" aria-label="ВКонтакте">
            <svg viewBox="0 0 64 40" aria-hidden="true" focusable="false">
              <path d="M4.2 8.1h9.3c.3 5.25 2.47 9.88 6.36 13.38V8.1h8.72v7.45c3.65-.39 7.48-4.29 8.77-7.45h8.72c-.98 3.9-4.28 8.2-7.48 10.3 3.57 1.75 7.16 5.45 8.84 11.5h-9.6c-1.33-3.55-4.48-6.6-9.25-7.07v7.07h-1.05C13.45 29.9 5.45 20.35 4.2 8.1Z" />
            </svg>
          </a>
          <a className="header__social-link header__social-link--max" href="#max" aria-label="MAX">
            <img src="/assets/max-logo.png" alt="" />
          </a>
          <a className="header__social-link header__social-link--phone" href="#phone" aria-label="Позвонить">
            <svg viewBox="0 0 56 56" aria-hidden="true" focusable="false">
              <path d="M19.4 9.8 13.8 15.4c-2.35 2.35-2.05 7.2.68 12.62 2.22 4.42 5.74 8.88 9.72 12.3 5.1 4.4 10.54 6.72 13.34 3.92l5.64-5.64-9.72-9.72-4.02 4.02c-1.28-.5-2.9-1.58-4.62-3.3-1.72-1.72-2.8-3.34-3.3-4.62l4.02-4.02-6.14-11.16Z" />
              <path d="M35.6 12.1h9.1v9.1" />
              <path d="m44.7 12.1-13 13" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
