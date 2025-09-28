import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions"

export const GET = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) {
    const guildsData = await res.json();

    // 配列かどうか確認して、配列でない場合は空配列にする
    const guilds = Array.isArray(guildsData) ? guildsData : [];

    return new Response(JSON.stringify(guilds), {
    headers: { "Content-Type": "application/json" },
    });
  }

  const guilds = await res.json();

  // guilds は配列になるはず
  return new Response(JSON.stringify(guilds), {
    headers: { "Content-Type": "application/json" },
  });
};
