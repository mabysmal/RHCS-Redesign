
import { getNextEvent, getUpcomingEvents } from '@/utils/eventUtils';
import TreeToursClient from './TreeToursClient';
export default function TreeToursPage() {
  const nextEvent = getNextEvent();
  const upcomingEvents = getUpcomingEvents(true); // excluir el próximo evento

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-darkgreen mb-8">
        Tree Tours Schedule
      </h1>
      
      <TreeToursClient 
        initialNextEvent={nextEvent}
        initialUpcomingEvents={upcomingEvents}
      />
    </div>
  );
}