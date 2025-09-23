"use client"

type ServerConfig = {
  maxTextLength: number
  talkChanel: {
    [channelId: string]: {
      name: string
    }
  }
}

export default function ServerInfo({ config }: { config: ServerConfig | null }) {
  if (!config) return <p>サーバーを選択してください</p>

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">サーバー設定</h2>
      <p>最大テキスト長: {config.maxTextLength}</p>

      <h3 className="mt-4 font-semibold">チャンネル一覧</h3>
      <ul>
        {Object.entries(config.talkChanel).map(([id, ch]) => (
          <li key={id}>
            {ch.name} <span className="text-sm text-gray-500">({id})</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
