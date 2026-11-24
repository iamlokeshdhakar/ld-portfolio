import test from 'node:test';
import assert from 'node:assert/strict';
import { getCaseStudy, caseStudies } from '../lib/case-studies.mjs';

test('each featured project has an individual case study and unknown slugs are rejected', () => {
  const slugs = ['knowledge-graph', 'hybrid-retrieval', 'scope-seeker', 'easy-task', 'medianeeti', 'cameras-inside'];
  assert.deepEqual(caseStudies.map((study) => study.slug), slugs);
  for (const slug of slugs) {
    assert.equal(getCaseStudy(slug)?.slug, slug);
  }
  assert.equal(getCaseStudy('missing'), undefined);
});
