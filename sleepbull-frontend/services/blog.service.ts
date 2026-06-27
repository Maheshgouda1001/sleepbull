import { fetcher, safeFetcher } from "@/lib/fetcher";
import { ENDPOINTS } from "@/lib/endpoints";
import { resolveAssetUrl } from "@/lib/mappers";
import type { ApiBlog } from "@/lib/api-types";
import type { Blog } from "@/types/blog";

function mapBlog(blog: ApiBlog): Blog {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt ?? "",
    content: blog.content,
    coverImage: blog.coverImage
      ? resolveAssetUrl(blog.coverImage)
      : "/images/placeholder.svg",
    author: "SleepBull",
    tags: [],
    readTime: Math.max(1, Math.ceil(blog.content.length / 1000)),
    isPublished: blog.isPublished,
    publishedAt: blog.publishedAt ?? blog.createdAt,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };
}

export async function getBlogs(limit = 12): Promise<Blog[]> {
  const response = await safeFetcher(
    `${ENDPOINTS.BLOGS}?limit=${limit}`,
    { items: [] as ApiBlog[], meta: { page: 1, limit, total: 0, totalPages: 0 } }
  );

  return response.items
    .filter((blog) => blog.isPublished)
    .map(mapBlog);
}

export async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const blog = await fetcher<ApiBlog>(ENDPOINTS.BLOG_BY_SLUG(slug));
    return mapBlog(blog);
  } catch {
    return null;
  }
}

export async function getBlogListPaginated(limit = 12) {
  return safeFetcher(`${ENDPOINTS.BLOGS}?limit=${limit}`, {
    items: [] as ApiBlog[],
    meta: { page: 1, limit, total: 0, totalPages: 0 },
  });
}
