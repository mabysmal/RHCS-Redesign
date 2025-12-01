import React from 'react';
import HeroSection from '../components/HeroSection';
import HistoryTimeline from '../components/HistoryTimeline';
import { getHeroSectionData } from '@/utils/heroUtils';
import { getHistoryItems } from '@/utils/historyUtils';

export default async function HistoryPage() {
  const heroData = await getHeroSectionData('src/content/history/hero.md');
  const historyData = await getHistoryItems();

  return (
    <main className="bg-cream">
      {/* Hero Section */}
      <HeroSection
        data={heroData}
        heightClass="h-[50vh] min-h-[400px]"
        textClasses={{
          title: "text-4xl md:text-6xl font-bold mb-8",
          description: "text-lg md:text-xl font-poppins font-medium mb-12"
        }}
      />

      {/* History Timeline */}
      <section className="py-0">
        {historyData && <HistoryTimeline items={historyData.items} />}
      </section>
    </main>
  );
}