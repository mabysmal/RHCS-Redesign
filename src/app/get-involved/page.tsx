import React from 'react';
import HeroSection from '@/app/components/HeroSection';
import SectionNav from '@/app/components/SectionNav';
import MembershipSection from '@/app/components/MembershipSection';
import DonationsSection from '../components/DonationsSection';
import VolunteerSection from '@/app/components/VolunteerSection';
import { getHeroSectionData } from '@/utils/heroUtils';

import {
  getMembershipData,
  getDonationsData,
  getVolunteerSection,
  getVolunteerPositions,
  getVolunteerCarouselImages,
} from '@/utils/getInvolved';
import { getImagesWithDimensions } from '@/utils/imageUtils';

export default async function GetInvolvedPage() {
  const heroData = await getHeroSectionData('src/content/get-involved/hero.md');
  const membershipData = getMembershipData();
  const donationsData = getDonationsData();
  const volunteerSectionData = getVolunteerSection();
  const volunteerPositions = getVolunteerPositions();
  const volunteerCarouselData = getVolunteerCarouselImages();
  const volunteerCarouselImages = await getImagesWithDimensions(volunteerCarouselData.images);

  const sections = [
    { label: 'Membership', targetId: 'membership' },
    { label: 'Donate', targetId: 'donate' },
    { label: 'Volunteer', targetId: 'volunteer' },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <HeroSection data={heroData} />
      <SectionNav sections={sections} />

      {/* Membership Section - with carousel inside */}
      <MembershipSection 
        data={membershipData}
        carouselImages={volunteerCarouselImages}
      />
      
      {/* Donations Section */}
      <DonationsSection data={donationsData} />
      
      {/* Volunteer Section - without carousel */}
      <VolunteerSection
        sectionData={volunteerSectionData}
        positions={volunteerPositions}
      />
    </main>
  );
}