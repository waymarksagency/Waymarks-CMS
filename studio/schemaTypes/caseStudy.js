import {defineType, defineField, defineArrayMember} from 'sanity'
import {CaseIcon} from '@sanity/icons'
import {SERVICES} from './services'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'story', title: 'Story'},
    {name: 'results', title: 'Results'},
    {name: 'settings', title: 'Settings & SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', group: 'overview', description: 'Example: "A booking app that cut no-shows by 30%"', validation: (r) => r.required().max(110)}),
    defineField({name: 'slug', title: 'Page address', type: 'slug', group: 'overview', description: 'waymarks.agency/case-studies/your-address/', options: {source: 'title', maxLength: 80}, validation: (r) => r.required()}),
    defineField({name: 'client', title: 'Client name', type: 'string', group: 'overview', validation: (r) => r.required()}),
    defineField({name: 'clientLogo', title: 'Client logo (optional)', type: 'figure', group: 'overview'}),
    defineField({name: 'industry', title: 'Industry', type: 'string', group: 'overview', description: 'Example: "Healthcare". Used for the filter on the case studies page.', validation: (r) => r.required()}),
    defineField({name: 'location', title: 'Client location (optional)', type: 'string', group: 'overview'}),
    defineField({
      name: 'services', title: 'Services we provided', type: 'array', group: 'overview',
      of: [defineArrayMember({type: 'string'})], options: {list: SERVICES}, validation: (r) => r.required().min(1),
    }),
    defineField({name: 'duration', title: 'Project length', type: 'string', group: 'overview', description: 'Example: "12 weeks"'}),
    defineField({name: 'year', title: 'Year', type: 'number', group: 'overview'}),
    defineField({name: 'summary', title: 'Short summary', type: 'text', rows: 3, group: 'overview', description: 'One or two sentences for cards and Google.', validation: (r) => r.required().max(240)}),
    defineField({name: 'mainImage', title: 'Cover image', type: 'figure', group: 'overview', validation: (r) => r.required()}),

    defineField({name: 'challenge', title: 'The challenge', type: 'blockContent', group: 'story', validation: (r) => r.required()}),
    defineField({name: 'approach', title: 'Our approach', type: 'blockContent', group: 'story'}),
    defineField({name: 'solution', title: 'The solution', type: 'blockContent', group: 'story'}),
    defineField({name: 'gallery', title: 'Project images', type: 'array', group: 'story', of: [defineArrayMember({type: 'figure'})], options: {layout: 'grid'}}),

    defineField({
      name: 'metrics', title: 'Results in numbers', type: 'array', group: 'results',
      description: 'Two to four real results. Example: value "38%", label "more sign-ups in the first month".',
      of: [defineArrayMember({
        type: 'object', name: 'metric',
        fields: [
          defineField({name: 'value', title: 'Number', type: 'string', validation: (r) => r.required().max(12)}),
          defineField({name: 'label', title: 'What it means', type: 'string', validation: (r) => r.required().max(80)}),
        ],
        preview: {select: {title: 'value', subtitle: 'label'}},
      })],
      validation: (r) => r.max(4),
    }),
    defineField({name: 'results', title: 'Results story', type: 'blockContent', group: 'results'}),
    defineField({
      name: 'testimonial', title: 'Client quote', type: 'object', group: 'results',
      fields: [
        defineField({name: 'quote', title: 'Quote', type: 'text', rows: 4}),
        defineField({name: 'name', title: 'Name', type: 'string'}),
        defineField({name: 'role', title: 'Role and company', type: 'string'}),
        defineField({name: 'photo', title: 'Photo', type: 'figure'}),
      ],
    }),

    defineField({name: 'liveUrl', title: 'Live project link (optional)', type: 'url', group: 'settings'}),
    defineField({name: 'featured', title: 'Show first on the case studies page', type: 'boolean', group: 'settings', initialValue: false}),
    defineField({name: 'publishedAt', title: 'Publish date', type: 'datetime', group: 'settings', initialValue: () => new Date().toISOString(), validation: (r) => r.required()}),
    defineField({name: 'seo', title: 'Search engine settings', type: 'seo', group: 'settings'}),
  ],
  orderings: [{title: 'Newest first', name: 'newest', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'client', media: 'mainImage'}},
})
