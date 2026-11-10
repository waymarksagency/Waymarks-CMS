// Shared helpers for the Waymarks static build. No npm packages needed.
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

export const ROOT = path.dirname(fileURLToPath(import.meta.url))
export const SITE = 'https://waymarks.agency'
export const STATIC_IMG = JSON.parse(fs.readFileSync(path.join(ROOT, 'static-images.json'), 'utf8'))

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const slugify = (s = '') =>
  String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70) || 'section'

export const niceDate = (d) =>
  new Date(d).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'})
export const isoDay = (d) => new Date(d).toISOString().slice(0, 10)

export const SERVICE_NAMES = {
  'brand-design': 'Brand Design',
  'ui-ux-design': 'UI/UX Design',
  'website-design': 'Website Design & Development',
  'saas-product-design': 'SaaS & Product Design',
  'mvp-development': 'MVP Development',
  'mobile-app-design': 'Mobile App Design',
  'digital-growth': 'Digital Growth',
  'project-management-services': 'Project Management',
}

/* ---------- CSS / JS minifying and picking ---------- */
export function minCss(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '').replace(/\s*([{};,>])\s*/g, '$1').replace(/;}/g, '}')
}
export function minJs(js) {
  return js.replace(/^\s*\/\*[\s\S]*?\*\/\s*$/gm, '').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('//')).join('\n')
}
function parseRules(s) {
  const out = []
  let i = 0
  while (i < s.length) {
    const j = s.indexOf('{', i)
    if (j < 0) break
    let d = 1, k = j + 1
    while (d && k < s.length) { if (s[k] === '{') d++; else if (s[k] === '}') d--; k++ }
    out.push([s.slice(i, j).trim(), s.slice(j + 1, k - 1)])
    i = k
  }
  return out
}
// Keep only the rules (including inside @media) whose selector matches `keep`.
export function pickCss(css, keep) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const walk = (src) => parseRules(src).map(([sel, body]) => {
    if (sel.startsWith('@font-face') || sel.startsWith('@keyframes')) return `${sel}{${body}}`
    if (sel.startsWith('@media') || sel.startsWith('@supports')) {
      const inner = walk(body)
      return inner ? `${sel}{${inner}}` : ''
    }
    return sel.split(',').some((p) => keep.test(p.trim())) ? `${sel}{${body}}` : ''
  }).join('')
  return walk(css)
}

/* ---------- Images ---------- */
// Works with Sanity images (asset->url) and with local images from the current site.
export function imgUrl(fig, w, h) {
  const a = fig.asset || {}
  if (!a.url) return fig.src
  const dim = a.metadata?.dimensions || {}
  const p = new URLSearchParams()
  if (fig.crop && dim.width) {
    const c = fig.crop
    const L = Math.round(c.left * dim.width), T = Math.round(c.top * dim.height)
    const W = Math.round(dim.width * (1 - c.left - c.right)), H = Math.round(dim.height * (1 - c.top - c.bottom))
    if (L || T || W !== dim.width || H !== dim.height) p.set('rect', `${L},${T},${W},${H}`)
  }
  p.set('w', w)
  if (h) {
    p.set('h', h)
    p.set('fit', 'crop')
    if (fig.hotspot) { p.set('crop', 'focalpoint'); p.set('fp-x', fig.hotspot.x.toFixed(3)); p.set('fp-y', fig.hotspot.y.toFixed(3)) }
  } else p.set('fit', 'max')
  p.set('auto', 'format')
  p.set('q', '75')
  return `${a.url}?${p.toString().replace(/%2C/g, ',')}`
}

/**
 * <img> with srcset. `ratio` = width/height to crop to (omit to keep the original shape).
 * `w` is the display width used for the width/height attributes.
 */
export function img(fig, {sizes, w, ratio, widths = [400, 640, 800, 1200, 1600], eager = false, alt, cls = ''} = {}) {
  if (!fig) return ''
  const altText = esc(alt ?? fig.alt ?? '')
  const c = cls ? ` class="${cls}"` : ''
  const load = eager ? ' fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"'
  if (fig.local) {
    const m = STATIC_IMG[fig.local]
    const pick = m.src.find(([W]) => W >= w) || m.src[m.src.length - 1]
    const h = Math.round(w / (ratio || m.ratio || 1.6))
    return `<img${c} src="${pick[1]}" srcset="${m.srcset}" sizes="${sizes}" width="${w}" height="${h}" alt="${altText}"${load}>`
  }
  const dim = fig.asset?.metadata?.dimensions || {width: 1600, height: 1000}
  const r = ratio || dim.width / dim.height
  const ws = widths.filter((x) => x <= Math.max(dim.width, 400))
  const set = ws.map((W) => `${imgUrl(fig, W, ratio ? Math.round(W / r) : 0)} ${W}w`).join(', ')
  const best = ws.find((W) => W >= w) || ws[ws.length - 1]
  const lqip = fig.asset?.metadata?.lqip
  const style = lqip && !eager ? ` style="background:url(${lqip}) center/cover"` : ''
  return `<img${c} src="${esc(imgUrl(fig, best, ratio ? Math.round(best / r) : 0))}" srcset="${esc(set)}" sizes="${sizes}" width="${w}" height="${Math.round(w / r)}" alt="${altText}"${style}${load}>`
}
export function preloadImg(fig, {sizes, w, ratio, widths = [400, 640, 800, 1200, 1600]}) {
  if (!fig) return ''
  if (fig.local) {
    const m = STATIC_IMG[fig.local]
    return `<link rel="preload" as="image" href="${m.src[0][1]}" imagesrcset="${m.srcset}" imagesizes="${sizes}" fetchpriority="high">`
  }
  const dim = fig.asset?.metadata?.dimensions || {width: 1600, height: 1000}
  const r = ratio || dim.width / dim.height
  const ws = widths.filter((x) => x <= Math.max(dim.width, 400))
  const set = ws.map((W) => `${imgUrl(fig, W, ratio ? Math.round(W / r) : 0)} ${W}w`).join(', ')
  return `<link rel="preload" as="image" href="${esc(imgUrl(fig, ws[0], ratio ? Math.round(ws[0] / r) : 0))}" imagesrcset="${esc(set)}" imagesizes="${sizes}" fetchpriority="high">`
}
export const ogImage = (fig) => {
  if (!fig) return SITE + '/blog/img/discovery-1200.a3820a04.webp'
  if (fig.local) return SITE + (STATIC_IMG[fig.local].src.find(([W]) => W >= 1200) || STATIC_IMG[fig.local].src.at(-1))[1]
  return imgUrl(fig, 1200, 630).replace('auto=format', 'fm=jpg')
}

