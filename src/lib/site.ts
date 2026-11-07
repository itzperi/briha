const envVal = (name: string): string | undefined => {
  const meta = (import.meta as any).env?.[name];
  return (meta ?? (typeof process !== 'undefined' ? process.env[name] : undefined)) || undefined;
};

export const SITE_URL_CONFIGURED = Boolean(envVal('PUBLIC_SITE_URL'));
export const SITE_URL = (envVal('PUBLIC_SITE_URL') || 'https://brihadhee.example').replace(/\/$/, '');
export const DRAFT_MODE = envVal('PUBLIC_DRAFT_MODE') === '1';
export const IS_FIXTURE = typeof process !== 'undefined' && process.env.FACTS_FIXTURE === '1';
export const GA4_ID = envVal('PUBLIC_GA4_ID');
export const BOOKING_ENDPOINT = envVal('PUBLIC_BOOKING_ENDPOINT');
export const BOOKING_KEY = envVal('PUBLIC_BOOKING_ACCESS_KEY');
export const BUILD_DATE = new Date().toISOString().slice(0, 10);

export const absUrl = (path: string) => SITE_URL + (path.startsWith('/') ? path : '/' + path);

export const NAV = [
  { label: 'Menu', href: '/menu/' },
  { label: 'Order', href: '/order/' },
  { label: 'Book a table', href: '/book-a-table/' },
  { label: 'Location', href: '/location/anna-nagar/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'About', href: '/about/' },
];
