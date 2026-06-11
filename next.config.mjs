// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // Static export cho GitHub Pages / Vercel
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
