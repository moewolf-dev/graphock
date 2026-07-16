import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, isAbsolute, join, relative, resolve } from 'node:path'

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
  const linkPattern = /(?<!!)\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g
  for (const match of text.matchAll(linkPattern)) {
    const rawTarget = match[1]
    if (isExternalLink(rawTarget) || rawTarget.startsWith('#')) continue
    const [pathPart] = rawTarget.split('#', 1)
    if (!pathPart) continue
    const decoded = decodeURIComponent(pathPart)
    const target = resolve(dirname(file), decoded)
    if (!isInsideRepo(target)) {
      errors.push(`${relativePath(file)} links outside repo: ${rawTarget}`)
      continue
    }
    if (!existsSync(target)) {
      errors.push(`${relativePath(file)} has broken link: ${rawTarget}`)
    }
  }
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
