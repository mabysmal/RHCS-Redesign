export interface SubPage {
    name: string;
    href: string;
    id?: string; // For scrolling to sections
  }
  
  export interface MenuItem {
    name: string;
    href: string;
    subPages?: SubPage[];
  }
  
  export const menuData: MenuItem[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Schedule and News",
      href: "/schedule-news",
      subPages: [
        { name: "Full Calendar/Schedule", href: "/schedule-news", id: "calendar" },
        { name: "What's Happening", href: "/schedule-news", id: "whats-happening" },
        { name: "Latest Social Media", href: "/schedule-news", id: "social-media" },
      ],
    },
    {
      name: "Plan Your Visit",
      href: "/plan-visit",
      subPages: [
        { name: "Maps and Virtual Tree Tour", href: "/plan-visit", id: "maps-tour" },
        { name: "Interactive Tree Survey Map", href: "/plan-visit", id: "survey-map" },
        { name: "Visit Information", href: "/plan-visit", id: "visit-info" },
      ],
    },
    {
      name: "Photo Gallery",
      href: "/gallery",
    },
    {
      name: "Support Us",
      href: "/support",
      subPages: [
        { name: "Membership", href: "/support", id: "membership" },
        { name: "Donations", href: "/support", id: "donations" },
        { name: "Volunteering", href: "/support", id: "volunteering" },
      ],
    },
    {
      name: "About Us",
      href: "/about",
      subPages: [
        { name: "Mission, Vision, Founding History", href: "/about", id: "mission-vision" },
        { name: "About Riverview Lands and Finnie's Garden", href: "/about", id: "riverview-lands" },
        { name: "Our Achievements", href: "/about", id: "achievements" },
        { name: "In Memoriam", href: "/about", id: "memoriam" },
      ],
    },
    {
      name: "Resource Library",
      href: "/resources",
      subPages: [
        { name: "Reports", href: "/resources", id: "reports" },
        { name: "Brochures and Books", href: "/resources", id: "brochures" },
        { name: "Other Blogs", href: "/resources", id: "blogs" },
        { name: "Newsletter Archive", href: "/resources", id: "newsletter" },
      ],
    },
  ];