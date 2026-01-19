import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.bugi.co.kr/";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",     // 관리자 페이지
        "/api/",      // API 경로
        "/private/",  // 기타 비공개 경로
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
