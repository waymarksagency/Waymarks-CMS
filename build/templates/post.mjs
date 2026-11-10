import {esc, img, preloadImg, svg, ARROW, SITE, niceDate, isoDay, ogImage, portable, SERVICE_NAMES} from '../lib.mjs'
import {page, crumbs, crumbsLd, finalCta} from './layout.mjs'
import {card, tagList, postUrl} from './blogIndex.mjs'

const COVER_SIZES = '(max-width: 1268px) calc(100vw - 48px), 1220px'
const CHEV = svg('<path d="m6 9 6 6 6-6"/>', 16, 2.4)
const CAL = svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', 15, 2)
const CLK = svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', 15, 2)
const UPD = svg('<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>', 15, 2)
const LINK = svg('<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>', 17, 2)
const LI = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg>'
const X = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4zm-1.2 17.9h1.9L7.1 4.2H5.1z"/></svg>'
const MAIL = svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', 17, 2)

const SERVICE_TEXT = {
  'brand-design': 'Logos, visual identity and brand guidelines that keep every touchpoint consistent.',
  'ui-ux-design': 'Research, user flows and interfaces that make products easy to understand and use.',
  'website-design': 'Fast, conversion-focused websites designed and built by one team.',
  'saas-product-design': 'Dashboards and complex workflows designed for real users and long-term growth.',
  'mvp-development': 'Plan, design and launch a focused first version to test your idea with real users.',
  'mobile-app-design': 'iOS and Android app design that feels clear, fast and easy to use.',
  'digital-growth': 'SEO, content and analytics that bring the right visitors and turn them into customers.',
  'project-management-services': 'Clear plans, regular updates and delivery that stays on time and on budget.',
}

function shareButtons(p, cls = 'share') {
  const u = encodeURIComponent(SITE + postUrl(p)), t = encodeURIComponent(p.title)
  return `<div class="${cls}" role="group" aria-label="Share this article">` +
    `<button type="button" data-share="native" aria-label="Copy link to this article">${LINK}</button>` +
    `<a href="https://www.linkedin.com/sharing/share-offsite/?url=${u}" target="_blank" rel="noopener" data-net="linkedin" aria-label="Share on LinkedIn">${LI}</a>` +
    `<a href="https://twitter.com/intent/tweet?url=${u}&amp;text=${t}" target="_blank" rel="noopener" data-net="x" aria-label="Share on X">${X}</a>` +
    `<a href="mailto:?subject=${t}&amp;body=${u}" data-net="email" aria-label="Share by email">${MAIL}</a></div>`
}

function nextCard(p, loc) {
  const s = p.relatedService
  if (!s || !SERVICE_NAMES[s]) return `<div class="next"><p class="k">Have a project in mind?</p><h2>Talk to our team</h2><p>Tell us what you are working on and we will reply within one working day.</p><a class="btn btn-primary btn-sm" href="/contact/" data-track="cta_click" data-loc="${loc}">Start a Project ${ARROW}</a></div>`
  return `<div class="next"><p class="k">Need help with this?</p><h2>${esc(SERVICE_NAMES[s])}</h2><p>${esc(SERVICE_TEXT[s])}</p>` +
    `<a class="btn btn-primary btn-sm" href="/contact/" data-track="cta_click" data-loc="${loc}">Start a Project ${ARROW}</a>` +
    `<a class="lnk" href="/services/${s}/" data-track="service_click" data-loc="${loc}">See how we do it ${ARROW}</a></div>`
}

