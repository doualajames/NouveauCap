import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  transpilePackages: ['pdf-parse', 'mammoth'],
  // Exclure du bundle serveur les packages qui utilisent des APIs browser
  serverExternalPackages: ['@mdxeditor/editor'],
  experimental: {
    // Activer le hook d'instrumentation (nécessaire pour le polyfill DOMMatrix)
    instrumentationHook: true,
  },
};

export default nextConfig;
