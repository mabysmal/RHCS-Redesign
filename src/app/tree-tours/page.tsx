import React from 'react';
import { getSerializedNextEvent, getSerializedOtherUpcomingEvents } from '@/utils/eventUtils';
import { getVisitorInfo, getDirections, getMaps } from '@/utils/treeToursUtils';
import SectionNav from '../components/SectionNav';
import UpcomingNextEvent from '../components/UpcomingNextEvent';
import OtherUpcomingEvents from '../components/OtherUpcomingEvents';
import ComingSoon from '../components/ComingSoonEvents';
import CarIcon from '../components/icons/Car';
import BusIcon from '../components/icons/Bus';

interface DirectionMethodProps {
  icon: React.ReactNode;
  title: string;
  htmlContent: string;
}

const DirectionMethod: React.FC<DirectionMethodProps> = ({ icon, title, htmlContent }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-6 border-b border-olive/30 last:border-b-0">
    <div className="flex-shrink-0 w-12 h-12 bg-olive/10 text-olive rounded-full flex items-center justify-center p-2">
      {React.cloneElement(icon as React.ReactElement, { className: "w-full h-full" })}
    </div>
    
    <div className="flex-grow">
      <h3 className="text-xl font-Inter font-semibold text-darkgreen mb-2">
        {title}
      </h3>
      <div className="prose max-w-none text-gray-700"> {/* TODO apply prose for the md content */}
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  </div>
);


export default function TreeToursPage() {
  const nextEvent = getSerializedNextEvent();
  const otherEvents = getSerializedOtherUpcomingEvents();
  const visitorInfo = getVisitorInfo();
  const directions = getDirections();
  const maps = getMaps();

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
    <main className='max-w-4xl mx-auto'>
      <div className="bg-cream pt-16 px-6 pb-8">
        <div className='mb-8 border-b-2 border-olive pb-4'>
            <h1 className="text-3xl font-Inter font-black text-darkgreen capitalize animate-slide-down pb-2">
              Tree Tours
            </h1>
            <p className='text-sm md:text-lg font-poppins font-medium text-gray-700 animate-slide-down'>
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
        <PageSection id="visitor-info" title= 'VISITOR INFORMATION'>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: visitorInfo.htmlContent }} />
          </div>
        </PageSection>

        {/* === DIRECTIONS === */}
        <PageSection id="directions" title='DIRECTIONS'>
          <div className="space-y-6"> 
            <DirectionMethod
              icon={<CarIcon />}
              title="By Car"
              htmlContent={directions.byCarHtml}
            />
            <DirectionMethod
              icon={<BusIcon />}
              title="By Public Transit"
              htmlContent={directions.byTransitHtml}
            />
          </div>
        </PageSection>

        {/* === MAPS === */}
        <PageSection id="maps" title='MAPS'>
          <div className="prose max-w-none">
            <p>Here are some helpful maps for your visit:</p>
            <ul className="!pl-0 list-none"> 
              {maps.map_list.map((map, index) => (
                <li key={index} className="mb-3"> 
                  <a
                    href={map.type === 'External Link' ? map.url : map.file}
                    target="_blank" // Siempre abrir en una nueva pestaña (mapas o links externos)
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-terracotta hover:text-terracottalight hover:underline"
                  >
                    <svg className="w-5 h-5 mr-2 text-olive" fill="currentColor" viewBox="0 0 20 20">
                      {/* maps icon */}
                      {map.type === 'External Link' ?
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /> :
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V7.414L10.586 4H6zM10 10a1 1 0 100 2h4a1 1 0 100-2h-4z" clipRule="evenodd" />
                      }
                    </svg>
                    {map.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </PageSection>
      </div>
    </main>
  );
}