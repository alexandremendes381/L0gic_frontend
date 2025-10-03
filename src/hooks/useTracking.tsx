'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';


export interface AttributionParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
}


export interface TrackingInfo {
  attribution: AttributionParams;
  referrer?: string;
  isReady: boolean;
}

function extractAttributionParams(searchParams: URLSearchParams): AttributionParams {
  const pick = (key: string) => {
    const value = searchParams.get(key);
    return value && value.trim() !== '' ? value : undefined;
  };

  return {
    utmSource: pick('utm_source'),
    utmMedium: pick('utm_medium'),
    utmCampaign: pick('utm_campaign'),
    utmTerm: pick('utm_term'),
    utmContent: pick('utm_content'),
    gclid: pick('gclid'),
    fbclid: pick('fbclid')
  };
}

 

export function UseTracking(): TrackingInfo {
  const searchParams = useSearchParams();
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo>({
    attribution: {},
    referrer: undefined,
    isReady: false
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const attribution = extractAttributionParams(searchParams);
    const referrer = document.referrer || undefined;

    setTrackingInfo({
      attribution,
      referrer,
      isReady: true
    });
  }, [searchParams]);

  return trackingInfo;
}