import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hanya config dasar agar tidak crash
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;