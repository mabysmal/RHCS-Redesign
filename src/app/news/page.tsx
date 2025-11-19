import { getAllNewsPosts } from '@/utils/newsUtils';
import NewsListClient from './NewsListClient';

export default function NewsPage() {
  const allPosts = getAllNewsPosts();

  const years = [...new Set(allPosts.map(post => post.year))]
    .sort((a, b) => b.localeCompare(a));

  return (
    <main className="bg-background text-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-inter text-darkgreen mb-8 border-b-2 border-olive pb-4">
          News & Updates
        </h1>

        <NewsListClient allPosts={allPosts} years={years} />
      </div>
    </main>
  );
}