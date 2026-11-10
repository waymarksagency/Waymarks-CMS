// Extra sections that bring every article past 1,200 words of main text.
// Each is inserted just before the article's "How ... SEO and AI" section.
// The supplied articles (discovery, design systems) keep every original sentence; these are additions only.
export const EXTENSIONS = {
  'why-start-with-discovery': `
## What a Typical Discovery Timeline Looks Like
Discovery works best as a short, structured sprint with a clear end date. The exact plan depends on the project, but most follow a similar rhythm.
| Week | Focus | Key Activities |
| Week 1 | Alignment | Kickoff workshop, stakeholder interviews, analytics and content review |
| Week 2 | Research | User interviews, competitor benchmarking, technical audit |
| Week 3 | Definition | Personas, journey maps, information architecture, feature prioritization |
| Final days | Handover | Scope matrix, technical specification, wireframes, and a roadmap for the next phase |
Smaller website projects can compress this into one or two weeks. Larger platforms may need extra time for technical investigation or additional user groups.
## Signs Your Project Needs a Discovery Phase
Not every change needs a full discovery sprint. A small content update or a minor bug fix certainly doesn’t. But a UX project discovery phase is worth the time if any of these sound familiar:
- Different stakeholders describe the goal of the project in different ways
- You are not sure which features matter most to users
- You are entering a new market or launching a new product
- A previous version did not perform the way you hoped
- The project depends on systems or integrations nobody has reviewed recently
- The budget feels like a guess rather than an estimate
## How to Get the Most From Discovery
Discovery is only as useful as the participation behind it. Give the team access to analytics, past research, and the people who talk to customers every day. Make decisions in the room when you can, so open questions don’t drift into the design phase. Most importantly, treat the outputs as living documents. When new information appears during design or development, update the scope and priorities rather than working around them.
`,
  'design-systems-developers-use': `
## Roll Out Your Design System in Phases
Trying to launch a complete design system in one go is one of the fastest ways to stall it. A phased rollout builds trust, because developers see value early and the system grows around real needs.
| Phase | Focus | Outcome |
| 1. Audit | Inventory existing colors, type, spacing, and components in code and design files | A clear picture of duplication and inconsistency |
| 2. Foundations | Define and ship design tokens | Consistent colors, spacing, and type across the product |
| 3. Core components | Build the five to ten components used most often | Faster builds for common screens |
| 4. Documentation | Publish usage guidance, code examples, and a changelog | Developers can self serve without asking designers |
| 5. Adoption | Migrate existing screens and track usage | The system becomes the default way to build |
Each phase should end with something developers can use immediately. If a phase only produces documents, it is too big.
## Common Mistakes When Building a Design System
Even well funded teams fall into the same traps. Watch out for these:
- Designing a large component library before checking what the product actually uses
- Naming tokens and components differently in Figma and in code
- Designing only the default state and skipping hover, focus, disabled, loading, and error states
- Publishing documentation once and never updating it
- Making the system so strict that developers have to work around it
- Leaving ownership vague, so nobody approves changes or answers questions
Avoiding these keeps the system lean, trusted, and actually used.
## Getting Buy-In From Your Team
A design system for developers is as much about people as it is about components. Involve developers from the first audit, invite them to name things, and ship improvements they asked for early on. When engineers see their own feedback in the system, they stop seeing it as a design team project and start treating it as shared infrastructure.
`,
  'brand-positioning-statement': `
## Brand Positioning vs Brand Messaging
Positioning and messaging are closely related, but they do different jobs. Positioning is the strategic decision about where your brand stands. Messaging is how you express that decision to different audiences in different places.
| | Brand Positioning | Brand Messaging |
| Audience | Internal teams | Customers and the public |
| Format | One to three sentences | Headlines, taglines, page copy, pitches |
| Changes | Rarely, after strategic review | Often, by channel and campaign |
| Purpose | Guide every brand decision | Persuade and inform specific audiences |
Get the positioning right first. Messaging written without it tends to drift, because every writer fills the gap with their own interpretation of what the brand stands for.

A practical way to connect the two is a simple message house. Put the positioning statement at the top, add three supporting messages underneath it, and list the proof points for each. Every headline, sales email, and social post can then be checked against that one page.
`,
  'usability-testing-small-budget': `
## Simple Usability Metrics to Track
Watching sessions gives you the most insight, but a few simple measures help you compare rounds and show progress to stakeholders. You don’t need specialist software to record them.
| Metric | What It Shows | How to Record It |
| Task success rate | Whether people can complete the task at all | Mark each task as completed, completed with help, or failed |
| Time on task | How much effort the task takes | Note start and end times from the recording |
| Errors | Where people go the wrong way | Count wrong clicks, dead ends, and restarts |
| Ease rating | How difficult the task felt | Ask people to rate each task from 1 (very hard) to 7 (very easy) |
With only five participants, treat these numbers as signals rather than statistics. Their real value is in comparison. If task success improves and ease ratings rise after a redesign, you have clear evidence the changes worked.
## Sharing Findings With Your Team
Findings only matter if they lead to changes. Keep your report short: the top problems, a short video clip of each one, and a recommended fix. Watching a real person struggle is far more persuasive than any written summary, so invite stakeholders to observe at least one live session whenever possible.
`,
  'what-makes-a-website-fast': `
## How to Test Website Speed the Right Way
Speed tests are only useful if they reflect what real visitors experience. A few habits make your results more reliable:
- **Test on mobile first.** Mobile results are usually slower and closer to what most visitors see.
- **Know lab data from field data.** Lab data in PageSpeed Insights comes from a simulated test. Field data, shown for pages with enough traffic, comes from real Chrome users over the previous 28 days. When they disagree, field data reflects reality.
- **Test key templates, not just the homepage.** Product pages, articles, and landing pages often have different problems.
- **Run tests more than once.** Results vary slightly between runs, so look for consistent patterns rather than single scores.
- **Test on a real device.** A mid range phone on a mobile connection is a useful reality check.
## Who Should Own Website Speed
Speed problems often fall between teams. Marketing adds tracking tools, designers add large images, and developers add features, and nobody is responsible for the combined result. Give one person clear ownership of performance, agree a simple budget, and review it whenever new tools or templates are added. That small step prevents most slowdowns from happening in the first place.

A simple performance budget might say that key pages stay under a set total weight, load no more than a fixed number of third party scripts, and keep Largest Contentful Paint at 2.5 seconds or less on mobile. Write the budget down, share it with everyone who can change the site, and treat a broken budget like any other bug that needs fixing before release.
`,
  'plan-an-mvp-without-overbuilding': `
## MVP Types That Validate Faster
An MVP doesn’t always have to be a full working product. Depending on what you need to learn, a lighter approach can answer the question in days or weeks instead of months.
| MVP Type | How It Works | Best For Testing |
| Landing page test | A page describes the product and asks people to sign up or join a waitlist | Whether people want it at all |
| Concierge MVP | You deliver the service manually for a few early customers | Whether the solution actually solves the problem |
| Wizard of Oz MVP | Users see a working product, but tasks are completed by people behind the scenes | Whether the experience works before automating it |
| Single feature MVP | A real product that does only the core job | Whether people use and return to it |
Many successful products started with one of the lighter options, then built a single feature MVP once demand was clear.
## How to Know When Your MVP Is Ready to Launch
An MVP is ready when a real user can complete the core job from start to finish without help, the experience feels trustworthy, and you can measure what happens. It doesn’t need every edge case covered or every nice to have feature. If you keep delaying launch to add one more thing, return to your core job sentence and ask whether the addition really changes what you will learn.

A short pre launch checklist helps: the core journey works on desktop and mobile, analytics events fire for each key step, there is a simple way for users to send feedback, and someone on the team is ready to respond to early users quickly. Those first conversations are often the most valuable data an MVP produces.
`,
  'seo-and-aeo': `
## How to Write Content AI Tools Can Quote
AI answer tools tend to quote passages that are self contained, specific, and clearly structured. A simple pattern works well for most informational pages:
1. **Start with a direct answer.** Open the section with one or two sentences that fully answer the question.
2. **Add context.** Explain why the answer is true, when it applies, and any important exceptions.
3. **Give specifics.** Include numbers, steps, examples, or comparisons that make the answer useful.
4. **Close the loop.** Link to related pages that go deeper, so both readers and crawlers can follow the topic.

For example, a page about pricing should state the price range in the first lines, then explain what affects it, rather than leading with a long introduction about the company. The same principle applies to service pages, guides, and FAQs.

Write in plain language and keep terminology consistent. If you call something a “discovery phase” on one page and a “scoping sprint” on another, both people and machines may struggle to connect the two.
## Keep Important Pages Fresh
Outdated content is one of the quickest ways to lose trust with readers, search engines, and AI tools alike. Prices change, processes improve, and statistics age. Review your most important pages at least twice a year:
- Check that facts, figures, and examples are still accurate
- Update screenshots and references to tools or platforms
- Add answers to new questions customers have started asking
- Show a visible “last updated” date when you make meaningful changes
- Remove or redirect pages that are no longer relevant
Fresh, accurate pages are more likely to be ranked, cited, and recommended, and they are more useful to the people who find them.
`,
  'ai-in-design-workflow': `
## Measuring Whether AI Is Actually Helping
It is easy to feel faster with AI without being faster. Track a few simple measures before and after you introduce a tool:
| Measure | What to Compare |
| Time spent | Hours on the task before and after using AI |
| Rework | How much AI output had to be rewritten or corrected |
| Quality | Review feedback, usability findings, or client comments |
| Adoption | How many team members still use the tool after a month |
If a tool saves time but creates extra rework, the gain may be smaller than it looks. If people quietly stop using it, find out why before rolling it out further.
## A Simple AI Usage Policy for Design Teams
A one page policy prevents most problems. It should cover which tools are approved, what data must never be entered, how AI generated work is reviewed before it reaches clients, and when to tell clients that AI was used. Keep it short, review it every few months, and update it as tools and regulations change.
## Skills Designers Need Alongside AI
As AI takes on more routine production work, the skills that set designers apart become more important, not less:
- **Research and empathy.** Understanding real people, their context, and their constraints
- **Critical review.** Spotting what is wrong, generic, or inaccessible in generated output
- **Problem framing.** Asking the right question before generating any answers
- **Communication.** Explaining design decisions to clients, developers, and stakeholders
- **Systems thinking.** Keeping products consistent as they grow
Teams that invest in these skills get far more from AI tools, because they know what good looks like and can steer the output toward it.

The most effective designers we work with treat AI as a fast, tireless junior collaborator: useful for first drafts and repetitive tasks, but always guided, checked, and improved by someone who understands the user and the business.
`,
}
