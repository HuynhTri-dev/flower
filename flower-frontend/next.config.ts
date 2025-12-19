import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hoaviet247.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
