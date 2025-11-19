"use client";

import { useState, useMemo } from 'react';
import { ProcessedNewsPost } from '@/utils/newsUtils';
import NewsCard from './NewsCard';
import Pagination from '../components/Pagination';

type SortOrder = 'newest' | 'oldest';

interface NewsListClientProps {
  allPosts: ProcessedNewsPost[];
  years: string[];
}

const ITEMS_PER_PAGE = 6;

export default function NewsListClient({ allPosts, years }: NewsListClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [selectedYear, setSelectedYear] = useState('all');

  const filteredPosts = useMemo(() => {
    if (selectedYear === 'all') {
      return allPosts;
    }
    return allPosts.filter(post => post.year === selectedYear);
  }, [allPosts, selectedYear]);

  const sortedPosts = useMemo(() => {
    const postsCopy = [...filteredPosts];
    if (sortOrder === 'oldest') {
      return postsCopy.reverse();
    }
    return postsCopy;
  }, [filteredPosts, sortOrder]);
  
  const totalPages = Math.ceil(sortedPosts.length / ITEMS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, sortedPosts]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as SortOrder);
    setCurrentPage(1); 
  };
  
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-end gap-4 mb-8">
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="border-olive focus:ring-olive focus:border-olive rounded-md"
        >
          <option value="all">Filter by Year: All</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border-olive focus:ring-olive focus:border-olive rounded-md"
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
        </select>
      </div>
      
      {selectedYear !== 'all' && (
        <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-olive"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-2xl font-semibold text-olive">
                {selectedYear}
              </span>
            </div>
        </div>
      )}

      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">No news posts found for the selected criteria.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}