import { getAllNewsPosts } from '@/utils/newsUtils';
import NewsListClient from './NewsListClient';
import Image from 'next/image';

export default function NewsPage() {
  const allPosts = getAllNewsPosts();

  const years = [...new Set(allPosts.map(post => post.year))]
    .sort((a, b) => b.localeCompare(a));

  return (
    <main className="bg-background text-primary max-w-4xl pt-8 p-6 mx-auto">
      <div className="mx-auto">

        {/*Hero */}
        <div className="flex justify-center flex-col md:flex-row gap-8 items-center mb-8 border-b-2 border-olive pb-8">
          
          {/* left */}
          <div className="w-full md:w-2/3 animate-slide-down">
            <h1 className="text-3xl font-Inter font-black text-darkgreen capitalize pb-2">
              News & Updates
            </h1>
            <p className='text-sm md:text-lg font-poppins font-medium text-gray-700'>
              The Riverview Lands are a living landscape, always full of new stories. Explore the latest updates on our work to preserve these historic grounds and stay connected with the life of the Riverview Lands.
            </p>
          </div>

          {/* right */}
          <div className="w-3/4 md:w-1/3 aspect-square relative rounded-2xl overflow-hidden">
            <Image
              src="/news.jpg" 
              alt="Riverview Horticultural Centre Society News"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          
        </div>
        
        {/*News List*/}
        <div className='mt-12'>
          <h2 className="text-2xl font-Inter font-bold text-darkgreen mb-6">
            Latest News
          </h2>
          <NewsListClient allPosts={allPosts} years={years} />
        </div>

      </div>
    </main>
  );
}