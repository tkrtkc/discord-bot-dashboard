"use client"

import { useSession} from "next-auth/react"
import GuildList from './GuildList'
import { useEffect, useState } from 'react'
import { useSelectedServer } from '../context/SelectedServerContext'
import { useRouter } from "next/navigation"

type Guild = {
  id: string
  name: string
  icon?: string
}

type BotConfig = {
  serverId: string
  fileName: string
}
  

export default function Sidebar() {

  const { data: session} = useSession()
  
  const { setSelectedServerId } = useSelectedServer()
  const [guilds, setGuilds] = useState<any[]>([])
  const [botConfigs, setBotConfigs] = useState<any[]>([])
  const router = useRouter()
 
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
        onSelect={(serverId: string) => {
          console.log('Sidebar clicked', serverId)
          setSelectedServerId(serverId)
          router.push('/dashboard')
        }}
      />
    </div>
  )
}