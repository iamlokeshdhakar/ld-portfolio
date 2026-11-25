import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { newestFirst, getFieldNote, getCategory } from '../lib/field-notes.mjs';

const { categories, posts } = JSON.parse(await readFile(new URL('../lib/field-notes.json', import.meta.url), 'utf8'));

test('appending posts places them first without mutating the JSON order', () => {
  const original = [{ slug: 'older', category: 'a' }, { slug: 'newer', category: 'b' }, { slug: 'latest', category: 'a' }];
  assert.deepEqual(newestFirst(original).map((post) => post.slug), ['latest', 'newer', 'older']);
  assert.deepEqual(newestFirst(original).filter((post) => post.category === 'a').map((post) => post.slug), ['latest', 'older']);
  assert.deepEqual(original.map((post) => post.slug), ['older', 'newer', 'latest']);
});

test('each stored post has a unique route, a known category, and a LinkedIn source', () => {
  assert.ok(posts.length >= 17);
  assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length);
  for (const post of posts) {
    assert.equal(getFieldNote(posts, post.slug), post);
    assert.ok(getCategory(categories, post.category));
    assert.equal(new URL(post.sourceLinkedInUrl).hostname, 'www.linkedin.com');
    assert.equal(typeof post.sourceIsPlaceholder, 'boolean');
    assert.ok(post.title && post.description && post.lead);
    assert.ok(post.sections.length > 0);
    assert.ok(post.sections.every((section) => section.heading && section.paragraphs.length > 0));
  }
  assert.equal(getFieldNote(posts, 'does-not-exist'), undefined);
});

test('the supplied engineering posts follow the earlier notes in newest-first order', () => {
  const expected = [
    'why-we-chose-event-driven-architecture', 'why-sns-sqs-and-lambda-together',
    'ordering-graph-events-through-failures', 'a-dead-letter-queue-needs-a-response',
    'why-we-use-three-layer-architecture', 'review-before-a-knowledge-graph-write',
    'guarding-submission-state-transitions', 'lessons-from-a-pnpm-turbo-monorepo',
    'centralizing-secrets-across-services', 'strict-typescript-as-a-team-contract',
  ];
  assert.deepEqual(posts.slice(-expected.length).map((post) => post.slug), expected);
  assert.deepEqual(newestFirst(posts).slice(0, expected.length).map((post) => post.slug), expected.toReversed());
});
