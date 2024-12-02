import React from 'react';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Summer Fashion Trends 2024',
    excerpt: 'Discover the hottest trends for the upcoming summer season.',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
    category: 'Trends'
  },
  {
    id: 2,
    title: 'Sustainable Fashion Guide',
    excerpt: 'How to build an eco-friendly wardrobe without compromising on style.',
    imageUrl: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800',
    category: 'Sustainability'
  },
  {
    id: 3,
    title: 'Accessorizing 101',
    excerpt: 'Master the art of accessorizing with these simple tips.',
    imageUrl: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=800',
    category: 'Style Tips'
  }
];

export const FashionBlog: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Style Guide</h2>
          <p className="mt-4 text-xl text-gray-600">
            Fashion tips, trends, and inspiration for your perfect look
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-indigo-600 uppercase tracking-wide font-semibold">
                  {post.category}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="mt-3 text-base text-gray-500">
                  {post.excerpt}
                </p>
                <div className="mt-4">
                  <button className="text-indigo-600 hover:text-indigo-500 font-medium inline-flex items-center">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};