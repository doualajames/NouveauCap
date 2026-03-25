import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  transpilePackages: ['pdf-parse', 'mammoth'],
};

export default nextConfig;
