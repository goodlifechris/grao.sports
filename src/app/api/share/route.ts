// src/app/api/share/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const text = formData.get('text') as string;
    const url = formData.get('url') as string;

    console.log('Received share intent:', { title, text, url });

    // Store in temporary session or pass via URL
    const shareData = {
      title: title || '',
      text: text || '',
      url: url || '',
      timestamp: new Date().toISOString(),
    };

    // Redirect to share handler page
    const redirectUrl = new URL('/share', request.url);
    
    if (title) redirectUrl.searchParams.set('title', encodeURIComponent(title));
    if (text) redirectUrl.searchParams.set('text', encodeURIComponent(text));
    if (url) redirectUrl.searchParams.set('url', encodeURIComponent(url));

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Error processing share:', error);
    // Fallback to home page
    return NextResponse.redirect(new URL('/', request.url));
  }
}