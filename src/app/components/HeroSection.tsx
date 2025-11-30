'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { HeroSectionData } from '@/utils/heroUtils';


interface HeroSectionProps {
  data: HeroSectionData | null;
  /** Optional: override default height, e.g., 'h-[300px]' */
  heightClass?: string;
  /** Optional: override default font sizes for title/description */
  textClasses?: {
    title?: string;
    description?: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  heightClass = 'h-[50vh] min-h-[400px]', // Default height
  textClasses
}) => {
  if (!data) {
    // Render a placeholder or nothing if no data is provided
    return null;
  }

  const { title, description, backgroundImage, primaryButton, secondaryButton } = data;

  // Default to 'forest-light' solid background if no image is provided
  const baseBgClass = backgroundImage ? '' : 'bg-forest-light';

  // Image overlay and filter styles
  const imageOverlayClasses = twMerge(
    'absolute inset-0 z-0',
    backgroundImage ? 'bg-forest-light/[.5]' : '', // Apply tint with specified opacity
    'brightness-40' // Apply brightness filter
  );

  const imageFilterClasses = twMerge(
    backgroundImage ? 'blur-20' : '' // Apply blur filter
  );

  const containerClasses = twMerge(
    'relative w-full flex items-center justify-center text-center p-8 overflow-hidden',
    baseBgClass, // Solid background if no image
    heightClass // Apply height class
  );

  const contentWrapperClasses = 'relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto w-full';

  // Customizable text classes using props or defaults
  const defaultTitleClasses = 'text-5xl font-bold mb-4 font-poppins text-white drop-shadow-lg';
  const defaultDescriptionClasses = `text-xl mb-8 font-opensans text-cream max-w-2xl mx-auto ${description?.length > 100 ? 'lg:max-w-3xl' : ''}`; // Adjust max-width for longer descriptions if needed

  const titleClasses = twMerge(defaultTitleClasses, textClasses?.title);
  const descriptionClasses = twMerge(defaultDescriptionClasses, textClasses?.description);

  return (
    <section className={containerClasses}>
      {/* Background Image or Solid Color */}
      {backgroundImage && (
        <div className={twMerge('relative w-full h-full', imageFilterClasses)}>
          <Image
            src={backgroundImage}
            alt="Hero Background Image"
            layout="fill" // Fills the parent container
            objectFit="cover" // Covers the area, cropping if necessary
            quality={75} // Adjust image quality as needed
            className="z-0" // Ensure image is behind content
          />
          {/* Tint Overlay */}
          <div className={imageOverlayClasses}></div>
        </div>
      )}

      {/* Content Wrapper */}
      <div className={contentWrapperClasses}>
        <h1 className={titleClasses}>{title}</h1>
        {description && ( // Only render paragraph if description exists
          <p className={descriptionClasses}>{description}</p>
        )}

        {/* Buttons */}
        {(primaryButton?.text && primaryButton.url) || (secondaryButton?.text && secondaryButton.url) ? (
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {primaryButton?.text && primaryButton.url && (
              <Link
                href={primaryButton.url}
                className="px-8 py-3 bg-terracotta text-cream rounded-xl text-lg font-semibold shadow-md hover:bg-terracottalight transition-colors duration-300 font-inter
                           focus:outline-none focus:ring-2 focus:ring-terracottalight focus:ring-opacity-50"
              >
                {primaryButton.text}
              </Link>
            )}
            {secondaryButton?.text && secondaryButton.url && (
              <Link
                href={secondaryButton.url}
                className="px-8 py-3 bg-forest-light border-2 border-cream text-cream rounded-xl text-lg font-semibold hover:bg-forest-cream/10 transition-colors duration-300 font-inter
                           focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default HeroSection;