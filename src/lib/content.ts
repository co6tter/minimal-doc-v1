import fs from "fs";
import path from "path";
import { DocumentPage } from "@/types";
import { processMarkdownToDocumentPage } from "./markdown";

const DOCS_DIRECTORY = path.join(process.cwd(), "docs");
const CONTENT_DIRECTORY = path.join(process.cwd(), "content");

export function getDocsDirectory(): string {
  if (fs.existsSync(DOCS_DIRECTORY)) {
    return DOCS_DIRECTORY;
  }
  return CONTENT_DIRECTORY;
}

export function getAllMarkdownFiles(
  directory: string = getDocsDirectory()
): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files: string[] = [];

  function scanDirectory(dir: string, prefix: string = "") {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath, prefix ? `${prefix}/${item}` : item);
      } else if (item.endsWith(".md") || item.endsWith(".mdx")) {
        const relativePath = prefix ? `${prefix}/${item}` : item;
        files.push(relativePath);
      }
    }
  }

  scanDirectory(directory);
  return files;
}

export function getMarkdownContent(
  filePath: string,
  directory: string = getDocsDirectory()
): string {
  const fullPath = path.join(directory, filePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  return fs.readFileSync(fullPath, "utf8");
}

export function getSlugFromFilePath(filePath: string): string {
  return filePath
    .replace(/\.(md|mdx)$/, "")
    .replace(/\\/g, "/") // Windows path separator
    .replace(/^\/+|\/+$/g, ""); // Remove leading/trailing slashes
}

export async function getAllDocumentPages(): Promise<DocumentPage[]> {
  const directory = getDocsDirectory();
  const markdownFiles = getAllMarkdownFiles(directory);

  const pages: DocumentPage[] = [];

  for (const filePath of markdownFiles) {
    try {
      const content = getMarkdownContent(filePath, directory);
      const slug = getSlugFromFilePath(filePath);
      const page = await processMarkdownToDocumentPage(content, slug);
      pages.push(page);
    } catch (error) {
      console.warn(`Failed to process ${filePath}:`, error);
    }
  }

  return pages.sort((a, b) => {
    // Sort by date (newest first), then by title
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (a.date && !b.date) return -1;
    if (!a.date && b.date) return 1;
    return a.title.localeCompare(b.title);
  });
}

export async function getDocumentPageBySlug(
  slug: string
): Promise<DocumentPage | null> {
  const directory = getDocsDirectory();
  const markdownFiles = getAllMarkdownFiles(directory);

  // Try to find exact match first
  const exactMatch = markdownFiles.find(
    (file) => getSlugFromFilePath(file) === slug
  );
  if (exactMatch) {
    try {
      const content = getMarkdownContent(exactMatch, directory);
      return await processMarkdownToDocumentPage(content, slug);
    } catch (error) {
      console.warn(`Failed to process ${exactMatch}:`, error);
    }
  }

  // Try to find by filename
  const filenameMatch = markdownFiles.find((file) => {
    const filename = path.basename(file, path.extname(file));
    return filename === slug;
  });

  if (filenameMatch) {
    try {
      const content = getMarkdownContent(filenameMatch, directory);
      return await processMarkdownToDocumentPage(content, slug);
    } catch (error) {
      console.warn(`Failed to process ${filenameMatch}:`, error);
    }
  }

  return null;
}

export function getDocumentsByCategory(
  category: string
): Promise<DocumentPage[]> {
  return getAllDocumentPages().then((pages) =>
    pages.filter((page) => page.category === category)
  );
}
