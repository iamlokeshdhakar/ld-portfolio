import './globals.css';
import 'lenis/dist/lenis.css';
import SmoothScroll from './smooth-scroll';
import { siteDescription, siteName, siteUrl, socialImage } from '../lib/seo.mjs';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Lokesh Dhakar — Founding Engineer · Full-stack & Applied AI', template: '%s | Lokesh Dhakar' },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  alternates: { canonical: `${siteUrl}/` },
  openGraph: { type: 'website', url: `${siteUrl}/`, siteName, title: 'Lokesh Dhakar — Founding Engineer · Full-stack & Applied AI', description: siteDescription, images: [socialImage], locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: 'Lokesh Dhakar — Founding Engineer · Full-stack & Applied AI', description: siteDescription, images: [socialImage] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><SmoothScroll />{children}</body></html>;
}
