import React from 'react';
import { getNextEvent } from '@/utils/eventUtils';
import UpcomingNextEvent from './UpcomingNextEvent';
import ComingSoon from './ComingSoonEvents';

const HomePageEvents: React.FC = () => {
  const nextEvent = getNextEvent();

  // If no upcoming events, show coming soon
  if (!nextEvent) {
    return <ComingSoon />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <UpcomingNextEvent event={nextEvent} />
    </div>
  );
};

export default HomePageEvents;