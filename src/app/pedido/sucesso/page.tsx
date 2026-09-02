import type { Metadata } from 'next'
import Link from 'next/link'
import { SuccessClient } from './SuccessClient'
import styles from './success.module.css'

export const metadata: Metadata = {
  title: 'Pedido recebido — Editora Levi',
  robots: { index: false, follow: false },
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const sessionId = params.session_id || ''

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.brand} href="/">Editora Levi</Link>
        <SuccessClient sessionId={sessionId} />
      </div>
    </div>
  )
}
