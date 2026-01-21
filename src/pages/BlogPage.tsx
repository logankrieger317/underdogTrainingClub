import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Positive Reinforcement Training',
    excerpt: 'Learn why positive reinforcement is the most effective and humane way to train your dog.',
    date: '2024-01-15',
    category: 'Training Methods',
  },
  {
    id: 2,
    title: 'Socialization: The Key to a Confident Puppy',
    excerpt: 'Discover how thoughtful socialization helps puppies grow into well-adjusted adult dogs.',
    date: '2024-01-10',
    category: 'Puppy Care',
  },
  {
    id: 3,
    title: 'Building Trust with Your Rescue Dog',
    excerpt: 'Tips and strategies for helping newly adopted dogs feel safe and build confidence.',
    date: '2024-01-05',
    category: 'Rescue Dogs',
  },
];

export function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-24">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Training tips, dog care advice, and stories from our pack.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="card">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>•</span>
                    <span className="text-primary-600 font-medium">{post.category}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>

            {/* Coming Soon */}
            <div className="mt-12 text-center">
              <p className="text-gray-500">
                More articles coming soon! Check back regularly for new training tips and dog care advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
