import { neon } from '@neondatabase/serverless'

type QueryRows = Array<Record<string, any>>
type SqlClient = (strings: TemplateStringsArray, ...values: any[]) => Promise<QueryRows>

let cachedSql: SqlClient | null = null

export function getSql(): SqlClient {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL não configurada')
  }

  if (!cachedSql) {
    cachedSql = neon(databaseUrl) as unknown as SqlClient
  }

  return cachedSql
}
