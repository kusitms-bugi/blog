"use client";

import type { Post } from "@/lib/types";
import PostCard from "@/components/post-card";
import PostFilter from "@/components/post-filter";
import { useState, useMemo } from "react";

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 모든 카테고리와 태그 추출
  const { categories, tags } = useMemo(() => {
    const categoriesSet = new Set<string>();
    const tagsSet = new Set<string>();

    posts.forEach((post) => {
      if (post.category) categoriesSet.add(post.category);
      if (post.tags) post.tags.forEach((tag) => tagsSet.add(tag));
    });

    return {
      categories: Array.from(categoriesSet).sort(),
      tags: Array.from(tagsSet).sort(),
    };
  }, [posts]);

  // 필터링된 포스트
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;
      const matchesTags =
        selectedTags.length === 0 ||
        (post.tags &&
          selectedTags.every((selectedTag) => post.tags?.includes(selectedTag)));

      return matchesCategory && matchesTags;
    });
  }, [posts, selectedCategory, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
  };

  return (
    <>
      <PostFilter
        categories={categories}
        tags={tags}
        selectedCategory={selectedCategory}
        selectedTags={selectedTags}
        onCategorySelect={setSelectedCategory}
        onTagToggle={handleTagToggle}
        onClearFilters={handleClearFilters}
      />

      <div className="mb-6 text-sm text-muted-foreground">
        {filteredPosts.length}개의 포스트
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            선택한 필터에 해당하는 포스트가 없습니다.
          </p>
        </div>
      )}
    </>
  );
}
