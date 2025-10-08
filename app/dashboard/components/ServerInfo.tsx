"use client"

import React, { useState } from "react";
import { useEffect } from "react";
import { useSelectedServer } from '../../context/SelectedServerContext'
import VvEngineSpeakersSelecter from "./VvEngineSpeakersSelecter"
import TalkChannelSelecter from "./TalkChannelSelecter"

type ServerInfoProps = {
  serverId?: number; 
  config?: any; 
};
type SpeakerStyle = {
  id: number;
  name: string;
};
interface Channel {
  id: string;
  name: string;
}

export default function ServerInfo({ config }: any) {
  if (!config) return <p>サーバーを選択してください</p>
  const { selectedServerId } = useSelectedServer()
  const [localConfig, setLocalConfig] = useState(JSON.parse(JSON.stringify(config)));

  const updateRootConfig = (key: string, newValue: any) => {
    setLocalConfig((prev: any) => ({
      ...prev,
      [key]: newValue,
    }));
    console.log(localConfig);
  };

  const channels: Channel[] = Object.entries(localConfig.talkChannel).map(
    ([id, ch]) => ({ id, name: (ch as { name: string }).name })
  );

  console.log("サーバー情報: " + JSON.stringify(localConfig, null, 2))
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">サーバー設定</h2>

      <h3 className="mt-4 font-semibold">最大テキスト長: <input
        id="int"
        type="number"
        step="10"
        inputMode="numeric"
        pattern="\d*"
        value={localConfig.maxTextLength}
        onChange={(e) => updateRootConfig("maxTextLength", Number(e.target.value))}
        className="border p-1"
        placeholder="例: 12345"
        aria-label="整数入力"
      /></h3>

      <h3 className="mt-4 font-semibold">デフォルト話者:
      <VvEngineSpeakersSelecter
        defaultId={localConfig["defaultSpeakerId"]}
        onChange={(id) => updateRootConfig("defaultSpeakerId", Number(id))}
      /></h3>

      <h3 className="mt-4 font-semibold">読み上げ速度: <input
        id="float"
        type="number"
        step="0.1"
        inputMode="numeric"
        value={localConfig.playbackSpeed}
        onChange={(e) => updateRootConfig("playbackSpeed", parseFloat(e.target.value))}
        className="border p-1"
        placeholder="例: 123.45"
        aria-label="小数入力"
      /></h3>

      <h3 className="mt-4 font-semibold">読み上げチャンネル一覧:<TalkChannelSelecter
        serverId={selectedServerId ?? undefined}
        selectedIds={channels}
        onChange={(id) => updateRootConfig("talkChannel", Number(id))}/></h3>


    </div>
  )
}
