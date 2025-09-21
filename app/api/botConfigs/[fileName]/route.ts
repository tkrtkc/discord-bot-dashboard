import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(req: Request, { params }: { params: { fileName: string } }) {
  const { fileName } = params
  const filePath = path.join(process.cwd(), "botConfigsData", fileName)

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }

  const data = fs.readFileSync(filePath, "utf-8")
  const json = JSON.parse(data)

  return NextResponse.json(json)
}
