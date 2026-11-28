import test from 'node:test';
import assert from 'node:assert/strict';
import { getCaseStudy, caseStudies, retiredCaseStudySlugs } from '../lib/case-studies.mjs';
import nextConfig from '../next.config.mjs';

test('only the three selected projects have case studies', () => {
  const slugs = ['knowledge-graph', 'hybrid-retrieval', 'scope-seeker'];
  assert.deepEqual(caseStudies.map((study) => study.slug), slugs);
  for (const slug of slugs) {
    assert.equal(getCaseStudy(slug)?.slug, slug);
  }
  assert.equal(getCaseStudy('missing'), undefined);
  for (const slug of retiredCaseStudySlugs) assert.equal(getCaseStudy(slug), undefined);
});

test('retired case-study URLs redirect to the project section', async () => {
  const redirects = await nextConfig.redirects();
  assert.deepEqual(redirects.map(({ source }) => source), retiredCaseStudySlugs.map((slug) => `/case-studies/${slug}`));
  assert.ok(redirects.every(({ destination, permanent }) => destination === '/#work' && permanent));
});
