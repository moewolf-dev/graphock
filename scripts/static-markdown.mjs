import MarkdownIt from 'markdown-it'
import YAML from 'yaml'

// Public content is data, never a Vue template. Keep this validator in each
// trusted repository; the private importer must not execute public scripts.
const parser = new MarkdownIt({ html: true })
const allowed = new Set(['title', 'description', 'layout', 'hero', 'features', 'sidebar', 'outline', 'editLink', 'lastUpdated', 'prev', 'next', 'documentation_status', 'translation_status', 'reviewed_at'])
export function assertStaticMarkdown(source, path = 'Markdown') {
  const fail = (reason) => { throw new Error(`${path}: static Markdown required (${reason})`) }
  let body = source
  if (source.startsWith('---\n')) {
    const end = source.indexOf('\n---', 4)
    if (end < 0 || !/^\n---(?:\n|$)/.test(source.slice(end))) fail('invalid frontmatter')
    const data = YAML.parse(source.slice(4, end), { maxAliasCount: 0 })
    if (!data || typeof data !== 'object' || Array.isArray(data)) fail('invalid frontmatter object')
    for (const key of Object.keys(data)) if (!allowed.has(key)) fail(`unsupported frontmatter field ${key}`)
    if (data.layout != null && !['doc', 'home', 'page', false].includes(data.layout)) fail('custom layout')
    const inspect = (value) => {
      if (typeof value === 'string' && /<|\{\{|\}\}|(?:javascript|vbscript|data)\s*:/i.test(value)) fail('active frontmatter value')
      if (Array.isArray(value)) value.forEach(inspect)
      else if (value && typeof value === 'object') Object.values(value).forEach(inspect)
    }
    inspect(data)
    body = source.slice(end + 4)
  }
  const inspectTokens = (tokens) => {
    let text = ''
    for (const token of tokens) {
      if (token.type === 'html_inline' || token.type === 'html_block') fail('raw HTML / Vue component')
      if (token.type === 'text') text += token.content
      if (token.children) inspectTokens(token.children)
    }
    if (/\{\{|\}\}/.test(text)) fail('Vue interpolation')
  }
  inspectTokens(parser.parse(body, {}))
}
