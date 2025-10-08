import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  context: { params: Promise<{ serverId: string }> }
) {
  const { serverId } = await context.params;

  // DiscordのAPIを実行
  const res = await fetch(`https://discord.com/api/guilds/${serverId}/channels`, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
  })
  console.log("Discord res status:", res.status);
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch channels" }, { status: 500 })
  }

  const allChannels = await res.json()

  console.log(allChannels)
  // type=0 のみフィルタ
  const textChannels = allChannels
    .filter((ch: any) => ch.type === 0)
    .map((ch: any) => ({ id: ch.id, name: ch.name }))

  return NextResponse.json(textChannels)
}
