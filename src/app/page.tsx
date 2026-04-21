import HeroSection from "./components/HeroSection";
import IntroMissionSection from "./components/IntroMissionSection";
import MediaSection from "./components/MediaSection";
import VirtualTourSection from "./components/VirtualTourSection";
import GetInvolvedCards from "./components/GetInvolvedCards";
import UpcomingNextEvent from "./components/UpcomingNextEvent";
import OtherUpcomingEvents from "./components/OtherUpcomingEvents";
import ComingSoon from "./components/ComingSoonEvents";

import { getHeroSectionData } from "@/utils/heroUtils";
import { 
  getIntroMissionData, 
  getMediaSectionData, 
  getVirtualTourData, 
  getGetInvolvedCardsData 
} from "@/utils/homeUtils";
import {
  getSerializedNextEvent,
  getSerializedOtherUpcomingEvents
} from "@/utils/eventUtils";

export default async function Home() {
  const heroData = await getHeroSectionData('src/content/home/hero.md');
  const introMissionData = await getIntroMissionData();
  const mediaSectionData = await getMediaSectionData();
  const virtualTourData = await getVirtualTourData();
  const getInvolvedCardsData = await getGetInvolvedCardsData();
  const nextEvent = getSerializedNextEvent();
  const otherEvents = getSerializedOtherUpcomingEvents();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        data={heroData}
        heightClass="h-[60vh] min-h-[500px]"
        textClasses={{
          title: "text-4xl md:text-6xl font-bold mb-8",
          description: "text-lg md:text-xl font-poppins font-medium mb-12"
        }}
      />


      {/* Introduction & Mission Section */}
      <IntroMissionSection data={introMissionData} />

      {/* Next Tree Tour Event */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold text-darkgreen capitalize animate-slide-down mb-6 sm:mb-8 text-center">
            NEXT TREE TOUR
          </h2>
          
          {!nextEvent ? (
            <ComingSoon />
          ) : (
            <div className="max-w-4xl mx-auto mb-6">
              <UpcomingNextEvent event={nextEvent} />
              {otherEvents.length > 0 && (
                <div className="mt-8 sm:mt-10 md:mt-12">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-inter font-bold text-darkgreen capitalize animate-slide-down mb-4 sm:mb-6 text-center">
                    OTHER UPCOMING TREE TOURS
                  </h3>
                  <OtherUpcomingEvents events={otherEvents} />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* RHCS in Media */}
      <MediaSection data={mediaSectionData} />

      {/* Virtual Tree Tour */}
      <VirtualTourSection data={virtualTourData} />

      {/* Get Involved Cards */}
      <GetInvolvedCards data={getInvolvedCardsData} />
    </div>
  );
}