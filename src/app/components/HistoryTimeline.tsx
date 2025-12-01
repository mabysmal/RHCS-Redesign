'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { HistoryItem } from '@/utils/historyUtils';

interface HistoryTimelineProps {
  items: HistoryItem[];
}

const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 font-poppins">No hay items de historia disponibles.</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {items.map((item, index) => {
        //switch colors: darkgreen y cream
        const bgColor = index % 2 === 0 ? 'bg-darkgreen' : 'bg-cream';
        const textColor = index % 2 === 0 ? 'text-cream' : 'text-darkgreen';
        const titleColor = index % 2 === 0 ? 'text-cream' : 'text-darkgreen';
        
        //switch image position : left or rgit
        const imageOnLeft = index % 2 === 0;
        
        return (
          <div
            key={index}
            className={twMerge(
              'p-6 md:p-8 animate-fade-in',
              bgColor
            )}
          >
            {/* Mobile Layout (< md) */}
            <div className="md:hidden flex flex-col space-y-4">
              {/* Title */}
              <h3 className={twMerge(
                'text-2xl font-inter font-bold',
                titleColor
              )}>
                {item.title}
              </h3>
              
              {/* Image (1:1 aspect ratio) */}
              {item.image && (
                <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-medium">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
              
              {/* Description */}
              <div 
                className={twMerge(
                  'prose prose-poppins max-w-none',
                  textColor,
                  index % 2 === 0 ? 'prose-invert' : ''
                )}
                dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
              />
              
              {/* Button */}
              {item.button?.text && item.button?.url && (
                <div className="pt-2">
                  <Link
                    href={item.button.url}
                    className={twMerge(
                      'inline-block px-6 py-3 rounded-lg font-inter font-semibold transition-all duration-300 shadow-soft',
                      index % 2 === 0 
                        ? 'bg-terracotta text-cream hover:bg-terracottalight' 
                        : 'bg-darkgreen text-cream hover:bg-olive'
                    )}
                  >
                    {item.button.text}
                  </Link>
                </div>
              )}
            </div>

            {/* Desktop Layout (>= md) - Image and content centered vertically */}
            <div className="hidden md:block">
              <div className="max-w-6xl mx-auto">
                {/* Title */}
                <h3 className={twMerge(
                  'text-3xl font-inter font-bold mb-6',
                  titleColor
                )}>
                  {item.title}
                </h3>
                
                {/* Contenedor con flexbox para centrado vertical */}
                <div className={twMerge(
                  'flex items-center gap-8',
                  imageOnLeft ? 'flex-row' : 'flex-row-reverse'
                )}>
                  {/* Image (4:3 aspect ratio) */}
                  {item.image && (
                    <div 
                      className="flex-shrink-0 w-2/5 rounded-lg overflow-hidden shadow-medium"
                      style={{ aspectRatio: '4/3' }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={500}
                        height={375}
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                  )}
                  
                  {/* Content wrapper - centrado verticalmente */}
                  <div className="flex-1 flex flex-col justify-center">
                    {/* Description */}
                    <div 
                      className={twMerge(
                        'prose prose-lg prose-poppins max-w-none',
                        textColor,
                        index % 2 === 0 ? 'prose-invert' : ''
                      )}
                      dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
                    />
                    
                    {/* Button */}
                    {item.button?.text && item.button?.url && (
                      <div className="mt-6">
                        <Link
                          href={item.button.url}
                          className={twMerge(
                            'inline-block px-8 py-3 rounded-lg font-inter font-semibold transition-all duration-300 shadow-soft',
                            index % 2 === 0 
                              ? 'bg-terracotta text-cream hover:bg-terracottalight' 
                              : 'bg-darkgreen text-cream hover:bg-olive'
                          )}
                        >
                          {item.button.text}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryTimeline;