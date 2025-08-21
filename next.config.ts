import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
    cacheComponents: true,
  },
};
// cacheComponents: true,
export default nextConfig;
