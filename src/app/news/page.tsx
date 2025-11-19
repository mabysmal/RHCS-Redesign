import { getAllNewsPosts } from '@/utils/newsUtils';
import NewsListClient from './NewsListClient';

export default function NewsPage() {
  const allPosts = getAllNewsPosts();

  const years = [...new Set(allPosts.map(post => post.year))]
    .sort((a, b) => b.localeCompare(a));

  return (
    <main className="bg-background text-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className='mb-8 border-b-2 border-olive pb-4'>
          <h1 className="text-3xl font-Inter font-black text-darkgreen capitalize animate-slide-down pb-2">
            News & Updates
          </h1>
          <p className='text-sm md:text-lg font-poppins font-medium text-gray-700 animate-slide-down'>The Riverview Lands are a living landscape, always full of new stories. Explore the latest updates on our work to preserve these historic grounds and stay connected with the life of the Riverview Lands.</p>
        </div>
        


        <NewsListClient allPosts={allPosts} years={years} />
      </div>
    </main>
  );
}