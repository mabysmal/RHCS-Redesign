'use client';

import React, { useState } from 'react';
import { SerializedEvent } from '@/utils/eventUtils';
import Modal from './Modal';
import EventDetailsModal from './EventDetailsModal';
import Pagination from './Pagination';
interface OtherUpcomingEventsProps {
  events: SerializedEvent[];
}

const ITEMS_PER_PAGE = 3;

const OtherUpcomingEvents: React.FC<OtherUpcomingEventsProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<SerializedEvent | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (events.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEvents = events.slice(startIndex, endIndex);

  const handleReadMore = (event: SerializedEvent) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="space-y-4 px-4">
        {currentEvents.map((event) => {
          const isDescriptionTruncated = event.description && event.description.length > 100;
          const truncatedDescription = event.description 
            ? event.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
            : '';

          return (
            <div
              key={event.slug}
              className="bg-cream border-darkgreen border-2 rounded-lg hover:shadow-md transition-shadow p-4"
            >

              <div className="flex flex-row justify-center gap-6 h-full">
                {/* Date Display */}
                <div className="flex justify-center sm:justify-start sm:self-stretch">
                  <div className="bg-darkgreen rounded-lg flex flex-col justify-center py-4 sm:py-0 min-w-[5rem] sm:w-[5rem] text-center sm:h-full">
                    <div className="text-xs pt-2 font-bold text-cream uppercase tracking-wide">{event.month}</div>
                    <div className="text-2xl font-bold text-cream">{event.dayOfMonth}</div>
                    <div className="text-xs pb-2 font-bold text-cream capitalize">{event.dayOfWeek}</div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{event.title}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Iconos y texto de tiempo/lugar */}
                        <svg className="w-4 h-4" fill="#283618" viewBox="0 0 20 20">{/* ... path ... */}</svg>
                        <span>{event.formattedStartTime} - {event.formattedEndTime}</span>
                        {event.location && ( <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="#283618" viewBox="0 0 20 20">{/* ... path ... */}</svg>{event.location}</span>)}
                    </div>
                  </div>
                  {event.description && (
                    <div className="my-2 text-sm text-gray-700">
                      <div dangerouslySetInnerHTML={{ __html: isDescriptionTruncated ? truncatedDescription : event.description }} />
                      {isDescriptionTruncated && (
                        <button onClick={() => handleReadMore(event)} className="text-terracotta hover:text-darkgreen font-medium mt-1 transition-colors duration-200 underline">Read more</button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      <Modal isOpen={!!selectedEvent} onClose={closeModal}>
        {selectedEvent && <EventDetailsModal event={selectedEvent} />}
      </Modal>
    </>
  );
};

export default OtherUpcomingEvents;