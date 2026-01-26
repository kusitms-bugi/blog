import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { PageObjectResponse, BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import fs from "fs";
import path from "path";
import type { Post } from "./types";
import { generateSlug } from "./types";
import { Octokit } from "octokit";
import axios from "axios";
import crypto from "crypto";

if (!process.env.NOTION_TOKEN || !process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO || !process.env.NOTION_DATABASE_ID) {
  throw new Error("환경 변수 NOTION_TOKEN, GITHUB_TOKEN, GITHUB_REPO, NOTION_DATABASE_ID가 모두 설정되어야 합니다.");
}

export const notion = new Client({ auth: process.env.NOTION_TOKEN });
export const n2m = new NotionToMarkdown({ notionClient: notion });

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const [GITHUB_OWNER, GITHUB_REPO_NAME] = process.env.GITHUB_REPO.split('/');
const IMAGES_PATH = 'public/images/notion';

export type { Post };
export { getWordCount } from "./utils";


async function processImageBlock(block: BlockObjectResponse): Promise<string> {
  if (block.type !== 'image' || block.image.type !== 'file') {
    console.warn(`Unsupported block type or image type. Skipping block ${block.id}`);
    return '';
  }

  const imageUrl = block.image.file.url;
  const blockId = block.id;

  const fileExtension = path.extname(new URL(imageUrl).pathname) || '.png';
  const filename = `${crypto.createHash('sha256').update(blockId).digest('hex')}${fileExtension}`;
  const githubPath = `${IMAGES_PATH}/${filename}`;
  
  const githubRawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO_NAME}/main/${githubPath}`;
  
  try {
    await octokit.rest.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO_NAME,
      path: githubPath,
    });
  } catch (error: any) {
    if (error.status === 404) {
      console.log(`[Image Upload] New image found for block ${blockId}. Uploading as ${filename}...`);
      
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data);

      await octokit.rest.repos.createOrUpdateFileContents({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO_NAME,
        path: githubPath,
        message: `feat(images): Upload Notion image ${filename}`,
        content: imageBuffer.toString('base64'),
        committer: {
          name: 'Blog Build Bot',
          email: 'bot@example.com',
        },
        author: {
          name: 'Blog Build Bot',
          email: 'bot@example.com',
        }
      });
      console.log(`[Image Upload] Successfully uploaded ${filename}`);
    } else {
      console.error(`[Image Upload] Error checking image ${filename}:`, error);
      throw error;
    }
  }

  const altText = block.image.caption?.map((c: RichTextItemResponse) => c.plain_text).join("") || filename;
  return `![${altText}](${githubRawUrl})`;
}

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

    // Set custom transformer for image blocks
    n2m.setCustomTransformer("image", processImageBlock as any);

    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const mdResult = n2m.toMarkdownString(mdBlocks) as any;
    const contentString: string =
      typeof mdResult === "string"
        ? mdResult
        : (mdResult?.parent as string) ?? "";

    // Get first paragraph for description (excluding empty lines)
    const paragraphs = (contentString || "")
      .split("\n")
      .filter((line: string) => line.trim().length > 0 && !/^!\[.*\]\(.*\)$/.test(line.trim())); // 이미지 태그 제외
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
    console.error(`Error getting post ${pageId}:`, error);
    return null;
  }
}
