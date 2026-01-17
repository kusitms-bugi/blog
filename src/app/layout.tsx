import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com";
const siteUrl = (() => {
  try {
    // Ensure URL is absolute; will throw if invalid
    return new URL(rawSiteUrl).toString().replace(/\/$/, "");
  } catch {
    // Fallback to a valid default to avoid build-time crash
    return "https://your-site.com";
  }
})();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "거부기린 블로그 🐢",
    template: `%s | 거부기린`,
  },
  description: "거부기린의 기술 블로그 - 개발, 디자인, 그리고 이야기",
  openGraph: {
    title: "거부기린 블로그 🐢",
    description: "거부기린의 기술 블로그 - 개발, 디자인, 그리고 이야기",
    url: siteUrl,
    siteName: "거부기린",
    images: [
      {
        url: `${siteUrl}/opengraph-image.png`,
        width: 1920,
        height: 1080,
        alt: "거부기린 블로그",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "거부기린 블로그 🐢",
    description: "거부기린의 기술 블로그 - 개발, 디자인, 그리고 이야기",
    images: [`${siteUrl}/opengraph-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: `${siteUrl}/site.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
