/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  experimental: {
    serverSourceMaps: false,
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;