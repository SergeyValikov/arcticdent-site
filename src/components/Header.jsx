import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

const navItems = [
  { label: 'Врачи', to: '/doctors' },
  { label: 'Услуги', to: '/#услуги' },
  { label: 'Цены', to: '/#цены' },
  { label: 'Документы', to: '/#документы' },
]
const messengerItems = [
  { id: 'vk', label: 'ВКонтакте', href: '#vk' },
  { id: 'max', label: 'MAX', href: '#max' },
  { id: 'telegram', label: 'Telegram', href: '#telegram' },
]

function MessengerIcon({ id }) {
  if (id === 'vk') {
    return (
      <svg viewBox="0 0 64 40" aria-hidden="true" focusable="false">
        <path d="M4.2 8.1h9.3c.3 5.25 2.47 9.88 6.36 13.38V8.1h8.72v7.45c3.65-.39 7.48-4.29 8.77-7.45h8.72c-.98 3.9-4.28 8.2-7.48 10.3 3.57 1.75 7.16 5.45 8.84 11.5h-9.6c-1.33-3.55-4.48-6.6-9.25-7.07v7.07h-1.05C13.45 29.9 5.45 20.35 4.2 8.1Z" />
      </svg>
    )
  }

  if (id === 'max') {
    return <img src="/assets/max-logo.png" alt="" />
  }

  return (
    <svg viewBox="0 0 56 56" aria-hidden="true" focusable="false">
      <path d="M47.8 10.4 40.6 45c-.54 2.55-2.04 3.14-4.12 1.96l-11.4-8.4-5.5 5.3c-.62.6-1.12 1.1-2.3 1.1l.82-11.62 21.14-19.1c.92-.82-.2-1.28-1.42-.46L11.68 30.24.42 26.72c-2.45-.76-2.5-2.45.5-3.62L45.02 6.1c2.05-.76 3.84.5 2.78 4.3Z" />
    </svg>
  )
}

export default function Header() {
  const [isMessengerOpen, setIsMessengerOpen] = useState(false)
  const messengerRef = useRef(null)

  useEffect(() => {
    if (!isMessengerOpen) {
      return undefined
    }

    const closeOnOutsideClick = (event) => {
      if (!messengerRef.current?.contains(event.target)) {
        setIsMessengerOpen(false)
      }
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMessengerOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMessengerOpen])

  return (
    <header className="header">
      <Link className="header__logo" to="/" aria-label="Арктик Дент">
        <img src="/assets/logo-header.png" alt="Арктик Дент" />
      </Link>

      <nav className="header__nav" aria-label="Основная навигация">
        {navItems.map((item) => (
          <Link to={item.to} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header__actions">
        <div className="header__socials" aria-label="Социальные сети">
          <div className="header__messenger" ref={messengerRef}>
            <button
              className="header__message-toggle"
              type="button"
              aria-label="Мессенджеры"
              aria-expanded={isMessengerOpen}
              aria-controls="mobile-messenger-popover"
              onClick={() => setIsMessengerOpen((isOpen) => !isOpen)}
            >
              <span>Мессенджеры</span>
            </button>

            <div
              className="header__messenger-popover"
              id="mobile-messenger-popover"
              aria-hidden={!isMessengerOpen}
              data-open={isMessengerOpen}
            >
              {messengerItems.map((item) => (
                <a
                  className={`header__messenger-option header__messenger-option--${item.id}`}
                  href={item.href}
                  key={item.id}
                  aria-label={item.label}
                  tabIndex={isMessengerOpen ? 0 : -1}
                  onClick={() => setIsMessengerOpen(false)}
                >
                  <MessengerIcon id={item.id} />
                </a>
              ))}
            </div>
          </div>

          <a className="header__social-link header__social-link--vk" href="#vk" aria-label="ВКонтакте">
            <svg viewBox="0 0 64 40" aria-hidden="true" focusable="false">
              <path d="M4.2 8.1h9.3c.3 5.25 2.47 9.88 6.36 13.38V8.1h8.72v7.45c3.65-.39 7.48-4.29 8.77-7.45h8.72c-.98 3.9-4.28 8.2-7.48 10.3 3.57 1.75 7.16 5.45 8.84 11.5h-9.6c-1.33-3.55-4.48-6.6-9.25-7.07v7.07h-1.05C13.45 29.9 5.45 20.35 4.2 8.1Z" />
            </svg>
          </a>
          <a className="header__social-link header__social-link--max" href="#max" aria-label="MAX">
            <img src="/assets/max-logo.png" alt="" />
          </a>
          <a className="header__social-link header__social-link--telegram" href="#telegram" aria-label="Telegram">
            <svg viewBox="0 0 56 56" aria-hidden="true" focusable="false">
              <path d="M47.8 10.4 40.6 45c-.54 2.55-2.04 3.14-4.12 1.96l-11.4-8.4-5.5 5.3c-.62.6-1.12 1.1-2.3 1.1l.82-11.62 21.14-19.1c.92-.82-.2-1.28-1.42-.46L11.68 30.24.42 26.72c-2.45-.76-2.5-2.45.5-3.62L45.02 6.1c2.05-.76 3.84.5 2.78 4.3Z" />
            </svg>
          </a>
          <a className="header__social-link header__social-link--accessibility" href="#accessibility" aria-label="Версия для слабовидящих">
            <svg viewBox="0 0 56 56" aria-hidden="true" focusable="false">
              <path d="M6.5 28s7.7-13 21.5-13 21.5 13 21.5 13S41.8 41 28 41 6.5 28 6.5 28Z" />
              <circle cx="28" cy="28" r="7.1" />
              <path d="M28 6.9v5.1m0 32v5.1m15-36.1-3.6 3.6M16.6 39.4 13 43m30-1-3.6-3.6M16.6 16.6 13 13" />
            </svg>
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
