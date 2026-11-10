#!/usr/bin/env node
// Builds the blog and case study pages as static HTML.
//   node build/build.mjs                       -> fetch from Sanity (needs SANITY_PROJECT_ID)
//   node build/build.mjs --fixture fixtures/sample.json   -> use sample data, no internet needed
// Output goes to ./dist (blog/, case-studies/, sitemap-content.xml), ready to upload to the site root.
import fs from 'node:fs'
import path from 'node:path'
import {ROOT, SITE, minCss, minJs, pickCss, plainText, readingMinutes, write, esc, ogImage} from './lib.mjs'
import {blogIndex, postUrl} from './templates/blogIndex.mjs'
import {postPage} from './templates/post.mjs'
import {casePage, caseIndex, caseUrl} from './templates/cases.mjs'

const args = process.argv.slice(2)
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined }
const DIST = path.resolve(flag('--out') || path.join(ROOT, '..', 'dist'))

const IMG = `{..., asset->{url, metadata{dimensions, lqip}}}`
const BODY = `[]{..., _type in ["figure", "image"] => ${IMG}}`
const QUERY = `{
  "posts": *[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc){
    _id, title, "slug": slug.current, oldSlugs, excerpt, publishedAt, updatedAt, featured, relatedService, keyTakeaways, faq, seo,
    mainImage${IMG},
    "categories": categories[]->{title, "slug": slug.current},
    author->{name, "slug": slug.current, role, bio, linkedin, image${IMG}},
    body${BODY}
  },
  "categories": *[_type == "category" && defined(slug.current)] | order(order asc, title asc){title, "slug": slug.current, heading, description, order, image${IMG}},
  "cases": *[_type == "caseStudy" && defined(slug.current) && publishedAt <= now()] | order(featured desc, publishedAt desc){
    _id, title, "slug": slug.current, client, industry, location, services, duration, year, summary, liveUrl, featured, publishedAt, seo, metrics,
    mainImage${IMG}, clientLogo${IMG},
    challenge${BODY}, approach${BODY}, solution${BODY}, results${BODY},
    gallery[]${IMG},
    testimonial{quote, name, role, photo${IMG}}
  }
}`

async function load() {
  const fx = flag('--fixture')
  if (fx) return JSON.parse(fs.readFileSync(fx, 'utf8'))
  const pid = process.env.SANITY_PROJECT_ID, ds = process.env.SANITY_DATASET || 'production'
  if (!pid) throw new Error('Set SANITY_PROJECT_ID (or use --fixture fixtures/sample.json).')
  // api (not apicdn) so a page built right after Publish always gets the newest content
  const url = `https://${pid}.api.sanity.io/v2025-02-19/data/query/${ds}?query=${encodeURIComponent(QUERY)}&perspective=published`
  const headers = process.env.SANITY_READ_TOKEN ? {Authorization: `Bearer ${process.env.SANITY_READ_TOKEN}`} : {}
  const res = await fetch(url, {headers})
  if (!res.ok) throw new Error(`Sanity answered ${res.status}: ${(await res.text()).slice(0, 300)}`)
  return (await res.json()).result
}

const data = await load()
const posts = (data.posts || []).filter((p) => p.slug && p.title && p.mainImage).map((p) => ({
  ...p, categories: (p.categories || []).filter(Boolean), minutes: readingMinutes(p.body), words: plainText(p.body).split(/\s+/).filter(Boolean).length,
}))
const categories = (data.categories || []).filter((c) => c.slug)
const cases = (data.cases || []).filter((c) => c.slug && c.title && c.mainImage)

/* styles and scripts, inlined into each page (no extra requests) */
const A = (f) => fs.readFileSync(path.join(ROOT, 'assets', f), 'utf8')
const blogCssRaw = A('blog.css')
const KEEP = /^(:root|\*|html|\[id\]|body|img|a\b|h1|ul|button|:focus|\.wrap|\.sec|\.cv-off|\.grad|\.h2|\.p1|\.p2|\.center|\.btn|\.actions|\.crumbs|\.tags|\.tag\b|\.meta|\.acard|\.agrid|\.fimg|\.body|\.cover|\.read|\.qa|\.acc|\.faq|\.cta|\.kit|\.copy|\.magnet|\.badge-new)/
const css = {
  blog: minCss(blogCssRaw),
  article: minCss(pickCss(blogCssRaw, KEEP) + A('article.css')),
}
css.case = css.article + minCss(A('case.css'))
const js = {blog: minJs(A('blog.js')), article: minJs(A('article.js'))}
js.case = js.article + '\n' + minJs(A('case.js'))

