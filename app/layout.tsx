"use client"

import "./globals.css"
import { SelectedServerProvider } from './context/SelectedServerContext'
import { useState } from "react"
import React from "react" 
import { SessionProvider } from "next-auth/react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

export default function RootLayout({ children }: { children: React.ReactNode }) {

  console.log("RootLayout children type:", (children as any).type?.name)
  return (
    <html lang="ja">
      <body className="h-screen flex flex-col bg-gray-900 text-white">
        <SelectedServerProvider>
          <SessionProvider>
            {/* ヘッダ */}
            <Header />

            {/* コンテンツ */}
            <div className="flex flex-1">
              {/* サイドバー */}
              <aside className="w-64 bg-gray-900 text-white border-r border-gray-700 p-4">
                <Sidebar />
              </aside>
              {/* メイン画面 */}
              <main className="flex-1 p-4">{children}</main>

            </div>
          </SessionProvider>
        </SelectedServerProvider>
      </body>
    </html>
  )
}