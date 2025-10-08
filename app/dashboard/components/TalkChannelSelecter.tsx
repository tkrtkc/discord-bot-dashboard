"use client";

import { useEffect, useState } from "react";

interface Channel {
  id: string;
  name: string;
}


type TalkChannelSelectProps = {
  serverId?: string; 
  selectedIds?: Channel[];
  onChange?: (id: number) => void;
};


export default function ChannelSelector({ serverId, selectedIds = [], onChange }: TalkChannelSelectProps) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<Channel[]>(selectedIds);
  
  // APIからチャンネル一覧取得
  useEffect(() => {
    const fetchChannels = async () => {
      const res = await fetch(`/api/discord/guilds/${serverId}/textChannels`);
      if (res.ok) {
        const data: Channel[] = await res.json();

        setChannels(data);
      }
    };
    fetchChannels();
  }, []);

  // プルダウンで選んだとき
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const channel = channels.find((c) => c.id === id);
    if (channel && !selectedChannels.some((c) => c.id === id)) {
      setSelectedChannels((prev) => [...prev, channel]);
    }
  };

  // −ボタンで削除
  const handleRemove = (id: string) => {
    setSelectedChannels((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label htmlFor="channel" className="block mb-1 font-bold">
          チャンネルを選択
        </label>
        <select
          id="channel"
          onChange={handleSelect}
          defaultValue=""
          className="border p-2 rounded"
        >
          <option value="" disabled>
            -- チャンネルを選択 --
          </option>
          {channels.map((ch) => (
            <option key={ch.id} value={ch.id}>
              {ch.name} ({ch.id})
            </option>
          ))}
        </select>
      </div>

      <ul className="space-y-2">
        {selectedChannels.map((ch) => (
          <li
            key={ch.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <span>
              {ch.name} <span className="text-gray-500">({ch.id})</span>
            </span>
            <button
              onClick={() => handleRemove(ch.id)}
              className="text-red-500 hover:text-red-700"
            >
              −
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
