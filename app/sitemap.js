import { caseStudies } from '../lib/case-studies.mjs';
import notes from '../lib/field-notes.json';
import { siteUrl, sitemapPaths } from '../lib/seo.mjs';

export default function sitemap() {
  return sitemapPaths(caseStudies, notes.posts).map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
