# Managing field notes

All posts and their categories live in `lib/field-notes.json`. To add a post, append an object to the end of `posts` and provide its unique `slug`, `number`, `topic`, `title`, `description`, `lead`, `sections`, and `category`. Use an existing category's `id`, or add a category object to the `categories` array first. Preserve the JSON array's oldest-to-newest order: the portfolio reverses it for display, so the most recently appended post appears first on the homepage and in the archive. Dates do not control display order.

Each post includes `sourceLinkedInUrl` and `sourceIsPlaceholder`. Until the actual post URL is known, the URL points to Lokesh's LinkedIn profile and `sourceIsPlaceholder` is `true`. Replace it with the original post URL and set `sourceIsPlaceholder` to `false` when available. Optional `sources` can list further reading. The `visual` field in a section is optional and uses the visual types supported in the article page.

Posts are local content. There is no LinkedIn API, background import, or credential configuration. Changes appear after rebuilding or redeploying the portfolio.
