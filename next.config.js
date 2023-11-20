/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['localhost','dummyimage.com'],
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
        },
        {
          protocol: 'http',
          hostname: 'dummyimage.com',
        },
      ],
    },
  }
  
  module.exports = nextConfig;
  