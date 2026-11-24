export function scrollProgress(position, distance) {
  if (distance <= 0) return 0;
  return Math.min(1, Math.max(0, position / distance));
}

export function smoothProgress(current, target, elapsed) {
  return current + (target - current) * (1 - Math.exp(-Math.max(0, elapsed) / 150));
}
