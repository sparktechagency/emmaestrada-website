/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.10.7.48',
        port: '5000',
        pathname: '/**',  // optional but good to have
      },
      {
        protocol: 'http',
        hostname: '10.10.7.48',
        port: '5001',
        pathname: '/**',  // optional but good to have
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',       
      },
      {
        protocol: 'https',
        hostname: 'api.wesound.app',       
      },
    ],
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development' ? true : false,  // ← Correct: top-level under images
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