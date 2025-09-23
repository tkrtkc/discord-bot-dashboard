// app/components/GuildList.tsx
"use client"

import { useEffect, useState } from "react"

type Guild = {
  id: string
  name: string
  icon?: string
}

type BotConfig = {
  serverId: string
  fileName: string
}

export default function GuildList({
  onSelect,
}: {
  onSelect: (serverId: string) => void
}) {
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

  return (
    <ul>
      {guilds.map(g => {
        const hasConfig = botConfigs.some(c => c.serverId === g.id)
        return (
          <li key={g.id}>
            <button
              className={`block w-full text-left p-2 rounded ${
                hasConfig ? "hover:bg-blue-100" : "text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => hasConfig && onSelect(g.id)}
              disabled={!hasConfig}
            >
              {g.name}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
