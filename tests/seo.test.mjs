import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { caseStudies } from '../lib/case-studies.mjs';
import { articleSchema, pageMetadata, profileSchema, serializeJsonLd, sitemapPaths, siteUrl } from '../lib/seo.mjs';

const { posts } = JSON.parse(await readFile(new URL('../lib/field-notes.json', import.meta.url), 'utf8'));

test('sitemap covers all portfolio routes without duplicates or invented dates', () => {
  const paths = sitemapPaths(caseStudies, posts);
  assert.equal(paths.length, 3 + caseStudies.length + posts.length);
  assert.equal(new Set(paths).size, paths.length);
  assert.ok(paths.includes('/'));
  assert.ok(paths.includes(`/notes/${posts.at(-1).slug}`));
});

test('page metadata and structured data use the same canonical URL and author', () => {
  const input = { title: 'A field note', description: 'An engineering note.', path: '/notes/example' };
  const metadata = pageMetadata(input);
  const article = articleSchema(input);
  assert.equal(metadata.alternates.canonical, `${siteUrl}/notes/example`);
  assert.equal(metadata.openGraph.url, article.url);
  assert.equal(article.author.name, 'Lokesh Dhakar');
  assert.equal('datePublished' in article, false);
});

test('profile schema describes the portfolio and safely escapes markup', () => {
  const graph = profileSchema()['@graph'];
  assert.ok(graph.some((item) => item['@type'] === 'ProfilePage'));
  assert.equal(graph.some((item) => item['@type'] === 'FAQPage'), false);
  assert.equal(serializeJsonLd({ text: '</script>' }).includes('</script>'), false);
});
