import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  //output: 'export',
  images: { unoptimized: true },
  typedRoutes: true,   // 👈 ya no dentro de experimental
};

export default nextConfig;