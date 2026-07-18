import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

const GA_MEASUREMENT_ID = 'G-JH187C2MLK';
const CLARITY_PROJECT_ID = 'xohhwav8uw';

export default function Analytics() {
  const router = useRouter();
  const location = router.state.location;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if tracking scripts were already loaded
    if (window.gtag || window.clarity) return;

    let loaded = false;

    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;

      // 1. Google Analytics 4 Setup
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname + window.location.search,
      });

      // 2. Microsoft Clarity Setup
      (function(c, l, a, r, i, t, y) {
        c[a] = c[a] || function() {
          // eslint-disable-next-line prefer-rest-params
          (c[a].q = c[a].q || []).push(arguments);
        };
        t = l.createElement(r);
        t.async = true;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        if (y && y.parentNode) {
          y.parentNode.insertBefore(t, y);
        } else {
          l.head.appendChild(t);
        }
      })(window, document, "clarity", "script", CLARITY_PROJECT_ID);

      cleanupListeners();
    };

    const interactionEvents = ['mouseover', 'keydown', 'touchstart', 'scroll', 'click'];

    const cleanupListeners = () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, loadAnalytics);
      });
    };

    // Listen to user interaction to load tracking scripts
    interactionEvents.forEach((event) => {
      window.addEventListener(event, loadAnalytics, { passive: true });
    });

    return () => {
      cleanupListeners();
    };
  }, []);

  // Track page views on route/location changes after GA is loaded
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location.pathname, location.search]);

  return null;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}
