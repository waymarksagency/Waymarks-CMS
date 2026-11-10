// Full article text for the starter blog posts (format explained in content.mjs).
export const ARTICLES = {
  // Supplied by Waymarks (Nov 2026). New address: /blog/ux-project-discovery-phase/
  'why-start-with-discovery': {
    slug: 'ux-project-discovery-phase',
    excerpt: 'Learn what the UX project discovery phase is, what it delivers, and how it cuts risk, scope creep, and rework before design or development starts.',
    seo: {
      title: 'UX Project Discovery Phase: Why It Matters | Waymarks',
      description: 'Learn what the UX project discovery phase is, what it delivers, and how it cuts risk, scope creep, and rework before design or development starts.',
      focusKeyword: 'UX project discovery phase',
      keywords: ['digital design discovery process', 'product scoping best practices', 'website discovery framework', 'UX discovery deliverables'],
    },
    takeaways: null,
    faq: [
      ['How long does the digital design discovery process take?', 'Most projects need one to three weeks. Smaller website redesigns often take one to two weeks, while complex SaaS platforms or multi system enterprise projects can take three to four weeks.'],
      ['What are UX discovery deliverables?', 'They are the documents and assets produced during discovery, including a problem statement, scope matrix, user personas, journey maps, information architecture, technical specification, and wireframes.'],
      ['Why do we need discovery if we already know what we want to build?', 'Even when goals feel clear, team members usually hold different assumptions about the details. Discovery surfaces those differences early and grounds decisions in real user data, which prevents expensive revisions later.'],
      ['How do product scoping best practices protect my budget?', 'Prioritizing features with MoSCoW, validating layouts with wireframes, and identifying technical constraints upfront removes unexpected costs and keeps the project on schedule.'],
      ['What is a website discovery framework?', 'It is a structured approach to project research built on four pillars: business alignment, user research, technical auditing, and strategic roadmap planning.'],
      ['Is the UX project discovery phase only for large projects?', 'No. Even small websites benefit from a lighter version. The depth of research scales with the project, but the habit of aligning on goals and users first applies everywhere.'],
    ],
    body: `
Most digital projects don’t fail because of bad design or bad code. They fail because the team built the wrong thing, or built the right thing without agreeing on what “right” meant. A UX project discovery phase prevents that by putting research and alignment before pixels and code.
## What Is the UX Project Discovery Phase?
The UX project discovery phase is a short, focused research and planning period that happens before design or development begins. During this phase, the team defines the problem, learns who the users are, reviews competitors, checks technical constraints, and agrees on scope and success metrics.
The goal is simple: replace assumptions with evidence. By the end, everyone involved should know what is being built, who it is for, why it matters, and how success will be measured.
## Why Discovery Matters Before You Build
Jumping straight into mockups feels productive. Stakeholders get something to look at, and the team feels momentum. The risk is hidden, though. Without a shared understanding of goals and users, early work often gets redone later.
Discovery turns opinions like “I think the homepage needs a video” into decisions backed by user behavior and business goals. It also gets marketers, designers, developers, and leadership working from the same picture before anything expensive is built.
## What Happens When You Skip Discovery
Skipping the digital design discovery process trades a few weeks of research for months of friction. The most common problems are:
- **Unaligned stakeholders.** Leaders, product managers, and designers often carry different visions for the same project. Discovery workshops bring those differences out early, when resolving them costs a conversation instead of a rebuild.
- **Misdirected feature investment.** Teams spend budget on features users never asked for. Research shows what people actually need, so effort goes where it counts.
- **Hidden technical debt.** Designing before auditing existing systems, integrations, and databases leads to surprises mid-build. Problems found in discovery are far cheaper to fix than problems found after launch.
As a rule, the later an error is found, the more it costs to fix. Discovery is the cheapest point in the project to be wrong.
## The Four Pillars of a Website Discovery Framework
A strong website discovery framework combines human insight with hard data. It usually rests on four pillars.
### 1. Business Alignment and KPIs
Every digital project should support a measurable business goal, such as higher revenue, lower acquisition costs, or fewer support requests. Stakeholder interviews clarify goals, brand positioning, and constraints. Useful questions include:
- What does success look like in 6 to 12 months?
- Which conversions matter most, and how are they measured?
- Which internal workflows must the product support?
### 2. User Research and Personas
Assumptions are the biggest threat to good design. User interviews, usability observation, and analytics reviews reveal real behavior, friction points, and motivations. That research becomes personas and journey maps that guide every later decision.
### 3. Competitor and Market Benchmarking
No product exists in isolation. Reviewing competitors and industry leaders shows what users already expect and where there is room to stand out. Spotting where competitors create friction is often where your best opportunity sits.
### 4. Technical and Information Architecture Audit
Before visual design starts, review your CMS, tech stack, database structure, third party integrations, and performance baselines. This keeps technical surprises out of the build and shapes a sensible site structure from day one.
## UX Discovery Deliverables That Drive Results
Discovery is not endless research. It is a tight sprint that produces practical assets the whole team can use.
| Deliverable | Purpose | Who Uses It |
| Problem statement and scope matrix | Defines goals, audience, and out of scope items to prevent scope creep | Executives, product managers |
| User personas and journey maps | Shows user paths, pain points, and conversion triggers | Designers, content strategists |
| Information architecture | Sets site structure, navigation, and URL hierarchy | SEO specialists, developers |
| Technical specification | Documents stack, integrations, data models, and security needs | Engineers |
| Wireframes and low fidelity prototypes | Tests layout and content hierarchy before visual styling | Whole team, test users |
These UX discovery deliverables act as a single source of truth, so designers and engineers can move through launch without guessing.
## How Product Scoping Best Practices Prevent Budget Overruns
Budgets blow up when teams estimate costs before they understand requirements. Following product scoping best practices during discovery gives you realistic timelines and more reliable estimates.
### Step 1: Prioritize Features With MoSCoW
Sort every proposed feature into one of four groups:
- **Must have:** Essential for launch.
- **Should have:** Valuable, but can follow in a later release.
- **Could have:** Nice additions if time and budget allow.
- **Won’t have:** Deliberately excluded from this phase.
### Step 2: Validate Structure With Low Fidelity Wireframes
Changing a wireframe takes minutes. Rebuilding a finished component takes days or weeks. Testing structure early saves significant engineering time.
### Step 3: Tie Every Element to a Goal
Each screen, form, and button should support a business objective or a user task. If an element serves neither, cut it from scope.
## How Discovery Helps Search Engines and AI Answer Engines
Search is no longer only about ten blue links. AI tools like ChatGPT, Perplexity, Gemini, and Google’s AI Overviews pull answers from content that is clearly structured and easy to interpret. Discovery sets that foundation early:
- **Answer Engine Optimization (AEO):** Clear definitions and direct answers give AI tools something authoritative to cite.
- **Generative Engine Optimization (GEO):** Well defined relationships between topics, user intent, and your expertise help AI models understand what your brand does.
- **Structured data:** Planning content structure during discovery makes it easier to add JSON-LD schema such as Article, Organization, and FAQPage, which helps crawlers parse your pages.
!cta Planning a new website or product? We can run a focused discovery phase with your team. | Start a Project | /contact/
`,
  },

  // Supplied by Waymarks (Nov 2026). New address: /blog/design-system-for-developers/
  'design-systems-developers-use': {
    slug: 'design-system-for-developers',
    excerpt: 'Learn how to build a design system for developers that teams actually adopt, with reusable components, design tokens, and clear documentation.',
    seo: {
      title: 'Design System for Developers That Gets Used | Waymarks',
      description: 'Learn how to build a design system for developers that teams actually adopt, with reusable components, design tokens, and clear documentation.',
      focusKeyword: 'design system for developers',
      keywords: ['design system components', 'design tokens', 'design system documentation', 'design to development handoff'],
    },
    takeaways: null,
    faq: [
      ['What is a design system for developers?', 'It is a shared library of reusable components, rules, and documentation that lets engineers build consistent interfaces faster, with design and code working from the same source of truth.'],
      ['How long does it take to build a design system?', 'A small starter system with tokens and a handful of core components can be ready in four to eight weeks. Larger systems grow over time and are never truly finished, which is why ownership matters.'],
      ['What are design tokens and why do they matter?', 'Design tokens are named values for color, spacing, type, and other style choices. They matter because one change updates every screen, which makes rebrands, themes, and dark mode far easier.'],
      ['Does a small team need design system components?', 'Yes, in a lighter form. Even a small set of shared components cuts repeat work and keeps the product consistent as the team grows.'],
      ['What should design system documentation include?', 'Live previews, copy and paste code, props, usage guidance, accessibility notes, and a changelog. Keep it short and keep it current.'],
      ['How do you improve design to development handoff?', 'Share the same names and tokens in design and code, review work in the browser, and agree on what “done” means before development starts.'],
    ],
    body: `
A design system should make life easier for designers and developers. Too many do the opposite. They live in a Figma file nobody opens, a docs site nobody trusts, and a component library that drifted away from production months ago. A design system for developers only works when developers choose to use it. This guide shows how to build one that earns that choice.
## Why Most Design Systems Get Ignored
Most design systems are built by designers, for designers. Developers receive a spec and are asked to match it. If the system is hard to find, hard to install, or slower than building a component from scratch, they skip it, and honestly, that is a reasonable call.
The usual problems look like this:
- Components exist in Figma but not in code
- Documentation is outdated or has no code examples
- Updates ship without notice and break existing screens
- There is no clear way to report bugs or request changes
The fix is not more rules. It is building the system around how developers actually work.
## What Is a Design System for Developers?
A design system for developers is a shared library of reusable code, visual rules, and guidance that helps engineers build consistent interfaces without recreating UI from scratch. It combines design system components, design tokens, and design system documentation into one source of truth that connects design decisions to production code.
When it works, designers stop redlining every screen, developers stop guessing, and the product looks and behaves the same everywhere.
## Start With Design Tokens
Design tokens are named values for color, spacing, typography, radius, and shadow. Instead of hard coding a hex value in forty places, developers reference a name like \`color.primary\`. Change it once, and every screen updates.
Tokens are the cheapest part of a system to adopt, and the payoff is immediate. A rebrand or a dark mode becomes a config change instead of a month of edits. Export them in the formats your stack already uses, such as CSS variables or JSON, so design tokens stay in sync between Figma and code automatically.
## Build Design System Components in Code First
Developers trust what they can import. Build your design system components as real code in the framework your team already uses, then mirror them in Figma. Doing it in that order keeps the code as the source of truth and stops the two from drifting apart.
A few rules keep components useful:
- Start small with buttons, inputs, modals, and cards
- Keep props and naming predictable across every component
- Make accessibility the default, including keyboard support, focus states, and contrast
- Allow sensible overrides so developers never feel blocked
Well built design system components save more time than any style guide ever will. Aim to cover about 80% of real use cases and leave the rare edge cases to the team. Your first design system components should be boring and reliable, not clever.
## Write Design System Documentation People Read
Good design system documentation is short, searchable, and code first. Nobody wants to read an essay before using a dropdown.
Every component page should include:
- A live preview
- Copy and paste code
- A props table
- Do and don’t examples
- Accessibility notes
- A changelog
Design system documentation also needs an owner. Outdated docs are worse than no docs, because they teach people to stop trusting the system. Keep the docs close to the code, with tools like Storybook or Docusaurus, so they update when the components do.
## Fix the Design to Development Handoff
This is where a system pays for itself. Without one, handoff means specs, redlines, and a lot of back and forth. With one, designers and developers pick from the same set of parts.
A smoother design to development handoff comes from four habits:
- Name components the same in Figma and in code
- Use the same tokens on both sides
- Review finished work in the browser, not just in a screenshot
- Hold a short sync whenever a new pattern is introduced
A repeatable design to development handoff means fewer “this doesn’t match the mockup” comments and faster releases.
## Treat the System Like a Product
The systems that last are managed like products. They have an owner, versioned releases, clear release notes, and a simple way for anyone to suggest improvements. A design system for developers grows when people can contribute to it, not just consume it.
Track a few simple numbers to see whether it is working:
| Metric | What It Tells You |
| Share of screens using system components | Real adoption |
| Time to build a new page | Speed gained |
| Number of custom overrides | Where the system falls short |
| Bugs and requests per release | Health and trust |
## Is Your System Developer Ready?
| Question | Healthy Sign |
| Can a developer install it in minutes? | One package, clear setup steps |
| Do components exist in code, not just in design files? | Yes, with matching names |
| Are docs current and searchable? | Updated with every release |
| Is there a way to give feedback? | A named channel and an owner |
| Are tokens shared by design and code? | One source, synced automatically |
## How a Strong System Supports SEO and AI Search
A well built design system for developers also helps your search performance. Consistent design system components output clean, semantic HTML, proper heading order, and accessible markup. That makes pages easier for search engines and AI answer tools to read, and shared components keep pages fast and consistent at scale.
!cta Want a design system your developers will actually use? We can audit your product and build one with your team. | Start a Project | /contact/
`,
  },

  'ux-problems-we-look-for-first': {
    takeaways: [
      'A handful of common UX problems cause most lost conversions.',
      'Check the main action, speed, forms, navigation labels and contrast first.',
      'Most of these fixes are small and can be shipped in days, not months.',
      'Measure before and after each change so you know what worked.',
    ],
    faq: [
      ['How long does a UX audit take?', 'A focused audit of a marketing website usually takes a few days. A product with many flows can take one to two weeks. You get a ranked list of problems and suggested fixes.'],
      ['Do we need analytics before an audit?', 'It helps a lot. Analytics show where people drop off, and the audit explains why. If you have no data yet, we can start with expert review and a few quick user tests.'],
      ['Which problem should we fix first?', 'The one on your most visited page that blocks the main action. That is usually a confusing call to action, a slow page or a long form.'],
    ],
    body: `
When we review a website or app, we do not start with colours or fonts. We start with the problems that stop people from doing what they came to do. Five of them show up so often that we check them first on every project.

Each one is easy to miss when you look at your own product every day, and each one quietly costs you customers.

## 1. The main action is not clear
Visitors decide within seconds whether a page is for them and what to do next. If the page has three buttons of equal weight, or the main button says something vague like "Learn more", people hesitate. Hesitation turns into leaving.
- Give each page one main action, and make it the most visible button.
- Use a label that says what happens: "Book a call", "Start free trial", "Get a quote".
- Repeat the main action after each key section on long pages.

## 2. Pages load slowly, especially on phones
Most visitors arrive on a phone, often on mobile data. A page that feels fine on office Wi-Fi can take several seconds to show anything on a phone. Large images, many fonts and third-party scripts are the usual causes.
!note Quick check | Run your most important page through Google PageSpeed Insights on the mobile setting. Look at Largest Contentful Paint first: Google considers 2.5 seconds or less good.
Read more in our article on [what makes a website load fast](/blog/what-makes-a-website-fast/).

## 3. Forms ask for too much, too early
Every extra field is another reason to give up. We often see contact forms asking for company size, budget, phone number and a detailed message before someone has decided to talk to you at all.
- Ask only for what you need to take the next step.
- Make optional fields clearly optional, or remove them.
- Show errors next to the field, in plain language, as soon as possible.
- Keep the button label specific: "Send my request" rather than "Submit".

## 4. Navigation uses internal language
Teams name things the way they think about them internally: product codes, department names or clever brand terms. Visitors look for the words they already use. If they cannot find "Pricing" or "Services" in the menu, they assume you do not have it.
!tip Use their words | Read your support emails and sales calls. The words customers use to describe their problem are the words that belong in your navigation.

## 5. Text is hard to read
Light grey text on white, small font sizes and long lines all make reading harder, especially on phones and for older visitors. Low contrast is also an accessibility problem. The WCAG guidelines ask for a contrast ratio of at least 4.5 to 1 for normal body text.
- Check contrast with a free tool such as the WebAIM contrast checker.
- Use at least 16 pixels for body text on mobile.
- Keep lines to roughly 60 to 80 characters on desktop.

## How to fix them without a redesign
None of these problems needs a full redesign. Most can be fixed in days. We suggest picking your most visited page, checking it against these five points and fixing the worst one first. Measure the change in sign-ups, enquiries or sales before moving on to the next.

Small, measured fixes add up quickly, and they tell you far more about your users than a big launch ever will.
!cta Want a second pair of eyes on your website or app? We run focused UX audits with a clear list of fixes. | Start a Project | /contact/
`,
  },

  'brand-positioning-statement': {
    takeaways: [
      'A positioning statement is an internal sentence, not a tagline.',
      'It names your audience, their need, your category, your main benefit and your proof.',
      'Choosing one specific audience makes every later brand decision easier.',
      'Test it with real customers and rewrite it until they recognise themselves.',
    ],
    faq: [
      ['Is a positioning statement the same as a tagline?', 'No. A positioning statement is internal and can be a little long. A tagline is a short public line inspired by it. Write the positioning first, then the tagline.'],
      ['How often should we update it?', 'Review it once a year, or whenever your audience, product or competitors change in a big way. Good positioning usually lasts several years.'],
      ['Can we have different positioning for different services?', 'You can have one company positioning and more specific statements for each service or audience, as long as they all support the main one.'],
    ],
    body: `
Before you design a logo, write a website or plan a campaign, you need to know what your brand stands for and who it is for. A positioning statement captures that in one sentence. It is not something customers will read. It is a tool your team uses to make consistent decisions.

## What a positioning statement does
A good positioning statement answers four questions at once: who you serve, what they need, why you are the better choice and why they should believe you. When it is clear, it settles debates about design, copy and even which projects to accept.
- Designers use it to choose the tone of the visual identity.
- Writers use it to decide what to say first on every page.
- Sales teams use it to explain quickly why you are different.

## A simple structure
The most widely used structure comes from Geoffrey Moore's book *Crossing the Chasm*. Fill in each part:
> For [target audience] who [need or problem], [brand] is the [category] that [main benefit]. Unlike [main alternative], we [key difference], because [reason to believe].
It looks rigid, but that is the point. Each part forces a decision you might otherwise avoid.

## How to fill in each part
### Target audience
Pick one specific group. "Small businesses" is too broad. "Founders of early-stage SaaS companies preparing their first funding round" gives you something to design for. You can still serve others; you are just choosing who to speak to first.
### Need or problem
Describe the problem in your customer's words, not yours. Listen to sales calls, read reviews and look at the questions people ask before they buy.
### Category
Name the category people already understand: design agency, accounting software, coffee subscription. If you invent a new category, people have to work out what you are before they can decide if they want it.
### Main benefit
Choose the one result customers care about most. Not a list of features, but the outcome: launch faster, save hours every week, look established from day one.
### Reason to believe
Back up the benefit with something concrete: a process, a team, results, years of focus or a specific guarantee. Without proof, a benefit is only a claim.
!tip Be specific | If your statement would still be true after swapping in a competitor's name, it is not positioning yet. Keep narrowing until it only fits you.

## An example
For founders of early-stage SaaS companies who need to look credible to investors and first customers, Northlight is the product design studio that turns rough prototypes into launch-ready products in weeks. Unlike freelancers working alone, we bring brand, UX and development together in one team, because we have built and launched products of our own.

(Northlight is a made-up example.)

## Test it before you use it
Read your statement to three or four real customers. If they nod and say "that is exactly us", keep it. If they look confused or say it could be anyone, simplify it and try again. Then share it with everyone who writes, designs or sells for your brand.

## Where it goes next
Your positioning statement becomes the brief for your visual identity, the first lines of your homepage, your tagline and the way you introduce yourself. Getting this sentence right makes all of that work faster and more consistent.
!cta Need help defining your positioning before a rebrand? We run short brand strategy workshops with your team. | Start a Project | /contact/
`,
  },

  'usability-testing-small-budget': {
    takeaways: [
      'You can learn a lot from five short sessions with real users.',
      'A video call and a clickable prototype are enough equipment.',
      'Give people realistic tasks, then stay quiet and watch.',
      'Fix the three biggest problems, then test again.',
    ],
    faq: [
      ['How many people do we need to test with?', 'Five people per round is a good start. Nielsen Norman Group research found that small groups uncover most of the common problems, and several small rounds teach you more than one large one.'],
      ['Should we pay participants?', 'Yes, a small thank-you such as a gift card shows respect for their time and makes it much easier to recruit. The amount depends on your audience and region.'],
      ['Can we test before anything is built?', 'Yes. Testing a clickable prototype in Figma is one of the cheapest ways to catch problems, because changes cost minutes instead of days of development.'],
    ],
    body: `
Usability testing sounds like something only big companies can afford: labs, one-way mirrors and specialist researchers. In reality, the most useful version costs very little. If you can run a video call, you can run a usability test.

## Why it is worth doing
Teams know their own product too well to see it clearly. Watching someone new try to use it shows you, very quickly, where the design is confusing. It replaces opinions in meetings with evidence.

Nielsen Norman Group has long recommended testing with around five users per round. Small groups tend to reveal most of the obvious problems, and running several small rounds as you improve the design is more useful than one large study.

## What you need
- A clickable prototype or a working version of the product.
- A video call tool that lets participants share their screen.
- Five people who match your real users.
- Three to five realistic tasks.
- One person to lead the session and, ideally, one to take notes.

## Recruit the right people
Testing with colleagues or friends is better than nothing, but they already know too much. Look for people who match your audience: existing customers, people from your mailing list, or users recruited through a testing service. A short screening question or two helps you avoid people who are not a fit.
!tip Offer a thank-you | A small gift card makes recruiting much easier and shows respect for people's time.

## Write realistic tasks
Good tasks describe a goal, not the steps. Instead of "Click Pricing and choose the middle plan", say "You run a team of ten. Find out how much this would cost you each month." That way you see how people actually look for information.
1. Start with an easy task to help people relax.
2. Cover the most important journeys: signing up, buying, booking or finding key information.
3. End with an open question: "What, if anything, was confusing?"

## Run the session
Introduce yourself, explain that you are testing the design, not them, and ask them to think out loud. Then give the first task and stay quiet. The hardest part of usability testing is not helping when someone gets stuck.
!note What to write down | Note where people hesitate, what they click first, the words they use and anything they say they expected to find. Hesitation is as important as failure.
Each session usually takes 30 to 45 minutes. Record it, with permission, so the rest of the team can watch the key moments.

## Turn notes into fixes
After all five sessions, list every problem you saw and how many people ran into it. Rank them by how often they happened and how badly they blocked the task. Fix the top three, then test again with a new group. Each round makes the product noticeably easier to use.

## Make it a habit
Usability testing works best when it is small and regular, not a big event once a year. A round every few weeks during design and development catches problems while they are still cheap to fix.
!cta Want us to plan and run a round of usability testing for your product? We share clear findings and fixes. | Start a Project | /contact/
`,
  },

  'what-makes-a-website-fast': {
    takeaways: [
      'Images, fonts and third-party scripts cause most slow websites.',
      'Google measures loading, responsiveness and visual stability through Core Web Vitals.',
      'Serve modern image formats at the right size for each screen.',
      'Set a performance budget and check it on every release.',
    ],
    faq: [
      ['What are Core Web Vitals?', 'Three measures Google uses for page experience: Largest Contentful Paint for loading (2.5 seconds or less is good), Interaction to Next Paint for responsiveness (200 milliseconds or less) and Cumulative Layout Shift for visual stability (0.1 or less).'],
      ['Does website speed affect SEO?', 'Yes, page experience is one of many signals Google uses. Speed also affects bounce rates and conversions directly, which matters even more than rankings.'],
      ['Is our hosting the problem?', 'Sometimes, but usually not first. Large images, too many fonts and heavy scripts are more common causes. Fix those, then look at hosting, caching and a CDN.'],
    ],
    body: `
A fast website feels trustworthy. A slow one feels broken, even when everything technically works. Speed affects how long people stay, whether they buy or enquire, and how Google ranks your pages. The good news is that most slow websites have the same few causes, and most of them can be fixed without a rebuild.

## How speed is measured
Google measures real-world experience through three Core Web Vitals:
- **Largest Contentful Paint (LCP):** how long the main content takes to appear. Good is 2.5 seconds or less.
- **Interaction to Next Paint (INP):** how quickly the page responds when someone taps or clicks. Good is 200 milliseconds or less.
- **Cumulative Layout Shift (CLS):** how much the layout jumps while loading. Good is 0.1 or less.
!tip Where to check | Google PageSpeed Insights shows both lab results and, for busier sites, real visitor data. Always look at the mobile results first.

## 1. Images
Images are the most common reason a page is slow. A single photo straight from a camera or stock site can be several megabytes.
- Use modern formats such as WebP or AVIF.
- Serve different sizes for different screens with \`srcset\`, so phones do not download desktop images.
- Lazy-load images below the first screen.
- Give every image a width and height so the layout does not jump.
- Load the main hero image early, because it is often the Largest Contentful Paint.

## 2. Fonts
Custom fonts make a brand recognisable, but each weight and style is another download. Many sites load six or more font files when two or three would do.
1. Use only the weights you actually need.
2. Host fonts on your own domain when possible.
3. Preload the main font so text appears quickly.
4. Use \`font-display: swap\` so text is visible while fonts load.

## 3. Scripts
Every analytics tool, chat widget, heatmap and ad pixel adds JavaScript that competes with your own page. Over time these build up, and they are a common reason for poor responsiveness.
- List every third-party script and remove the ones nobody uses.
- Load the rest after the page is usable, not before.
- Split large scripts so each page only loads what it needs.
!warning Watch tag managers | Tag managers make it easy to add scripts without a developer. That is useful, but it is also how many sites slowly get slower. Review them every few months.

## 4. Layout shifts
Few things are more frustrating than tapping a button just as the page jumps and you hit something else. Layout shifts usually come from images without dimensions, late-loading banners and fonts that change size when they load. Reserve space for anything that loads late.

## 5. Hosting and caching
Once the page itself is lean, look at how it is delivered. Good caching, compression and a content delivery network make pages load faster for visitors far from your server. Static pages, like the ones we build for most marketing sites, are especially easy to serve quickly.

## Keep it fast
Speed tends to slip over time as new features, images and scripts are added. Set a simple performance budget, for example a maximum page weight and a minimum PageSpeed score, and check it on every release. It is far easier to keep a site fast than to make a slow one fast again.
!cta Is your website slower than it should be? We can audit it and fix the biggest problems first. | Start a Project | /contact/
`,
  },

  'plan-an-mvp-without-overbuilding': {
    takeaways: [
      'An MVP tests one clear idea with real users, not a smaller version of everything.',
      'Write down the one job your product must do well before listing features.',
      'Sort every feature into must have, should have and later.',
      'Decide which number proves the idea works before you launch.',
    ],
    faq: [
      ['How long should an MVP take to build?', 'Many MVPs can be designed and built in roughly two to four months. If your plan takes much longer, the scope is usually too big for a first version.'],
      ['Should an MVP look unfinished?', 'No. It should do less, not look worse. A focused product with a clean, trustworthy design gives you more reliable feedback than a rough one.'],
      ['What happens after launch?', 'You watch how people use it, talk to early users and decide what to improve, add or remove. The MVP is the start of learning, not the end of the project.'],
    ],
    body: `
A minimum viable product is meant to be small. Yet many first versions take a year to build, cost far more than planned and launch with features nobody uses. The cause is almost always the same: the team tried to build a smaller version of everything instead of a complete version of one thing.

## What an MVP is for
An MVP exists to test your most important assumption with real users, as quickly and cheaply as possible. That assumption is usually some version of: people have this problem, and they will use or pay for this solution.

Everything in the MVP should help you test that. Anything that does not can wait.

## Start with the core job
Before listing features, write one sentence describing the job your product does for its users. For example: "Help small clinics fill cancelled appointments automatically." That sentence becomes the filter for every decision.
!tip One sentence test | If a feature does not directly help with the core job, it is not part of the MVP, however good the idea is.

## Sort every idea
List every feature idea the team has. Then sort each one into three groups:
1. **Must have:** the product cannot do its core job without it.
2. **Should have:** useful, but early users can live without it for a while.
3. **Later:** good ideas to revisit once you know how people use the product.

Be strict. Most teams find their first "must have" list is two or three times too long. Things like admin dashboards, advanced settings, integrations and multiple user roles can often be handled manually at first.

## Do things that do not scale
In the early days, it is fine to handle some work by hand. Onboarding can be a call instead of a self-serve flow. Reports can be sent by email instead of shown in a dashboard. Billing can start with simple invoices. This lets you launch sooner and learn what is actually worth automating.

## Design the key flow properly
Doing less does not mean doing it badly. The few screens in your MVP should be clear, fast and trustworthy, because people judge credibility in seconds. Spend your design time on the core flow: signing up, doing the main task and seeing the result.
!note Design still matters | A confusing MVP tells you nothing, because you cannot tell whether people rejected the idea or just got lost.

## Decide how you will measure success
Before launch, decide which number will tell you whether the idea works. Choose one or two:
- Activation: how many sign-ups complete the core task.
- Retention: how many come back in the second or third week.
- Conversion: how many start paying, or agree to.
- Referral: how many invite someone else.
Set up analytics for these from day one, so you are learning from the first user.

## Plan for the second version
Launching the MVP starts the real work. Talk to early users, watch how they use the product and review your numbers every week. The "later" list will change completely once you see real behaviour, and that is the point. You will build the next version on evidence instead of guesses.
Read more about our approach on our [MVP development](/services/mvp-development/) page.
!cta Planning an MVP and not sure what to cut? We help founders scope, design and launch focused first versions. | Start a Project | /contact/
`,
  },

  'seo-and-aeo': {
    takeaways: [
      'People now find answers in classic search results and in AI-generated summaries.',
      'AEO (answer engine optimisation) builds on good SEO rather than replacing it.',
      'Clear questions, direct answers and good structure help both.',
      'Show who wrote your content and why they know the subject.',
    ],
    faq: [
      ['What is AEO?', 'Answer engine optimisation: shaping your content so search engines and AI assistants can understand it, quote it and send people to it when they answer a question.'],
      ['Does FAQ schema still help?', 'Google now shows FAQ rich results only for a small set of authoritative government and health sites. Structured data can still help search engines understand your page, but do not expect FAQ snippets for a typical business site.'],
      ['How do we know if AI tools mention us?', 'Ask the main AI assistants the questions your customers ask and note whether, and how, your brand appears. Repeat it every month or two to see changes.'],
    ],
    body: `
Search is changing. People still type questions into Google, but many now get their answer from an AI-generated summary, a chat assistant or a voice assistant before they ever click a link. That has created a new term: answer engine optimisation, or AEO.

The good news is that AEO is not a separate discipline that replaces SEO. The habits that make content easy for people to understand also make it easy for search engines and AI tools to understand.

## SEO and AEO in one sentence each
- **SEO** helps your pages rank in search results so people click through to your site.
- **AEO** helps your content be understood, quoted and recommended when a search engine or AI assistant answers a question directly.

## Answer one clear question per page
Pages that try to cover everything often answer nothing well. Give each important page a clear purpose and a question it answers. Put the direct answer near the top, then go into detail.
!tip Start with the answer | Write the first paragraph as if it might be quoted on its own. If someone read only that paragraph, would they get a useful answer?

## Use structure that machines can follow
- Use one clear H1 and descriptive H2 and H3 headings.
- Keep paragraphs short and focused on one idea.
- Use lists and tables for steps, comparisons and specifications.
- Add a short summary or key takeaways at the top of long articles.
- Use structured data, such as Article, Organization and Service markup, to describe what the page is.
!note About FAQ snippets | Since 2023, Google shows FAQ rich results only for a small set of well-known government and health websites. FAQ sections are still useful for readers, but most business sites will not get the expandable FAQ snippet in results.

## Show who is behind the content
Search engines and AI tools increasingly look for signals that content comes from people who know the subject. Google's guidance on helpful content talks about experience, expertise, authoritativeness and trust.
- Name the author or team and explain their experience.
- Share real examples, processes and lessons from your own work.
- Keep important pages up to date and show when they were last updated.
- Link to reliable sources when you state facts.

## Keep technical SEO healthy
None of this works if search engines cannot crawl and load your pages. Make sure your site is fast, mobile-friendly and has a clean sitemap, sensible internal links and no accidental \`noindex\` tags on important pages. See our article on [what makes a website load fast](/blog/what-makes-a-website-fast/).

## Measure both
- Use Google Search Console to track impressions, clicks and the queries you appear for.
- Watch referral traffic from AI tools in your analytics, where it is identified.
- Every month or two, ask the main AI assistants the questions your customers ask and note whether your brand is mentioned and how.

## The bottom line
Clear, specific, trustworthy content has always been the foundation of good SEO. AI answers make that foundation even more important. Write for the person asking the question, structure it so machines can follow, and show why you are worth listening to.
Learn how we approach this on our [digital growth](/services/digital-growth/) page.
!cta Want your content to show up in search results and AI answers? We plan and write content built for both. | Start a Project | /contact/
`,
  },

  'ai-in-design-workflow': {
    takeaways: [
      'AI tools save the most time on slow, repetitive parts of design work.',
      'They are useful for summarising research, drafting copy and checking for missing states.',
      'They cannot replace talking to users or making judgement calls about your brand.',
      'Treat every AI output as a draft that a person reviews.',
    ],
    faq: [
      ['Will AI replace designers?', 'It is changing how designers work, not removing the need for them. Understanding people, making trade-offs and taking responsibility for a product still need human judgement.'],
      ['Is it safe to put client data into AI tools?', 'Only if the tool and its settings meet your client agreements and privacy rules. Remove personal data where you can, and check whether the tool uses your inputs for training.'],
      ['Which AI tools should a design team start with?', 'Start with one general assistant for writing and summarising, plus the AI features already built into tools you use, such as Figma. Add more only when you have a clear use for them.'],
    ],
    body: `
AI tools are now part of most design teams' day. Used well, they remove hours of repetitive work and give designers more time for the parts of the job that need judgement. Used carelessly, they produce generic work and new risks. Here is how we think about where AI fits.

## Where AI helps most
The best uses we have found are the slow, repetitive tasks that sit around the real design work.
### Summarising research
After a round of user interviews, AI can help group notes into themes, pull out quotes and draft a first summary. A researcher still checks it against the recordings, but the first draft takes minutes instead of hours.
### Drafting microcopy
Button labels, error messages, empty states and onboarding hints often get written last and in a hurry. AI is useful for generating several options quickly, which a designer or writer then edits to match the brand's voice.
### Checking for missing states
Describe a screen or flow and ask what could go wrong: no data, slow connection, an error, a very long name. AI is good at listing edge cases a busy team might miss.
### Exploring early ideas
Image and layout tools can produce quick visual directions for moodboards and early concepts. They are a starting point for discussion, not a finished design.
!tip A good rule | Use AI to go wide quickly, then use people to choose, refine and take responsibility.

## Where it does not help
- **Understanding real users.** AI can summarise what people said, but it cannot replace talking to them and watching them use your product.
- **Brand judgement.** Generated work tends towards the average. A distinctive brand needs deliberate choices.
- **Accessibility decisions.** AI suggestions can miss contrast, focus order or screen reader issues. Check them properly.
- **Final responsibility.** Someone on the team must own every decision that ships.

## Watch the risks
!warning Client data | Before pasting research notes, contracts or customer data into an AI tool, check your client agreements, privacy rules and the tool's data settings. Remove personal details whenever you can.
Also be careful with generated images and text that may closely resemble existing work. Treat AI output as raw material that needs review, editing and checking before it reaches a client or a live product.

## How we use it in practice
In our projects, AI helps us move faster through research synthesis, first drafts of copy and quality checks. The core of the work is unchanged: understanding the problem, talking to users, designing with intent and testing with real people.

## Getting started in your team
1. Pick one repetitive task that takes too long, such as summarising interview notes.
2. Try one tool on it for a few weeks.
3. Agree simple rules on data, review and when not to use it.
4. Share what worked, then try the next task.

AI will keep improving quickly. Teams that learn to use it thoughtfully, rather than everywhere or nowhere, will get the most from it.
!cta Want to design faster without losing quality? Talk to us about your next product or website. | Start a Project | /contact/
`,
  },
}
