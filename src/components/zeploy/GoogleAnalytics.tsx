import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

const GA_MEASUREMENT_ID = 'G-JH187C2MLK';

export default function GoogleAnalytics() {
  const router = useRouter();
  const location = router.state.location;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if GA was already loaded
    if (window.gtag) return;

    let loaded = false;

    const loadGA = () => {
      if (loaded) return;
      loaded = true;

      // Append script tag
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      // Initialize gtag global functions
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname + window.location.search,
      });

      cleanupListeners();
    };

    const interactionEvents = ['mouseover', 'keydown', 'touchstart', 'scroll', 'click'];

    const cleanupListeners = () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, loadGA);
      });
    };

    // Listen to user interaction to load GA script
    interactionEvents.forEach((event) => {
      window.addEventListener(event, loadGA, { passive: true });
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
  }
}
