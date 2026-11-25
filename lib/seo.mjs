const fallbackOrigin = 'https://lokeshdhakar.in';

function getSiteOrigin() {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || fallbackOrigin);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return fallbackOrigin;
    return url.origin;
  } catch { return fallbackOrigin; }
}

export const siteUrl = getSiteOrigin();
export const siteName = 'Lokesh Dhakar';
export const siteDescription = 'Lokesh Dhakar is a founding and full-stack engineer building scientific knowledge graphs, distributed systems, and applied AI products.';
export const socialImage = { url: '/opengraph-image', width: 1200, height: 630, alt: 'Lokesh Dhakar — Founding Engineer, Full-stack & Applied AI' };

export function pageMetadata({ title, description, path, type = 'website' }) {
  const fullTitle = `${title} | ${siteName}`;
  const url = new URL(path, siteUrl).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type, title: fullTitle, description, url, siteName, images: [socialImage] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [socialImage] },
  };
}

export function sitemapPaths(caseStudies, posts) {
  return ['/', '/case-studies', '/notes', ...caseStudies.map(({ slug }) => `/case-studies/${slug}`), ...posts.map(({ slug }) => `/notes/${slug}`)];
}

export const person = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: siteName,
  url: `${siteUrl}/`,
  jobTitle: 'Founding Engineer',
  description: siteDescription,
  worksFor: { '@type': 'Organization', name: 'Axy Inc' },
  sameAs: ['https://github.com/iamlokeshdhakar', 'https://www.linkedin.com/in/iamlokeshdhakar/'],
  knowsAbout: ['Full-stack development', 'Scientific knowledge graphs', 'Distributed systems', 'Retrieval-augmented generation', 'Hybrid search'],
};

export function profileSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: siteName, description: siteDescription, publisher: { '@id': person['@id'] } },
      { '@type': 'ProfilePage', '@id': `${siteUrl}/#profile`, url: `${siteUrl}/`, name: siteName, mainEntity: { '@id': person['@id'] }, isPartOf: { '@id': `${siteUrl}/#website` } },
    ],
  };
}

export function articleSchema({ title, description, path, type = 'BlogPosting' }) {
  return { '@context': 'https://schema.org', '@type': type, headline: title, description, url: new URL(path, siteUrl).toString(), author: { '@type': 'Person', name: siteName, url: `${siteUrl}/` }, inLanguage: 'en' };
}

export function serializeJsonLd(value) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
