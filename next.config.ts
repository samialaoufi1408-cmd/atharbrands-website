import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Never expose the framework header in production.
  poweredByHeader: false,
  // Pin the workspace root so a stray parent lockfile can't be inferred.
  turbopack: {
    root: __dirname,
  },
  // This site uses CSS/SVG mockups only — no remote image hosts are needed.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
