// app/dashboard/layout.tsx
"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="ja">
      <body className="h-screen flex flex-col">
        <SessionProvider>
          {/* ヘッダ */}
          <Header />

          {/* コンテンツ部分 */}
          <div className="flex flex-1">
            {/* メイン画面 */}
            <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
