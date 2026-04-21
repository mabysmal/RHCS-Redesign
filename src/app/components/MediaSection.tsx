import React from 'react';
import Image from 'next/image';
import YouTubeEmbed from './YouTubeEmbed';
import AudioPlayer from './AudioPlayer';
import { MediaSectionData } from '@/utils/homeUtils';

interface MediaSectionProps {
  data: MediaSectionData;
}

export default function MediaSection({ data }: MediaSectionProps) {
  return (
    <section className="py-16 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-inter font-black text-darkgreen text-center mb-12 animate-slide-down">
          {data.title}
        </h2>
        
        <div className="space-y-12">
          {data.mediaItems.map((item, index) => (
            <div 
              key={index} 
              className="animate-slide-up flex flex-col md:flex-row gap-6 md:gap-8 items-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Text Section - 2/3 width on desktop */}
              <div className="w-full md:w-2/3 order-2 md:order-1">
                <h3 className="text-2xl font-inter font-bold text-darkgreen mb-2">
                  {item.title}
                </h3>
                <p className="text-lg font-poppins text-dark/70 font-semibold">
                  {item.description}
                </p>
              </div>

              {/* Media Section - 1/3 width on desktop */}
              <div className="w-full md:w-1/3 order-1 md:order-2">
                {item.type === 'YouTube Video' && item.youtubeUrl && (
                  <YouTubeEmbed url={item.youtubeUrl} title={item.title} />
                )}

                {item.type === 'Audio' && item.audioFile && (
                  <AudioPlayer src={item.audioFile} title={item.title} />
                )}

                {item.type === 'Image' && item.imageFile && (
                  <div className="relative w-full h-auto overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={item.imageFile}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                      priority={false}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}