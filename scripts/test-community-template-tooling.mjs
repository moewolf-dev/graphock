import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { execFileSync, spawnSync } from 'node:child_process'
import { join, resolve } from 'node:path'

const root = resolve(new URL('..', import.meta.url).pathname)
const templatesRoot = join(root, 'community/templates')
const policyPath = join(root, 'LICENSE_POLICY.md')
const policyBackup = readFileSync(policyPath, 'utf8')
const templateDir = join(templatesRoot, 'tooling-test-template')
const changedPath = join(root, '.tmp-community-changed-files.json')
const payloadPath = join(root, '.tmp-community-submit-payload.json')

try {
  rmSync(templateDir, { recursive: true, force: true })
  writeFileSync(
    policyPath,
    policyBackup
      .replace('Status: not open.', 'Status: open')
      .replace(
        'Candidate licenses for future review include `MIT`, `Apache-2.0`, `CC0-1.0`, and `CC-BY-4.0`. This list is only a review candidate and is not approval.',
        'Approved SPDX identifiers: MIT, Apache-2.0, CC0-1.0, CC-BY-4.0'
      )
  )

  mkdirSync(templateDir, { recursive: true })
  writeFileSync(join(templateDir, 'prompt.md'), 'Summarize the input as concise bullets.\n')
  writeFileSync(
    join(templateDir, 'template.yaml'),
    [
      'schema_version: "1"',
      'code: tooling-test-template',
      'name: Tooling Test Template',
      'categories:',
      '  - summarize',
      'description: A valid fixture for submit payload generation.',
      'version: 1.0.0',
      'license: MIT',
      'prompt:',
      '  path: prompt.md',
      'config: {}'
    ].join('\n')
  )
  execFileSync('node', ['scripts/validate-community-templates.mjs'], {
    cwd: root,
    stdio: 'pipe'
  })

  writeFileSync(
    changedPath,
    JSON.stringify(
      {
        sourceRepo: 'https://github.com/moewolf-dev/graphock',
        sourcePrUrl: 'https://github.com/moewolf-dev/graphock/pull/1',
        sourceCommitSha: '0123456789abcdef0123456789abcdef01234567',
        sourceMergedAt: '2026-07-15T00:00:00Z',
        authorGithub: 'octocat',
        files: [{ filename: 'community/templates/tooling-test-template/template.yaml', status: 'added' }]
      },
      null,
      2
    )
  )
  execFileSync('node', ['scripts/build-community-submit-payload.mjs', changedPath, payloadPath], {
    cwd: root,
    stdio: 'pipe'
  })
  const payload = JSON.parse(readFileSync(payloadPath, 'utf8'))
  assert(payload.items.length === 1, 'payload should contain one item')
  assert(payload.items[0].operation === 'upsert', 'payload operation should be upsert')
  assert(payload.items[0].manifest.code === 'tooling-test-template', 'payload should include manifest')
  assert(
    payload.items[0].promptText.includes('Summarize the input'),
    'payload should include resolved promptText'
  )
  assert(/^[0-9a-f]{64}$/.test(payload.items[0].checksum), 'payload should include sha256 checksum')

  writeFileSync(
    join(templateDir, 'template.yaml'),
    [
      'schema_version: "1"',
      'code: tooling-test-template',
      'name: Tooling Test Template',
      'categories:',
      '  - summarize',
      'description: This manifest includes trusted metadata and must fail.',
      'version: 1.0.0',
      'license: MIT',
      'source_repo: https://github.com/moewolf-dev/graphock',
      'prompt:',
      '  inline: bad',
      'config: {}'
    ].join('\n')
  )
  const invalid = spawnSync('node', ['scripts/validate-community-templates.mjs'], {
    cwd: root,
    encoding: 'utf8'
  })
  assert(invalid.status !== 0, 'invalid manifest should fail validation')
  assert(
    invalid.stderr.includes('trusted source metadata is not allowed'),
    'invalid manifest should explain trusted metadata rejection'
  )

  console.log('community template tooling tests OK')
} finally {
  writeFileSync(policyPath, policyBackup)
  rmSync(templateDir, { recursive: true, force: true })
  rmSync(changedPath, { force: true })
  rmSync(payloadPath, { force: true })
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}
