/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
