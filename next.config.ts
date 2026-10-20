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
  async headers() {
    return [
      {
        source: '/:path*(Shaadproject|shaadproject)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
