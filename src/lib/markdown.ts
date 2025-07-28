import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import rehypeParse from "rehype-parse";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";
import { DocMeta, DocContent, DocumentPage } from "@/types";

export async function parseMarkdown(markdown: string): Promise<DocContent> {
  const { data, content } = matter(markdown);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .use(rehypeParse, { fragment: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["anchor-link"],
      },
    })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const meta: DocMeta = {
    title: data.title || "Untitled",
    description: data.description,
    date: data.date,
    slug: data.slug || "",
    category: data.category,
    order: data.order,
  };

  return {
    meta,
    content: String(processedContent),
    excerpt: data.excerpt,
  };
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function extractExcerpt(
  content: string,
  maxLength: number = 160,
): string {
  const textOnly = content.replace(/<[^>]*>/g, "").replace(/\n/g, " ");
  if (textOnly.length <= maxLength) {
    return textOnly;
  }
  return textOnly.substring(0, maxLength).trim() + "...";
}

export async function processMarkdownToDocumentPage(
  markdown: string,
  slug: string,
  filePath?: string,
): Promise<DocumentPage> {
  const { data, content } = matter(markdown);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .use(rehypeParse, { fragment: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["anchor-link"],
      },
    })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const htmlContent = String(processedContent);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description,
    content: htmlContent,
    category: data.category,
    date: data.date,
    excerpt: data.excerpt || extractExcerpt(htmlContent),
    readingTime: calculateReadingTime(content),
    order: data.order,
    filePath,
  };
}
