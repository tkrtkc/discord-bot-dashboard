'use client'

import { useEffect, useState } from 'react'
import { useSelectedServer } from '../context/SelectedServerContext'
import ServerInfo from './components/ServerInfo'

export default function DashboardPage() {
  const { selectedServerId } = useSelectedServer()
  const [loading, setLoading] = useState(false)
  const [serverConfig, setServerConfig] = useState<any>(null); 

  useEffect(() => {
    if (!selectedServerId) {
      setServerConfig(null)
      return
    }

    setLoading(true)
    fetch(`/api/botConfigs/${selectedServerId}`)
      .then(res => res.json())
      .then(json => setServerConfig(json))
      .finally(() => setLoading(false))
  }, [selectedServerId])

  if (!selectedServerId) return <div>サーバーを選択してください</div>
  if (loading) return <div>読み込み中...</div>
  if (!serverConfig) return <div>設定が見つかりません</div>

  return (
    <div className="p-4">
      <h1>サーバーID: {selectedServerId}</h1>
      <ServerInfo config = {serverConfig}/>
    </div>
  )
}
