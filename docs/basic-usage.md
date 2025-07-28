---
title: 基本的な使い方
description: Minimal Doc v1の基本的な使い方と機能について
slug: basic-usage
category: guide
date: 2025-01-24
order: 2
---

# 基本的な使い方

このページでは、Minimal Doc v1の基本的な使い方について説明します。

## ドキュメントの作成

### 1. Markdownファイルの作成

`docs/` ディレクトリに新しいMarkdownファイルを作成します：

```bash
touch docs/new-document.md
```

### 2. フロントマターの設定

ファイルの先頭にフロントマターを追加します：

```yaml
---
title: 新しいドキュメント
description: このドキュメントの説明
slug: new-document
category: tutorial
date: 2025-01-24
---
```

### 3. コンテンツの記述

フロントマターの後にMarkdownでコンテンツを記述します：

```markdown
# メインタイトル

ここに本文を記述します。

## サブタイトル

- リスト項目1
- リスト項目2
- リスト項目3

### コードブロック

\`\`\`javascript
function hello() {
console.log('Hello, World!');
}
\`\`\`
```

## サポートされている機能

### GitHub Flavored Markdown

- **テーブル**
- **タスクリスト**
- **取り消し線**
- **自動リンク**

### シンタックスハイライト

コードブロックは自動的にシンタックスハイライトが適用されます：

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
};
```

### 自動生成される機能

- **目次**: 見出しから自動生成
- **アンカーリンク**: 各見出しにリンクが追加
- **読了時間**: 自動計算
- **抜粋**: 自動抽出（設定も可能）

## ディレクトリ構造

ドキュメントはネストしたディレクトリ構造にも対応しています：

```
docs/
├── getting-started.md
├── basic-usage.md
├── guides/
│   ├── installation.md
│   └── configuration.md
└── api/
    ├── overview.md
    └── reference.md
```

## カテゴリーでの整理

フロントマターの `category` フィールドを使用してドキュメントを分類できます：

- `guide`: ガイド・チュートリアル
- `api`: API リファレンス
- `tutorial`: 詳細なチュートリアル
- `reference`: リファレンス資料

## 次のステップ

- [設定ガイド](/docs/configuration)で詳細な設定方法を学ぶ
- [API リファレンス](/docs/api-reference)で利用可能な機能を確認する
