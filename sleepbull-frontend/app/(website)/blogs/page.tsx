import Link from "next/link";

import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";
import { getBlogs } from "@/services/blog.service";

export const metadata = generateSEO({
  title: "Blogs",
  url: "/blogs",
});

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold">Sleep Blog</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        Tips, guides, and sleep insights from the SleepBull team.
      </p>

      {blogs.length === 0 ? (
        <p className="mt-10 text-slate-500">No blog posts published yet.</p>
      ) : (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h2 className="text-2xl font-bold">
                <Link href={`/blogs/${blog.slug}`} className="hover:underline">
                  {blog.title}
                </Link>
              </h2>
              {blog.excerpt && (
                <p className="mt-3 leading-7 text-slate-600">{blog.excerpt}</p>
              )}
              <Link
                href={`/blogs/${blog.slug}`}
                className="mt-4 inline-block font-medium hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </Container>
  );
}
