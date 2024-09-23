// pages/blog/index.tsx

'use client';

import Link from 'next/link';
import Layout from '../layout';
export default function BlogIndexPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'Sending SMS Messages with Termux on Android',
      summary:
        'Learn how to use Termux on Android to send SMS messages using your own phone number.',
      date: 'September 20, 2024',
      slug: 'termux-sms',
    },
    // Add more blog posts here
  ];

  return (
    <Layout>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">Blog</h1>
          <p className="mt-4 text-lg">
            Explore our latest articles and tutorials.
          </p>
        </div>
        <div className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-lg text-gray-900">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="border-b border-gray-200 pb-6 mb-6"
            >
              <h2 className="text-2xl font-bold text-indigo-600 hover:underline">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm mt-2">{post.date}</p>
              <p className="mt-4">{post.summary}</p>
              <div className="mt-4">
                <Link href={`/blog/${post.slug}`}>
                  <span className="text-indigo-600 hover:underline cursor-pointer">
                    Read more &rarr;
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Layout>

  );
}
