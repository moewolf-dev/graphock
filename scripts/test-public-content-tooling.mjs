import assert from 'node:assert/strict'
import { cpSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const sourceRoot = resolve(new URL('..', import.meta.url).pathname)
const tempRoot = mkdtempSync(join(tmpdir(), 'graphock-public-docs-'))
const scripts = join(tempRoot, 'scripts')
const docs = join(tempRoot, 'docs')
mkdirSync(scripts, { recursive: true })
mkdirSync(join(docs, 'en/getting-started'), { recursive: true })
mkdirSync(join(docs, 'zh/getting-started'), { recursive: true })
cpSync(join(sourceRoot, 'scripts/validate-public-docs.mjs'), join(scripts, 'validate-public-docs.mjs'))
cpSync(join(sourceRoot, 'scripts/validate-markdown-links.mjs'), join(scripts, 'validate-markdown-links.mjs'))

try {
  writeFileSync(join(docs, 'en/index.md'), '[Start](/getting-started/)\n')
  writeFileSync(join(docs, 'en/getting-started/index.md'), '# Start\n')
  writeFileSync(join(docs, 'zh/index.md'), '[开始](/cn/getting-started/)\n')
  writeFileSync(join(docs, 'zh/getting-started/index.md'), '# 开始\n')
  run('scripts/validate-public-docs.mjs', true)
  run('scripts/validate-markdown-links.mjs', true)

  writeFileSync(join(docs, 'en/index.md'), '[Missing](/missing-page/)\n')
  run('scripts/validate-markdown-links.mjs', false)
  writeFileSync(join(docs, 'en/index.md'), '<script>alert(1)</script>\n')
  run('scripts/validate-public-docs.mjs', false)
  writeFileSync(join(docs, 'en/index.md'), '# Safe\n')
  writeFileSync(join(docs, 'en/payload.exe'), 'no')
  run('scripts/validate-public-docs.mjs', false)
  rmSync(join(docs, 'en/payload.exe'))

  try {
    symlinkSync(join(docs, 'en/index.md'), join(docs, 'en/alias.md'))
    run('scripts/validate-public-docs.mjs', false)
  } catch (error) {
    if (error.code !== 'EPERM') throw error
  }
  console.log('public content tooling tests passed: valid locales/routes, broken routes, active HTML, unsupported files, symlink')
} finally {
  rmSync(tempRoot, { recursive: true, force: true })
}

function run(script, success) {
  const result = spawnSync(process.execPath, [script], { cwd: tempRoot, encoding: 'utf8' })
  assert.equal(result.status === 0, success, `${script}\n${result.stdout}\n${result.stderr}`)
}
