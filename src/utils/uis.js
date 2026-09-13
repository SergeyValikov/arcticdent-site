const UIS_WAIT_TIMEOUT = 10_000
const UIS_POLL_INTERVAL = 100
const pendingActions = new Set()

function runWhenUisReady(key, isReady, action, onUnavailable) {
  if (typeof window === 'undefined' || pendingActions.has(key)) {
    return
  }

  const deadline = Date.now() + UIS_WAIT_TIMEOUT
  pendingActions.add(key)

  const attempt = () => {
    if (Date.now() >= deadline) {
      pendingActions.delete(key)
      onUnavailable?.()
      return
    }

    try {
      const api = window.Comagic
      if (isReady(api)) {
        pendingActions.delete(key)
        action(api)
        return
      }
    } catch (error) {
      pendingActions.delete(key)
      console.warn('UIS action failed:', error)
      onUnavailable?.()
      return
    }

    window.setTimeout(attempt, UIS_POLL_INTERVAL)
  }

  attempt()
}

export function openAppointmentWidget(event) {
  event.preventDefault()

  if (typeof window === 'undefined') {
    return
  }

  // Use the site's existing mobile breakpoint and viewport override.
  const isMobile = document.documentElement.classList.contains('real-mobile')
    || window.matchMedia('(max-width: 560px)').matches

  const widgetId = isMobile ? 96670 : 96674
  runWhenUisReady(
    'appointment',
    (api) => typeof api?.openWidget === 'function',
    (api) => api.openWidget(widgetId),
  )
}

export function forwardTelegram(event) {
  event.preventDefault()

  const telegramUrl = 'https://t.me/+79646844321'
  // Same-tab navigation also works after the browser's popup activation expires.
  const openDirectly = () => window.location.assign(telegramUrl)

  runWhenUisReady(
    'telegram',
    (api) => typeof api?.omni?.forwardTelegram === 'function',
    (api) => Promise.resolve(api.omni.forwardTelegram(telegramUrl)).catch(openDirectly),
    openDirectly,
  )
}
