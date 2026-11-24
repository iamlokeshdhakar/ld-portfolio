import './globals.css';

export const metadata = {
  title: 'Lokesh Dhakar — Founding Engineer · Full-stack & Applied AI',
  description: 'Lokesh Dhakar is a product-focused founding and full-stack engineer building thoughtful products, distributed systems, and applied AI.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
