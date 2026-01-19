import { getPostsFromCache } from "@/lib/notion";
import BlogList from "@/components/blog-list";

export default function Home() {
  const posts = getPostsFromCache();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.bugi.co.kr/";

  // JSON-LD 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "거부기린 블로그",
    description: "거부기린의 기술 블로그 - 개발, 디자인, 그리고 이야기",
    url: siteUrl,
    inLanguage: "ko-KR",
    author: {
      "@type": "Person",
      name: "거부기린",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "거부기린",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon-512x512.png`,
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${siteUrl}/posts/${post.slug}`,
      datePublished: new Date(post.date).toISOString(),
      author: {
        "@type": "Person",
        name: post.author || "거부기린",
      },
      image: post.coverImage || `${siteUrl}/opengraph-image.png`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Welcome to My Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover interesting articles and insights
          </p>
        </div>

        <BlogList posts={posts} />
      </div>
    </>
  );
}
