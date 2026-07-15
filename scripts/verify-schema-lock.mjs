import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(new URL('..', import.meta.url).pathname)
const lockPath = resolve(root, 'schemas/schema.lock.json')
const lock = JSON.parse(readFileSync(lockPath, 'utf8'))

let failures = 0

for (const entry of lock.schemas ?? []) {
  const filePath = resolve(root, entry.path)
  const digest = createHash('sha256').update(readFileSync(filePath)).digest('hex')
  if (digest !== entry.sha256) {
    console.error(`schema lock mismatch: ${entry.path}`)
    console.error(`  expected ${entry.sha256}`)
    console.error(`  actual   ${digest}`)
    failures += 1
  }
}

if (failures > 0) {
  process.exit(1)
}

console.log(`schema lock OK: ${(lock.schemas ?? []).length} schema(s)`)
