import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'
import {SERVICES} from './services'

export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'extras', title: 'Takeaways & FAQ'},
    {name: 'settings', title: 'Settings & SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', group: 'content', validation: (r) => r.required().max(110)}),
    defineField({
      name: 'slug', title: 'Page address', type: 'slug', group: 'content',
      description: 'The end of the link: waymarks.agency/blog/your-address/. Click Generate to make it from the title.',
      options: {source: 'title', maxLength: 80}, validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt', title: 'Short summary', type: 'text', rows: 3, group: 'content',
      description: 'One or two sentences. Shown on blog cards, under the title and in Google.',
      validation: (r) => r.required().max(220),
    }),
    defineField({name: 'mainImage', title: 'Cover image', type: 'figure', group: 'content', description: 'Wide image, at least 1600 × 900 pixels.', validation: (r) => r.required()}),
    defineField({
      name: 'categories', title: 'Topics', type: 'array', group: 'content',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
      validation: (r) => r.required().min(1).max(3),
    }),
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}], group: 'content', validation: (r) => r.required()}),
    defineField({name: 'body', title: 'Article', type: 'blockContent', group: 'content', validation: (r) => r.required()}),

    defineField({
      name: 'keyTakeaways', title: 'Key takeaways', type: 'array', group: 'extras',
      description: 'Three to five short points shown in an "In short" box at the top. Helps readers and AI search answers.',
      of: [defineArrayMember({type: 'string'})], validation: (r) => r.max(6),
    }),
    defineField({
      name: 'faq', title: 'Questions and answers', type: 'array', group: 'extras',
      description: 'Optional. Shown at the end of the article and added to Google as FAQ data.',
      of: [defineArrayMember({
        type: 'object', name: 'qa',
        fields: [
          defineField({name: 'q', title: 'Question', type: 'string', validation: (r) => r.required()}),
          defineField({name: 'a', title: 'Answer', type: 'text', rows: 3, validation: (r) => r.required()}),
        ],
        preview: {select: {title: 'q', subtitle: 'a'}},
      })],
    }),

    defineField({name: 'publishedAt', title: 'Publish date', type: 'datetime', group: 'settings', initialValue: () => new Date().toISOString(), validation: (r) => r.required()}),
    defineField({name: 'updatedAt', title: 'Last updated (optional)', type: 'datetime', group: 'settings', description: 'Set this when you make a meaningful update. It shows as "Updated" on the article.'}),
    defineField({
      name: 'featured', title: 'Feature on the blog page', type: 'string', group: 'settings',
      options: {list: [{title: 'Not featured', value: 'none'}, {title: 'Main featured article (large)', value: 'main'}, {title: 'Side featured article', value: 'side'}], layout: 'radio'},
      initialValue: 'none',
    }),
    defineField({
      name: 'relatedService', title: 'Related service', type: 'string', group: 'settings',
      description: 'Adds a link to this service at the end of the article.',
      options: {list: SERVICES},
    }),
    defineField({name: 'seo', title: 'Search engine settings', type: 'seo', group: 'settings'}),
    defineField({
      name: 'oldSlugs', title: 'Previous addresses', type: 'array', group: 'settings',
      of: [defineArrayMember({type: 'string'})], options: {layout: 'tags'},
      description: 'If you change the page address, add the old one here (for example why-start-with-discovery). Visitors to the old address are forwarded to the new one.',
    }),
  ],
  orderings: [{title: 'Newest first', name: 'newest', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', author: 'author.name', date: 'publishedAt', media: 'mainImage'},
    prepare: ({title, author, date, media}) => ({title, media, subtitle: [author, date && new Date(date).toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})].filter(Boolean).join(', ')}),
  },
})
