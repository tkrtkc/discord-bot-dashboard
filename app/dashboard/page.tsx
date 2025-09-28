// app/dashboard/page.tsx
"use client"

import { useState } from "react"
import ServerInfo from "./components/ServerInfo"

export default function DashboardPage() {
  const [selectedConfig, setSelectedConfig] = useState<any>(null)

  return (
    <div className="flex flex-col h-full">
      {/* 選択されたサーバー情報を表示 */}
      <ServerInfo config={selectedConfig} />
    </div>
  )
}