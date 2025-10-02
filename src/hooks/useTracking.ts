import { useEffect, useState } from 'react'

export interface TrackingData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  gclid?: string
  fbclid?: string
  referrer?: string
  timestamp?: string
  sessionId?: string
}

export function useTracking() {
  const [trackingData, setTrackingData] = useState<TrackingData>({})

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tracking: TrackingData = {}

    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    utmParams.forEach(param => {
      const value = urlParams.get(param)
      if (value) {
        tracking[param as keyof TrackingData] = value
      }
    })

    const gclid = urlParams.get('gclid')
    const fbclid = urlParams.get('fbclid')
    
    if (gclid) tracking.gclid = gclid
    if (fbclid) tracking.fbclid = fbclid

    if (document.referrer) {
      tracking.referrer = document.referrer
    }

    tracking.timestamp = new Date().toISOString()

    let sessionId = sessionStorage.getItem('l0gic_session_id')
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      sessionStorage.setItem('l0gic_session_id', sessionId)
    }
    tracking.sessionId = sessionId

    localStorage.setItem('l0gic_tracking', JSON.stringify(tracking))

    setTrackingData(tracking)
  }, [])

  return trackingData
}