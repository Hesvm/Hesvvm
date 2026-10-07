import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/Shaadproject',
        destination: '/Shaadproject/index.html',
      },
      {
        source: '/shaadproject',
        destination: '/Shaadproject/index.html',
      },
    ];
  },
};

export default nextConfig;
