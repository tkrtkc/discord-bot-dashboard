"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface BotConfigInfo {
  serverId: string
  fileName: string
}

export default function GuildList() {
  const { data: session } = useSession()
  const [guilds, setGuilds] = useState<any[]>([])
  const [botConfigs, setBotConfigs] = useState<BotConfigInfo[]>([])
  const [selectedConfig, setSelectedConfig] = useState<any>(null)

  // Discord guilds
  useEffect(() => {
    const token = (session as any)?.accessToken
    if (!token) return

    fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setGuilds(data))
      .catch(console.error)
  }, [session])

  // botConfigs
  useEffect(() => {
    fetch("/api/botConfigs")
      .then(res => res.json())
      .then(data => setBotConfigs(data))
      .catch(console.error)
  }, [])

  const handleClick = (serverId: string) => {
    const config = botConfigs.find(c => c.serverId === serverId)
    if (!config) return

    fetch(`/botConfigs/${config.fileName}`)
      .then(res => res.json())
      .then(data => setSelectedConfig(data))
      .catch(console.error)
  }

  if (!session) return null

  return (
    <div>
      <ul>
        {guilds.map(g => {
          const hasConfig = botConfigs.some(c => c.serverId === g.id)
          return (
            <li key={g.id}>
              <button
                disabled={!hasConfig}
                onClick={() => handleClick(g.id)}
              >
                {g.name} {hasConfig ? "(設定あり)" : ""}
              </button>
            </li>
          )
        })}
      </ul>

      {selectedConfig && (
        <pre>{JSON.stringify(selectedConfig, null, 2)}</pre>
      )}
    </div>
  )
}
