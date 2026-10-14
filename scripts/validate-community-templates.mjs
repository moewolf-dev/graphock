import { lstatSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, relative, resolve, sep } from 'node:path'
import YAML from 'yaml'
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const root = resolve(new URL('..', import.meta.url).pathname)
const templatesRoot = resolve(root, 'community/templates')
const schemaRoot = resolve(root, 'schemas')
const communitySchema = JSON.parse(
  readFileSync(resolve(schemaRoot, 'community-template-manifest.schema.json'), 'utf8')
)
const graphMappingSchema = JSON.parse(
  readFileSync(resolve(schemaRoot, 'graph-import-mapping.schema.json'), 'utf8')
)

const licensePolicy = readFileSync(resolve(root, 'LICENSE_POLICY.md'), 'utf8')
const submissionsOpen = /^Status:\s*open$/m.test(licensePolicy)
const approvedLicenseMatch = licensePolicy.match(/^Approved SPDX identifiers:\s*(.+)$/m)
const approvedLicenses = new Set(
  approvedLicenseMatch
    ? approvedLicenseMatch[1]
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
    : []
)

const riskyPatterns = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /\b(api[_-]?key|access[_-]?token|secret)\s*[:=]\s*['"]?[A-Za-z0-9_.-]{12,}/i
]
const forbiddenTrustedKeys = [
  'source_repo',
  'source_path',
  'source_pr_url',
  'source_commit_sha',
  'source_merged_at',
  'author_github'
]

const ajv = new Ajv2020({ allErrors: true, strict: false })
addFormats(ajv)
ajv.addSchema(graphMappingSchema, './graph-import-mapping.schema.json')
const validateManifest = ajv.compile(communitySchema)

export function validateCommunityTemplates() {
  const entries = readdirSync(templatesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith('.'))

  if (entries.length === 0) {
    return { ok: true, templates: [], message: 'community templates OK: no templates' }
  }

  if (!submissionsOpen || approvedLicenses.size === 0) {
    return {
      ok: false,
      errors: [
        'Community template submissions are not open yet: template license allowlist is not approved.'
      ]
    }
  }

  const seenCodes = new Set()
  const errors = []
  const templates = []

  for (const dirName of entries) {
    const templateDir = join(templatesRoot, dirName)
    const result = validateTemplateDir(templateDir, dirName, seenCodes)
    if (result.ok) templates.push(result.template)
    else errors.push(...result.errors)
  }

  if (errors.length > 0) return { ok: false, errors }
  return { ok: true, templates, message: `community templates OK: ${templates.length} template(s)` }
}

function validateTemplateDir(templateDir, dirName, seenCodes) {
  const errors = []
  if (!/^[a-z0-9][a-z0-9._-]{2,63}$/.test(dirName)) {
    errors.push(`invalid template directory name: ${dirName}`)
  }

  scanDir(templateDir, errors)
  validateLocalizedDescriptions(templateDir, dirName, errors)
  const files = readdirSync(templateDir)
  if (files.length > 50) errors.push(`too many files in template: ${dirName}`)

  const manifestPath = join(templateDir, 'template.yaml')
  try {
    statSync(manifestPath)
  } catch {
    return { ok: false, errors: [...errors, `missing template.yaml: ${dirName}`] }
  }

  const raw = readFileSync(manifestPath, 'utf8')
  if (raw.length > 65536) errors.push(`template.yaml too large: ${dirName}`)
  scanSecretPatterns(raw, `template manifest: ${dirName}`, errors)

  let manifest
  try {
    manifest = YAML.parse(raw)
  } catch (error) {
    errors.push(`invalid YAML in template.yaml: ${dirName}: ${error.message}`)
  }
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    errors.push(`template.yaml must be a YAML object: ${dirName}`)
    return { ok: false, errors }
  }

  for (const key of forbiddenTrustedKeys) {
    if (Object.hasOwn(manifest, key)) {
      errors.push(`trusted source metadata is not allowed in template.yaml: ${dirName}.${key}`)
    }
  }

  if (manifest.code !== dirName) {
    errors.push(`template code must match directory name: ${dirName}`)
  }
  if (manifest.code && seenCodes.has(manifest.code)) {
    errors.push(`duplicate template code: ${manifest.code}`)
  }
  if (manifest.code) seenCodes.add(manifest.code)

  if (manifest.license && !approvedLicenses.has(manifest.license)) {
    errors.push(`template license is not approved: ${dirName}`)
  }

  if (!validateManifest(manifest)) {
    for (const error of validateManifest.errors ?? []) {
      errors.push(`schema violation in ${dirName}${error.instancePath}: ${error.message}`)
    }
  }

  const promptText = resolvePromptText(templateDir, dirName, manifest, errors)
  const readmeText = resolveOptionalText(templateDir, dirName, manifest.readme_path, 'readme_path', errors)
  const checksum = createHash('sha256')
    .update(raw)
    .update('\0')
    .update(promptText ?? '')
    .update('\0')
    .update(readmeText ?? '')
    .digest('hex')

  if (errors.length > 0) return { ok: false, errors }
  return {
    ok: true,
    template: {
      code: manifest.code,
      sourcePath: `community/templates/${dirName}`,
      manifest,
      promptText,
      checksum
    }
  }
}

