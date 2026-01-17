import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 모든 HTTPS 도메인 허용 (개발용)
      },
    ],
    // 또는 특정 도메인만 허용하려면:
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "*.notion.so",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "images.unsplash.com",
    //   },
    // ],
  },
};

export default nextConfig;
