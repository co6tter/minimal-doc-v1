import fs from "fs";
import path from "path";
import { DocumentPage, NavigationItem } from "@/types";
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
  directory: string = getDocsDirectory(),
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
  directory: string = getDocsDirectory(),
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
      const page = await processMarkdownToDocumentPage(content, slug, filePath);
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
  slug: string,
): Promise<DocumentPage | null> {
  const directory = getDocsDirectory();
  const markdownFiles = getAllMarkdownFiles(directory);

  // Try to find exact match first
  const exactMatch = markdownFiles.find(
    (file) => getSlugFromFilePath(file) === slug,
  );
  if (exactMatch) {
    try {
      const content = getMarkdownContent(exactMatch, directory);
      return await processMarkdownToDocumentPage(content, slug, exactMatch);
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
      return await processMarkdownToDocumentPage(content, slug, filenameMatch);
    } catch (error) {
      console.warn(`Failed to process ${filenameMatch}:`, error);
    }
  }

  return null;
}

export function getDocumentsByCategory(
  category: string,
): Promise<DocumentPage[]> {
  return getAllDocumentPages().then((pages) =>
    pages.filter((page) => page.category === category),
  );
}

export async function generateNavigationFromFiles(): Promise<NavigationItem[]> {
  const pages = await getAllDocumentPages();
  const navigationMap = new Map<string, NavigationItem>();

  for (const page of pages) {
    if (!page.filePath) continue;

    const pathSegments = page.filePath.split("/").filter(Boolean);
    let currentPath = "";

    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      const isLastSegment = i === pathSegments.length - 1;
      const segmentPath = currentPath ? `${currentPath}/${segment}` : segment;

      if (isLastSegment && segment.endsWith(".md")) {
        const navItem: NavigationItem = {
          title: page.title,
          href: `/docs/${page.slug}`,
          description: page.description,
          order: page.order || 999,
        };
        navigationMap.set(segmentPath, navItem);
      } else if (!isLastSegment) {
        if (!navigationMap.has(segmentPath)) {
          const folderNavItem: NavigationItem = {
            title: segment.charAt(0).toUpperCase() + segment.slice(1),
            href: "",
            order: 999,
            children: [],
          };
          navigationMap.set(segmentPath, folderNavItem);
        }
      }

      currentPath = segmentPath;
    }
  }

  const buildHierarchy = (parentPath = ""): NavigationItem[] => {
    const items: NavigationItem[] = [];

    for (const [path, item] of navigationMap.entries()) {
      const pathSegments = path.split("/");
      const expectedParentPath = pathSegments.slice(0, -1).join("/");

      if (expectedParentPath === parentPath) {
        const itemCopy = { ...item };
        if (item.children !== undefined) {
          itemCopy.children = buildHierarchy(path);
        }
        items.push(itemCopy);
      }
    }

    return items.sort((a, b) => {
      const orderA = a.order || 999;
      const orderB = b.order || 999;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return a.title.localeCompare(b.title);
    });
  };

  return buildHierarchy();
}
