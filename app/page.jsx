import PortfolioHero from './portfolio-hero';
import { profileSchema, serializeJsonLd } from '../lib/seo.mjs';

export default function Home() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(profileSchema()) }} /><PortfolioHero /></>;
}
