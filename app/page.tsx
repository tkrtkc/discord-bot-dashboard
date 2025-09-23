"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"
import Sidebar from "./components/Sidebar"
import ServerInfo from "./components/ServerInfo"

export default function Page() {
  const { data: session, status } = useSession()
  const [selectedConfig, setSelectedConfig] = useState<any>(null)

  if (status === "loading") {
    return <p>読み込み中...</p>
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl mb-4">ログインしてください</h1>
        <button
          onClick={() => signIn("discord")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Discordでログイン
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      {/* サイドメニュー */}
      <aside className="w-64 bg-gray-100 border-r p-4">
        <Sidebar setSelectedConfig={setSelectedConfig} />
      </aside>

      {/* メイン画面 */}
      <main className="flex-1 p-6 overflow-y-auto">
        <ServerInfo config={selectedConfig} />
      </main>
    </div>
  )
}