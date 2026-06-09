import Link from 'next/link';
import { getPosts } from '../lib/posts';

export default function HomePage() {
  const posts = getPosts().sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold text-center mb-12">Naomi Christos</h1>
      <p className="text-center mb-12 text-lg">
        9-year-old Saxophonist & Model — Music, Modeling, & Performances
      </p>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.slug} className="p-6 border rounded-lg shadow hover:shadow-lg transition prose">
            {post.data.cover && (
              <img src={post.data.cover} alt={post.data.title} className="mb-4 rounded" />
            )}
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${post.slug}`}>{post.data.title}</Link>
            </h2>
            <p className="text-gray-500 mb-2">{post.data.date}</p>
            <p>{post.content.slice(0, 150)}...</p>
            <Link href={`/blog/${post.slug}`} className="text-blue-500 mt-2 inline-block">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
