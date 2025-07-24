export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Minimal Doc v1</h1>
          <p className="text-gray-600 mt-2">
            Next.js 15とTailwind CSS v4で構築されたシンプルなドキュメントサイト
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            高速で美しいドキュメンテーション
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            最新のWeb技術を使用して構築された、開発者のためのドキュメントサイトプラットフォームです。
          </p>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            主要機能
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">高速</h4>
              <p className="text-gray-600 text-sm">
                Next.js 15の最新機能とTurbopackによる高速な開発体験
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">検索機能</h4>
              <p className="text-gray-600 text-sm">
                FlexSearchによる高速な全文検索機能
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Markdown対応</h4>
              <p className="text-gray-600 text-sm">
                GitHub Flavored Markdownとシンタックスハイライト
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">TypeScript</h4>
              <p className="text-gray-600 text-sm">
                型安全な開発環境とReact 19の最新機能
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            技術スタック
          </h3>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">フロントエンド</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Next.js 15.4.3</li>
                  <li>React 19.1.0</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS v4.1</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">機能・ライブラリ</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Remark/Rehype (Markdown処理)</li>
                  <li>FlexSearch (検索エンジン)</li>
                  <li>Lucide React (アイコン)</li>
                  <li>Gray Matter (Front matter解析)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>
              © 2025 Minimal Doc v1. Built with Next.js 15 and Tailwind CSS
              v4.1.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

