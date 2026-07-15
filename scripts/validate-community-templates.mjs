import { lstatSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'

const root = resolve(new URL('..', import.meta.url).pathname)
const templatesRoot = resolve(root, 'community/templates')
const licensePolicy = readFileSync(resolve(root, 'LICENSE_POLICY.md'), 'utf8')
const submissionsOpen = /^Status:\s*open$/m.test(licensePolicy)
const approvedLicenseMatch = licensePolicy.match(/^Approved SPDX identifiers:\s*(.+)$/m)
const approvedLicenses = new Set(
  approvedLicenseMatch ? approvedLicenseMatch[1].split(',').map((value) => value.trim()).filter(Boolean) : [],
)

const riskyPatterns = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /\b(api[_-]?key|access[_-]?token|secret)\s*[:=]\s*['"]?[A-Za-z0-9_.-]{12,}/i,
]

function fail(message) {
  console.error(message)
  process.exitCode = 1
}

function assertInsideTemplate(templateDir, targetPath, label) {
  const resolved = resolve(templateDir, targetPath)
  const rel = relative(templateDir, resolved)
  if (rel.startsWith('..') || rel === '' || rel.split(sep).includes('..')) {
    fail(`${label} escapes template directory`)
  }
}

function readManifest(manifestPath) {
  const raw = readFileSync(manifestPath, 'utf8')
  const data = {}
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/)
    if (!match) continue
    const [, key, value] = match
    data[key] = value.replace(/^['"]|['"]$/g, '')
  }
  return { raw, data }
}

function scanDir(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const stat = lstatSync(full)
    if (stat.isSymbolicLink()) {
      fail(`symlink is not allowed: ${relative(root, full)}`)
      continue
    }
    if (stat.isDirectory()) {
      scanDir(full)
    }
  }
}

const entries = readdirSync(templatesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !name.startsWith('.'))

if (entries.length === 0) {
  console.log('community templates OK: no templates')
  process.exit(0)
}

if (!submissionsOpen || approvedLicenses.size === 0) {
  fail('Community template submissions are not open yet: template license allowlist is not approved.')
}

const seenCodes = new Set()

for (const dirName of entries) {
  if (!/^[a-z0-9][a-z0-9._-]{2,63}$/.test(dirName)) {
    fail(`invalid template directory name: ${dirName}`)
  }

  const templateDir = join(templatesRoot, dirName)
  scanDir(templateDir)

  const files = readdirSync(templateDir)
  if (files.length > 50) {
    fail(`too many files in template: ${dirName}`)
  }

  const manifestPath = join(templateDir, 'template.yaml')
  try {
    statSync(manifestPath)
  } catch {
    fail(`missing template.yaml: ${dirName}`)
    continue
  }

  const { raw, data } = readManifest(manifestPath)
  if (raw.length > 65536) {
    fail(`template.yaml too large: ${dirName}`)
  }

  for (const pattern of riskyPatterns) {
    if (pattern.test(raw)) {
      fail(`possible secret in template manifest: ${dirName}`)
    }
  }

  for (const forbidden of ['source_repo', 'source_path', 'source_pr_url', 'source_commit_sha', 'source_merged_at', 'author_github']) {
    if (forbidden in data) {
      fail(`trusted source metadata is not allowed in template.yaml: ${dirName}.${forbidden}`)
    }
  }

  if (!data.code || data.code !== dirName) {
    fail(`template code must match directory name: ${dirName}`)
  }
  if (seenCodes.has(data.code)) {
    fail(`duplicate template code: ${data.code}`)
  }
  seenCodes.add(data.code)

  if (!data.license || !approvedLicenses.has(data.license)) {
    fail(`template license is not approved: ${dirName}`)
  }

  for (const key of ['prompt_path', 'readme_path']) {
    if (data[key]) {
      assertInsideTemplate(templateDir, data[key], `${dirName}.${key}`)
    }
  }
}

if (process.exitCode) {
  process.exit(process.exitCode)
}

console.log(`community templates OK: ${entries.length} template(s)`)
