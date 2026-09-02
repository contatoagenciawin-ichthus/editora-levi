import { createHash, randomBytes, randomUUID } from 'crypto'

export function sha256(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

export function createPublicOrderId() {
  const stamp = Date.now().toString(36).toUpperCase()
  const suffix = randomBytes(3).toString('hex').toUpperCase()
  return `LEV-${stamp}-${suffix}`
}

export function createDownloadSecret() {
  return randomBytes(32).toString('base64url')
}

export function createCopyFingerprint() {
  return randomUUID().replaceAll('-', '')
}

export function sanitizeFilePart(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
