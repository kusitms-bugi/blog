import { getPostsFromCache } from "@/lib/notion";
import BlogList from "@/components/blog-list";

export default function Home() {
  const posts = getPostsFromCache();

  return (
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
  );
}
