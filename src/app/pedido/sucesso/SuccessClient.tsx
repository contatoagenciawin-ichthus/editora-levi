'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { trackEvent } from '@/lib/tracking'
import styles from './success.module.css'

type DownloadItem = {
  format: string
  url: string
  remainingDownloads: number
}

type AccessPayload = {
  status?: string
  paid?: boolean
  publicId?: string
  physical?: boolean
  fulfillmentStatus?: string
  totalCents?: number
  formats?: string[]
  downloads?: DownloadItem[]
  message?: string
  error?: string
}

function getDeviceId() {
  const key = 'editora-levi-device-id'
  let value = window.localStorage.getItem(key)

  if (!value) {
    value = crypto.randomUUID()
    window.localStorage.setItem(key, value)
  }

  return value
}

function trackPurchaseOnce(payload: AccessPayload) {
  if (!payload.paid || !payload.publicId) return

  const key = `editora-levi-purchase-${payload.publicId}`
  if (window.localStorage.getItem(key)) return

  trackEvent('purchase', {
    transaction_id: payload.publicId,
    currency: 'BRL',
    value: Number(payload.totalCents || 0) / 100,
    item_name: 'A Prisão ou o Milhão',
    item_variant: payload.formats?.join(',') || (payload.physical ? 'physical' : 'digital'),
  })
  window.localStorage.setItem(key, '1')
}

export function SuccessClient({ sessionId }: { sessionId: string }) {
  const [data, setData] = useState<AccessPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    if (!sessionId) {
      setError('Não encontramos a identificação deste pagamento.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/order/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          deviceId: getDeviceId(),
        }),
      })
      const payload = (await response.json()) as AccessPayload

      if (!response.ok) throw new Error(payload.error || 'Não foi possível validar o pedido.')
      setData(payload)
      trackPurchaseOnce(payload)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Não foi possível validar o pedido.')
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  useEffect(() => {
    void load()
  }, [load])

  if (loading) {
    return (
      <section className={styles.card}>
        <span className={styles.eyebrow}>Validando pagamento</span>
        <h1>Estamos confirmando seu pedido.</h1>
        <p>Isso normalmente leva poucos segundos.</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.card}>
        <span className={styles.eyebrow}>Pedido</span>
        <h1>Não conseguimos validar agora.</h1>
        <p>{error}</p>
        <div className={styles.actions}>
          <button type="button" onClick={() => void load()}>Tentar novamente</button>
          <Link href="/a-prisao-ou-o-milhao">Voltar ao livro</Link>
        </div>
      </section>
    )
  }

  if (!data?.paid) {
    return (
      <section className={styles.card}>
        <span className={styles.eyebrow}>Pagamento em processamento</span>
        <h1>Seu pedido foi iniciado.</h1>
        <p>{data?.message || 'A confirmação do pagamento ainda não chegou. No Pix, a atualização pode levar alguns instantes.'}</p>
        <div className={styles.actions}>
          <button type="button" onClick={() => void load()}>Atualizar status</button>
          <Link href="/">Ir para a Editora Levi</Link>
        </div>
      </section>
    )
  }

  if (data.physical) {
    return (
      <section className={styles.card}>
        <span className={styles.eyebrow}>Pagamento confirmado</span>
        <h1>Pedido recebido.</h1>
        <p>
          Seu exemplar físico de <strong>A Prisão ou o Milhão</strong> está registrado. A Editora Levi dará sequência à preparação e ao envio.
        </p>
        <div className={styles.orderCode}>
          <span>Número do pedido</span>
          <strong>{data.publicId}</strong>
        </div>
        <div className={styles.actions}>
          <Link href="/">Conhecer a Editora Levi</Link>
          <Link href="/a-prisao-ou-o-milhao">Voltar ao livro</Link>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.card}>
      <span className={styles.eyebrow}>Pagamento confirmado</span>
      <h1>Sua versão digital está disponível.</h1>
      <p>
        Os links abaixo são individuais, temporários e vinculados a este dispositivo. Se expirarem, você pode gerar novos links enquanto houver downloads disponíveis.
      </p>

      <div className={styles.orderCode}>
        <span>Número do pedido</span>
        <strong>{data.publicId}</strong>
      </div>

      <div className={styles.downloads}>
        {data.downloads?.length ? (
          data.downloads.map((item) => (
            <a href={item.url} key={`${item.format}-${item.url}`}>
              <div>
                <span>Baixar arquivo</span>
                <strong>{item.format}</strong>
              </div>
              <small>{item.remainingDownloads} download(s) disponível(is) antes deste acesso</small>
            </a>
          ))
        ) : (
          <div className={styles.empty}>
            Não foi possível gerar um novo link neste dispositivo. Se você já usou os links disponíveis ou atingiu o limite de dispositivos, fale com a Editora Levi.
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={() => void load()}>Gerar novos links</button>
        <Link href="/">Ir para a Editora Levi</Link>
      </div>
    </section>
  )
}
