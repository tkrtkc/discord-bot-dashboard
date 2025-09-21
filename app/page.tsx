"use client"

import LoginButton from "./components/LoginButton"
import GuildList from "./components/GuildList"

export default function Page() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>ダッシュボード</h1>
      <LoginButton />
      <GuildList />
    </main>
  )
}