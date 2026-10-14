import { lstatSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'

const root = resolve(new URL('..', import.meta.url).pathname)
const docsRoot = join(root, 'docs')
const locales = new Set(['en', 'zh', 'fr', 'es', 'ja'])
const allowedExtensions = new Set(['.md', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'])
const maxFileBytes = 5 * 1024 * 1024
const errors = []
let markdownCount = 0

walk(docsRoot)
if (errors.length) {
  for (const error of errors) console.error(error)
  process.exit(1)
}
console.log(`public docs OK: ${markdownCount} Markdown file(s), locale/path/asset checks passed`)

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name)
    const rel = relative(docsRoot, fullPath)
    const stat = lstatSync(fullPath)
    if (stat.isSymbolicLink()) {
      errors.push(`${rel}: symlinks are not allowed in public docs`)
      continue
    }
    if (entry.isDirectory()) {
      if (rel && !rel.includes('/') && !locales.has(rel) && rel !== 'assets') {
        errors.push(`${rel}: unsupported public docs directory`)
      }
      walk(fullPath)
      continue
    }
    if (!entry.isFile()) continue
    if (rel === 'README.md' || rel === 'content-source-map.json') continue
    if (stat.size > maxFileBytes) errors.push(`${rel}: file exceeds ${maxFileBytes} bytes`)
    const extension = extname(entry.name).toLowerCase()
    if (!allowedExtensions.has(extension)) {
      errors.push(`${rel}: unsupported public documentation asset type`)
      continue
    }
    if (!locales.has(rel.split(/[\\/]/)[0]) && rel.split(/[\\/]/)[0] !== 'assets') {
      errors.push(`${rel}: content must live under a locale directory or docs/assets`)
    }
    if (extension === '.md') {
      markdownCount += 1
      const content = stat.size < 1_000_000 ? readFileSync(fullPath, 'utf8') : ''
      if (/<\s*(script|iframe|object|embed)\b/i.test(content)) {
        errors.push(`${rel}: executable or embedded HTML is not allowed`)
      }
      if (content.includes('\r')) errors.push(`${rel}: use LF line endings`)
    }
    if (extension === '.svg' && stat.size < 1_000_000) {
      const svg = readFileSync(fullPath, 'utf8')
      if (/<\s*(script|foreignObject)\b|\bon[a-z]+\s*=|javascript:|(?:href|xlink:href)\s*=\s*["'](?:https?:|\/\/|data:)/i.test(svg)) {
        errors.push(`${rel}: unsafe SVG content is not allowed`)
      }
    }
  }
}
