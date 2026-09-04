/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/a-prisao-ou-o-milhao',
        destination: 'https://prisao-milhao.vercel.app',
      },
    ]
  },
}

export default nextConfig
