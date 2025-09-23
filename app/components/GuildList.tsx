// app/components/GuildList.tsx
"use client"

type Guild = { id: string; name: string }
type BotConfig = { serverId: string; fileName: string }

export default function GuildList({
  guilds,
  botConfigs,
  onSelect,
}: {
  guilds: Guild[]
  botConfigs: BotConfig[]
  onSelect: (serverId: string) => void
}) {
  return (
    <ul>
      {guilds.map(g => {
        const hasConfig = botConfigs.some(c => c.serverId === g.id)
        return (
          <li key={g.id}>
            <button
              className={`block w-full text-left p-2 rounded ${
                hasConfig ? "hover:bg-blue-700" : "text-gray-400 cursor-not-allowed"
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
