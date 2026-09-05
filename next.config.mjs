/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/a-prisao-ou-o-milhao',
          destination: 'https://prisao-milhao.vercel.app/?rev=20260904-mobile-approved-final',
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig
