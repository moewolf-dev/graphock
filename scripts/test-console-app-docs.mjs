import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// C.79 / U10: contract for the Console App documentation set. Every English
// page must be reviewed and linked from the index; every locale must carry a
// title-only placeholder that points at the English source instead of
// pretending to be a reviewed translation.
const root = new URL('..', import.meta.url).pathname
const pages = [
  'index',
  'requirements',
  'install',
  'quick-start',
  'local-free',
  'formats-limits',
  'sign-in',
  'free-pro',
  'account-deletion',
  'troubleshooting',
  'limitations',
  'files',
  'tasks',
  'settings',
  'graph-and-galaxy',
  'agents-and-mcp'
]
const locales = ['zh', 'fr', 'es', 'ja']

const read = (...parts) => readFileSync(join(root, ...parts), 'utf8')
const errors = []

for (const slug of pages) {
  const file = join(root, 'docs/en/console-app', `${slug}.md`)
  if (!existsSync(file)) {
    errors.push(`missing English page: ${slug}.md`)
    continue
  }
  const content = readFileSync(file, 'utf8')
  // Draft until the product and code owners review each page. A page may only
  // become `current` once its steps are checked against the real UI and no
  // unreleased capability is still described as "coming soon".
  const status = content.match(/^documentation_status: (\w+)$/m)?.[1]
  if (status !== 'draft' && status !== 'current') {
    errors.push(`${slug}.md: missing documentation_status (draft or current)`)
  }
  if (status === 'current' && /\bcoming soon\b/i.test(content)) {
    errors.push(`${slug}.md: a current page still contains a coming-soon claim`)
  }
  // reviewed_at records an owner review, not the authoring date. Drafts must
  // not carry a date that could be mistaken for sign-off.
  if (status === 'current' && !/^reviewed_at: \d{4}-\d{2}-\d{2}$/m.test(content)) {
    errors.push(`${slug}.md: a current page needs a reviewed_at date`)
  }
  if (status === 'draft' && /^reviewed_at:/m.test(content)) {
    errors.push(`${slug}.md: a draft must not claim a reviewed_at date`)
  }
  if (slug !== 'index' && !read('docs/en/console-app/index.md').includes(`./${slug}.md`)) {
    errors.push(`index.md does not link to ${slug}.md`)
  }
  for (const locale of locales) {
    const placeholder = join(root, `docs/${locale}/console-app`, `${slug}.md`)
    if (!existsSync(placeholder)) {
      errors.push(`missing ${locale} placeholder for ${slug}.md`)
      continue
    }
    const text = readFileSync(placeholder, 'utf8')
    if (!/^---\ntranslation_status: missing\n---/m.test(text)) {
      errors.push(`${locale}/${slug}.md: missing translation_status: missing`)
    }
    if (!text.includes(`../../en/console-app/${slug}.md`)) {
      errors.push(`${locale}/${slug}.md: does not link to the English page`)
    }
    if (!/^# .+$/m.test(text)) {
      errors.push(`${locale}/${slug}.md: missing translated title`)
    }
  }
}

// Pricing must stay honest until a live checkout is verified: no quoted amount
// and an explicit coming-soon status.
const freePro = read('docs/en/console-app/free-pro.md')
if (/\$\s?\d/.test(freePro) || /\b(?:USD|EUR|CNY)\s?\d/i.test(freePro)) {
  errors.push('free-pro.md quotes a price before checkout is verified')
}
if (!/coming soon/i.test(freePro)) {
  errors.push('free-pro.md must mark purchasing as coming soon')
}
for (const line of freePro.split('\n')) {
  if (/unlimited/i.test(line) && !/(?:\bnot\b|never|no\b)/i.test(line)) {
    errors.push('free-pro.md must not promise unlimited cloud processing')
  }
}

// Expansion claims need the same treatment.
const limitations = read('docs/en/console-app/limitations.md')
if (!/(Windows and Linux|Windows.*Linux).*(not available|no package)/is.test(limitations)) {
  errors.push('limitations.md must state that Windows and Linux are not released')
}
if (!/coming soon/i.test(limitations)) {
  errors.push('limitations.md must mark unreleased distribution as coming soon')
}

if (errors.length > 0) {
  console.error('console-app docs contract failed:')
  for (const error of errors) console.error(` - ${error}`)
  process.exit(1)
}
console.log(`console-app docs contract passed: ${pages.length} English pages, ${pages.length * locales.length} locale placeholders`)