/* ---------- Portable Text (Sanity rich text) to HTML ---------- */
export function plainText(blocks = []) {
  return (blocks || []).filter((b) => b._type === 'block').map((b) => (b.children || []).map((c) => c.text).join('')).join('\n\n')
}
export function readingMinutes(blocks) {
  const words = plainText(blocks).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

function spans(block) {
  const defs = Object.fromEntries((block.markDefs || []).map((d) => [d._key, d]))
  return (block.children || []).map((ch) => {
    let t = esc(ch.text || '').replace(/\n/g, '<br>')
    for (const m of ch.marks || []) {
      if (m === 'strong') t = `<strong>${t}</strong>`
      else if (m === 'em') t = `<em>${t}</em>`
      else if (m === 'code') t = `<code>${t}</code>`
      else if (defs[m]?._type === 'link') {
        const href = defs[m].href || '#'
        const ext = /^https?:/.test(href) && !href.startsWith(SITE)
        const blank = defs[m].blank || ext
        t = `<a href="${esc(href)}"${blank ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`
      }
    }
    return t
  }).join('')
}

const TONE = {
  tip: ['Tip', '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/>'],
  note: ['Note', '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/>'],
  warning: ['Watch out', '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'],
}
export const svg = (d, size = 20, sw = 2) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`
export const ARROW = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.33 8h9.34M8 12.67 12.67 8 8 3.33" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/></svg>'

/**
 * Renders rich text. Returns {html, toc}. h2 headings get ids for the table of contents.
 * `ids` is shared across several bodies on one page so ids stay unique.
 */
export function portable(blocks = [], {ids = new Set(), sizes = '(max-width: 760px) calc(100vw - 32px), 680px'} = {}) {
  const out = [], toc = []
  const stack = [] // open lists, e.g. ['ul', 'ol']
  const closeLists = () => { while (stack.length) out.push(`</li></${stack.pop()}>`) }
  const listItem = (tag, lvl) => {
    while (stack.length > lvl) out.push(`</li></${stack.pop()}>`)
    if (stack.length === lvl) {
      if (stack[lvl - 1] === tag) { out.push('</li><li>'); return }
      out.push(`</li></${stack.pop()}>`)
    }
    while (stack.length < lvl) { out.push(`<${tag}>`); stack.push(tag) }
    out.push('<li>')
  }
  for (const b of blocks || []) {
    if (b._type === 'block' && b.listItem) {
      listItem(b.listItem === 'number' ? 'ol' : 'ul', b.level || 1)
      out.push(spans(b))
      continue
    }
    closeLists()
    if (b._type === 'block') {
      const st = b.style || 'normal'
      const inner = spans(b)
      if (!inner.trim()) continue
      if (st === 'h2' || st === 'h3') {
        let id = slugify(plainText([b])), n = 2
        while (ids.has(id)) id = `${slugify(plainText([b]))}-${n++}`
        ids.add(id)
        if (st === 'h2') toc.push({id, text: plainText([b])})
        out.push(`<${st} id="${id}">${inner}</${st}>`)
      } else if (st === 'h4') out.push(`<h4>${inner}</h4>`)
      else if (st === 'blockquote') out.push(`<blockquote><p>${inner}</p></blockquote>`)
      else out.push(`<p>${inner}</p>`)
    } else if (b._type === 'figure' || b._type === 'image') {
      out.push(`<figure class="fig">${img(b, {sizes, w: 680})}${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}</figure>`)
    } else if (b._type === 'dataTable') {
      const rows = (b.rows || []).map((r) => r.cells || [])
      if (rows.length) {
        const [head, ...rest] = rows
        out.push(`<div class="tbl" role="region" aria-label="${esc(b.caption || 'Table')}" tabindex="0"><table>${b.caption ? `<caption>${esc(b.caption)}</caption>` : ''}<thead><tr>${head.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${rest.map((r) => `<tr>${r.map((c, i) => i ? `<td data-label="${esc(head[i] || '')}">${esc(c)}</td>` : `<th scope="row">${esc(c)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`)
      }
    } else if (b._type === 'callout') {
      const [label, icon] = TONE[b.tone] || TONE.tip
      out.push(`<aside class="callout is-${esc(b.tone || 'tip')}"><span class="callout-ic">${svg(icon, 20)}</span><div><p class="callout-t">${esc(b.title || label)}</p><p>${esc(b.text).replace(/\n/g, '<br>')}</p></div></aside>`)
    } else if (b._type === 'codeBlock') {
      out.push(`<div class="code"><div class="code-bar"><span>${esc(b.language || 'code')}</span><button type="button" class="code-copy">Copy</button></div><pre><code>${esc(b.code)}</code></pre></div>`)
    } else if (b._type === 'ctaBox') {
      out.push(`<aside class="inline-cta"><p>${esc(b.text)}</p><a class="btn btn-primary btn-sm" href="${esc(b.url || '/contact/')}" data-track="cta_click" data-loc="article_inline">${esc(b.label || 'Start a Project')} ${ARROW}</a></aside>`)
    }
  }
  closeLists()
  return {html: out.join('\n'), toc}
}

export const write = (dist, rel, content) => {
  const f = path.join(dist, rel)
  fs.mkdirSync(path.dirname(f), {recursive: true})
  fs.writeFileSync(f, content)
  return content.length
}
