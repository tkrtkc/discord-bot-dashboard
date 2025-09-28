"use client"

import GuildList from "./GuildList"
import { useEffect, useState } from "react"
import { useSession} from "next-auth/react"

type Guild = {
  id: string
  name: string
  icon?: string
}

type BotConfig = {
  serverId: string
  fileName: string
}

export default function Sidebar({ setSelectedServerId }: { setSelectedServerId: (config: any) => void }) {

  const { data: session} = useSession()
  const [guilds, setGuilds] = useState<Guild[]>([])
  const [botConfigs, setBotConfigs] = useState<BotConfig[]>([])
  useEffect(() => {

    // 所属サーバー一覧
    fetch("/api/discord/guilds")
      .then(res => res.json())
      .then(data => setGuilds(data))

    // JSONファイル一覧
    fetch("/api/botConfigs")
      .then(res => res.json())
      .then(data => setBotConfigs(data))
  }, [])
  if (!session) {
    return (
    <div>
      <h2>サーバー一覧</h2>
    </div>
    )
  }

  return (
    <div>
      <h2>サーバー一覧</h2>
      <GuildList
        guilds={guilds}
        botConfigs={botConfigs}
        onSelect={async (serverId: string) => {
          // const res = await fetch(`/api/botConfigs/${serverId}_server_info.json`)
          // const data = await res.json()
          setSelectedServerId(serverId)
        }}
      />
    </div>
  )
}