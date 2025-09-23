"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="flex justify-between items-center bg-blue-600 text-white p-4">
      <h1 className="text-lg font-bold">Discord Bot Dashboard</h1>

      <div>
        {session ? (
          <>
            <span className="mr-4">{session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              ログアウト
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("discord")}
            className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
          >
            ログイン
          </button>
        )}
      </div>
    </header>
  )
}
