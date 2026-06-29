import type { NextConfig } from "next";

const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://13.55.55.13:4000";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "13.55.55.13",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "13.55.55.13",
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
