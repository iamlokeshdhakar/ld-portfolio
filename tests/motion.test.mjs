import test from 'node:test';
import assert from 'node:assert/strict';
import { scrollProgress, getSamePageAnchor } from '../lib/motion.mjs';

test('scroll progress stays between zero and one', () => {
  assert.equal(scrollProgress(-100, 1000), 0);
  assert.equal(scrollProgress(500, 1000), 0.5);
  assert.equal(scrollProgress(1500, 1000), 1);
  assert.equal(scrollProgress(100, 0), 0);
});

test('only same-page links with a hash are handled as in-page navigation', () => {
  const current = 'https://example.com/case-studies?view=all';
  assert.equal(getSamePageAnchor('#work', current), '#work');
  assert.equal(getSamePageAnchor('/case-studies?view=all#retrieval', current), '#retrieval');
  assert.equal(getSamePageAnchor('/#work', current), null);
  assert.equal(getSamePageAnchor('https://other.example/case-studies#work', current), null);
  assert.equal(getSamePageAnchor('/case-studies?view=other#work', current), null);
  assert.equal(getSamePageAnchor('mailto:hello@example.com', current), null);
});

