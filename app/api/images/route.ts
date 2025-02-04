import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicImagesDir = path.join(process.cwd(), 'public', 'images');
    const files = fs.readdirSync(publicImagesDir);
    
    const imageUrls = files
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .map(file => `/images/${file}`);

    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
