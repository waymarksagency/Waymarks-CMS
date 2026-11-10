// Seven articles written in the Waymarks article format (Nov 2026).
// Each entry is keyed by the original post key in content.mjs.
export const ARTICLES2 = {
  'ux-problems-we-look-for-first': {
    slug: 'common-ux-problems',
    title: '5 Common UX Problems We Look For First',
    excerpt: 'Learn the five common UX problems that quietly kill conversions, how to spot them in a UX audit, and the simple fixes that win back lost customers.',
    seo: {
      title: 'Common UX Problems That Kill Conversions | Waymarks',
      description: 'Learn the five common UX problems that quietly kill conversions, how to spot them in a UX audit, and the simple fixes that win back lost customers.',
      focusKeyword: 'common UX problems',
      keywords: ['UX audit checklist', 'website usability issues', 'conversion rate optimization', 'UX best practices'],
    },
    faq: [
      ['What are the most common UX problems on websites?', 'The five we see most often are an unclear main action, slow pages on mobile, forms that ask for too much, navigation that uses internal language, and text that is hard to read because of low contrast or small sizes.'],
      ['How do I know if my website has UX problems?', 'Look for pages with high traffic but low conversions, high exit rates on key steps, and repeated questions in support emails. Then watch a few real people try to complete a task. Where they hesitate is where the problems are.'],
      ['How long does a UX audit take?', 'A focused audit of a marketing website usually takes three to five working days. A product with many flows can take one to two weeks. The result is a ranked list of problems with suggested fixes.'],
      ['Do I need a redesign to fix UX problems?', 'Usually not. Most common UX problems can be fixed with targeted changes to copy, layout, forms, and performance. A redesign makes sense only when the structure of the site no longer fits the business.'],
      ['Which UX problem should I fix first?', 'Start with the issue on your most visited page that blocks the main action. That is usually a confusing call to action, a slow page, or a long form.'],
      ['How do I measure whether a UX fix worked?', 'Record the conversion rate, completion rate, or drop-off for the affected step before the change, ship one fix at a time, and compare the same numbers over a similar period afterwards.'],
    ],
    body: `
Most websites don’t lose customers because of one dramatic failure. They lose them through small moments of friction: a button that isn’t clear, a page that loads a second too slowly, a form that asks one question too many. These common UX problems rarely show up in a design review, because the team knows the product too well to notice them. Customers notice immediately, and they leave.

When we run a UX audit, we don’t start with colours or fonts. We start with the five problems that cost conversions most often. This guide explains each one, how to spot it, and how to fix it without a full redesign.
## What Are Common UX Problems?
Common UX problems are recurring usability issues that make it harder for people to understand a page, find what they need, or complete a task. They are not bugs in the technical sense. The site works, but it works against the visitor.

They matter because every point of confusion adds effort, and people have very little patience for effort online. A visitor who has to think about what to do next is a visitor who is already looking for the back button. Fixing these issues is one of the most reliable forms of conversion rate optimization, because it removes obstacles instead of trying to persuade people past them.
## Why Small UX Issues Have a Big Impact
A single usability issue rarely looks serious on its own. The problem is that they stack. A slow page makes people impatient. An unclear button makes them hesitate. A long form gives them a reason to stop. Each step loses a share of visitors, and the losses multiply across the journey.

That is also why small fixes can produce outsized results. Removing friction at the busiest step of the journey helps every visitor who passes through it, every day.
## 1. The Main Action Isn’t Clear
Visitors decide within seconds whether a page is for them and what to do next. If a page has three buttons of equal weight, or the main button says something vague like “Learn more”, people hesitate. Hesitation turns into exits.

Signs this is happening:
- Visitors scroll the whole page without clicking anything
- Clicks are spread evenly across several buttons
- Heatmaps show attention on navigation instead of the main call to action

How to fix it:
- Give each page one main action and make it the most visible button
- Use a label that says exactly what happens, such as “Book a call” or “Get a quote”
- Repeat the main action after key sections on long pages
- Reduce competing links near the primary button
## 2. Pages Load Slowly, Especially on Phones
More than half of web traffic now comes from mobile devices, often on mobile data. A page that feels instant on office Wi-Fi can take several seconds to show anything on a phone. Large images, too many font files, and third party scripts are the usual causes.

Google measures this through Core Web Vitals. Largest Contentful Paint, which tracks how quickly the main content appears, is considered good at 2.5 seconds or less. If your key pages are well above that on mobile, speed is costing you visitors before they read a word.

How to fix it:
- Compress images and serve modern formats such as WebP or AVIF
- Serve smaller images to smaller screens
- Remove scripts that nobody uses, and load the rest after the page is usable
- Test with Google PageSpeed Insights on the mobile setting

Our guide to [website speed optimization](/blog/website-speed-optimization/) covers this in more detail.
## 3. Forms Ask for Too Much, Too Early
Every field in a form is a small request. Ask for too many, and people decide the effort isn’t worth it. We often see contact forms that ask for company size, budget, phone number, and a detailed brief before someone has even decided to talk to you.

How to fix it:
- Ask only for what you need to take the next step
- Mark optional fields clearly, or remove them
- Show errors next to the field, in plain language, as soon as they happen
- Keep the button label specific, such as “Send my request” instead of “Submit”
- Split long forms into short steps with a visible progress indicator

A form is a conversation. The first message should be easy to reply to.
## 4. Navigation Uses Internal Language
Teams name things the way they think about them internally: product codes, department names, or clever brand terms. Visitors look for the words they already use. If they can’t find “Pricing” or “Services” in your menu, they assume you don’t offer it.

How to fix it:
- Use plain, familiar labels for main navigation items
- Read support emails and sales call notes to learn the words customers use
- Keep the main menu short, ideally five to seven items
- Test labels with a quick card sorting or tree testing exercise
## 5. Text Is Hard to Read
Light grey text on white, small font sizes, and very long lines all make reading harder, especially on phones and for older visitors. Low contrast is also an accessibility issue. The Web Content Accessibility Guidelines ask for a contrast ratio of at least 4.5 to 1 for normal body text and 3 to 1 for large text.

How to fix it:
- Check text contrast with a free tool such as the WebAIM contrast checker
- Use at least 16 pixels for body text on mobile
- Keep lines to roughly 60 to 80 characters on desktop
- Break long paragraphs into shorter ones with clear subheadings
## UX Audit Checklist: The Five Problems at a Glance
| Problem | Warning Sign | Quick Fix |
| Unclear main action | Clicks spread across many buttons | One primary button with a specific label |
| Slow pages | Largest Contentful Paint above 2.5 seconds on mobile | Compress images and defer extra scripts |
| Long forms | High drop-off on the form step | Remove non-essential fields |
| Internal navigation labels | Visitors use search for basic pages | Rename menu items in customer language |
| Hard to read text | Low contrast or small type on mobile | Meet WCAG contrast and use 16px or larger body text |
## How to Prioritize UX Fixes
You can’t fix everything at once, and you don’t need to. A simple way to decide what comes first is to score each issue on two questions: how many people does it affect, and how badly does it block them?
1. List every issue you find, along with the page or step where it happens.
2. Note how much traffic reaches that page or step.
3. Rate how severe the issue is, from a minor annoyance to a complete blocker.
4. Fix high traffic, high severity issues first.
5. Measure the result before moving to the next fix.

This keeps effort focused where it pays back fastest, and it gives you clear evidence of what worked.
## UX Best Practices to Prevent These Problems
Fixing problems is good. Preventing them is better. A few habits keep common UX problems from creeping back in:
- Test new pages with a handful of real users before launch
- Check every important page on a real phone, not only in a desktop browser
- Review analytics monthly for pages with unusual drop-off
- Keep a shared design system so buttons, forms, and text styles stay consistent
- Treat performance as a feature, with a budget for page weight and load time
## How Fixing UX Problems Supports SEO and AI Search
Good UX and good search performance overlap more than most teams expect. Faster pages score better on Core Web Vitals, which are part of Google’s page experience signals. Clear headings, readable text, and logical structure make it easier for search engines and AI answer tools to understand what a page is about and quote it accurately. When people find what they need quickly, they also stay longer and engage more, which sends positive signals about the page.
!cta Want a second pair of eyes on your website or app? We run focused UX audits with a clear, ranked list of fixes. | Start a Project | /contact/
`,
  },

  'brand-positioning-statement': {
    slug: 'brand-positioning-statement',
    title: 'How To Write A Brand Positioning Statement',
    excerpt: 'Learn how to write a brand positioning statement that defines your audience, your difference, and your proof, with a simple template and a worked example.',
    seo: {
      title: 'How to Write a Brand Positioning Statement | Waymarks',
      description: 'Learn how to write a brand positioning statement that defines your audience, your difference, and your proof, with a simple template and a worked example.',
      focusKeyword: 'brand positioning statement',
      keywords: ['positioning statement template', 'brand positioning examples', 'brand strategy framework', 'brand differentiation'],
    },
    faq: [
      ['What is a brand positioning statement?', 'It is a short internal statement that describes who your brand serves, what need it meets, how it is different from alternatives, and why people should believe it. Teams use it to keep marketing, design, and sales consistent.'],
      ['Is a positioning statement the same as a tagline?', 'No. A positioning statement is internal and can be a sentence or two long. A tagline is a short public line inspired by it. Write the positioning first, then the tagline.'],
      ['How long should a positioning statement be?', 'One to three sentences. If it needs a paragraph, it is usually trying to cover too many audiences or benefits at once.'],
      ['How often should we update our brand positioning?', 'Review it once a year, or whenever your audience, product, or competitors change significantly. Strong positioning often lasts several years with only small refinements.'],
      ['Can one company have more than one positioning statement?', 'You can have one company level statement and more specific statements for individual products or audiences, as long as they all support the main one.'],
      ['Who should be involved in writing it?', 'Founders or leadership, someone close to customers such as sales or support, and the people who will use it most, usually marketing and design. Keep the group small so decisions are quick.'],
    ],
    body: `
Before you design a logo, rewrite a website, or plan a campaign, you need to know what your brand stands for and who it is for. A brand positioning statement captures that in one or two sentences. Customers will never read it. Your team will use it every day, because it settles questions about design, messaging, and even which clients to pursue.

This guide explains what a positioning statement is, gives you a template that works, and walks through each part with practical advice and an example.
## What Is a Brand Positioning Statement?
A brand positioning statement is a short internal description of the space your brand wants to own in a customer’s mind. It defines four things: the audience you serve, the need you meet, how you are different from the alternatives, and the proof that makes your claim believable.

It is not a mission statement, which describes why the company exists, and it is not a tagline, which is written for the public. It sits between strategy and execution, turning business decisions into a clear brief that everyone who writes, designs, or sells for the brand can follow.
## Why Your Brand Needs One
Without clear positioning, every brand decision becomes a matter of opinion. One person wants the homepage to talk about price, another about quality, a third about innovation. The result is a brand that says a little about everything and nothing memorable about anything.

A strong positioning statement helps in practical ways:
- Designers use it to choose the tone of the visual identity
- Writers use it to decide what to say first on every page
- Sales teams use it to explain quickly why you are different
- Leadership uses it to judge new products, partnerships, and campaigns

It is the foundation of any brand strategy framework, because every later choice can be checked against it.
## A Positioning Statement Template That Works
The most widely used structure comes from Geoffrey Moore’s book *Crossing the Chasm*. It is simple, and that is its strength. Each part forces a decision you might otherwise avoid.
> For [target audience] who [need or problem], [brand] is the [category] that [main benefit]. Unlike [main alternative], we [key difference], because [reason to believe].
Fill it in slowly. The first draft will be too broad. That is normal.
## How to Fill In Each Part
### Target Audience
Pick one specific group. “Small businesses” is too broad. “Founders of early stage SaaS companies preparing their first funding round” gives you someone to design for. You can still serve others. You are simply choosing who to speak to first.
### Need or Problem
Describe the problem in your customer’s words, not yours. Listen to sales calls, read reviews, and look at the questions people ask before they buy. The language you find there is usually more persuasive than anything written in a meeting.
### Category
Name the category people already understand: design studio, accounting software, coffee subscription. If you invent a new category, people have to work out what you are before they can decide whether they want it.
### Main Benefit
Choose the one outcome customers care about most. Not a list of features, but a result: launch faster, save hours every week, look established from day one.
### Main Alternative and Key Difference
Name what customers would choose if you didn’t exist. That might be a competitor, a freelancer, an in-house team, or doing nothing. Then state the one thing you do differently that matters to them. This is the heart of brand differentiation.
### Reason to Believe
Back up the benefit with something concrete: a process, a team, results, years of focus, or a specific guarantee. Without proof, a benefit is only a claim.
## Positioning Statement Checklist
| Part | Weak Version | Strong Version |
| Audience | Small businesses | Founders of early stage SaaS companies |
| Need | Need a better brand | Need to look credible to investors and first customers |
| Category | Creative partner | Product design studio |
| Benefit | High quality work | Launch ready product in weeks |
| Difference | We care about clients | Brand, UX, and development in one team |
| Proof | Years of experience | A repeatable launch process used on every project |
## A Worked Example
Here is a complete statement for a made up studio called Northlight:

For founders of early stage SaaS companies who need to look credible to investors and first customers, Northlight is the product design studio that turns rough prototypes into launch ready products in weeks. Unlike freelancers working alone, we bring brand, UX, and development together in one team, because we use the same proven launch process on every project.

Notice what it leaves out. It doesn’t mention every service, every industry, or every value. It makes one clear promise to one clear audience.
## Brand Positioning Examples: Common Mistakes
When teams share their first draft, the same issues appear again and again:
- Trying to serve everyone, which means the statement speaks to no one
- Listing several benefits instead of choosing the most important one
- Using vague words like “innovative”, “quality”, or “passionate” that any brand could claim
- Describing what you do instead of what the customer gets
- Making claims with no proof behind them

A useful test: if your statement would still be true after swapping in a competitor’s name, it isn’t positioning yet. Keep narrowing until it only fits you.
## How to Test Your Positioning Statement
Before you build anything on it, check that it holds up:
1. Read it to three or four real customers. If they say “that’s exactly us”, you are close.
2. Ask your sales team whether it matches the reasons people actually buy.
3. Compare it side by side with your two closest competitors’ websites.
4. Check that every word is specific enough to guide a design or copy decision.
5. Rewrite it until it passes all four checks.
## Where Your Positioning Goes Next
Once the statement is agreed, it becomes the brief for almost everything else. It shapes your tagline, the first lines of your homepage, your visual identity, the way you introduce yourself in a pitch, and which projects you say yes to. Share it with everyone who represents the brand, and revisit it whenever the business changes direction.
## How Clear Positioning Supports SEO and AI Search
Clear positioning also makes your brand easier for search engines and AI answer tools to understand. When your website consistently describes the same audience, category, and benefit, those tools can connect your brand to the right questions and recommend it more confidently. Vague, inconsistent messaging does the opposite. It leaves machines, like people, unsure what you actually do.
!cta Need help defining your positioning before a rebrand? We run short brand strategy workshops with your team. | Start a Project | /contact/
`,
  },

  'usability-testing-small-budget': {
    slug: 'usability-testing-on-a-budget',
    title: 'Usability Testing On A Small Budget',
    excerpt: 'Learn how to run usability testing on a budget with five users, a simple script, and remote tools, then turn what you see into clear design fixes.',
    seo: {
      title: 'Usability Testing on a Budget: A Practical Guide | Waymarks',
      description: 'Learn how to run usability testing on a budget with five users, a simple script, and remote tools, then turn what you see into clear design fixes.',
      focusKeyword: 'usability testing on a budget',
      keywords: ['remote usability testing', 'user testing methods', 'usability test script', 'how many users to test'],
    },
    faq: [
      ['How many users do I need for a usability test?', 'Five people per round is a good starting point. Nielsen Norman Group research found that small groups uncover most of the common problems, and several small rounds teach you more than one large study.'],
      ['How much does usability testing cost?', 'A basic remote round can cost little more than participant incentives and a few hours of team time. Costs rise if you use a recruiting service, test with specialist audiences, or hire an external researcher.'],
      ['Can I test before anything is built?', 'Yes. Testing a clickable prototype is one of the cheapest ways to find problems, because changing a prototype takes minutes while changing built code takes days.'],
      ['Should I pay participants?', 'Yes. A small thank you such as a gift card shows respect for their time and makes recruiting much easier. The right amount depends on your audience and region.'],
      ['What is the difference between moderated and unmoderated testing?', 'In moderated testing, a facilitator runs each session live and can ask follow up questions. In unmoderated testing, participants complete tasks on their own while software records them. Moderated sessions give richer insight; unmoderated ones are faster to run at scale.'],
      ['How often should we run usability tests?', 'Little and often works best. A small round every few weeks during design and development catches problems while they are still cheap to fix.'],
    ],
    body: `
Usability testing sounds like something only large companies can afford: research labs, one way mirrors, and specialist teams. In reality, the most useful version costs very little. If you can run a video call and share a prototype, you can run usability testing on a budget and learn more in an afternoon than in weeks of internal debate.

This guide shows you how to plan, run, and learn from a small usability study, step by step.
## What Is Usability Testing?
Usability testing is a research method where real people try to complete realistic tasks with your website, app, or prototype while you observe. The goal is not to ask whether they like the design. It is to see where they succeed, where they hesitate, and where they get stuck.

It is one of the most direct user testing methods available, because it replaces opinions with evidence. Instead of arguing about whether a button is clear, you watch five people try to find it.
## Why Usability Testing on a Budget Works
Teams often delay testing because they think it needs a large sample, special equipment, or a dedicated researcher. None of these is required for useful results.

Nielsen Norman Group has long recommended testing with around five users per round. Small groups tend to reveal most of the obvious problems, and running several small rounds as you improve the design is more useful than one large study. Combined with free or low cost video tools, that makes usability testing one of the best value activities in any project.
## What You Need to Get Started
- A clickable prototype or a working version of the product
- A video call tool that lets participants share their screen
- Five people who match your real users
- A short usability test script with three to five tasks
- One person to lead the session and, ideally, one to take notes
- A simple thank you for participants, such as a gift card
## How Many Users to Test
| Situation | Recommended Participants | Why |
| Early prototype check | 5 | Finds the most obvious problems quickly |
| Two distinct user groups | 3 to 5 per group | Different groups often struggle in different places |
| Before a major launch | 5 per round, 2 to 3 rounds | Confirms fixes and catches new issues |
| Comparing two designs | 8 to 10 or more | Enough sessions to see a real difference |
## Step 1: Recruit the Right People
Testing with colleagues or friends is better than nothing, but they already know too much. Look for people who match your audience: existing customers, people from your mailing list, or users recruited through a testing service.

A short screener helps you avoid the wrong participants. Ask one or two questions that confirm they fit, such as their role, how often they shop online, or which tools they already use. Schedule a couple of backups, because some people will cancel.
## Step 2: Write a Usability Test Script
A usability test script keeps sessions consistent, so you can compare what different people did. It usually has four parts:
1. A short introduction explaining that you are testing the design, not the person
2. A few warm up questions about their background
3. Three to five realistic tasks
4. A few closing questions about their overall experience

Good tasks describe a goal, not the steps. Instead of “Click Pricing and choose the middle plan”, say “You run a team of ten. Find out how much this would cost you each month.” That way you see how people actually look for information.
## Step 3: Run the Session
Introduce yourself, ask for permission to record, and remind the participant there are no wrong answers. Ask them to think out loud as they work. Then give the first task and stay quiet.

The hardest part of usability testing is not helping. When someone gets stuck, resist the urge to explain. Instead ask neutral questions like “What are you looking for?” or “What would you expect to happen?” Most sessions take 30 to 45 minutes.

Note where people:
- Hesitate before clicking
- Click something unexpected first
- Use words that differ from your labels
- Say they expected to find something that isn’t there
- Give up or ask for help
## Remote Usability Testing vs In Person
Remote usability testing has become the default for most teams, and for good reason. It is cheaper, faster to schedule, and lets you reach people anywhere. In person sessions still have a place, especially for physical products, complex workflows, or audiences who are less comfortable with technology.
| Method | Best For | Trade Off |
| Remote moderated | Most websites and apps | Depends on participant’s connection and setup |
| Remote unmoderated | Quick checks of simple tasks | No chance to ask follow up questions |
| In person moderated | Complex flows and specialist audiences | More time and cost per session |
## Step 4: Turn Notes Into Fixes
After all five sessions, list every problem you observed and how many people ran into it. Group similar issues together, then rank them by frequency and severity. A problem that stopped three people from finishing a task matters more than a cosmetic issue one person mentioned.

Fix the top three issues first, then test again with a new group. Each round makes the product noticeably easier to use, and the improvements are easy to show to stakeholders because you have recordings of the before.
## Common Mistakes to Avoid
- Leading participants with questions like “Was that easy?”
- Testing only with internal staff or friends
- Writing tasks that give away the answer in their wording
- Running one big study instead of several small rounds
- Collecting findings but never scheduling the fixes
## How Usability Testing Supports SEO and AI Search
Pages that are easy to use tend to perform better in search too. When people find what they need quickly, they stay longer and are less likely to bounce back to the results page. Usability testing also reveals the exact words people use to describe their problems, which is valuable for headings, page titles, and FAQ content that search engines and AI answer tools can match to real questions.
!cta Want us to plan and run a round of usability testing for your product? We share clear findings and fixes. | Start a Project | /contact/
`,
  },

  'what-makes-a-website-fast': {
    slug: 'website-speed-optimization',
    title: 'What Makes A Website Load Fast',
    excerpt: 'Learn the website speed optimization steps that matter most, from images and fonts to scripts and Core Web Vitals, and how to keep your site fast.',
    seo: {
      title: 'Website Speed Optimization: What Really Matters | Waymarks',
      description: 'Learn the website speed optimization steps that matter most, from images and fonts to scripts and Core Web Vitals, and how to keep your site fast.',
      focusKeyword: 'website speed optimization',
      keywords: ['Core Web Vitals', 'PageSpeed Insights', 'image optimization', 'Largest Contentful Paint'],
    },
    faq: [
      ['What are Core Web Vitals?', 'They are three measures Google uses to assess page experience: Largest Contentful Paint for loading (2.5 seconds or less is good), Interaction to Next Paint for responsiveness (200 milliseconds or less), and Cumulative Layout Shift for visual stability (0.1 or less).'],
      ['Does website speed affect SEO?', 'Yes. Page experience, including Core Web Vitals, is one of many signals Google uses. Speed also affects bounce rates and conversions directly, which often matters even more than rankings.'],
      ['What is a good PageSpeed Insights score?', 'A score of 90 or above is considered good. The score is a lab estimate, though. The real-user Core Web Vitals data shown for busier pages is a better guide to what visitors actually experience.'],
      ['What slows down a website the most?', 'Large images, too many font files, and heavy third party scripts such as chat widgets, trackers, and ad tags are the most common causes.'],
      ['Is my hosting the reason my site is slow?', 'Sometimes, but usually not first. Fix images, fonts, and scripts, then look at hosting, caching, and a content delivery network.'],
      ['How often should we check website speed?', 'Check key pages after every significant release and review them at least monthly. Speed tends to slip gradually as new content and tools are added.'],
    ],
    body: `
A fast website feels trustworthy. A slow one feels broken, even when everything technically works. Speed affects how long people stay, whether they buy or enquire, and how search engines rank your pages. The good news is that most slow websites share the same few causes, and website speed optimization usually doesn’t require a rebuild.

This guide explains how speed is measured, what slows sites down most, and the practical steps that make the biggest difference.
## What Is Website Speed Optimization?
Website speed optimization is the process of making pages load, respond, and settle as quickly as possible for real visitors. It covers everything from image sizes and font loading to scripts, caching, and hosting.

The goal is not a perfect score in a testing tool. It is a page that shows its main content quickly, reacts instantly when someone taps or clicks, and doesn’t jump around while it loads, on the devices and connections your visitors actually use.
## Why Speed Matters for Users and Revenue
People judge a website within moments of arriving. If the page is blank or shifting, many leave before it finishes loading, and they rarely come back. Slow pages also make every later interaction feel heavier, from browsing products to completing a form.

Speed matters most on mobile, where more than half of web traffic now happens, often on slower connections and less powerful devices. A site that feels fine on a new laptop can be frustrating on a mid range phone.
## How Google Measures Speed: Core Web Vitals
Google uses three Core Web Vitals to measure real world page experience:
| Metric | What It Measures | Good Score |
| Largest Contentful Paint (LCP) | How quickly the main content appears | 2.5 seconds or less |
| Interaction to Next Paint (INP) | How quickly the page responds to taps and clicks | 200 milliseconds or less |
| Cumulative Layout Shift (CLS) | How much the layout moves while loading | 0.1 or less |
Interaction to Next Paint replaced the older First Input Delay metric in March 2024. You can check all three in Google PageSpeed Insights, which shows lab results for any page and real visitor data for pages with enough traffic. Always start with the mobile results.
## 1. Optimize Images
Images are the most common reason a page is slow. A single photo straight from a camera or stock library can be several megabytes, far more than a phone needs.

Image optimization steps that make the biggest difference:
- Use modern formats such as WebP or AVIF
- Serve different sizes for different screens with srcset, so phones don’t download desktop images
- Compress images to the lowest quality that still looks sharp
- Lazy load images below the first screen
- Set a width and height on every image so the layout doesn’t jump
- Load the main hero image early, because it is often the Largest Contentful Paint element
## 2. Load Fonts Efficiently
Custom fonts make a brand recognisable, but each weight and style is another file to download. Many sites load six or more font files when two or three would do.
1. Use only the weights you actually need
2. Host fonts on your own domain where possible
3. Preload the main font so text appears quickly
4. Use font-display: swap so text is visible while fonts load
5. Consider system fonts for supporting text
## 3. Control Third Party Scripts
Every analytics tool, chat widget, heatmap, and advertising pixel adds JavaScript that competes with your own page for the browser’s attention. Over time these build up, and they are a common reason for poor responsiveness scores.
- List every third party script and remove the ones nobody uses
- Load non essential scripts after the page is usable
- Split large scripts so each page loads only what it needs
- Review tag manager containers every few months

Tag managers make it easy to add tools without a developer. That is useful, but it is also how many sites slowly get slower.
## 4. Prevent Layout Shifts
Few things are more frustrating than tapping a button just as the page jumps and you hit something else. Layout shifts usually come from images without dimensions, banners or embeds that load late, and fonts that change size when they arrive. Reserve space for anything that loads after the first paint, and avoid inserting content above what people are already reading.
## 5. Improve Hosting and Caching
Once the page itself is lean, look at how it is delivered:
- Enable compression such as Gzip or Brotli on the server
- Set long cache lifetimes for images, fonts, and versioned files
- Use a content delivery network to serve files from locations close to visitors
- Serve static HTML where possible instead of building pages on every request

Static pages, like the ones we build for most marketing websites, are especially easy to serve quickly and cheaply.
## Website Speed Optimization Checklist
| Area | Check | Impact |
| Images | Modern formats, correct sizes, lazy loading | High |
| Hero image | Preloaded and properly sized | High |
| Fonts | Two or three files, preloaded, swap enabled | Medium |
| Scripts | Unused tools removed, others deferred | High |
| Layout | Dimensions on images and embeds | Medium |
| Server | Compression, caching, CDN | Medium |
## How to Keep Your Site Fast
Speed tends to slip over time as new features, images, and tools are added. The easiest way to protect it is to set a performance budget, such as a maximum page weight and a minimum PageSpeed score for key templates, and check it before every release. It is far easier to keep a site fast than to make a slow one fast again.
## How Website Speed Supports SEO and AI Search
Core Web Vitals are part of Google’s page experience signals, so faster pages have an advantage when content quality is similar. Speed also helps crawlers. Lightweight, well structured pages are quicker for search engines and AI tools to fetch and interpret, which makes it easier for your content to be indexed, understood, and cited.
!cta Is your website slower than it should be? We can audit it and fix the biggest problems first. | Start a Project | /contact/
`,
  },

  'plan-an-mvp-without-overbuilding': {
    slug: 'how-to-scope-an-mvp',
    title: 'How To Scope An MVP Without Overbuilding',
    excerpt: 'Learn how to scope an MVP that tests one clear idea, with a simple feature prioritization method, a realistic timeline, and the metrics that prove it works.',
    seo: {
      title: 'How to Scope an MVP Without Overbuilding | Waymarks',
      description: 'Learn how to scope an MVP that tests one clear idea, with a simple feature prioritization method, a realistic timeline, and the metrics that prove it works.',
      focusKeyword: 'how to scope an MVP',
      keywords: ['minimum viable product features', 'MVP development process', 'feature prioritization', 'product validation'],
    },
    faq: [
      ['What is an MVP?', 'A minimum viable product is the smallest version of a product that can test your most important assumption with real users. It does one job well enough that people can use it and give you meaningful feedback.'],
      ['How long should it take to build an MVP?', 'Many MVPs can be designed and built in roughly two to four months. If your plan takes much longer, the scope is usually too big for a first version.'],
      ['How many features should an MVP have?', 'There is no fixed number. It should include only the features needed to complete the core job end to end. For many products that is a handful of screens and one main workflow.'],
      ['Should an MVP look unfinished?', 'No. An MVP should do less, not look worse. A focused product with a clean, trustworthy design gives you more reliable feedback than a rough one.'],
      ['What is the difference between an MVP and a prototype?', 'A prototype simulates the product so you can test ideas and usability. An MVP is a working product that real users can use for real, which lets you test demand and behaviour.'],
      ['What happens after the MVP launches?', 'You measure how people use it, talk to early users, and decide what to improve, add, or remove. The MVP is the start of learning, not the end of the project.'],
    ],
    body: `
A minimum viable product is meant to be small. Yet many first versions take a year to build, cost far more than planned, and launch with features nobody uses. The cause is almost always the same: the team tried to build a smaller version of everything instead of a complete version of one thing. Knowing how to scope an MVP is the skill that prevents this.

This guide walks through a practical process for deciding what goes into your first version, what waits, and how you will know whether it worked.
## What Is an MVP?
An MVP, or minimum viable product, is the smallest version of a product that can test your most important assumption with real users. That assumption is usually some form of: people have this problem, and they will use or pay for this solution.

The idea was popularised by Eric Ries in *The Lean Startup*, which describes a build, measure, learn loop. You build something small, measure how people respond, learn from it, and use that learning to decide what to build next. The MVP is the first turn of that loop.
## Why MVPs Get Overbuilt
Overbuilding rarely comes from carelessness. It usually comes from good intentions:
- Fear that a simple product will look unprofessional
- Every stakeholder adding one “essential” feature
- Planning for scale before there are users to scale for
- Building admin tools, settings, and integrations before they are needed
- Confusing what the product could become with what it needs to prove first

Each addition seems reasonable on its own. Together they push launch back by months and make it harder to learn anything clear.
## Step 1: Define the Core Job
Before listing features, write one sentence describing the job your product does for its users. For example: “Help small clinics fill cancelled appointments automatically.” That sentence becomes the filter for every scoping decision.

If a feature doesn’t directly help with the core job, it isn’t part of the MVP, however good the idea is.
## Step 2: Map the Main User Journey
Sketch the shortest path a user takes to get value from your product, from first visit to the moment the core job is done. For a booking product that might be: sign up, connect a calendar, receive a cancellation, offer the slot, confirm the booking.

Every step on that path needs to work. Steps off the path can usually wait.
## Step 3: Prioritize Features
List every feature idea the team has, then sort each one. A simple feature prioritization method is the MoSCoW technique:
| Group | Meaning | MVP Decision |
| Must have | The core job fails without it | Build it now |
| Should have | Valuable, but users can manage without it at first | Plan for the next release |
| Could have | Nice to have if time allows | Keep on the backlog |
| Won’t have (this time) | Deliberately excluded | Revisit after launch |
Be strict. Most teams find their first “must have” list is two or three times too long. Admin dashboards, advanced settings, multiple user roles, and integrations can often be handled manually in the early days.
## Step 4: Do Things That Don’t Scale
In the beginning, it is fine to handle some work by hand. Onboarding can be a call instead of a self serve flow. Reports can be sent by email instead of shown in a dashboard. Billing can start with simple invoices.

This approach lets you launch sooner and teaches you which tasks are worth automating, based on real usage instead of guesses.
## Step 5: Design the Key Flow Properly
Doing less doesn’t mean doing it badly. The few screens in your MVP should be clear, fast, and trustworthy, because people judge credibility in seconds. A confusing MVP tells you nothing, because you can’t tell whether people rejected the idea or simply got lost.

Spend your design effort on the core journey: signing up, completing the main task, and seeing the result.
## Step 6: Decide How You Will Measure Success
Product validation depends on knowing, before launch, which numbers will tell you whether the idea works. Choose one or two:
- Activation: how many sign ups complete the core task
- Retention: how many come back in the second or third week
- Conversion: how many start paying, or agree to
- Referral: how many invite someone else

Set up analytics for these from day one, so you learn from the very first user.
## A Realistic MVP Development Process
| Phase | Typical Length | Output |
| Discovery and scoping | 1 to 3 weeks | Core job, user journey, prioritized feature list |
| UX and UI design | 2 to 4 weeks | Tested prototype of the main flow |
| Development | 6 to 10 weeks | Working product with analytics |
| Launch and learn | Ongoing | Usage data, interviews, next priorities |
Timelines vary with complexity, but if your plan is far longer than this, revisit the must have list before anything else.
## How to Scope an MVP: Common Mistakes to Avoid
- Treating the MVP as a cheaper version of the final product
- Skipping user research because “we already know what they want”
- Building for thousands of users before you have ten
- Launching without analytics
- Leaving no time or budget for the second version
## How a Focused MVP Supports SEO and AI Search
A focused product is also easier to explain. When your MVP solves one clear problem, your landing page can describe it in plain, specific language that matches what people search for and what AI answer tools look for when recommending solutions. Clear positioning from day one helps the right early users find you, which is exactly what an MVP needs.

Learn more about how we approach this on our [MVP development](/services/mvp-development/) page.
!cta Planning an MVP and not sure what to cut? We help founders scope, design, and launch focused first versions. | Start a Project | /contact/
`,
  },

  'seo-and-aeo': {
    slug: 'seo-and-aeo',
    title: 'SEO And AEO: Getting Found In Search And AI Answers',
    excerpt: 'Learn how SEO and AEO work together, what answer engine optimization changes, and the practical steps that help your content appear in search and AI answers.',
    seo: {
      title: 'SEO and AEO: How to Rank in Search and AI Answers | Waymarks',
      description: 'Learn how SEO and AEO work together, what answer engine optimization changes, and the practical steps that help your content appear in search and AI answers.',
      focusKeyword: 'SEO and AEO',
      keywords: ['answer engine optimization', 'AI search optimization', 'generative engine optimization', 'structured data for SEO'],
    },
    faq: [
      ['What is the difference between SEO and AEO?', 'SEO helps your pages rank in search results so people click through to your site. AEO helps your content be understood, quoted, and recommended when a search engine or AI assistant answers a question directly.'],
      ['Does AEO replace SEO?', 'No. AEO builds on SEO. AI answer tools still rely on content that can be crawled, indexed, and trusted, so strong technical SEO and helpful content remain the foundation.'],
      ['What is generative engine optimization?', 'Generative engine optimization, or GEO, is a related term for shaping content so generative AI tools such as ChatGPT, Gemini, and Perplexity understand your brand and cite it in their answers.'],
      ['Does FAQ schema still help?', 'Since 2023, Google shows FAQ rich results only for a small set of well known government and health websites. Structured data can still help search engines understand a page, but most business sites will not get FAQ snippets.'],
      ['How do I know if AI tools mention my brand?', 'Ask the main AI assistants the questions your customers ask, note whether and how your brand appears, and repeat the check every month or two. Also watch for referral traffic from AI tools in your analytics.'],
      ['How long does it take to see results?', 'Technical fixes can show in search data within weeks. Building the authority that leads to consistent rankings and AI mentions usually takes several months of steady, high quality content.'],
    ],
    body: `
Search is changing. People still type questions into Google, but many now get their answer from an AI generated summary, a chat assistant, or a voice assistant before they ever click a link. That shift has introduced a new term alongside SEO: answer engine optimization, or AEO. Understanding how SEO and AEO work together is now part of being found online.

The good news is that AEO doesn’t replace what already works. The habits that make content clear and useful for people also make it easy for search engines and AI tools to understand.
## What Are SEO and AEO?
Search engine optimization (SEO) is the practice of helping your pages rank in search results so people click through to your website. It covers technical health, content quality, and authority.

Answer engine optimization (AEO) is the practice of shaping your content so search engines and AI assistants can understand it, quote it, and recommend it when they answer a question directly. It focuses on clear questions, direct answers, and trustworthy sources.

A closely related term, generative engine optimization (GEO), describes the same idea for generative AI tools such as ChatGPT, Gemini, Perplexity, and Google’s AI Overviews.
## How Search Has Changed
| Then | Now |
| Ten blue links | Links plus AI summaries and direct answers |
| Keywords matched to pages | Questions matched to clear, trusted answers |
| Clicks were the main outcome | Being cited or mentioned also builds visibility |
| One search engine dominated discovery | Search engines, chat assistants, and voice tools all answer questions |
Clicks still matter, but visibility now also includes being the source an AI tool trusts enough to quote.
## Why SEO Is Still the Foundation
AI answer tools don’t invent their knowledge from nothing. Many draw on content that search engines have already crawled, indexed, and ranked. If your site is slow, hard to crawl, or thin on useful content, it is unlikely to be chosen as a source.

That means the fundamentals still come first:
- Pages that load quickly and work well on mobile
- A clean sitemap and sensible internal links
- No accidental noindex tags or blocked pages
- Content that genuinely answers the questions your audience asks
## 1. Answer One Clear Question Per Page
Pages that try to cover everything often answer nothing well. Give each important page a clear purpose and a question it answers. Put the direct answer near the top, then go into detail.

A useful test is to read your first paragraph on its own. If it would make sense quoted in an AI answer, you are on the right track.
## 2. Use Structure Machines Can Follow
Answer engine optimization depends on structure as much as words:
- One clear H1 and descriptive H2 and H3 headings
- Short paragraphs focused on one idea each
- Lists for steps and tables for comparisons
- Definitions that start with “X is…” for key terms
- A short FAQ section that answers common follow up questions
## 3. Add Structured Data
Structured data for SEO uses JSON-LD markup to tell search engines exactly what a page is: an article, an organization, a service, a product, or a set of questions and answers. It helps crawlers interpret your content with less guesswork.

Be realistic about what it does. Since 2023, Google shows FAQ rich results only for a small set of well known government and health websites, and it has retired HowTo rich results. Structured data is still valuable for understanding, but it isn’t a guaranteed route to special search features.
## 4. Show Experience and Expertise
Search engines and AI tools increasingly look for signals that content comes from people who know the subject. Google’s guidance on helpful content refers to experience, expertise, authoritativeness, and trust.
- Name the author or team and explain their experience
- Share real examples, processes, and lessons from your own work
- Keep important pages up to date and show when they were last updated
- Link to reliable sources when you state facts
## 5. Build Consistent Brand Signals
AI tools form a picture of your brand from everything they can find: your website, your business profiles, reviews, and mentions on other sites. Describe what you do in the same clear terms everywhere, so tools can connect your name with the right topics and questions.
## SEO and AEO Checklist
| Area | SEO Focus | AEO Focus |
| Content | Target real search topics | Answer specific questions directly |
| Structure | Headings and internal links | Definitions, lists, tables, FAQs |
| Technical | Speed, crawlability, mobile | Clean HTML and structured data |
| Trust | Backlinks and reputation | Clear authorship, sources, consistency |
| Measurement | Rankings, clicks, impressions | Mentions and citations in AI answers |
## How to Measure SEO and AEO Results
- Use Google Search Console to track impressions, clicks, and the queries you appear for
- Watch referral traffic from AI tools in your analytics, where it is identified
- Every month or two, ask the main AI assistants the questions your customers ask and note whether your brand is mentioned and how
- Track which pages earn links and citations from other sites
## Common Mistakes to Avoid
- Writing for algorithms instead of people
- Publishing many thin pages instead of fewer thorough ones
- Ignoring technical SEO because “AI search is different”
- Hiding the answer below long introductions
- Letting important pages go out of date
## Why Getting This Right Matters Now
AI answers are becoming a normal part of how people research products and services. Brands that are clear, consistent, and genuinely helpful are the ones these tools can understand and recommend. The work is the same work that has always produced good SEO, done with more attention to structure and clarity.

Learn how we approach this on our [digital growth](/services/digital-growth/) page.
!cta Want your content to show up in search results and AI answers? We plan and write content built for both. | Start a Project | /contact/
`,
  },

  'ai-in-design-workflow': {
    slug: 'ai-design-workflow',
    title: 'Using AI Tools In A Design Workflow',
    excerpt: 'Build an AI design workflow that works: which tasks AI speeds up, where human judgement still matters, and how to adopt AI tools safely in your team.',
    seo: {
      title: 'AI Design Workflow: Where AI Helps Designers | Waymarks',
      description: 'Build an AI design workflow that works: which tasks AI speeds up, where human judgement still matters, and how to adopt AI tools safely in your team.',
      focusKeyword: 'AI design workflow',
      keywords: ['AI tools for designers', 'AI UX research', 'generative AI design', 'design automation'],
    },
    faq: [
      ['Will AI replace designers?', 'AI is changing how designers work, not removing the need for them. Understanding people, making trade offs, and taking responsibility for a product still require human judgement.'],
      ['What are the best AI tools for designers?', 'Most teams start with a general AI assistant for writing and summarising, plus the AI features already built into the design tools they use. The best tool is the one that solves a specific, repeated task in your workflow.'],
      ['Is it safe to put client data into AI tools?', 'Only if the tool and its settings meet your client agreements and privacy rules. Remove personal data where possible, and check whether the tool uses your inputs for training.'],
      ['Can AI do user research?', 'AI can help plan studies, summarise notes, and spot themes, but it cannot replace talking to and observing real users. Synthetic or AI generated users are not a substitute for real research.'],
      ['How do we start using AI in our design team?', 'Pick one repetitive task, try one tool on it for a few weeks, agree simple rules on data and review, and share what worked before expanding.'],
      ['Does AI generated design work have copyright issues?', 'It can. Generated images and text may resemble existing work, and the legal position varies by country and tool. Review outputs carefully and check the tool’s terms before using them in client work.'],
    ],
    body: `
AI tools are now part of most design teams’ day. Used well, they remove hours of repetitive work and give designers more time for the parts of the job that need judgement. Used carelessly, they produce generic work and new risks. Building a sensible AI design workflow means knowing where these tools help, where they don’t, and how to use them responsibly.

This guide covers the practical uses we have found most valuable, the limits to watch for, and a simple way to introduce AI into your team.
## What Is an AI Design Workflow?
An AI design workflow is a design process that uses AI tools to support specific tasks, such as research synthesis, copywriting, idea generation, and quality checks, while designers stay responsible for decisions and outcomes.

It isn’t about handing the whole job to a machine. It is about identifying the slow, repetitive steps around the real design work and using AI to speed them up, so the team can spend more time understanding users and solving problems.
## Why Design Teams Are Adopting AI
Design work includes a surprising amount of repetitive effort: summarising interview notes, writing variations of microcopy, resizing assets, documenting components, and checking screens for missing states. These tasks matter, but they rarely need deep creative thinking.

AI tools for designers are good at exactly this kind of work. They can produce a first draft in seconds, which a designer then reviews, edits, and improves. The time saved goes back into research, iteration, and craft.
## Where AI Helps Most
### AI UX Research Support
After a round of user interviews, AI can help group notes into themes, pull out representative quotes, and draft a first summary. A researcher still checks the summary against the recordings, but the first draft takes minutes instead of hours. AI can also help draft interview guides and survey questions for a researcher to refine.
### Writing and Microcopy
Button labels, error messages, empty states, and onboarding hints are often written last and in a hurry. AI is useful for generating several options quickly, which a designer or writer then edits to match the brand’s voice and the product’s context.
### Ideas and Early Concepts
Generative AI design tools can create quick visual directions for moodboards, early layout ideas, and placeholder imagery. They are a starting point for discussion, not finished work.
### Quality Checks and Edge Cases
Describe a screen or flow and ask what could go wrong: no data, slow connection, an error, a very long name, a first time user. AI is good at listing edge cases a busy team might miss.
### Design Automation and Documentation
AI features in design and development tools can help rename layers, generate component descriptions, draft documentation, and translate design tokens into code formats. This kind of design automation keeps systems tidy with less manual effort.
## AI Tasks at a Glance
| Task | How AI Helps | What a Human Still Does |
| Research synthesis | Groups notes and drafts themes | Checks against recordings and decides what matters |
| Microcopy | Suggests multiple options quickly | Edits for voice, clarity, and context |
| Early concepts | Generates visual directions | Chooses a direction that fits the brand and users |
| Edge cases | Lists possible states and failures | Designs the right response for each |
| Documentation | Drafts descriptions and specs | Reviews accuracy and keeps it current |
## Where AI Doesn’t Help
AI has clear limits, and knowing them protects the quality of your work:
- **Understanding real users.** AI can summarise what people said, but it can’t replace talking to them and watching them use your product.
- **Brand judgement.** Generated work tends toward the average. A distinctive brand needs deliberate, opinionated choices.
- **Accessibility decisions.** AI suggestions can miss contrast, focus order, or screen reader issues. They need proper checking.
- **Accountability.** Someone on the team must own every decision that ships.
## Risks to Manage
Before adopting any tool widely, agree how your team will handle a few important risks:
- **Client and user data.** Check your agreements, privacy rules, and the tool’s data settings before pasting research notes or customer information. Remove personal details wherever you can.
- **Originality and rights.** Generated images and text can resemble existing work, and the legal position differs by country and tool. Review outputs carefully.
- **Accuracy.** AI can state incorrect information confidently. Verify facts before they reach a client or a live product.
- **Sameness.** Over relying on the same tools can make work look like everyone else’s.
## How to Introduce AI Into Your Team
1. Pick one repetitive task that takes too long, such as summarising interview notes.
2. Try one tool on that task for a few weeks.
3. Agree simple rules on data, review, and when not to use AI.
4. Compare time saved and quality against your usual process.
5. Share what worked, then move on to the next task.

Starting small makes it easy to see real value and avoids adding tools nobody uses.
## How We Use AI at Waymarks
In our projects, AI helps us move faster through research synthesis, first drafts of copy, and quality checks. The core of the work hasn’t changed: understanding the problem, talking to users, designing with intent, and testing with real people. AI makes the supporting work lighter so more time goes into the parts clients actually notice.
## How an AI Design Workflow Supports SEO and AI Search
AI can also help teams produce clearer, better structured content, such as consistent headings, plain language summaries, and complete FAQ sections, which makes pages easier for search engines and AI answer tools to understand. The same rule applies as everywhere else: people review and edit the output, so the content stays accurate, specific, and genuinely useful.
!cta Want to design faster without losing quality? Talk to us about your next product or website. | Start a Project | /contact/
`,
  },
}
