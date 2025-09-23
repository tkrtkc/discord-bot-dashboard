"use client"

import { useCallback } from "react"
import GuildList from "./GuildList"

export default function Sidebar({ setSelectedConfig }: { setSelectedConfig: (config: any) => void }) {
  const handleSelect = useCallback(async (serverId: string) => {
    const res = await fetch(`/api/botConfigs/${serverId}_server_info.json`)
    const data = await res.json()
    setSelectedConfig(data)
  }, [setSelectedConfig])

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">サーバー一覧</h2>
      <GuildList onSelect={handleSelect} />
    </div>
  )
}
