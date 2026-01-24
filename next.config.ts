import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'updf.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'writelatex.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
