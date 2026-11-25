import test from 'node:test';
import assert from 'node:assert/strict';
import { getCaseStudy, caseStudies, retiredCaseStudySlugs } from '../lib/case-studies.mjs';

test('only the three selected projects have case studies', () => {
  const slugs = ['knowledge-graph', 'hybrid-retrieval', 'scope-seeker'];
  assert.deepEqual(caseStudies.map((study) => study.slug), slugs);
  for (const slug of slugs) {
    assert.equal(getCaseStudy(slug)?.slug, slug);
  }
  assert.equal(getCaseStudy('missing'), undefined);
  for (const slug of retiredCaseStudySlugs) assert.equal(getCaseStudy(slug), undefined);
});
