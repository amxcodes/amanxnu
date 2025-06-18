/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'yaseens-ykfa.netlify.app' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' }
    ]
  },
}

export default nextConfig
