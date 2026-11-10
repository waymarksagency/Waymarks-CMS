// Sidebar of the admin panel, in the order editors use it most.
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('post').title('Blog posts'),
      S.documentTypeListItem('caseStudy').title('Case studies'),
      S.divider(),
      S.documentTypeListItem('category').title('Blog topics'),
      S.documentTypeListItem('author').title('Authors'),
    ])
