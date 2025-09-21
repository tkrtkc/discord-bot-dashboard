"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <p>こんにちは {session.user?.name}</p>
        <button onClick={() => signOut()}>ログアウト</button>
      </div>
    )
  }

  return <button onClick={() => signIn("discord")}>Discordでログイン</button>
}