export function postPage({post: p, related, css, js}) {
  const ids = new Set(['in-short', 'faq'])
  const {html, toc} = portable(p.body, {ids})
  const hasShort = p.keyTakeaways?.length
  const tocItems = [...(hasShort ? [{id: 'in-short', text: 'In short'}] : []), ...toc, ...(p.faq?.length ? [{id: 'faq', text: 'Questions and answers'}] : [])]
  // the rail tracks h2 headings inside .prose; the In short and FAQ blocks use h2 too
  const tocList = (withFill) => `<ol class="toc">${withFill ? '<span class="fill" aria-hidden="true"></span>' : ''}${tocItems.map((t, i) => `<li><a href="#${t.id}" data-i="${i}">${esc(t.text)}</a></li>`).join('')}</ol>`
  const updated = p.updatedAt && isoDay(p.updatedAt) !== isoDay(p.publishedAt)
  const a = p.author || {}
  const short = hasShort ? `<section class="short" aria-labelledby="in-short"><h2 id="in-short">In short</h2><ul>${p.keyTakeaways.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></section>` : ''
  const faq = p.faq?.length ? `<section class="a-faq" aria-labelledby="faq"><h2 id="faq">Questions and answers</h2><div class="acc">${p.faq.map((f, i) => `<div class="qa${i ? '' : ' is-open'}"><h3><button type="button" class="qa-btn" id="fq${i}" aria-expanded="${i ? 'false' : 'true'}" aria-controls="fa${i}">${esc(f.q)}${CHEV}</button></h3><div class="qa-a" id="fa${i}" role="region" aria-labelledby="fq${i}"${i ? ' inert' : ''}><div><p>${esc(f.a)}</p></div></div></div>`).join('')}</div></section>` : ''
  const path = postUrl(p)
  const trail = [['Home', '/'], ['Blog', '/blog/'], [p.title, path]]

  const body = `<div class="a-head"><div class="wrap">
${crumbs([['Home', '/'], ['Blog', '/blog/'], [p.categories[0]?.title || 'Article', path]])}
${tagList(p)}
<h1>${esc(p.title)}</h1>
<p class="p1">${esc(p.excerpt)}</p>
<div class="byline">
<div class="who">${a.image ? img(a.image, {alt: '', sizes: '48px', w: 48, ratio: 1, widths: [96, 144]}) : ''}<p><b>${esc(a.name || 'Waymarks Team')}</b><span>${esc(a.role || '')}</span></p></div>
<p class="facts"><span>${CAL}<time datetime="${isoDay(p.publishedAt)}">${niceDate(p.publishedAt)}</time></span>${updated ? `<span>${UPD}Updated <time datetime="${isoDay(p.updatedAt)}">${niceDate(p.updatedAt)}</time></span>` : ''}<span>${CLK}${p.minutes} min read</span></p>
${shareButtons(p)}
</div>
<figure class="a-cover">${img(p.mainImage, {sizes: COVER_SIZES, w: 1220, ratio: 2, widths: [640, 960, 1220, 1600, 2000], eager: true})}</figure>
</div></div>
<div class="wrap"><div class="a-grid">
<div class="rail"><nav aria-label="Contents"><p class="rail-t">Contents <span class="rail-pct" data-pct aria-hidden="true">0%</span></p>${tocList(true)}</nav>${nextCard(p, 'article_side')}</div>
<div class="a-main">
<nav class="mbar" aria-label="Contents"><button type="button" class="mbar-btn" aria-expanded="false"><span>In this article</span><small data-pct aria-hidden="true">0%</small>${CHEV}</button>${tocList(false)}<span class="mbar-line" aria-hidden="true"></span></nav>
<article class="prose">
${short}
${html}
${faq}
</article>
<div class="a-end">
<div class="useful"><p id="useful-q">Was this article useful?</p><div class="opts" role="group" aria-labelledby="useful-q"><button type="button" data-v="yes">Yes, it helped</button><button type="button" data-v="no">Not really</button></div><p class="thanks" aria-live="polite" hidden></p></div>
<div class="bio">${a.image ? img(a.image, {alt: '', sizes: '64px', w: 64, ratio: 1, widths: [128, 192]}) : ''}<div><b>Written by ${esc(a.name || 'Waymarks Team')}</b><span class="role">${esc(a.role || '')}</span>${a.bio ? `<p>${esc(a.bio)}</p>` : ''}${a.linkedin ? `<a href="${esc(a.linkedin)}" target="_blank" rel="noopener">Follow on LinkedIn ${ARROW}</a>` : ''}</div></div>
<div class="end-share"><p>Know someone who would find this useful?</p>${shareButtons(p)}</div>
<div class="next-inline">${nextCard(p, 'article_end')}</div>
</div>
</div>
</div></div>
${related.length ? `<section class="sec rel" aria-labelledby="rel-title"><div class="wrap">
<div class="rel-head"><h2 id="rel-title" class="h2">Keep <span class="grad">Reading</span></h2><a href="/blog/">All articles ${ARROW}</a></div>
<div class="agrid">${related.map((r) => card(r)).join('')}</div>
</div></section>` : ''}
${finalCta()}`

  const desc = p.seo?.description || p.excerpt
  const ld = [
    {'@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: desc, image: ogImage(p.mainImage),
      datePublished: p.publishedAt, dateModified: p.updatedAt || p.publishedAt, mainEntityOfPage: SITE + path, wordCount: p.words,
      articleSection: p.categories.map((c) => c.title), keywords: (p.seo?.focusKeyword ? [p.seo.focusKeyword, ...(p.seo.keywords || [])] : p.categories.map((c) => c.title)).join(', '),
      author: a.name === 'Waymarks Team' || !a.name ? {'@type': 'Organization', name: 'Waymarks', url: SITE + '/'} : {'@type': 'Person', name: a.name, jobTitle: a.role, sameAs: a.linkedin ? [a.linkedin] : undefined},
      publisher: {'@type': 'Organization', name: 'Waymarks', url: SITE + '/', logo: {'@type': 'ImageObject', url: SITE + '/images/waymarks-logo-207.90e48411.webp'}}},
    crumbsLd(trail),
  ]
  if (p.faq?.length) ld.push({'@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.map((f) => ({'@type': 'Question', name: f.q, acceptedAnswer: {'@type': 'Answer', text: f.a}}))})

  return page({
    title: p.seo?.title || [`${p.title} | Waymarks Blog`, `${p.title} | Waymarks`, p.title].find((x) => x.length <= 62) || p.title, desc, path, ogImage: ogImage(p.mainImage), ogType: 'article', ld, css, js, body,
    noindex: p.seo?.noindex,
    preload: preloadImg(p.mainImage, {sizes: COVER_SIZES, w: 1220, ratio: 2, widths: [640, 960, 1220, 1600, 2000]}),
    extraHead: `\n<meta property="article:published_time" content="${p.publishedAt}">${p.updatedAt ? `\n<meta property="article:modified_time" content="${p.updatedAt}">` : ''}`,
  }).replace('<body>', `<body data-slug="${esc(p.slug)}">`)
}
