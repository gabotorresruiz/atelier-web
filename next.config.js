/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4566'
      }
    ]
  },
  publicRuntimeConfig: {
    // Available on both server and client
    theme: 'DEFAULT'
  }
};

module.exports = nextConfig;
