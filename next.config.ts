/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['10.10.7.48'],

    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },

    ],
  },

  experimental: {
    serverSourceMaps: false,  // ✅ Fixes invalid source map error
    serverActions: {
      // Increase the maximum request body size
      bodySizeLimit: "10mb",
    },
  },

  eslint: {
    ignoreDuringBuilds: true, // 🚀 skips ESLint during build
  },
};

export default nextConfig;
