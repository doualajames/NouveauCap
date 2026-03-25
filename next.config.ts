import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
  serverExternalPackages: ['@mdxeditor/editor', 'mammoth'],
};

export default nextConfig;
