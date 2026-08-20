import { useEffect, useState } from 'react';

const LOADER_COMPLETE_EVENT = 'app-loader-complete';

const isLoaderFinished = () => {
  if (typeof document === 'undefined') {
    return false;
  }

  return !document.documentElement.classList.contains('global-loader-active');
};

export function useLoaderReady() {
  const [ready, setReady] = useState<boolean>(() => isLoaderFinished());

  useEffect(() => {
    if (ready) {
      return undefined;
    }

    const handleReady = () => {
      setReady(true);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && isLoaderFinished()) {
        setReady(true);
      }
    };

    window.addEventListener(LOADER_COMPLETE_EVENT, handleReady);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Double-check in case the loader finished before listeners attached
    if (isLoaderFinished()) {
      Promise.resolve().then(() => setReady(true));
    }

    return () => {
      window.removeEventListener(LOADER_COMPLETE_EVENT, handleReady);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [ready]);

  return ready;
}
