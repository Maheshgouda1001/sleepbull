import { notFound } from "next/navigation";

import Container from "@/components/layout/Container";
import { generateSEO } from "@/config/seo";
import { getBlog } from "@/services/blog.service";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return generateSEO({ title: "Blog Not Found" });
  }

  return generateSEO({
    title: blog.title,
    description: blog.excerpt,
    url: `/blogs/${blog.slug}`,
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <Container className="py-24">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">{blog.title}</h1>
        {blog.excerpt && (
          <p className="mt-4 text-lg text-slate-600">{blog.excerpt}</p>
        )}
        <div className="prose prose-slate mt-10 max-w-none whitespace-pre-wrap leading-8 text-slate-700">
          {blog.content}
        </div>
      </article>
    </Container>
  );
}
