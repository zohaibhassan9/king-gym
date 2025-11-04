import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Removed 'output: export' to allow API routes to work
  // API routes require a server and cannot be statically exported
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
