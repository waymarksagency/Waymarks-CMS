import {esc, img, preloadImg, svg, ARROW, SITE, ogImage, portable, SERVICE_NAMES, STATIC_IMG} from '../lib.mjs'
import {page, crumbs, crumbsLd, finalCta} from './layout.mjs'

const COVER_SIZES = '(max-width: 1268px) calc(100vw - 48px), 1220px'
export const caseUrl = (c) => `/case-studies/${c.slug}/`
const LINK = svg('<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>', 17, 2)
const BRIEF = svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>', 16, 2)
const fullUrl = (g) => g.local ? STATIC_IMG[g.local].src.at(-1)[1] : `${g.asset.url}?w=1800&fit=max&auto=format&q=80`
// Keep Google titles near 60 characters: use the long form only when it fits.
const fitTitle = (long, short) => (long + ' | Waymarks').length <= 62 ? long + ' | Waymarks' : short
const indKey = (s = '') => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function casePage({cs: c, next, css, js}) {
  const ids = new Set()
  const SECTIONS = [['challenge', 'The challenge'], ['approach', 'Our approach'], ['solution', 'The solution'], ['results', 'The results']]
  const tocItems = [], parts = []
  for (const [key, label] of SECTIONS) {
    const blocks = c[key]
    if (!blocks?.length && !(key === 'solution' && c.gallery?.length)) continue
    ids.add(key)
    const r = portable(blocks || [], {ids})
    tocItems.push({id: key, text: label}, ...r.toc)
    let extra = ''
    if (key === 'solution' && c.gallery?.length) {
      extra = `<ul class="gal">${c.gallery.map((g) => `<li><figure><button type="button" data-full="${esc(fullUrl(g))}" data-cap="${esc(g.caption || '')}" aria-label="Open image: ${esc(g.alt || '')}">${img(g, {sizes: '(max-width: 700px) calc(100vw - 32px), 352px', w: 352, ratio: 1.6, widths: [400, 640, 800]})}</button>${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ''}</figure></li>`).join('')}</ul>`
    }
    parts.push(`<h2 id="${key}">${label}</h2>\n${r.html}${extra}`)
  }
  const t = c.testimonial
  const quote = t?.quote ? `<figure class="quote"><blockquote><p>${esc(t.quote)}</p></blockquote><figcaption>${t.photo ? img(t.photo, {alt: '', sizes: '48px', w: 48, ratio: 1, widths: [96, 144]}) : ''}<p><b>${esc(t.name || '')}</b><span>${esc(t.role || '')}</span></p></figcaption></figure>` : ''
  const tocList = (withFill) => `<ol class="toc">${withFill ? '<span class="fill" aria-hidden="true"></span>' : ''}${tocItems.map((x, i) => `<li><a href="#${x.id}" data-i="${i}">${esc(x.text)}</a></li>`).join('')}</ol>`
  const svcs = (c.services || []).filter((s) => SERVICE_NAMES[s])
  const metrics = (c.metrics || []).filter((m) => m.value)
  const path = caseUrl(c)
  const SVC_SIDE = svcs[0]

  const body = `<div class="a-head"><div class="wrap">
${crumbs([['Home', '/'], ['Case Studies', '/case-studies/'], [c.client, path]])}
<p class="c-ind">${BRIEF}${esc(c.industry)}</p>
<h1>${esc(c.title)}</h1>
<p class="p1">${esc(c.summary)}</p>
<dl class="cfacts">
<div><dt>Client</dt><dd>${esc(c.client)}${c.location ? `<br><span style="font-weight:400;color:var(--text-2);font-size:14px">${esc(c.location)}</span>` : ''}</dd></div>
<div><dt>Industry</dt><dd>${esc(c.industry)}</dd></div>
<div><dt>Services</dt><dd class="svcs">${svcs.map((s) => `<a href="/services/${s}/">${esc(SERVICE_NAMES[s])}</a>`).join('')}</dd></div>
<div><dt>Timeline</dt><dd>${esc([c.duration, c.year].filter(Boolean).join(', ') || 'Ongoing')}${c.liveUrl ? `<br><a href="${esc(c.liveUrl)}" target="_blank" rel="noopener" style="font-weight:500;font-size:14px">Visit live project</a>` : ''}</dd></div>
</dl>
<figure class="a-cover">${img(c.mainImage, {sizes: COVER_SIZES, w: 1220, ratio: 2, widths: [640, 960, 1220, 1600, 2000], eager: true})}</figure>
${metrics.length ? `<section class="results" aria-labelledby="res-title"><h2 id="res-title" class="sr">Results in numbers</h2><ul class="res" style="--n:${metrics.length}">${metrics.map((m) => `<li><b>${esc(m.value)}</b><span>${esc(m.label)}</span></li>`).join('')}</ul></section>` : ''}
</div></div>
<div class="wrap"><div class="a-grid">
<div class="rail"><nav aria-label="Contents"><p class="rail-t">Project story <span class="rail-pct" data-pct aria-hidden="true">0%</span></p>${tocList(true)}</nav>${sideCard(SVC_SIDE, 'case_side')}</div>
<div class="a-main">
<nav class="mbar" aria-label="Contents"><button type="button" class="mbar-btn" aria-expanded="false"><span>Project story</span><small data-pct aria-hidden="true">0%</small>${svg('<path d="m6 9 6 6 6-6"/>', 16, 2.4)}</button>${tocList(false)}<span class="mbar-line" aria-hidden="true"></span></nav>
<article class="prose">
${parts.join('\n')}
${quote}
</article>
<div class="a-end">
${next ? `<article class="nextcase"><div><p class="k">Next case study</p><h3>${esc(next.title)}</h3><p>${esc(next.client)}, ${esc(next.industry)}</p><span class="read">Read case study ${ARROW}</span></div><div class="fimg">${img(next.mainImage, {alt: '', sizes: '(max-width: 1023px) calc(100vw - 32px), 360px', w: 360, ratio: 1.6, widths: [400, 640, 800]})}</div><a class="cover" href="${caseUrl(next)}" aria-label="Next case study: ${esc(next.title)}"></a></article>` : ''}
<div class="next-inline">${sideCard(SVC_SIDE, 'case_end')}</div>
</div>
</div>
</div></div>
${finalCta({heading: 'Want Results <br><span class="grad">Like These?</span>', text: 'Tell us about your project. We will reply within one working day with next steps and a rough timeline.', primary: 'Start a Project'})}
<dialog class="lbx" aria-label="Project images"><img src="data:," alt="" width="1600" height="1000"><div class="lbx-bar"><p class="lbx-cap"></p><div><button type="button" class="lbx-prev" aria-label="Previous image">${svg('<path d="m15 18-6-6 6-6"/>', 18, 2.2)}</button><button type="button" class="lbx-next" aria-label="Next image">${svg('<path d="m9 18 6-6-6-6"/>', 18, 2.2)}</button><button type="button" class="lbx-close" aria-label="Close">${svg('<path d="M18 6 6 18M6 6l12 12"/>', 18, 2.2)}</button></div></div></dialog>`

  const desc = c.seo?.description || c.summary
  const ld = [
    {'@context': 'https://schema.org', '@type': 'Article', headline: c.title, description: desc, image: ogImage(c.mainImage), datePublished: c.publishedAt,
      mainEntityOfPage: SITE + path, about: svcs.map((s) => ({'@type': 'Service', name: SERVICE_NAMES[s], url: `${SITE}/services/${s}/`})),
      author: {'@type': 'Organization', name: 'Waymarks', url: SITE + '/'}, publisher: {'@type': 'Organization', name: 'Waymarks', url: SITE + '/'}},
    crumbsLd([['Home', '/'], ['Case Studies', '/case-studies/'], [c.client, path]]),
  ]
  return page({
    title: c.seo?.title || fitTitle(`${c.client} Case Study: ${c.title}`, `${c.client} Case Study | Waymarks`), desc, path, ogImage: ogImage(c.mainImage), ogType: 'article', ld, css, js, body,
    noindex: c.seo?.noindex,
    preload: preloadImg(c.mainImage, {sizes: COVER_SIZES, w: 1220, ratio: 2, widths: [640, 960, 1220, 1600, 2000]}),
  }).replace('<body>', `<body data-slug="case-${esc(c.slug)}">`)
}

