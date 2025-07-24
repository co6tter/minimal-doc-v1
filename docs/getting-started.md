---
title: はじめに
description: Minimal Doc v1の概要と基本的な使い方
slug: getting-started
category: guide
date: 2025-01-24
---

# はじめに

Minimal Doc v1へようこそ！このドキュメントサイトは、Next.js 15とTailwind CSS v4を使用して構築されたシンプルで高速なドキュメンテーションプラットフォームです。

## 特徴

- **高速**: Next.js 15の最新機能を活用
- **レスポンシブ**: あらゆるデバイスで美しく表示
- **検索機能**: FlexSearchによる高速全文検索
- **マークダウン対応**: GitHub Flavored Markdownをサポート
- **シンタックスハイライト**: コードブロックの美しい表示

## 技術スタック

- **Next.js 15.4.3**: Reactベースのフルスタックフレームワーク
- **React 19**: 最新のReactライブラリ
- **TypeScript**: 型安全な開発環境
- **Tailwind CSS v4**: ユーティリティファーストのCSSフレームワーク
- **Remark/Rehype**: Markdownの処理とHTML変換
- **FlexSearch**: 高速検索エンジン
- **Lucide React**: アイコンライブラリ

## 始め方

1. 依存関係をインストール:
   ```bash
   npm install
   ```

2. 開発サーバーを起動:
   ```bash
   npm run dev
   ```

3. ブラウザで `http://localhost:3000` を開く

## ディレクトリ構造

```
minimal-doc-v1/
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # Reactコンポーネント
│   ├── lib/          # ユーティリティ関数
│   └── types/        # TypeScript型定義
├── docs/             # Markdownファイル
├── public/           # 静的ファイル
└── package.json      # 依存関係
```

## マークダウンファイルの作成

ドキュメントは `docs/` ディレクトリにMarkdownファイルとして作成します。各ファイルはフロントマターでメタデータを定義できます：

```markdown
---
title: ページタイトル
description: ページの説明
slug: page-slug
category: guide
date: 2025-01-24
---

# ページ内容

ここにマークダウンでコンテンツを記述します。
```

次は[基本的な使い方](/docs/basic-usage)を確認してください。