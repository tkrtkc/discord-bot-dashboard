import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions"
import { NextResponse } from "next/server"

export const GET = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // DiscordのAPIを実行
  const res = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json([], { status: res.status }) // 空配列返す
  }

  const guilds = await res.json()
  return NextResponse.json(guilds)
};
