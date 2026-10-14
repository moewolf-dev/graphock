import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path'

const root = resolve(new URL('..', import.meta.url).pathname)
const ignoredDirs = new Set(['.git', 'node_modules'])
const markdownFiles = []
const errors = []

collectMarkdown(root)

for (const file of markdownFiles) {
  const text = readFileSync(file, 'utf8')
  if (text.includes('\r')) {
    errors.push(`${relativePath(file)} uses CRLF line endings`)
  }
  validateLinks(file, text)
}

if (errors.length > 0) {
  for (const error of errors) console.error(error)
  process.exit(1)
}

console.log(`markdown links OK: ${markdownFiles.length} file(s)`)

function collectMarkdown(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) collectMarkdown(join(dir, entry.name))
      continue
    }
    if (entry.isFile() && extname(entry.name).toLowerCase() === '.md') {
      markdownFiles.push(join(dir, entry.name))
    }
  }
}

function validateLinks(file, text) {
  const linkPattern = /!?\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g
  for (const match of text.matchAll(linkPattern)) {
    const rawTarget = match[1]
    if (isExternalLink(rawTarget) || rawTarget.startsWith('#')) continue
    const [pathPart] = rawTarget.split('#', 1)
    if (!pathPart) continue
    const decoded = decodeURIComponent(pathPart)
    const target = decoded.startsWith('/')
      ? resolvePublicDocsRoute(file, decoded)
      : resolve(dirname(file), decoded)
    if (target === null) continue
    if (!isInsideRepo(target)) {
      errors.push(`${relativePath(file)} links outside repo: ${rawTarget}`)
      continue
    }
    if (!existsSync(target)) {
      errors.push(`${relativePath(file)} has broken link: ${rawTarget}`)
    }
  }
}

/** Map VitePress public routes back to the migrated locale source tree. */
function resolvePublicDocsRoute(file, route) {
  const docsRoot = resolve(root, 'docs')
  const fileLocale = relative(docsRoot, file).split(sep)[0]
  if (!['en', 'zh', 'fr', 'es', 'ja'].includes(fileLocale)) {
    // Absolute paths elsewhere belong to the marketing site, not the docs tree.
    return null
  }

  let normalized = route.replace(/^\/(?:docs\/)?/, '').replace(/\/$/, '')
  let locale = fileLocale
  const first = normalized.split('/')[0]
  if (['pricing', 'download', 'about', 'community-templates', 'online-tools', 'datasets', 'app', 'user', 'contact', 'privacy', 'terms'].includes(first)) {
    return null
  }
  const prefixLocales = { cn: 'zh', zh: 'zh', fr: 'fr', es: 'es', ja: 'ja', en: 'en' }
  if (prefixLocales[first]) {
    locale = prefixLocales[first]
    normalized = normalized.split('/').slice(1).join('/')
  }

  const localeRoot = resolve(docsRoot, locale)
  const stem = normalized ? resolve(localeRoot, normalized) : resolve(localeRoot, 'index')
  const candidates = [stem, `${stem}.md`, resolve(stem, 'index.md')]
  for (const candidate of candidates) {
    if (!isInsidePath(localeRoot, candidate)) continue
    try {
      if (statSync(candidate).isFile()) return candidate
    } catch {
      // Try the next Markdown route form.
    }
  }

  // An untranslated page may intentionally fall back to English.
  if (locale !== 'en') {
    const englishRoot = resolve(docsRoot, 'en')
    const englishStem = normalized ? resolve(englishRoot, normalized) : resolve(englishRoot, 'index')
    for (const candidate of [englishStem, `${englishStem}.md`, resolve(englishStem, 'index.md')]) {
      if (!isInsidePath(englishRoot, candidate)) continue
      try {
        if (statSync(candidate).isFile()) return candidate
      } catch {
        // Continue through route forms.
      }
    }
  }
  return stem
}

function isInsidePath(parent, target) {
  const path = relative(parent, target)
  return path === '' || (!path.startsWith('..') && !isAbsolute(path))
}

function isExternalLink(target) {
  return /^(?:https?:|mailto:)/i.test(target)
}

function isInsideRepo(target) {
  const path = relative(root, target)
  return path === '' || (!path.startsWith('..') && !isAbsolute(path))
}

function relativePath(file) {
  return file.slice(root.length + 1)
}
