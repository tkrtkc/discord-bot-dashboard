"use client";

import { useState, useEffect } from "react";

type SpeakerStyle = {
  id: number;
  name: string;
};

type Speaker = {
  name: string;
  speaker_uuid: string;
  styles: SpeakerStyle[];
};

type SpeakerSelectProps = {
  defaultId?: number; 
  onChange?: (id: number) => void;
};

export default function VvEngineSpeakersSelecter({ defaultId, onChange }: SpeakerSelectProps) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(defaultId ?? null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch("/api/vv-engine/speakers");
        const data: Speaker[] = await res.json();
        setSpeakers(data);
      } catch (err) {
        console.error("話者一覧の取得に失敗しました", err);
      }
    };
    fetchSpeakers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = Number(e.target.value);
    setSelectedId(newId);
    onChange?.(newId);
  };

  return (
    <div>
      <label htmlFor="speaker" className="block mb-2">
        話者を選択
      </label>
      <select
        id="speaker"
        value={selectedId ?? ""}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="" disabled>
          選択してください
        </option>
        {speakers.flatMap((sp) =>
          sp.styles.map((style) => (
            <option key={style.id} value={style.id}>
              {sp.name}（{style.name}）
            </option>
          ))
        )}
      </select>
    </div>
  );
}
