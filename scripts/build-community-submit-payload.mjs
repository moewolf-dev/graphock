import { readFileSync, writeFileSync } from 'node:fs'
import { validateCommunityTemplates } from './validate-community-templates.mjs'

const changedFilesPath = process.argv[2]
const outputPath = process.argv[3]

if (!changedFilesPath || !outputPath) {
  console.error(
    'Usage: node scripts/build-community-submit-payload.mjs <changed-files.json> <output.json>'
  )
  process.exit(1)
}

const changedFiles = JSON.parse(readFileSync(changedFilesPath, 'utf8'))
const validation = validateCommunityTemplates()
if (!validation.ok) {
  for (const error of validation.errors) console.error(error)
  process.exit(1)
}

const templatesByPath = new Map(validation.templates.map((template) => [template.sourcePath, template]))
const directories = new Map()

for (const file of changedFiles.files ?? []) {
  const filename = String(file.filename ?? '')
  const match = filename.match(/^community\/templates\/([^/]+)(?:\/|$)/)
  if (!match) continue
  const sourcePath = `community/templates/${match[1]}`
  const operation = file.status === 'removed' ? 'remove' : 'upsert'
  if (operation === 'upsert' || !directories.has(sourcePath)) directories.set(sourcePath, operation)
}

const operations = [...directories.entries()].map(([sourcePath, operation]) => {
  const base = {
    operation,
    sourceRepo: changedFiles.sourceRepo,
    sourcePath,
    sourcePrUrl: changedFiles.sourcePrUrl,
    sourceCommitSha: changedFiles.sourceCommitSha,
    sourceMergedAt: changedFiles.sourceMergedAt,
    authorGithub: changedFiles.authorGithub
  }
  if (operation === 'remove') {
    return { ...base, checksum: changedFiles.sourceCommitSha.slice(0, 64).padEnd(64, '0') }
  }
  const template = templatesByPath.get(sourcePath)
  if (!template) {
    throw new Error(`changed template is missing after validation: ${sourcePath}`)
  }
  return {
    ...base,
    manifest: template.manifest,
    promptText: template.promptText,
    checksum: template.checksum
  }
})

writeFileSync(outputPath, JSON.stringify({ items: operations }, null, 2))
console.log(`community submit payload OK: ${operations.length} operation(s)`)
