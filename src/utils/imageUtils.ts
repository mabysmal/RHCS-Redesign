import sizeOf from 'image-size';
import path from 'path';
import fs from 'fs';

export interface ImageWithDimensions {
  src: string;
  width: number;
  height: number;
}

export async function getImageDimensions(imagePath: string): Promise<ImageWithDimensions> {
  try {
    const publicPath = path.join(process.cwd(), 'public', imagePath);
    
    if (!fs.existsSync(publicPath)) {
      console.warn(`Image not found: ${publicPath}`);
      return {
        src: imagePath,
        width: 800,
        height: 600,
      };
    }


    const buffer = fs.readFileSync(publicPath);
    const dimensions = sizeOf(buffer);
    
    return {
      src: imagePath,
      width: dimensions.width || 800,
      height: dimensions.height || 600,
    };
  } catch (error) {
    console.error(`Error getting dimensions for ${imagePath}:`, error);
    return {
      src: imagePath,
      width: 800,
      height: 600,
    };
  }
}

export async function getImagesWithDimensions(imagePaths: string[]): Promise<ImageWithDimensions[]> {
  return Promise.all(imagePaths.map(getImageDimensions));
}