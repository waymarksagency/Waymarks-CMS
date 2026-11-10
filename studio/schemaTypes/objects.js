import {defineType, defineField} from 'sanity'

// An image that always has alt text (needed for accessibility and SEO).
export const figure = defineType({
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe what the image shows, for screen readers and Google. Example: "Designer sketching app screens on paper".',
      validation: (r) => r.required().max(160),
    }),
    defineField({name: 'caption', title: 'Caption (optional)', type: 'string'}),
  ],
})

export const seo = defineType({
  name: 'seo',
  title: 'Search engine settings',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      type: 'string',
      description: 'Shown in Google results. Leave empty to use the page title. Aim for 50 to 60 characters.',
      validation: (r) => r.max(70).warning('Google usually cuts titles after about 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Shown under the title in Google. Leave empty to use the excerpt. Aim for 140 to 160 characters.',
      validation: (r) => r.max(170).warning('Google usually cuts descriptions after about 160 characters.'),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus keyword',
      type: 'string',
      description: 'The main phrase this page should rank for. Use it in the title, the first paragraph and at least one heading.',
    }),
    defineField({
      name: 'keywords',
      title: 'Supporting keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Related phrases to cover in headings and text. Type one and press Enter.',
    }),
    defineField({name: 'noindex', title: 'Hide from Google', type: 'boolean', initialValue: false}),
  ],
})
