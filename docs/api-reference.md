---
title: API リファレンス
description: Minimal Doc v1のAPI リファレンス
slug: api-reference
category: api
date: 2025-01-24
order: 3
---

# API リファレンス

このページでは、Minimal Doc v1で利用可能なAPIについて説明します。

## コンテンツAPI

### `getAllDocumentPages()`

すべてのドキュメントページを取得します。

```typescript
import { getAllDocumentPages } from "@/lib/content";

const pages = await getAllDocumentPages();
// Returns: DocumentPage[]
```

**戻り値**:

- `DocumentPage[]`: ドキュメントページの配列

### `getDocumentPageBySlug(slug: string)`

指定されたスラッグのドキュメントページを取得します。

```typescript
import { getDocumentPageBySlug } from "@/lib/content";

const page = await getDocumentPageBySlug("getting-started");
// Returns: DocumentPage | null
```

**パラメータ**:

- `slug`: ドキュメントのスラッグ

**戻り値**:

- `DocumentPage | null`: 見つかった場合はページオブジェクト、見つからない場合はnull

### `getDocumentsByCategory(category: string)`

指定されたカテゴリーのドキュメントページを取得します。

```typescript
import { getDocumentsByCategory } from "@/lib/content";

const guidePages = await getDocumentsByCategory("guide");
// Returns: DocumentPage[]
```

## マークダウン処理API

### `parseMarkdown(markdown: string)`

マークダウンテキストをHTMLに変換します。

```typescript
import { parseMarkdown } from "@/lib/markdown";

const result = await parseMarkdown(markdownContent);
// Returns: DocContent
```

### `processMarkdownToDocumentPage(markdown: string, slug: string)`

マークダウンをDocumentPageオブジェクトに変換します。

```typescript
import { processMarkdownToDocumentPage } from "@/lib/markdown";

const page = await processMarkdownToDocumentPage(content, "my-page");
// Returns: DocumentPage
```

## 設定API

### `getSiteConfig()`

サイト設定を取得します。

```typescript
import { getSiteConfig } from "@/lib/config";

const config = getSiteConfig();
// Returns: SiteConfig
```

### `validateSiteConfig(config: unknown)`

設定オブジェクトの妥当性を検証します。

```typescript
import { validateSiteConfig } from "@/lib/config";

const isValid = validateSiteConfig(configObject);
// Returns: boolean
```

## 型定義

### `DocumentPage`

```typescript
interface DocumentPage {
  slug: string;
  title: string;
  description?: string;
  content: string;
  category?: string;
  date?: string;
  excerpt?: string;
  readingTime?: number;
}
```

### `SiteConfig`

```typescript
interface SiteConfig {
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
```

### `NavigationItem`

```typescript
interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
}
```

## ユーティリティ関数

### `calculateReadingTime(content: string)`

コンテンツの読了時間を計算します。

```typescript
import { calculateReadingTime } from "@/lib/markdown";

const time = calculateReadingTime(content);
// Returns: number (minutes)
```

### `extractExcerpt(content: string, maxLength?: number)`

コンテンツから抜粋を抽出します。

```typescript
import { extractExcerpt } from "@/lib/markdown";

const excerpt = extractExcerpt(content, 200);
// Returns: string
```

### `cn(...inputs: ClassValue[])`

クラス名を結合するユーティリティ関数です。

```typescript
import { cn } from "@/lib/utils";

const className = cn("base-class", condition && "conditional-class");
// Returns: string
```
