import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://fakestoreapi.com/img/**')],
  },
  async rewrites() {
    return [
      {
        source: "/api/store/:path*",
        destination: `http://${process.env.FAKESTOREAPI_URI || "fakestoreapi.com"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
