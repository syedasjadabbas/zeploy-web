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
    if (typeof window.gtag === 'function' || typeof window.clarity === 'function') return;
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
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };

      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname + window.location.search,
      });

      // 2. Microsoft Clarity Setup
      const clarityScript = document.createElement('script');
      clarityScript.async = true;
      clarityScript.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
      window.clarity = window.clarity || function(...args: unknown[]) {
        ((window.clarity as any).q = (window.clarity as any).q || []).push(args);
      };
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(clarityScript, firstScript);
      } else {
        document.head.appendChild(clarityScript);
      }
    };

    let cancelTimer: (() => void) | undefined;

    if ('requestIdleCallback' in window) {
      const handle = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(() => loadAnalytics(), { timeout: 3000 });
      cancelTimer = () => {
        if ('cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const handle = setTimeout(() => loadAnalytics(), 2000);
      cancelTimer = () => clearTimeout(handle);
    }

    return () => {
      if (cancelTimer) cancelTimer();
    };
  }, []);

  // Track page views on route/location changes after GA is loaded
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (typeof window.gtag === 'function') {
      const search = (location as { searchStr?: string }).searchStr ?? window.location.search ?? '';
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + search,
      });
    }
  }, [location.pathname, (location as { searchStr?: string }).searchStr]);

  return null;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    clarity: (...args: unknown[]) => void;
  }
}
