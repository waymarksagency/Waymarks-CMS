import {defineType, defineArrayMember, defineField} from 'sanity'

// The rich text editor used for article bodies and case study sections.
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Heading', value: 'h2'},
        {title: 'Subheading', value: 'h3'},
        {title: 'Small heading', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullets', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (r) => r.required().uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
              }),
              defineField({name: 'blank', title: 'Open in a new tab', type: 'boolean', initialValue: false}),
            ],
          },
        ],
      },
    }),
    defineArrayMember({type: 'figure'}),
    defineArrayMember({
      name: 'dataTable',
      title: 'Table',
      type: 'object',
      fields: [
        defineField({name: 'caption', title: 'Caption (optional)', type: 'string'}),
        defineField({
          name: 'rows',
          title: 'Rows',
          type: 'array',
          description: 'The first row is the header. Give every row the same number of cells.',
          of: [defineArrayMember({
            type: 'object',
            name: 'row',
            fields: [defineField({name: 'cells', title: 'Cells', type: 'array', of: [defineArrayMember({type: 'string'})]})],
            preview: {select: {cells: 'cells'}, prepare: ({cells}) => ({title: (cells || []).join('  |  ')})},
          })],
          validation: (r) => r.required().min(2),
        }),
      ],
      preview: {select: {caption: 'caption', rows: 'rows'}, prepare: ({caption, rows}) => ({title: caption || 'Table', subtitle: `${(rows || []).length} rows`})},
    }),
    defineArrayMember({
      name: 'callout',
      title: 'Callout box',
      type: 'object',
      fields: [
        defineField({
          name: 'tone',
          title: 'Type',
          type: 'string',
          options: {list: [{title: 'Tip', value: 'tip'}, {title: 'Note', value: 'note'}, {title: 'Warning', value: 'warning'}], layout: 'radio', direction: 'horizontal'},
          initialValue: 'tip',
        }),
        defineField({name: 'title', title: 'Title (optional)', type: 'string'}),
        defineField({name: 'text', title: 'Text', type: 'text', rows: 3, validation: (r) => r.required()}),
      ],
      preview: {select: {title: 'title', subtitle: 'text', tone: 'tone'}, prepare: ({title, subtitle, tone}) => ({title: title || (tone || 'tip').replace(/^./, (c) => c.toUpperCase()), subtitle})},
    }),
    defineArrayMember({
      name: 'codeBlock',
      title: 'Code',
      type: 'object',
      fields: [
        defineField({name: 'language', title: 'Language', type: 'string', options: {list: ['html', 'css', 'javascript', 'json', 'bash', 'text']}, initialValue: 'html'}),
        defineField({name: 'code', title: 'Code', type: 'text', rows: 8, validation: (r) => r.required()}),
      ],
      preview: {select: {title: 'language', subtitle: 'code'}},
    }),
    defineArrayMember({
      name: 'ctaBox',
      title: 'Call to action box',
      type: 'object',
      fields: [
        defineField({name: 'text', title: 'Text', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'label', title: 'Button label', type: 'string', initialValue: 'Start a Project', validation: (r) => r.required()}),
        defineField({name: 'url', title: 'Button link', type: 'string', initialValue: '/contact/', validation: (r) => r.required()}),
      ],
      preview: {select: {title: 'text', subtitle: 'label'}},
    }),
  ],
})
