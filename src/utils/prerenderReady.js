import { useEffect, useRef } from 'react';

export const PRERENDER_EVENT = 'prerender-ready';

export function usePrerenderReady(ready = true) {
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (!ready || hasFiredRef.current) return;
    hasFiredRef.current = true;

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(PRERENDER_EVENT));
    }
  }, [ready]);
}
