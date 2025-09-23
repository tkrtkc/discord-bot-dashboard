"use client"

import "./globals.css"
import { SessionProvider } from "next-auth/react"
import Header from "./components/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="h-screen flex flex-col">
        <SessionProvider>
          {/* ヘッダ */}
          <Header />

          {/* コンテンツ部分 */}
          <div className="flex flex-1">
            {/* メイン画面 */}
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}