function sideCard(s, loc) {
  return `<div class="next"><p class="k">Planning something similar?</p><h2>${s ? esc(SERVICE_NAMES[s]) : 'Talk to our team'}</h2><p>Tell us what you are working on. We reply within one working day.</p>` +
    `<a class="btn btn-primary btn-sm" href="/contact/" data-track="cta_click" data-loc="${loc}">Start a Project ${ARROW}</a>` +
    (s ? `<a class="lnk" href="/services/${s}/" data-track="service_click" data-loc="${loc}">About this service ${ARROW}</a>` : '') + '</div>'
}

export function caseIndex({cases, css, js}) {
  const inds = [...new Map(cases.map((c) => [indKey(c.industry), c.industry])).entries()]
  const chips = inds.length > 1 ? `<div class="ci-bar" role="group" aria-label="Filter by industry"><button type="button" data-ind="all" data-name="All" aria-pressed="true">All <small>${cases.length}</small></button>${inds.map(([k, n]) => `<button type="button" data-ind="${k}" data-name="${esc(n)}" aria-pressed="false">${esc(n)} <small>${cases.filter((c) => indKey(c.industry) === k).length}</small></button>`).join('')}</div><p class="ci-status sr" aria-live="polite"></p>` : ''
  const cards = cases.map((c, i) => {
    const m = (c.metrics || []).find((x) => x.value)
    return `<article class="ccard" data-ind="${indKey(c.industry)}"><div class="fimg">${img(c.mainImage, {alt: '', sizes: '(max-width: 700px) calc(100vw - 32px), 594px', w: 594, ratio: 1.6, widths: [400, 640, 900, 1200], eager: i === 0})}</div>` +
      `<div class="body"><p class="ck">${esc(c.client)}, ${esc(c.industry)}</p><h3>${esc(c.title)}</h3><p>${esc(c.summary)}</p>${m ? `<p class="stat"><b>${esc(m.value)}</b><span>${esc(m.label)}</span></p>` : ''}<span class="read">Read case study ${ARROW}</span></div>` +
      `<a class="cover" href="${caseUrl(c)}" aria-label="Read case study: ${esc(c.title)}"></a></article>`
  }).join('')
  const empty = `<div class="ci-empty"><h2>Case studies are on the way</h2><p>We are writing up recent projects now. In the meantime, ask us for examples that match your industry.</p><a class="btn btn-primary btn-sm" href="/contact/" data-track="cta_click" data-loc="case_empty">Ask for examples ${ARROW}</a></div>`
  const TITLE = 'Case Studies: Branding, UX, Web & Product Projects | Waymarks'
  const DESC = 'See how Waymarks helps companies with brand design, UI/UX, websites, SaaS products and growth: the problem, our approach and the results.'
  const body = `<section class="ci-hero" aria-labelledby="ci-title"><div class="wrap">
${crumbs([['Home', '/'], ['Case Studies', '/case-studies/']])}
<h1 id="ci-title">Case Studies: <span class="grad">Real Projects, Real Results</span></h1>
<p class="p1">How we help companies solve real problems with brand, design, development and growth. Each story covers the challenge, what we did and what changed.</p>
${chips}
</div></section>
<section class="sec" aria-labelledby="cs-list" style="padding-top:0;border-top:0"><div class="wrap"><h2 id="cs-list" class="sr">All case studies</h2>
${cases.length ? `<div class="cgrid">${cards}</div>` : empty}
</div></section>
${finalCta({heading: 'Your Project Could Be <br><span class="grad">Our Next Story</span>', text: 'Tell us what you are building. We will reply within one working day with next steps and a rough timeline.', primary: 'Start a Project'})}`
  const ld = [
    {'@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Waymarks Case Studies', url: SITE + '/case-studies/', description: DESC,
      hasPart: cases.map((c) => ({'@type': 'Article', headline: c.title, url: SITE + caseUrl(c)}))},
    crumbsLd([['Home', '/'], ['Case Studies', '/case-studies/']]),
  ]
  return page({title: TITLE, desc: DESC, path: '/case-studies/', ogImage: ogImage(cases[0]?.mainImage), ld, css, js, body, noindex: !cases.some((c) => !c.seo?.noindex)})
}
