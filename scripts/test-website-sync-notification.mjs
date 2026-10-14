import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import YAML from 'yaml'

const workflow = YAML.parse(readFileSync(resolve('.github/workflows/validate.yml'), 'utf8'))
const validate = workflow.jobs.validate
const notify = workflow.jobs.notify_website

assert.ok(Object.hasOwn(workflow.on, 'push'))
assert.ok(Object.hasOwn(workflow.on, 'pull_request'))
assert.match(notify.if, /github\.repository == 'moewolf-dev\/graphock'/)
assert.match(notify.if, /github\.ref == 'refs\/heads\/main'/)
assert.equal(notify.needs, 'validate', 'dispatch must wait for public content validation')
assert.equal(notify.permissions.contents, 'read', 'public GITHUB_TOKEN stays read-only')

const detection = notify.steps.find((step) => step.name === 'Detect validated public content changes')
assert.ok(detection)
assert.match(detection.run, /git diff --name-only/)
assert.match(detection.run, /docs\//)
assert.match(detection.run, /community\//)

const token = notify.steps.find((step) => step.id === 'app-token')
assert.equal(token.uses, 'actions/create-github-app-token@v3')
assert.equal(token.with.owner, 'moewolf-dev')
assert.equal(token.with.repositories, 'graphock-website')
assert.equal(token.with['permission-contents'], 'write')

const dispatch = notify.steps.find((step) => step.name === 'Dispatch the exact validated public commit')
assert.ok(dispatch)
assert.match(dispatch.run, /repos\/moewolf-dev\/graphock-website\/dispatches/)
assert.match(dispatch.run, /github\.sha|PUBLIC_SHA/)
assert.match(dispatch.run, /public-content-merged/)
assert.match(dispatch.run, /source_repository/)
assert.equal(validate.steps.some((step) => step.run === 'npm run validate'), true)

console.log('website sync notification workflow contract passed')
