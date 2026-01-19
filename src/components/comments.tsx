"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useIsMobile } from "@/hooks/use-mobile";

interface Comment {
  id: number;
  created_at: string;
  post_slug: string;
  author_name: string;
  content: string;
  is_anonymous: boolean;
}

interface Props {
  postSlug: string;
}

export default function SupabaseComments({ postSlug }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_slug", postSlug)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setComments(data as Comment[]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const commentToInsert = {
      post_slug: postSlug,
      author_name: isAnonymous ? "Anonymous" : authorName,
      content: newComment,
      is_anonymous: isAnonymous,
    };

    const { error } = await supabase.from("comments").insert([commentToInsert]);

    if (error) {
      console.error("Error posting comment:", error);
    } else {
      setNewComment("");
      setAuthorName("");
      fetchComments();
    }
  };

  return (
    <div className="mt-16 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold">Comments</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="flex-1 p-2 border rounded"
              disabled={isAnonymous}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <span>Post as anonymous</span>
            </label>
          </div>
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-2 border rounded"
            rows={isMobile ? 3 : 4}
          />
          <button
            type="submit"
            className="self-end px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="mt-8 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 border rounded">
            <div className="flex items-center justify-between">
              <p className="font-bold">
                {comment.is_anonymous ? "Anonymous" : comment.author_name}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>
            <p className="mt-2">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
