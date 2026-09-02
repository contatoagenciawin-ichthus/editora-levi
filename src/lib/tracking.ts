'use client'

type EventParams = Record<string, string | number | boolean | undefined>

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === 'undefined') return

  const win = window as typeof window & {
    gtag?: (...args: any[]) => void
    fbq?: (...args: any[]) => void
  }

  win.gtag?.('event', name, params)

  const metaMap: Record<string, string> = {
    view_item: 'ViewContent',
    begin_checkout: 'InitiateCheckout',
    purchase: 'Purchase',
  }

  const metaEvent = metaMap[name]
  if (metaEvent) {
    win.fbq?.('track', metaEvent, params)
  }
}
