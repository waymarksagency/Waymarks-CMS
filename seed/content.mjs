// Starter content: the 9 articles on the current blog, 6 topics and 1 author.
// Run `node seed/content.mjs` to write:
//   fixtures/sample.json  - same shape the Sanity query returns (for testing the build offline)
//   seed/seed.ndjson      - import file for Sanity (`npm run seed` in /studio)
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {ARTICLES} from './articles.mjs'
import {ARTICLES2} from './articles2.mjs'
import {EXTENSIONS} from './extensions.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(HERE, '..')
const LIVE = 'https://waymarks.agency'
const IMG = JSON.parse(fs.readFileSync(path.join(ROOT, 'build/static-images.json'), 'utf8'))
const biggest = (k) => LIVE + IMG[k].src[IMG[k].src.length - 1][1]

let n = 0
const key = () => 'k' + (++n).toString(36).padStart(5, '0')

/* Tiny text format -> Sanity rich text.
   ## Heading   ### Subheading   - bullet   1. numbered   > quote
   !tip Title | text     !note ... | ...     !warning ... | ...
   !cta Text | Button label | /link/
   Inline: **bold**, *italic*, `code`, [text](url) */
function inline(text) {
  const children = [], markDefs = []
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g
  let last = 0, m
  const push = (t, marks = []) => t && children.push({_type: 'span', _key: key(), text: t, marks})
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index))
    if (m[1]) push(m[1], ['strong'])
    else if (m[2]) push(m[2], ['em'])
    else if (m[3]) push(m[3], ['code'])
    else { const k = key(); markDefs.push({_type: 'link', _key: k, href: m[5]}); push(m[4], [k]) }
    last = re.lastIndex
  }
  push(text.slice(last))
  return {children, markDefs}
}
function rich(src) {
  const out = []
  for (const raw of src.trim().split('\n')) {
    const line = raw.trim()
    if (!line) continue
    let m
    if (line.startsWith('|')) {
      const cells = line.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim())
      const last = out[out.length - 1]
      if (last && last._type === 'dataTable' && last.open) last.rows.push({_type: 'row', _key: key(), cells})
      else out.push({_type: 'dataTable', _key: key(), open: true, rows: [{_type: 'row', _key: key(), cells}]})
      continue
    }
    if (out.length && out[out.length - 1].open) delete out[out.length - 1].open
    if ((m = line.match(/^!(tip|note|warning)\s+(.*?)\s*\|\s*(.*)$/))) out.push({_type: 'callout', _key: key(), tone: m[1], title: m[2], text: m[3]})
    else if ((m = line.match(/^!cta\s+(.*?)\s*\|\s*(.*?)\s*\|\s*(.*)$/))) out.push({_type: 'ctaBox', _key: key(), text: m[1], label: m[2], url: m[3]})
    else {
      let style = 'normal', listItem, t = line
      if ((m = line.match(/^(#{2,4})\s+(.*)$/))) { style = 'h' + m[1].length; t = m[2] }
      else if ((m = line.match(/^>\s+(.*)$/))) { style = 'blockquote'; t = m[1] }
      else if ((m = line.match(/^-\s+(.*)$/))) { listItem = 'bullet'; t = m[1] }
      else if ((m = line.match(/^\d+\.\s+(.*)$/))) { listItem = 'number'; t = m[1] }
      const b = {_type: 'block', _key: key(), style, ...inline(t)}
      if (listItem) Object.assign(b, {listItem, level: 1})
      out.push(b)
    }
  }
  out.forEach((b) => delete b.open)
  return out
}

const TOPICS = [
  ['branding', 'Branding', 'Branding Strategy', 'Identity, positioning, visual systems, brand consistency, and creative strategy for modern companies.', 't-branding'],
  ['uiux', 'UI/UX', 'UI & UX Design', 'User research, interfaces, usability, design systems, and seamless product experiences.', 't-uiux'],
  ['websites', 'Websites', 'Web Development', 'Web strategy, UX, conversion optimization, high-performance development, and content structure.', 't-websites'],
  ['saas', 'SaaS & Products', 'Digital Products', 'Dashboards, complex workflows, product strategy, fast MVPs, and scalable product design.', 't-saas'],
  ['growth', 'Growth', 'Growth & Marketing', 'SEO, content marketing, social media strategy, analytics, customer acquisition, and marketing systems.', 't-growth'],
  ['ai', 'AI & Tech', 'AI & Technology', 'AI tools, workflow automation, emerging tech stack ideas, and practical digital implementation.', 't-ai'],
]

const AUTHOR = {
  key: 'waymarks-team', name: 'Waymarks Team', role: 'Design, development and growth studio',
  bio: 'Brand designers, UI/UX designers, developers and growth specialists working as one team. We write about what we learn on real client projects.',
  linkedin: 'https://www.linkedin.com/company/waymarks_agency', img: 'logo3d', alt: 'Waymarks logo',
}

const DISCOVERY = `
Most projects that go over budget do not fail at the design stage. They fail earlier, when the team starts designing before anyone agrees on the problem. Discovery is the short phase that fixes that. It turns assumptions into facts before you spend money building on them.

## What discovery actually is
Discovery is a focused research and planning phase at the start of a project. It usually takes one to three weeks. By the end, everyone on the team can answer three questions the same way: who is this for, what problem are we solving, and how will we know it worked.

It is not a long report that nobody reads. Good discovery produces a few clear decisions that shape every screen, page and feature that follows.

## Why skipping it costs more
When a team skips discovery, the questions do not go away. They come back later, when changes are far more expensive.
- A feature gets built, then cut because users never asked for it.
- The design is approved, then reworked because a stakeholder had a requirement nobody heard.
- The site launches, then underperforms because the content speaks to the wrong audience.
!note A simple rule | A change that takes an hour to make in a discovery workshop can take days to make once it is designed, and weeks once it is built.

## What we do during discovery
Every project is different, but most discovery phases include the same core steps.
### 1. Stakeholder interviews
We talk to the people who own the project: founders, marketing leads, product owners and sometimes sales or support. We ask what success looks like, what has been tried before and what worries them.
### 2. User research
We talk to real or likely users. Five to eight short interviews are often enough to spot the patterns that matter. We look for the words people use, the tasks they are trying to finish and where they get stuck today.
### 3. Competitor and market review
We look at how others solve the same problem. The goal is not to copy them. It is to find what users already expect and where there is room to stand out.
### 4. Content and technical audit
For an existing website or product, we check what is already there: pages, analytics, performance, integrations and content that can be reused.
### 5. Priorities and scope
We turn everything we learned into a ranked list of what to build first. This is where a project gets its shape and where budgets become realistic.

## What you get at the end
A useful discovery phase ends with a small set of clear outputs, not a pile of documents.
- **A problem statement** that the whole team agrees on.
- **User profiles** based on real conversations, not guesses.
- **A sitemap or user flow** that shows how people will move through the product.
- **A prioritised feature list** split into must-haves and later ideas.
- **A realistic timeline and budget** for the next phase.
!tip Keep it visible | Print the problem statement and pin it where the team works. When a debate starts about a new feature, check it against that one sentence.

## How long it should take
For a marketing website, one to two weeks is usually enough. For a new SaaS product or app, plan for two to four weeks. If discovery keeps getting longer, that is often a sign the project needs a smaller first version, not more research.

## Signs your project needs discovery
> If the team cannot explain the project in two sentences, it is not ready to be designed.
You probably need a discovery phase if any of these sound familiar:
- Different people describe the goal of the project in different ways.
- You are not sure which features matter most to users.
- You are entering a new market or launching a new product.
- A previous version did not perform the way you hoped.

## Start with the right questions
Discovery is the cheapest phase of any project and the one that protects the rest of the budget. It gives designers and developers a clear target and gives you confidence that the money you spend next is going in the right direction.
!cta Planning a new website or product? We can run a focused discovery phase with your team. | Start a Project | /contact/
`

const short = (intro, h1, p1, list, h2, p2) => `
${intro}
## ${h1}
${p1}
${list.map((x) => '- ' + x).join('\n')}
## ${h2}
${p2}
`

const POSTS = [
  {slug: 'why-start-with-discovery', title: 'Why Every Project Should Start With Discovery', excerpt: 'Before you design anything, understand the problem. Discovery uncovers key requirements, user motivations, and business goals to prevent costly redesigns later.', img: 'discovery', alt: 'Person at a desk studying user research and goals on a large screen', topics: ['uiux', 'saas'], date: '2026-10-28', featured: 'main', service: 'ui-ux-design', body: DISCOVERY,
    takeaways: ['Discovery is a short research phase, usually one to three weeks.', 'It aligns the team on who the project is for and what problem it solves.', 'Changes are cheapest before design starts and most expensive after launch.', 'The output is a few clear decisions, not a long report.'],
    faq: [['How much does a discovery phase cost?', 'It is usually a small share of the total project budget, often 5 to 10 percent. It tends to save more than it costs by preventing rework later.'], ['Can we skip discovery for a small website?', 'You can shorten it, but not skip it. Even a two-day workshop to agree on goals, audience and content will make the design phase faster.'], ['Who should take part?', 'The project owner, one or two people who know your customers well, and the design and development leads. Keep the group small so decisions are quick.']]},
  {slug: 'design-systems-developers-use', title: 'Design Systems Developers Actually Use', excerpt: 'A design system should make life easier for designers and developers. Learn how to bridge the gap between Figma and code effortlessly.', img: 'design-systems', alt: 'Design system components flowing from design files to code on laptops', topics: ['uiux', 'websites'], date: '2026-10-21', featured: 'side', service: 'ui-ux-design',
    body: short('Many design systems look great in Figma and are ignored in code. The fix is to build them with developers, not for them.', 'Start from the code that exists', 'Audit the components your developers already use. Name things the way the code names them, and design the system around real, repeated patterns.', ['Use the same names for tokens in Figma and in code.', 'Document when to use a component, not just how it looks.', 'Ship a few solid components before adding more.'], 'Keep it alive', 'Give one designer and one developer shared ownership. Review changes together, and remove components nobody uses.')},
  {slug: 'ux-problems-we-look-for-first', title: '5 UX Problems We Look For First', excerpt: 'Small usability problems can cause big customer frustration. Here are the 5 critical conversion killers we audit immediately.', img: 'ux-problems', alt: 'Five numbered UX problems around a website on a laptop', topics: ['uiux', 'growth'], date: '2026-10-14', featured: 'side', service: 'ui-ux-design',
    body: short('When we audit a website or app, a few problems show up again and again. They are usually quick to fix and have a big effect on conversions.', 'The five problems', 'These are the first things we check:', ['Unclear main action: visitors cannot tell what to do next.', 'Slow pages, especially on mobile data.', 'Forms that ask for too much, too early.', 'Navigation labels that use internal jargon.', 'Low contrast text that is hard to read.'], 'Fix the cheapest ones first', 'Contrast, labels and form fields can often be fixed in a day. Measure before and after, so you know which change made the difference.')},
  {slug: 'brand-positioning-statement', title: 'How To Write A Brand Positioning Statement', excerpt: 'A clear positioning statement keeps your brand consistent. Use this simple structure to say who you serve and why you are different.', img: 't-branding', alt: 'Branding moodboard with colour swatches and type samples', topics: ['branding'], date: '2026-10-07', service: 'brand-design',
    body: short('A positioning statement is an internal sentence that explains who you serve and why you are the better choice. It guides every brand decision that follows.', 'A simple structure', 'Fill in this sentence: For [audience] who [need], [brand] is the [category] that [main benefit] because [reason to believe].', ['Pick one audience, not everyone.', 'Name a real need in their words.', 'Give one proof point you can back up.'], 'Test it', 'Read it to a customer. If they nod, keep it. If they look confused, simplify it.')},
  {slug: 'usability-testing-small-budget', title: 'Usability Testing On A Small Budget', excerpt: 'You do not need a lab to learn from real users. Five short sessions can reveal most of the problems that cost you customers.', img: 't-uiux', alt: 'Person testing an app prototype on a phone', topics: ['uiux'], date: '2026-09-30', service: 'ui-ux-design',
    body: short('Usability testing sounds expensive, but the basic version costs very little. A video call and a clickable prototype are enough.', 'How to run a session', 'Give people a real task, then stay quiet and watch.', ['Recruit five people who match your users.', 'Ask them to think out loud.', 'Write down where they hesitate, not just where they fail.'], 'Turn notes into fixes', 'Group the problems you saw, rank them by how often they happened, and fix the top three before testing again.')},
  {slug: 'what-makes-a-website-fast', title: 'What Makes A Website Load Fast', excerpt: 'Images, fonts, and scripts decide how quickly a page appears. Here is what we check first when a site feels slow.', img: 't-websites', alt: 'Website speed dashboard on a laptop screen', topics: ['websites', 'growth'], date: '2026-09-23', service: 'website-design',
    body: short('Speed affects rankings, conversions and how people feel about your brand. Most slow sites have the same few causes.', 'What we check first', 'Run the page through Google PageSpeed Insights, then look at:', ['Images: use WebP or AVIF, and the right size for each screen.', 'Fonts: load only the weights you use, and preload the main one.', 'Scripts: remove unused tracking and chat tools, and load the rest later.'], 'Keep it fast', 'Set a performance budget and check it on every release, so speed does not slowly slip away.')},
  {slug: 'plan-an-mvp-without-overbuilding', title: 'Planning An MVP Without Overbuilding', excerpt: 'The best MVPs test one clear idea. Learn how to choose the features that matter and leave the rest for later.', img: 't-saas', alt: 'Product team planning features on a board', topics: ['saas'], date: '2026-09-16', service: 'mvp-development',
    body: short('An MVP is the smallest product that can test your main idea with real users. Most teams build too much of it.', 'Choose the core', 'Write down the one job your product must do well. Then sort every feature idea:', ['Must have: the product does not work without it.', 'Should have: useful, but users can wait.', 'Later: nice ideas for after you learn.'], 'Measure what matters', 'Decide before launch which number tells you the idea works, such as sign-ups, activation or repeat use.')},
  {slug: 'seo-and-aeo', title: 'SEO And AEO: Getting Found In Search And AI Answers', excerpt: 'Search now includes AI answers. Learn how clear structure and helpful content help you show up in both.', img: 't-growth', alt: 'Search results and AI answer panels on a screen', topics: ['growth', 'ai'], date: '2026-09-09', service: 'digital-growth',
    body: short('People now find answers in classic search results and in AI-generated summaries. The good news is that the same habits help with both.', 'What helps', 'Make your content easy for people and machines to understand:', ['Answer one clear question per page.', 'Use descriptive headings and short paragraphs.', 'Add FAQ and article structured data.', 'Show who wrote the content and why they know the topic.'], 'Track it', 'Watch Search Console for impressions, and check whether AI tools mention your brand for your key questions.')},
  {slug: 'ai-in-design-workflow', title: 'Using AI Tools In A Design Workflow', excerpt: 'AI can speed up research, copy, and handoff when it supports good process. Here is where it helps and where it does not.', img: 't-ai', alt: 'Designer working with AI tools on a laptop', topics: ['ai', 'uiux'], date: '2026-09-02', service: 'ui-ux-design',
    body: short('AI tools are now part of most design teams. They work best for the slow, repetitive parts of the job.', 'Where it helps', 'We use AI to save time on:', ['Summarising interview notes into themes.', 'Drafting first versions of microcopy.', 'Checking designs for missing states.'], 'Where it does not', 'AI cannot replace talking to users or making judgement calls about your brand. Treat its output as a draft that a person reviews.')},
]

// Full article text lives in articles.mjs
for (const p of POSTS) {
  const a = ARTICLES2[p.slug] || ARTICLES[p.slug]
  const ext = EXTENSIONS[p.slug]
  if (a && ext) {
    // insert before the article's closing "How ... SEO / AI" section
    const lines = a.body.split('\n')
    const at = lines.findIndex((l) => /^## How .*(SEO|Search Engines|AI Search)/.test(l))
    if (at < 0) throw new Error('No SEO section found in ' + p.slug)
    a.body = [...lines.slice(0, at), ...ext.trim().split('\n'), ...lines.slice(at)].join('\n')
  }
  if (a && a.slug && a.slug !== p.slug) p.oldSlugs = [p.slug]
  if (a) Object.assign(p, {body: a.body, takeaways: a.takeaways, faq: a.faq}, a.slug ? {slug: a.slug} : {}, a.title ? {title: a.title} : {}, a.excerpt ? {excerpt: a.excerpt} : {}, a.seo ? {seo: a.seo} : {})
}

/* ---------- fixture (what the Sanity query returns) ---------- */
const local = (k, alt) => ({local: k, alt})
const cats = TOPICS.map(([k, t, h, d, im], i) => ({title: t, slug: k, heading: h, description: d, order: i + 1, image: local(im, '')}))
const author = {name: AUTHOR.name, slug: AUTHOR.key, role: AUTHOR.role, bio: AUTHOR.bio, linkedin: AUTHOR.linkedin, image: local(AUTHOR.img, AUTHOR.alt)}
const catBy = Object.fromEntries(cats.map((c) => [c.slug, c]))
const bodies = POSTS.map((p) => rich(p.body))
const posts = POSTS.map((p, i) => ({
  _id: 'post-' + p.slug, title: p.title, slug: p.slug, excerpt: p.excerpt,
  publishedAt: p.date + 'T09:00:00Z', featured: p.featured || 'none', relatedService: p.service,
  keyTakeaways: p.takeaways || null, faq: (p.faq || []).map(([q, a]) => ({q, a})),
  mainImage: local(p.img, p.alt), categories: p.topics.map((t) => ({title: catBy[t].title, slug: t})),
  author, body: bodies[i], seo: p.seo || null, oldSlugs: p.oldSlugs || null,
}))

const CASE_BODY = {
  challenge: rich(`
This is a sample case study that shows how the template looks. Replace it with a real project in the admin panel.
The client had a working product, but new users were dropping off during sign-up. Support tickets showed people did not understand which plan to pick.
`),
  approach: rich(`
We started with a short discovery phase: five user interviews, a review of the sign-up analytics and a workshop with the client team.
- Mapped every step of the current sign-up flow.
- Found the three screens where most people left.
- Tested two new flows as clickable prototypes.
`),
  solution: rich(`
We redesigned the onboarding flow around one question: what do you want to do first? The answer sets up the right plan and the first screen people see.
!tip How to write this section | Describe what you designed and built, and why each decision helped the user.
`),
  results: rich(`
Describe what changed after launch, using real numbers from analytics or the client. Add the strongest numbers to the "Results in numbers" fields so they show in the results band.
`),
}
const cases = [{
  _id: 'case-sample', title: 'Sample case study: a clearer onboarding flow for a SaaS product', slug: 'sample-saas-onboarding',
  client: 'Sample Client', industry: 'SaaS', location: 'Remote', services: ['ui-ux-design', 'saas-product-design'], duration: '8 weeks', year: 2026,
  summary: 'Sample content for the case study template. A redesigned onboarding flow that helps new users choose the right plan and reach their first result faster.',
  mainImage: local('svc-saas', 'Dashboard screens of a SaaS product on a dark background'),
  ...CASE_BODY,
  gallery: [local('svc-uiux', 'Wireframes and interface screens'), local('svc-mobile', 'Mobile app screens'), local('svc-web', 'Website pages on a laptop')],
  metrics: [{value: '00%', label: 'Replace with a real result, such as more sign-ups'}, {value: '0x', label: 'Replace with a second result'}, {value: '0 wks', label: 'Replace with a third result'}],
  testimonial: {quote: 'Add a real quote from your client here. Short, specific quotes about the result work best.', name: 'Client name', role: 'Role, Company'},
  liveUrl: null, featured: true, publishedAt: '2026-10-01T09:00:00Z', seo: {noindex: true},
}]
fs.mkdirSync(path.join(ROOT, 'fixtures'), {recursive: true})
fs.writeFileSync(path.join(ROOT, 'fixtures/sample.json'), JSON.stringify({posts, categories: cats, cases}, null, 1))

/* ---------- Sanity import file ---------- */
const asset = (k, alt) => ({_type: 'figure', alt, asset: {_sanityAsset: `image@${biggest(k)}`}})
const docs = []
for (const [k, t, h, d, im] of TOPICS) docs.push({_id: 'category-' + k, _type: 'category', title: t, slug: {_type: 'slug', current: k}, heading: h, description: d, order: TOPICS.findIndex((x) => x[0] === k) + 1, image: asset(im, h)})
docs.push({_id: 'author-' + AUTHOR.key, _type: 'author', name: AUTHOR.name, slug: {_type: 'slug', current: AUTHOR.key}, role: AUTHOR.role, bio: AUTHOR.bio, linkedin: AUTHOR.linkedin, image: asset(AUTHOR.img, AUTHOR.alt)})
POSTS.forEach((p, i) => docs.push({
  _id: 'post-' + p.slug, _type: 'post', title: p.title, slug: {_type: 'slug', current: p.slug}, excerpt: p.excerpt,
  mainImage: asset(p.img, p.alt), categories: p.topics.map((t) => ({_type: 'reference', _key: key(), _ref: 'category-' + t})),
  author: {_type: 'reference', _ref: 'author-' + AUTHOR.key}, body: bodies[i],
  keyTakeaways: p.takeaways, faq: p.faq && p.faq.map(([q, a]) => ({_type: 'qa', _key: key(), q, a})),
  publishedAt: p.date + 'T09:00:00Z', featured: p.featured || 'none', relatedService: p.service,
  ...(p.seo ? {seo: {_type: 'seo', ...p.seo}} : {}),
  ...(p.oldSlugs ? {oldSlugs: p.oldSlugs} : {}),
}))
const c = cases[0]
docs.push({
  _id: 'drafts.case-sample', _type: 'caseStudy', title: c.title, slug: {_type: 'slug', current: c.slug}, client: c.client, industry: c.industry, location: c.location,
  services: c.services, duration: c.duration, year: c.year, summary: c.summary, mainImage: asset('svc-saas', c.mainImage.alt),
  ...CASE_BODY, gallery: c.gallery.map((g) => ({...asset(g.local, g.alt), _key: key()})),
  metrics: c.metrics.map((m) => ({_type: 'metric', _key: key(), ...m})),
  testimonial: c.testimonial, featured: true, publishedAt: c.publishedAt, seo: {_type: 'seo', noindex: true},
})
fs.writeFileSync(path.join(HERE, 'seed.ndjson'), docs.map((d) => JSON.stringify(JSON.parse(JSON.stringify(d)))).join('\n') + '\n')
console.log(`fixture: ${posts.length} posts, ${cats.length} topics, ${cases.length} case; seed: ${docs.length} documents`)
