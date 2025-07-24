export interface DocMeta {
  title: string;
  description?: string;
  date?: string;
  slug: string;
  category?: string;
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
