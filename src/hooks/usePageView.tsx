'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { pushDataLayer } from '@/lib/gtmConfig';

export function UsePageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const query = searchParams.toString();
    const fullPath = pathname + (query ? `?${query}` : '');

    pushDataLayer({
      event: 'page_view',
      page_location: window.location.href,
      page_path: fullPath,
      page_title: document.title,
      page_referrer: document.referrer || '',
      page_language: navigator.language,
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      engagement_type: isFirstLoad.current ? 'landing' : 'navigation'
    });

    isFirstLoad.current = false;
  }, [pathname, searchParams]);

  return null;
}