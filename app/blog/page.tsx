import Link from 'next/link';
import { getPosts } from '../../lib/posts';

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Blog Archive
      </h1>

      {posts.map((post) => (
        <div key={post.slug} className="mb-6">
          <Link href={`/blog/${post.slug}`}>
            {String(post.data.title)}
          </Link>
        </div>
      ))}
    </main>
  );
}
