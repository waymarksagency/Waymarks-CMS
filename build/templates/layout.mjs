import {esc, SITE} from '../lib.mjs'

/**
 * Full HTML page with the global Waymarks header and footer.
 * `ld` = array of JSON-LD objects, `preload` = extra <link> tags (hero image).
 */
export function page({title, desc, path, ogImage, ogType = 'website', ld = [], preload = '', css, js, body, noindex = false, extraHead = ''}) {
  const url = SITE + path
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta name="theme-color" content="#00051d">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon-96.png" type="image/png" sizes="96x96">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="alternate" type="application/rss+xml" title="Waymarks Blog" href="${SITE}/blog/feed.xml">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="Waymarks">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${esc(ogImage)}">
<meta name="twitter:card" content="summary_large_image">
${preload}
<link rel="preconnect" href="https://cdn.sanity.io" crossorigin>
<link rel="preload" as="font" type="font/woff" href="/contact/assets/fonts/inter-bold.woff" crossorigin>
<link rel="preload" as="font" type="font/woff" href="/contact/assets/fonts/inter-regular.woff" crossorigin>
<link rel="stylesheet" href="/assets/wm-header/header.css?v=3">
<link rel="stylesheet" href="/assets/wm-header/footer.css?v=3" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="/assets/wm-header/footer.css?v=3"></noscript>
<style>${css}</style>
${ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x).replace(/</g, '\\u003c')}</script>`).join('')}
<script>window.dataLayer=window.dataLayer||[];</script>${extraHead}
</head>
<body>
<header id="wm-header" class="wmh" data-fixed></header><script src="/assets/wm-header/header.js?v=3" defer></script>
<main id="main" style="padding-top:81px">
${body}
</main>
<footer id="wm-footer" class="wmf"></footer><script src="/assets/wm-header/footer.js?v=3" defer></script>
<script>${js}</script>
</body>
</html>
`
}

export const crumbs = (items) =>
  `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map(([name, href], i) => i === items.length - 1 ? `<li aria-current="page">${esc(name)}</li>` : `<li><a href="${href}">${esc(name)}</a></li>`).join('')}</ol></nav>`

export const crumbsLd = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, href], i) => ({'@type': 'ListItem', position: i + 1, name, item: SITE + href})),
})

const COPY = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>'
const ARROW = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.33 8h9.34M8 12.67 12.67 8 8 3.33" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/></svg>'

// The "Work With Our Global Team" block used at the end of blog pages.
export const finalCta = ({heading = 'Work With Our <br><span class="grad">Global Team</span>', text = "Ready to elevate your digital presence? Whether you need a brand refresh, a custom web app, or growth acceleration, we're here to help.", primary = 'Send Project Brief'} = {}) => `<section class="sec cta" aria-labelledby="cta-title"><div class="wrap">
<div class="cta-card">
<div class="kit kit-type" aria-hidden="true" style="left:7%;right:auto;top:16%;--r:-7deg"><b>Aa</b><span>Fresh<br>ideas</span></div>
<div class="kit kit-guide" aria-hidden="true" style="right:7%;left:auto;top:12%;bottom:auto;--r:6deg"><i></i><span>New article</span><em></em><em></em></div>
<div class="kit kit-toggle" aria-hidden="true" style="left:9%;top:auto;bottom:14%;--r:5deg"><span></span><b>Subscribed</b></div>
<div class="kit kit-grid" aria-hidden="true" style="right:9%;bottom:14%"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
<div class="cta-body center">
<h2 id="cta-title" class="h2">${heading}</h2>
<p class="p2">${text}</p>
<div class="actions"><a class="btn btn-primary btn-sm magnet" href="/contact/" data-track="cta_click" data-loc="final_cta"><span>${primary}</span> ${ARROW}</a><a class="btn btn-outline btn-sm" href="/contact/" data-track="cta_click" data-loc="book_call">Book a Call Directly</a></div>
<p class="cta-mail">Prefer email? <a href="mailto:hello@waymarks.agency">hello@waymarks.agency</a><button type="button" class="copy" data-copy="hello@waymarks.agency" aria-label="Copy email address">${COPY}<span>Copy</span></button></p>
</div></div>
</div></section>`
