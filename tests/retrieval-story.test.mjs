import test from 'node:test';
import assert from 'node:assert/strict';
import { axyStories } from '../lib/axy-stories.mjs';
import { getCaseStudy } from '../lib/case-studies.mjs';

test('RAG case study preserves the benchmark outcomes and the unshipped model comparison', () => {
  const story = axyStories['hybrid-retrieval'];
  assert.match(story.title, /RAG/i);
  assert.match(getCaseStudy('hybrid-retrieval').intro, /RAG/);
  assert.deepEqual(story.benchmark.results.map((result) => result.dataset), ['SciFact', 'NFCorpus', 'DBPedia-Entity', 'SCIDOCS']);
  assert.equal(story.benchmark.results[0].value, '0.70 → 0.73 → 0.77');
  assert.equal(story.benchmark.results[2].value, '0.51 → 0.47 → 0.60');
  assert.match(story.benchmark.results[2].metric, /REPORTED SCORE/);
  assert.match(story.benchmark.modelFoot, /before a migration ships/);
  assert.deepEqual(story.stages[0].branches, ['DENSE', 'BM25']);
  assert.equal(story.benchmark.bugs.length, 2);
});
