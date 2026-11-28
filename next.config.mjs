import { retiredCaseStudySlugs } from './lib/case-studies.mjs';

const nextConfig = {
  async redirects() {
    return retiredCaseStudySlugs.map((slug) => ({
      source: `/case-studies/${slug}`,
      destination: '/#work',
      permanent: true,
    }));
  },
};

export default nextConfig;
