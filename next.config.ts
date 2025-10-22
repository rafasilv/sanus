import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    // Desabilitar ESLint durante build Docker
    ignoreDuringBuilds: process.env.DISABLE_ESLINT_PLUGIN === 'true',
  },
  typescript: {
    // Desabilitar verificação TypeScript durante build Docker
    ignoreBuildErrors: process.env.DISABLE_ESLINT_PLUGIN === 'true',
  },
  /* config options here */
};

export default nextConfig;
