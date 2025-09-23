"use client"

import { useSession} from "next-auth/react"
import { useState } from "react"
import React from "react" 
// import "./globals.css"
import { SessionProvider } from "next-auth/react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null)

  return (
    <html lang="ja">
      <body className="h-screen flex flex-col bg-gray-900 text-white">
        <SessionProvider>
          {/* ヘッダ */}
          <Header />

          {/* コンテンツ */}
          <div className="flex flex-1">
            {/* サイドバー */}
            <aside className="w-64 bg-gray-900 text-white border-r border-gray-700 p-4">
              <Sidebar setSelectedServerId={setSelectedServerId} />
            </aside>

            {/* メイン画面 */}
            {React.cloneElement(children as React.ReactElement<any>, { selectedServerId })}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}