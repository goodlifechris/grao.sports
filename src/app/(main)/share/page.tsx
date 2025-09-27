// src/app/share/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from '../SessionProvider';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

export default function SharePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { session } = useSession(); // Your session hook
  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const title = decodeURIComponent(searchParams.get('title') || '');
    const text = decodeURIComponent(searchParams.get('text') || '');
    const url = decodeURIComponent(searchParams.get('url') || '');

    if (title || text || url) {
      setShareData({ title, text, url });
      
      // If user is logged in, automatically save the content
      if (session?.userId) {
        saveSharedContent({ title, text, url });
      }
    }
    
    setIsProcessing(false);
  }, [searchParams, session]);

  const saveSharedContent = async (data: ShareData) => {
    try {
      const response = await fetch('/api/save-shared-content', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          userId: session?.userId,
        }),
      });

      if (!response.ok) throw new Error('Failed to save');
    } catch (error) {
      console.error('Error saving shared content:', error);
    }
  };

  const handleLoginRedirect = () => {
    // Store share data in session storage for after login
    if (shareData) {
      sessionStorage.setItem('pendingShare', JSON.stringify(shareData));
    }
    router.push('/login');
  };

  const handleCreatePost = () => {
    if (shareData) {
      // Navigate to create post page with pre-filled data
      router.push(`/posts/new?title=${encodeURIComponent(shareData.title)}&content=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`);
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Processing shared content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <CardTitle>Content Shared Successfully!</CardTitle>
            <CardDescription>
              {session?.userId 
                ? "The content has been saved to your account." 
                : "Sign in to save this content to your grao account."
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {shareData && (
              <div className="space-y-3">
                {shareData.title && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <div className="p-2 bg-muted rounded text-sm">
                      {shareData.title}
                    </div>
                  </div>
                )}
                
                {shareData.text && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <div className="p-2 bg-muted rounded text-sm whitespace-pre-wrap">
                      {shareData.text}
                    </div>
                  </div>
                )}
                
                {shareData.url && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Link</label>
                    <a 
                      href={shareData.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-2 bg-blue-50 text-blue-600 rounded text-sm truncate hover:bg-blue-100"
                    >
                      {shareData.url}
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {session?.userId ? (
                <>
                  <Button onClick={handleCreatePost} className="flex-1">
                    Create Post
                  </Button>
                  <Button onClick={() => router.push('/')} variant="outline">
                    Dashboard
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleLoginRedirect} className="flex-1">
                    Sign In to Save
                  </Button>
                  <Button onClick={() => router.push('/')} variant="outline">
                    Home
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}