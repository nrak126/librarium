import type { NextConfig } from "next";
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = withPWA({
  // Tauriアプリ対応設定
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      'books.google.com',
      'books.google.co.jp',
      'thumbnail.image.rakuten.co.jp',
      'api.openbd.jp'
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
      },
      {
        protocol: "https",
        hostname: "thumbnail.image.rakuten.co.jp",
      },
    ],
  },
});

export default nextConfig;
