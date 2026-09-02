'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { formatBRL, offers, type ProductFormat } from '@/lib/catalog'
import { trackEvent } from '@/lib/tracking'
import styles from './checkout.module.css'

type ShippingQuote = {
  id: string
  service: string
  carrier: string
  priceCents: number
  deliveryDays?: number
}

type Props = {
  initialFormat: ProductFormat
  cancelled?: boolean
}

function digits(value: string) {
  return value.replace(/\D/g, '')
}

export function CheckoutClient({ initialFormat, cancelled }: Props) {
  const searchParams = useSearchParams()
  const [format, setFormat] = useState<ProductFormat>(initialFormat)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [quotes, setQuotes] = useState<ShippingQuote[]>([])
  const [selectedQuoteId, setSelectedQuoteId] = useState('')
  const [loadingQuotes, setLoadingQuotes] = useState(false)
  const [loadingCheckout, setLoadingCheckout] = useState(false)
  const [error, setError] = useState('')

  const offer = offers[format]
  const selectedQuote = quotes.find((quote) => quote.id === selectedQuoteId)
  const total = offer.unitAmount + (format === 'physical' ? selectedQuote?.priceCents || 0 : 0)

  const attribution = useMemo(
    () => ({
      source: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
      utmSource: searchParams.get('utm_source') || '',
      utmMedium: searchParams.get('utm_medium') || '',
      utmCampaign: searchParams.get('utm_campaign') || '',
      utmContent: searchParams.get('utm_content') || '',
      utmTerm: searchParams.get('utm_term') || '',
    }),
    [searchParams],
  )

  function chooseFormat(nextFormat: ProductFormat) {
    setFormat(nextFormat)
    setError('')
    if (nextFormat !== 'physical') {
      setQuotes([])
      setSelectedQuoteId('')
    }
  }

  async function calculateShipping() {
    setError('')
    setLoadingQuotes(true)
    setSelectedQuoteId('')
    setQuotes([])

    try {
      const cep = digits(postalCode)
      if (cep.length !== 8) throw new Error('Informe um CEP válido para calcular o frete.')

      const response = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postalCode: cep }),
      })
      const data = (await response.json()) as { quotes?: ShippingQuote[]; error?: string }

      if (!response.ok) throw new Error(data.error || 'Não foi possível calcular o frete.')
      setQuotes(data.quotes || [])
      if (data.quotes?.[0]) setSelectedQuoteId(data.quotes[0].id)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Não foi possível calcular o frete.')
    } finally {
      setLoadingQuotes(false)
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoadingCheckout(true)

    try {
      if (format === 'physical' && !selectedQuoteId) {
        throw new Error('Calcule e selecione uma opção de frete antes de continuar.')
      }

      trackEvent('begin_checkout', {
        currency: 'BRL',
        value: total / 100,
        item_name: 'A Prisão ou o Milhão',
        item_variant: format,
      })

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format,
          customer: { fullName, email, phone },
          shipping:
            format === 'physical'
              ? {
                  postalCode: digits(postalCode),
                  street,
                  number,
                  complement,
                  neighborhood,
                  city,
                  state,
                  quoteId: selectedQuoteId,
                }
              : undefined,
          attribution,
        }),
      })
      const data = (await response.json()) as { url?: string; error?: string }

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Não foi possível iniciar o pagamento.')
      }

      window.location.href = data.url
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Não foi possível iniciar o pagamento.')
      setLoadingCheckout(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.topline}>
          <Link href="/a-prisao-ou-o-milhao">← Voltar para o livro</Link>
          <span>Checkout seguro</span>
        </div>

        <div className={styles.grid}>
          <section className={styles.main}>
            <span className={styles.eyebrow}>A Prisão ou o Milhão</span>
            <h1>Finalize sua compra</h1>
            <p className={styles.intro}>Escolha a versão, informe seus dados e siga para o pagamento por Pix ou cartão.</p>

            {cancelled ? (
              <div className={styles.notice}>O pagamento não foi concluído. Seus dados não foram cobrados.</div>
            ) : null}

            <div className={styles.formats} aria-label="Escolha o formato">
              {(Object.keys(offers) as ProductFormat[]).map((key) => {
                const item = offers[key]
                return (
                  <button
                    type="button"
                    className={`${styles.formatCard} ${format === key ? styles.formatCardActive : ''}`}
                    onClick={() => chooseFormat(key)}
                    key={key}
                  >
                    <span>{item.shortName}</span>
                    <strong>{formatBRL(item.unitAmount)}</strong>
                    {item.compareAtAmount ? <small>de {formatBRL(item.compareAtAmount)}</small> : <small>acesso após o pagamento</small>}
                  </button>
                )
              })}
            </div>

            <form onSubmit={submit} className={styles.form}>
              <div className={styles.sectionTitle}>
                <span>01</span>
                <div>
                  <h2>Seus dados</h2>
                  <p>Usaremos estas informações para identificar o pedido.</p>
                </div>
              </div>

              <div className={styles.fieldGrid}>
                <label className={styles.fullField}>
                  <span>Nome completo</span>
                  <input value={fullName} onChange={(event) => setFullName(event.target.value)} required minLength={3} autoComplete="name" />
                </label>
                <label>
                  <span>E-mail</span>
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
                </label>
                <label>
                  <span>WhatsApp / telefone</span>
                  <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" />
                </label>
              </div>

              {format === 'physical' ? (
                <>
                  <div className={styles.sectionTitle}>
                    <span>02</span>
                    <div>
                      <h2>Entrega</h2>
                      <p>Informe o endereço onde o livro físico deverá ser recebido.</p>
                    </div>
                  </div>

                  <div className={styles.fieldGrid}>
                    <label>
                      <span>CEP</span>
                      <div className={styles.inlineField}>
                        <input
                          value={postalCode}
                          onChange={(event) => setPostalCode(event.target.value)}
                          required
                          inputMode="numeric"
                          autoComplete="postal-code"
                          placeholder="00000-000"
                        />
                        <button type="button" onClick={calculateShipping} disabled={loadingQuotes}>
                          {loadingQuotes ? 'Calculando…' : 'Calcular frete'}
                        </button>
                      </div>
                    </label>
                    <label>
                      <span>Rua / avenida</span>
                      <input value={street} onChange={(event) => setStreet(event.target.value)} required autoComplete="address-line1" />
                    </label>
                    <label>
                      <span>Número</span>
                      <input value={number} onChange={(event) => setNumber(event.target.value)} required />
                    </label>
                    <label>
                      <span>Complemento</span>
                      <input value={complement} onChange={(event) => setComplement(event.target.value)} autoComplete="address-line2" />
                    </label>
                    <label>
                      <span>Bairro</span>
                      <input value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)} required />
                    </label>
                    <label>
                      <span>Cidade</span>
                      <input value={city} onChange={(event) => setCity(event.target.value)} required autoComplete="address-level2" />
                    </label>
                    <label>
                      <span>UF</span>
                      <input value={state} onChange={(event) => setState(event.target.value.toUpperCase().slice(0, 2))} required maxLength={2} autoComplete="address-level1" />
                    </label>
                  </div>

                  {quotes.length ? (
                    <div className={styles.shippingOptions}>
                      <span>Escolha a entrega</span>
                      {quotes.map((quote) => (
                        <label className={styles.shippingOption} key={quote.id}>
                          <input
                            type="radio"
                            name="shipping"
                            value={quote.id}
                            checked={selectedQuoteId === quote.id}
                            onChange={() => setSelectedQuoteId(quote.id)}
                          />
                          <div>
                            <strong>{quote.carrier} · {quote.service}</strong>
                            <small>{quote.deliveryDays ? `Prazo estimado: ${quote.deliveryDays} dias` : 'Prazo informado pela transportadora'}</small>
                          </div>
                          <b>{formatBRL(quote.priceCents)}</b>
                        </label>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : null}

              {error ? <div className={styles.error}>{error}</div> : null}

              <button className={styles.submit} type="submit" disabled={loadingCheckout}>
                {loadingCheckout ? 'Abrindo pagamento…' : `Ir para pagamento · ${formatBRL(total)}`}
              </button>
              <p className={styles.secureNote}>Pagamento processado em ambiente seguro. Pix e cartão ficam disponíveis conforme a configuração da conta de pagamento da Editora Levi.</p>
            </form>
          </section>

          <aside className={styles.summary}>
            <div className={styles.summaryCard}>
              <span className={styles.eyebrow}>Resumo do pedido</span>
              <h2>{offer.shortName}</h2>
              <div className={styles.summaryRow}>
                <span>A Prisão ou o Milhão</span>
                <strong>{formatBRL(offer.unitAmount)}</strong>
              </div>
              {format === 'physical' ? (
                <div className={styles.summaryRow}>
                  <span>Frete</span>
                  <strong>{selectedQuote ? formatBRL(selectedQuote.priceCents) : 'a calcular'}</strong>
                </div>
              ) : null}
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <strong>{formatBRL(total)}</strong>
              </div>
              <div className={styles.summaryFacts}>
                {format === 'physical' ? (
                  <>
                    <span>Livro novo</span>
                    <span>Frete calculado para o seu CEP</span>
                    <span>Pedido registrado após o pagamento</span>
                  </>
                ) : (
                  <>
                    <span>Acesso individual</span>
                    <span>Liberação após confirmação do pagamento</span>
                    <span>Link protegido e temporário</span>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
