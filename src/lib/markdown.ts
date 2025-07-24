import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import rehypeParse from 'rehype-parse'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import matter from 'gray-matter'
import { DocMeta, DocContent } from '@/types'

export async function parseMarkdown(markdown: string): Promise<DocContent> {
  const { data, content } = matter(markdown)
  
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .use(rehypeParse, { fragment: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['anchor-link']
      }
    })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content)

  const meta: DocMeta = {
    title: data.title || 'Untitled',
    description: data.description,
    date: data.date,
    slug: data.slug || '',
    category: data.category
  }

  return {
    meta,
    content: String(processedContent),
    excerpt: data.excerpt
  }
}