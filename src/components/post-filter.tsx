"use client";

import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface PostFilterProps {
  categories: string[];
  tags: string[];
  selectedCategory: string | null;
  selectedTags: string[];
  onCategorySelect: (category: string | null) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

export default function PostFilter({
  categories,
  tags,
  selectedCategory,
  selectedTags,
  onCategorySelect,
  onTagToggle,
  onClearFilters,
}: PostFilterProps) {
  const hasActiveFilters = selectedCategory || selectedTags.length > 0;

  return (
    <div className="space-y-6 mb-12">
      {/* 카테고리 필터 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">카테고리</h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              전체 해제
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => onCategorySelect(null)}
          >
            전체
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90 transition-colors"
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* 태그 필터 */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">태그</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Badge
                key={tag}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90 transition-colors"
                onClick={() => onTagToggle(tag)}
              >
                {tag}
                {isSelected && <X className="ml-1 h-3 w-3" />}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* 필터 결과 표시 */}
      {hasActiveFilters && (
        <div className="text-sm text-muted-foreground">
          {selectedCategory && (
            <span>
              카테고리: <strong>{selectedCategory}</strong>
            </span>
          )}
          {selectedCategory && selectedTags.length > 0 && <span> | </span>}
          {selectedTags.length > 0 && (
            <span>
              태그: <strong>{selectedTags.join(", ")}</strong>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
