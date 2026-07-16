import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'

const root = resolve(new URL('..', import.meta.url).pathname)
const ignoredDirs = new Set(['.git', 'node_modules'])
const ignoredFiles = new Set(['package-lock.json'])
const allowedPlaceholderFiles = new Set(['README.md', 'LICENSE_POLICY.md'])
const textExtensions = new Set([
  '',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.txt',
  '.yaml',
  '.yml'
])
const patterns = [
  {
    name: 'private key',
    regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----/
  },
  {
    name: 'OpenAI-style secret key',
    regex: /\bsk-[A-Za-z0-9_-]{20,}\b/
  },
  {
    name: 'generic assigned secret',
    regex: /\b(api[_-]?key|access[_-]?token|secret|password)\s*[:=]\s*['"]?[A-Za-z0-9_.-]{12,}/i
  },
  {
    name: 'environment assignment',
    regex: /^[A-Z0-9_]*(TOKEN|SECRET|PASSWORD|KEY)\s*=/m
  }
]
const errors = []

scan(root)

if (errors.length > 0) {
  for (const error of errors) console.error(error)
  process.exit(1)
}

console.log('secret scan OK')

function scan(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    const rel = relative(root, path)
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) scan(path)
      continue
    }
    if (!entry.isFile() || ignoredFiles.has(entry.name)) continue
    if (!textExtensions.has(extname(entry.name).toLowerCase())) continue
    if (statSync(path).size > 1_000_000) continue

    const text = readFileSync(path, 'utf8')
    for (const pattern of patterns) {
      if (pattern.regex.test(text) && !allowedPlaceholderFiles.has(rel)) {
        errors.push(`${rel}: possible ${pattern.name}`)
      }
    }
  }
}