/* related posts: most shared topics first, then newest */
function relatedFor(p) {
  const mine = new Set(p.categories.map((c) => c.slug))
  return posts.filter((o) => o !== p)
    .map((o) => ({o, s: o.categories.filter((c) => mine.has(c.slug)).length}))
    .sort((a, b) => b.s - a.s || new Date(b.o.publishedAt) - new Date(a.o.publishedAt))
    .slice(0, 3).map((x) => x.o)
}

fs.rmSync(DIST, {recursive: true, force: true})
let bytes = 0, pages = 0
const out = (rel, html) => { bytes += write(DIST, rel, html); pages++ }

out('blog/index.html', blogIndex({posts, categories, css: css.blog, js: js.blog}))
for (const p of posts) out(`blog/${p.slug}/index.html`, postPage({post: p, related: relatedFor(p), css: css.article, js: js.article}))
out('case-studies/index.html', caseIndex({cases, css: css.case, js: js.case}))
cases.forEach((c, i) => out(`case-studies/${c.slug}/index.html`, casePage({cs: c, next: cases.length > 1 ? cases[(i + 1) % cases.length] : null, css: css.case, js: js.case})))

/* forwarding pages for previous addresses */
const redirect = (to, title) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved: ${esc(title)} | Waymarks</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${SITE}${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)} + location.hash)</script>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#00051d;color:#e2e8f0;font:16px/1.5 system-ui,sans-serif}a{color:#bdd631}</style>
</head>
<body><p>This article has moved to <a href="${to}">${esc(title)}</a>.</p></body>
</html>
`
const live = new Set(posts.map((p) => p.slug))
let moved = 0
for (const p of posts) for (const old of p.oldSlugs || []) {
  const s = String(old).trim().replace(/^\/?(blog\/)?|\/$/g, '')
  if (!s || live.has(s) || !/^[a-z0-9-]+$/.test(s)) continue
  bytes += write(DIST, `blog/${s}/index.html`, redirect(postUrl(p), p.title)); moved++
}

/* RSS feed */
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>Waymarks Blog</title><link>${SITE}/blog/</link><description>Practical ideas on branding, UI/UX, websites, digital products, AI and growth.</description><language>en</language>
<atom:link href="${SITE}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${posts.slice(0, 30).map((p) => `<item><title>${esc(p.title)}</title><link>${SITE}${postUrl(p)}</link><guid>${SITE}${postUrl(p)}</guid><pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate><description>${esc(p.excerpt)}</description>${p.categories.map((c) => `<category>${esc(c.title)}</category>`).join('')}<enclosure url="${esc(ogImage(p.mainImage))}" type="image/jpeg" length="0"/></item>`).join('\n')}
</channel></rss>
`
bytes += write(DIST, 'blog/feed.xml', rss)

/* sitemap for the generated pages (add it to robots.txt or Search Console once) */
const urls = [
  [`${SITE}/blog/`, posts[0]?.updatedAt || posts[0]?.publishedAt],
  ...posts.filter((p) => !p.seo?.noindex).map((p) => [SITE + postUrl(p), p.updatedAt || p.publishedAt]),
  ...(cases.some((c) => !c.seo?.noindex) ? [[`${SITE}/case-studies/`, cases[0]?.publishedAt]] : []),
  ...cases.filter((c) => !c.seo?.noindex).map((c) => [SITE + caseUrl(c), c.publishedAt]),
]
bytes += write(DIST, 'sitemap-content.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, d]) => `<url><loc>${u}</loc>${d ? `<lastmod>${new Date(d).toISOString().slice(0, 10)}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`)

console.log(`Built ${pages} pages (${posts.length} posts, ${cases.length} case studies, ${moved} forwarding pages) into ${path.relative(process.cwd(), DIST) || DIST}, ${(bytes / 1024).toFixed(0)} KB total.`)
console.log(`CSS per page: blog ${(css.blog.length / 1024).toFixed(1)} KB, article ${(css.article.length / 1024).toFixed(1)} KB, case ${(css.case.length / 1024).toFixed(1)} KB.`)
