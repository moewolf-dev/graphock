# Public Documentation

This directory contains user-facing Graphock documentation with explicit current/archived status. English source pages live under `en/`; translations use `zh/`, `fr/`, `es/`, and `ja/`. The public site imports only these locale directories.

Contribute through a pull request. Keep translated page paths aligned with English where practical, link to the English page when a translation is missing, and do not add internal deployment notes, credentials, private customer data, or unreviewed release history. Relative links and assets must remain inside this directory.

The initial product-documentation migration is recorded in `content-source-map.json`. Editing the documentation source does not grant broader reuse rights; see the repository licensing policy.

The 2026-10-14 content audit replaced unverified chart/dashboard walkthroughs with nine current desktop-workflow guides and explicit archived compatibility routes. Translations require re-review after that correction; `translation_status: missing` means the website must show an English fallback, not count the page as translated. Archived pages are not feature roadmap promises.

## Static content boundary

Public Markdown accepts prose, ordinary Markdown links/images and fenced or inline code examples. Raw HTML, Vue components/interpolation/directives, custom layouts and executable frontmatter (including `head`) are rejected by both public validation and the independently trusted website importer. Code examples are displayed as text, never executed.
