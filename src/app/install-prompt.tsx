'use client';

import { useEffect, useState } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      console.log('🔥 beforeinstallprompt fired');
      e.preventDefault();
      setDeferredPrompt(e as any);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('User install choice:', outcome);
    setDeferredPrompt(null);
    setShowPrompt(false);
  }

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-xl border rounded-xl p-4 w-72 z-50">
      <h2 className="text-lg font-semibold">Install App</h2>
      <p className="text-sm text-gray-600">
        Get quick access by installing this app on your device.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={handleInstall}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Install
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="px-3 py-1 border rounded-lg"
        >
          Later
        </button>
      </div>
    </div>
  );
}
