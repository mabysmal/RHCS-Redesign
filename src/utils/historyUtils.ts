import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface HistoryButton {
  text: string;
  url: string;
}

export interface HistoryItem {
  title: string;
  description: string;
  descriptionHtml: string;
  image?: string;
  button?: HistoryButton;
}

export interface HistoryItemsData {
  items: HistoryItem[];
}

function getContentPath(filePath: string): string {
  return path.resolve(process.cwd(), filePath);
}

//Read and parse the history items markdown file.
//@param fullPath - The absolute path to the markdown file.
//@returns A Promise resolving to HistoryItemsData or null.

async function readAndParseHistoryItems(fullPath: string): Promise<HistoryItemsData | null> {
  if (!fs.existsSync(fullPath)) {
    console.warn(`History items file not found at: ${fullPath}`);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    const parsedData = data as { items?: Array<Partial<HistoryItem>> };
    
    if (!parsedData.items || !Array.isArray(parsedData.items)) {
      console.warn('No items array found in history items file');
      return { items: [] };
    }

    const processedItems: HistoryItem[] = await Promise.all(
      parsedData.items.map(async (item) => {
        const descriptionHtml = item.description 
          ? await marked(item.description)
          : '';

        return {
          title: item.title || 'Untitled',
          description: item.description || '',
          descriptionHtml,
          image: item.image || undefined,
          button: item.button?.text && item.button?.url ? {
            text: item.button.text,
            url: item.button.url,
          } : undefined,
        };
      })
    );

    return { items: processedItems };

  } catch (error) {
    console.error(`Error reading or parsing history items file ${fullPath}:`, error);
    return null;
  }
}


//Fetches history items data
// @returns A Promise resolving to HistoryItemsData or null if not found or an error occurs

export async function getHistoryItems(): Promise<HistoryItemsData | null> {
  const fullPath = getContentPath('src/content/history/history-items.md');
  return readAndParseHistoryItems(fullPath);
}