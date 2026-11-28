// Posts are appended to JSON in publication order; display the latest first.
export function newestFirst(posts) { return [...posts].reverse(); }
export function getFieldNote(posts, slug) { return posts.find((post) => post.slug === slug); }
export function getCategory(categories, id) { return categories.find((category) => category.id === id); }
