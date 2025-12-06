import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContactInfo {
  label: string;
  href?: string;
}

export interface FooterSettings {
  tagline: string;
  exploreLinks: FooterLink[];
  getInvolvedLinks: FooterLink[];
  contactInfo: FooterContactInfo[];
  copyrightText: string;
}

export function getFooterSettings(): FooterSettings {
  const filePath = path.join(process.cwd(), 'src/content/settings/footer.md');
  
  try {
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      return data as FooterSettings;
    }
  } catch (error) {
    console.warn('Could not read footer settings:', error);
  }

  // Fallback defaults in case the file doesn't exist or there's an error
  return {
    tagline: "Preserving the historic səmiq̓ʷəʔelə / Riverview Lands and its unique tree arboretum for future generations.",
    exploreLinks: [
      { label: 'Tree Tours', href: '/tree-tours' },
      { label: 'News & Updates', href: '/news' },
      { label: 'The Riverview Lands', href: '/history' },
      { label: 'About Us', href: '/about-us' },
    ],
    getInvolvedLinks: [
      { label: 'Membership', href: '/get-involved' },
      { label: 'Donate', href: '/get-involved#donate' },
      { label: 'Volunteer', href: '/get-involved#volunteer' },
    ],
    contactInfo: [
      { label: 'Como Lake RPO, PO Box 64616, Coquitlam, BC, V3J 7V7', href: '' },
      { label: '604-290-9910', href: 'tel:+16042909910' },
      { label: 'trees@rhcs.org', href: 'mailto:trees@rhcs.org' },
    ],
    copyrightText: "Riverview Horticultural Centre Society. All rights reserved.",
  };
}