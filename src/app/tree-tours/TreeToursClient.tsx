'use client'

import { useState } from 'react';
import { Event } from '@/utils/eventUtils';
import Schedule from '../components/Schedule';

interface TreeToursClientProps {
  initialNextEvent: Event | null;
  initialUpcomingEvents: Event[];
}

export default function TreeToursClient({ 
  initialNextEvent, 
  initialUpcomingEvents 
}: TreeToursClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll suave hacia arriba cuando cambie la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Schedule
      nextEvent={initialNextEvent}
      upcomingEvents={initialUpcomingEvents}
      showFullSchedule={true}
      currentPage={currentPage}
      eventsPerPage={4}
      onPageChange={handlePageChange}
    />
  );
}