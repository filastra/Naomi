import { getPosts, getPostContent } from '../../../lib/posts';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostContent(slug);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/" className="text-blue-500">← Back to homepage</Link>
      <h1 className="mt-6 text-4xl font-bold">{post.data.title}</h1>
      <p className="mt-2 text-gray-500">{post.data.date}</p>

      {post.data.cover && (
        <img src={post.data.cover} alt={post.data.title} className="mt-6 mb-6 rounded" />
      )}

      <article className="prose prose-lg max-w-full" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </main>
  );
}
