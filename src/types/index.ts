export interface DocMeta {
  title: string;
  description?: string;
  date?: string;
  slug: string;
  category?: string;
  order?: number;
}

export interface DocContent {
  meta: DocMeta;
  content: string;
  excerpt?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  url: string;
  category?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  logo?: string;
  favicon?: string;
  author: {
    name: string;
    email?: string;
    url?: string;
  };
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
  navigation: NavigationItem[];
  footer?: {
    links?: NavigationItem[];
    copyright?: string;
  };
}

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
  order?: number;
  children?: NavigationItem[];
}

export interface DocumentPage {
  slug: string;
  title: string;
  description?: string;
  content: string;
  category?: string;
  date?: string;
  excerpt?: string;
  readingTime?: number;
  order?: number;
  filePath?: string;
}