function validateLocalizedDescriptions(templateDir, dirName, errors) {
  const localeDirectory = join(templateDir, 'locales')
  try {
    const directoryStat = lstatSync(localeDirectory)
    if (directoryStat.isSymbolicLink() || !directoryStat.isDirectory()) {
      errors.push(`template locales must be a regular directory: ${dirName}`)
      return
    }
  } catch (error) {
    if (error.code === 'ENOENT') return
    throw error
  }

  const supportedLocales = new Set(['en', 'zh', 'fr', 'es', 'ja'])
  for (const entry of readdirSync(localeDirectory, { withFileTypes: true })) {
    const fullPath = join(localeDirectory, entry.name)
    const stat = lstatSync(fullPath)
    if (stat.isSymbolicLink() || !entry.isFile()) {
      errors.push(`localized descriptions must be regular files: ${dirName}/locales/${entry.name}`)
      continue
    }
    const locale = entry.name.replace(/\.md$/i, '')
    if (!entry.name.endsWith('.md') || !supportedLocales.has(locale)) {
      errors.push(`unsupported localized description: ${dirName}/locales/${entry.name}`)
      continue
    }
    if (stat.size > 65536) {
      errors.push(`localized description too large: ${dirName}/${entry.name}`)
      continue
    }
    const text = readFileSync(fullPath, 'utf8')
    if (text.includes('\r')) errors.push(`localized description must use LF line endings: ${dirName}/${entry.name}`)
    if (/<\s*(script|iframe|object|embed)\b/i.test(text)) errors.push(`executable HTML is forbidden in localized description: ${dirName}/${entry.name}`)
    scanSecretPatterns(text, `localized description: ${dirName}/${entry.name}`, errors)
  }
}

function resolvePromptText(templateDir, dirName, manifest, errors) {
  if (manifest?.prompt?.inline) return manifest.prompt.inline
  const promptPath = manifest?.prompt?.path
  if (!promptPath) return null
  const fullPath = assertInsideTemplate(templateDir, promptPath, `${dirName}.prompt.path`, errors)
  if (!fullPath) return null
  try {
    const stat = statSync(fullPath)
    if (stat.size > 20000) errors.push(`prompt file too large: ${dirName}`)
    const text = readFileSync(fullPath, 'utf8')
    scanSecretPatterns(text, `prompt file: ${dirName}`, errors)
    return text
  } catch {
    errors.push(`prompt file not found: ${dirName}`)
    return null
  }
}

function resolveOptionalText(templateDir, dirName, relativePath, label, errors) {
  if (!relativePath) return null
  const fullPath = assertInsideTemplate(templateDir, relativePath, `${dirName}.${label}`, errors)
  if (!fullPath) return null
  try {
    const stat = statSync(fullPath)
    if (stat.size > 65536) errors.push(`${label} file too large: ${dirName}`)
    const text = readFileSync(fullPath, 'utf8')
    scanSecretPatterns(text, `${label} file: ${dirName}`, errors)
    return text
  } catch {
    errors.push(`${label} file not found: ${dirName}`)
    return null
  }
}

function assertInsideTemplate(templateDir, targetPath, label, errors) {
  const resolved = resolve(templateDir, targetPath)
  const rel = relative(templateDir, resolved)
  if (rel.startsWith('..') || rel === '' || rel.split(sep).includes('..')) {
    errors.push(`${label} escapes template directory`)
    return null
  }
  return resolved
}

function scanDir(dir, errors) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const stat = lstatSync(full)
    if (stat.isSymbolicLink()) {
      errors.push(`symlink is not allowed: ${relative(root, full)}`)
      continue
    }
    if (stat.isDirectory()) scanDir(full, errors)
  }
}

function scanSecretPatterns(text, label, errors) {
  for (const pattern of riskyPatterns) {
    if (pattern.test(text)) errors.push(`possible secret in ${label}`)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = validateCommunityTemplates()
  if (!result.ok) {
    for (const error of result.errors) console.error(error)
    process.exit(1)
  }
  console.log(result.message)
}
