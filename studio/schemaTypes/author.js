import {defineType, defineField} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Key', type: 'slug', options: {source: 'name'}, validation: (r) => r.required()}),
    defineField({name: 'role', title: 'Role', type: 'string', description: 'Example: "Product Designer, Waymarks"'}),
    defineField({name: 'image', title: 'Photo', type: 'figure'}),
    defineField({name: 'bio', title: 'Short bio', type: 'text', rows: 3, validation: (r) => r.max(300)}),
    defineField({name: 'linkedin', title: 'LinkedIn URL', type: 'url'}),
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'image'}},
})
