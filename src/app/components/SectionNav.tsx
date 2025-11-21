"use client";

import { useState, useEffect } from 'react';

// component props: label of section, id to scroll to
interface SectionItem {
  label: string;
  targetId: string;
}

interface SectionNavProps {
  sections: SectionItem[];
}

const SectionNav: React.FC<SectionNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      let currentSectionId = '';
      const offset = 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.targetId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) {
            currentSectionId = section.targetId;
            break;
          }
        }
      }

      if (!currentSectionId && sections.length > 0) {
        currentSectionId = sections[0].targetId;
      }
      
      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const baseClasses = "px-4 py-2 rounded-full text-sm font-inter font-medium transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500";
  const inactiveClasses = "bg-darkcream text-gray-600 hover:bg-terracotta-300";
  const activeClasses = "bg-darkgreen text-white shadow-md";

  return (
    // nav component container
    <nav className="w-full py-4 mb-8 sticky top-0 bg-cream bg-opacity-80 backdrop-blur-sm z-40">
      <div className="container mx-auto flex justify-center items-center gap-2 md:gap-4 flex-wrap px-4">
        {/* mapping all sections to make a link */}
        {sections.map((section) => (
          <a
            key={section.targetId}
            href={`#${section.targetId}`}
            className={`${baseClasses} ${
              activeSection === section.targetId ? activeClasses : inactiveClasses
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default SectionNav;