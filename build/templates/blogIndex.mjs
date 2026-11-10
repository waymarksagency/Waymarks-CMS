import {esc, img, preloadImg, svg, ARROW, SITE, niceDate, isoDay, ogImage} from '../lib.mjs'
import {page, crumbsLd, finalCta} from './layout.mjs'

const URL = '/blog/'
const TITLE = 'Digital Design Blog: Branding, UX, Web & Growth | Waymarks'
const DESC = 'Practical ideas on branding, UI/UX, websites, digital products, AI and growth from the Waymarks team. No extra jargon, just useful ideas you can use.'
const HERO_SIZES = '(max-width: 1023px) min(420px, calc(100vw - 32px)), 528px'

// Icons for the topic keys used on the blog page; new topics get a generic tag icon.
const ICONS = {
  branding: '<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2a10 10 0 0 0 0 20c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7H17a5 5 0 0 0 5-5C22 6 17.5 2 12 2z"/>',
  uiux: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  websites: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  saas: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>',
  growth: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  ai: '<rect x="5" y="7" width="14" height="12" rx="3"/><path d="M12 3v4M9 12h.01M15 12h.01M9 16h6"/>',
}
const TAG_ICON = '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><path d="M7.5 7.5h.01"/>'
const FAQ = [
  ['What will I find on the Waymarks digital design blog?', 'You will find simple, practical articles on branding, UI/UX, websites, digital products, AI, SEO, and growth.'],
  ['Who writes the articles?', 'Our team writes them: the designers, developers, and strategists who do this work for clients every day.'],
  ['How often do you publish?', 'We publish new articles regularly. Join the newsletter to get each new article in your inbox.'],
  ['Can I suggest a topic?', 'Yes. Email hello@waymarks.agency with the question you would like us to answer, and we will consider it for a future article.'],
]
const CHEV = svg('<path d="m6 9 6 6 6-6"/>', 16, 2.4)
const CAL = svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', 14, 2)
const CLK = svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', 14, 2)

export const metaRow = (p) => `<p class="meta"><span>${CAL}<time datetime="${isoDay(p.publishedAt)}">${niceDate(p.publishedAt)}</time></span><span>${CLK}${p.minutes} min read</span></p>`
export const tagList = (p) => `<ul class="tags" aria-label="Topics">${p.categories.map((c) => `<li><a class="tag" href="/blog/#topic-${esc(c.slug)}" data-filter="${esc(c.slug)}">${esc(c.title)}</a></li>`).join('')}</ul>`
export const postUrl = (p) => `/blog/${p.slug}/`
const read = `<span class="read">Read Article ${ARROW}</span>`
const cover = (p) => `<a class="cover" href="${postUrl(p)}" aria-label="Read: ${esc(p.title)}"></a>`

// Card used in the "All articles" grid and in "Related articles" on post pages.
export const card = (p, {alt = ''} = {}) =>
  `<article class="acard" data-tags="${p.categories.map((c) => esc(c.slug)).join(' ')}" data-date="${isoDay(p.publishedAt)}" data-read="${p.minutes}"><div class="fimg">${img(p.mainImage, {alt, sizes: '(max-width: 700px) calc(100vw - 32px), (max-width: 1023px) 50vw, 400px', w: 400, ratio: 4 / 3, widths: [400, 640, 800]})}</div>` +
  `<div class="body">${tagList(p)}<h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p>${metaRow(p)}${read}</div>${cover(p)}</article>`

