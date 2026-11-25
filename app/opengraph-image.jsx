import { ImageResponse } from 'next/og';

export const alt = 'Lokesh Dhakar — Founding Engineer, Full-stack & Applied AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '58px 70px', background: '#252845', color: '#f2eee7', fontFamily: 'sans-serif' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 21, letterSpacing: 2 }}><div style={{ display: 'flex', fontWeight: 800, fontSize: 48, letterSpacing: -5 }}>ld<span style={{ color: '#bfc5ff' }}>.</span></div><div>ENGINEERING / PRODUCT / AI</div></div>
    <div style={{ display: 'flex', flexDirection: 'column' }}><div style={{ display: 'flex', fontSize: 92, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>Lokesh Dhakar<span style={{ color: '#bfc5ff' }}>.</span></div><div style={{ marginTop: 25, fontSize: 32, color: '#d0d1e8' }}>Founding engineer · Full-stack & applied AI</div></div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 19, letterSpacing: 1 }}><div>THOUGHTFUL PRODUCTS. BUILT FROM THE GROUND UP.</div><div>LOKESHDHAKAR.IN</div></div>
  </div>, size);
}
