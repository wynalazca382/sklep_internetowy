/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.dummyjson.com"]
  }
  env:{
    strie_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  }
}

module.exports = nextConfig
