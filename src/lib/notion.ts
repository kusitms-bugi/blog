import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { PageObjectResponse } from "@notionhq/client/";
import fs from "fs";
import path from "path";
import type { Post } from "./types";
import { generateSlug } from "./types";

if (!process.env.NOTION_TOKEN) {
  throw new Error("NOTION_TOKEN이 설정되어 있지 않습니다. .env.local 또는 배포 환경변수를 확인하세요.");
}
export const notion = new Client({ auth: process.env.NOTION_TOKEN });
export const n2m = new NotionToMarkdown({ notionClient: notion });

export type { Post };
export { getWordCount } from "./utils";

export async function getDatabaseStructure() {
  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID!,
  });
  return database;
}

export function getPostsFromCache(): Post[] {
  const cachePath = path.join(process.cwd(), "posts-cache.json");
  if (fs.existsSync(cachePath)) {
    try {
      const cache = fs.readFileSync(cachePath, "utf-8");
      return JSON.parse(cache);
    } catch (error) {
      console.error("Error reading posts cache:", error);
      return [];
    }
  }
  return [];
}

export async function fetchPublishedPosts() {
  // This function is now intended to be used only by the caching script.
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "Status",
          status: {
            equals: "Published",
          },
        },
      ],
    },
    sorts: [
      {
        property: "Published Date",
        direction: "descending",
      },
    ],
  });

  return posts.results as PageObjectResponse[];
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = getPostsFromCache();
  const post = posts.find((p) => p.slug === slug);
  return post || null;
}

export async function getPostFromNotion(pageId: string): Promise<Post | null> {
  try {
    const page = (await notion.pages.retrieve({
      page_id: pageId,
    })) as PageObjectResponse;
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const mdResult = n2m.toMarkdownString(mdBlocks) as any;
    const contentString: string =
      typeof mdResult === "string"
        ? mdResult
        : (mdResult?.parent as string) ?? "";

    // Get first paragraph for description (excluding empty lines)
    const paragraphs = (contentString || "")
      .split("\n")
      .filter((line: string) => line.trim().length > 0);
    const firstParagraph = paragraphs[0] || "";
    const description =
      firstParagraph.slice(0, 160) + (firstParagraph.length > 160 ? "..." : "");

    const properties = page.properties as any;
    const title = properties.Title.title[0]?.plain_text || "Untitled";
    
    // Slug 속성이 있으면 사용, 없으면 Title에서 자동 생성
    const customSlug = properties.Slug?.rich_text?.[0]?.plain_text;
    const slug = customSlug ? generateSlug(customSlug) : generateSlug(title);
    
    const post: Post = {
      id: page.id,
      title,
      slug,
      coverImage: properties["Featured Image"]?.url || undefined,
      description,
      date:
        properties["Published Date"]?.date?.start || new Date().toISOString(),
      content: contentString,
      author: properties.Author?.people[0]?.name,
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      category: properties.Category?.select?.name,
    };

    return post;
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
}
