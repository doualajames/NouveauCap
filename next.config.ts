import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Ces packages contiennent du code Node.js qui ne peut pas être bundlé
  // par Turbopack (pdf-parse lit des fichiers au démarrage du module)
  serverExternalPackages: ['@mdxeditor/editor', 'pdf-parse', 'mammoth'],
};

export default nextConfig;
