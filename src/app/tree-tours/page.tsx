// src/pages/events.tsx - Static version
import { GetStaticProps } from 'next';
import { ParsedEvent, getNextEvent, getOtherUpcomingEvents } from '@/utils/eventUtils';
import UpcomingNextEvent from '../components/UpcomingNextEvent';
import OtherUpcomingEvents from '../components/OtherUpcomingEvents';
import ComingSoon from '../components/ComingSoonEvents';

interface EventsPageProps {
  nextEvent: ParsedEvent | null;
  otherEvents: ParsedEvent[];
}

const EventsPage: React.FC<EventsPageProps> = ({ nextEvent, otherEvents }) => {
  if (!nextEvent) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Upcoming Tree Tours & Events
          </h1>
          <ComingSoon />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Upcoming Tree Tours & Events
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <UpcomingNextEvent event={nextEvent} />
          
          {otherEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Other Upcoming Events
              </h2>
              <OtherUpcomingEvents events={otherEvents} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const nextEvent = getNextEvent();
  const otherEvents = getOtherUpcomingEvents();

  return {
    props: {
      nextEvent: nextEvent ? JSON.parse(JSON.stringify(nextEvent)) : null,
      otherEvents: JSON.parse(JSON.stringify(otherEvents)),
    },
    // Revalidate every hour
    revalidate: 3600,
  };
};

export default EventsPage;