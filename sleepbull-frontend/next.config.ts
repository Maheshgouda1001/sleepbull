import type { NextConfig } from "next";

const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "https://api.sleepbull.com";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/public/**",
      },
      {
        protocol: "https",
        hostname: new URL(apiBase).hostname,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: new URL(apiBase).hostname,
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;
