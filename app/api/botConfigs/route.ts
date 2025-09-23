import fs from "fs"
import path from "path"

export const GET = async () => {
  const folderPath = path.join(process.env.BOT_CONFIGS_PATH!)
  const files = fs.readdirSync(folderPath)
  const configs = files
    .filter(f => f.endsWith("_server_info.json"))
    .map(f => {
      const serverId = f.split("_")[0]
      return { serverId, fileName: f }
    })

  return new Response(JSON.stringify(configs), {
    headers: { "Content-Type": "application/json" }
  })
}