"use client"

import DashboardPage from './dashboard/page'
import { useSelectedServer } from './context/SelectedServerContext'
import { useSession, signIn} from "next-auth/react"

export default function Page() {
  const { selectedServerId } = useSelectedServer()
  const { data: session, status } = useSession()

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

      {/* メイン画面 */}
      <main className="flex-1 p-6 overflow-y-auto">
      </main>
    </div>
  )
}