"use client"

type ServerInfoProps = {
  data: any; 
};

export default function ServerInfo({ config }: any) {
  if (!config) return <p>サーバーを選択してください</p>

  console.log("サーバー情報: " + JSON.stringify(config, null, 2))
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">サーバー設定</h2>
      <h3 className="mt-4 font-semibold">最大テキスト長: {config.maxTextLength}</h3>
      <h3 className="mt-4 font-semibold">デフォルト話者: {config.defaultSpeakerId}</h3>
      <h3 className="mt-4 font-semibold">読み上げ速度: {config.playbackSpeed}</h3>
      <h3 className="mt-4 font-semibold">読み上げチャンネル一覧:</h3>
      <ul>
        {Object.entries(config.talkChannel).map(([id, ch]) => {
          const channel = ch as { name: string }; 
          return (
            <li key={id}>
              {channel.name}
            </li>
          );
        })}
      </ul>

      <h3 className="mt-4 font-semibold">ユーザー一覧:</h3>
      {/* <ul>
        {Object.entries(config.users).map(([id, usrInf]) => {
          const userInfo = usrInf as { [key: string]: string }; 
          return (
            <li key={id}>
              {channel.name}
            </li>
          );
        })}
      </ul> */}
    </div>
  )
}
