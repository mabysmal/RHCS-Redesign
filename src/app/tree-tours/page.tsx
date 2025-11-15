import { getSerializedNextEvent, getSerializedOtherUpcomingEvents } from '@/utils/eventUtils';
import SectionNav from '../components/SectionNav';
import UpcomingNextEvent from '../components/UpcomingNextEvent';
import OtherUpcomingEvents from '../components/OtherUpcomingEvents';
import ComingSoon from '../components/ComingSoonEvents';

export default function TreeToursPage() {
  const nextEvent = getSerializedNextEvent();
  const otherEvents = getSerializedOtherUpcomingEvents();

  const treeTourSections = [
    { label: "Tree Tours", targetId: "tree-tours" },
    { label: "Visitor Information", targetId: "visitor-info" },
    { label: "Directions", targetId: "directions" },
    { label: "Maps", targetId: "maps" },
  ];

  const PageSection = ({ id, title, children }: { id: string, title?: string, children: React.ReactNode }) => (
    <section id={id} className="min-h-screen py-16 scroll-mt-24">
      <div className="bg-cream container mx-auto px-6">
        {title && (
          <h2 className="text-3xl font-Inter font-black text-darkgreen mb-8">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );

  return (
    <main>
  
      <div className="bg-cream pt-16 pb-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-inter font-black text-darkgreen mb-4">
            Tree Tours & Walks
          </h1>
          <p className='max-w-3xl mx-auto text-sm md:text-lg font-poppins font-medium text-gray-700'>
            The Riverview Horticultural Centre Society invite you to a Tree Tour of a significant and beautiful part of the Lower Mainland, the historic Riverview Lands Arboretum.
          </p>
        </div>
      </div>
      
      <SectionNav sections={treeTourSections} />

      <div className="">
        
        {/* === TREE TOURS === */}
        <PageSection id="tree-tours">
          <h2 className="text-3xl font-Inter font-black text-darkgreen capitalize animate-slide-down mb-8">
            NEXT TREE TOUR
          </h2>
          {!nextEvent ? (
            <ComingSoon />
          ) : (
            <div className="max-w-4xl mx-auto">
              <UpcomingNextEvent event={nextEvent} />
              
              {otherEvents.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-lg font-Inter font-black text-darkgreen capitalize animate-slide-down mb-4">
                    OTHER UPCOMING TREE TOURS
                  </h2>
                  <OtherUpcomingEvents events={otherEvents} />
                </div>
              )}
            </div>
          )}
        </PageSection>

        {/* === VISITOR INFORMATION === */}
        <PageSection id="visitor-info" title="Visitor Information">
          <div className="space-y-4 text-gray-800">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, voluptatum.</p>
          </div>
        </PageSection>

        {/* === SECCIÓN DIRECTIONS === */}
        <PageSection id="directions" title="Directions">
          <div className="space-y-4 text-gray-800">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, voluptatum.</p>
          </div>
        </PageSection>

        {/* === SECCIÓN MAPS === */}
        <PageSection id="maps" title="Maps">
          <div className="space-y-4 text-gray-800">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, temporibus debitis cum alias unde et.</p>
          </div>
        </PageSection>

      </div>
    </main>
  );
}