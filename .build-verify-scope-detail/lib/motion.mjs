export function scrollProgress(position, distance) {
  if (distance <= 0) return 0;
  return Math.min(1, Math.max(0, position / distance));
}

export function getSamePageAnchor(href, currentUrl) {
  try {
    const current = new URL(currentUrl);
    const target = new URL(href, current);
    if (target.origin !== current.origin || target.pathname !== current.pathname || target.search !== current.search || !target.hash) return null;
    return target.hash;
  } catch {
    return null;
  }
}
