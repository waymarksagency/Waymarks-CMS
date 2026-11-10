import {defineType, defineField} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const category = defineType({
  name: 'category',
  title: 'Blog topic',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({name: 'title', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Key', type: 'slug', options: {source: 'title'}, description: 'Used in links like /blog/#topic-uiux. Keep it short.', validation: (r) => r.required()}),
    defineField({name: 'heading', title: 'Topic card heading', type: 'string', description: 'Example: "UI & UX Design"'}),
    defineField({name: 'description', title: 'Topic card text', type: 'text', rows: 2}),
    defineField({name: 'image', title: 'Topic card image', type: 'figure'}),
    defineField({name: 'order', title: 'Order on the blog page', type: 'number', initialValue: 10}),
  ],
  orderings: [{title: 'Blog page order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'slug.current', media: 'image'}},
})
