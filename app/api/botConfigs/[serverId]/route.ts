import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(req: Request, { params }: { params: { serverId: string } }) {
  const { serverId } = params
  const filePath = path.join(process.env.BOT_CONFIGS_PATH!, serverId + "_server_info.json")

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }

  const data = fs.readFileSync(filePath, "utf-8")
  const json = JSON.parse(data)

  return NextResponse.json(json)
}
