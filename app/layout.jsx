import './globals.css';
import 'lenis/dist/lenis.css';
import SmoothScroll from './smooth-scroll';

export const metadata = {
  title: 'Lokesh Dhakar — Founding Engineer · Full-stack & Applied AI',
  description: 'Lokesh Dhakar is a product-focused founding and full-stack engineer building thoughtful products, distributed systems, and applied AI.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><SmoothScroll />{children}</body></html>;
}
