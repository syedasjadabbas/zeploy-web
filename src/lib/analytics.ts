/**
 * Helper utility to fire GA4 custom tracking and conversion events.
 */
export const trackGAEvent = (
  eventName: string,
  params?: {
    button_text?: string;
    [key: string]: any;
  }
) => {
  if (typeof window !== 'undefined') {
    // If window.gtag exists, fire the event
    if (window.gtag) {
      const payload = {
        page_location: window.location.href,
        page_title: document.title,
        ...params,
      };

      console.log(`[GA4 Event Fired] ${eventName}`, payload);
      
      window.gtag('event', eventName, payload);
    } else {
      // In development or prior to interaction, log it to see if it would have fired
      console.log(`[GA4 Event Queued/Pending Interaction] ${eventName}`, {
        page_location: window.location.href,
        page_title: document.title,
        ...params,
      });
    }
  }
};
