import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minimal Doc v1",
  description:
    "Next.js 15とTailwind CSS v4で構築されたシンプルなドキュメントサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