export function blogIndex({posts, categories, css, js}) {
  // Featured: the newest "main" post (or newest post) plus up to two "side" posts.
  const main = posts.find((p) => p.featured === 'main') || posts[0]
  let side = posts.filter((p) => p !== main && p.featured === 'side').slice(0, 2)
  for (const p of posts) { if (side.length >= 2) break; if (p !== main && !side.includes(p)) side.push(p) }

  const fb = main ? `<article class="fcard fbig"><div class="body">${tagList(main)}<h3>${esc(main.title)}</h3><p>${esc(main.excerpt)}</p>${metaRow(main)}${read}</div>` +
    `<div class="fimg">${img(main.mainImage, {sizes: '(max-width: 1023px) calc(100vw - 32px), 740px', w: 740, ratio: 1.6, widths: [480, 740, 1200, 1480]})}</div>${cover(main)}<span class="badge-new">Latest</span></article>` : ''
  const ft = side.map((p) => `<article class="fcard"><div class="fimg">${img(p.mainImage, {sizes: '(max-width: 700px) calc(100vw - 32px), 620px', w: 620, ratio: 1.6, widths: [400, 620, 960, 1240]})}</div>` +
    `<div class="body">${tagList(p)}<h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p>${metaRow(p)}${read}</div>${cover(p)}</article>`).join('')

  const counts = Object.fromEntries(categories.map((c) => [c.slug, posts.filter((p) => p.categories.some((x) => x.slug === c.slug)).length]))
  const chips = `<button type="button" data-topic="all" data-name="All" aria-pressed="true">All <small>${posts.length}</small></button>` +
    categories.map((c) => `<button type="button" data-topic="${esc(c.slug)}" data-name="${esc(c.title)}" aria-pressed="false">${esc(c.title)} <small>${counts[c.slug]}</small></button>`).join('')
  const topics = categories.map((c) => `<li class="topic"><div class="fimg">${img(c.image, {alt: '', sizes: '(max-width: 700px) calc(100vw - 32px), (max-width: 1023px) 50vw, 400px', w: 400, ratio: 4 / 3, widths: [400, 640, 800]})}</div>` +
    `<p class="lab">${svg(ICONS[c.slug] || TAG_ICON, 20, 2)}${esc(c.title)} Topic</p><h3>${esc(c.heading || c.title)}</h3><p>${esc(c.description || '')}</p>` +
    `<a class="read" href="#topic-${esc(c.slug)}" data-filter="${esc(c.slug)}">Explore ${esc(c.title)} articles <small>(${counts[c.slug]})</small> ${ARROW}</a></li>`).join('')
  const pop = categories.filter((c) => ['uiux', 'growth', 'ai'].includes(c.slug))
  const qa = FAQ.map(([q, a], i) => `<div class="qa${i ? '' : ' is-open'}"><h3><button type="button" class="qa-btn" id="q${i}" aria-expanded="${i ? 'false' : 'true'}" aria-controls="a${i}">${esc(q)}${CHEV}</button></h3><div class="qa-a" id="a${i}" role="region" aria-labelledby="q${i}"${i ? ' inert' : ''}><div><p>${esc(a)}</p></div></div></div>`).join('')
  const SEND = svg('<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>', 16, 2)

  const body = `<section class="hero b-hero" aria-labelledby="hero-title"><div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Blog</li></ol></nav>
<div class="hero-grid">
<div class="hero-art"><div class="tilt">${img({local: 'hero'}, {alt: 'Wooden blocks spelling BLOG next to a potted plant on a green background', sizes: HERO_SIZES, w: 528, eager: true})}</div></div>
<div class="hero-text">
<p class="eyebrow"><span class="ic">${svg('<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9h8M8 12h5"/>', 22, 1.8)}</span>Blog</p>
<h1 id="hero-title">Digital Design Blog: <span class="grad">Ideas, Insights, And Digital Thinking</span></h1>
<p class="p1">The digital world changes quickly. Our digital design blog shares practical ideas about branding, UX, websites, digital products, technology, AI, and growth.</p>
<p class="p2">No extra jargon. Just useful ideas you can use.</p>
<form class="srch" role="search" action="#articles"><label for="blog-q" class="sr">Search articles</label>
${svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', 18, 2.2)}
<input id="blog-q" type="search" name="q" placeholder="Search articles" autocomplete="off" enterkeyhint="search"><kbd aria-hidden="true">/</kbd></form>
<p class="hero-tags">Popular: ${pop.map((c) => `<a href="#topic-${c.slug}" data-filter="${c.slug}">${esc(c.title)}</a>`).join('')}</p>
</div></div></div></section>
<section class="sec" aria-labelledby="feat-title"><div class="wrap">
<h2 id="feat-title" class="h2 center">Top Picks <br><span class="grad">Featured Articles</span></h2>
<div class="feat">${fb}<div class="ftwo">${ft}</div></div>
</div></section>
<section class="sec" id="articles" aria-labelledby="all-title"><div class="wrap">
<h2 id="all-title" class="h2 center">All <span class="grad">Articles</span></h2>
<div class="bar"><div class="filt" role="group" aria-label="Filter by topic">${chips}</div>
<label class="sort" for="sort">Sort by <select id="sort"><option value="new">Newest first</option><option value="old">Oldest first</option><option value="read">Quickest read</option></select></label></div>
<p class="status" aria-live="polite"></p>
<div class="agrid">${posts.map((p) => card(p)).join('')}<div class="empty" hidden><h3>No articles match that yet</h3><p>Try a different word or topic, or suggest this topic to our team.</p><a class="btn btn-outline btn-sm" href="mailto:hello@waymarks.agency?subject=Blog%20topic%20idea">Suggest a topic</a></div></div>
<div class="more" hidden><button type="button" class="btn btn-outline btn-sm">Show more articles</button></div>
</div></section>
<section class="sec services" aria-labelledby="topic-title"><div class="wrap">
<h2 id="topic-title" class="h2 center">Explore Our Digital <br><span class="grad">Design Blog By Topic</span></h2>
<ul class="topics">${topics}</ul>
</div></section>
<section class="sec" aria-labelledby="nl-title"><div class="wrap"><div class="nl">
<h2 id="nl-title" class="h2">Get New Articles <br><span class="grad">In Your Inbox</span></h2>
<p class="p2">Join our list and get new articles from our digital design blog. No spam. Unsubscribe any time.</p>
<form novalidate><label for="nl-email" class="sr">Email address</label><input id="nl-email" type="email" name="email" placeholder="Enter your email address" autocomplete="email" inputmode="email" required>
<input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><button type="submit" class="btn btn-primary btn-sm">Subscribe ${SEND}</button></form>
<p class="nl-msg" aria-live="polite"></p>
</div></div></section>
<section class="sec faq" aria-labelledby="faq-title"><div class="wrap faq-grid">
<div><h2 id="faq-title" class="h2">Frequently Asked Questions</h2>
<p class="p1">Everything you need to know about our digital design blog.</p>
<a class="btn btn-primary btn-sm" href="/contact/" data-track="cta_click" data-loc="faq">Contact Support</a>
<div class="support"><span class="faces"><img src="/images/support-agent-1.c9efc594.webp" width="50" height="50" alt="" loading="lazy" decoding="async"><img src="/images/support-agent-2.55330188.webp" width="50" height="50" alt="" loading="lazy" decoding="async"></span><p><b>Active Support</b><span>24/7 Response Time</span></p></div></div>
<div class="acc">${qa}</div>
</div></section>
${finalCta()}`

  const ld = [
    {'@context': 'https://schema.org', '@type': 'Blog', name: 'Waymarks Digital Design Blog', url: SITE + URL, description: DESC,
      publisher: {'@type': 'Organization', name: 'Waymarks', url: SITE + '/'},
      blogPost: posts.map((p) => ({'@type': 'BlogPosting', headline: p.title, url: SITE + postUrl(p), datePublished: p.publishedAt, image: ogImage(p.mainImage), keywords: p.categories.map((c) => c.title).join(', ')}))},
    crumbsLd([['Home', '/'], ['Blog', URL]]),
    {'@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({'@type': 'Question', name: q, acceptedAnswer: {'@type': 'Answer', text: a}}))},
  ]
  return page({
    title: TITLE, desc: DESC, path: URL, ogImage: ogImage(main?.mainImage), ld, css, js, body,
    preload: preloadImg({local: 'hero'}, {sizes: HERO_SIZES, w: 528}),
  })
}
