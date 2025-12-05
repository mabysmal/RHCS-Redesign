'use client';

import React, { useState } from 'react';
import { VolunteerSection as VolunteerSectionData, VolunteerPosition } from '@/utils/getInvolved';
import Modal from './Modal';
import Pagination from './Pagination';
import { marked } from 'marked';

interface VolunteerSectionProps {
  sectionData: VolunteerSectionData;
  positions: VolunteerPosition[];
}

// Icon mapping
const iconComponents: Record<string, React.FC<{ className?: string }>> = {
  'Events': ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  'Guided Walks': ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  'Safety Support': ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  'Gardening': ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

const ITEMS_PER_PAGE = 6;

const VolunteerSection: React.FC<VolunteerSectionProps> = ({ sectionData, positions }) => {
  const [selectedPosition, setSelectedPosition] = useState<VolunteerPosition | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(positions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPositions = positions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getContactInfo = (position: VolunteerPosition) => {
    if (position.contactType === 'Email' && position.contactEmail) {
      return {
        text: `Email: ${position.contactEmail}`,
        subject: `Volunteer - ${position.title}`,
      };
    }
    if (position.contactType === 'External Link' && position.contactURL) {
      return {
        url: position.contactURL,
      };
    }
    return null;
  };

  return (
    <section id="volunteer" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-center text-darkgreen font-inter">
          {sectionData.title}
        </h2>

        {/* Description */}
        {sectionData.description && (
          <div
            className="prose prose-sm sm:prose-base lg:prose-lg mx-auto mb-10 sm:mb-12 text-gray-700 font-poppins text-center max-w-3xl"
            dangerouslySetInnerHTML={{ __html: marked.parse(sectionData.description) as string }}
          />
        )}

        {/* Positions Grid */}
        {positions.length === 0 ? (
          <p className="text-center text-gray-600 font-poppins italic">
            No volunteer positions available at this time. Check back soon!
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPositions.map((position) => {
                const Icon = iconComponents[position.icon] || iconComponents['Events'];
                
                return (
                  <div
                    key={position.slug}
                    className="bg-cream rounded-2xl p-6 border-2 border-darkgreen/10 hover:border-darkgreen/30 hover:shadow-medium transition-all cursor-pointer group"
                    onClick={() => setSelectedPosition(position)}
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 mb-4 text-olive group-hover:text-terracotta transition-colors">
                      <Icon className="w-full h-full" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-darkgreen mb-3 font-inter group-hover:text-terracotta transition-colors">
                      {position.title}
                    </h3>

                    {/* Time Commitment */}
                    {position.timeCommitment && (
                      <p className="text-sm text-gray-600 font-opensans mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {position.timeCommitment}
                      </p>
                    )}

                    {/* Truncated Description */}
                    <div className="text-sm sm:text-base text-gray-700 font-poppins line-clamp-3 mb-4">
                      <div dangerouslySetInnerHTML={{ __html: position.htmlDescription }} />
                    </div>

                    {/* Learn More Link */}
                    <button className="text-terracotta font-semibold text-sm sm:text-base font-inter flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}

        {/* Modal for Position Details */}
        {selectedPosition && (
          <Modal isOpen={!!selectedPosition} onClose={() => setSelectedPosition(null)}>
            <div className="space-y-4">
              {/* Icon & Title */}
              <div className="flex items-start gap-4">
                {iconComponents[selectedPosition.icon] && (
                  <div className="w-12 h-12 text-terracotta flex-shrink-0">
                    {React.createElement(iconComponents[selectedPosition.icon], { className: 'w-full h-full' })}
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-darkgreen font-inter">
                    {selectedPosition.title}
                  </h2>
                  {selectedPosition.timeCommitment && (
                    <p className="text-sm text-gray-600 font-opensans mt-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {selectedPosition.timeCommitment}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div
                className="prose prose-sm sm:prose-base max-w-none text-gray-700 font-poppins"
                dangerouslySetInnerHTML={{ __html: selectedPosition.htmlDescription }}
              />

              {/* Contact Information */}
              {(() => {
                const contactInfo = getContactInfo(selectedPosition);
                if (!contactInfo) return null;

                if ('url' in contactInfo) {
                  return (
                    <div className="pt-4 border-t border-gray-200">
                      <a
                        href={contactInfo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-cream rounded-xl font-semibold shadow-md hover:bg-terracottalight transition-colors duration-300 font-inter"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Apply Now
                      </a>
                    </div>
                  );
                }

                return (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 font-opensans mb-3">
                      Interested? Send an email to apply:
                    </p>
                    <a
                      href={`mailto:${selectedPosition.contactEmail}?subject=${encodeURIComponent(contactInfo.subject)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-cream rounded-xl font-semibold shadow-md hover:bg-terracottalight transition-colors duration-300 font-inter"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {contactInfo.text}
                    </a>
                  </div>
                );
              })()}
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default VolunteerSection;