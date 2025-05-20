/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  transpilePackages: ['@mui/x-date-pickers', '@mui/material'],
}

module.exports = nextConfig 