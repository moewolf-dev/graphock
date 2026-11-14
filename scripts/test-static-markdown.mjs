import assert from 'node:assert/strict'
import { assertStaticMarkdown } from './static-markdown.mjs'
for (const valid of ['# Guide\n\n[Install](./install.md).', '```vue\n<script>alert(1)</script>\n{{ code }}\n```\n', 'Use `{{ literal }}` as a code example.', '---\ndocumentation_status: current\nreviewed_at: 2026-10-14\n---\n# Guide']) assert.doesNotThrow(() => assertStaticMarkdown(valid))
for (const invalid of ['{{ (() => "executed")() }}', '<div :class="expression">text</div>', '<CustomComponent />', '<!-- Vue template comment -->', '---\nhead: [[script, {}, code]]\n---\n# Title', '---\nlayout: private-layout\n---\n# Title', '---\nhero:\n  name: "{{ expression }}"\n---\n# Title', '---\nnext:\n  link: javascript:alert(1)\n---\n# Title']) assert.throws(() => assertStaticMarkdown(invalid), /static Markdown/)
console.log('static Markdown: examples accepted; Vue/HTML/active frontmatter rejected')
