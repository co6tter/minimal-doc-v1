import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Minimal Doc v1",
  description:
    "Next.js 15とTailwind CSS v4で構築されたシンプルなドキュメントサイト",
  url: "https://minimal-doc-v1.vercel.app",
  author: {
    name: "co6tter",
    email: "contact@example.com",
    url: "https://github.com/co6tter",
  },
  social: {
    github: "https://github.com/co6tter/minimal-doc-v1",
    twitter: "https://twitter.com/example",
  },
  navigation: [
    {
      title: "ドキュメント",
      href: "/docs",
      description: "ドキュメントを閲覧する",
    },
    {
      title: "ガイド",
      href: "/guides",
      description: "ガイドを確認する",
    },
    {
      title: "API",
      href: "/api",
      description: "API リファレンス",
    },
    {
      title: "GitHub",
      href: "https://github.com/co6tter/minimal-doc-v1",
      description: "GitHub リポジトリ",
      external: true,
    },
  ],
  footer: {
    links: [
      {
        title: "ドキュメント",
        href: "/docs",
      },
      {
        title: "GitHub",
        href: "https://github.com/co6tter/minimal-doc-v1",
        external: true,
      },
    ],
    copyright:
      "© 2025 Minimal Doc v1. Built with Next.js 15 and Tailwind CSS v4.1.",
  },
};
