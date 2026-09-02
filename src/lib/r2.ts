import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

let r2Client: S3Client | null = null

function getR2Config() {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY
  const bucket = process.env.CLOUDFLARE_R2_BUCKET

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
    throw new Error('Cloudflare R2 não configurado')
  }

  return { accountId, accessKeyId, secretAccessKey, bucket }
}

export function isR2Configured() {
  return Boolean(
    process.env.CLOUDFLARE_R2_ACCOUNT_ID &&
      process.env.CLOUDFLARE_R2_ACCESS_KEY_ID &&
      process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY &&
      process.env.CLOUDFLARE_R2_BUCKET,
  )
}

function getClient() {
  const config = getR2Config()

  if (!r2Client) {
    r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    })
  }

  return { client: r2Client, bucket: config.bucket }
}

export async function createProtectedDownloadUrl(objectKey: string, filename: string) {
  const { client, bucket } = getClient()
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: objectKey,
    ResponseContentDisposition: `attachment; filename="${filename}"`,
  })

  return getSignedUrl(client, command, { expiresIn: 120 })
}
