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
  },

  eslint: {
    ignoreDuringBuilds: true, // 🚀 skips ESLint during build
  },
};

export default nextConfig;
