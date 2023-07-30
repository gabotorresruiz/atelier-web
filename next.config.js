/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    // Remover esto una vez se arreglen los errores de ESLint
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  publicRuntimeConfig: {
    // Available on both server and client
    theme: 'DEFAULT'
  }
};

module.exports = nextConfig;
