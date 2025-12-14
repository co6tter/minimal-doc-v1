# Minimal Doc v1

## Overview

Minimal Doc v1は、Next.js 15とTailwind CSS v4で構築されたシンプルで高速なドキュメントサイトです。Markdownファイルベースのコンテンツ管理と、FlexSearchによる高速全文検索機能を搭載しています。

### 主な特徴

- **高速**: Next.js 15の最新機能とTurbopackを活用
- **レスポンシブ**: あらゆるデバイスで美しく表示されるデザイン
- **検索機能**: FlexSearchによる高速全文検索
- **Markdownサポート**: GitHub Flavored Markdownに対応
- **シンタックスハイライト**: コードブロックの美しい表示
- **TypeScript**: 型安全な開発環境

## Tech Stack

- **[Next.js](https://nextjs.org/) 15.4.3** - Reactベースのフルスタックフレームワーク
- **[React](https://react.dev/) 19.1.0** - UIライブラリ
- **[TypeScript](https://www.typescriptlang.org/) 5** - 型安全な開発
- **[Tailwind CSS](https://tailwindcss.com/) 4.1.0** - ユーティリティファーストCSSフレームワーク
- **[FlexSearch](https://github.com/nextapps-de/flexsearch) 0.7.43** - 高速検索エンジン
- **[Remark](https://github.com/remarkjs/remark) / [Rehype](https://github.com/rehypejs/rehype)** - Markdownの処理とHTML変換
- **[Gray Matter](https://github.com/jonschlinkert/gray-matter)** - フロントマター解析
- **[Lucide React](https://lucide.dev/)** - アイコンライブラリ

### 開発ツール

- **[ESLint](https://eslint.org/)** - コード品質チェック
- **[Prettier](https://prettier.io/)** - コードフォーマッター
- **[Lefthook](https://github.com/evilmartians/lefthook)** - Gitフック管理

## Setup

### 前提条件

- Node.js 20以上
- npm / yarn / pnpm

### インストール手順

1. リポジトリをクローン:

```bash
git clone https://github.com/co6tter/minimal-doc-v1.git
cd minimal-doc-v1
```

2. 依存関係をインストール:

```bash
npm install
```

3. 開発サーバーを起動:

```bash
npm run dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## Usage

### 開発

```bash
# 開発サーバーの起動（Turbopack有効）
npm run dev

# 本番ビルド
npm run build

# 本番サーバーの起動
npm run start

# Lint実行
npm run lint
```

### ドキュメントの作成

`docs/` ディレクトリにMarkdownファイルを配置します。各ファイルは以下のフロントマターでメタデータを定義できます:

```markdown
---
title: ページタイトル
description: ページの説明
slug: page-slug
category: guide
date: 2025-01-24
order: 1
---

# ページ内容

ここにMarkdownでコンテンツを記述します。
```

### カスタマイズ

サイトの設定は `src/config/site.config.ts` で管理されています。サイト名、説明、ナビゲーション、ソーシャルリンクなどを変更できます。

## Directory Structure

```
minimal-doc-v1/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # ルートレイアウト
│   │   └── page.tsx      # トップページ
│   ├── components/       # Reactコンポーネント
│   │   └── NavigationTree.tsx
│   ├── config/           # サイト設定
│   │   └── site.config.ts
│   ├── lib/              # ユーティリティ関数
│   │   ├── config.ts     # 設定読み込み
│   │   ├── content.ts    # コンテンツ管理
│   │   ├── markdown.ts   # Markdown処理
│   │   └── utils.ts      # 汎用ユーティリティ
│   └── types/            # TypeScript型定義
│       └── index.ts
├── docs/                 # Markdownドキュメント
├── content/              # 追加コンテンツ
├── public/               # 静的ファイル
├── package.json          # 依存関係
├── tsconfig.json         # TypeScript設定
├── tailwind.config.ts    # Tailwind CSS設定
└── next.config.ts        # Next.js設定
```

## License

This repository is for personal/private use only.
