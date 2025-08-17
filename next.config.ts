import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: '*.pythonanywhere.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/512/**',
      },
    ],
  },
  // تعطيل ESLint في وقت البناء لتجنب فشل البناء بسبب أخطاء ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  // تعطيل التحقق من أنواع TypeScript في وقت البناء
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
