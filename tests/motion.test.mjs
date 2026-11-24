import test from 'node:test';
import assert from 'node:assert/strict';
import { scrollProgress, smoothProgress } from '../lib/motion.mjs';

test('scroll progress stays between zero and one', () => {
  assert.equal(scrollProgress(-100, 1000), 0);
  assert.equal(scrollProgress(500, 1000), 0.5);
  assert.equal(scrollProgress(1500, 1000), 1);
  assert.equal(scrollProgress(100, 0), 0);
});

test('smooth progress approaches the target consistently over time', () => {
  assert.equal(smoothProgress(0.4, 0.4, 16), 0.4);
  assert.equal(smoothProgress(0, 1, 0), 0);
  const oneStep = smoothProgress(0, 1, 32);
  const twoSteps = smoothProgress(smoothProgress(0, 1, 16), 1, 16);
  assert.ok(oneStep > 0 && oneStep < 1);
  assert.ok(Math.abs(oneStep - twoSteps) < 0.000001);
});
