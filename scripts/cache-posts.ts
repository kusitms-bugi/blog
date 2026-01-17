import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load env from .env.local explicitly before importing any app modules
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function cachePosts() {
  try {
    console.log('Fetching posts from Notion...');
    // Dynamic import AFTER dotenv is loaded to ensure env vars are available
    const { fetchPublishedPosts, getPostFromNotion } = await import('../src/lib/notion');
    const posts = await fetchPublishedPosts();

    const allPosts = [];

    for (const post of posts) {
      const postDetails = await getPostFromNotion(post.id);
      if (postDetails) {
        allPosts.push(postDetails);
      }
    }

    const cachePath = path.join(process.cwd(), 'posts-cache.json');
    fs.writeFileSync(cachePath, JSON.stringify(allPosts, null, 2));

    console.log(`Successfully cached ${allPosts.length} posts.`);
  } catch (error) {
    console.error('Error caching posts:', error);
    process.exit(1);
  }
}

cachePosts();
