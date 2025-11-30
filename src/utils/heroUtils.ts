import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


export interface HeroSectionData {
  title: string;
  description: string;//This will be plain text, no markdown parsing needed 
  backgroundImage?: string;
  primaryButton?: {
    text: string;
    url: string;
  };
  secondaryButton?: {
    text: string;
    url: string;
  };
}

// Helper function to construct the full path to a content file
function getContentPath(filePath: string): string {
  return path.resolve(process.cwd(), filePath);
}

//Read and parse the markdown content for a Hero Section. It expects the Hero Section details to be in the frontmatter.
//@param fullPath - The absolute path to the markdown file.
//@returns A Promise resolving to HeroSectionData or null.
async function readAndParseHeroMarkdown(fullPath: string): Promise<HeroSectionData | null> {
  if (!fs.existsSync(fullPath)) {
    console.warn(`Hero file not found at: ${fullPath}`);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    const parsedData = data as Partial<HeroSectionData>;
    const heroData: HeroSectionData = {
      title: parsedData.title || 'Default Hero Title',
      description: parsedData.description || '',
      backgroundImage: parsedData.backgroundImage || undefined,
      primaryButton: parsedData.primaryButton ? {
        text: parsedData.primaryButton.text || '',
        url: parsedData.primaryButton.url || '',
      } : undefined,
      secondaryButton: parsedData.secondaryButton ? {
        text: parsedData.secondaryButton.text || '',
        url: parsedData.secondaryButton.url || '',
      } : undefined,
    };

    return heroData;

  } catch (error) {
    console.error(`Error reading or parsing hero markdown file ${fullPath}:`, error);
    return null;
  }
}

// /**
//Fetches hero section data for a given page or listing. Assumes Hero Section content is stored in a dedicated markdown file for that page/listing.
//@param relativeFilePath - The relative path from the project root to the hero markdown file (e.g., 'src/content/about/hero.md').
//@returns A Promise resolving to HeroSectionData or null if not found or an error occurs.
export async function getHeroSectionData(relativeFilePath: string): Promise<HeroSectionData | null> {
  const fullPath = getContentPath(relativeFilePath);
  return readAndParseHeroMarkdown(fullPath);
}